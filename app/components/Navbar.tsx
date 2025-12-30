'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Delay animation enablement to avoid flicker
    const timer = setTimeout(() => setHasAnimated(true), 100)
    
    // Check initial scroll position
    const currentScrollY = window.scrollY
    setIsScrolled(currentScrollY > 50)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {/* Background glow effect */}
      <div className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-amber-500/10 blur-3xl"></div>
      </div>

      <motion.header
        className="fixed z-50 w-full px-2 pointer-events-auto"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
      >
      <motion.nav
        className="mx-auto mt-2 backdrop-blur-xl"
        initial={{
          backgroundColor: 'rgba(15, 16, 21, 0.3)',
          maxWidth: '80rem',
          borderRadius: '0px',
          border: '1px solid rgba(255, 255, 255, 0)',
          paddingLeft: '48px',
          paddingRight: '48px',
        }}
        animate={hasAnimated ? {
          backgroundColor: isScrolled ? 'rgba(15, 16, 21, 0.7)' : 'rgba(15, 16, 21, 0.3)',
          maxWidth: isScrolled ? '64rem' : '80rem',
          borderRadius: isScrolled ? '16px' : '0px',
          border: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
          paddingLeft: isScrolled ? '24px' : '48px',
          paddingRight: isScrolled ? '24px' : '48px',
        } : undefined}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          duration: 0.6
        }}
      >
        <motion.div
          className="flex items-center justify-between"
          initial={{
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
          animate={hasAnimated ? {
            paddingTop: isScrolled ? '12px' : '16px',
            paddingBottom: isScrolled ? '12px' : '16px',
          } : undefined}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.5
          }}
        >
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img src="/image.png" alt="Gluon" className="h-8" />
              <span className="text-xl font-semibold text-amber-400">Gluon</span>
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="https://evm.gluon.stability.nexus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-amber-100 bg-white/5 border border-white/10 rounded-lg hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400 transition-all duration-300"
            >
              EVM
            </a>
            <a 
              href="https://gluon.gold/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-amber-100 bg-white/5 border border-white/10 rounded-lg hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400 transition-all duration-300"
            >
              Ergo
            </a>
            <a 
              href="https://solana.gluon.stability.nexus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-amber-100 bg-white/5 border border-white/10 rounded-lg hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-400 transition-all duration-300"
            >
              Solana
            </a>
          </div>
        </motion.div>
      </motion.nav>
    </motion.header>
    </>
  )
}
