# 🏛️ Vibe Architect

> **Cultural Intelligence Meets Spatial & Experiential Synthesis.**  
> Powered by **Qloo Taste Graph (250M+ Entities)** and **Autonomous Agentic Reasoning**.

---

## 💡 The Premise: Why Cultural Grounding Matters

Agents can calculate, plan, and code—but ask them what a bespoke dinner party feels like, how lighting complements Japanese whisky, or what film pairs with vintage jazz, and generic LLMs guess or revert to stereotypical cliches.

**Vibe Architect** is an autonomous agentic system that transforms any spatial, social, or emotional moment description into a cohesive **Cultural Blueprint**:
- 🎵 **Soundtrack & Acoustic Architecture** (Music artists, sonic texture, tempo)
- 🍽️ **Gastronomy & Libations** (Cuisine aesthetics, craft pairings, dining vibe)
- 🎬 **Visual & Narrative Context** (Cinema, auteur directors, photography)
- 👗 **Material & Sartorial Palette** (Fabrics, silhouettes, palette, tactile feel)
- 📍 **Spatial & Atmospheric Venues** (Venues, ambient lighting, architectural cues)
- 🕯️ **Sensory Nuances** (Lighting Kelvin temperatures, aromatic notes, conversation anchors)

---

## 🧬 Why It Only Works With Qloo

Standard LLMs lack real cultural cross-affinity graphs. They cannot accurately predict why an audience with an affinity for *Wong Kar-wai* and *ambient jazz* also correlates strongly with *natural wine bars* and *mid-century minimalist lighting*.

**Vibe Architect** grounds every recommendation in Qloo's:
1. **Entity Search API** (`/v1/search`) – Disambiguates unstructured human concepts into verified cultural entities.
2. **Insights API** (`/v1/insights`) – Traverses the cross-domain graph to pull high-affinity entities across music, dining, fashion, and media.
3. **Taste Analysis & Affinity Scoring** – Guarantees that disparate elements feel culturally harmonious rather than randomly assembled.

---

## 🎨 Editorial Design Philosophy

Unlike typical AI applications overloaded with synthetic gradients and generic purple glassmorphism, **Vibe Architect** embodies a **high-end editorial magazine** aesthetic inspired by publications like *Kinfolk* and *Cereal*:
- Earthy, tactile color palette: warm plaster cream (`#F9F6F0`), terracotta clay (`#C36B4E`), muted sage (`#7C8D76`), charcoal ink (`#242220`).
- Editorial serif headings (*Playfair Display*) paired with crisp modern typography (*Inter*).
- Architectural proportioning, delicate framing borders, and layout restraint.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Vanilla CSS Modules (Design-token driven, zero Tailwind dependency)
- **Cultural Graph**: Qloo API (`https://hackathon.api.qloo.com`)
- **Agent Intelligence**: Google Gemini 2.5/Flash & Function Calling Agent
- **Deployment Target**: Vercel

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ (recommended v22+)
- npm 10+

### 2. Environment Setup
Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

Fill in your API credentials:
```env
GEMINI_API_KEY=your_gemini_api_key_here
QLOO_API_KEY=your_qloo_hackathon_api_key_here
QLOO_BASE_URL=https://hackathon.api.qloo.com
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
