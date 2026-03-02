'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Navbar from './components/Navbar'
import ScrollExpandMedia from './components/ScrollExpandMedia'
import { FocusRail, type FocusRailItem } from './ui/focus-rail'
import { motion } from 'framer-motion'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const HERO_LINK_CLASS =
  "px-8 py-3 text-lg font-semibold text-amber-100 bg-white/[0.02] border border-white/10 rounded-full hover:border-amber-500/50 hover:bg-white/[0.05] hover:text-amber-400 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"

const FOOTER_SOCIAL_LINK_CLASS =
  "w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"

const HOW_IT_WORKS_RAIL_ITEMS: FocusRailItem[] = [
  {
    id: 'fission',
    title: 'Fission',
    meta: 'Base → Neutron + Proton',
    description: 'Split base tokens into neutrons and protons, unlocking the dual-token structure and flexible DeFi strategies.',
    inputTokens: ['base'] as const,
    outputTokens: ['neutron', 'proton'] as const,
  },
  {
    id: 'fusion',
    title: 'Fusion',
    meta: 'Neutron + Proton → Base',
    description: 'Merge neutrons and protons back into base tokens, restoring the original asset with precision and efficiency.',
    inputTokens: ['neutron', 'proton'] as const,
    outputTokens: ['base'] as const,
  },
  {
    id: 'beta-plus',
    title: 'Beta Decay β+',
    meta: 'Proton → Neutron',
    description: 'Convert protons into neutrons; fees adjust dynamically from reserve balance, optimizing protocol economics.',
    inputTokens: ['proton'] as const,
    outputTokens: ['neutron'] as const,
  },
  {
    id: 'beta-minus',
    title: 'Beta Decay β−',
    meta: 'Neutron → Proton',
    description: 'Transform neutrons into protons, adjusting your position in the dual-token system seamlessly.',
    inputTokens: ['neutron'] as const,
    outputTokens: ['proton'] as const,
  },
]

