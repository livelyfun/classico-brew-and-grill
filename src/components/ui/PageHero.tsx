'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PageHeroProps {
  scriptLabel: string;
  title: string;
  description: string;
}

export function PageHero({ scriptLabel, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-mint/30 bg-gradient-to-b from-white via-brand-bg to-brand-bg pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Decorative soft botanical radial accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-mint-light/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="block font-script text-3xl md:text-4xl text-brand-teal mb-2">
            {scriptLabel}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brand-dark">
            {title}
          </h1>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-brand-mint" />
            <Sparkles className="h-4 w-4 text-brand-teal" />
            <span className="h-[1px] w-12 bg-brand-mint" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-brand-dark/75">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
