'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import FavoriteButton from '../components/FavoriteButton'
import { TOOLS, CATEGORY_STYLES } from '../../lib/tools'
import { useAuth } from '../context/AuthContext'
import { createClient } from '@/supabase/client'

const FILTERS = ['All', 'Writing', 'Research', 'Coding', 'Music', 'Video', 'Design', 'Voice']

export default function ToolsPage() {
  const { user } = useAuth()
  const [active, setActive] = useState('All')
  const [filtering, setFiltering] = useState(false)
  const [favoriteSlugs, setFavoriteSlugs] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from('user_favorites')
      .select('tool_slug')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setFavoriteSlugs(new Set(data.map((f) => f.tool_slug)))
      })
  }, [user])

  function handleFilter(cat: string) {
    if (cat === active) return
    setFiltering(true)
    setTimeout(() => { setActive(cat); setFiltering(false) }, 150)
  }

  const visible = active === 'All' ? TOOLS : TOOLS.filter((t) => t.category === active)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* ── Page header ──────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 pt-28 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
          Find what actually works for you
        </h1>
        <p className="text-gray-500 dark:text-[#A1A1AA] mb-8 text-[15px] max-w-xl">
          Niche tools that do one thing better than anything else. Curated. Honest. Free options always included.
        </p>

        {/* Search bar */}
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1F1F1F] rounded-xl px-4 py-3 mb-8 max-w-sm">
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-gray-400 dark:text-[#A1A1AA] shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search tools..."
            disabled
            className="bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#A1A1AA]/50 outline-none w-full cursor-not-allowed"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`text-[13px] font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'bg-[#7C3AED] border-[#7C3AED] text-white'
                  : 'border-gray-200 dark:border-[#1F1F1F] text-gray-600 dark:text-[#A1A1AA] hover:border-[#7C3AED]/40 hover:text-[#7C3AED] dark:hover:text-[#7C3AED]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tool grid ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 pb-24">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-150 ${
            filtering ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {visible.length > 0 ? (
            visible.map((tool) => {
              const catStyle = CATEGORY_STYLES[tool.category] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group relative flex flex-col bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F] rounded-xl p-5 hover:border-[#7C3AED]/40 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(124,58,237,0.08)]"
                >
                  {/* Top row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-[#1F1F1F] flex items-center justify-center text-[13px] font-bold text-gray-600 dark:text-[#A1A1AA] shrink-0">
                      {tool.name[0]}
                    </div>
                    <p className="flex-1 font-bold text-[15px] text-gray-900 dark:text-white leading-snug truncate">
                      {tool.name}
                    </p>
                    <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${catStyle}`}>
                      {tool.category}
                    </span>
                  </div>

                  {/* Purpose */}
                  <p className="text-[13px] text-gray-500 dark:text-[#A1A1AA] leading-relaxed mb-4 flex-1">
                    {tool.purpose}
                  </p>

                  {/* Beats ChatGPT at */}
                  <div className="flex items-start gap-1.5 mb-4">
                    <span className="text-[11px] font-bold text-[#7C3AED] shrink-0 mt-px">Beats ChatGPT at:</span>
                    <span className="text-[11px] text-gray-700 dark:text-white/75 leading-snug">{tool.beats}</span>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#1F1F1F]">
                    <span className="text-[12px] text-gray-400 dark:text-[#A1A1AA]">{tool.users} users</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[12px] text-gray-400 dark:text-[#A1A1AA]">
                        <span className="hover:text-[#7C3AED] transition-colors cursor-default">▲</span>
                        <span>{tool.votes.toLocaleString()}</span>
                      </div>
                      <FavoriteButton
                        toolSlug={tool.slug}
                        initialFavorited={favoriteSlugs.has(tool.slug)}
                        userId={user?.id ?? null}
                      />
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-[#A1A1AA] text-[15px] mb-3">Nothing here yet. Check back soon.</p>
              <button onClick={() => handleFilter('All')} className="text-sm text-[#7C3AED] hover:underline">
                See all tools
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