export default function Home() {
  const howItWorksSectionRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="min-h-screen bg-[#0F1015]">
        <Navbar />
        <main>
        {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-48 sm:px-8 lg:px-16 min-h-screen flex items-center bg-[#0F1015]">
        <div className="relative mx-auto max-w-4xl text-center w-full z-10">
          <h1 className="text-5xl font-bold text-amber-100 sm:text-6xl lg:text-7xl mt-29 tracking-tight">
            Gluon Protocol
          </h1>
          
          {/* Choose Your Ecosystem */}
          <div className="mt-18">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-4">
              Choose Your Ecosystem
            </h2>
            <p className="text-gray-400 mb-12">
              Gluon is available on multiple blockchain networks
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://evm.gluon.stability.nexus/"
                target="_blank"
                rel="noopener noreferrer"
                className={HERO_LINK_CLASS}
              >
                EVM
              </a>
              
              <a 
                href="https://gluon.gold/"
                target="_blank"
                rel="noopener noreferrer"
                className={HERO_LINK_CLASS}
              >
                Ergo
              </a>
              
              <a 
                href="https://solana.gluon.stability.nexus/"
                target="_blank"
                rel="noopener noreferrer"
                className={HERO_LINK_CLASS}
              >
                Solana
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Sticky Scroll Container */}
      <div 
        ref={howItWorksSectionRef}
        className="relative"
        style={{ height: `${140 * HOW_IT_WORKS_RAIL_ITEMS.length}vh` }}
      >
        <section 
          id="how-it-works" 
          className="sticky top-0 px-6 py-24 sm:px-8 lg:px-16 border-t border-white/5 min-h-screen flex items-center"
        >
          {/* Subtle background accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative mx-auto max-w-7xl w-full">
            {/* Header Badge */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block">
                <span className="px-4 py-2 text-sm font-semibold text-amber-400 border border-amber-500/30 rounded-full bg-amber-500/10 backdrop-blur-sm">
                  How It Works
                </span>
              </div>
            </motion.div>

            {/* Side-by-side Layout: Text Left, FocusRail Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-amber-100">
                  Dual Token Mechanics
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p className="text-base">
                    The essence of Gluon W is that, analogously to how an atom&apos;s nucleus is composed of protons and neutrons (known collectively as nucleons), a <span className="text-violet-400 font-medium">base</span> token is composed of two sub-assets: <span className="text-amber-300 font-medium">neutrons</span> or stable tokens, whose price is kept stable relative to a target price; and <span className="text-red-400 font-medium">protons</span> or volatile tokens, whose price is more volatile than the <span className="text-violet-400 font-medium">base</span> token.
                  </p>
                  <p className="text-base text-gray-500">
                    The protocol defines the rules of an autonomous reactor capable of four reactions:
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Focus Rail */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <FocusRail
                  items={HOW_IT_WORKS_RAIL_ITEMS}
                  loop={false}
                  autoPlay={false}
                  scrollBased={true}
                  scrollContainerRef={howItWorksSectionRef}
                  className="rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Whitepaper Section */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={`${basePath}/whitepaper1.png`}
      >
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-block">
              <span className="text-sm tracking-[0.3em] text-black/60 font-semibold uppercase">IACR ePrint 2025/1372</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-black/90 tracking-wide">
              Research Whitepaper
            </h3>
          </div>
          
          <div className="max-w-md mx-auto">
            <p className="text-base text-black/70 leading-relaxed text-center font-medium">
              A peer-reviewed cryptocurrency stabilization protocol leveraging dual-token mechanics and state-dependent settlement rules.
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-3">
            <a
              href="https://eprint.iacr.org/2025/1372"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-black/80 hover:bg-black border border-black text-white text-sm font-medium rounded-lg transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative z-10">Read Full Paper</span>
            </a>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* Why Gluon Section - COMMENTED OUT for now; see GitHub issue for tracking. */}
      {/*
      <section className="px-6 py-20 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-100 mb-12">
            Why Gluon
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            (For Protocol Integrators column)
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-amber-100">For Protocol Integrators</h3>
              </div>
            
              <div className="space-y-6">
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Create Custom Stablecoins</h4>
                  <p className="text-gray-400 text-sm">
                    Launch your own branded stablecoin backed by various crypto assets with customizable parameters.
                  </p>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Multi-Chain Deployment</h4>
                  <p className="text-gray-400 text-sm">
                    Deploy on EVM chains, Ergo, or Solana to reach users across different blockchain ecosystems.
                  </p>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Earn Protocol Fees</h4>
                  <p className="text-gray-400 text-sm">
                    Receive a portion of fees generated from minting, redemption, and liquidation activities.
                  </p>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Enhance Your DeFi Ecosystem</h4>
                  <p className="text-gray-400 text-sm">
                    Add stablecoin infrastructure to your protocol without building from scratch, enabling new use cases.
                  </p>
                </div>
              </div>
            </div>
          
            (For Users column)
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></div>
                <h3 className="text-2xl font-bold text-amber-100">For Users</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Unlock Liquidity Without Selling</h4>
                  <p className="text-gray-400 text-sm">
                    Mint stablecoins against your crypto holdings to access liquidity while maintaining exposure to your assets.
                  </p>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Decentralized and Trustless</h4>
                  <p className="text-gray-400 text-sm">
                    All operations are executed by smart contracts with no central authority controlling your funds.
                  </p>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Transparent Collateralization</h4>
                  <p className="text-gray-400 text-sm">
                    View real-time collateral ratios and protocol health. Every stablecoin is verifiably backed on-chain.
                  </p>
                </div>
                
                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-semibold text-white mb-2">Flexible Participation</h4>
                  <p className="text-gray-400 text-sm">
                    Mint and redeem at any time, choosing from a variety of supported collateral types and stablecoin denominations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Footer */}
      <footer className="px-6 py-16 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Image 
              src={`${basePath}/logo-animated.gif`}
              alt="Stability Nexus" 
              width={120}
              height={48}
              className="h-12 w-auto"
            />
            
            <p className="text-gray-500 text-sm text-center">
              © 2026 Stability Nexus. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/StabilityNexus" 
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
              <a 
                href="https://x.com/StabilityNexus" 
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://discord.com/invite/YzDKeEfWtS" 
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/StabilityNexus" 
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/stability-nexus" 
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
        </main>
      </div>
    </>
  );
}
