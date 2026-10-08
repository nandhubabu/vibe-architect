import { CulturalBlueprint, QlooEntity, QlooInsightsResponse } from '@/types/qloo';
import { getGeminiClient, AGENT_SYSTEM_PROMPT } from './gemini';
import { ParsedUserIntent } from './resolver';

/**
 * Synthesizes the final Cultural Blueprint combining Qloo's taste graph data
 * with editorial prose.
 */
export async function synthesizeCulturalBlueprint(
  prompt: string,
  intent: ParsedUserIntent,
  insights: QlooInsightsResponse
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
        entities: recs.music.length > 0 ? recs.music : seeds.filter((s) => s.category === 'music'),
        tempo: 'Slow-burn modal progression (68–74 BPM)',
      },
      gastronomy: {
        concept: 'Low-Intervention Artisanal Table',
        entities: recs.dining,
        wineOrCocktailPairing: 'Skin-contact Georgian orange wine or peated Japanese highball with hand-chipped ice',
      },
      cinema: {
        aestheticTone: 'Lyrical Color Theory & Symmetrical Restraint',
        entities: recs.film,
        visualMotif: 'Step-printed 35mm grain, natural daylight through sheer linen drapery',
      },
      sartorial: {
        dressCode: 'Deconstructed Minimal & Tactile Earth',
        entities: recs.fashion,
        materialsAndPalette: ['Washed Belgian linen', 'Raw indigo selvedge', 'Undyed taupe cashmere', 'Terracotta twill'],
      },
      spaces: {
        architecturalAtmosphere: 'Wabi-sabi plaster with warm wood joinery',
        entities: recs.atmosphere,
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
      anchorEntities: seeds.map((s) => s.name),
      qlooAffinityScore: insights.tasteAffinitySummary.coherenceScore,
      tasteSignature: insights.tasteAffinitySummary.culturalArchetype,
    },
  };

  // Attempt enhancement via Google Gemini if API key is present
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim().length > 0) {
    try {
      const ai = getGeminiClient();
      const userMessage = `User Request: "${prompt}"

Extracted Qloo Cultural Entities:
- Anchors: ${seeds.map((s) => `${s.name} (${s.category})`).join(', ')}
- Qloo Recommended Music: ${recs.music.map((m) => m.name).join(', ')}
- Qloo Recommended Film: ${recs.film.map((f) => f.name).join(', ')}
- Qloo Recommended Dining: ${recs.dining.map((d) => d.name).join(', ')}
- Qloo Recommended Sartorial/Fashion: ${recs.fashion.map((s) => s.name).join(', ')}
- Qloo Recommended Spaces/Vibe: ${recs.atmosphere.map((a) => a.name).join(', ')}
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
  "conversationAnchors": string[] (3 unique thought-provoking prompts)
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
        if (Array.isArray(enriched.conversationAnchors)) fallbackBlueprint.sensory.conversationAnchors = enriched.conversationAnchors;
      }
    } catch (err) {
      console.warn(`[Gemini Enrichment] Fallback to internal editorial engine: ${(err as Error).message}`);
    }
  }

  return fallbackBlueprint;
}
