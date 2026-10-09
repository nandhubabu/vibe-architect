import { NextResponse } from 'next/server';
import { QLOO_CONFIG } from '@/lib/qloo/config';
import { qlooFetch } from '@/lib/qloo/client';

export async function GET() {
  const hasLiveKey = QLOO_CONFIG.hasLiveKey;
  let livePingLatencyMs: number | null = null;
  let livePingStatus: 'connected' | 'unreachable' | 'not_configured' = 'not_configured';

  if (hasLiveKey) {
    const startTime = Date.now();
    try {
      await qlooFetch(`${QLOO_CONFIG.endpoints.search}?query=miles%20davis`);
      livePingLatencyMs = Date.now() - startTime;
      livePingStatus = 'connected';
    } catch {
      livePingStatus = 'unreachable';
    }
  }

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    qloo: {
      baseUrl: process.env.QLOO_BASE_URL || QLOO_CONFIG.baseUrl,
      trustedBaseUrl: process.env.QLOO_TRUSTED_BASE_URL || QLOO_CONFIG.trustedBaseUrl,
      mode: hasLiveKey ? 'LIVE_QLOO_API' : 'LOCAL_CULTURAL_GRAPH_FALLBACK',
      liveKeyConfigured: hasLiveKey,
      livePingStatus,
      livePingLatencyMs,
      graphScale: '250M+ Cultural Entities • 575M+ Cross-Domain Correlations',
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
      framework: 'Next.js 16 App Router (Turbopack)',
      agentEngine: 'Google Gemini 2.5 & Qloo Autonomous Cultural Grounding Loop',
    },
  });
}
