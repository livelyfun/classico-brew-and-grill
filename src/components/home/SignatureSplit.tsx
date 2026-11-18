'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Flame } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { HeroContentData } from '@/types/cms';

export function SignatureSplit({
  data,
}: {
  data: HeroContentData['signatureSplit'];
}) {
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
    <Section tone="white" id="signatures">
      <SectionHeading
        scriptLabel={data.scriptLabel}
        title={data.title}
        description={data.description}
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {data.items.map((pillar, idx) => {
          const isTeal = pillar.accentColor === 'teal';
          const Icon = isTeal ? Coffee : Flame;

          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-brand-mint/35 bg-brand-bg shadow-soft transition-all duration-300 hover:shadow-elevated"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={pillar.imageUrl}
                  alt={pillar.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/15 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="font-script text-2xl text-brand-mint-light">
                      {pillar.script}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                      {pillar.title}
                    </h3>
                  </div>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md ${
                      isTeal ? 'bg-brand-teal' : 'bg-brand-sage'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sage">
                  {pillar.subtitle}
                </p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-brand-dark/80">
                  {pillar.description}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-brand-mint/30 pt-5 text-sm text-brand-dark/85">
                  {pillar.highlights.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          isTeal ? 'bg-brand-teal' : 'bg-brand-sage'
                        }`}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-2">
                  <Button
                    href={pillar.ctaHref}
                    variant={isTeal ? 'primary' : 'secondary'}
                    size="md"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    {pillar.ctaLabel}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
