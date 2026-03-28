export type Pricing = 'Free' | 'Freemium' | 'Paid'

export interface Tool {
  slug: string
  name: string
  category: string
  purpose: string   // short — shown on cards
  detail: string    // longer — shown on individual tool page
  beats: string     // one-line claim
  beatsWhy: string  // 1–2 sentences explaining why, with personality
  users: string
  votes: number
  pricing: Pricing
  url: string
}

export const TOOLS: Tool[] = [
  {
    slug: 'elicit',
    name: 'Elicit',
    category: 'Research',
    purpose:
      'Finds and summarizes academic papers in seconds. Like having a PhD researcher who never sleeps.',
    detail:
      'You drop in a research question and Elicit goes and finds the papers, extracts the key findings, and lays them out for you. No library access required. No hours of reading. Just the answers, with receipts.',
    beats: 'Deep academic research',
    beatsWhy:
      "ChatGPT can talk about research. Elicit actually does it — pulling live papers, summarizing findings, and citing sources you can verify. It's a completely different tool for a completely different job.",
    users: '380k',
    votes: 847,
    pricing: 'Freemium',
    url: 'https://elicit.com',
  },
  {
    slug: 'suno',
    name: 'Suno',
    category: 'Music',
    purpose:
      'Type a mood. Get a full song — vocals, instruments, everything. It sounds real.',
    detail:
      "Describe a vibe, a genre, a feeling — and Suno builds a complete song around it. Real vocals. Real instruments. Real production quality. You don't need to know anything about music to use it.",
    beats: 'Generating complete songs',
    beatsWhy:
      "ChatGPT can write lyrics. Suno makes the actual song — mixed, mastered, ready to share. There's genuinely no comparison here.",
    users: '2.1M',
    votes: 2341,
    pricing: 'Freemium',
    url: 'https://suno.com',
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    category: 'Research',
    purpose:
      'Answers with sources attached. Stop guessing if your AI is making things up.',
    detail:
      "Every answer Perplexity gives comes with the links it pulled from. You can click through and verify anything in seconds. If you've ever stared at a ChatGPT answer wondering if it's real — this fixes that.",
    beats: 'Real-time cited answers',
    beatsWhy:
      "ChatGPT can hallucinate confidently and you'd never know. Every Perplexity answer is sourced. You can check it. That's not a small thing — that's the whole trust problem solved.",
    users: '15M',
    votes: 3102,
    pricing: 'Freemium',
    url: 'https://perplexity.ai',
  },
  {
    slug: 'gamma',
    name: 'Gamma',
    category: 'Design',
    purpose:
      'Paste your messy notes. Get a slide deck you\'d actually send to a client.',
    detail:
      "Paste in your bullet points, your draft, your half-baked ideas — and Gamma turns it into a real presentation with actual design. Not a text dump. A deck you can open in a meeting and not be embarrassed by.",
    beats: 'Presentation creation',
    beatsWhy:
      "ChatGPT can outline your slides in text. Gamma builds the actual deck — design, layout, formatting, the whole thing. One is a draft. The other is a finished product.",
    users: '4M',
    votes: 1893,
    pricing: 'Freemium',
    url: 'https://gamma.app',
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Voice',
    purpose:
      'AI voices that sound like real humans. Clone your own voice in under a minute.',
    detail:
      "ElevenLabs makes AI voices that are genuinely indistinguishable from humans. You can clone your own voice with a short recording, or pick from a library of voices that don't sound robotic at all.",
    beats: 'Voice cloning and audio',
    beatsWhy:
      "ChatGPT's voice is fine. ElevenLabs is unsettling — in the best way. The cloning alone makes it a completely different category of tool.",
    users: '1.2M',
    votes: 2187,
    pricing: 'Freemium',
    url: 'https://elevenlabs.io',
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    category: 'Coding',
    purpose:
      'Understands your whole codebase, not just the line you\'re staring at.',
    detail:
      "Cursor isn't a chatbot you paste code into. It's an editor that reads your entire project — all the files, all the imports, all the context — and helps you work inside it. The difference is obvious the first time you use it.",
    beats: 'Full codebase editing',
    beatsWhy:
      "ChatGPT sees what you paste. Cursor knows your entire codebase. When you ask it to fix something, it knows what that change breaks three files away. That's what good coding help actually looks like.",
    users: '800k',
    votes: 2904,
    pricing: 'Freemium',
    url: 'https://cursor.com',
  },
  {
    slug: 'manus',
    name: 'Manus',
    category: 'Research',
    purpose:
      'Does entire research tasks by itself. Not just answers — full work, done for you.',
    detail:
      "You give Manus a task and walk away. It browses the web, reads sources, compiles findings, and hands you back finished work. Not a summary. Not bullet points. An actual deliverable.",
    beats: 'Autonomous task completion',
    beatsWhy:
      "ChatGPT answers questions. Manus completes entire workflows on its own — no prompting, no babysitting, no back and forth. It's the difference between a tool and an assistant.",
    users: '200k',
    votes: 1205,
    pricing: 'Freemium',
    url: 'https://manus.im',
  },
]

export function getToolBySlug(slug: string) {
  return TOOLS.find((t) => t.slug === slug)
}

export function getRelatedTools(tool: Tool, limit = 2) {
  return TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, limit)
}

export const CATEGORY_STYLES: Record<string, string> = {
  Research: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  Coding:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Music:    'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Writing:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Voice:    'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Design:   'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Video:    'bg-orange-500/10 text-orange-400 border-orange-500/20',
}
