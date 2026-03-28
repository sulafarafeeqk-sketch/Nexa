import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '../components/Navbar'
import { createClient } from '@/supabase/server'
import { getToolBySlug, CATEGORY_STYLES } from '../../lib/tools'

export const metadata = { title: 'My Tools' }

export default async function MyToolsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: favorites } = await supabase
    .from('user_favorites')
    .select('tool_slug')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const savedTools = (favorites ?? [])
    .map((f) => getToolBySlug(f.tool_slug))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 pt-28 pb-24">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
          My Tools
        </h1>
        <p className="text-gray-500 dark:text-[#A1A1AA] mb-10 text-[15px]">
          {savedTools.length > 0
            ? `${savedTools.length} tool${savedTools.length > 1 ? 's' : ''} saved`
            : 'Your saved tools will live here.'}
        </p>

        {savedTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-2xl">
              🔖
            </div>
            <p className="text-[#A1A1AA] text-[15px] max-w-xs">
              You haven&apos;t saved anything yet. Browse the tools and hit the heart to save.
            </p>
            <Link
              href="/tools"
              className="text-[14px] font-semibold px-6 py-2.5 rounded-full bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200"
            >
              Browse tools →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedTools.map((tool) => {
              if (!tool) return null
              const catStyle = CATEGORY_STYLES[tool.category] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex flex-col bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F] rounded-xl p-5 hover:border-[#7C3AED]/40 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(124,58,237,0.08)]"
                >
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
                  <p className="text-[13px] text-gray-500 dark:text-[#A1A1AA] leading-relaxed mb-4 flex-1">
                    {tool.purpose}
                  </p>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[11px] font-bold text-[#7C3AED] shrink-0 mt-px">Beats ChatGPT at:</span>
                    <span className="text-[11px] text-gray-700 dark:text-white/75 leading-snug">{tool.beats}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
