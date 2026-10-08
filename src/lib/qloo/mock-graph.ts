import { QlooEntity, QlooCategory } from '@/types/qloo';

export const CURATED_CULTURAL_GRAPH: QlooEntity[] = [
  // --- Music ---
  {
    id: 'music-miles-davis',
    name: 'Miles Davis',
    category: 'music',
    subcategory: 'Cool Jazz / Modal Jazz',
    affinityScore: 0.96,
    tags: ['jazz', 'noir', 'late-night', 'trumpet', 'classic', 'smoke', 'whisky'],
    description: 'Iconic trumpeter known for Kind of Blue and evocative modal jazz atmospheres.',
  },
  {
    id: 'music-bill-evans',
    name: 'Bill Evans Trio',
    category: 'music',
    subcategory: 'Post-Bop / Jazz Piano',
    affinityScore: 0.94,
    tags: ['jazz', 'piano', 'melancholy', 'coffee', 'autumn', 'intimate', 'contemplative'],
    description: 'Subtle, harmonic jazz piano textures evoking quiet rain and warm wooden interiors.',
  },
  {
    id: 'music-ryuichi-sakamoto',
    name: 'Ryuichi Sakamoto',
    category: 'music',
    subcategory: 'Ambient / Neo-Classical',
    affinityScore: 0.97,
    tags: ['ambient', 'minimalist', 'piano', 'japan', 'architectural', 'art-gallery'],
    description: 'Pioneering composer combining delicate acoustic piano with restrained electronic textures.',
  },
  {
    id: 'music-radiohead',
    name: 'Radiohead',
    category: 'music',
    subcategory: 'Art Rock / Experimental',
    affinityScore: 0.93,
    tags: ['indie', 'experimental', 'moody', 'complex', 'dystopian', 'rainy-day'],
    description: 'Genre-defying art rock known for textured soundscapes and emotional depth.',
  },
  {
    id: 'music-nujabes',
    name: 'Nujabes',
    category: 'music',
    subcategory: 'Lo-Fi Hip-Hop / Instrumental Jazz Hop',
    affinityScore: 0.95,
    tags: ['lofi', 'chillhop', 'anime', 'japan', 'ghibli', 'nostalgia', 'sunset'],
    description: 'Influential Japanese producer blending nostalgic jazz samples with hip-hop beats.',
  },
  {
    id: 'music-khruangbin',
    name: 'Khruangbin',
    category: 'music',
    subcategory: 'Psychedelic Dub / Global Groove',
    affinityScore: 0.92,
    tags: ['groove', 'sunset', 'cocktail', 'terracotta', 'bohemian', 'summer', 'desert'],
    description: 'Warm basslines and Thai funk melodies perfect for rooftop aperitifs.',
  },
  {
    id: 'music-chet-baker',
    name: 'Chet Baker',
    category: 'music',
    subcategory: 'West Coast Jazz / Vocal',
    affinityScore: 0.93,
    tags: ['jazz', 'romantic', 'noir', 'candlelight', 'melancholic', 'velvet'],
    description: 'Soft, whisper-like jazz vocals and trumpet tailored for late-night tête-à-têtes.',
  },
  {
    id: 'music-brian-eno',
    name: 'Brian Eno',
    category: 'music',
    subcategory: 'Ambient / Sound Installation',
    affinityScore: 0.91,
    tags: ['ambient', 'meditative', 'architectural', 'spatial', 'serene', 'minimalist'],
    description: 'Atmospheric sonic environments designed to tint the acoustic space without demanding attention.',
  },

  // --- Film & Directors ---
  {
    id: 'film-wes-anderson',
    name: 'Wes Anderson Filmography',
    category: 'film',
    subcategory: 'Symmetrical Auteur Cinema',
    affinityScore: 0.95,
    tags: ['symmetry', 'pastel', 'whimsical', 'vintage', 'corduroy', 'yellow-warmth', 'curated'],
    description: 'Hyper-curated color palettes, meticulous typography, and deadpan nostalgia.',
  },
  {
    id: 'film-wong-kar-wai',
    name: 'Wong Kar-wai (In the Mood for Love)',
    category: 'film',
    subcategory: 'Lyrical Romance / Hong Kong New Wave',
    affinityScore: 0.98,
    tags: ['noir', 'neon', 'rain', 'slow-motion', 'cheongsam', 'unspoken-longing', 'whisky'],
    description: 'Sultry, step-printed neon visuals, cigarette smoke, and timeless melancholy.',
  },
  {
    id: 'film-hayao-miyazaki',
    name: 'Hayao Miyazaki / Studio Ghibli',
    category: 'film',
    subcategory: 'Hand-Drawn Anime / Pastoral Realism',
    affinityScore: 0.96,
    tags: ['ghibli', 'nature', 'pastoral', 'wholesome', 'watercolor', 'breeze', 'steaming-tea'],
    description: 'Lush hand-painted water-colors, comforting domestic rituals, and pastoral serenity.',
  },
  {
    id: 'film-blade-runner-2049',
    name: 'Denis Villeneuve (Cinematography by Roger Deakins)',
    category: 'film',
    subcategory: 'Brutalist Sci-Fi / Visual Grandeur',
    affinityScore: 0.92,
    tags: ['brutalist', 'amber', 'fog', 'vast', 'monolithic', 'atmospheric'],
    description: 'Sweeping monochromatic color fields, austere architecture, and meditative scale.',
  },
  {
    id: 'film-lost-in-translation',
    name: 'Sofia Coppola (Lost in Translation)',
    category: 'film',
    subcategory: 'Drift & Intimacy / Urban Solitude',
    affinityScore: 0.95,
    tags: ['tokyo', 'hotel-bar', 'whisky', 'solitude', 'connection', 'velvet', 'rain'],
    description: 'Quiet contemplation in high-rise hotel bars looking over Tokyo neon.',
  },

  // --- Dining & Libations ---
  {
    id: 'dining-natural-wine',
    name: 'Low-Intervention Natural Wine & Small Plates',
    category: 'dining',
    subcategory: 'Bistronomy / Sommelier Curation',
    affinityScore: 0.95,
    tags: ['natural-wine', 'orange-wine', 'fermentation', 'sourdough', 'terracotta', 'candlelight'],
    description: 'Pet-nats, skin-contact orange wines, cured anchovies, and crusty sourdough at candlelit zinc bars.',
  },
  {
    id: 'dining-japanese-whisky-bar',
    name: 'Speakeasy Japanese Whisky & Hand-Carved Ice',
    category: 'dining',
    subcategory: 'Craft Libations / Highball Culture',
    affinityScore: 0.97,
    tags: ['whisky', 'wood', 'hinoki', 'hand-carved-ice', 'cocktail', 'whisper', 'tokyo'],
    description: 'Rare Hakushu, Yamazaki 12, crystal clear hand-chipped ice spheres, and walnut wainscoting.',
  },
  {
    id: 'dining-izakaya-tasting',
    name: 'Modern Neo-Izakaya & Robata Grill',
    category: 'dining',
    subcategory: 'Japanese Gastronomy',
    affinityScore: 0.93,
    tags: ['izakaya', 'binchotan', 'yakitori', 'sake', 'smoky', 'intimate', 'earthenware'],
    description: 'Binchotan charcoal grilling, cloudy nigori sake, and unglazed ceramic ware.',
  },
  {
    id: 'dining-nordic-botanical',
    name: 'New Nordic Foraged Botanicals & Hearth Dining',
    category: 'dining',
    subcategory: 'Hyper-Seasonal Fine Dining',
    affinityScore: 0.91,
    tags: ['foraged', 'nordic', 'woodfire', 'pine', 'fermentation', 'ceramic', 'moss'],
    description: 'Birch sap glazes, sea buckthorn, smoke, and minimalist stoneware plating.',
  },
  {
    id: 'dining-specialty-pour-over',
    name: 'Single-Origin Manual Pour-Over & Matchaware',
    category: 'dining',
    subcategory: 'Artisanal Coffee & Tea',
    affinityScore: 0.94,
    tags: ['coffee', 'ethiopian-yirgacheffe', 'ceremonial-matcha', 'brass', 'linens'],
    description: 'Kalita Wave drip coffee with notes of bergamot and jasmine, served in unglazed ceramic cups.',
  },

  // --- Fashion & Material Aesthetics ---
  {
    id: 'fashion-lemaire',
    name: 'Lemaire & Studio Nicholson Aesthetics',
    category: 'fashion',
    subcategory: 'Quiet Luxury / Architectural Relaxed',
    affinityScore: 0.96,
    tags: ['linen', 'wide-leg', 'earth-tones', 'cashmere', 'draped', 'minimal', 'understated'],
    description: 'Generous fluid silhouettes, washed silks, and muted earthy tones of stone and taupe.',
  },
  {
    id: 'fashion-issey-miyake',
    name: 'Homme Plissé Issey Miyake',
    category: 'fashion',
    subcategory: 'Pleated Structural Minimal',
    affinityScore: 0.93,
    tags: ['pleats', 'sculptural', 'japan', 'movement', 'matte-black', 'architectural'],
    description: 'Signature micro-pleats that drape with fluid geometry and zero crease anxiety.',
  },
  {
    id: 'fashion-vintage-workwear',
    name: 'Curated French Chore Coat & Raw Selvedge',
    category: 'fashion',
    subcategory: 'Heritage Workwear & Patina',
    affinityScore: 0.92,
    tags: ['indigo', 'canvas', 'patina', 'selvedge', 'brass-buttons', 'timeless'],
    description: 'Faded hydrone indigo moleskin jackets, broken-in raw denim, and Goodyear-welted boots.',
  },
  {
    id: 'fashion-brunello-cucinelli',
    name: 'Undyed Cashmere & Deconstructed Tailoring',
    category: 'fashion',
    subcategory: 'Artisanal Italian Cashmere',
    affinityScore: 0.90,
    tags: ['cashmere', 'cream', 'terracotta', 'deconstructed', 'blazer', 'soft-structure'],
    description: 'Featherlight oatmeal cashmere knitwear and unstructured virgin wool jackets.',
  },

  // --- Spatial Atmosphere & Architecture ---
  {
    id: 'space-japandi-minimalism',
    name: 'Japandi Earthen Plaster & Hinoki Wood',
    category: 'atmosphere',
    subcategory: 'Interior Architecture',
    affinityScore: 0.98,
    tags: ['lime-wash', 'hinoki', 'wabi-sabi', 'linen', 'paper-lanterns', '2400k'],
    description: 'Textured tadelakt plaster walls, Noguchi Akari washi paper lanterns, and pale cedar timber.',
  },
  {
    id: 'space-brutalist-sanctuary',
    name: 'Fluted Concrete & Warm Brass Accents',
    category: 'atmosphere',
    subcategory: 'Architectural Design',
    affinityScore: 0.91,
    tags: ['concrete', 'brass', 'monolithic', 'recessed-light', 'shadow-gap'],
    description: 'Poured-in-place board-marked concrete paired with patinated unlacquered brass hardware.',
  },
  {
    id: 'space-mid-century-lounge',
    name: 'Walnut Paneling & Bouclé Seating',
    category: 'atmosphere',
    subcategory: 'Modernist Interior',
    affinityScore: 0.95,
    tags: ['walnut', 'boucle', 'warm-amber', 'floor-lamp', 'credenza', 'vinyl-storage'],
    description: 'Rich fluted American walnut wall paneling with cream bouclé accent lounge chairs.',
  },
];

/**
 * Searches the curated cultural graph by text and category.
 */
export function searchMockCulturalGraph(
  query: string,
  categoryFilter?: QlooCategory
): QlooEntity[] {
  const normalizedQuery = query.toLowerCase().trim();
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  let pool = CURATED_CULTURAL_GRAPH;
  if (categoryFilter) {
    pool = pool.filter((item) => item.category === categoryFilter);
  }

  const scored = pool.map((entity) => {
    let score = 0;
    const nameMatch = entity.name.toLowerCase();
    const subMatch = (entity.subcategory || '').toLowerCase();
    const descMatch = (entity.description || '').toLowerCase();
    const tags = entity.tags || [];

    for (const token of tokens) {
      if (nameMatch.includes(token)) score += 10;
      if (tags.some((t) => t.includes(token))) score += 7;
      if (subMatch.includes(token)) score += 5;
      if (descMatch.includes(token)) score += 3;
    }

    return { entity, score };
  });

  const matches = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entity);

  if (matches.length > 0) {
    return matches;
  }

  // If no direct keyword matches, return high affinity items from the category
  return pool.slice(0, 4);
}
