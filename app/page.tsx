'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from './components/Navbar'
import ScrollExpandMedia from './components/ScrollExpandMedia'
import InteractiveHowItWorks from './components/InteractiveHowItWorks'
import TermsOfUseModal, { getTodayUtcKey } from './components/TermsOfUseModal'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const HERO_LINK_CLASS =
  "w-full sm:w-auto text-center px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white bg-white/[0.02] border border-white/10 rounded-full hover:border-gluon/50 hover:bg-white/[0.05] hover:text-gluon hover:scale-105 hover:shadow-lg hover:shadow-gluon/20 transition-all duration-300"

const RESEARCH_LINK_CLASS =
  "w-full sm:w-auto text-center px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-black bg-white/[0.08] border border-black/20 rounded-full hover:border-black/30 hover:bg-white/20 hover:scale-105 hover:shadow-lg transition-all duration-300"

const FOOTER_SOCIAL_LINK_CLASS =
  "w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white/[0.04] backdrop-blur-md border border-[rgba(252,204,24,0.15)] flex items-center justify-center text-white/80 hover:text-white hover:border-gluon-shade/40 hover:bg-white/[0.08] active:scale-95 transition-all"

export default function Home() {
  const [isTermsOpen, setIsTermsOpen] = useState(false)

  useEffect(() => {
    try {
      const acceptedToday = localStorage.getItem(getTodayUtcKey())
      if (!acceptedToday) {
        setTimeout(() => {
          setIsTermsOpen(true)
        }, 0)
      }
    } catch {
      // Fallback if localStorage is unavailable
    }
  }, [])

  return (
    <>
      <div className="min-h-screen bg-background relative">
        <Navbar />
        <main className="relative z-10">
        {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-36 lg:px-16 lg:pb-48 min-h-[100dvh] flex items-center bg-background">
        <div className="relative mx-auto max-w-4xl text-center w-full z-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl mt-6 sm:mt-12 lg:mt-[7.25rem] tracking-tight text-gluon leading-tight">
            Gluon Stablecoin Protocol
          </h1>
          
          {/* Choose Your Ecosystem */}
          <div className="mt-10 sm:mt-14 lg:mt-18">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Choose Your Ecosystem
            </h2>
            <p className="text-sm sm:text-lg text-white/70 mb-8 sm:mb-12 max-w-lg mx-auto">
              Gluon is available on multiple blockchain networks
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 max-w-xs sm:max-w-none mx-auto">
              <a 
                href="https://evm.gluon.stability.nexus/"
                target="_blank"
                rel="noopener noreferrer"
                className={HERO_LINK_CLASS}
                aria-label="Gluon on EVM (opens in new tab)"
              >
                EVM
              </a>
              
              <a 
                href="https://gluon.gold/"
                target="_blank"
                rel="noopener noreferrer"
                className={HERO_LINK_CLASS}
                aria-label="Gluon on Ergo (opens in new tab)"
              >
                Ergo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <InteractiveHowItWorks />

      {/* Whitepaper Section */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={`${basePath}/whitepaper1.png`}
        alt="Gluon Research Whitepaper - Dual-Token Stabilization Mechanics (IACR ePrint 2025/1372)"
      >
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-block">
              <span className="text-xs sm:text-sm tracking-[0.3em] text-black/60 font-semibold uppercase">IACR ePrint 2025/1372</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black/90 tracking-wide">
              Research Whitepaper
            </h3>
          </div>
          
          <div className="max-w-md mx-auto px-2 sm:px-0">
            <p className="text-sm sm:text-base text-black/70 leading-relaxed text-center font-medium">
              A peer-reviewed cryptocurrency stabilization protocol leveraging dual-token mechanics and state-dependent settlement rules.
            </p>
          </div>

          <div className="pt-4 sm:pt-8 flex flex-col items-center gap-3">
            <a
              href="https://eprint.iacr.org/2025/1372"
              target="_blank"
              rel="noopener noreferrer"
              className={RESEARCH_LINK_CLASS}
              aria-label="Read full paper (opens in new tab)"
            >
              Read Full Paper
            </a>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* Why Gluon Section */}
      <section className="px-6 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:px-16 lg:pt-44 lg:pb-36 border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Why Gluon
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Box 1: Neutrons (Stable Tokens) */}
            <div className="p-6 rounded-xl glass-card hover:border-[rgba(252,204,24,0.25)] transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Neutrons (Stable Tokens)</h3>
              <p className="text-gray-400 text-sm">
                Maintain predictable price stability tied to a target peg while benefiting from reserve-strengthening protocol fees.
              </p>
            </div>
            
            {/* Box 2: Protons (Volatile Tokens) */}
            <div className="p-6 rounded-xl glass-card hover:border-[rgba(252,204,24,0.25)] transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Protons (Volatile Tokens)</h3>
              <p className="text-gray-400 text-sm">
                Gain leveraged exposure to the underlying reserve asset while capturing protocol growth and transaction fees.
              </p>
            </div>

            {/* Box 3: Zero-Governance & Autonomy */}
            <div className="p-6 rounded-xl glass-card hover:border-[rgba(252,204,24,0.25)] transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Zero-Governance & Autonomy</h3>
              <p className="text-gray-400 text-sm">
                Gluon reactor smart contracts operate completely autonomously on-chain without central administration, admin keys, multi-sigs, or DAO parameter voting.
              </p>
            </div>

            {/* Box 4: Resilience to Oracle Delays and Manipulations */}
            <div className="p-6 rounded-xl glass-card hover:border-[rgba(252,204,24,0.25)] transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Resilience to Oracle Delays and Manipulations</h3>
              <p className="text-gray-400 text-sm">
                Dynamic conversion fees based on transaction volume protect the reserve against potential oracle issues.
              </p>
            </div>

            {/* Box 5: No Liquidations or CDP Debt */}
            <div className="p-6 rounded-xl glass-card hover:border-[rgba(252,204,24,0.25)] transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">No Liquidations or CDP Debt</h3>
              <p className="text-gray-400 text-sm">
                Mint and hold stable coins without liquidation risks, forced debt closures, or paying borrowing interest rates.
              </p>
            </div>
            
            {/* Box 6: Freedom from Hard Reserve Cutoffs */}
            <div className="p-6 rounded-xl glass-card hover:border-[rgba(252,204,24,0.25)] transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">Freedom from Hard Reserve Cutoffs</h3>
              <p className="text-gray-400 text-sm">
                Execute all core operations continuously without rigid minimum or maximum reserve ratio thresholds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 sm:px-8 sm:py-16 lg:px-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            <Image 
              src={`${basePath}/logo-animated.gif`}
              alt="Stability Nexus" 
              width={120}
              height={48}
              className="h-12 w-auto"
            />
            
            <p className="text-white/60 text-sm text-center">
              © {new Date().getFullYear()} Stability Nexus. All rights reserved.
            </p>
            
            {/* Right: Social Icons + Divider + Terms of Use Pill */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2.5">
                {/* 1. X */}
                <a 
                  href="https://x.com/StabilityNexus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_SOCIAL_LINK_CLASS}
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* 2. LinkedIn */}
                <a 
                  href="https://linkedin.com/company/stability-nexus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_SOCIAL_LINK_CLASS}
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* 3. GitHub */}
                <a 
                  href="https://github.com/StabilityNexus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_SOCIAL_LINK_CLASS}
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>

                {/* 4. Telegram */}
                <a 
                  href="https://t.me/StabilityNexus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_SOCIAL_LINK_CLASS}
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>

                {/* 5. Discord */}
                <a 
                  href="https://discord.com/invite/YzDKeEfWtS" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_SOCIAL_LINK_CLASS}
                  aria-label="Discord"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              </div>

              {/* Vertical Separator */}
              <span className="h-6 w-px bg-white/20 mx-1 hidden sm:inline-block" />

              {/* Terms of Use Pill Button */}
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-white/[0.02] hover:bg-white/[0.08] hover:border-gluon/50 text-white/90 hover:text-white font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-95"
              >
                TERMS OF USE
              </button>
            </div>
          </div>
        </div>
      </footer>
        </main>
      </div>

      {/* Terms of Use Modal */}
      <TermsOfUseModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={() => setIsTermsOpen(false)}
      />
    </>
  );
}
