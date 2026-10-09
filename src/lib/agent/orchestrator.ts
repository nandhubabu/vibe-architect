import { CulturalBlueprint, UserTasteTree } from '@/types/qloo';
import { AgentStepLog } from './tools';
import { parseAndResolveCulturalSeeds } from './resolver';
import { runToolGetQlooInsights } from './tools';
import { synthesizeCulturalBlueprint } from './synthesis';

export interface OrchestrationResult {
  blueprint: CulturalBlueprint;
  steps: AgentStepLog[];
}

/**
 * Runs the end-to-end agentic reasoning loop with Qloo cultural grounding
 * and personalized 5-Node Taste Tree memory.
 */
export async function runAgentOrchestrator(
  prompt: string,
  userTasteTree?: UserTasteTree,
  onStep?: (step: AgentStepLog) => void
): Promise<OrchestrationResult> {
  const steps: AgentStepLog[] = [];

  function recordStep(step: string, detail: string, data?: unknown) {
    const logItem: AgentStepLog = {
      step,
      detail,
      timestamp: new Date().toISOString(),
      data,
    };
    steps.push(logItem);
    if (onStep) {
      onStep(logItem);
    }
  }

  // Taste Memory Grounding
  if (userTasteTree && userTasteTree.nodes) {
    recordStep(
      'Taste Memory Grounding',
      `Aligning with 5-Node Memory Tree: Acoustic (${userTasteTree.nodes.music.priorityWeight}/5), Cinema (${userTasteTree.nodes.film.priorityWeight}/5), Gastronomy (${userTasteTree.nodes.dining.priorityWeight}/5), Sartorial (${userTasteTree.nodes.fashion.priorityWeight}/5), Atmosphere (${userTasteTree.nodes.atmosphere.priorityWeight}/5).`
    );
  }

  // Step 1: Deconstruct Human Request
  recordStep(
    'Intent Deconstruction',
    'Analyzing aesthetic vocabulary, implicit spatial intent, and social context.'
  );
  const { intent, resolvedSeeds } = await parseAndResolveCulturalSeeds(prompt, userTasteTree);

  // Step 2: Qloo Entity Resolution
  recordStep(
    'Qloo Entity Disambiguation',
    `Resolved ${resolvedSeeds.length} anchor entities from Qloo's 250M+ cultural taste graph.`,
    resolvedSeeds.map((s) => ({ name: s.name, category: s.category, id: s.id }))
  );

  // Step 3: Cross-Domain Affinity Traversal
  recordStep(
    'Cross-Domain Taste Traversal',
    `Querying Qloo Insights API across music, film, dining, fashion, and spaces based on seed affinities.`
  );
  const insights = await runToolGetQlooInsights(
    resolvedSeeds.map((s) => s.id),
    resolvedSeeds
  );

  recordStep(
    'Cultural Coherence Verification',
    `Calculated multi-category affinity coherence score: ${insights.tasteAffinitySummary.coherenceScore}%. Archetype: ${insights.tasteAffinitySummary.culturalArchetype}.`
  );

  // Step 4: Architectural Blueprint Synthesis
  recordStep(
    'Blueprint Editorial Synthesis',
    'Weaving verified cultural entities, lighting Kelvin values, olfactory profiles, and sartorial notes into an architectural blueprint.'
  );
  const blueprint = await synthesizeCulturalBlueprint(prompt, intent, insights, userTasteTree);

  return { blueprint, steps };
}
