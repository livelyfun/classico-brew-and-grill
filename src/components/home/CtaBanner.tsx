'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles, Utensils } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function CtaBanner() {
  return (
    <Section tone="deepSage" className="relative">
      {/* Decorative soft ambient circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-teal/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-mint-light/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-mint-light/35 bg-white/10 px-4 py-1.5 text-xs font-medium text-brand-mint-light backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Morning Coffee • Candlelit Grill • Private Gatherings</span>
        </div>

        <p className="mt-6 font-script text-3xl sm:text-4xl text-brand-mint-light">
          Save Your Seat at Classico
        </p>

        <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
          Ready for Slow Mornings or Wood-Fired Evenings?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-brand-mint-light/90">
          Reserve your preferred space in our Botanical Conservatory, Fireside Grill Lounge, or Garden Terrace in just a few clicks.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="/reservations"
            variant="primary"
            size="lg"
            leftIcon={<CalendarDays className="h-4 w-4" />}
          >
            Book a Table Now
          </Button>
          <Button
            href="/menu"
            variant="white"
            size="lg"
            leftIcon={<Utensils className="h-4 w-4 text-brand-sage" />}
          >
            Browse the Full Menu
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
