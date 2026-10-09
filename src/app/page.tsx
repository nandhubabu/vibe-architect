'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Masthead } from '@/components/Masthead';
import { PromptHero } from '@/components/PromptHero';
import { AgentThinkingView } from '@/components/AgentThinkingView';
import { BlueprintCanvas } from '@/components/BlueprintCanvas';
import { SensoryDetailsGrid } from '@/components/SensoryDetailsGrid';
import { RemixPanel } from '@/components/RemixPanel';
import { CulturalBlueprint, UserTasteTree } from '@/types/qloo';
import { AgentStepLog } from '@/lib/agent/tools';
import { TasteTreeDrawer } from '@/components/TasteTreeDrawer';
import {
  DEFAULT_USER_TASTE_TREE,
  loadUserTasteTree,
  learnFromBlueprint,
} from '@/lib/taste-tree/memory';
import { downloadBlueprintMarkdown } from '@/lib/export/dossier-export';
import { QlooStatusModal } from '@/components/QlooStatusModal';

const DEFAULT_INITIAL_BLUEPRINT: CulturalBlueprint = {
  id: 'blueprint-initial',
  title: 'Atmosphere: Low-Intervention Salon & Vinyl Melancholy',
  editorialSubtitle: 'A curated cultural assemblage for an intimate gathering of design thinkers',
  narrativeOverview:
    'Anchored in the delicate acoustic textures of modal jazz and understated French workwear silhouettes, this spatial curation cultivates an unhurried sanctuary. Indirect warm luminescence pairs with single-vineyard skin-contact wines and restrained modernist cinematography to frame meaningful conversation.',
  curatorNotes:
    'Synthesized through Qloo’s 250M+ cultural entity graph. Cross-domain correlations establish harmony between Bill Evans’ harmonic phrasing, Lemaire’s tactile tailoring, and low-slung walnut joinery.',
  prompt: 'A candlelit vinyl listening salon with Miles Davis, natural wine, and architectural lighting',
  createdAt: '2026-10-09T00:00:00.000Z',
  categories: {
    soundtrack: {
      theme: 'Modal Jazz & Acoustic Breathing Room',
      entities: [
        {
          id: 'music-bill-evans',
          name: 'Bill Evans Trio',
          category: 'music',
          subcategory: 'Post-Bop / Jazz Piano',
          affinityScore: 0.96,
          tags: ['jazz', 'piano', 'melancholy', 'coffee'],
          description: 'Subtle, harmonic jazz piano textures evoking quiet rain and warm wooden interiors.',
        },
        {
          id: 'music-miles-davis',
          name: 'Miles Davis',
          category: 'music',
          subcategory: 'Cool Jazz / Modal Jazz',
          affinityScore: 0.95,
          tags: ['jazz', 'noir', 'late-night'],
          description: 'Iconic trumpeter known for Kind of Blue and evocative modal jazz atmospheres.',
        },
      ],
      tempo: 'Unhurried modal progression (64–72 BPM)',
    },
    gastronomy: {
      concept: 'Low-Intervention Natural Viniculture & Raw Fare',
      entities: [
        {
          id: 'dining-natural-wine',
          name: 'Low-Intervention Natural Wine & Small Plates',
          category: 'dining',
          subcategory: 'Bistronomy / Sommelier Curation',
          affinityScore: 0.95,
          tags: ['natural-wine', 'orange-wine', 'fermentation'],
          description: 'Skin-contact orange wines, salted Spanish anchovies, and crusty sourdough at candlelit tables.',
        },
      ],
      wineOrCocktailPairing: '2021 Pheasant’s Tears Rkatsiteli (Georgian Amber Wine) served at cellar temperature',
    },
    cinema: {
      aestheticTone: 'Lyrical Color Saturation & Slow Pan Cinema',
      entities: [
        {
          id: 'film-wong-kar-wai',
          name: 'Wong Kar-wai (In the Mood for Love)',
          category: 'film',
          subcategory: 'Lyrical Romance / Hong Kong New Wave',
          affinityScore: 0.97,
          tags: ['noir', 'neon', 'rain', 'whisky'],
          description: 'Sultry, step-printed 35mm visuals, cigarette smoke, and timeless melancholy.',
        },
      ],
      visualMotif: 'Step-printed 35mm grain, natural amber shadows against textured linen drapery',
    },
    sartorial: {
      dressCode: 'Deconstructed Minimal & Undyed Fibers',
      entities: [
        {
          id: 'fashion-lemaire',
          name: 'Lemaire & Studio Nicholson Aesthetics',
          category: 'fashion',
          subcategory: 'Quiet Luxury / Architectural Relaxed',
          affinityScore: 0.94,
          tags: ['linen', 'wide-leg', 'earth-tones'],
          description: 'Generous fluid silhouettes, washed silks, and muted earthy tones of stone and taupe.',
        },
      ],
      materialsAndPalette: ['Washed Belgian linen', 'Raw indigo selvedge', 'Undyed taupe cashmere', 'Terracotta twill'],
    },
    spaces: {
      architecturalAtmosphere: 'Wabi-Sabi Plaster with Fluted Walnut',
      entities: [
        {
          id: 'space-japandi-minimalism',
          name: 'Japandi Earthen Plaster & Hinoki Wood',
          category: 'atmosphere',
          subcategory: 'Interior Architecture',
          affinityScore: 0.98,
          tags: ['lime-wash', 'hinoki', 'wabi-sabi'],
          description: 'Textured tadelakt plaster walls, Noguchi Akari washi paper lanterns, and pale cedar timber.',
        },
      ],
      ambientLighting: '2400K indirect candlelight pools; zero overhead direct glare',
    },
  },
  sensory: {
    lightingKelvin: '2400K – 2600K',
    lightingDescription: 'Low-slung parchment floor lamps and beeswax tapers creating soft, golden shadow play.',
    aromaProfile: 'Hinoki cypress, smoked cedar shavings, dried vetiver, and bitter orange peel.',
    textureMaterials: ['Fluted American walnut', 'Unglazed stoneware', 'Heavyweight Belgian linen', 'Antiqued brass'],
    soundtrackPacing: 'Deliberate, unhurried, creating pockets of acoustic breathing room.',
    conversationAnchors: [
      'How physical acoustic media alters our psychological perception of domestic spaces',
      'The tactile contrast between unglazed ceramics and machine-extruded glassware',
      'The emotional resonance of step-printed film stock in 1990s world cinema',
    ],
  },
  culturalDNA: {
    anchorEntities: ['Miles Davis', 'Natural Wine', 'Studio Nicholson', 'Wong Kar-wai'],
    qlooAffinityScore: 96.4,
    tasteSignature: 'The Contemplative Connoisseur',
  },
};

