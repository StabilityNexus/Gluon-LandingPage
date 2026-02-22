'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BaseTokenIcon from './icons/BaseTokenIcon'
import NeutronIcon from './icons/NeutronIcon'
import ProtonIcon from './icons/ProtonIcon'

interface TokenIconProps {
  type: 'base' | 'neutron' | 'proton'
  size?: number
  showLabel?: boolean
}

const LABELS = { base: 'Base', neutron: 'Neutron', proton: 'Proton' } as const

function TokenIcon({ type, size = 44, showLabel = true }: TokenIconProps) {
  const Icon =
    type === 'base' ? BaseTokenIcon : type === 'neutron' ? NeutronIcon : ProtonIcon
  const glow =
    type === 'base'
      ? 'shadow-[0_0_12px_rgba(139,92,246,0.4)]'
      : type === 'neutron'
        ? 'shadow-[0_0_12px_rgba(245,158,11,0.4)]'
        : 'shadow-[0_0_12px_rgba(228,32,31,0.4)]'
  const rounded = type === 'base' ? 'rounded-xl' : 'rounded-full'

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`${rounded} flex items-center justify-center overflow-hidden border border-white/[0.08] bg-white/[0.04] ${glow}`}
        style={{ width: size, height: size }}
      >
        <Icon size={Math.round(size * 0.88)} className="shrink-0" />
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-white/60">
          {LABELS[type]}
        </span>
      )}
    </div>
  )
}

function MiniFlow({
  inputTokens,
  outputTokens,
}: {
  inputTokens: readonly ('base' | 'neutron' | 'proton')[]
  outputTokens: readonly ('base' | 'neutron' | 'proton')[]
}) {
  const isSplit = inputTokens.length === 1 && outputTokens.length === 2
  const isMerge = inputTokens.length === 2 && outputTokens.length === 1

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      {/* Input */}
      <div className="flex items-center gap-2">
        {inputTokens.length === 1 ? (
          <TokenIcon type={inputTokens[0]} size={46} />
        ) : (
          <div className="flex flex-col gap-3">
            {inputTokens.map((t, i) => (
              <TokenIcon key={i} type={t} size={46} />
            ))}
          </div>
        )}
      </div>

      {/* Arrow / flow */}
      <div className="flex items-center text-white/30">
        {isSplit && (
          <span className="text-xl font-light">
            <span className="inline-block">→</span>
            <span className="mx-0.5">↗</span>
            <span className="mx-0.5">↘</span>
          </span>
        )}
        {isMerge && (
          <span className="text-xl font-light">
            <span className="mx-0.5">↖</span>
            <span className="mx-0.5">↙</span>
            <span className="inline-block">→</span>
          </span>
        )}
        {!isSplit && !isMerge && (
          <span className="text-2xl font-light">→</span>
        )}
      </div>

      {/* Output */}
      <div className="flex items-center gap-2">
        {outputTokens.length === 1 ? (
          <TokenIcon type={outputTokens[0]} size={46} />
        ) : (
          <div className="flex flex-col gap-3">
            {outputTokens.map((t, i) => (
              <TokenIcon key={i} type={t} size={46} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const REACTIONS = [
  {
    id: 'fission',
    title: 'Fission',
    short: 'Base → Neutron + Proton',
    description: 'Split base tokens into neutrons and protons.',
    icon: '⚛️',
    inputTokens: ['base'] as const,
    outputTokens: ['neutron', 'proton'] as const,
  },
  {
    id: 'fusion',
    title: 'Fusion',
    short: 'Neutron + Proton → Base',
    description: 'Merge neutrons and protons back into base tokens.',
    icon: '💫',
    inputTokens: ['neutron', 'proton'] as const,
    outputTokens: ['base'] as const,
  },
  {
    id: 'beta-plus',
    title: 'β+ Decay',
    short: 'Proton → Neutron',
    description: 'Convert protons to neutrons; fees vary by reserve.',
    icon: '🔄',
    inputTokens: ['proton'] as const,
    outputTokens: ['neutron'] as const,
  },
  {
    id: 'beta-minus',
    title: 'β− Decay',
    short: 'Neutron → Proton',
    description: 'Convert neutrons to protons.',
    icon: '🔃',
    inputTokens: ['neutron'] as const,
    outputTokens: ['proton'] as const,
  },
]

export default function ReactionFlow() {
  const [active, setActive] = useState(0)
  const r = REACTIONS[active]

  return (
    <div className="relative">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {REACTIONS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              className="relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
            >
              {i === active && (
                <motion.div
                  layoutId="reaction-tab"
                  className="absolute inset-0 rounded-lg border border-amber-500/30 bg-amber-500/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 ${
                  i === active ? 'text-amber-300' : 'text-white/50 hover:text-white/70'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Flow + description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            <MiniFlow
              inputTokens={r.inputTokens}
              outputTokens={r.outputTokens}
            />
            <p className="text-center text-xs font-medium uppercase tracking-wider text-amber-400/80">
              {r.short}
            </p>
            <p className="mt-4 text-center text-sm leading-relaxed text-white/60">
              {r.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
