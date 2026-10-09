/**
 * Qloo API Configuration
 */

export const QLOO_CONFIG = {
  baseUrl: process.env.QLOO_BASE_URL || 'https://hackathon.api.qloo.com',
  trustedBaseUrl: process.env.QLOO_TRUSTED_BASE_URL || 'https://hackathon.api.qloo.com',
  apiKey: process.env.QLOO_API_KEY || '',
  endpoints: {
    search: '/search',
    insights: '/v2/insights',
    entities: '/entities',
    tags: '/v2/tags',
  },
  timeoutMs: 12000,
  categoryFilterTypes: {
    music: 'urn:entity:artist',
    film: 'urn:entity:movie',
    dining: 'urn:entity:place',
    fashion: 'urn:entity:brand',
    literature: 'urn:entity:book',
    destinations: 'urn:entity:destination',
    atmosphere: 'urn:entity:place',
  } as const,
  get hasLiveKey(): boolean {
    return Boolean(
      (process.env.QLOO_API_KEY && process.env.QLOO_API_KEY.trim().length > 0) ||
        (this.apiKey && this.apiKey.trim().length > 0)
    );
  },
};
