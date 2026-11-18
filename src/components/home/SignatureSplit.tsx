'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Flame } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

const pillars = [
  {
    id: 'brews',
    script: 'Morning & Midday',
    title: 'Signature Artisanal Brews',
    subtitle: 'Small-Batch Roastery & Botanical Espresso Bar',
    description:
      'Start your morning beneath natural conservatory light with precision V60 pour-overs, cold-steeped rosemary tonics, and our signature Pistachio Sage Latte crafted with house-made infusions.',
    highlights: [
      'Direct-trade Ethiopian & Colombian single origins',
      'House-steeped pistachio, sage & Madagascar vanilla syrups',
      'Fresh-baked sourdough focaccia & morning pastries',
    ],
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    ctaLabel: 'Explore Coffee & Brews',
    ctaHref: '/menu?category=coffee-brews',
    icon: Coffee,
    accentColor: 'teal',
  },
  {
    id: 'grill',
    script: 'Lunch & Candlelit Dinner',
    title: 'White-Oak Grill Specials',
    subtitle: 'Open-Hearth Cuts, Coastal Seafood & Handmade Mains',
    description:
      'As afternoon turns to dusk, our white oak and applewood hearth comes alive. Savor 28-day dry-aged ribeye, cedar-seared Atlantic salmon, and herb-crusted lamb finished with cultured herb butter.',
    highlights: [
      'Seasoned white oak & fragrant Pacific fruitwood embers',
      'Pasture-raised prime cuts & sustainable coastal catches',
      'Handmade pappardelle, truffle risotto & blistered sides',
    ],
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    ctaLabel: 'Explore Grill & Mains',
    ctaHref: '/menu?category=grill',
    icon: Flame,
    accentColor: 'sage',
  },
];

export function SignatureSplit() {
  return (
    <Section tone="white" id="signatures">
      <SectionHeading
        scriptLabel="Two Timeless Crafts"
        title="From Dawn Espresso to Ember-Kissed Evenings"
        description="Classico bridges the quiet serenity of a specialty conservatory café with the warmth and richness of a classic wood-fired dining room."
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isTeal = pillar.accentColor === 'teal';

          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-brand-mint/35 bg-brand-bg shadow-soft transition-all duration-300 hover:shadow-elevated"
            >
              {/* Photo Banner */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={pillar.image}
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

              {/* Card Body */}
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
