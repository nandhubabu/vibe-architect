import {
  QlooEntity,
  QlooCategory,
  QlooInsightsRequest,
  QlooInsightsResponse,
} from '@/types/qloo';
import { qlooFetch } from './client';
import { QLOO_CONFIG } from './config';
import { CURATED_CULTURAL_GRAPH } from './mock-graph';
import { searchQlooEntities } from './search';

interface RawInsightsTag {
  name?: string;
  tag_id?: string;
  type?: string;
}

interface RawInsightsRecommendation {
  id?: string;
  entity_id?: string;
  name?: string;
  title?: string;
  category?: string;
  type?: string;
  subtype?: string;
  query?: {
    affinity?: number;
    measurements?: Record<string, unknown>;
  };
  affinity_score?: number;
  affinityScore?: number;
  popularity?: number;
  tags?: Array<RawInsightsTag | string>;
  description?: string;
  disambiguation?: string;
  properties?: {
    image?: { url?: string };
    biography?: string;
    description?: string;
    short_descriptions?: Array<{ value: string }>;
    external?: Record<string, unknown>;
  };
}

interface RawInsightsApiResponse {
  success?: boolean;
  results?: {
    entities?: RawInsightsRecommendation[];
  };
  entities?: RawInsightsRecommendation[];
}

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

/**
 * Computes cross-domain recommendations across music, film, dining, fashion, and spaces
 * based on provided seed entities using Qloo taste affinity graph.
 */
