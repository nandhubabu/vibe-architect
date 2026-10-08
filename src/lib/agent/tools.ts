import { searchQlooEntities } from '@/lib/qloo/search';
import { getQlooInsights } from '@/lib/qloo/insights';
import { QlooCategory, QlooEntity, QlooInsightsResponse } from '@/types/qloo';

export interface AgentStepLog {
  step: string;
  detail: string;
  timestamp: string;
  data?: unknown;
}

/**
 * Tool: Search Qloo entities across music, film, dining, fashion, spaces
 */
export async function runToolSearchQloo(
  query: string,
  category?: string
): Promise<{ query: string; results: QlooEntity[] }> {
  const results = await searchQlooEntities(query, category as QlooCategory | undefined);
  return { query, results };
}

/**
 * Tool: Cross-domain insight expansion using Qloo taste graph
 */
export async function runToolGetQlooInsights(
  entityIds: string[],
  targetCategories?: string[]
): Promise<QlooInsightsResponse> {
  return await getQlooInsights({
    entityIds,
    targetCategories: (targetCategories as QlooCategory[]) || [
      'music',
      'film',
      'dining',
      'fashion',
      'atmosphere',
    ],
  });
}
