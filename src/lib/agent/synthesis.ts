import { CulturalBlueprint, QlooEntity, QlooInsightsResponse, UserTasteTree } from '@/types/qloo';
import { getGeminiClient, AGENT_SYSTEM_PROMPT } from './gemini';
import { ParsedUserIntent } from './resolver';

/**
 * Builds baseline curatorial copy tailored specifically to the user's requested venue/occasion.
 */
function buildVenueSpecificDefaults(
  prompt: string,
  intent: ParsedUserIntent,
  seeds: QlooEntity[]
): {
  title: string;
  subtitle: string;
  narrative: string;
  soundtrackTheme: string;
  soundtrackTempo: string;
  gastronomyConcept: string;
  wineOrCocktailPairing: string;
  cinemaAesthetic: string;
  cinemaMotif: string;
  sartorialDress: string;
  sartorialMaterials: string[];
  spaceAtmosphere: string;
  ambientLighting: string;
  lightingKelvin: string;
  lightingDesc: string;
  aroma: string;
  textureMaterials: string[];
  anchors: string[];
} {
  const lowerPrompt = prompt.toLowerCase();
  const seedNames = seeds.map((s) => s.name).join(' and ');

  const isPub =
    lowerPrompt.includes('pub') ||
    lowerPrompt.includes('tavern') ||
    lowerPrompt.includes('beer') ||
    lowerPrompt.includes('alehouse') ||
    Boolean(intent.venueType?.includes('pub') || intent.venueType?.includes('tavern'));

  const isBar =
    !isPub &&
    (lowerPrompt.includes('bar') ||
      lowerPrompt.includes('cocktail') ||
      lowerPrompt.includes('speakeasy') ||
      lowerPrompt.includes('whisky'));

  const isCafe =
    lowerPrompt.includes('cafe') ||
    lowerPrompt.includes('coffee') ||
    lowerPrompt.includes('tea') ||
    lowerPrompt.includes('bakery');

  if (isPub) {
    return {
      title: 'Atmosphere: The Bohemian Alehouse & Artist’s Tavern',
      subtitle: 'A curated public house experience blending craft cask ales, indie vinyl, and salon gallery walls',
      narrative: `Anchored in the rich legacy of historic artists' public houses, this tavern atmosphere balances independent cask brewing with bohemian warmth. Weathered dark oak counters and salon-hung local oil paintings frame unhurried pints, while warm turntable folk and heritage knitwear foster genuine creative debate.`,
      soundtrackTheme: 'Warm Pub Turntables & Bohemian Indie Folk',
      soundtrackTempo: '72–82 BPM warm acoustic strumming and pub singalong cadence',
      gastronomyConcept: 'Independent Cask Ales, Artisanal Ciders & Bohemian Tavern Small Plates',
      wineOrCocktailPairing: 'Hand-pumped English cask bitter or unfiltered farmhouse saison paired with house-made scotch eggs and aged farmhouse cheddar',
      cinemaAesthetic: 'Atmospheric Tavern Realism & Warm Amber 35mm Grain',
      cinemaMotif: 'Condensation on heavy pint glasses, gas-lamp amber reflections in etched Victorian mirrors, and low wooden booths',
      sartorialDress: 'Weathered Waxed Cotton & Heavy Cable-Knit Woolens',
      sartorialMaterials: ['Waxed olive cotton', 'Heavy Aran cable-knit wool', 'Wide-wale corduroy', 'Raw selvedge denim'],
      spaceAtmosphere: 'Victorian Dark English Oak, Brass Tap Towers & Salon Gallery Walls',
      ambientLighting: '2200K – 2400K amber gas-lamp sconces and filament pendants; zero clinical overhead glare',
      lightingKelvin: '2200K – 2400K (Amber Gaslight & Filament Warmth)',
      lightingDesc: 'Low amber gas-lamp sconces and exposed filament pendants casting warm golden halos across dark wood tables and chalkboard draft lists.',
      aroma: 'Malted barley mash, dried Kent hops, beeswax wood polish, and aged hearth smoke.',
      textureMaterials: ['Weathered English oak', 'Polished brass tap towers', 'Distressed leather banquettes', 'Exposed hearth brick'],
      anchors: [
        'How 19th-century public houses functioned as the original decentralized galleries for working painters and writers',
        'The tactile aesthetics of traditional hand-pumped cask ale versus modern pressurized draft kegs',
        'Why communal wooden tavern tables cultivate uninhibited intellectual debates and organic camaraderie',
      ],
    };
  }

  if (isBar) {
    return {
      title: 'Atmosphere: Nocturnal Velvet & Low-Slung Spirits',
      subtitle: 'An intimate cocktail sanctuary with bespoke spirits and contemplative acoustic pacing',
      narrative: `Designed for hushed conversation and measured sips, this cocktail atmosphere pairs deep velvet seating with crystal glassware. Hand-carved ice and low-intervention spirits mirror the restrained phrasing of late-night jazz.`,
      soundtrackTheme: 'Midnight Cool Jazz & Smoked Brass Horns',
      soundtrackTempo: '62–70 BPM unhurried midnight progression',
      gastronomyConcept: 'Bespoke Craft Mixology & Small Savory Bites',
      wineOrCocktailPairing: 'Peated Japanese single malt over hand-carved crystal ice sphere or herbal amaro spritz with flamed orange zest',
      cinemaAesthetic: 'Neon Noir & Step-Printed Lyrical Shadows',
      cinemaMotif: 'Cigarette smoke curling past amber cocktail crystal, wet asphalt reflections outside dark windows',
      sartorialDress: 'Architectural Black & Tailored Silk Wool',
      sartorialMaterials: ['Matte black wool', 'Washed silk crepe', 'Structured linen', 'Polished oxblood calfskin'],
      spaceAtmosphere: 'Charred Timber Wainscoting & Fluted Smoked Mirrors',
      ambientLighting: '2100K – 2300K pin-spot candlelight; deep intentional shadows',
      lightingKelvin: '2100K – 2300K (Candlelight Glow)',
      lightingDesc: 'Deep pools of warm taper candlelight casting rich amber silhouettes across dark stone and polished zinc.',
      aroma: 'Smoked cedar, flamed orange peel, dried tobacco leaf, and charred oak.',
      textureMaterials: ['Charred yakisugi cedar', 'Honed Belgian bluestone', 'Deep mohair velvet', 'Brushed darkened brass'],
      anchors: [
        'How cocktail glassware geometry subtly directs the drinker’s pacing and social focus',
        'The aesthetic philosophy of mono no aware in nocturnal urban nightlife',
        'The emotional resonance of step-printed film stock in 1990s world cinema',
      ],
    };
  }

  if (isCafe) {
    return {
      title: 'Atmosphere: Morning Light & Contemplative Roast',
      subtitle: 'A serene coffee salon and reading sanctuary with morning daylight and paper lanterns',
      narrative: `A sunlit haven balancing single-origin manual pour-overs with gentle acoustic textures. Pale wood surfaces and curated paperbacks frame quiet morning focus and contemplative warmth.`,
      soundtrackTheme: 'Delicate Lo-Fi Beats & Acoustic Fingerpicking',
      soundtrackTempo: '66–76 BPM contemplative morning cadence',
      gastronomyConcept: 'Single-Origin Manual Pour-Over & Artisanal Pastries',
      wineOrCocktailPairing: 'Single-origin Ethiopian Yirgacheffe pour-over with notes of bergamot and jasmine alongside warm cardamom buns',
      cinemaAesthetic: 'Pastoral Watercolor Realism & Gentle Natural Daylight',
      cinemaMotif: 'Morning sunbeams through steamed windows, potted botanical silhouettes, and unglazed ceramic cups',
      sartorialDress: 'Oversized Knitwear & Washed Cotton Poplin',
      sartorialMaterials: ['Chunky oatmeal wool', 'Washed poplin', 'Soft twill trousers', 'Canvas workwear'],
      spaceAtmosphere: 'Pale Birch Joinery, Built-in Bookcases & Washi Lanterns',
      ambientLighting: '2700K – 3000K warm morning daylight supplemented by paper washi lanterns',
      lightingKelvin: '2700K – 3000K (Morning Sun & Diffused Paper)',
      lightingDesc: 'Soft morning natural daylight diffused through washi paper screens and low-hanging ceramic pendant lights.',
      aroma: 'Freshly ground Ethiopian coffee beans, steamed oat milk, old paperbacks, and gardenia blossoms.',
      textureMaterials: ['Pale Baltic birch', 'Unglazed stoneware', 'Handmade washi paper', 'Coarse linen upholstery'],
      anchors: [
        'How manual brewing rituals cultivate intentional mindfulness in fast-paced urban environments',
        'The psychological impact of warm paper-diffused light on morning creative work',
        'The sensory tactile pleasure of reading physical print in communal public salons',
      ],
    };
  }

  // Default: Kinfolk-style cultural salon
  return {
    title: 'Atmosphere: Low-Intervention Salon & Spatial Harmony',
    subtitle: `A curated cultural assemblage for ${intent.socialContext.toLowerCase()}`,
    narrative: `Anchored in the cultural interplay between ${seedNames || 'artistic expression and spatial restraint'}, this environment weaves together sonic depth, tactile surfaces, and curated culinary notes to evoke an atmosphere that feels intentional yet effortless.`,
    soundtrackTheme: 'Acoustic Pacing & Ambient Textures',
    soundtrackTempo: 'Slow-burn modal progression (68–74 BPM)',
    gastronomyConcept: 'Low-Intervention Artisanal Table',
    wineOrCocktailPairing: 'Skin-contact Georgian orange wine or artisanal craft cider served at cellar temperature',
    cinemaAesthetic: 'Lyrical Color Theory & Symmetrical Restraint',
    cinemaMotif: 'Step-printed 35mm grain, natural daylight through sheer linen drapery',
    sartorialDress: 'Deconstructed Minimal & Tactile Earth',
    sartorialMaterials: ['Washed Belgian linen', 'Raw indigo selvedge', 'Undyed taupe cashmere', 'Terracotta twill'],
    spaceAtmosphere: 'Wabi-sabi plaster with warm wood joinery',
    ambientLighting: 'Low-slung 2400K incandescent warmth; diffused washi paper lanterns with zero overhead glare',
    lightingKelvin: '2400K – 2700K',
    lightingDesc: 'Soft pools of indirect amber luminescence; shadows treated as intentional architectural elements.',
    aroma: 'Smoked cedar, hinoki wood, dried bergamot peel, and damp crushed stone.',
    textureMaterials: ['Fluted walnut paneling', 'Unglazed earthenware', 'Coarse raw linen', 'Brushed brass'],
    anchors: [
      'The tactile differences between analog acoustic recordings and modern digital masters',
      'How architectural light alters our perception of time in gathering spaces',
      'The renaissance of ancient clay-amphora vinification and wild fermentation techniques',
    ],
  };
}

