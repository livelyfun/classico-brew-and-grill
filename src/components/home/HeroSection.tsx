'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, type Transition } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Coffee,
  Flame,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroContentData } from '@/types/cms';
import { cn } from '@/lib/utils';

const fallbackGridImages = [
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
];

const silkEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const iconMap = {
  Coffee,
  Flame,
  Leaf,
};

function GridTile({
  images,
  activeIdx,
  prevIdx,
  alt,
  className,
  waveDelay = 0,
}: {
  images: string[];
  activeIdx: number;
  prevIdx: number;
  alt: string;
  className: string;
  waveDelay?: number;
}) {
  const isTwoImages = images.length === 2;

  return (
    <div className={cn('relative', className)}>
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-brand-mint/45 bg-brand-dark/10 shadow-soft ring-1 ring-white/80">
        {images.map((imgUrl, idx) => {
          const isActive = idx === activeIdx;
          const isPrev = idx === prevIdx && activeIdx !== prevIdx;
          const zIndex = isActive ? 20 : isPrev ? 10 : 0;

          let animateProps = { opacity: 0, scale: 1.07 };
          let transitionProps: Transition = { duration: 0.25, delay: 0 };

          if (isActive) {
            animateProps = { opacity: 1, scale: 1 };
            transitionProps =
              prevIdx === activeIdx
                ? { duration: 0 }
                : {
                    duration: 1.4,
                    delay: waveDelay,
                    ease: silkEase,
                  };
          } else if (isPrev) {
            if (isTwoImages) {
              animateProps = { opacity: 0, scale: 1.07 };
              transitionProps = {
                duration: 0.05,
                delay: waveDelay + 1.4,
              };
            } else {
              animateProps = { opacity: 1, scale: 1 };
              transitionProps = { duration: 0.2, delay: 0 };
            }
          }

          return (
            <motion.img
              key={imgUrl}
              src={imgUrl}
              alt={alt}
              decoding="async"
              initial={false}
              animate={animateProps}
              transition={transitionProps}
              style={{ zIndex, willChange: 'transform, opacity' }}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          );
        })}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent"
        />
      </div>
    </div>
  );
}

export function HeroSection({ hero }: { hero: HeroContentData }) {
  const images = useMemo(() => {
    const cmsList = Array.from(
      new Set(
        (hero.heroImages ?? [])
          .map((u) => u.trim())
          .filter((u) => u && u !== '/images/hero-latte.png')
      )
    );

    if (cmsList.length >= 2) {
      return cmsList;
    }
    if (cmsList.length === 1) {
      return [cmsList[0], ...fallbackGridImages.filter((f) => f !== cmsList[0])];
    }
    return fallbackGridImages;
  }, [hero.heroImages]);

  const [{ step, prevStep }, setCycleState] = useState({
    step: 0,
    prevStep: 0,
  });

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCycleState((prev) => ({
        step: prev.step + 1,
        prevStep: prev.step,
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const activeCycleIndex = step % images.length;

  const handleJump = (targetIdx: number) => {
    setCycleState((prev) => {
      const currentIdx = prev.step % images.length;
      if (currentIdx === targetIdx) return prev;
      return {
        step: targetIdx,
        prevStep: currentIdx,
      };
    });
  };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-b from-white via-brand-bg to-brand-bg pt-24 pb-16 md:pt-28 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-16 h-96 w-96 rounded-full bg-brand-mint-light/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-8 h-[28rem] w-[28rem] rounded-full bg-brand-teal/12 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left CMS Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <p className="font-script text-3xl sm:text-4xl text-brand-teal">
              {hero.scriptAccent}
            </p>

            <h1 className="mt-2 font-heading text-4xl sm:text-5xl lg:text-[3.65rem] font-semibold tracking-tight text-brand-dark leading-[1.12]">
              {hero.headline}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-brand-dark/75 lg:mx-0">
              {hero.subheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                href={hero.primaryCtaHref}
                variant="primary"
                size="lg"
                leftIcon={<CalendarDays className="h-4 w-4" />}
              >
                {hero.primaryCtaLabel}
              </Button>
              <Button
                href={hero.secondaryCtaHref}
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {hero.secondaryCtaLabel}
              </Button>
            </div>

            {/* Subtle Craft Pillars Strip */}
            {hero.pillars.length > 0 && (
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-mint/35 pt-7 max-w-xl mx-auto lg:mx-0">
                {hero.pillars.map((pillar, i) => {
                  const Icon = iconMap[pillar.iconName] ?? Coffee;
                  return (
                    <div
                      key={`${pillar.label}-${i}`}
                      className="flex flex-col items-center lg:items-start gap-1"
                    >
                      <div
                        className={`flex items-center gap-1.5 font-medium text-xs uppercase tracking-wider ${
                          i % 2 === 0 ? 'text-brand-teal' : 'text-brand-sage'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{pillar.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-dark/75">
                        {pillar.sublabel}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Right Editorial 4-Tile Bento Grid Showcase Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-[480px]">
              {/* Soft Ambient Botanical Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-mint-light/35 via-white/40 to-brand-teal/15 blur-2xl"
              />

              {/* Asymmetric 2x2 Bento Photo Grid with Clockwise Silk Wave */}
              <div className="relative grid grid-cols-2 items-start gap-3.5 sm:gap-4">
                {/* Slot 0 (Top-Left Feature Tile — Wave Step 1: 0s) */}
                <GridTile
                  images={images}
                  activeIdx={step % images.length}
                  prevIdx={prevStep % images.length}
                  alt={`${hero.headline} — Artisanal Brews & Atmosphere`}
                  className="h-44 sm:h-56"
                  waveDelay={0}
                />

                {/* Slot 1 (Top-Right Staggered Tile — Wave Step 2: 0.16s) */}
                <GridTile
                  images={images}
                  activeIdx={(step + 1) % images.length}
                  prevIdx={(prevStep + 1) % images.length}
                  alt={`${hero.headline} — Wood-Fired Grill & Dining`}
                  className="h-40 sm:mt-8 sm:h-48"
                  waveDelay={0.16}
                />

                {/* Slot 2 (Bottom-Left Tile — Wave Step 4: 0.48s clockwise) */}
                <GridTile
                  images={images}
                  activeIdx={(step + 2) % images.length}
                  prevIdx={(prevStep + 2) % images.length}
                  alt={`${hero.headline} — Botanical Conservatory`}
                  className="h-40 sm:h-48"
                  waveDelay={0.48}
                />

                {/* Slot 3 (Bottom-Right Feature Tile — Wave Step 3: 0.32s clockwise) */}
                <GridTile
                  images={images}
                  activeIdx={(step + 3) % images.length}
                  prevIdx={(prevStep + 3) % images.length}
                  alt={`${hero.headline} — Signature Craft`}
                  className="h-44 sm:h-56"
                  waveDelay={0.32}
                />
              </div>

              {/* Animated Gliding Progress Pill Bar */}
              {images.length > 1 && (
                <div className="relative z-10 mt-6 flex items-center justify-center gap-2">
                  {images.map((_, idx) => {
                    const active = idx === activeCycleIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleJump(idx)}
                        aria-label={`Show hero photo set ${idx + 1}`}
                        className={cn(
                          'relative h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                          active
                            ? 'w-8 bg-brand-mint/45'
                            : 'w-2 bg-brand-mint/55 hover:bg-brand-sage/75'
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="hero-cycle-pill"
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 26,
                            }}
                            className="absolute inset-0 rounded-full bg-brand-teal"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
