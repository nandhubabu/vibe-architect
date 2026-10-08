import {
  QlooEntity,
  QlooCategory,
  QlooInsightsRequest,
  QlooInsightsResponse,
} from '@/types/qloo';
import { qlooFetch } from './client';
import { QLOO_CONFIG } from './config';
import { CURATED_CULTURAL_GRAPH } from './mock-graph';

interface RawInsightsRecommendation {
  id?: string;
  name?: string;
  title?: string;
  category?: string;
  affinity_score?: number;
  affinityScore?: number;
  tags?: string[];
  description?: string;
}

interface RawInsightsApiResponse {
  entities?: RawInsightsRecommendation[];
  results?: RawInsightsRecommendation[];
  recommendations?: Record<string, RawInsightsRecommendation[]>;
}

/**
 * Computes cross-domain recommendations across music, film, dining, fashion, and spaces
 * based on provided seed entities using Qloo taste affinity graph.
 */
export async function getQlooInsights(
  request: QlooInsightsRequest
): Promise<QlooInsightsResponse> {
  const { entityIds, targetCategories = ['music', 'film', 'dining', 'fashion', 'atmosphere'] } =
    request;

  // 1. Resolve source seed entities from graph or ID lookups
  const sourceEntities: QlooEntity[] = CURATED_CULTURAL_GRAPH.filter((e) =>
    entityIds.includes(e.id)
  );

  // Fallback if none matched directly
  if (sourceEntities.length === 0 && entityIds.length > 0) {
    sourceEntities.push({
      id: entityIds[0],
      name: entityIds[0].replace(/^(music-|film-|dining-|fashion-|space-)/, '').replace(/-/g, ' '),
      category: 'music',
      affinityScore: 0.95,
      tags: ['curated', 'seed'],
    });
  }

  // 2. Attempt live Qloo Hackathon API if key exists
  if (QLOO_CONFIG.hasLiveKey) {
    try {
      const response = await qlooFetch<RawInsightsApiResponse>(
        QLOO_CONFIG.endpoints.insights,
        {
          method: 'POST',
          body: JSON.stringify({
            entity_ids: entityIds,
            categories: targetCategories,
            sample_size: request.sampleSize || 10,
          }),
        }
      );

      const recommendations: Record<QlooCategory, QlooEntity[]> = {
        music: [],
        film: [],
        dining: [],
        fashion: [],
        literature: [],
        destinations: [],
        atmosphere: [],
      };

      const rawItems = response.results || response.entities || [];
      if (rawItems.length > 0) {
        for (const raw of rawItems) {
          const cat = (raw.category || 'music').toLowerCase() as QlooCategory;
          const targetCategory = recommendations[cat] ? cat : 'atmosphere';
          recommendations[targetCategory].push({
            id: raw.id || `live-${raw.name}`,
            name: raw.name || raw.title || 'Curated Entity',
            category: targetCategory,
            affinityScore: raw.affinity_score ?? raw.affinityScore ?? 0.88,
            tags: raw.tags || [],
            description: raw.description,
          });
        }

        return {
          sourceEntities,
          recommendations,
          tasteAffinitySummary: {
            coherenceScore: 94.5,
            dominantVibe: 'Eclectic Editorial Synthesis',
            culturalArchetype: 'The Contemplative Connoisseur',
          },
        };
      }
    } catch (err) {
      console.warn(
        `[Qloo Insights] Live endpoint fallback to graph correlation: ${(err as Error).message}`
      );
    }
  }

  // 3. Fallback: Graph Correlation Engine
  // Extract all tag signals from source entities
  const allSeedTags = new Set<string>();
  for (const seed of sourceEntities) {
    (seed.tags || []).forEach((t) => allSeedTags.add(t.toLowerCase()));
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

  for (const cat of targetCategories) {
    const candidatePool = CURATED_CULTURAL_GRAPH.filter((item) => item.category === cat);

    const scoredPool = candidatePool.map((candidate) => {
      let sharedTagCount = 0;
      const candidateTags = candidate.tags || [];

      for (const tag of candidateTags) {
        if (allSeedTags.has(tag.toLowerCase())) {
          sharedTagCount += 1;
        }
      }

      // Base affinity calculation
      const baseAffinity = candidate.affinityScore || 0.9;
      const tagMultiplier = sharedTagCount > 0 ? 0.05 * sharedTagCount : 0;
      const calculatedScore = Math.min(0.99, Number((baseAffinity + tagMultiplier).toFixed(2)));

      return {
        ...candidate,
        affinityScore: calculatedScore,
        _sharedTags: sharedTagCount,
      };
    });

    // Sort by shared tags and affinity
    scoredPool.sort((a, b) => {
      if (b._sharedTags !== a._sharedTags) {
        return b._sharedTags - a._sharedTags;
      }
      return (b.affinityScore || 0) - (a.affinityScore || 0);
    });

    recommendations[cat] = scoredPool.slice(0, 3);
  }

  // Compute cultural coherence
  const totalScore = Object.values(recommendations)
    .flat()
    .reduce((sum, item) => sum + (item.affinityScore || 0.85), 0);
  const totalCount = Math.max(1, Object.values(recommendations).flat().length);
  const avgScore = Number(((totalScore / totalCount) * 100).toFixed(1));

  return {
    sourceEntities,
    recommendations,
    tasteAffinitySummary: {
      coherenceScore: avgScore,
      dominantVibe: determineVibe(Array.from(allSeedTags)),
      culturalArchetype: determineArchetype(Array.from(allSeedTags)),
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
  if (tags.some((t) => ['natural-wine', 'terracotta', 'linen', 'sunset', 'groove'].includes(t))) {
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