export async function getQlooInsights(
  request: QlooInsightsRequest
): Promise<QlooInsightsResponse> {
  const {
    entityIds,
    seedEntities = [],
    targetCategories = ['music', 'film', 'dining', 'fashion', 'atmosphere'],
  } = request;

  // 1. Resolve source seed entities from seedEntities, graph, or live lookups
  const sourceEntities: QlooEntity[] = [...seedEntities];
  const qlooSeedUuids: string[] = [];

  for (const s of seedEntities) {
    if (UUID_REGEX.test(s.id)) {
      qlooSeedUuids.push(s.id);
    }
  }

  for (const id of entityIds) {
    const existing = sourceEntities.find((e) => e.id === id);
    if (!existing) {
      const matchedInGraph = CURATED_CULTURAL_GRAPH.find((e) => e.id === id);
      if (matchedInGraph) {
        sourceEntities.push(matchedInGraph);
      }
    }

    if (UUID_REGEX.test(id)) {
      if (!qlooSeedUuids.includes(id)) {
        qlooSeedUuids.push(id);
      }
    } else {
      // Clean query and search Qloo for real entity UUID
      const cleanQuery = (id)
        .replace(/^(music-|film-|dining-|fashion-|space-)/, '')
        .replace(/-/g, ' ');
      try {
        const liveResults = await searchQlooEntities(cleanQuery);
        if (liveResults.length > 0) {
          const first = liveResults[0];
          if (!sourceEntities.some((s) => s.id === first.id)) {
            sourceEntities.push(first);
          }
          if (UUID_REGEX.test(first.id) && !qlooSeedUuids.includes(first.id)) {
            qlooSeedUuids.push(first.id);
          }
        }
      } catch {
        // Fallback to local representation
      }
    }
  }

  // Fallback if none matched directly
  if (sourceEntities.length === 0 && entityIds.length > 0) {
    sourceEntities.push({
      id: entityIds[0],
      name: 'Curated Cultural Selection',
      category: 'music',
      affinityScore: 0.95,
      tags: ['curated', 'seed'],
    });
  }

  const recommendations: Record<QlooCategory, QlooEntity[]> = {
    music: [],
    film: [],
    dining: [],
    fashion: [],
    literature: [],
    destinations: [],
    atmosphere: [],
  };

  // 2. Attempt live Qloo Hackathon API if key exists and we have valid seeds
  if (QLOO_CONFIG.hasLiveKey && qlooSeedUuids.length > 0) {
    const categoryFetchPromises = targetCategories.map(async (cat) => {
      const filterType = QLOO_CONFIG.categoryFilterTypes[cat] || 'urn:entity:place';
      const sampleSize = Math.min(5, request.sampleSize || 5);
      const params = new URLSearchParams({
        'filter.type': filterType,
        'signal.interests.entities': qlooSeedUuids.join(','),
        sample_size: String(sampleSize),
      });

      try {
        const response = await qlooFetch<RawInsightsApiResponse>(
          `${QLOO_CONFIG.endpoints.insights}?${params.toString()}`
        );

        const rawEntities =
          response.results?.entities || response.entities || [];

        if (rawEntities.length > 0) {
          recommendations[cat] = rawEntities.slice(0, 5).map((item, idx) => {
            const rawScore =
              item.query?.affinity ?? item.affinity_score ?? item.popularity ?? 0.9;
            const affinityScore = Math.min(
              0.99,
              Math.max(0.7, Number(rawScore.toFixed(2)))
            );

            const tagList = (item.tags || [])
              .map((t) => (typeof t === 'string' ? t : t.name || t.tag_id || ''))
              .filter(Boolean);

            const desc =
              item.description ||
              item.properties?.description ||
              item.properties?.short_descriptions?.[0]?.value ||
              item.properties?.biography ||
              item.disambiguation ||
              undefined;

            return {
              id:
                item.entity_id ||
                item.id ||
                `qloo-${cat}-${idx}-${encodeURIComponent(item.name || item.title || 'entity')}`,
              name: item.name || item.title || 'Curated Entity',
              category: cat,
              affinityScore,
              tags: tagList,
              description: desc,
              metadata: {
                imageUrl: item.properties?.image?.url,
                subtype: item.subtype,
                disambiguation: item.disambiguation,
              },
            };
          });
        }
      } catch (err) {
        console.warn(
          `[Qloo Insights] Category ${cat} fallback: ${(err as Error).message}`
        );
      }
    });

    await Promise.allSettled(categoryFetchPromises);
  }

  // 3. Cultural Graph Correlation Fill-in for any missing/empty categories
  const allSeedTags = new Set<string>();
  for (const seed of sourceEntities) {
    (seed.tags || []).forEach((t) => allSeedTags.add(t.toLowerCase()));
  }

  for (const cat of targetCategories) {
    if (!recommendations[cat] || recommendations[cat].length === 0) {
      const candidatePool = CURATED_CULTURAL_GRAPH.filter(
        (item) => item.category === cat
      );

      const scoredPool = candidatePool.map((candidate) => {
        let sharedTagCount = 0;
        const candidateTags = candidate.tags || [];

        for (const tag of candidateTags) {
          if (allSeedTags.has(tag.toLowerCase())) {
            sharedTagCount += 1;
          }
        }

        const baseAffinity = candidate.affinityScore || 0.9;
        const tagMultiplier = sharedTagCount > 0 ? 0.05 * sharedTagCount : 0;
        const calculatedScore = Math.min(
          0.99,
          Number((baseAffinity + tagMultiplier).toFixed(2))
        );

        return {
          ...candidate,
          affinityScore: calculatedScore,
          _sharedTags: sharedTagCount,
        };
      });

      scoredPool.sort((a, b) => {
        if (b._sharedTags !== a._sharedTags) {
          return b._sharedTags - a._sharedTags;
        }
        return (b.affinityScore || 0) - (a.affinityScore || 0);
      });

      recommendations[cat] = scoredPool.slice(0, 3);
    }
  }

  // 4. Compute cultural coherence score
  const allRecommended = Object.values(recommendations).flat();
  const totalScore = allRecommended.reduce(
    (sum, item) => sum + (item.affinityScore || 0.88),
    0
  );
  const totalCount = Math.max(1, allRecommended.length);
  const avgScore = Number(((totalScore / totalCount) * 100).toFixed(1));

  // Collect all tags across seeds and recommendations
  const combinedTags = Array.from(allSeedTags);
  allRecommended.forEach((rec) => {
    (rec.tags || []).forEach((t) => combinedTags.push(t.toLowerCase()));
  });

  return {
    sourceEntities,
    recommendations,
    tasteAffinitySummary: {
      coherenceScore: avgScore,
      dominantVibe: determineVibe(combinedTags),
      culturalArchetype: determineArchetype(combinedTags),
    },
  };
}

function determineVibe(tags: string[]): string {
  if (tags.some((t) => ['noir', 'rain', 'whisky', 'jazz', 'tokyo'].includes(t))) {
    return 'Midnight Velvet & Solitude';
  }
  if (tags.some((t) => ['ghibli', 'lofi', 'pastoral', 'wholesome'].includes(t))) {
    return 'Pastoral Serenity & Nostalgia';
  }
  if (
    tags.some((t) =>
      ['natural-wine', 'terracotta', 'linen', 'sunset', 'groove'].includes(t)
    )
  ) {
    return 'Artisanal Earth & Late Sunset';
  }
  if (tags.some((t) => ['concrete', 'brutalist', 'monolithic', 'ambient'].includes(t))) {
    return 'Monolithic Silence & Pure Form';
  }
  return 'Modern Architectural Editorial';
}

function determineArchetype(tags: string[]): string {
  if (tags.some((t) => ['noir', 'whisky', 'tokyo'].includes(t))) {
    return 'The Nocturnal Flâneur';
  }
  if (tags.some((t) => ['ghibli', 'lofi', 'coffee'].includes(t))) {
    return 'The Contemplative Artisan';
  }
  if (tags.some((t) => ['natural-wine', 'linen', 'terracotta'].includes(t))) {
    return 'The Mediterranean Modernist';
  }
  return 'The Cultural Esthete';
}
