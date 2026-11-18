'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Utensils } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CtaBannerData } from '@/types/cms';

export function CtaBanner({ data }: { data: CtaBannerData }) {
  if (!data || !data.headline) return null;

  return (
    <Section tone="deepSage" className="relative">
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
        <p className="font-script text-3xl sm:text-4xl text-brand-mint-light">
          {data.scriptAccent}
        </p>

        <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
          {data.headline}
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-brand-mint-light/90">
          {data.description}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={data.primaryCtaHref}
            variant="primary"
            size="lg"
            leftIcon={<CalendarDays className="h-4 w-4" />}
          >
            {data.primaryCtaLabel}
          </Button>
          <Button
            href={data.secondaryCtaHref}
            variant="white"
            size="lg"
            leftIcon={<Utensils className="h-4 w-4 text-brand-sage" />}
          >
            {data.secondaryCtaLabel}
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
