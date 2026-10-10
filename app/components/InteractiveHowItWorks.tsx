'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BaseTokenIcon from './icons/BaseTokenIcon'
import NeutronIcon from './icons/NeutronIcon'
import ProtonIcon from './icons/ProtonIcon'

export type StepItem = {
  id: string
  num: string
  title: string
  formula: string
  description: string
  inputTokens: readonly ('base' | 'neutron' | 'proton')[]
  outputTokens: readonly ('base' | 'neutron' | 'proton')[]
}

export const PROTOCOL_STEPS: StepItem[] = [
  {
    id: 'fission',
    num: '1',
    title: 'Fission',
    formula: 'Base → Neutron + Proton',
    description:
      'Split base tokens into neutrons and protons. This mints neutrons and protons simultaneously, maintaining the reserve ratio and ensuring capital efficiency.',
    inputTokens: ['base'] as const,
    outputTokens: ['neutron', 'proton'] as const,
  },
  {
    id: 'fusion',
    num: '2',
    title: 'Fusion',
    formula: 'Neutron + Proton → Base',
    description:
      'Merge neutrons and protons back into base tokens. This redeems neutrons and protons simultaneously for the original base token, maintaining the reserve ratio.',
    inputTokens: ['neutron', 'proton'] as const,
    outputTokens: ['base'] as const,
  },
  {
    id: 'beta-plus',
    num: '3',
    title: 'Beta Decay β+',
    formula: 'Proton → Neutron',
    description:
      'Convert protons into neutrons. Fees adjust dynamically based on recent transaction volume, in order to prevent large reserve ratio changes.',
    inputTokens: ['proton'] as const,
    outputTokens: ['neutron'] as const,
  },
  {
    id: 'beta-minus',
    num: '4',
    title: 'Beta Decay β−',
    formula: 'Neutron → Proton',
    description:
      'Convert neutrons into protons. Fees adjust dynamically based on recent transaction volume, in order to prevent large reserve ratio changes.',
    inputTokens: ['neutron'] as const,
    outputTokens: ['proton'] as const,
  },
]

const TOKEN_CONFIG = {
  base: {
    name: 'Base',
    textColor: 'text-violet-400',
    glow: 'shadow-[0_0_24px_rgba(139,92,246,0.35)]',
    ring: 'ring-1 ring-violet-500/40',
    bg: 'bg-violet-500/10',
  },
  neutron: {
    name: 'Neutron',
    textColor: 'text-[#f59e0b]',
    glow: 'shadow-[0_0_24px_rgba(245,158,11,0.35)]',
    ring: 'ring-1 ring-amber-500/40',
    bg: 'bg-amber-500/10',
  },
  proton: {
    name: 'Proton',
    textColor: 'text-[#E42423]',
    glow: 'shadow-[0_0_24px_rgba(228,36,35,0.35)]',
    ring: 'ring-1 ring-red-500/40',
    bg: 'bg-red-500/10',
  },
} as const

function highlightTokens(text: string) {
  const parts = text.split(/(\bneutrons?\b|\bprotons?\b|\bbase\b)/gi)
  return parts.map((part, i) => {
    const lower = part.toLowerCase()
    if (lower === 'neutron' || lower === 'neutrons') {
      return <span key={i} className="font-semibold text-[#f59e0b]">{part}</span>
    }
    if (lower === 'proton' || lower === 'protons') {
      return <span key={i} className="font-semibold text-[#E42423]">{part}</span>
    }
    if (lower === 'base') {
      return <span key={i} className="font-semibold text-violet-400">{part}</span>
    }
    return part
  })
}

function TokenCoin({
  type,
  size = 56,
}: {
  type: 'base' | 'neutron' | 'proton'
  size?: number
}) {
  const Icon = type === 'base' ? BaseTokenIcon : type === 'neutron' ? NeutronIcon : ProtonIcon
  const config = TOKEN_CONFIG[type]

  return (
    <div className="flex flex-col items-center gap-2 group/coin">
      <div
        className={`rounded-full flex items-center justify-center ${config.ring} ${config.glow} ${config.bg} backdrop-blur-md transition-transform duration-300 group-hover/coin:scale-105`}
        style={{ width: size, height: size }}
      >
        <Icon size={Math.round(size * 0.88)} className="shrink-0 drop-shadow" />
      </div>
      <span className={`text-[11px] font-semibold tracking-wider uppercase ${config.textColor}`}>
        {config.name}
      </span>
    </div>
  )
}

const PlusIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
  </svg>
)

function ReactionStage({ item }: { item: StepItem }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-8 sm:py-12">
      {/* Center Visual Flow */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-md">
        {/* Inputs */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {item.inputTokens.map((t, idx) => (
            <React.Fragment key={`in-${t}-${idx}`}>
              {idx > 0 && (
                <div className="flex items-center justify-center pb-5 text-white/50">
                  <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow" />
                </div>
              )}
              <TokenCoin type={t} size={60} />
            </React.Fragment>
          ))}
        </div>

        {/* Direction Arrow */}
        <div className="flex items-center justify-center pb-5 px-1 sm:px-3 text-gluon">
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_10px_rgba(252,204,24,0.4)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>

        {/* Outputs */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {item.outputTokens.map((t, idx) => (
            <React.Fragment key={`out-${t}-${idx}`}>
              {idx > 0 && (
                <div className="flex items-center justify-center pb-5 text-white/50">
                  <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow" />
                </div>
              )}
              <TokenCoin type={t} size={60} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function InteractiveHowItWorks() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const INTERVAL_MS = 3500

  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PROTOCOL_STEPS.length)
    }, INTERVAL_MS)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeIdx, isPaused])

  const activeItem = PROTOCOL_STEPS[activeIdx]

  return (
    <section
      id="how-it-works"
      className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28 border-t border-white/5 bg-background relative"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[700px] bg-white/[0.012] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full space-y-8 sm:space-y-10">
        {/* Header Title & Description - Left Aligned Clean Layout */}
        <div className="text-left space-y-3 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight leading-snug">
            Protocol Mechanics
          </h2>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            The essence of Gluon is that, analogously to how an atom&apos;s nucleus is composed of protons and neutrons (known collectively as nucleons), a <span className="text-violet-400 font-medium">base</span> token is composed of two sub-assets: <span className="font-medium text-[#f59e0b]">neutrons</span> (or stable tokens), whose price is kept stable relative to a target price; and <span className="font-medium text-[#E42423]">protons</span> (or volatile tokens), whose price is more volatile than the <span className="text-violet-400 font-medium">base</span> token.
          </p>

          <p className="text-sm sm:text-base text-white/50 leading-relaxed">
            The protocol defines the rules of an autonomous reactor capable of four reactions:
          </p>
        </div>

        {/* Unified Framed Bento Container */}
        <div
          className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Column: Stacked Step Tabs with dividing borders */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-white/10 border-b lg:border-b-0 lg:border-r border-white/10">
            {PROTOCOL_STEPS.map((step, idx) => {
              const isActive = idx === activeIdx

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left p-6 sm:p-7 transition-all duration-300 relative cursor-pointer flex flex-col group ${
                    isActive ? 'bg-white/[0.04]' : 'bg-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Content */}
                  <div className="w-full space-y-1.5">
                    <h3
                      className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {step.num}. {step.title}
                    </h3>

                    {/* Expandable description only on the active step */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-white/70 leading-relaxed pt-1">
                            {highlightTokens(step.description)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: Clean Showcase Stage */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex items-center justify-center relative min-h-[340px] sm:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                <ReactionStage item={activeItem} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
