'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  Mail,
  MessageCircleQuestion,
  Phone,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FaqItem } from '@/types/cms';
import { cn } from '@/lib/utils';

interface FaqPageClientProps {
  faqs: FaqItem[];
}

export function FaqPageClient({ faqs }: FaqPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(() =>
    faqs.slice(0, 2).map((f) => f.id)
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchCat =
        selectedCategory === 'all' || f.category === selectedCategory;
      const matchQuery =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [faqs, selectedCategory, search]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="block font-script text-3xl md:text-4xl text-brand-teal mb-2">
            Answers &amp; Guest Inquiries
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-dark/75 leading-relaxed">
            Everything you need to know about our Airport Road location, opening hours, seating areas, coffee house, and group gatherings in Biratnagar.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-brand-mint/30 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                selectedCategory === 'all'
                  ? 'bg-brand-sage text-white shadow-soft'
                  : 'bg-white border border-brand-mint/40 text-brand-dark/80 hover:border-brand-teal hover:text-brand-teal'
              )}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                  selectedCategory === cat
                    ? 'bg-brand-sage text-white shadow-soft'
                    : 'bg-white border border-brand-mint/40 text-brand-dark/80 hover:border-brand-teal hover:text-brand-teal'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/45" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-full border border-brand-mint/45 bg-white pl-10 pr-4 py-2 text-xs text-brand-dark placeholder:text-brand-dark/45 focus:border-brand-teal focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Accordion FAQ List */}
        <div className="mt-8 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-mint/60 bg-white p-12 text-center text-sm text-brand-dark/65">
              No answers found for &ldquo;{search}&rdquo;. You can reach us directly below.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={cn(
                    'overflow-hidden rounded-2xl border bg-white shadow-soft transition-all duration-300',
                    isOpen
                      ? 'border-brand-teal/60 ring-1 ring-brand-teal/20'
                      : 'border-brand-mint/40 hover:border-brand-mint/80'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
                          isOpen
                            ? 'bg-brand-teal text-white'
                            : 'bg-brand-sage/10 text-brand-sage'
                        )}
                      >
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <span className="font-heading text-base sm:text-lg font-semibold text-brand-dark">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-mint/40 transition-transform duration-300',
                        isOpen
                          ? 'rotate-180 bg-brand-teal/10 text-brand-teal'
                          : 'text-brand-dark/50'
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-brand-mint/20 px-5 pb-5 pt-3">
                          <span className="inline-block rounded-full bg-brand-bg px-2.5 py-0.5 text-[11px] font-semibold text-brand-sage mb-2">
                            {faq.category}
                          </span>
                          <p className="text-sm text-brand-dark/80 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Support Help Banner */}
        <div className="mt-14 rounded-3xl border border-brand-mint/45 bg-gradient-to-br from-white via-brand-bg/50 to-brand-mint/20 p-8 shadow-card text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="max-w-md">
            <h3 className="font-heading text-2xl font-semibold text-brand-dark">
              Still have a question?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-brand-dark/75 leading-relaxed">
              Our guest hospitality team is happy to assist with special dietary needs, private bookings, or gift arrangements.
            </p>
          </div>

          <div className="mt-5 sm:mt-0 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="outline" size="sm">
              Contact Us
            </Button>
            <Button href="/reservations" variant="primary" size="sm">
              Book a Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
