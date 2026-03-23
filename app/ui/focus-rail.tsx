"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BaseTokenIcon from "../components/icons/BaseTokenIcon";
import NeutronIcon from "../components/icons/NeutronIcon";
import ProtonIcon from "../components/icons/ProtonIcon";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  meta?: string;
  inputTokens?: readonly ('base' | 'neutron' | 'proton')[];
  outputTokens?: readonly ('base' | 'neutron' | 'proton')[];
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  scrollBased?: boolean;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// Token Icon Component
interface TokenIconProps {
  type: 'base' | 'neutron' | 'proton';
  size?: number;
}

const LABELS = { base: 'Base', neutron: 'Neutron', proton: 'Proton' } as const;

function TokenIcon({ type, size = 60 }: TokenIconProps) {
  const Icon = type === 'base' ? BaseTokenIcon : type === 'neutron' ? NeutronIcon : ProtonIcon;
  const glow =
    type === 'base'
      ? 'shadow-[0_0_16px_rgba(139,92,246,0.5)]'
      : type === 'neutron'
        ? 'shadow-[0_0_16px_rgba(245,158,11,0.5)]'
        : 'shadow-[0_0_16px_rgba(229,36,35,0.5)]';
  const rounded = type === 'base' ? 'rounded-xl' : 'rounded-full';

  const labelColor =
    type === 'base'
      ? 'text-violet-400'
      : type === 'neutron'
        ? 'text-[#f59e0b]'
        : 'text-[#E42423]';
  return (
        <div className="flex flex-col items-center gap-2 p-1">
      <div
        className={`${rounded} flex items-center justify-center overflow-hidden backdrop-blur-sm bg-white/[0.06] border border-[rgba(252,204,24,0.12)] shadow-sm ${glow}`}
        style={{ width: size, height: size }}
      >
        <Icon size={Math.round(size * 0.85)} className="shrink-0" />
      </div>
      <span className={cn('text-xs font-semibold', labelColor)}>
        {LABELS[type]}
      </span>
    </div>
  );
}

