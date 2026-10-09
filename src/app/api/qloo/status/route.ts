import { NextResponse } from 'next/server';
import { QLOO_CONFIG } from '@/lib/qloo/config';
import { CURATED_CULTURAL_GRAPH } from '@/lib/qloo/mock-graph';

export async function GET() {
  const hasLiveKey = QLOO_CONFIG.hasLiveKey;

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    qloo: {
      baseUrl: process.env.QLOO_BASE_URL || QLOO_CONFIG.baseUrl,
      trustedBaseUrl: process.env.QLOO_TRUSTED_BASE_URL || QLOO_CONFIG.trustedBaseUrl,
      mode: hasLiveKey ? 'LIVE_QLOO_API' : 'LOCAL_CULTURAL_GRAPH_FALLBACK',
      liveKeyConfigured: hasLiveKey,
      graphEntityCount: CURATED_CULTURAL_GRAPH.length,
      categoriesSupported: [
        'music',
        'film',
        'dining',
        'fashion',
        'literature',
        'destinations',
        'atmosphere',
      ],
    },
    system: {
      framework: 'Next.js 16 App Router',
      agentEngine: 'Google Gemini & Qloo Cultural Grounding Loop',
    },
  });
}
