'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Coffee,
  Flame,
  Search,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { MenuCard } from '@/components/ui/MenuCard';
import { Button } from '@/components/ui/Button';
import { MenuCategory, MenuItem, PageSectionData } from '@/types/cms';
import { cn } from '@/lib/utils';

const dietaryOptions = [
  'All',
  'Signature',
  'Wood-Fired',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
];

interface MenuPageMeta {
  pairingBadge?: string;
  pairingTitle?: string;
  pairingDescription?: string;
  pairingDuo1?: string;
  pairingDuo2?: string;
}

export function MenuPageClient({
  pageSection,
  categories,
  items,
}: {
  pageSection: PageSectionData<MenuPageMeta> | null;
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat && categories.some((cat) => cat.slug === paramCat)) {
      setSelectedCategory(paramCat);
    }
  }, [searchParams, categories]);

  const activeCategoryMeta = useMemo(
    () => categories.find((cat) => cat.slug === selectedCategory),
    [categories, selectedCategory]
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCat =
        selectedCategory === 'all' || item.categorySlug === selectedCategory;
      const matchesTag =
        selectedTag === 'All' || item.tags.includes(selectedTag);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesTag && matchesSearch;
    });
  }, [items, selectedCategory, selectedTag, searchQuery]);

  const groupedSections = useMemo(() => {
    if (
      selectedCategory !== 'all' ||
      searchQuery.trim() ||
      selectedTag !== 'All'
    ) {
      return null;
    }
    return categories
      .map((category) => ({
        category,
        items: items.filter((item) => item.categoryId === category.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [items, categories, selectedCategory, searchQuery, selectedTag]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTag('All');
    setSearchQuery('');
  };

  const pairing = pageSection?.content ?? {};

  return (
    <>
      <PageHero
        scriptLabel={pageSection?.scriptLabel || 'Seasonal Roasts & Open-Flame Kitchen'}
        title={pageSection?.title || 'Our Menu'}
        description={
          pageSection?.description ||
          'Every dish and brew is crafted to order from published seasonal offerings.'
        }
      />

      <section
        style={{ top: 'var(--navbar-offset, 69px)' }}
        className="sticky z-30 border-b border-brand-mint/35 bg-white/95 py-4 shadow-sm backdrop-blur-md transition-[top,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[top]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all',
                selectedCategory === 'all'
                  ? 'bg-brand-teal text-white shadow-glow'
                  : 'bg-brand-bg text-brand-dark/80 hover:bg-brand-mint-light/40'
              )}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all',
                  selectedCategory === cat.slug
                    ? 'bg-brand-sage text-white shadow-soft'
                    : 'bg-brand-bg text-brand-dark/80 hover:bg-brand-mint-light/40'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-sage" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search espresso, ribeye, truffle..."
                aria-label="Search menu items"
                className="w-full rounded-full border border-brand-mint/45 bg-brand-bg/70 py-2 pl-10 pr-9 text-sm text-brand-dark placeholder:text-brand-dark/45 focus:border-brand-teal focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/50 hover:text-brand-dark"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {dietaryOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    selectedTag === tag
                      ? 'border-brand-teal bg-brand-teal/12 text-brand-teal'
                      : 'border-brand-mint/35 bg-white text-brand-dark/70 hover:border-brand-mint'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section tone="sageTint">
        {groupedSections ? (
          <div className="space-y-16">
            {groupedSections.map(({ category, items: catItems }) => (
              <div key={category.id} id={category.slug} className="scroll-mt-40">
                <div className="mb-8 flex flex-col justify-between gap-2 border-b border-brand-mint/40 pb-4 sm:flex-row sm:items-end">
                  <div>
                    <span className="font-script text-2xl sm:text-3xl text-brand-teal">
                      {category.scriptLabel}
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-dark">
                      {category.name}
                    </h2>
                  </div>
                  <p className="max-w-md text-sm text-brand-dark/70">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {catItems.map((item, idx) => (
                    <MenuCard key={item.id} item={item} index={idx} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {activeCategoryMeta && (
              <div className="mb-8 border-b border-brand-mint/40 pb-4">
                <span className="font-script text-3xl text-brand-teal">
                  {activeCategoryMeta.scriptLabel}
                </span>
                <h2 className="font-heading text-3xl font-semibold text-brand-dark">
                  {activeCategoryMeta.name}
                </h2>
                <p className="mt-1 text-sm text-brand-dark/75">
                  {activeCategoryMeta.description}
                </p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {filteredItems.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${selectedTag}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredItems.map((item, idx) => (
                    <MenuCard key={item.id} item={item} index={idx} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-brand-mint/35 bg-white p-12 text-center shadow-soft"
                >
                  <UtensilsCrossed className="mx-auto h-10 w-10 text-brand-mint" />
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-brand-dark">
                    No matching dishes found
                  </h3>
                  <p className="mt-2 text-sm text-brand-dark/70">
                    Try clearing a dietary tag or searching another ingredient.
                  </p>
                  <div className="mt-6">
                    <Button onClick={clearFilters} variant="outline" size="sm">
                      Reset Menu Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Section>

      {pairing.pairingTitle && (
        <Section tone="white" className="border-t border-brand-mint/30">
          <div className="rounded-3xl border border-brand-mint/40 bg-brand-sage p-8 text-white shadow-elevated sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-mint-light">
                  {pairing.pairingBadge}
                </p>
                <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-semibold">
                  {pairing.pairingTitle}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-brand-mint-light/90 leading-relaxed">
                  {pairing.pairingDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm">
                  {pairing.pairingDuo1 && (
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5">
                      <Coffee className="h-4 w-4 text-brand-teal" />
                      <span>{pairing.pairingDuo1}</span>
                    </div>
                  )}
                  {pairing.pairingDuo2 && (
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5">
                      <Flame className="h-4 w-4 text-brand-mint-light" />
                      <span>{pairing.pairingDuo2}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:items-end">
                <Button href="/reservations" variant="primary" size="lg">
                  Reserve a Table for Dining
                </Button>
                <p className="text-xs text-brand-mint-light/75">
                  Please inform us of any allergies when booking.
                </p>
              </div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
