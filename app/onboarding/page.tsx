'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/supabase/client'
import { useAuth } from '../context/AuthContext'

const STEPS = [
  {
    id: 'role',
    question: "What best describes you?",
    options: ['Entrepreneur / Founder', 'Professional / Manager', 'Freelancer / Creator', 'Student / Researcher'],
  },
  {
    id: 'goal',
    question: "What's your main goal with AI right now?",
    options: ['Save time on repetitive work', 'Create content faster', 'Do deeper research', 'Build something new'],
  },
  {
    id: 'current_ai',
    question: "What AI do you use most right now?",
    options: ['ChatGPT', 'Claude', 'Gemini', "I don't use AI yet"],
  },
  {
    id: 'interests',
    question: "Which categories interest you most?",
    multi: true,
    options: ['Research', 'Writing', 'Coding', 'Music', 'Voice', 'Design', 'Video'],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [saving, setSaving] = useState(false)

  const current = STEPS[step]
  const currentAnswer = answers[current.id]

  function select(option: string) {
    if (current.multi) {
      const prev = (currentAnswer as string[]) ?? []
      const next = prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
      setAnswers({ ...answers, [current.id]: next })
    } else {
      setAnswers({ ...answers, [current.id]: option })
    }
  }

  function isSelected(option: string) {
    if (current.multi) return ((currentAnswer as string[]) ?? []).includes(option)
    return currentAnswer === option
  }

  function canAdvance() {
    if (current.multi) return ((currentAnswer as string[]) ?? []).length > 0
    return !!currentAnswer
  }

  async function advance() {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }
    // Final step — save and redirect
    setSaving(true)
    const supabase = createClient()

    if (user) {
      await supabase.from('user_quiz').insert({
        user_id: user.id,
        role: answers.role,
        goal: answers.goal,
        current_ai: answers.current_ai,
        interests: answers.interests ?? [],
      })
      await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        quiz_completed: true,
      })
    }

    // 1.5s loading spinner then redirect
    await new Promise((r) => setTimeout(r, 1500))
    router.push('/tools')
  }

  if (saving) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-5">
        <div className="w-10 h-10 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
        <p className="text-[#A1A1AA] text-sm">Building your personalized dashboard…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-[480px]">
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-[#7C3AED]' : 'bg-[#1F1F1F]'
              }`}
            />
          ))}
        </div>

        <div key={step} className="step-in">
          <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-3">
            Step {step + 1} of {STEPS.length}
          </p>
          <h1 className="text-2xl font-extrabold text-white mb-8 leading-tight">
            {current.question}
          </h1>

          <div className="flex flex-col gap-3 mb-10">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => select(option)}
                className={`text-left px-5 py-4 rounded-xl border text-[14px] font-medium transition-all duration-200 ${
                  isSelected(option)
                    ? 'bg-[#7C3AED]/15 border-[#7C3AED] text-white'
                    : 'bg-[#111111] border-[#1F1F1F] text-[#A1A1AA] hover:border-[#7C3AED]/40 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={advance}
            disabled={!canAdvance()}
            className="w-full text-[14px] font-semibold py-3 rounded-xl bg-[#7C3AED] hover:bg-purple-600 text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step < STEPS.length - 1 ? 'Continue →' : 'Take me to my tools →'}
          </button>
        </div>
      </div>
    </div>
  )
}
