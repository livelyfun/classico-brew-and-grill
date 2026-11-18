'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Coffee,
  Flame,
  HeartHandshake,
  Leaf,
  Quote,
  Sparkles,
} from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { AboutPageContentJson, BrandValue, PageSectionData } from '@/types/cms';

const iconMap: Record<
  BrandValue['iconName'],
  React.ComponentType<{ className?: string }>
> = {
  Coffee,
  Flame,
  Leaf,
  HeartHandshake,
};

export function AboutPageClient({
  pageSection,
}: {
  pageSection: PageSectionData<AboutPageContentJson> | null;
}) {
  if (!pageSection) {
    return (
      <Section tone="sageTint" className="pt-36 text-center">
        <p className="text-brand-sage">About page content is currently unpublished.</p>
      </Section>
    );
  }

  const content = pageSection.content;

  return (
    <>
      <PageHero
        scriptLabel={pageSection.scriptLabel}
        title={pageSection.title}
        description={pageSection.description}
      />

      <Section tone="white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-3xl border border-brand-mint/40 bg-brand-bg shadow-elevated">
              <img
                src={content.storyImageUrl}
                alt={content.storyHeadline}
                className="h-[420px] w-full object-cover sm:h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-brand-mint/40 bg-white p-4 shadow-soft sm:absolute sm:-bottom-6 sm:right-6 sm:mt-0 sm:max-w-xs">
              <img
                src="/images/logo.png"
                alt="Classico Emblem"
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div>
                <p className="font-heading text-base font-semibold text-brand-dark">
                  {content.storyOverlayTitle}
                </p>
                <p className="text-xs text-brand-sage">
                  {content.storyOverlaySubtitle}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-8 lg:col-span-6 lg:pl-4"
          >
            <div>
              <span className="font-script text-3xl text-brand-teal">
                {content.storyScript}
              </span>
              <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
                {content.storyHeadline}
              </h2>
            </div>

            <div className="space-y-6">
              {(content.chapters ?? []).map((chapter) => (
                <div
                  key={chapter.title}
                  className="border-l-2 border-brand-mint pl-5"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
                    {chapter.year}
                  </span>
                  <h3 className="mt-1 font-heading text-xl font-semibold text-brand-dark">
                    {chapter.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-brand-dark/75">
                    {chapter.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <Section tone="sageTint">
        <SectionHeading
          scriptLabel={content.valuesScript}
          title={content.valuesTitle}
          description={content.valuesDescription}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(content.values ?? []).map((val, idx) => {
            const Icon = iconMap[val.iconName] ?? Sparkles;
            return (
              <motion.div
                key={val.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="flex flex-col rounded-2xl border border-brand-mint/35 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/12 text-brand-teal">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-brand-dark">
                  {val.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-brand-dark/75">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          scriptLabel={content.leadersScript}
          title={content.leadersTitle}
          description={content.leadersDescription}
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {(content.leaders ?? []).map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col overflow-hidden rounded-3xl border border-brand-mint/35 bg-brand-bg shadow-soft sm:flex-row"
            >
              <div className="h-64 w-full shrink-0 sm:h-auto sm:w-52">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-mint-light/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-sage-dark">
                  <Sparkles className="h-3 w-3 text-brand-teal" />
                  {leader.specialty}
                </span>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-brand-dark">
                  {leader.name}
                </h3>
                <p className="text-sm font-medium text-brand-teal">
                  {leader.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/75">
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="deepSage">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="font-script text-3xl text-brand-mint-light">
              {content.testimonialsScript}
            </span>
            <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-semibold text-white">
              {content.testimonialsTitle}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {(content.testimonials ?? []).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm"
              >
                <Quote className="h-7 w-7 text-brand-mint-light/70" />
                <p className="mt-4 font-heading text-lg italic leading-relaxed text-white">
                  “{item.quote}”
                </p>
                <div className="mt-5 border-t border-white/15 pt-4">
                  <p className="text-sm font-semibold text-white">
                    {item.author}
                  </p>
                  <p className="text-xs text-brand-mint-light/80">
                    {item.context}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/reservations" variant="primary" size="lg">
              Experience Classico Yourself
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
