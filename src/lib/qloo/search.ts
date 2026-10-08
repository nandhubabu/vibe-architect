import { QlooEntity, QlooCategory } from '@/types/qloo';
import { qlooFetch, QlooApiError } from './client';
import { QLOO_CONFIG } from './config';
import { searchMockCulturalGraph } from './mock-graph';

interface RawQlooEntityResponse {
  id?: string;
  name?: string;
  title?: string;
  type?: string;
  category?: string;
  popularity?: number;
  tags?: string[];
  description?: string;
}

interface RawQlooSearchResponse {
  results?: RawQlooEntityResponse[];
  data?: RawQlooEntityResponse[];
  entities?: RawQlooEntityResponse[];
}

function normalizeCategory(typeOrCategory?: string): QlooCategory {
  const normalized = (typeOrCategory || '').toLowerCase();
  if (normalized.includes('music') || normalized.includes('song') || normalized.includes('artist')) {
    return 'music';
  }
  if (normalized.includes('film') || normalized.includes('movie') || normalized.includes('tv')) {
    return 'film';
  }
  if (normalized.includes('food') || normalized.includes('restaurant') || normalized.includes('dining')) {
    return 'dining';
  }
  if (normalized.includes('fashion') || normalized.includes('brand') || normalized.includes('clothing')) {
    return 'fashion';
  }
  if (normalized.includes('book') || normalized.includes('author') || normalized.includes('literature')) {
    return 'literature';
  }
  if (normalized.includes('place') || normalized.includes('destination') || normalized.includes('city') || normalized.includes('venue')) {
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
        ...(categoryFilter ? { category: categoryFilter } : {}),
      });

      const response = await qlooFetch<RawQlooSearchResponse>(
        `${QLOO_CONFIG.endpoints.search}?${params.toString()}`
      );

      const items = response.results || response.data || response.entities || [];
      if (items.length > 0) {
        return items.map((item, idx) => ({
          id: item.id || `entity-${idx}-${encodeURIComponent(item.name || item.title || trimmed)}`,
          name: item.name || item.title || trimmed,
          category: normalizeCategory(item.category || item.type || categoryFilter),
          type: item.type,
          popularity: item.popularity || 0.85,
          tags: item.tags || [trimmed.toLowerCase()],
          description: item.description,
        }));
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