// Reaction Visualization Component
function ReactionVisualization({
  inputTokens,
  outputTokens,
}: {
  inputTokens: readonly ('base' | 'neutron' | 'proton')[];
  outputTokens: readonly ('base' | 'neutron' | 'proton')[];
}) {
  const isSplit = inputTokens.length === 1 && outputTokens.length === 2;
  const isMerge = inputTokens.length === 2 && outputTokens.length === 1;

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated pt-8 px-6 pb-6 border-b border-[rgba(252,204,24,0.08)]">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Input Tokens */}
        <div className="flex items-center gap-3">
          {inputTokens.length === 1 ? (
            <TokenIcon type={inputTokens[0]} size={70} />
          ) : (
            <div className="flex flex-col gap-3">
              {inputTokens.map((t, i) => (
                <TokenIcon key={i} type={t} size={54} />
              ))}
            </div>
          )}
        </div>

        {/* Arrow / Flow */}
        <div className="flex items-center text-white/40 text-3xl font-light">
          {isSplit && (
            <span className="flex items-center gap-1">
              <span>→</span>
              <span className="flex flex-col leading-none">
                <span>↗</span>
                <span>↘</span>
              </span>
            </span>
          )}
          {isMerge && (
            <span className="flex items-center gap-1">
              <span className="flex flex-col leading-none">
                <span>↘</span>
                <span>↗</span>
              </span>
              <span>→</span>
            </span>
          )}
          {!isSplit && !isMerge && (
            <span className="text-4xl">→</span>
          )}
        </div>

        {/* Output Tokens */}
        <div className="flex items-center gap-3">
          {outputTokens.length === 1 ? (
            <TokenIcon type={outputTokens[0]} size={70} />
          ) : (
            <div className="flex flex-col gap-3">
              {outputTokens.map((t, i) => (
                <TokenIcon key={i} type={t} size={54} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function highlightTokenTerms(text: string) {
  const parts = text.split(/(\bneutrons?\b|\bprotons?\b|\bbase\b)/gi);
  return parts.map((part, i) => {
    const lower = part.toLowerCase();
    if (lower === 'neutron' || lower === 'neutrons') {
      return <span key={i} className="font-medium text-[#f59e0b]">{part}</span>;
    }
    if (lower === 'proton' || lower === 'protons') {
      return <span key={i} className="font-medium text-[#E42423]">{part}</span>;
    }
    if (lower === 'base') {
      return <span key={i} className="text-violet-400 font-medium">{part}</span>;
    }
    return part;
  });
}

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
  scrollBased = false,
  scrollContainerRef,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const accumulatedDelta = React.useRef<number>(0);
  const lastStepTime = React.useRef<number>(0);
  const railRef = React.useRef<HTMLDivElement>(null);

  const count = items.length;
  
  // Scroll-based progression with sticky effect
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef || railRef,
    offset: ["start start", "end start"],
  });

  // Discrete bands: each card gets equal scroll time [0, 0.25) → 0, [0.25, 0.5) → 1, [0.5, 0.75) → 2, [0.75, 1] → 3
  const scrollBasedIndex = useTransform(scrollYProgress, (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    const idx = clamped >= 1 ? count - 1 : Math.floor(clamped * count);
    return Math.max(0, Math.min(count - 1, idx));
  });

  React.useEffect(() => {
    if (!scrollBased) return;
    const unsubscribe = scrollBasedIndex.on("change", (latest) => {
      const idx = Math.round(latest) as number;
      setActive(Math.max(0, Math.min(count - 1, idx)));
    });
    return () => unsubscribe();
  }, [scrollBased, scrollBasedIndex, count]);

  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  /** Scroll threshold: user must scroll this much before advancing to next/prev step. */
  const SCROLL_THRESHOLD = 180;
  const STEP_COOLDOWN_MS = 420;

  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      if (scrollBased) return; // Disable wheel navigation in scroll-based mode
      const now = Date.now();
      if (now - lastStepTime.current < STEP_COOLDOWN_MS) {
        accumulatedDelta.current = 0;
        return;
      }
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;

      const prev = accumulatedDelta.current;
      if ((prev > 0 && delta < 0) || (prev < 0 && delta > 0)) accumulatedDelta.current = 0;
      accumulatedDelta.current += delta;

      const acc = accumulatedDelta.current;
      if (Math.abs(acc) >= SCROLL_THRESHOLD) {
        if (acc > 0) handleNext();
        else handlePrev();
        accumulatedDelta.current = 0;
        lastStepTime.current = now;
      }
    },
    [handleNext, handlePrev, scrollBased]
  );

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) handleNext();
    else if (swipe > swipeConfidenceThreshold) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      ref={railRef}
      className={cn(
        "group relative flex h-[560px] w-full flex-col overflow-hidden text-white outline-none select-none overflow-x-hidden rounded-2xl glass-card-strong",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={scrollBased ? undefined : onKeyDown}
      onWheel={scrollBased ? undefined : onWheel}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="h-full w-full bg-gradient-to-br from-white/[0.03] via-white/[0.02] to-white/[0.03] blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        <motion.div
          className="relative mx-auto flex h-[320px] w-full max-w-5xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);
            const xOffset = offset * 300;
            const zOffset = -dist * 160;
            const scale = isCenter ? 1 : 0.82;
            const rotateY = offset * -18;
            const opacity = isCenter ? 1 : Math.max(0.08, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.45;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[3/4] w-[200px] md:w-[280px] rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 backdrop-blur-xl bg-white/[0.06] border-[0.25px] border-[rgba(252,204,24,0.2)]",
                  isCenter ? "z-20 shadow-gluon-shade/10 border-[0.25px] border-[rgba(252,204,24,0.35)]" : "z-10 border-[0.25px] border-[rgba(252,204,24,0.2)]"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale,
                  rotateY,
                  opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={BASE_SPRING}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                {item.inputTokens && item.outputTokens ? (
                  <ReactionVisualization
                    inputTokens={item.inputTokens}
                    outputTokens={item.outputTokens}
                  />
                ) : item.imageSrc ? (
                  <Image
                    src={item.imageSrc.startsWith("/") ? `${basePath}${item.imageSrc}` : item.imageSrc}
                    alt={item.title}
                    width={280}
                    height={373}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
                    <span className="text-white/40 text-sm">{item.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    {item.meta ? highlightTokenTerms(item.meta) : ''}
                  </span>
                  <p className="mt-1 font-bold text-white drop-shadow-lg">
                    {highlightTokenTerms(item.title)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col items-center justify-between gap-6 md:flex-row pointer-events-auto">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left min-h-[88px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-white">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-md text-neutral-400 text-sm md:text-base leading-relaxed">
                    {highlightTokenTerms(activeItem.description)}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full p-1 ring-1 ring-[rgba(252,204,24,0.15)] backdrop-blur-xl bg-white/[0.04]">
              <button
                onClick={handlePrev}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white/90 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[36px] text-center text-xs font-mono text-neutral-500">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white/90 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href && (
              <Link
                href={activeItem.href}
                className="group flex items-center gap-2 rounded-full bg-gluon-shade px-5 py-3 text-sm font-semibold text-black transition-transform hover:bg-gluon hover:scale-105 active:scale-95"
              >
                Explore
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
