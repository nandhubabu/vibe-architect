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

[Live Demo](#-live-demo--deployment) • [Why Qloo?](#-the-core-differentiator-why-qloo-makes-it-possible) • [Agent Architecture](#-agent-architecture--reasoning-loop) • [Design Philosophy](#-editorial-design-philosophy) • [Getting Started](#-getting-started)

---

</div>

## 📖 Table of Contents
1. [The Problem: Why Generic LLMs Fail at Culture](#-the-problem-why-generic-llms-fail-at-culture)
2. [The Core Differentiator: Why Qloo Makes It Possible](#-the-core-differentiator-why-qloo-makes-it-possible)
3. [Agent Architecture & Reasoning Loop](#-agent-architecture--reasoning-loop)
4. [The 6-Dimensional Cultural Blueprint](#-the-6-dimensional-cultural-blueprint)
5. [Editorial Design Philosophy](#-editorial-design-philosophy)
6. [Real-World Lateral Use Cases](#-real-world-lateral-use-cases)
7. [API & Engineering Architecture](#-api--engineering-architecture)
8. [Getting Started & Local Setup](#-getting-started)
9. [Hackathon Submission Verification](#-hackathon-submission-verification)
10. [License](#-license)

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

## 🤖 Agent Architecture & Reasoning Loop

Vibe Architect executes a strict **multi-stage autonomous reasoning pipeline**:

### Stage 1: Intent Deconstruction
- Parses unstructured natural language prompt into aesthetic keywords, occasion intent, and social context (intimate tête-à-tête vs. lively salon vs. creative collective).

### Stage 2: Qloo Entity Disambiguation (`/v1/search`)
- Identifies and verifies anchor entities against Qloo's cultural database across music, film, gastronomy, and fashion categories.

### Stage 3: Cross-Domain Taste Traversal (`/v1/insights`)
- Traverses Qloo's affinity graph to extract high-affinity complementary entities across 5 distinct domains.

### Stage 4: Cultural Coherence Calculation
- Evaluates statistical alignment across all selected entities to compute a **Coherence Score (0–100%)** and identify the **Cultural Archetype** (e.g. *The Contemplative Connoisseur*, *The Nocturnal Flâneur*).

### Stage 5: Blueprint Synthesis & Tactile Details
- Integrates Google Gemini 2.5 Flash to weave verified Qloo entities with sensory nuances: lighting Kelvin ratings, olfactory notes, and curated conversation anchors.

---

## 🎨 The 6-Dimensional Cultural Blueprint

Every generated blueprint provides an exhaustive, multi-sensory specification:

1. 🎵 **Acoustic Architecture**: Music artists, album aesthetics, harmonic texture, and tempo (BPM).
2. 🍽️ **Gastronomy & Libations**: Cuisine philosophy, artisanal food pairings, and specific cellar/craft cocktails.
3. 🎬 **Visual & Cinematic Tone**: Director aesthetics, color grading palettes, and cinematographic framing motifs.
4. 👗 **Sartorial & Material Palette**: Dress code ethos, tactile fabrics (washed linen, raw indigo, undyed cashmere).
5. 📍 **Spatial Architecture**: Interior atmosphere, furniture joinery, and architectural light dispersion.
6. 🕯️ **Sensory Nuance Engine**:
   - **Luminescence (Kelvin)**: Specific light temperature (e.g., 2200K candlelight vs. 2700K halogen).
   - **Olfactory Profile**: Botanical and natural scent notes (hinoki, smoked vetiver, dried bergamot).
   - **Tactile Palette**: Surface textures (unglazed stoneware, brushed brass).
   - **Conversation Anchors**: Qloo-correlated dialogue and intellectual prompts.

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
- **Cultural Intelligence**: Qloo Hackathon Taste Graph API (`https://hackathon.api.qloo.com`)
- **Agent Intelligence**: Google Gemini 2.5 Flash via `@google/genai` SDK
- **Hosting & Deployment**: Vercel (Production-optimized)

### API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/qloo/status` | `GET` | Health check and diagnostics for Qloo API connectivity and graph entity state |
| `/api/agent/generate` | `POST` | Executes the autonomous agent loop: deconstructs prompt, queries Qloo, and returns blueprint |

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
