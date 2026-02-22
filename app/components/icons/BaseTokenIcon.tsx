'use client'

import { useId } from 'react'

interface BaseTokenIconProps {
  className?: string
  size?: number
}

/** Base Token – Ethereum-style diamond (from Gluon-EVM-WebUI ErcIcon) */
export default function BaseTokenIcon({
  className = '',
  size = 64,
}: BaseTokenIconProps) {
  const gradientId = useId()
  const glowId = `${gradientId}-glow`

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
          <stop offset="70%" stopColor="#6366f1" stopOpacity={0.1} />
          <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle
        cx={32}
        cy={32}
        r={30}
        fill="#1e1b4b"
        stroke="rgba(139, 92, 246, 0.5)"
        strokeWidth={2}
      />
      <circle
        cx={32}
        cy={32}
        r={22}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={2}
        opacity={0.4}
      />
      <ellipse cx={32} cy={30} rx={18} ry={22} fill={`url(#${glowId})`} opacity={0.6} />
      <g>
        <polygon
          points="32 14 42 33 32 28 22 33"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={0.5}
        />
        <polygon points="32 28 42 33 32 38 22 33" fill="rgba(255,255,255,0.12)" />
        <polygon
          points="32 38 42 33 32 50 22 33"
          fill={`url(#${gradientId})`}
          opacity={0.85}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={0.5}
        />
      </g>
    </svg>
  )
}
