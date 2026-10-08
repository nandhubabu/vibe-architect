/**
 * Qloo API Configuration
 */

export const QLOO_CONFIG = {
  baseUrl: process.env.QLOO_BASE_URL || 'https://hackathon.api.qloo.com',
  trustedBaseUrl: process.env.QLOO_TRUSTED_BASE_URL || 'https://hackathon.api.qloo.com',
  apiKey: process.env.QLOO_API_KEY || '',
  endpoints: {
    search: '/v1/search',
    insights: '/v1/insights',
    entities: '/v1/entities',
    tags: '/v1/tags',
  },
  timeoutMs: 8000,
  hasLiveKey: Boolean(process.env.QLOO_API_KEY && process.env.QLOO_API_KEY.trim().length > 0),
};
