'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Delay animation enablement to avoid flicker
    const timer = setTimeout(() => setHasAnimated(true), 100)
    
    // Check initial scroll position
    const currentScrollY = window.scrollY
    setIsScrolled(currentScrollY > 50)
    
    // Set initial window width
    setWindowWidth(window.innerWidth)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
    }
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])
  
  // Calculate padding based on window width
  // When scrolled: extremely left and right (large padding)
  // When NOT scrolled: closer together (smaller padding)
  const getPadding = () => {
    if (isScrolled) {
      // Scrolled - use large padding for extreme spacing
      if (windowWidth >= 1536) { // 2xl screens
        return '160px'
      }
      if (windowWidth >= 1280) { // xl screens
        return '128px'
      }
      if (windowWidth >= 1024) { // lg screens
        return '96px'
      }
      if (windowWidth >= 768) { // md screens
        return '64px'
      }
      return '48px'
    } else {
      // Not scrolled - use smaller padding (closer together)
      return '24px'
    }
  }

  return (
    <>
      {/* Background glow effect */}
      <div className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-amber-500/10 blur-3xl"></div>
      </div>

      <motion.header
        className="fixed z-50 w-full pointer-events-auto"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
      >
      <motion.nav
        className="mx-auto mt-2 backdrop-blur-xl w-full"
        initial={{
          backgroundColor: 'rgba(15, 16, 21, 0.3)',
          maxWidth: '100%',
          borderRadius: '0px',
          border: '1px solid rgba(255, 255, 255, 0)',
          paddingLeft: windowWidth > 0 ? getPadding() : '128px',
          paddingRight: windowWidth > 0 ? getPadding() : '128px',
        }}
        animate={hasAnimated ? {
          backgroundColor: isScrolled ? 'rgba(15, 16, 21, 0.7)' : 'rgba(15, 16, 21, 0.3)',
          maxWidth: '100%',
          borderRadius: isScrolled ? '16px' : '0px',
          border: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
          paddingLeft: getPadding(),
          paddingRight: getPadding(),
        } : undefined}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          duration: 0.6
        }}
      >
        <motion.div
          className="flex items-center justify-between w-full"
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
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img src="/image.png" alt="Gluon" className="h-8" />
              <span className="text-xl font-semibold text-amber-400">Gluon</span>
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a 
              href="https://evm.gluon.stability.nexus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-1.5 text-sm font-semibold text-amber-100 bg-white/[0.02] border border-white/10 rounded-full hover:border-amber-500/50 hover:bg-white/[0.05] hover:text-amber-400 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              EVM
            </a>
            <a 
              href="https://gluon.gold/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-1.5 text-sm font-semibold text-amber-100 bg-white/[0.02] border border-white/10 rounded-full hover:border-amber-500/50 hover:bg-white/[0.05] hover:text-amber-400 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              Ergo
            </a>
            <a 
              href="https://solana.gluon.stability.nexus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-1.5 text-sm font-semibold text-amber-100 bg-white/[0.02] border border-white/10 rounded-full hover:border-amber-500/50 hover:bg-white/[0.05] hover:text-amber-400 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
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
