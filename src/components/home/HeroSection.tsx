'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  Coffee,
  Flame,
  Leaf,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/data/siteData';

const vaporPlumes = [
  { id: 'v1', left: '40%', width: 42, height: 84, driftX: -10, delay: 0, duration: 4.8 },
  { id: 'v2', left: '49%', width: 54, height: 96, driftX: 8, delay: 1.4, duration: 5.4 },
  { id: 'v3', left: '57%', width: 38, height: 78, driftX: 12, delay: 2.7, duration: 4.5 },
];

export function HeroSection() {
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

          {/* Right Photorealistic Latte Showcase Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative flex h-80 w-80 items-center justify-center sm:h-[420px] sm:w-[420px]">
              {/* Soft Studio Backdrop Halo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 rounded-full bg-gradient-to-b from-white via-brand-bg/90 to-brand-mint-light/30 shadow-soft ring-1 ring-brand-mint/35"
              />

              {/* Subtle Soft-Blurred Rising Steam Vapor from Hot Crema */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-6 z-20 h-28 overflow-visible"
              >
                {vaporPlumes.map((plume) => (
                  <motion.div
                    key={plume.id}
                    style={{
                      left: plume.left,
                      width: plume.width,
                      height: plume.height,
                    }}
                    className="absolute bottom-0 -translate-x-1/2 rounded-full bg-gradient-to-t from-white/70 via-white/35 to-transparent blur-lg"
                    initial={{ opacity: 0, y: 12, scale: 0.85, x: 0 }}
                    animate={{
                      opacity: [0, 0.52, 0.28, 0],
                      y: [12, -26, -54, -78],
                      x: [0, plume.driftX * 0.5, plume.driftX, plume.driftX * 0.6],
                      scale: [0.85, 1.05, 1.25, 1.4],
                    }}
                    transition={{
                      duration: plume.duration,
                      delay: plume.delay,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>

              {/* Realistic Soft Table Contact Shadow */}
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: [1, 0.93, 1],
                  opacity: [0.22, 0.14, 0.22],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute bottom-10 h-7 w-56 rounded-full bg-brand-dark/35 blur-xl sm:bottom-12 sm:w-64"
              />

              {/* Photorealistic Latte Cup with Subtle Natural Levitation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 h-72 w-72 sm:h-[370px] sm:w-[370px]"
              >
                <img
                  src="/images/hero-latte.png"
                  alt="Artisanal freshly poured latte with rosetta crema at Classico Brew & Grill"
                  className="h-full w-full object-contain drop-shadow-[0_20px_28px_rgba(31,42,38,0.16)]"
                />
              </motion.div>

              {/* Floating Micro-Badge: Morning Brews */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -left-2 bottom-8 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border border-brand-mint/40 bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur-sm"
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
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="absolute -right-2 top-10 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border border-brand-mint/40 bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur-sm"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
