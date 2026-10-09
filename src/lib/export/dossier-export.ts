import { CulturalBlueprint } from '@/types/qloo';

/**
 * Formats a CulturalBlueprint into a high-aesthetic, curated Markdown Spec Sheet.
 */
export function formatBlueprintAsMarkdown(blueprint: CulturalBlueprint): string {
  const { categories, sensory, culturalDNA } = blueprint;

  const anchors = culturalDNA?.anchorEntities?.join(', ') || 'N/A';
  const materials = sensory?.textureMaterials?.join(', ') || 'N/A';
  const conversation = sensory?.conversationAnchors
    ?.map((c) => `- "${c}"`)
    .join('\n') || '- N/A';

  const soundtrackEntities = categories.soundtrack?.entities
    ?.map((e) => `- **${e.name}** (${Math.round((e.affinityScore || 0.9) * 100)}% Affinity) — *${e.subcategory || e.category}*: ${e.description || ''}`)
    .join('\n') || 'None listed';

  const filmEntities = categories.cinema?.entities
    ?.map((e) => `- **${e.name}** (${Math.round((e.affinityScore || 0.9) * 100)}% Affinity) — *${e.subcategory || e.category}*: ${e.description || ''}`)
    .join('\n') || 'None listed';

  const diningEntities = categories.gastronomy?.entities
    ?.map((e) => `- **${e.name}** (${Math.round((e.affinityScore || 0.9) * 100)}% Affinity) — *${e.subcategory || e.category}*: ${e.description || ''}`)
    .join('\n') || 'None listed';

  const sartorialEntities = categories.sartorial?.entities
    ?.map((e) => `- **${e.name}** (${Math.round((e.affinityScore || 0.9) * 100)}% Affinity) — *${e.subcategory || e.category}*: ${e.description || ''}`)
    .join('\n') || 'None listed';

  const spaceEntities = categories.spaces?.entities
    ?.map((e) => `- **${e.name}** (${Math.round((e.affinityScore || 0.9) * 100)}% Affinity) — *${e.subcategory || e.category}*: ${e.description || ''}`)
    .join('\n') || 'None listed';

  return `# ${blueprint.title}
*${blueprint.editorialSubtitle}*

---

### CULTURAL SPECIFICATION OVERVIEW
- **Original Brief:** "${blueprint.prompt || 'Curated Cultural Moment'}"
- **Qloo Graph Coherence:** ${culturalDNA?.qlooAffinityScore || 96.0}%
- **Cultural Taste Signature:** ${culturalDNA?.tasteSignature || 'Curated Assemblage'}
- **Resolved Cultural Anchors:** ${anchors}
- **Timestamp:** ${blueprint.createdAt || new Date().toISOString()}

---

## 00. Narrative Atmosphere
${blueprint.narrativeOverview}

> **Curatorial Methodology:**
> ${blueprint.curatorNotes}

---

## PILLAR 01 • THE SCENE (Space, Light & Scent)
- **Architectural Atmosphere:** ${categories.spaces?.architecturalAtmosphere || 'Custom Spatial Setting'}
- **Luminescence:** ${sensory?.lightingKelvin || 'Warm incandescent'} (${categories.spaces?.ambientLighting || sensory?.lightingDescription || ''})
- **Olfactory Signature:** ${sensory?.aromaProfile || 'Unspecified'}
- **Tactile Material Palette:** ${materials}

### Architectural & Spatial References
${spaceEntities}

---

## PILLAR 02 • THE RITUAL (Sound & Libation)
- **Soundscape Progression:** ${categories.soundtrack?.theme || 'Curated Acoustic Horizon'}
- **Tempo & Cadence:** ${categories.soundtrack?.tempo || 'Unhurried tempo'}
- **Signature Libation / Pour:** ${categories.gastronomy?.wineOrCocktailPairing || 'Cellar selection'}
- **Gastronomic Concept:** ${categories.gastronomy?.concept || 'Artisanal culinary pairing'}

### Acoustic Correlates (Qloo Music Graph)
${soundtrackEntities}

### Gastronomic Correlates (Qloo Dining Graph)
${diningEntities}

---

## PILLAR 03 • THE AESTHETIC (Visual Mood & Attire)
- **Cinematic Framing & Tone:** ${categories.cinema?.aestheticTone || 'Evocative visual palette'}
- **Visual Motif:** ${categories.cinema?.visualMotif || 'Natural shadows and rich textures'}
- **Sartorial Ethos:** ${categories.sartorial?.dressCode || 'Relaxed architectural tailoring'}
- **Textiles & Swatches:** ${(categories.sartorial?.materialsAndPalette || []).join(', ') || 'Natural organic fibers'}

### Visual Correlates (Qloo Cinema Graph)
${filmEntities}

### Sartorial Correlates (Qloo Fashion Graph)
${sartorialEntities}

---

## SOCIAL SPARK • CONVERSATION ANCHORS
${conversation}

---
*Synthesized by Vibe Architect • Powered by Qloo's Cultural Taste Graph (250M+ Entities) & Google Gemini 2.5.*
`;
}

/**
 * Triggers a direct browser file download of the blueprint in Markdown format.
 */
export function downloadBlueprintMarkdown(blueprint: CulturalBlueprint): void {
  const markdown = formatBlueprintAsMarkdown(blueprint);
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  // Slugify title for clean filename
  const cleanTitle = (blueprint.title || 'cultural-blueprint')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);

  link.href = url;
  link.setAttribute('download', `${cleanTitle}-curatorial-spec.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
