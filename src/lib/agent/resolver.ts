import { QlooEntity, UserTasteTree } from '@/types/qloo';
import { runToolSearchQloo } from './tools';

export interface ParsedUserIntent {
  occasion: string;
  venueType?: string;
  vibeModifiers: string[];
  moodKeywords: string[];
  explicitAesthetics: string[];
  targetLocation?: string;
  socialContext: string;
}

const VENUE_KEYWORDS: Record<string, string> = {
  pub: 'artistic pub / craft tavern',
  tavern: 'historic tavern / alehouse',
  alehouse: 'cask alehouse & taproom',
  gastropub: 'artisanal gastropub',
  brewery: 'craft brewery & tasting room',
  taproom: 'craft beer taproom',
  speakeasy: 'hidden cocktail speakeasy',
  bar: 'cocktail & artisanal bar',
  lounge: 'listening lounge & salon',
  cafe: 'specialty coffee & reading salon',
  bistro: 'intimate neighborhood bistro',
  izakaya: 'modern neo-izakaya',
  restaurant: 'artisanal dining room',
  club: 'intimate music club',
  salon: 'cultural listening salon',
  gallery: 'art gallery & spatial project',
  studio: 'creative design studio',
  rooftop: 'open-air rooftop salon',
  cabin: 'nordic retreat cabin',
};

const VIBE_KEYWORDS = [
  'artistic',
  'bohemian',
  'eclectic',
  'indie',
  'literary',
  'candlelit',
  'romantic',
  'cozy',
  'moody',
  'nocturnal',
  'noir',
  'minimalist',
  'wabi-sabi',
  'brutalist',
  'modernist',
  'architectural',
  'vintage',
  'retro',
  'mid-century',
  'heritage',
  'rustic',
  'historic',
  'chill',
  'lofi',
  'ambient',
];

const FAMOUS_CULTURAL_ANCHORS = [
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
  'chet baker',
  'brian eno',
  'nick drake',
  'natural wine',
  'whisky',
  'izakaya',
  'lemaire',
  'issey miyake',
  'japandi',
  'brutalist',
  'mid-century',
  'architecture',
  'modernist architecture',
  'bauhaus',
];

/**
 * Extracts cultural intent, venue types, aesthetics, and seeds from prompt
 * combined with User Taste Tree memory.
 */
