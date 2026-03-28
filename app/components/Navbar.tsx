'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { createClient } from '@/supabase/client'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const { user, loading } = useAuth()
  const [isDark, setIsDark] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsDark(localStorage.getItem('theme') !== 'light')
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setDropdownOpen(false)
    router.push('/')
    router.refresh()
  }

  const avatarLetter = user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 md:px-8 backdrop-blur-md bg-white/80 dark:bg-[#0A0A0A]/80 transition-colors duration-300">
      <Link
        href="/"
        className="text-[17px] font-extrabold tracking-tight text-gray-900 dark:text-white"
      >
        Nexa<span className="text-[#7C3AED]">.</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/tools"
          className={`text-sm font-medium transition-colors duration-200 ${
            pathname?.startsWith('/tools')
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Discover
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-lg text-gray-400 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {!loading && (
          user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#7C3AED] text-white text-[13px] font-bold flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                aria-label="Account menu"
              >
                {avatarLetter}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-[#111111] border border-gray-100 dark:border-[#1F1F1F] rounded-xl shadow-xl py-1.5 z-50">
                  <div className="px-4 py-2.5 border-b border-gray-100 dark:border-[#1F1F1F]">
                    <p className="text-[12px] text-gray-400 dark:text-[#A1A1AA] truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/my-tools"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-700 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    My Tools
                  </Link>
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-700 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="text-[13px] font-medium text-gray-500 dark:text-[#A1A1AA] hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-all duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="text-[13px] font-semibold px-4 py-2 rounded-full bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200"
              >
                Get started
              </Link>
            </div>
          )
        )}
      </div>
    </header>
  )
}
