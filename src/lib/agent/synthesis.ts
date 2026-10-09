import { CulturalBlueprint, QlooEntity, QlooInsightsResponse, UserTasteTree } from '@/types/qloo';
import { getGeminiClient, AGENT_SYSTEM_PROMPT } from './gemini';
import { ParsedUserIntent } from './resolver';

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

  // Prepare fallback editorial blueprint
  const fallbackBlueprint: CulturalBlueprint = {
    id: `blueprint-${Date.now()}`,
    title: `Atmosphere: ${insights.tasteAffinitySummary.dominantVibe}`,
    editorialSubtitle: `A curated cultural assemblage for ${intent.socialContext.toLowerCase()}`,
    narrativeOverview: `Anchored in the cultural interplay between ${seeds.map((s) => s.name).join(' and ')}, this environment weaves together sonic restraint, tactile earth tones, and nuanced culinary pairings to evoke an atmosphere that feels intentional yet effortless.`,
    curatorNotes: `Every element has been vetted through Qloo's cultural affinity graph to ensure harmonic coherence across music, cinematography, and spatial dining.`,
    prompt,
    createdAt: new Date().toISOString(),
    categories: {
      soundtrack: {
        theme: 'Acoustic Pacing & Ambient Textures',
        entities: (recs.music.length > 0 ? recs.music : seeds.filter((s) => s.category === 'music')).slice(0, 5),
        tempo: 'Slow-burn modal progression (68–74 BPM)',
      },
      gastronomy: {
        concept: 'Low-Intervention Artisanal Table',
        entities: recs.dining.slice(0, 5),
        wineOrCocktailPairing: 'Skin-contact Georgian orange wine or peated Japanese highball with hand-chipped ice',
      },
      cinema: {
        aestheticTone: 'Lyrical Color Theory & Symmetrical Restraint',
        entities: recs.film.slice(0, 5),
        visualMotif: 'Step-printed 35mm grain, natural daylight through sheer linen drapery',
      },
      sartorial: {
        dressCode: 'Deconstructed Minimal & Tactile Earth',
        entities: recs.fashion.slice(0, 5),
        materialsAndPalette: ['Washed Belgian linen', 'Raw indigo selvedge', 'Undyed taupe cashmere', 'Terracotta twill'],
      },
      spaces: {
        architecturalAtmosphere: 'Wabi-sabi plaster with warm wood joinery',
        entities: recs.atmosphere.slice(0, 5),
        ambientLighting: 'Low-slung 2400K incandescent warmth; diffused washi paper lanterns with zero overhead glare',
      },
    },
    sensory: {
      lightingKelvin: '2400K – 2700K',
      lightingDescription: 'Soft pools of indirect amber luminescence; shadows treated as intentional architectural elements',
      aromaProfile: 'Smoked cedar, hinoki wood, dried bergamot peel, and damp crushed stone',
      textureMaterials: ['Fluted walnut paneling', 'Unglazed earthenware', 'Coarse raw linen', 'Brushed brass'],
      soundtrackPacing: 'Deliberate, unhurried, creating pockets of acoustic breathing room',
      conversationAnchors: [
        'The tactile differences between analog tape recordings and modern digital masters',
        'How architectural light alters our perception of time in residential spaces',
        'The renaissance of ancient clay-amphora vinification techniques',
      ],
    },
    culturalDNA: {
      anchorEntities: seeds.map((s) => s.name).slice(0, 5),
      qlooAffinityScore: insights.tasteAffinitySummary.coherenceScore,
      tasteSignature: insights.tasteAffinitySummary.culturalArchetype,
    },
  };

  // Attempt enhancement via Google Gemini if API key is present
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim().length > 0) {
    try {
      const ai = getGeminiClient();

      let tasteTreeContext = '';
      if (userTasteTree && userTasteTree.nodes) {
        const nodes = userTasteTree.nodes;
        tasteTreeContext = `\nUser's Persistent 5-Node Taste Tree (Cultural Memory & Priorities):
- Acoustic Architecture (Weight ${nodes.music?.priorityWeight || 5}/5): ${nodes.music?.items?.map((i) => i.name).slice(0, 4).join(', ') || 'Eclectic'}
- Visual & Cinema (Weight ${nodes.film?.priorityWeight || 4}/5): ${nodes.film?.items?.map((i) => i.name).slice(0, 4).join(', ') || 'Cinematic'}
- Gastronomy (Weight ${nodes.dining?.priorityWeight || 4}/5): ${nodes.dining?.items?.map((i) => i.name).slice(0, 4).join(', ') || 'Artisanal'}
- Sartorial Palette (Weight ${nodes.fashion?.priorityWeight || 3}/5): ${nodes.fashion?.items?.map((i) => i.name).slice(0, 4).join(', ') || 'Minimal'}
- Spatial Atmosphere (Weight ${nodes.atmosphere?.priorityWeight || 5}/5): ${nodes.atmosphere?.items?.map((i) => i.name).slice(0, 4).join(', ') || 'Sensory'}
(Synthesize with deep sensitivity to these prioritized taste preferences)`;
      }

      const userMessage = `User Request: "${prompt}"
${tasteTreeContext}

Extracted Qloo Cultural Entities:
- Anchors: ${seeds.map((s) => `${s.name} (${s.category})`).slice(0, 4).join(', ')}
- Qloo Recommended Music: ${recs.music.map((m) => m.name).slice(0, 5).join(', ')}
- Qloo Recommended Film: ${recs.film.map((f) => f.name).slice(0, 5).join(', ')}
- Qloo Recommended Dining: ${recs.dining.map((d) => d.name).slice(0, 5).join(', ')}
- Qloo Recommended Sartorial/Fashion: ${recs.fashion.map((s) => s.name).slice(0, 5).join(', ')}
- Qloo Recommended Spaces/Vibe: ${recs.atmosphere.map((a) => a.name).slice(0, 5).join(', ')}
- Taste Graph Coherence: ${insights.tasteAffinitySummary.coherenceScore}%

Please output a JSON object containing enriched editorial copy for this blueprint with these keys:
{
  "title": string (evocative, Kinfolk-style title),
  "editorialSubtitle": string,
  "narrativeOverview": string (2-3 sentences of lyrical, high-end editorial prose),
  "curatorNotes": string,
  "lightingDescription": string,
  "aromaProfile": string,
  "wineOrCocktailPairing": string,
  "conversationAnchors": string[] (strictly top 3 unique thought-provoking prompts)
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
        if (enriched.lightingDescription) fallbackBlueprint.sensory.lightingDescription = enriched.lightingDescription;
        if (enriched.aromaProfile) fallbackBlueprint.sensory.aromaProfile = enriched.aromaProfile;
        if (enriched.wineOrCocktailPairing) fallbackBlueprint.categories.gastronomy.wineOrCocktailPairing = enriched.wineOrCocktailPairing;
        if (Array.isArray(enriched.conversationAnchors)) {
          fallbackBlueprint.sensory.conversationAnchors = enriched.conversationAnchors.slice(0, 3);
        }
      }
    } catch (err) {
      console.warn(`[Gemini Enrichment] Fallback to internal editorial engine: ${(err as Error).message}`);
    }
  }

  return fallbackBlueprint;
}