export async function parseAndResolveCulturalSeeds(
  prompt: string,
  userTasteTree?: UserTasteTree
): Promise<{ intent: ParsedUserIntent; resolvedSeeds: QlooEntity[] }> {
  const lowerPrompt = prompt.toLowerCase();

  // Strip conversational filler (e.g. "i want to go to a", "take me to", "design a")
  const cleanedPrompt = lowerPrompt
    .replace(
      /^(i want to (go to|visit|find|see|experience)|take me to|find me|plan a|create a|design a|make a|looking for a|i'd like a)\s+/i,
      ''
    )
    .replace(/[?.!]+$/, '')
    .trim();

  // 1. Detect Venue Type
  let detectedVenueType: string | undefined = undefined;
  for (const [key, label] of Object.entries(VENUE_KEYWORDS)) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(cleanedPrompt)) {
      detectedVenueType = label;
      break;
    }
  }

  // 2. Detect Vibe & Aesthetic Modifiers
  const detectedVibes: string[] = [];
  for (const vibe of VIBE_KEYWORDS) {
    if (lowerPrompt.includes(vibe)) {
      detectedVibes.push(vibe);
    }
  }

  // 3. Detect Direct Artists / Entities Mentioned in Prompt
  const matchedTokens: string[] = [];
  for (const anchor of FAMOUS_CULTURAL_ANCHORS) {
    if (lowerPrompt.includes(anchor)) {
      matchedTokens.push(anchor);
    }
  }

  // 4. Construct Primary Search Queries
  const primarySearchQueries: string[] = [];

  // A. Explicit cultural anchors (artists, directors, movements) MUST COME FIRST!
  for (const token of matchedTokens) {
    if (!primarySearchQueries.includes(token)) {
      primarySearchQueries.push(token);
    }
  }

  // B. Clean venue or spatial concept
  if (detectedVenueType) {
    const venueKey =
      Object.keys(VENUE_KEYWORDS).find((k) =>
        new RegExp(`\\b${k}\\b`, 'i').test(cleanedPrompt)
      ) || 'space';

    // Disambiguate venue keywords so Qloo doesn't search for commercial nail/hair salons or chain spots
    const refinedVenueTerm =
      venueKey === 'salon'
        ? 'cultural listening salon'
        : venueKey === 'studio'
        ? 'creative design studio'
        : venueKey === 'rooftop'
        ? 'rooftop terrace'
        : venueKey;

    const venueQuery = detectedVibes.length > 0 ? `${detectedVibes[0]} ${refinedVenueTerm}` : refinedVenueTerm;
    if (!primarySearchQueries.includes(venueQuery)) {
      primarySearchQueries.push(venueQuery);
    }
  }

  // C. If no explicit cultural anchors matched, add short aesthetic keywords (not long stopword sentences)
  if (primarySearchQueries.length === 0) {
    const words = cleanedPrompt.split(/\s+/).filter((w) => w.length > 3);
    const shortQuery = words.slice(0, 3).join(' ');
    if (shortQuery) {
      primarySearchQueries.push(shortQuery);
    }
  }

  // 5. Harmonize with User Taste Tree Memory (as contextual flavor)
  if (userTasteTree && userTasteTree.nodes) {
    const prioritizedNodes = Object.values(userTasteTree.nodes).sort(
      (a, b) => b.priorityWeight - a.priorityWeight
    );

    for (const node of prioritizedNodes) {
      // If user asked for a pub, only bring in non-conflicting taste dimensions
      if (detectedVenueType && node.id === 'dining') {
        continue; // Don't let an unrelated restaurant/wine bar from taste tree override a pub
      }

      // Prioritize core user_defined preferences over transient learned history
      const sortedItems = [...node.items].sort((a, b) => {
        const scoreA = (a.source === 'user_defined' ? 10 : 0) + (a.weight || 1);
        const scoreB = (b.source === 'user_defined' ? 10 : 0) + (b.weight || 1);
        return scoreB - scoreA;
      });

      // Filter out venue-specific items from past sessions if current prompt doesn't match that venue
      const candidateItem = sortedItems.find((item) => {
        const itemLower = item.name.toLowerCase();
        const isPubItem =
          itemLower.includes('pub') ||
          itemLower.includes('tavern') ||
          itemLower.includes('alehouse') ||
          itemLower.includes('withnail') ||
          itemLower.includes('cask') ||
          itemLower.includes('bruges');
        if (!detectedVenueType && isPubItem) return false;
        return true;
      });

      if (node.priorityWeight >= 4 && candidateItem) {
        if (
          !primarySearchQueries.some(
            (q) => q.toLowerCase() === candidateItem.name.toLowerCase()
          )
        ) {
          if (primarySearchQueries.length < 3) {
            primarySearchQueries.push(candidateItem.name);
          }
        }
      }
    }
  }

  // Fallback anchor if everything is completely empty
  if (primarySearchQueries.length === 0) {
    primarySearchQueries.push(
      detectedVenueType ? detectedVenueType : 'modern cultural salon'
    );
  }

  // 6. Resolve Entities through Qloo search tool (cap to 3 or 4 focused seeds)
  const resolvedSeeds: QlooEntity[] = [];
  for (const token of primarySearchQueries.slice(0, 4)) {
    const { results } = await runToolSearchQloo(token);
    if (results.length > 0) {
      for (const res of results.slice(0, 2)) {
        if (!resolvedSeeds.some((r) => r.id === res.id)) {
          resolvedSeeds.push(res);
          if (resolvedSeeds.length >= 4) break;
        }
      }
    }
  }

  // 7. Assemble Parsed Intent
  const intent: ParsedUserIntent = {
    occasion: cleanedPrompt || prompt.slice(0, 80),
    venueType: detectedVenueType,
    vibeModifiers: detectedVibes,
    moodKeywords: primarySearchQueries,
    explicitAesthetics: [...detectedVibes, ...(detectedVenueType ? [detectedVenueType] : [])],
    socialContext:
      lowerPrompt.includes('group') ||
      lowerPrompt.includes('team') ||
      lowerPrompt.includes('friends') ||
      lowerPrompt.includes('party') ||
      lowerPrompt.includes('pub')
        ? 'Social gathering & conversation'
        : lowerPrompt.includes('date') || lowerPrompt.includes('two')
        ? 'Intimate encounter'
        : 'Bespoke individual experience',
  };

  return { intent, resolvedSeeds };
}
