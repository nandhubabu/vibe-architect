import { QlooEntity, QlooCategory } from '@/types/qloo';
import { qlooFetch, QlooApiError } from './client';
import { QLOO_CONFIG } from './config';
import { searchMockCulturalGraph } from './mock-graph';

interface RawQlooTag {
  name?: string;
  tag_id?: string;
  type?: string;
}

interface RawQlooEntityResponse {
  id?: string;
  entity_id?: string;
  name?: string;
  title?: string;
  type?: string;
  types?: string[];
  subtype?: string;
  category?: string;
  popularity?: number;
  tags?: Array<RawQlooTag | string>;
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

interface RawQlooSearchResponse {
  results?: RawQlooEntityResponse[];
  data?: RawQlooEntityResponse[];
  entities?: RawQlooEntityResponse[];
}

function normalizeCategory(
  types?: string[],
  typeOrCategory?: string,
  preferredCategory?: QlooCategory
): QlooCategory {
  if (preferredCategory) return preferredCategory;
  const combined = [
    ...(types || []),
    typeOrCategory || '',
  ]
    .join(' ')
    .toLowerCase();

  if (
    combined.includes('artist') ||
    combined.includes('music') ||
    combined.includes('song') ||
    combined.includes('album')
  ) {
    return 'music';
  }
  if (
    combined.includes('movie') ||
    combined.includes('film') ||
    combined.includes('tv_show') ||
    combined.includes('tv')
  ) {
    return 'film';
  }
  if (
    combined.includes('food') ||
    combined.includes('restaurant') ||
    combined.includes('dining') ||
    combined.includes('wine')
  ) {
    return 'dining';
  }
  if (
    combined.includes('brand') ||
    combined.includes('fashion') ||
    combined.includes('clothing')
  ) {
    return 'fashion';
  }
  if (
    combined.includes('book') ||
    combined.includes('author') ||
    combined.includes('literature')
  ) {
    return 'literature';
  }
  if (
    combined.includes('destination') ||
    combined.includes('place') ||
    combined.includes('city') ||
    combined.includes('venue')
  ) {
    return 'destinations';
  }
  return 'atmosphere';
}

/**
 * Searches Qloo's taste graph for cultural entities matching the query.
 * Gracefully falls back to the curated taste graph if Qloo key is pending.
 */
export async function searchQlooEntities(
  query: string,
  categoryFilter?: QlooCategory
): Promise<QlooEntity[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // If live key is present, attempt live Qloo Hackathon API
  if (QLOO_CONFIG.hasLiveKey) {
    try {
      const params = new URLSearchParams({
        query: trimmed,
      });

      const response = await qlooFetch<RawQlooSearchResponse>(
        `${QLOO_CONFIG.endpoints.search}?${params.toString()}`
      );

      const items = response.results || response.data || response.entities || [];
      if (items.length > 0) {
        return items.map((item, idx) => {
          const entityId =
            item.entity_id ||
            item.id ||
            `entity-${idx}-${encodeURIComponent(item.name || item.title || trimmed)}`;
          const entityName = item.name || item.title || trimmed;
          const category = normalizeCategory(
            item.types,
            item.subtype || item.category || item.type,
            categoryFilter
          );

          const tagList = (item.tags || []).map((t) =>
            typeof t === 'string' ? t : t.name || t.tag_id || ''
          ).filter(Boolean);

          const queryTokens = trimmed.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
          const entityTokens = entityName.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
          const combinedTags = Array.from(
            new Set([
              trimmed.toLowerCase(),
              ...queryTokens,
              ...entityTokens,
              ...tagList.map((t) => t.toLowerCase()),
            ])
          );

          const desc =
            item.description ||
            item.disambiguation ||
            item.properties?.description ||
            item.properties?.biography ||
            (item.properties?.short_descriptions && item.properties.short_descriptions[0]?.value) ||
            `Curated ${category} entity resolved from Qloo graph.`;

          return {
            id: entityId,
            name: entityName,
            category,
            type: item.type || (item.types && item.types[0]),
            popularity: item.popularity || 0.85,
            tags: combinedTags,
            description: desc,
            metadata: {
              imageUrl: item.properties?.image?.url,
              disambiguation: item.disambiguation,
            },
          };
        });
      }
    } catch (err) {
      console.warn(
        `[Qloo Search] Live API call did not succeed, defaulting to curated taste graph: ${(err as Error).message}`
      );
    }
  }

  // Curated cultural graph lookup
  return searchMockCulturalGraph(trimmed, categoryFilter);
}
