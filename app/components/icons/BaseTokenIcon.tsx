'use client'

interface BaseTokenIconProps {
  className?: string
  size?: number
}

/** Base Token – Generic composite reserve coin */
export default function BaseTokenIcon({
  className = '',
  size = 64,
}: BaseTokenIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 262.27 262.27"
      className={className}
      width={size}
      height={size}
      role="img"
      aria-label="Base reserve token"
    >
      <title>Base reserve token</title>
      <g>
        {/* Violet Base Coin Background */}
        <circle
          fill="#8b5cf6"
          cx="131.14"
          cy="131.14"
          r="131.11"
        />
        {/* Outer Orbit 1 */}
        <ellipse
          fill="none"
          stroke="#ffffff"
          strokeMiterlimit={10}
          strokeWidth={7}
          cx="131.14"
          cy="131.14"
          rx="46"
          ry="108"
          transform="rotate(30 131.14 131.14)"
        />
        {/* Outer Orbit 2 */}
        <ellipse
          fill="none"
          stroke="#ffffff"
          strokeMiterlimit={10}
          strokeWidth={7}
          cx="131.14"
          cy="131.14"
          rx="46"
          ry="108"
          transform="rotate(-30 131.14 131.14)"
        />
        {/* Outer Orbit 3 */}
        <ellipse
          fill="none"
          stroke="#ffffff"
          strokeMiterlimit={10}
          strokeWidth={7}
          cx="131.14"
          cy="131.14"
          rx="46"
          ry="108"
          transform="rotate(90 131.14 131.14)"
        />
        {/* Core Nucleus */}
        <circle
          fill="#ffffff"
          cx="131.14"
          cy="131.14"
          r="24"
        />
        <circle
          fill="#7c3aed"
          cx="131.14"
          cy="131.14"
          r="16"
        />
      </g>
    </svg>
  )
}