/**
 * Synthesizes the final Cultural Blueprint combining Qloo's taste graph data,
 * user taste tree memory, and editorial prose.
 */
export async function synthesizeCulturalBlueprint(
  prompt: string,
  intent: ParsedUserIntent,
  insights: QlooInsightsResponse,
  userTasteTree?: UserTasteTree
): Promise<CulturalBlueprint> {
  const seeds = insights.sourceEntities;
  const recs = insights.recommendations;

  // 1. Build venue-aware defaults
  const defaults = buildVenueSpecificDefaults(prompt, intent, seeds);

  const fallbackBlueprint: CulturalBlueprint = {
    id: `blueprint-${Date.now()}`,
    title: defaults.title,
    editorialSubtitle: defaults.subtitle,
    narrativeOverview: defaults.narrative,
    curatorNotes: `Vetted through Qloo's cultural affinity graph to ensure harmonic coherence across music, cinematography, and spatial dining for ${intent.venueType || 'curated gathering'}.`,
    prompt,
    createdAt: new Date().toISOString(),
    categories: {
      soundtrack: {
        theme: defaults.soundtrackTheme,
        entities: (recs.music.length > 0 ? recs.music : seeds.filter((s) => s.category === 'music')).slice(0, 5),
        tempo: defaults.soundtrackTempo,
      },
      gastronomy: {
        concept: defaults.gastronomyConcept,
        entities: recs.dining.slice(0, 5),
        wineOrCocktailPairing: defaults.wineOrCocktailPairing,
      },
      cinema: {
        aestheticTone: defaults.cinemaAesthetic,
        entities: recs.film.slice(0, 5),
        visualMotif: defaults.cinemaMotif,
      },
      sartorial: {
        dressCode: defaults.sartorialDress,
        entities: recs.fashion.slice(0, 5),
        materialsAndPalette: defaults.sartorialMaterials,
      },
      spaces: {
        architecturalAtmosphere: defaults.spaceAtmosphere,
        entities: recs.atmosphere.slice(0, 5),
        ambientLighting: defaults.ambientLighting,
      },
    },
    sensory: {
      lightingKelvin: defaults.lightingKelvin,
      lightingDescription: defaults.lightingDesc,
      aromaProfile: defaults.aroma,
      textureMaterials: defaults.textureMaterials,
      soundtrackPacing: defaults.soundtrackTempo,
      conversationAnchors: defaults.anchors,
    },
    culturalDNA: {
      anchorEntities: seeds.map((s) => s.name).slice(0, 5),
      qlooAffinityScore: insights.tasteAffinitySummary.coherenceScore,
      tasteSignature: insights.tasteAffinitySummary.culturalArchetype,
    },
  };

  // 2. Attempt dynamic enhancement via Google Gemini
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim().length > 0) {
    try {
      const ai = getGeminiClient();

      let tasteTreeContext = '';
      if (userTasteTree && userTasteTree.nodes) {
        const nodes = userTasteTree.nodes;
        tasteTreeContext = `\nUser's Background Taste Tree (Subtle stylistic influence):
- Preferred Acoustic Aesthetics: ${nodes.music?.items?.map((i) => i.name).slice(0, 3).join(', ') || 'Eclectic'}
- Preferred Visuals: ${nodes.film?.items?.map((i) => i.name).slice(0, 3).join(', ') || 'Cinematic'}
- Preferred Dining: ${nodes.dining?.items?.map((i) => i.name).slice(0, 3).join(', ') || 'Artisanal'}
- Preferred Spatial Senses: ${nodes.atmosphere?.items?.map((i) => i.name).slice(0, 3).join(', ') || 'Sensory'}`;
      }

      const userMessage = `User Request: "${prompt}"
Detected Experience / Venue: ${intent.venueType || intent.occasion}
${tasteTreeContext}

Extracted Qloo Cultural Entities:
- Anchors: ${seeds.map((s) => `${s.name} (${s.category})`).slice(0, 4).join(', ')}
- Qloo Recommended Music: ${recs.music.map((m) => m.name).slice(0, 5).join(', ')}
- Qloo Recommended Film: ${recs.film.map((f) => f.name).slice(0, 5).join(', ')}
- Qloo Recommended Dining: ${recs.dining.map((d) => d.name).slice(0, 5).join(', ')}
- Qloo Recommended Sartorial/Fashion: ${recs.fashion.map((s) => s.name).slice(0, 5).join(', ')}
- Qloo Recommended Spaces/Vibe: ${recs.atmosphere.map((a) => a.name).slice(0, 5).join(', ')}
- Taste Graph Coherence: ${insights.tasteAffinitySummary.coherenceScore}%

CRITICAL CURATORIAL REQUIREMENT:
The user explicitly asked for: "${prompt}".
You must tailor the ENTIRE blueprint to directly serve this specific venue/experience.
For example, if the user requested an "artistic pub", the gastronomy MUST feature craft pub culture / cask ales / tavern fare (NOT fast food or chain sports bars), the soundtrack must fit a warm pub turntable session, the spatial atmosphere must detail authentic pub woodwork, and the sartorial section must detail authentic pub attire. DO NOT output irrelevant Wikipedia movie plot summaries or unrelated sports bars.

Please output a JSON object containing:
{
  "title": string (evocative, Kinfolk-style title matching the requested experience),
  "editorialSubtitle": string (1 sentence explaining the curated venue experience),
  "narrativeOverview": string (2-3 sentences of lyrical editorial prose immersing the user in this exact venue/moment),
  "curatorNotes": string,
  "soundtrackTheme": string (curated musical style tailored to this space),
  "soundtrackTempo": string (tempo in BPM and acoustic description),
  "gastronomyConcept": string (culinary & libations concept tailored to this space),
  "wineOrCocktailPairing": string (specific craft beer, cocktail, or wine pairing),
  "cinemaAestheticTone": string (cinematic & visual tone reflecting this venue),
  "cinemaVisualMotif": string (tactile visual details in this space),
  "sartorialDressCode": string (attire ethos suited for this space),
  "sartorialMaterials": string[] (4 tactile fabrics/materials),
  "spaceArchitecturalAtmosphere": string (interior design and joinery details),
  "lightingDescription": string (luminescence and shadows in this space),
  "lightingKelvin": string (specific Kelvin range e.g. "2200K – 2400K"),
  "aromaProfile": string (botanical and spatial scent notes),
  "textureMaterials": string[] (4 tactile interior materials),
  "conversationAnchors": string[] (strictly top 3 thought-provoking prompts relevant to this gathering)
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: `${AGENT_SYSTEM_PROMPT}\n\n${userMessage}` }] },
        ],
      });

      const responseText = response.text || '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const enriched = JSON.parse(jsonMatch[0]);
        if (enriched.title) fallbackBlueprint.title = enriched.title;
        if (enriched.editorialSubtitle) fallbackBlueprint.editorialSubtitle = enriched.editorialSubtitle;
        if (enriched.narrativeOverview) fallbackBlueprint.narrativeOverview = enriched.narrativeOverview;
        if (enriched.curatorNotes) fallbackBlueprint.curatorNotes = enriched.curatorNotes;
        if (enriched.soundtrackTheme) fallbackBlueprint.categories.soundtrack.theme = enriched.soundtrackTheme;
        if (enriched.soundtrackTempo) fallbackBlueprint.categories.soundtrack.tempo = enriched.soundtrackTempo;
        if (enriched.gastronomyConcept) fallbackBlueprint.categories.gastronomy.concept = enriched.gastronomyConcept;
        if (enriched.wineOrCocktailPairing) fallbackBlueprint.categories.gastronomy.wineOrCocktailPairing = enriched.wineOrCocktailPairing;
        if (enriched.cinemaAestheticTone) fallbackBlueprint.categories.cinema.aestheticTone = enriched.cinemaAestheticTone;
        if (enriched.cinemaVisualMotif) fallbackBlueprint.categories.cinema.visualMotif = enriched.cinemaVisualMotif;
        if (enriched.sartorialDressCode) fallbackBlueprint.categories.sartorial.dressCode = enriched.sartorialDressCode;
        if (Array.isArray(enriched.sartorialMaterials)) {
          fallbackBlueprint.categories.sartorial.materialsAndPalette = enriched.sartorialMaterials.slice(0, 4);
        }
        if (enriched.spaceArchitecturalAtmosphere) {
          fallbackBlueprint.categories.spaces.architecturalAtmosphere = enriched.spaceArchitecturalAtmosphere;
        }
        if (enriched.lightingDescription) fallbackBlueprint.sensory.lightingDescription = enriched.lightingDescription;
        if (enriched.lightingKelvin) fallbackBlueprint.sensory.lightingKelvin = enriched.lightingKelvin;
        if (enriched.aromaProfile) fallbackBlueprint.sensory.aromaProfile = enriched.aromaProfile;
        if (Array.isArray(enriched.textureMaterials)) {
          fallbackBlueprint.sensory.textureMaterials = enriched.textureMaterials.slice(0, 4);
        }
        if (Array.isArray(enriched.conversationAnchors)) {
          fallbackBlueprint.sensory.conversationAnchors = enriched.conversationAnchors.slice(0, 3);
        }
      }
    } catch (err) {
      console.warn(`[Gemini Enrichment] Fallback to venue-specific editorial engine: ${(err as Error).message}`);
    }
  }

  return fallbackBlueprint;
}
