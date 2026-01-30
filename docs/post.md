# 🔄 This Portfolio Rearranges Itself Based on Your Job Description

*This is a submission for the [New Year, New You Portfolio Challenge Presented by Google AI](https://dev.to/challenges/new-year-new-you-google-ai-2025-12-31)*

## About Me

Hey there! 👋 I'm **Kairus Noah Tecson**, a Head of Engineering based in the Philippines with a passion for building AI-powered platforms and agentic workflows.

Here's the problem I wanted to solve: **Recruiters spend seconds scanning portfolios.** They're looking for specific keywords, relevant projects, matching experience—and they don't have time to dig through your entire work history to find it.

So I asked myself: *What if my portfolio could do the digging for them?*

The result is a portfolio that **reads your job description** and **reorganizes itself** to show the most relevant content first. Paste a JD, and watch the sections reorder and highlight in real-time.

## Portfolio

{% embed https://new-year-new-you-portfolio-761580697973.us-south1.run.app/ %}

## How I Built It

### 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **AI Engine** | Gemini 2.5 Flash via Vertex AI |
| **State Management** | Zustand |
| **Animations** | Framer Motion |
| **Deployment** | Docker + Google Cloud Run |
| **DNS / CDN** | Cloudflare (Free Tier) |

### 🧠 How the Rearranging Works

The portfolio has two layers:

1. **The Chat Interface (Hero)**: Paste a job description or ask a question like *"Do you have experience with RAG systems?"*

2. **The Portfolio (Content)**: Sections dynamically **reorder** (e.g., Projects slides above Experience) and specific items get **highlighted** based on relevance.

### 🤖 The AI Behind It

**Gemini 2.5 Flash** analyzes your input and returns a structured JSON configuration:

```json
{
  "layout_order": ["projects", "experience", "skills"],
  "highlight_ids": ["project-0", "skill-2"],
  "message": "I've prioritized your AI/ML projects and Python skills..."
}
```

This JSON updates a **Zustand store**, which triggers **Framer Motion animations** for smooth section transitions. The whole flow takes under 2 seconds.

### 🎨 Design: Neo-Brutalism

Bold borders. Hard shadows. Vibrant accents (purple, yellow, pink). The aesthetic is inspired by a "creative workshop" vibe—the chat interface feels like a command center that *controls* the portfolio below.

## What I'm Most Proud Of

### 🔄 The Live Rearranging

Watching "Projects" smoothly slide above "Experience" because the AI decided it's more relevant to a Frontend role—that moment of *"it actually works"* never gets old.

### ✨ Smart Highlighting

Relevant skills and projects get a visual boost (border glow, background tint) so recruiters can scan faster. The AI picks which items to highlight based on keyword matching from the JD.

### 🎮 Hidden Easter Eggs

Click around the hero section and you might find animated sprites—a running knight, bouncing slimes, spinning coins. Because portfolios should have *personality*.

### 🚀 $0.00/month Infrastructure

| Service | Monthly Cost |
|---------|-------------|
| Vertex AI (Gemini 2.5 Flash) | $0.00 (free tier) |
| Google Cloud Run | $0.00 (2M requests free) |
| Cloudflare DNS | $0.00 |
| **Total** | **$0.00** |

Rate limiting (5 req/min, 20 req/day per user) keeps costs at zero while preventing abuse.

---

**Try it yourself!** Paste a job description into the chat and watch the portfolio adapt. I'd love to hear what you think. 🙏

- 🐙 [GitHub](https://github.com/SchadenKai)
- 💼 [LinkedIn](https://www.linkedin.com/in/kairus-tecson/)
