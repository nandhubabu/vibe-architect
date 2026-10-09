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

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates an editorial print-to-PDF document and invokes the browser print/save-as-PDF dialog.
 */
export function downloadBlueprintPDF(blueprint: CulturalBlueprint): void {
  if (typeof window === 'undefined') return;

  const { categories, sensory, culturalDNA } = blueprint;

  const anchors = (culturalDNA?.anchorEntities || []).map(escapeHtml).join(' • ') || 'Curated Taste Archetype';
  const materials = (sensory?.textureMaterials || []).map(escapeHtml).join(', ') || 'Natural organic textures';
  const conversation = (sensory?.conversationAnchors || [])
    .map((c) => `<li>&ldquo;${escapeHtml(c)}&rdquo;</li>`)
    .join('');

  const formatChips = (entities: Array<{ name: string; affinityScore?: number }>) =>
    (entities || [])
      .map(
        (e) =>
          `<span class="chip">${escapeHtml(e.name)} <small>${Math.round((e.affinityScore || 0.9) * 100)}%</small></span>`
      )
      .join(' ');

  const spaceChips = formatChips(categories.spaces?.entities || []);
  const musicChips = formatChips(categories.soundtrack?.entities || []);
  const diningChips = formatChips(categories.gastronomy?.entities || []);
  const cinemaChips = formatChips(categories.cinema?.entities || []);
  const fashionChips = formatChips(categories.sartorial?.entities || []);

  const cleanTitle = escapeHtml(blueprint.title || 'Curatorial Blueprint');
  const cleanSubtitle = escapeHtml(blueprint.editorialSubtitle || '');
  const cleanNarrative = escapeHtml(blueprint.narrativeOverview || '');
  const cleanNotes = escapeHtml(blueprint.curatorNotes || '');

  const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${cleanTitle} — Curatorial Specification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Space+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 14mm 16mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Newsreader', Georgia, serif;
      color: #22201E;
      background: #FFFFFF;
      line-height: 1.45;
      padding: 16px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid #22201E;
      padding-bottom: 10px;
      margin-bottom: 16px;
    }

    .masthead-logo {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #22201E;
    }

    .masthead-tag {
      font-family: 'Space Mono', monospace;
      font-size: 7.5pt;
      letter-spacing: 0.08em;
      color: #C36B4E;
      text-transform: uppercase;
    }

    .blueprint-hero {
      margin-bottom: 16px;
    }

    .blueprint-title {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 20pt;
      font-weight: 600;
      line-height: 1.2;
      color: #22201E;
      margin-bottom: 4px;
    }

    .blueprint-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-style: italic;
      font-size: 11pt;
      color: #585551;
      line-height: 1.35;
    }

    .meta-ribbon {
      display: flex;
      justify-content: space-between;
      background: #F9F6F0;
      border: 1px solid #E5E0D8;
      border-left: 3px solid #C36B4E;
      padding: 8px 12px;
      margin-bottom: 16px;
      font-family: 'Space Mono', monospace;
      font-size: 7.5pt;
      color: #585551;
    }

    .meta-ribbon strong {
      color: #22201E;
    }

    .narrative-section {
      font-size: 10.5pt;
      line-height: 1.55;
      color: #22201E;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid #E5E0D8;
    }

    .curator-box {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8.5pt;
      background: #FAF7F2;
      border-left: 3px solid #5A6B4E;
      padding: 8px 12px;
      color: #585551;
      margin-bottom: 18px;
    }

    .pillar-card {
      border: 1px solid #E5E0D8;
      padding: 12px 14px;
      margin-bottom: 14px;
      background: #FFFFFF;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .pillar-tag {
      font-family: 'Space Mono', monospace;
      font-size: 7pt;
      letter-spacing: 0.1em;
      color: #C36B4E;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }

    .pillar-title {
      font-family: 'Newsreader', serif;
      font-size: 13pt;
      font-weight: 600;
      color: #22201E;
      margin-bottom: 8px;
      border-bottom: 1px solid #F0ECE4;
      padding-bottom: 4px;
    }

    .spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 14px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8.5pt;
      margin-bottom: 8px;
    }

    .spec-item label {
      font-family: 'Space Mono', monospace;
      font-size: 6.5pt;
      text-transform: uppercase;
      color: #87837D;
      display: block;
      margin-bottom: 1px;
    }

    .spec-item span {
      color: #22201E;
      font-weight: 500;
    }

    .chips-container {
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px dashed #E5E0D8;
    }

    .chip {
      display: inline-block;
      background: #F3EFE7;
      padding: 2px 6px;
      font-family: 'Space Mono', monospace;
      font-size: 7pt;
      color: #22201E;
      border-radius: 2px;
      margin-right: 4px;
      margin-bottom: 3px;
    }

    .chip small {
      color: #C36B4E;
      font-weight: 700;
      margin-left: 2px;
    }

    .conversation-box {
      border: 1px solid #E5E0D8;
      background: #FAF7F2;
      padding: 10px 14px;
      margin-bottom: 14px;
      break-inside: avoid;
    }

    .conversation-title {
      font-family: 'Space Mono', monospace;
      font-size: 7pt;
      color: #C36B4E;
      text-transform: uppercase;
      margin-bottom: 6px;
      letter-spacing: 0.08em;
    }

    .conversation-list {
      list-style-type: none;
      font-family: 'Newsreader', Georgia, serif;
      font-style: italic;
      font-size: 9.5pt;
      color: #22201E;
      line-height: 1.45;
    }

    .conversation-list li {
      margin-bottom: 4px;
      padding-left: 12px;
      text-indent: -12px;
    }

    .footer {
      border-top: 1px solid #22201E;
      padding-top: 8px;
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      font-family: 'Space Mono', monospace;
      font-size: 6.5pt;
      color: #87837D;
      break-inside: avoid;
    }

    @media screen {
      .print-bar {
        position: sticky;
        top: 0;
        background: #22201E;
        color: #FFFFFF;
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: -16px -16px 16px -16px;
        font-family: 'Space Mono', monospace;
        font-size: 8.5pt;
        z-index: 9999;
      }
      .print-btn {
        background: #C36B4E;
        color: #FFFFFF;
        border: none;
        padding: 6px 14px;
        font-family: 'Space Mono', monospace;
        font-size: 8pt;
        font-weight: 700;
        cursor: pointer;
        border-radius: 2px;
      }
    }

    @media print {
      .print-bar {
        display: none !important;
      }
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <span>VIBE ARCHITECT • PRINT SPECIFICATION DOSSIER</span>
    <button class="print-btn" onclick="window.print()">PRINT / SAVE AS PDF</button>
  </div>

  <div class="top-masthead">
    <div class="masthead-logo">VIBE ARCHITECT</div>
    <div class="masthead-tag">CURATORIAL SPECIFICATION • VOL. 01</div>
  </div>

  <div class="blueprint-hero">
    <h1 class="blueprint-title">${cleanTitle}</h1>
    <p class="blueprint-subtitle">${cleanSubtitle}</p>
  </div>

  <div class="meta-ribbon">
    <div>COHERENCE: <strong>${culturalDNA?.qlooAffinityScore || 96}%</strong></div>
    <div>SIGNATURE: <strong>${escapeHtml(culturalDNA?.tasteSignature || 'Curated Assemblage')}</strong></div>
    <div>ANCHORS: <strong>${anchors}</strong></div>
  </div>

  <div class="narrative-section">
    ${cleanNarrative}
  </div>

  <div class="curator-box">
    <strong>CURATORIAL METHODOLOGY:</strong> ${cleanNotes}
  </div>

  <!-- PILLAR 01 -->
  <div class="pillar-card">
    <span class="pillar-tag">PILLAR 01 • SPATIAL & SENSORY</span>
    <h2 class="pillar-title">The Scene</h2>
    <div class="spec-grid">
      <div class="spec-item"><label>Atmosphere</label><span>${escapeHtml(categories.spaces?.architecturalAtmosphere || 'Custom')}</span></div>
      <div class="spec-item"><label>Luminescence</label><span>${escapeHtml(sensory?.lightingKelvin || '2400K')} — ${escapeHtml(sensory?.lightingDescription || categories.spaces?.ambientLighting || '')}</span></div>
      <div class="spec-item"><label>Olfactory Signature</label><span>${escapeHtml(sensory?.aromaProfile || 'Botanical notes')}</span></div>
      <div class="spec-item"><label>Tactile Surfaces</label><span>${materials}</span></div>
    </div>
    <div class="chips-container">${spaceChips}</div>
  </div>

  <!-- PILLAR 02 -->
  <div class="pillar-card">
    <span class="pillar-tag">PILLAR 02 • AUDITORY & CULINARY</span>
    <h2 class="pillar-title">The Ritual</h2>
    <div class="spec-grid">
      <div class="spec-item"><label>Soundtrack Theme</label><span>${escapeHtml(categories.soundtrack?.theme || 'Curated Horizon')}</span></div>
      <div class="spec-item"><label>Tempo & Cadence</label><span>${escapeHtml(categories.soundtrack?.tempo || 'Unhurried')}</span></div>
      <div class="spec-item"><label>Gastronomy</label><span>${escapeHtml(categories.gastronomy?.concept || 'Artisanal Pairings')}</span></div>
      <div class="spec-item"><label>Libation Pairing</label><span>${escapeHtml(categories.gastronomy?.wineOrCocktailPairing || 'Cellar Pour')}</span></div>
    </div>
    <div class="chips-container">${musicChips} ${diningChips}</div>
  </div>

  <!-- PILLAR 03 -->
  <div class="pillar-card">
    <span class="pillar-tag">PILLAR 03 • VISUAL & SARTORIAL</span>
    <h2 class="pillar-title">The Aesthetic</h2>
    <div class="spec-grid">
      <div class="spec-item"><label>Cinematic Tone</label><span>${escapeHtml(categories.cinema?.aestheticTone || 'Evocative visual framing')}</span></div>
      <div class="spec-item"><label>Visual Motif</label><span>${escapeHtml(categories.cinema?.visualMotif || 'Natural shadows')}</span></div>
      <div class="spec-item"><label>Sartorial Dress</label><span>${escapeHtml(categories.sartorial?.dressCode || 'Relaxed architectural tailoring')}</span></div>
      <div class="spec-item"><label>Textiles & Swatches</label><span>${escapeHtml((categories.sartorial?.materialsAndPalette || []).join(', ') || 'Natural organic fibers')}</span></div>
    </div>
    <div class="chips-container">${cinemaChips} ${fashionChips}</div>
  </div>

  ${conversation ? `
  <div class="conversation-box">
    <div class="conversation-title">CURATED CONVERSATION ANCHORS</div>
    <ul class="conversation-list">${conversation}</ul>
  </div>` : ''}

  <div class="footer">
    <div>SYNTHESIZED BY VIBE ARCHITECT • POWERED BY QLOO CULTURAL TASTE GRAPH</div>
    <div>GENERATED: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
  </div>

  <script>
    // Trigger print automatically when loaded in isolated print frame/window
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>`;

  // Create isolated hidden iframe to trigger print without disrupting the current page
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(printHtml);
    doc.close();
    // Clean up iframe after print dialog completes
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 60000);
  } else {
    // Fallback: open printable window
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(printHtml);
      printWin.document.close();
    }
  }
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

