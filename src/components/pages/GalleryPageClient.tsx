'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { GalleryItem, PageSectionData } from '@/types/cms';
import { cn } from '@/lib/utils';

const galleryCategories = [
  { key: 'all', label: 'All Moments' },
  { key: 'atmosphere', label: 'Atmosphere & Garden' },
  { key: 'brews', label: 'Coffee & Brews' },
  { key: 'grill', label: 'Grill & Kitchen' },
  { key: 'desserts', label: 'Drinks & Refreshers' },
];

export function GalleryPageClient({
  pageSection,
  allItems,
}: {
  pageSection: PageSectionData | null;
  allItems: GalleryItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    if (activeCategory === 'all') return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [allItems, activeCategory]);

  const activePhoto =
    lightboxIndex !== null && items[lightboxIndex] ? items[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  };

  return (
    <>
      <PageHero
        scriptLabel={pageSection?.scriptLabel || 'Visual Journal'}
        title={pageSection?.title || 'Moments at Classico'}
        description={
          pageSection?.description ||
          'Step inside our Airport Road coffee house, shaded restro garden, and illuminated mezzanine deck.'
        }
      />

      <Section tone="sageTint">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {galleryCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActiveCategory(cat.key);
                setLightboxIndex(null);
              }}
              className={cn(
                'rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200',
                activeCategory === cat.key
                  ? 'bg-brand-teal text-white shadow-glow'
                  : 'border border-brand-mint/40 bg-white text-brand-dark/80 hover:border-brand-teal hover:text-brand-teal'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxIndex(idx)}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border border-brand-mint/30 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated focus:outline-none',
                  item.aspect === 'landscape' ? 'sm:aspect-[4/3]' : 'aspect-square'
                )}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/15 to-transparent opacity-65 transition-opacity duration-300 group-hover:opacity-90" />

                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-dark opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-block rounded-full bg-brand-teal/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-brand-mint-light/90 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/92 p-4 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-brand-dark shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close image preview"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-brand-teal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex max-h-[75vh] items-center justify-center bg-black">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-h-[75vh] w-full object-contain"
                />

                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-brand-teal"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-brand-teal"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col justify-between gap-2 bg-brand-dark px-6 py-5 text-white sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-xl font-medium">
                    {activePhoto.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-mint-light/85">
                    {activePhoto.caption}
                  </p>
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-brand-mint">
                  {(lightboxIndex ?? 0) + 1} / {items.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
