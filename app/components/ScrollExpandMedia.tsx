'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  });

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [isMobileState ? 200 : 250, isMobileState ? 200 : 250, isMobileState ? 700 : 1000, isMobileState ? 700 : 1000]
  );
  
  const mediaHeight = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [isMobileState ? 280 : 320, isMobileState ? 280 : 320, isMobileState ? 500 : 650, isMobileState ? 500 : 650]
  );

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [1, 1, 1, 0]);
  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='relative min-h-[120vh] flex items-center justify-center'
    >
      <div className='sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden'>
        <div className='container mx-auto flex flex-col items-center justify-center relative z-10 px-4'>
          {/* Main Media Container */}
          <motion.div
            className='relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20'
            style={{
              width: mediaWidth,
              height: mediaHeight,
            }}
          >
            {mediaType === 'image' ? (
              <Image
                src={mediaSrc}
                alt={title || 'Media content'}
                fill
                className='object-cover'
                priority
              />
            ) : (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                className='w-full h-full object-cover'
              />
            )}
            
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40' />
            
            {/* Glow effect */}
            <div className='absolute inset-0 shadow-[0_0_100px_rgba(251,191,36,0.3)]' />
          </motion.div>

          {/* Title Animation - only when title is provided */}
          <motion.div
            className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20'
          >
            {title ? (
            <div className={`flex flex-col items-center gap-3 ${textBlend ? 'mix-blend-difference' : ''}`}>
              <motion.h2 
                className='text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 text-center px-4'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {firstWord}
              </motion.h2>
              <motion.h2 
                className='text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 text-center px-4'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {restOfTitle}
              </motion.h2>
            </div>
            ) : null}
            {date && (
              <motion.p 
                className='text-lg md:text-xl text-amber-300/80 mt-8 text-center px-4 font-medium'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {date}
              </motion.p>
            )}
            {scrollToExpand && (
              <motion.p 
                className='text-sm text-amber-400/60 mt-10 animate-bounce scroll-hint flex items-center gap-2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {scrollToExpand}
              </motion.p>
            )}
          </motion.div>

          {/* Content Section */}
          <motion.div
            className='absolute inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-auto z-20'
            style={{ opacity: contentOpacity }}
          >
            <motion.div 
              className='max-w-4xl w-full bg-amber-100/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-amber-200/20'
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
