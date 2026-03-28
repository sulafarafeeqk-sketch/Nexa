'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/tools')
    }
  }

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <Link href="/" className="block text-center text-[17px] font-extrabold tracking-tight text-white mb-8">
          Nexa<span className="text-[#7C3AED]">.</span>
        </Link>

        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8">
          <h1 className="text-xl font-extrabold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-[#A1A1AA] mb-6">Sign in to your account</p>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-3 text-sm text-rose-400 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleEmail} className="flex flex-col gap-4 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#A1A1AA]">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#A1A1AA]/40 outline-none focus:border-[#7C3AED]/60 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#A1A1AA]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#A1A1AA]/40 outline-none focus:border-[#7C3AED]/60 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-[14px] font-semibold py-2.5 rounded-lg bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#1F1F1F]" />
            <span className="text-xs text-[#A1A1AA]">or</span>
            <div className="h-px flex-1 bg-[#1F1F1F]" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2.5 text-[14px] font-medium py-2.5 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-[#A1A1AA] mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-[#7C3AED] hover:underline font-medium">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
