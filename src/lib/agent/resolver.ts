import { QlooEntity, UserTasteTree } from '@/types/qloo';
import { runToolSearchQloo } from './tools';

export interface ParsedUserIntent {
  occasion: string;
  moodKeywords: string[];
  explicitAesthetics: string[];
  targetLocation?: string;
  socialContext: string;
}

const CULTURAL_ANCHORS = [
  'miles davis',
  'wes anderson',
  'wong kar-wai',
  'ghibli',
  'studio ghibli',
  'bill evans',
  'ryuichi sakamoto',
  'radiohead',
  'nujabes',
  'khruangbin',
  'natural wine',
  'whisky',
  'izakaya',
  'lemaire',
  'issey miyake',
  'japandi',
  'brutalist',
  'mid-century',
  'lofi',
  'jazz',
];

/**
 * Extracts cultural intent, aesthetics, and seeds from prompt combined with User Taste Tree memory.
 */
export async function parseAndResolveCulturalSeeds(
  prompt: string,
  userTasteTree?: UserTasteTree
): Promise<{ intent: ParsedUserIntent; resolvedSeeds: QlooEntity[] }> {
  const lowerPrompt = prompt.toLowerCase();

  // Detect anchors in prompt
  const matchedTokens: string[] = [];
  for (const anchor of CULTURAL_ANCHORS) {
    if (lowerPrompt.includes(anchor)) {
      matchedTokens.push(anchor);
    }
  }

  // If no direct anchor keywords found, detect thematic vibes
  if (matchedTokens.length === 0) {
    if (lowerPrompt.includes('dinner') || lowerPrompt.includes('food') || lowerPrompt.includes('drink')) {
      matchedTokens.push('natural wine');
    }
    if (lowerPrompt.includes('rain') || lowerPrompt.includes('night') || lowerPrompt.includes('quiet') || lowerPrompt.includes('solitude')) {
      matchedTokens.push('bill evans');
    }
    if (lowerPrompt.includes('date') || lowerPrompt.includes('romantic')) {
      matchedTokens.push('wong kar-wai');
    }
    if (lowerPrompt.includes('chill') || lowerPrompt.includes('coffee') || lowerPrompt.includes('study')) {
      matchedTokens.push('nujabes');
    }
    if (lowerPrompt.includes('design') || lowerPrompt.includes('architect') || lowerPrompt.includes('modern')) {
      matchedTokens.push('ryuichi sakamoto');
    }
  }

  // Harmonize with User Taste Tree Memory
  if (userTasteTree && userTasteTree.nodes) {
    // Sort nodes by priority weight descending
    const prioritizedNodes = Object.values(userTasteTree.nodes).sort(
      (a, b) => b.priorityWeight - a.priorityWeight
    );

    for (const node of prioritizedNodes) {
      if (node.priorityWeight >= 4 && node.items.length > 0) {
        // Pick highest weighted item
        const topItem = [...node.items].sort((a, b) => b.weight - a.weight)[0];
        if (topItem && !matchedTokens.some((t) => t.toLowerCase() === topItem.name.toLowerCase())) {
          // If prompt had few tokens, or if this is a dominant 5/5 priority node, weave it in
          if (matchedTokens.length < 3 || node.priorityWeight === 5) {
            matchedTokens.push(topItem.name);
          }
        }
      }
    }
  }

  // Fallback anchor if prompt and memory are both empty
  if (matchedTokens.length === 0) {
    matchedTokens.push('miles davis');
  }

  // Resolve seeds through Qloo search tool (cap to 3 or 4 focused seeds)
  const resolvedSeeds: QlooEntity[] = [];
  for (const token of matchedTokens.slice(0, 4)) {
    const { results } = await runToolSearchQloo(token);
    if (results.length > 0) {
      // Avoid duplicate entity IDs
      if (!resolvedSeeds.some((r) => r.id === results[0].id)) {
        resolvedSeeds.push(results[0]);
      }
    }
  }

  const intent: ParsedUserIntent = {
    occasion: prompt.slice(0, 80),
    moodKeywords: matchedTokens,
    explicitAesthetics: matchedTokens,
    socialContext: lowerPrompt.includes('group') || lowerPrompt.includes('team') || lowerPrompt.includes('party')
      ? 'Collective gathering'
      : lowerPrompt.includes('date')
      ? 'Intimate encounter'
      : 'Bespoke individual experience',
  };

  return { intent, resolvedSeeds };
}
