'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  scriptLabel?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  scriptLabel,
  title,
  description,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={cn(
        'max-w-2xl',
        isCentered ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {scriptLabel && (
        <span
          className={cn(
            'block font-script text-3xl md:text-4xl leading-none mb-2',
            light ? 'text-brand-mint-light' : 'text-brand-teal'
          )}
        >
          {scriptLabel}
        </span>
      )}

      <h2
        className={cn(
          'font-heading text-3xl sm:text-4xl md:text-[2.65rem] font-semibold tracking-tight leading-tight',
          light ? 'text-white' : 'text-brand-dark'
        )}
      >
        {title}
      </h2>

      {/* Minimal editorial accent rule */}
      <div
        className={cn(
          'mt-4 h-[1px] w-14',
          isCentered ? 'mx-auto' : '',
          light ? 'bg-brand-mint-light/50' : 'bg-brand-mint'
        )}
      />

      {description && (
        <p
          className={cn(
            'mt-4 text-base md:text-lg leading-relaxed',
            light ? 'text-brand-mint-light/90' : 'text-brand-dark/75'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
