'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Leaf } from 'lucide-react';
import { MenuItem } from '@/types/cms';
import { cn, formatPrice } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

function getTagStyle(tag: string) {
  switch (tag) {
    case 'Signature':
      return 'bg-brand-teal/12 text-brand-teal border-brand-teal/25';
    case 'Wood-Fired':
      return 'bg-brand-sage/12 text-brand-sage border-brand-sage/25';
    case 'Single Origin':
      return 'bg-brand-dark/8 text-brand-dark border-brand-dark/15';
    default:
      return 'bg-brand-mint-light/40 text-brand-sage-dark border-brand-mint/40';
  }
}

export function MenuCard({ item, index = 0 }: MenuCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-mint/35 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-elevated"
    >
      {/* Image Header */}
      <div className="relative h-52 w-full overflow-hidden bg-brand-bg">
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/45 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-75" />

        {/* Price Pill */}
        <span className="absolute right-3.5 top-3.5 rounded-full bg-white/95 px-3.5 py-1 text-sm font-semibold text-brand-dark shadow-sm backdrop-blur-sm">
          {formatPrice(item.price)}
        </span>

        {/* Featured Signature Marker */}
        {item.featured && (
          <span className="absolute left-3.5 top-3.5 inline-flex items-center rounded-full bg-brand-teal px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-xl font-semibold text-brand-dark transition-colors group-hover:text-brand-teal">
            {item.name}
          </h3>
        </div>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-dark/75">
          {item.description}
        </p>

        {/* Pairing Note */}
        {item.pairingNote && (
          <p className="mt-3 rounded-lg bg-brand-bg px-3 py-2 text-xs italic text-brand-sage">
            {item.pairingNote}
          </p>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-brand-mint/20 pt-3.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                  getTagStyle(tag)
                )}
              >
                {tag === 'Wood-Fired' && <Flame className="h-2.5 w-2.5" />}
                {(tag === 'Vegetarian' || tag === 'Vegan') && (
                  <Leaf className="h-2.5 w-2.5" />
                )}
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
