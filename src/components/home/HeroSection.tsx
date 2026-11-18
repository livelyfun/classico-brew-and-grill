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

          {/* Right Brand Wreath Showcase Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Soft Mint Decorative Ring */}
              <div className="absolute inset-0 scale-105 rounded-full border border-dashed border-brand-mint/60 animate-[spin_60s_linear_infinite]" />

              {/* Framed Botanical Medallion */}
              <div className="relative flex h-72 w-72 sm:h-96 sm:w-96 items-center justify-center rounded-full bg-white p-6 sm:p-8 shadow-elevated ring-1 ring-brand-mint/40">
                <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-brand-bg via-white to-brand-mint-light/20" />
                <img
                  src="/images/logo.png"
                  alt="Classico Brew & Grill Official Wreath Emblem"
                  className="relative z-10 h-full w-full object-contain drop-shadow-sm"
                />
              </div>

              {/* Floating Micro-Badge: Morning Brews */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -left-2 bottom-8 hidden sm:flex items-center gap-2.5 rounded-2xl border border-brand-mint/40 bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur-sm"
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
                className="absolute -right-2 top-8 hidden sm:flex items-center gap-2.5 rounded-2xl border border-brand-mint/40 bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur-sm"
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
