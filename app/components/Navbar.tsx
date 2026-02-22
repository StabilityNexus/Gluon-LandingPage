'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const NAV_LINK_CLASS =
  "px-5 py-1.5 text-sm font-semibold text-amber-100 bg-white/[0.02] border border-white/10 rounded-full hover:border-amber-500/50 hover:bg-white/[0.05] hover:text-amber-400 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 block text-center"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100)

    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleResize = () => {
      const w = window.innerWidth
      setWindowWidth(w)
      if (w >= 768) setMenuOpen(false)
    }

    handleScroll()
    handleResize()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
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
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image src={`${basePath}/image.png`} alt="Gluon" width={32} height={32} className="h-8 w-auto" />
              <span className="text-xl font-semibold text-amber-400">Gluon</span>
            </Link>
          </div>

          {/* Desktop: link buttons */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <a href="https://evm.gluon.stability.nexus/" target="_blank" rel="noopener noreferrer" className={NAV_LINK_CLASS}>
              EVM
            </a>
            <a href="https://gluon.gold/" target="_blank" rel="noopener noreferrer" className={NAV_LINK_CLASS}>
              Ergo
            </a>
            <a href="https://solana.gluon.stability.nexus/" target="_blank" rel="noopener noreferrer" className={NAV_LINK_CLASS}>
              Solana
            </a>
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-amber-100 hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </motion.div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="flex flex-col gap-2 py-3">
                <a href="https://evm.gluon.stability.nexus/" target="_blank" rel="noopener noreferrer" className={NAV_LINK_CLASS} onClick={() => setMenuOpen(false)}>
                  EVM
                </a>
                <a href="https://gluon.gold/" target="_blank" rel="noopener noreferrer" className={NAV_LINK_CLASS} onClick={() => setMenuOpen(false)}>
                  Ergo
                </a>
                <a href="https://solana.gluon.stability.nexus/" target="_blank" rel="noopener noreferrer" className={NAV_LINK_CLASS} onClick={() => setMenuOpen(false)}>
                  Solana
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
    </>
  )
}
