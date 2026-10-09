<div align="center">

# 🏛️ VIBE ARCHITECT
### *Autonomous Cultural Atmosphere Designer*
**Powered by Qloo’s 250M+ Entity Cultural Taste Graph & Google Gemini**

[![License: MIT](https://img.shields.io/badge/License-MIT-C36B4E.svg)](LICENSE)
[![Framework: Next.js 16](https://img.shields.io/badge/Framework-Next.js%2016-242220.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-7C8D76.svg)](https://www.typescriptlang.org/)
[![Qloo Hackathon](https://img.shields.io/badge/Qloo-Cultural%20Taste%20Graph-C36B4E.svg)](https://docs.qloo.com/)

---

<p align="center">
  <b>Most AI agents are culturally blind.</b> They reason and write code, but ask them to design an authentic spatial atmosphere, and they guess with generic stereotypes.<br/>
  <b>Vibe Architect</b> bridges that gap: translating human moments, spaces, and gatherings into culturally grounded, multi-sensory blueprints spanning music, gastronomy, cinema, fashion, and spatial aesthetics.
</p>

[Live Demo](#-live-demo--deployment) • [Why Qloo?](#-the-core-differentiator-why-qloo-makes-it-possible) • [5-Node Taste Tree Memory](#-persistent-5-node-user-taste-memory-tree) • [Browser Search Ingestion](#-browser-search--taste-history-ingestion) • [Agent Architecture](#-agent-architecture--reasoning-loop) • [Strict List Capping](#-strict-list-capping--curatorial-balance) • [Getting Started](#-getting-started)

---

</div>

## 📖 Table of Contents
1. [The Problem: Why Generic LLMs Fail at Culture](#-the-problem-why-generic-llms-fail-at-culture)
2. [The Core Differentiator: Why Qloo Makes It Possible](#-the-core-differentiator-why-qloo-makes-it-possible)
3. [Persistent 5-Node User Taste Memory Tree](#-persistent-5-node-user-taste-memory-tree)
4. [Browser Search & Taste History Ingestion](#-browser-search--taste-history-ingestion)
5. [Strict List Capping & Curatorial Balance (Top 3–5)](#-strict-list-capping--curatorial-balance)
6. [Agent Architecture & Reasoning Loop](#-agent-architecture--reasoning-loop)
7. [The 3-Pillar Experiential Dossier (Powered by Qloo 5D Graph)](#-the-3-pillar-experiential-dossier-powered-by-qloo-5d-graph)
8. [Editorial Design Philosophy](#-editorial-design-philosophy)
9. [Real-World Lateral Use Cases](#-real-world-lateral-use-cases)
10. [API & Engineering Architecture](#-api--engineering-architecture)
11. [Getting Started & Local Setup](#-getting-started)
12. [Hackathon Submission Verification](#-hackathon-submission-verification)
13. [License](#-license)

---

## 🌪️ The Problem: Why Generic LLMs Fail at Culture

Standard Large Language Models (LLMs) are trained on massive token distributions, but they **lack real cultural affinity networks**:
- Ask a standard LLM to recommend a restaurant for an audience that loves *Wong Kar-wai* and *ambient modal jazz*, and it hallucinates generic high-end sushi or whatever appears frequently in listicles.
- Ask it to select lighting temperatures for a vinyl listening salon, and it gives generic advice like *"dim the lights"*.
- **The result:** Recommendations that are *technically functional*, but culturally superficial and disjointed.

---

## 🧬 The Core Differentiator: Why Qloo Makes It Possible

**Vibe Architect** grounds every single recommendation in **Qloo’s Taste Graph (250M+ verified entities across music, film, dining, fashion, and places)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HUMAN MOMENT PROMPT                             │
│     "A candlelit vinyl listening salon with Miles Davis & wine"        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   QLOO ENTITY DISAMBIGUATION                           │
│  Resolves text signals → Verified entities (Miles Davis, Natural Wine) │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│              QLOO CROSS-DOMAIN AFFINITY TRAVERSAL                      │
│     Traverses 250M+ entity graph across 5 cultural dimensions:         │
│     • Music: Bill Evans, Chet Baker (Modal Jazz / 64-72 BPM)           │
│     • Dining: Georgian skin-contact orange wine, Spanish conservas     │
│     • Cinema: Wong Kar-wai, 35mm step-printed amber palettes           │
│     • Fashion: Lemaire, Studio Nicholson, washed Belgian linens        │
│     • Spaces: Japandi earthen plaster, fluted walnut, 2400K lighting   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                AUTONOMOUS CULTURAL HARMONIC SYNTHESIS                  │
│       Calculates 96.4% Coherence Score & Generates Blueprint           │
└────────────────────────────────────────────────────────────────────────┘
```

### Side-by-Side: Generic LLM vs. Vibe Architect (Qloo-Powered)

| Aspect | Generic LLM Alone | Vibe Architect (Qloo Grounded) |
|---|---|---|
| **Music Selection** | Popular jazz playlists from Spotify | Specific modal pacing (64–72 BPM), Bill Evans harmonic voicings, acoustic breathing room |
| **Culinary & Drink** | "Red wine and Italian pasta" | 2021 Georgian Rkatsiteli skin-contact amber wine, salt-cured Spanish anchovies, artisanal sourdough |
| **Lighting Strategy** | "Use warm yellow light" | Precise **2400K–2600K** Kelvin luminescence rating, indirect floor paper lanterns, zero overhead glare |
| **Tactile Materials** | "Wood furniture" | Fluted American walnut joinery, unglazed stoneware earthenware, unwashed Belgian linen |
| **Cultural Coherence** | Random items thrown together | Statistically verified cross-category affinity based on 250M+ taste relationships |

---

## 🌳 Persistent 5-Node User Taste Memory Tree

> **The Problem**: Traditional AI interfaces treat users as ephemeral, anonymous prompters. They analyze a single prompt text in isolation, with zero enduring knowledge of who the user is, what aesthetics they treasure, or what sensory priorities they hold.

**Vibe Architect** solves this by establishing an enduring **5-Node Cultural Knowledge Tree** that persists in the user's browser across sessions and prompts:

```
                          ┌─────────────────────────────┐
                          │   USER TASTE MEMORY TREE    │
                          │   (Persistent Local Graph)  │
                          └──────────────┬──────────────┘
                                         │
        ┌────────────────┬───────────────┼───────────────┬────────────────┐
        ▼                ▼               ▼               ▼                ▼
   ┌─────────┐      ┌─────────┐     ┌─────────┐     ┌─────────┐      ┌─────────┐
   │🎵 MUSIC │      |🎬 FILM │     │ 🍷 DINE │     │ ✂️ STYLE│     │ 🏛️ SPACE│
   │ Priority│      │ Priority│     │ Priority│     │ Priority│      │ Priority│
   │  1x–5x  │      │  1x–5x  │     │  1x–5x  │     │  1x–5x  │      │  1x–5x  │
   └─────────┘      └─────────┘     └─────────┘     └─────────┘      └─────────┘
   Acoustic         Cinematic       Gastronomy &    Sartorial &      Spatial &
   Architecture     Tone & 35mm     Libations       Tactile Fibers   Ambiance
```

### The 5 Cultural Nodes

| Node | Domain | Default Weight | Role in Synthesis & Qloo Discovery |
|---|---|---|---|
| **01 🎵 Acoustic Architecture** | Music & Soundscapes | **5x (Dominant)** | Anchors BPM tempos, analog vinyl instrumentation, and harmonic voicings (e.g. *Bill Evans, Alice Coltrane, Brian Eno*). |
| **02 🎬 Visual & Cinematic Tone** | Cinema & Visuals | **4x (High)** | Guides lighting contrast, 35mm grain, and director aesthetics (e.g. *Wong Kar-wai, Denis Villeneuve, Studio Ghibli*). |
| **03 🍷 Gastronomy & Libations** | Dining & Drink | **4x (High)** | Directs low-intervention viniculture, craft fermentations, and culinary pairings (e.g. *Georgian amber wines, Spanish conservas*). |
| **04 ✂️ Sartorial & Tactile Palette** | Fashion & Textiles | **3x (Balanced)** | Informs relaxed silhouettes, tactile natural fibers, and drape (e.g. *Washed Belgian linen, Studio Nicholson, Margaret Howell*). |
| **05 🏛️ Spatial Architecture & Ambiance** | Interior Design | **5x (Dominant)** | Controls precise Kelvin color temperatures, botanical olfactory profiles, and material joinery (e.g. *2400K incandescent, Hinoki cypress*). |

### Interactive Priority Meters (1x to 5x)
- Every node has an interactive priority slider in the **Taste Tree Drawer**.
- Adjusting a node from `1x (Minimal)` to `5x (Dominant)` increases that cultural domain's gravity in the agent's reasoning loop and prompts the Qloo resolver to favor that domain's correlate entities.

### Continuous Auto-Learning
- When **Auto-Learn** is enabled, every synthesized blueprint is automatically analyzed for high-affinity cultural correlates.
- Discovered entities are absorbed into the corresponding node with a `[LEARNED]` tag, expanding your personal cultural profile over time while preventing duplicate entries.

---

## 🔍 Browser Search & Taste History Ingestion

Modern browsers sandbox client web applications for user privacy, preventing scripts from reading private Chrome search history. Vibe Architect introduces a **Browser Search & Cultural History Ingestion Engine** that gives users the exact same personalized benefit transparently:

1. **Direct Query Ingestion**: Users can paste recent browser searches, discovered artists, or bookmarked places (e.g., `"amber skin-contact wine bars, listened to Alice Coltrane vinyl, watched Past Lives 35mm lighting, brutalist walnut joinery"`).
2. **Heuristic Cultural Classification**: The ingestion engine analyzes textual signals and assigns each term to the appropriate node (Music, Cinema, Dining, Fashion, Atmosphere) with an automatic priority weight.
3. **✨ Simulate Browser History Sync**: Includes a one-click simulation button that populates realistic cultural search queries to immediately show how external browser signals tune the 5-node tree.

---

## ⚖️ Strict List Capping & Curatorial Balance

> **The Problem**: Unbounded AI outputs often overwhelm users with bloated 10–20 item lists, or produce jarringly uneven lists where one category has 15 items and another has 1.

Vibe Architect enforces strict, balanced **Curatorial Capping** across the entire UI and API pipeline:

* **Top 3 Curated by Default**: Every domain card displays strictly the top 3 highest-affinity cultural correlates.
* **Top 5 Maximum Cap**: When correlates exceed 3 items, an interactive toggle button appears:
  - Collapsed: `+ Show Top 5 Correlates (5 Total)`
  - Expanded: `▲ Show Top 3 Curated`
  - Lists **never exceed 5 items**, preserving editorial elegance.
* **Sensory Capping**:
  - Tactile material surfaces: strictly capped at **4 materials**.
  - Sartorial palette fabrics: strictly capped at **4 materials**.
  - Curated conversation anchors: strictly capped at **3 thought-provoking prompts**.
* **Upstream Qloo Guardrails**: The Qloo Insights tool sets `sample_size=5` and slices all incoming candidate pools to ensure efficient bandwidth and zero list overflow.

---

## 🤖 Agent Architecture & Reasoning Loop

Vibe Architect executes a **6-stage autonomous reasoning pipeline** that harmonizes user taste memory with natural language prompts:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HUMAN MOMENT PROMPT                             │
│     "A candlelit vinyl listening salon with Miles Davis & wine"        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: TASTE MEMORY GROUNDING                                        │
│ Blends 5-Node Taste Tree priorities (Music: 5x, Space: 5x, etc.)       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: INTENT DECONSTRUCTION                                         │
│ Parses aesthetic vocabulary, spatial intent, and social context        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: QLOO ENTITY DISAMBIGUATION (/search)                          │
│ Resolves prompt + priority anchors against Qloo 250M+ entity graph     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: CROSS-DOMAIN TASTE TRAVERSAL (/v2/insights)                   │
│ Traverses Qloo affinity graph with strict sample_size=5 list capping   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 5: CULTURAL COHERENCE VERIFICATION                               │
│ Computes multi-domain coherence score (0–100%) and Cultural Archetype  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ STAGE 6: BLUEPRINT EDITORIAL SYNTHESIS & SENSORY NUANCE                │
│ Gemini 3.8 Flash personalizes narrative, Kelvin lighting, & pairings  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ AUTO-LEARNING LOOP: Absorbs high-affinity correlates into Taste Tree   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 The 3-Pillar Experiential Dossier (Powered by Qloo 5D Graph)

Rather than overwhelming users with disconnected database tables, Vibe Architect weaves Qloo's 5-dimensional graph traversal into a cohesive, tactile **3-Pillar Experiential Dossier**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE VIBE IDENTITY                               │
│        Title, Editorial Subtitle, Poetic Atmosphere Narrative          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
  PILLAR 01: THE SCENE      PILLAR 02: THE RITUAL     PILLAR 03: THE AESTHETIC
 (Space, Light & Scent)    (Soundscape & Libation)   (Visual Mood & Attire)
```

1. 🏛️ **Pillar 01 • The Scene (Space, Light & Scent)**:
   - **Physical Space & Joinery**: Architectural atmosphere, materials, and spatial layout.
   - **Luminescence & Shadows**: Exact Kelvin values (e.g., 2200K amber gas-lamp warmth vs. 2700K halogen) and lighting dispersion.
   - **Olfactory Signature**: Botanical, woodsmoke, and natural scent profiles.
   - **Tactile Palette**: Surface textures (fluted walnut, unglazed stoneware, brushed brass).
   - **Atmospheric Touchstones**: High-affinity venue and architectural benchmarks from Qloo.

2. 🎧 **Pillar 02 • The Ritual (Sound & Libation)**:
   - **On The Turntable / Soundscape**: Musical theme, acoustic pacing, and BPM tempo.
   - **Acoustic Selections**: Curated vinyl records and artists.
   - **In The Glass & Libation Pairing**: Exact cellar pours, craft beers, natural wines, or artisanal teas.
   - **At The Table**: Gastronomic culinary concept and small plate pairings.

3. 🎬 **Pillar 03 • The Aesthetic (Visual Mood & Attire)**:
   - **Visual Moodboard & Color Theory**: Framing motifs, color palettes, and cinematographic aesthetic references.
   - **What To Wear (Attire Ethos)**: Practical dress code tailored to the room's atmosphere.
   - **Recommended Textiles**: Curated fabric swatches (washed linen, raw indigo, undyed cashmere, waxed cotton).
   - **Sartorial Correlates**: Brand and styling touchstones.

4. 🗣️ **The Social Spark: Curated Conversation Anchors**:
   - 3 thought-provoking, taste-graph correlated dialogue prompts naturally tailored to the gathering.

5. 🧬 **Interactive Dual-Mode Toggle: Qloo Taste Graph (5D Engine)**:
   - **Default View**: Sleek, immersive **Experiential Dossier**.
   - **One-Click Inspector**: Switch to **`🧬 Qloo Taste Graph (5D Engine)`** to inspect raw cross-domain affinity scores, category mappings, and entity tags for hackathon judges and curators.

6. 🔊 **Procedural Web Audio Room Texture Generator**:
   - Integrated into Pillar 02 (*The Ritual*), visitors can click `[ ▶ Listen to Room Acoustic Texture ]` to experience **real-time procedural audio synthesis** via the native browser Web Audio API:
     - **Analog Vinyl Crackle & Tube Warmth** for intimate jazz salons and bohemian pubs.
     - **Rain on Glass & Sub-Bass Atmosphere** for rainy Tokyo listening bars.
     - **Hearth Ember Crackle & Wind Breath** for rustic Nordic cabin retreats.
   - Built with zero external MP3 assets or audio files—synthesized purely on the client with dynamic bandpass filters, Poisson impulse buffers, and organic oscillators.

7. 🔗 **Shareable URL Deep-Linking & 1-Click Markdown Dossier Export**:
   - **Full URL Synchronization**: App automatically mirrors the active prompt in the URL query string (`?prompt=...`). Loading any deep-link automatically initializes and synthesizes that specific cultural atmosphere.
   - **Curatorial Spec Sheet Export (.md)**: One-click `[ 📄 Export Spec (.md) ]` downloads a comprehensive, print-ready Markdown dossier including all 3 pillars, lighting specs, Kelvin badges, sensory profiles, and Qloo affinity metrics.
   - **Outbound Curatorial Badges**: Direct links for `Spotify ↗`, `Letterboxd ↗`, and `Explore ↗` allow judges to immediately verify resolved entities against real-world cultural platforms.

8. ⚡ **Interactive Qloo API Diagnostics & Live Latency Modal**:
   - Clicking the `● QLOO LIVE GRAPH ACTIVE` masthead pill opens a live curatorial architecture modal displaying:
     - Verified authenticated endpoint (`https://hackathon.api.qloo.com`)
     - Live roundtrip latency ping with interactive re-test (`⚡ Re-test Live Latency`)
     - Complete 7-domain coverage and raw JSON diagnostic payload inspector.

---

## 🏛️ Editorial Design Philosophy

> **No generic AI purple gradients. No synthetic glassmorphic bubbles.**

Vibe Architect is designed with the restraint, tactile warmth, and typographic balance of **high-end print magazines** like *Kinfolk*, *Cereal*, and *Apartamento*:
- **Color Palette**: Warm plaster cream (`#F9F6F0`), terracotta clay (`#C36B4E`), botanical sage (`#6B7F67`), and deep charcoal ink (`#22201E`).
- **Typography**: Editorial serif display fonts (*Cinzel* & *Newsreader*) paired with clean modern grotesk (*Plus Jakarta Sans*) and monospaced data markers (*Space Mono*).
- **Interactive Calibration**: Real-time sliders allow users to adjust **Acoustic Energy**, **Temporal Era**, and **Spatial Intimacy**, recalculating cultural harmonics on the fly.

---

## 💡 Real-World Lateral Use Cases

Vibe Architect is built for real-world creative, hospitality, and spatial industries:

* **Interior & Lighting Designers**: Specify exact Kelvin values (2400K vs 3000K), fixtures, and sensory pairings that harmonize with a client's artistic taste.
* **Boutique Hospitality & Restaurateurs**: Curate entire dinner tasting events—matching sonic acoustics, staff uniforms, tableware glazes, and natural wine pairings.
* **Corporate & Creative Offsites**: Find the cultural overlap zone when bridging disparate teams (e.g., bridging vintage hip-hop with craft beer and folk aesthetics).
* **Private Gatherings & Salon Hosts**: Create unforgettable evenings where music, food, lighting, and conversation anchors fit together seamlessly.

---

## 🛠️ API & Engineering Architecture

### Technology Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: TypeScript 5+ (Strict typing across all entities)
- **Styling**: Vanilla CSS Modules (Design-token driven, zero external CSS dependencies)
- **Cultural Intelligence**: Qloo Hackathon Taste Graph API (`https://hackathon.api.qloo.com/v2/insights` & `/search`)
- **Agent Intelligence**: Google Gemini 3.8 Flash (`gemini-3.8-flash`) via official `@google/genai` SDK
- **Taste Memory Engine**: Client-side 5-Node Knowledge Tree with `localStorage` persistence, priority weighting, and browser search signal ingestion
- **Sensory Acoustics**: Browser-native Web Audio API procedural synthesis engine (zero external audio files)
- **Dossier Exporter**: Client-side Markdown curatorial spec sheet generator and URL state serializer
- **Hosting & Deployment**: Vercel (Production-optimized)

### API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/qloo/status` | `GET` | Health check and diagnostics for Qloo API connectivity and graph entity state |
| `/api/agent/generate` | `POST` | Executes the autonomous agent loop: grounds in 5-Node Taste Tree, deconstructs prompt, queries Qloo v2, and returns blueprint |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20.0.0 or newer (v22+ recommended)
- **npm**: v10.0.0 or newer
- **Git**

### 2. Clone and Install
```bash
git clone https://github.com/your-username/vibe-architect.git
cd vibe-architect
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your API keys in `.env.local`:
```env
# Google Gemini API Key for agentic reasoning
GEMINI_API_KEY=your_gemini_api_key_here

# Qloo Hackathon Taste Graph credentials
QLOO_API_KEY=your_qloo_hackathon_key_here
QLOO_BASE_URL=https://hackathon.api.qloo.com
QLOO_TRUSTED_BASE_URL=https://hackathon.api.qloo.com
```

> **Note on Qloo Key**: The system features a **dual-mode architecture**. If your Qloo API key is pending approval, Vibe Architect automatically activates its high-fidelity local cultural graph engine (25+ curated seed entities). Once your live key arrives, simply paste it in `.env.local`—no code changes required!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📦 Hackathon Submission Verification

| Requirement | Status | Details |
|---|---|---|
| **1. Functional Demo Application** | ✅ Verified | Runs locally at `http://localhost:3000`, deployable to Vercel via included `vercel.json` |
| **2. Public Code Repository** | ✅ Verified | Complete Git repository with 28+ clean, atomic commits |
| **3. Project Description** | ✅ Verified | Full cultural grounding explanation, agent pipeline, and Qloo differentiation documented |
| **4. External Hosting Ready** | ✅ Verified | Production-tested build (`npm run build`) passing with Turbopack and zero errors |
| **5. Open-Source License** | ✅ Verified | [MIT License](LICENSE) included in root repository |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Crafted for the Qloo LLM Hackathon 2026. Designed with cultural intelligence.</sub>
</div>
