'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MenuCard } from '@/components/ui/MenuCard';
import { Button } from '@/components/ui/Button';
import { MenuCategory, MenuItem } from '@/types/cms';
import { cn } from '@/lib/utils';

export function FeaturedMenuSection({
  categories,
  items,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const featuredItems = useMemo(
    () => items.filter((item) => item.featured),
    [items]
  );

  const [activeTab, setActiveTab] = useState<string>('featured');

  const visibleItems = useMemo(() => {
    if (activeTab === 'featured') {
      return (featuredItems.length > 0 ? featuredItems : items).slice(0, 6);
    }
    return items.filter((item) => item.categorySlug === activeTab).slice(0, 3);
  }, [activeTab, featuredItems, items]);

  if (items.length === 0) return null;

  return (
    <Section tone="sageTint" id="featured-menu">
      <SectionHeading
        scriptLabel="Curated Highlights"
        title="Taste the Classico Table"
        description="Preview our published kitchen and roastery favorites, thoughtfully prepared daily from seasonal harvests and roasted to order."
      />

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('featured')}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
            activeTab === 'featured'
              ? 'bg-brand-teal text-white shadow-glow'
              : 'border border-brand-mint/45 bg-white text-brand-dark/80 hover:border-brand-teal hover:text-brand-teal'
          )}
        >
          Chef &amp; Barista Favorites
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveTab(cat.slug)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
              activeTab === cat.slug
                ? 'bg-brand-sage text-white shadow-soft'
                : 'border border-brand-mint/45 bg-white text-brand-dark/80 hover:border-brand-sage hover:text-brand-sage'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {visibleItems.map((item, idx) => (
          <MenuCard key={item.id} item={item} index={idx} />
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <Button
          href="/menu"
          variant="secondary"
          size="lg"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          View Full Interactive Menu
        </Button>
      </div>
    </Section>
  );
}