export default function HomePage() {
  const [blueprint, setBlueprint] = useState<CulturalBlueprint>(DEFAULT_INITIAL_BLUEPRINT);
  const [isLoading, setIsLoading] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<AgentStepLog[]>([]);
  const [isComplete, setIsComplete] = useState(true);
  const [tasteTree, setTasteTree] = useState<UserTasteTree>(DEFAULT_USER_TASTE_TREE);
  const [isTasteTreeOpen, setIsTasteTreeOpen] = useState(false);
  const [isQlooStatusOpen, setIsQlooStatusOpen] = useState(false);
  const [tasteMemoryToast, setTasteMemoryToast] = useState<string | null>(null);

  useEffect(() => {
    setTasteTree(loadUserTasteTree());

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPrompt = params.get('prompt') || params.get('vibe');
      if (urlPrompt && urlPrompt.trim().length > 0) {
        handleSynthesize(urlPrompt.trim());
      }
    }
  }, []);

  const totalTasteItems = Object.values(tasteTree.nodes).reduce(
    (acc, n) => acc + (n.items?.length || 0),
    0
  );

  const handleSynthesize = async (promptText: string) => {
    setIsLoading(true);
    setIsComplete(false);

    // Sync prompt to browser URL for 1-click sharing
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('prompt', promptText);
      window.history.replaceState(null, '', url.toString());
    }

    // Initial simulated steps for instantaneous feedback
    const initialSteps: AgentStepLog[] = [
      {
        step: 'Deconstructing Moment Prompt',
        detail: `Analyzing: "${promptText}" for aesthetic and social context.`,
        timestamp: new Date().toISOString(),
      },
      {
        step: 'Taste Memory Grounding',
        detail: `Grounding with 5-Node Taste Tree: Acoustic (${tasteTree.nodes.music.priorityWeight}/5), Cinema (${tasteTree.nodes.film.priorityWeight}/5), Dining (${tasteTree.nodes.dining.priorityWeight}/5), Sartorial (${tasteTree.nodes.fashion.priorityWeight}/5), Atmosphere (${tasteTree.nodes.atmosphere.priorityWeight}/5).`,
        timestamp: new Date().toISOString(),
      },
      {
        step: 'Qloo Entity Resolution',
        detail: 'Connecting natural language signals and prioritized taste anchors to Qloo’s 250M+ entity graph.',
        timestamp: new Date().toISOString(),
      },
    ];
    setReasoningSteps(initialSteps);

    try {
      const response = await fetch('/api/agent/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, userTasteTree: tasteTree }),
      });

      const data = await response.json();

      if (data.success && data.blueprint) {
        setBlueprint(data.blueprint);
        setReasoningSteps(data.steps || initialSteps);
        setIsComplete(true);

        // Auto-learn into taste tree memory
        if (tasteTree.autoLearnEnabled) {
          const { updatedTree, learnedEntities } = learnFromBlueprint(
            tasteTree,
            data.blueprint
          );
          if (learnedEntities.length > 0) {
            setTasteTree(updatedTree);
            setTasteMemoryToast(
              `Learned ${learnedEntities.length} cultural correlate${
                learnedEntities.length > 1 ? 's' : ''
              } (${learnedEntities.join(', ')}) into your 5-Node Taste Tree!`
            );
            setTimeout(() => setTasteMemoryToast(null), 6000);
          }
        }
      } else {
        alert(data.error || 'Failed to synthesize blueprint.');
      }
    } catch (err) {
      console.error(err);
      alert('Network failure connecting to agentic synthesis service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemix = (adjustments: { energy: number; era: number; intimacy: number }) => {
    setIsLoading(true);
    setTimeout(() => {
      // Calibrate blueprint metrics
      setBlueprint((prev) => {
        const energyText = adjustments.energy > 60 ? 'Kinetic & Rhythmic Progression (88–104 BPM)' : 'Unhurried Modal Pacing (60–68 BPM)';
        const kelvinText = adjustments.intimacy > 50 ? '2200K – 2400K (Candlelight Amber)' : '2700K – 3000K (Warm Gallery Halogen)';
        return {
          ...prev,
          title: `Calibrated: ${prev.title.replace(/^Calibrated:\s*/, '')}`,
          categories: {
            ...prev.categories,
            soundtrack: {
              ...prev.categories.soundtrack,
              tempo: energyText,
            },
          },
          sensory: {
            ...prev.sensory,
            lightingKelvin: kelvinText,
          },
          culturalDNA: {
            ...prev.culturalDNA,
            qlooAffinityScore: Math.min(99.2, prev.culturalDNA.qlooAffinityScore + 1.2),
          },
        };
      });
      setIsLoading(false);
    }, 600);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (blueprint?.prompt) {
        url.searchParams.set('prompt', blueprint.prompt);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url.toString()).catch(() => {});
      }
    }
  };

  const handleExportMarkdown = () => {
    if (blueprint) {
      downloadBlueprintMarkdown(blueprint);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Masthead
        onOpenTasteTree={() => setIsTasteTreeOpen(true)}
        onOpenQlooStatus={() => setIsQlooStatusOpen(true)}
        tasteTreeItemsCount={totalTasteItems}
      />

      <div className={styles.tasteTreeBanner}>
        <div className={styles.tasteTreeBannerLeft}>
          <span className={styles.bannerTag}>ACTIVE TASTE MEMORY</span>
          <span className={styles.bannerTitle}>
            5-Node Cultural Memory Model
          </span>
          <div className={styles.bannerNodes}>
            <span className={styles.nodePill}>🎵 Music: {tasteTree.nodes.music.priorityWeight}x</span>
            <span className={styles.nodePill}>🎬 Film: {tasteTree.nodes.film.priorityWeight}x</span>
            <span className={styles.nodePill}>🍷 Dining: {tasteTree.nodes.dining.priorityWeight}x</span>
            <span className={styles.nodePill}>✂️ Fashion: {tasteTree.nodes.fashion.priorityWeight}x</span>
            <span className={styles.nodePill}>🏛️ Space: {tasteTree.nodes.atmosphere.priorityWeight}x</span>
          </div>
        </div>
        <button
          type="button"
          className={styles.bannerBtn}
          onClick={() => setIsTasteTreeOpen(true)}
        >
          Adjust Priorities & Ingest Searches →
        </button>
      </div>

      {tasteMemoryToast && (
        <div className={styles.memoryToast}>
          <span className={styles.toastIcon}>🧬</span>
          <span>{tasteMemoryToast}</span>
          <button
            type="button"
            className={styles.toastViewBtn}
            onClick={() => setIsTasteTreeOpen(true)}
          >
            View Tree →
          </button>
        </div>
      )}

      <main className={styles.mainContent}>
        <PromptHero onSynthesize={handleSynthesize} isLoading={isLoading} />

        <AgentThinkingView steps={reasoningSteps} isComplete={isComplete} />

        <BlueprintCanvas blueprint={blueprint} />

        <RemixPanel
          onRemix={handleRemix}
          onShare={handleShare}
          onExportMarkdown={handleExportMarkdown}
          isRemixing={isLoading}
        />
      </main>

      <TasteTreeDrawer
        isOpen={isTasteTreeOpen}
        onClose={() => setIsTasteTreeOpen(false)}
        tasteTree={tasteTree}
        onUpdateTree={setTasteTree}
      />

      <QlooStatusModal
        isOpen={isQlooStatusOpen}
        onClose={() => setIsQlooStatusOpen(false)}
      />

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerLogo}>VIBE ARCHITECT</div>
            <div className={styles.footerTagline}>Autonomous Cultural Atmosphere Design</div>
          </div>
          <div className={styles.footerRight}>
            <span>POWERED BY QLOO TASTE GRAPH (250M+ ENTITIES)</span>
            <span>•</span>
            <span>GOOGLE GEMINI 2.5</span>
            <span>•</span>
            <a
              href="https://docs.qloo.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              QLOO DOCUMENTATION
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
