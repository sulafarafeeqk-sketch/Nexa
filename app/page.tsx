'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'

export default function LandingPage() {
  const { user } = useAuth()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ctaHref = user ? '/tools' : '/auth/signup'
  const ctaText = user ? 'Go to my tools →' : 'Find your AI →'
  const belowCta = user
    ? 'Pick up where you left off.'
    : 'No sign up. No paywalls. Just better tools.'

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-14 pb-12 overflow-hidden">
        {/* Floating orbs — only on landing */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#7C3AED]/[0.07] blur-3xl" style={{ animation: 'orb1 25s ease-in-out infinite' }} />
          <div className="absolute top-[60%] right-[8%] w-[400px] h-[400px] rounded-full bg-[#7C3AED]/[0.05] blur-3xl" style={{ animation: 'orb2 35s ease-in-out infinite' }} />
          <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-purple-600/[0.06] blur-3xl" style={{ animation: 'orb3 40s ease-in-out infinite' }} />
          <div className="absolute top-[40%] left-[55%] w-[280px] h-[280px] rounded-full bg-violet-500/[0.04] blur-2xl" style={{ animation: 'orb4 30s ease-in-out infinite' }} />
          <div className="absolute top-[5%] right-[25%] w-[320px] h-[320px] rounded-full bg-[#7C3AED]/[0.05] blur-3xl" style={{ animation: 'orb5 45s ease-in-out infinite' }} />
        </div>

        {/* Radial glow center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          <div className="w-[700px] h-[420px] rounded-full bg-[#7C3AED]/[0.10] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[720px] mx-auto w-full">
          <div className="inline-flex items-center border border-gray-200 dark:border-[#1F1F1F] bg-gray-50 dark:bg-white/[0.03] text-gray-500 dark:text-[#A1A1AA] text-xs font-medium px-3.5 py-1.5 rounded-full mb-8 tracking-wide">
            Free AI Discovery
          </div>

          <h1 className="text-[clamp(2.6rem,7vw,5.2rem)] font-extrabold tracking-tight leading-[1.05] mb-5 text-gray-900 dark:text-white">
            ChatGPT isn&apos;t your<br className="hidden sm:block" />
            <span className="text-[#7C3AED]"> only option.</span>
          </h1>

          <p className="text-[clamp(1rem,2vw,1.15rem)] text-gray-500 dark:text-[#A1A1AA] max-w-[480px] mx-auto mb-9 leading-relaxed">
            Find the tools that actually do your job better. Most of them free. None of them obvious.
          </p>

          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-[15px] font-semibold px-7 py-3.5 rounded-full bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200"
          >
            {ctaText}
          </Link>

          <p className="mt-4 text-xs text-gray-400 dark:text-[#A1A1AA]/50">
            {belowCta}
          </p>
        </div>
      </section>

      {/* ══ VALUE PROPS ══════════════════════════════════ */}
      <section className="fade-in py-24 px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: '🎯',
              title: "You've been missing out",
              desc: "There are tools built for exactly what you do. You just didn't know they existed.",
            },
            {
              icon: '⚖️',
              title: "We tell you why it's better",
              desc: "Every tool comes with one clear reason it beats your current AI at something specific.",
            },
            {
              icon: '🏷️',
              title: 'Free first, always',
              desc: "We always show you what's free. Because the best tool is the one you'll actually use.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="flex flex-col gap-3 p-6 rounded-xl bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F]"
            >
              <span className="text-2xl leading-none">{v.icon}</span>
              <h3 className="font-bold text-[15px] text-gray-900 dark:text-white">{v.title}</h3>
              <p className="text-sm text-gray-500 dark:text-[#A1A1AA] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PREVIEW TEASE ════════════════════════════════ */}
      <section className="fade-in py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
            A few tools waiting for you
          </h2>

          <div className="relative rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 blur-[2px] opacity-20 pointer-events-none select-none">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F] rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-[#1F1F1F] shrink-0" />
                    <div className="flex-1">
                      <div className="h-3 w-20 bg-gray-200 dark:bg-[#1F1F1F] rounded mb-2" />
                      <div className="h-2.5 w-14 bg-gray-200 dark:bg-[#1F1F1F] rounded" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-2.5 w-full bg-gray-200 dark:bg-[#1F1F1F] rounded" />
                    <div className="h-2.5 w-4/5 bg-gray-200 dark:bg-[#1F1F1F] rounded" />
                    <div className="h-2.5 w-3/5 bg-gray-200 dark:bg-[#1F1F1F] rounded" />
                  </div>
                  <div className="h-8 w-full bg-gray-200 dark:bg-[#1F1F1F] rounded-lg" />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-white/10 dark:bg-[#0A0A0A]/20">
              <Link
                href="/tools"
                className="text-[15px] font-semibold px-7 py-3.5 rounded-full bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200 shadow-lg shadow-[#7C3AED]/25"
              >
                See all tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BUILDER CTA ══════════════════════════════════ */}
      <section className="fade-in relative py-28 px-5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          <div className="w-[500px] h-[200px] bg-[#7C3AED]/[0.07] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h2 className="text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Built an AI tool people should know about?
          </h2>
          <p className="text-gray-500 dark:text-[#A1A1AA] text-[15px] leading-relaxed mb-8">
            List it in 60 seconds. Get a referral link instantly. Reach the people who actually need it.
          </p>
          <button className="text-[15px] font-semibold px-7 py-3.5 rounded-full bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200">
            Submit your AI +
          </button>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <footer className="border-t border-gray-100 dark:border-[#1F1F1F] px-5 pt-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <span className="block text-[17px] font-extrabold tracking-tight text-gray-900 dark:text-white mb-1">
                Nexa<span className="text-[#7C3AED]">.</span>
              </span>
              <p className="text-sm text-gray-400 dark:text-[#A1A1AA]">
                The AIs nobody told you about. Until now.
              </p>
            </div>

            <nav className="flex flex-wrap gap-6">
              {['About', 'Submit a Tool', 'Twitter/X'].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-gray-500 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  {l}
                </a>
              ))}
            </nav>

            <p className="text-sm text-gray-400 dark:text-[#A1A1AA]">
              Built by a 15-year-old in Dubai 🇦🇪
            </p>
          </div>

          <div className="border-t border-gray-100 dark:border-[#1F1F1F] pt-6 text-center">
            <p className="text-xs text-gray-400 dark:text-[#A1A1AA]/50">
              © 2026 Nexa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
