'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Coffee,
  Flame,
  Leaf,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/data/siteData';

export function HeroSection() {
  const [flipCount, setFlipCount] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const isCoffeeSide = flipCount % 2 === 1;

  const fallControls = useAnimationControls();
  const echoControls = useAnimationControls();
  const shineControls = useAnimationControls();
  const flippingRef = useRef(false);

  const triggerCoinFlip = useCallback(async () => {
    if (flippingRef.current) return;
    flippingRef.current = true;
    setIsFlipping(true);
    setFlipCount((prev) => prev + 1);

    // Parallel physics: departing echo falls away while main 3D coin rotates, drops & settles with coffee taking its place
    echoControls.set({ y: 0, rotateX: 0, scale: 1, opacity: 0.42 });
    shineControls.set({ x: '-120%', opacity: 0 });

    await Promise.all([
      fallControls.start({
        y: [0, 52, -8, 0],
        rotateX: [0, 22, -10, 0],
        rotateZ: [0, -6, 3, 0],
        scale: [1, 0.94, 1.02, 1],
        transition: {
          duration: 2.3,
          times: [0, 0.45, 0.82, 1],
          ease: 'easeInOut',
        },
      }),
      echoControls.start({
        y: [0, 118],
        rotateX: [0, 56],
        scale: [1, 0.78],
        opacity: [0.42, 0],
        transition: {
          duration: 1.55,
          ease: 'easeIn',
        },
      }),
      shineControls.start({
        x: ['-120%', '140%'],
        opacity: [0, 0.55, 0],
        transition: {
          duration: 1.8,
          ease: 'easeInOut',
        },
      }),
    ]);

    flippingRef.current = false;
    setIsFlipping(false);
  }, [echoControls, fallControls, shineControls]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      void triggerCoinFlip();
    }, 1800);

    const cycleTimer = setInterval(() => {
      void triggerCoinFlip();
    }, 6800);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleTimer);
    };
  }, [triggerCoinFlip]);
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-b from-white via-brand-bg to-brand-bg pt-24 pb-16 md:pt-28 md:pb-24">
      {/* Subtle botanical light glows */}
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
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-mint/45 bg-white/90 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-sage shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-teal" />
              <span>Botanical Roastery &amp; Wood-Fired Kitchen</span>
            </div>

            <p className="mt-6 font-script text-3xl sm:text-4xl text-brand-teal">
              Crafted with Calm &amp; Ember
            </p>

            <h1 className="mt-2 font-heading text-4xl sm:text-5xl lg:text-[3.65rem] font-semibold tracking-tight text-brand-dark leading-[1.12]">
              {siteConfig.tagline}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-brand-dark/75 lg:mx-0">
              {siteConfig.subTagline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                href="/reservations"
                variant="primary"
                size="lg"
                leftIcon={<CalendarDays className="h-4 w-4" />}
              >
                Book a Table
              </Button>
              <Button
                href="/menu"
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore Our Menu
              </Button>
            </div>

            {/* Subtle Craft Pillars Strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-mint/35 pt-7 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1.5 text-brand-teal font-medium text-xs uppercase tracking-wider">
                  <Coffee className="h-3.5 w-3.5" />
                  <span>Roastery</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-dark/75">
                  From 7:30 AM Daily
                </p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1.5 text-brand-sage font-medium text-xs uppercase tracking-wider">
                  <Flame className="h-3.5 w-3.5" />
                  <span>Oak Hearth</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-dark/75">
                  Dry-Aged &amp; Coastal
                </p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1.5 text-brand-teal font-medium text-xs uppercase tracking-wider">
                  <Leaf className="h-3.5 w-3.5" />
                  <span>Conservatory</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-dark/75">
                  Willow Creek Quarter
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Brand Wreath & Coffee 3D Coin Showcase Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div
              className="relative flex items-center justify-center"
              style={{ perspective: '1400px' }}
            >
              {/* Outer Soft Mint Decorative Ring */}
              <div className="pointer-events-none absolute inset-0 scale-105 rounded-full border border-dashed border-brand-mint/60 animate-[spin_60s_linear_infinite]" />

              {/* Subtle Ground Shadow that expands softly as the coin falls */}
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: isFlipping ? 1.08 : 0.92,
                  opacity: isFlipping ? 0.24 : 0.14,
                }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="pointer-events-none absolute -bottom-7 h-7 w-56 rounded-full bg-brand-dark/35 blur-xl sm:w-72"
              />

              {/* Departing Falling Coin Echo (visualizes the previous side falling away as the new side takes its place) */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={echoControls}
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center rounded-full border-2 border-brand-mint/60 bg-white/75 shadow-soft"
              />

              {/* Interactive 3D Coin Button Wrapper (Falling & Tilting Physics) */}
              <motion.button
                type="button"
                onClick={() => void triggerCoinFlip()}
                aria-label="Flip Classico Emblem and Artisanal Coffee Coin"
                animate={fallControls}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative z-10 h-72 w-72 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal sm:h-96 sm:w-96"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Slow Continuous 3D Y-Axis Coin Spin */}
                <motion.div
                  animate={{ rotateY: flipCount * 180 }}
                  transition={{
                    duration: 2.3,
                    ease: [0.42, 0.0, 0.22, 1.0],
                  }}
                  className="relative h-full w-full rounded-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Coin Edge Rim Thickness Layer */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border-[3px] border-brand-sage/45 bg-gradient-to-br from-brand-mint via-brand-teal/40 to-brand-sage/60"
                    style={{ transform: 'translateZ(-5px)' }}
                  />

                  {/* SIDE A (Obverse): Original Classico Wreath Emblem */}
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-white p-6 shadow-elevated ring-2 ring-brand-mint/50 sm:p-8"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'translateZ(2px)',
                    }}
                  >
                    <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-brand-bg via-white to-brand-mint-light/20" />
                    <img
                      src="/images/logo.png"
                      alt="Classico Brew & Grill Official Wreath Emblem"
                      className="relative z-10 h-full w-full object-contain drop-shadow-sm"
                    />
                    {/* Animated Specular Glint */}
                    <motion.div
                      aria-hidden="true"
                      animate={shineControls}
                      className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    />
                  </div>

                  {/* SIDE B (Reverse): Artisanal Coffee Coin Taking Its Place */}
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-elevated ring-2 ring-brand-teal/55 sm:p-2.5"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(2px)',
                    }}
                  >
                    <img
                      src="/images/hero-coffee-coin.png"
                      alt="Classico Artisanal Latte Art Coffee Medallion"
                      className="h-full w-full rounded-full object-cover drop-shadow-sm"
                    />
                    {/* Subtle Rim Badge on Coffee Face */}
                    <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brand-mint/50 bg-white/92 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-sage shadow-sm backdrop-blur-sm sm:bottom-6">
                      Single-Origin Brew
                    </span>
                    {/* Animated Specular Glint */}
                    <motion.div
                      aria-hidden="true"
                      animate={shineControls}
                      className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                    />
                  </div>
                </motion.div>
              </motion.button>

              {/* Floating Micro-Badge: Morning Brews */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: isCoffeeSide ? 1.05 : 1,
                }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`absolute -left-2 bottom-8 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur-sm transition-colors duration-500 ${
                  isCoffeeSide
                    ? 'border-brand-teal/60 ring-1 ring-brand-teal/25'
                    : 'border-brand-mint/40'
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                  <Coffee className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-brand-dark">
                    Single-Origin Espresso
                  </p>
                  <p className="text-[11px] text-brand-sage">
                    Botanical Infusions
                  </p>
                </div>
              </motion.div>

              {/* Floating Micro-Badge: Open Flame */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: !isCoffeeSide ? 1.05 : 1,
                }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className={`absolute -right-2 top-8 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur-sm transition-colors duration-500 ${
                  !isCoffeeSide
                    ? 'border-brand-sage/60 ring-1 ring-brand-sage/20'
                    : 'border-brand-mint/40'
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-sage/15 text-brand-sage">
                  <Flame className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-brand-dark">
                    White-Oak Grill
                  </p>
                  <p className="text-[11px] text-brand-sage">
                    Wood-Fired Evenings
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Subtle Interactive Coin Side Indicator */}
            <button
              type="button"
              onClick={() => void triggerCoinFlip()}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-mint/45 bg-white/85 px-4 py-1.5 text-xs font-medium text-brand-sage shadow-sm backdrop-blur-sm transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              <RefreshCw
                className={`h-3 w-3 text-brand-teal ${
                  isFlipping ? 'animate-spin' : ''
                }`}
              />
              <span>
                {isCoffeeSide
                  ? 'Coffee Side • Click to Flip Coin'
                  : 'Classico Emblem • Click to Flip Coin'}
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
