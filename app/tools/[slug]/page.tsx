import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import FavoriteButton from '../../components/FavoriteButton'
import { TOOLS, getToolBySlug, getRelatedTools, CATEGORY_STYLES } from '../../../lib/tools'
import { createClient } from '@/supabase/server'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return { title: 'Not found' }
  return {
    title: tool.name,
    description: tool.purpose,
  }
}

export default async function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const related = getRelatedTools(tool)
  const catStyle = CATEGORY_STYLES[tool.category] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'

  // Check if this tool is favorited by the current user
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  let isFavorited = false
  if (user) {
    const { data } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('tool_slug', params.slug)
      .maybeSingle()
    isFavorited = !!data
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-[680px] mx-auto px-5 pt-28 pb-24">

        {/* Back */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mb-12"
        >
          ← All tools
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-[#1F1F1F] flex items-center justify-center text-xl font-bold text-gray-600 dark:text-[#A1A1AA] shrink-0">
            {tool.name[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-1.5">
              {tool.name}
            </h1>
            <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border ${catStyle}`}>
              {tool.category}
            </span>
          </div>
          <FavoriteButton
            toolSlug={params.slug}
            initialFavorited={isFavorited}
            userId={user?.id ?? null}
          />
        </div>

        {/* Long purpose */}
        <p className="text-[20px] text-gray-900 dark:text-white leading-relaxed mb-8 font-normal">
          {tool.detail}
        </p>

        {/* Why it beats ChatGPT */}
        <div className="bg-[#7C3AED]/[0.07] border border-[#7C3AED]/20 rounded-xl px-5 py-4 mb-8">
          <p className="text-[12px] font-bold text-[#7C3AED] uppercase tracking-wider mb-2">
            Why it beats ChatGPT:
          </p>
          <p className="text-[15px] font-semibold text-gray-900 dark:text-white mb-2">
            {tool.beats}
          </p>
          <p className="text-[14px] text-gray-500 dark:text-[#A1A1AA] leading-relaxed">
            {tool.beatsWhy}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-[#A1A1AA] bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F] rounded-full px-3.5 py-2">
            <span>👥</span>
            <span>{tool.users} users</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-[#A1A1AA] bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F] rounded-full px-3.5 py-2">
            <span>▲</span>
            <span>{tool.votes.toLocaleString()} upvotes</span>
          </div>
          <div
            className={`text-[13px] font-medium px-3.5 py-2 rounded-full border ${
              tool.pricing === 'Free'
                ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                : tool.pricing === 'Freemium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}
          >
            {tool.pricing}
          </div>
        </div>

        {/* CTA */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full text-[15px] font-semibold px-7 py-4 rounded-xl bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200 mb-12"
        >
          Try {tool.name} for free →
        </a>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-[#1F1F1F] mb-10" />

        {/* Related tools */}
        {related.length > 0 && (
          <div>
            <h2 className="text-[12px] font-semibold text-gray-400 dark:text-[#A1A1AA] uppercase tracking-widest mb-4">
              More tools like this
            </h2>
            <div className="flex flex-col gap-3">
              {related.map((r) => {
                const rs = CATEGORY_STYLES[r.category] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                return (
                  <Link
                    key={r.slug}
                    href={`/tools/${r.slug}`}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F] rounded-xl hover:border-[#7C3AED]/30 hover:-translate-y-px transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-[#1F1F1F] flex items-center justify-center text-[13px] font-bold text-gray-600 dark:text-[#A1A1AA] shrink-0">
                      {r.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[14px] text-gray-900 dark:text-white">{r.name}</p>
                      <p className="text-[12px] text-gray-500 dark:text-[#A1A1AA] truncate mt-0.5">{r.purpose}</p>
                    </div>
                    <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${rs}`}>
                      {r.category}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
