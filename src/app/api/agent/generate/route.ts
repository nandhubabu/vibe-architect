import { NextRequest, NextResponse } from 'next/server';
import { runAgentOrchestrator } from '@/lib/agent/orchestrator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;
    const userTasteTree = body?.userTasteTree;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'A descriptive moment prompt is required.' },
        { status: 400 }
      );
    }

    const result = await runAgentOrchestrator(prompt.trim(), userTasteTree);

    return NextResponse.json({
      success: true,
      blueprint: result.blueprint,
      steps: result.steps,
    });
  } catch (error) {
    console.error('[API Agent Generate Error]:', error);
    return NextResponse.json(
      {
        error: 'Failed to synthesize cultural blueprint.',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
