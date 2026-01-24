"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BaseTokenIcon from "../components/icons/BaseTokenIcon";
import NeutronIcon from "../components/icons/NeutronIcon";
import ProtonIcon from "../components/icons/ProtonIcon";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  meta?: string;
  inputTokens?: Array<'base' | 'neutron' | 'proton'>;
  outputTokens?: Array<'base' | 'neutron' | 'proton'>;
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
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18,
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
        ? 'shadow-[0_0_16px_rgba(228,32,31,0.5)]'
        : 'shadow-[0_0_16px_rgba(251,191,36,0.5)]';
  const rounded = type === 'base' ? 'rounded-xl' : 'rounded-full';

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${rounded} flex items-center justify-center overflow-hidden border border-white/20 bg-white/[0.06] ${glow}`}
        style={{ width: size, height: size }}
      >
        <Icon size={Math.round(size * 0.85)} className="shrink-0" />
      </div>
      <span className="text-xs font-semibold text-white/80">
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
  inputTokens: Array<'base' | 'neutron' | 'proton'>;
  outputTokens: Array<'base' | 'neutron' | 'proton'>;
}) {
  const isSplit = inputTokens.length === 1 && outputTokens.length === 2;
  const isMerge = inputTokens.length === 2 && outputTokens.length === 1;

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Input Tokens */}
        <div className="flex items-center gap-3">
          {inputTokens.length === 1 ? (
            <TokenIcon type={inputTokens[0]} size={70} />
          ) : (
            <div className="flex flex-col gap-4">
              {inputTokens.map((t, i) => (
                <TokenIcon key={i} type={t} size={60} />
              ))}
            </div>
          )}
        </div>

        {/* Arrow / Flow */}
        <div className="flex items-center text-amber-400/60 text-3xl font-light">
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
            <div className="flex flex-col gap-4">
              {outputTokens.map((t, i) => (
                <TokenIcon key={i} type={t} size={60} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
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

  // Discrete bands: [0, 0.25) → 0, [0.25, 0.5) → 1, [0.5, 0.75) → 2, [0.75, 1] → 3
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
        "group relative flex h-[560px] w-full flex-col overflow-hidden bg-[#0a0a0c] text-white outline-none select-none overflow-x-hidden rounded-2xl border border-white/10",
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
            <div className="h-full w-full bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-amber-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1015] via-[#0F1015]/90 to-transparent" />
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
                  "absolute aspect-[3/4] w-[240px] md:w-[280px] rounded-2xl border border-white/15 bg-neutral-900/90 shadow-2xl transition-shadow duration-300 overflow-hidden",
                  isCenter ? "z-20 shadow-amber-500/10 ring-2 ring-amber-500/30" : "z-10"
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
                transition={(val: string) =>
                  val === "scale" ? TAP_SPRING : BASE_SPRING
                }
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
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
                    <span className="text-white/40 text-sm">{item.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                    {item.meta}
                  </span>
                  <p className="mt-1 font-bold text-white drop-shadow-lg">
                    {item.title}
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
                {activeItem.meta && (
                  <span className="text-xs font-medium uppercase tracking-wider text-amber-400">
                    {activeItem.meta}
                  </span>
                )}
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-amber-50">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-md text-neutral-400 text-sm md:text-base">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10 backdrop-blur-md">
              <button
                onClick={handlePrev}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-amber-500/20 hover:text-amber-300 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[36px] text-center text-xs font-mono text-neutral-500">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-amber-500/20 hover:text-amber-300 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href && (
              <Link
                href={activeItem.href}
                className="group flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition-transform hover:bg-amber-400 hover:scale-105 active:scale-95"
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
