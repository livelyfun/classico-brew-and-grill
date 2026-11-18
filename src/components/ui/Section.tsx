import React from 'react';
import { cn } from '@/lib/utils';

type SectionTone = 'sageTint' | 'white' | 'deepSage' | 'dark' | 'mintSoft';

export interface SectionProps {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  noPadding?: boolean;
  children: React.ReactNode;
}

const toneMap: Record<SectionTone, string> = {
  sageTint: 'bg-brand-bg text-brand-dark',
  white: 'bg-white text-brand-dark',
  mintSoft: 'bg-brand-mint-light/25 text-brand-dark',
  deepSage: 'bg-brand-sage text-white',
  dark: 'bg-brand-dark text-white',
};

export function Section({
  id,
  tone = 'sageTint',
  className,
  containerClassName,
  noPadding = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        toneMap[tone],
        !noPadding && 'py-16 md:py-24',
        className
      )}
    >
      <div
        className={cn(
          'relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
