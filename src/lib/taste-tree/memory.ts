import {
  TasteNodeCategory,
  TasteNodeItem,
  TasteTreeNode,
  UserTasteTree,
  CulturalBlueprint,
} from '@/types/qloo';

export const STORAGE_KEY = 'vibe_architect_user_taste_tree';

export const DEFAULT_USER_TASTE_TREE: UserTasteTree = {
  version: 1,
  userId: 'usr_curator_default',
  updatedAt: new Date().toISOString(),
  autoLearnEnabled: true,
  nodes: {
    music: {
      id: 'music',
      title: 'Acoustic Architecture',
      subtitle: 'Harmonic tempos, analog vinyl, soundscapes',
      icon: '🎵',
      priorityWeight: 5, // 1 to 5 scale
      items: [
        {
          id: 'item-m1',
          name: 'Bill Evans Trio',
          priority: 'high',
          weight: 5,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-m2',
          name: 'Brian Eno (Ambient)',
          priority: 'high',
          weight: 5,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-m3',
          name: 'Miles Davis',
          priority: 'medium',
          weight: 3,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-m4',
          name: 'Hiroshi Yoshimura',
          priority: 'medium',
          weight: 3,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
      ],
    },
    film: {
      id: 'film',
      title: 'Visual & Cinematic Tone',
      subtitle: 'Aesthetic directors, 35mm grain, color palettes',
      icon: '🎬',
      priorityWeight: 4,
      items: [
        {
          id: 'item-f1',
          name: 'Wong Kar-wai',
          priority: 'high',
          weight: 5,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-f2',
          name: 'Denis Villeneuve',
          priority: 'medium',
          weight: 4,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-f3',
          name: 'Edward Yang',
          priority: 'medium',
          weight: 3,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
      ],
    },
    dining: {
      id: 'dining',
      title: 'Gastronomy & Libations',
      subtitle: 'Natural wines, omakase, craft fermentations',
      icon: '🍷',
      priorityWeight: 4,
      items: [
        {
          id: 'item-d1',
          name: 'Low-Intervention Amber Wine',
          priority: 'high',
          weight: 5,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-d2',
          name: 'Japanese Peated Single Malt',
          priority: 'medium',
          weight: 4,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-d3',
          name: 'Crusty Sourdough & Anchovies',
          priority: 'medium',
          weight: 3,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
      ],
    },
    fashion: {
      id: 'fashion',
      title: 'Sartorial & Material Palette',
      subtitle: 'Textiles, silhouettes, deconstructed tailoring',
      icon: '✂️',
      priorityWeight: 3,
      items: [
        {
          id: 'item-s1',
          name: 'Washed Belgian Linen',
          priority: 'high',
          weight: 5,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-s2',
          name: 'Studio Nicholson Silhouettes',
          priority: 'medium',
          weight: 4,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-s3',
          name: 'Lemaire Relaxed Tailoring',
          priority: 'low',
          weight: 2,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
      ],
    },
    atmosphere: {
      id: 'atmosphere',
      title: 'Spatial Architecture & Ambiance',
      subtitle: 'Kelvin luminescence, olfactory notes, raw surfaces',
      icon: '🏛️',
      priorityWeight: 5,
      items: [
        {
          id: 'item-a1',
          name: '2400K Candlelight Luminescence',
          priority: 'high',
          weight: 5,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-a2',
          name: 'Hinoki Cypress & Smoked Cedar',
          priority: 'high',
          weight: 5,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'item-a3',
          name: 'Fluted Walnut & Tadelakt Plaster',
          priority: 'medium',
          weight: 4,
          source: 'user_defined',
          timestamp: new Date().toISOString(),
        },
      ],
    },
  },
};

/**
 * Sample browser search history demonstrating realistic taste extraction.
 */
export const SAMPLE_BROWSER_SEARCH_LOG =
  `searched: 'amber skin-contact wine bars lower east side'
listened: 'Alice Coltrane - Journey in Satchidananda vinyl full album'
watched: 'Past Lives 35mm cinematographic natural lighting analysis'
searched: 'fluted walnut wall paneling 2400k indirect architectural lighting'
searched: 'Margaret Howell oversized deconstructed trench coat styling'`;

/**
 * Retrieves the current taste tree from browser localStorage or returns default.
 */
export function loadUserTasteTree(): UserTasteTree {
  if (typeof window === 'undefined') {
    return JSON.parse(JSON.stringify(DEFAULT_USER_TASTE_TREE));
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserTasteTree(DEFAULT_USER_TASTE_TREE);
      return JSON.parse(JSON.stringify(DEFAULT_USER_TASTE_TREE));
    }
    const parsed = JSON.parse(raw) as UserTasteTree;
    if (parsed && parsed.nodes && parsed.nodes.music && parsed.nodes.atmosphere) {
      return parsed;
    }
    saveUserTasteTree(DEFAULT_USER_TASTE_TREE);
    return JSON.parse(JSON.stringify(DEFAULT_USER_TASTE_TREE));
  } catch (err) {
    console.warn('[TasteTree] Storage parse error, resetting to baseline:', err);
    return JSON.parse(JSON.stringify(DEFAULT_USER_TASTE_TREE));
  }
}

/**
 * Persists the user taste tree to browser localStorage.
 */
export function saveUserTasteTree(tree: UserTasteTree): void {
  if (typeof window === 'undefined') return;
  try {
    const updated = {
      ...tree,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('[TasteTree] Failed to persist to localStorage:', err);
  }
}

/**
 * Updates the global priority weight (1 to 5) for a specific node category.
 */
export function updateCategoryWeight(
  tree: UserTasteTree,
  category: TasteNodeCategory,
  weight: number
): UserTasteTree {
  const clamped = Math.max(1, Math.min(5, Math.round(weight)));
  const next = JSON.parse(JSON.stringify(tree)) as UserTasteTree;
  if (next.nodes[category]) {
    next.nodes[category].priorityWeight = clamped;
  }
  saveUserTasteTree(next);
  return next;
}

/**
 * Adds an item to a node, maintaining a strict cap of top 5 items per node.
 */
export function addTasteItem(
  tree: UserTasteTree,
  category: TasteNodeCategory,
  name: string,
  priority: 'high' | 'medium' | 'low' = 'high',
  weight: number = 5,
  source: TasteNodeItem['source'] = 'user_defined'
): UserTasteTree {
  const trimmed = name.trim();
  if (!trimmed) return tree;

  const next = JSON.parse(JSON.stringify(tree)) as UserTasteTree;
  const node = next.nodes[category];
  if (!node) return tree;

  // Avoid duplicate by name
  const existingIndex = node.items.findIndex(
    (item) => item.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (existingIndex >= 0) {
    node.items[existingIndex].priority = priority;
    node.items[existingIndex].weight = weight;
    node.items[existingIndex].timestamp = new Date().toISOString();
  } else {
    const newItem: TasteNodeItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: trimmed,
      priority,
      weight,
      source,
      timestamp: new Date().toISOString(),
    };
    // Prepend to top and enforce strict cap of 5 items
    node.items = [newItem, ...node.items].slice(0, 5);
  }

  saveUserTasteTree(next);
  return next;
}

/**
 * Removes an item from a node.
 */
export function removeTasteItem(
  tree: UserTasteTree,
  category: TasteNodeCategory,
  itemId: string
): UserTasteTree {
  const next = JSON.parse(JSON.stringify(tree)) as UserTasteTree;
  const node = next.nodes[category];
  if (!node) return tree;

  node.items = node.items.filter((item) => item.id !== itemId);
  saveUserTasteTree(next);
  return next;
}

/**
 * Toggles auto-learning from generated blueprints.
 */
export function setAutoLearnEnabled(
  tree: UserTasteTree,
  enabled: boolean
): UserTasteTree {
  const next = JSON.parse(JSON.stringify(tree)) as UserTasteTree;
  next.autoLearnEnabled = enabled;
  saveUserTasteTree(next);
  return next;
}

/**
 * Resets the taste tree to the baseline curated configuration.
 */
export function resetTasteTree(): UserTasteTree {
  const baseline = JSON.parse(JSON.stringify(DEFAULT_USER_TASTE_TREE)) as UserTasteTree;
  saveUserTasteTree(baseline);
  return baseline;
}

/**
 * Automatically learns high-affinity items from a generated cultural blueprint
 * and enriches the user's 5-node taste tree.
 */
export function learnFromBlueprint(
  currentTree: UserTasteTree,
  blueprint: CulturalBlueprint
): { updatedTree: UserTasteTree; learnedEntities: string[] } {
  if (!currentTree.autoLearnEnabled) {
    return { updatedTree: currentTree, learnedEntities: [] };
  }

  const next = JSON.parse(JSON.stringify(currentTree)) as UserTasteTree;
  const learnedEntities: string[] = [];

  const categoryMap: Array<{
    cat: TasteNodeCategory;
    entities: Array<{ name: string; affinityScore?: number }>;
  }> = [
    { cat: 'music', entities: blueprint.categories.soundtrack.entities },
    { cat: 'film', entities: blueprint.categories.cinema.entities },
    { cat: 'dining', entities: blueprint.categories.gastronomy.entities },
    { cat: 'fashion', entities: blueprint.categories.sartorial.entities },
    { cat: 'atmosphere', entities: blueprint.categories.spaces.entities },
  ];

  for (const { cat, entities } of categoryMap) {
    const node = next.nodes[cat];
    if (!node || !entities || entities.length === 0) continue;

    // Pick top high-affinity entity
    const topCandidate = [...entities].sort(
      (a, b) => (b.affinityScore || 0.9) - (a.affinityScore || 0.9)
    )[0];

    if (!topCandidate || !topCandidate.name) continue;

    // Check if not already in node items
    const alreadyPresent = node.items.some(
      (item) => item.name.toLowerCase() === topCandidate.name.toLowerCase()
    );

    if (!alreadyPresent) {
      const newItem: TasteNodeItem = {
        id: `learned-${Date.now()}-${cat}`,
        name: topCandidate.name,
        priority: 'medium',
        weight: 4,
        source: 'learned',
        timestamp: new Date().toISOString(),
      };
      // Insert and keep capped to top 5
      node.items = [newItem, ...node.items].slice(0, 5);
      learnedEntities.push(topCandidate.name);
    }
  }

  if (learnedEntities.length > 0) {
    saveUserTasteTree(next);
  }

  return { updatedTree: next, learnedEntities };
}

/**
 * Parses user search query log or pasted browser history to extract cultural taste signals.
 */
export function extractTasteSignalsFromSearch(
  searchLog: string
): Array<{
  category: TasteNodeCategory;
  name: string;
  priority: 'high' | 'medium' | 'low';
  weight: number;
}> {
  if (!searchLog || searchLog.trim().length === 0) return [];

  const lines = searchLog
    .split(/[\n,;]+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const extracted: Array<{
    category: TasteNodeCategory;
    name: string;
    priority: 'high' | 'medium' | 'low';
    weight: number;
  }> = [];

  for (const line of lines) {
    const clean = line
      .replace(/^(searched:|listened:|watched:|query:|google:|bing:)\s*/i, '')
      .replace(/^['"]|['"]$/g, '')
      .trim();

    if (clean.length < 3) continue;

    const lower = clean.toLowerCase();

    // Heuristic categorization based on cultural markers
    if (
      lower.includes('jazz') ||
      lower.includes('vinyl') ||
      lower.includes('album') ||
      lower.includes('song') ||
      lower.includes('ambient') ||
      lower.includes('techno') ||
      lower.includes('music') ||
      lower.includes('coltrane') ||
      lower.includes('davis') ||
      lower.includes('eno') ||
      lower.includes('radiohead')
    ) {
      extracted.push({
        category: 'music',
        name: clean.length > 38 ? clean.slice(0, 38) + '...' : clean,
        priority: 'high',
        weight: 5,
      });
    } else if (
      lower.includes('film') ||
      lower.includes('cinema') ||
      lower.includes('movie') ||
      lower.includes('director') ||
      lower.includes('35mm') ||
      lower.includes('wong kar-wai') ||
      lower.includes('villeneuve') ||
      lower.includes('tarkovsky') ||
      lower.includes('ghibli')
    ) {
      extracted.push({
        category: 'film',
        name: clean.length > 38 ? clean.slice(0, 38) + '...' : clean,
        priority: 'high',
        weight: 5,
      });
    } else if (
      lower.includes('wine') ||
      lower.includes('restaurant') ||
      lower.includes('omakase') ||
      lower.includes('izakaya') ||
      lower.includes('cocktail') ||
      lower.includes('dining') ||
      lower.includes('whisky') ||
      lower.includes('ferment') ||
      lower.includes('sourdough')
    ) {
      extracted.push({
        category: 'dining',
        name: clean.length > 38 ? clean.slice(0, 38) + '...' : clean,
        priority: 'high',
        weight: 5,
      });
    } else if (
      lower.includes('coat') ||
      lower.includes('tailoring') ||
      lower.includes('linen') ||
      lower.includes('wool') ||
      lower.includes('fashion') ||
      lower.includes('silhouette') ||
      lower.includes('lemaire') ||
      lower.includes('issey miyake') ||
      lower.includes('trench')
    ) {
      extracted.push({
        category: 'fashion',
        name: clean.length > 38 ? clean.slice(0, 38) + '...' : clean,
        priority: 'medium',
        weight: 4,
      });
    } else {
      // Default to spatial atmosphere
      extracted.push({
        category: 'atmosphere',
        name: clean.length > 38 ? clean.slice(0, 38) + '...' : clean,
        priority: 'high',
        weight: 5,
      });
    }
  }

  return extracted.slice(0, 5); // Return up to 5 clean signals
}

/**
 * Imports extracted search signals directly into the user taste tree.
 */
export function importSearchKeywords(
  currentTree: UserTasteTree,
  searchLog: string
): { updatedTree: UserTasteTree; addedCount: number } {
  const signals = extractTasteSignalsFromSearch(searchLog);
  if (signals.length === 0) {
    return { updatedTree: currentTree, addedCount: 0 };
  }

  let next = JSON.parse(JSON.stringify(currentTree)) as UserTasteTree;
  let addedCount = 0;

  for (const sig of signals) {
    next = addTasteItem(
      next,
      sig.category,
      sig.name,
      sig.priority,
      sig.weight,
      'imported'
    );
    addedCount++;
  }

  saveUserTasteTree(next);
  return { updatedTree: next, addedCount };
}
