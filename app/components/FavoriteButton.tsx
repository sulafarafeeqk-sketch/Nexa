'use client'

import { useState } from 'react'
import { createClient } from '@/supabase/client'

interface Props {
  toolSlug: string
  initialFavorited: boolean
  userId: string | null
}

export default function FavoriteButton({ toolSlug, initialFavorited, userId }: Props) {
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)

  async function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!userId) {
      window.location.href = '/auth/login'
      return
    }
    setLoading(true)
    const prev = favorited
    setFavorited(!prev) // optimistic

    const supabase = createClient()
    if (prev) {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('tool_slug', toolSlug)
      if (error) setFavorited(prev)
    } else {
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: userId, tool_slug: toolSlug })
      if (error) setFavorited(prev)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={favorited ? 'Remove from saved' : 'Save tool'}
      className={`p-1.5 rounded-lg transition-all duration-200 ${
        favorited
          ? 'text-rose-500 hover:text-rose-400'
          : 'text-gray-400 dark:text-[#A1A1AA] hover:text-rose-400'
      } hover:bg-rose-500/10`}
    >
      <svg
        width="16" height="16" viewBox="0 0 24 24"
        fill={favorited ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
