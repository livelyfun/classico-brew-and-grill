'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { GalleryItem } from '@/types/cms';

export function AtmospherePreview({
  photos,
  scriptLabel = 'The Sanctuary',
  title = 'Atmosphere & Conservatory Glimpses',
  description = 'Soft sage banquettes, warm oak tables, indoor olive greenery, and the ambient glow of the open hearth.',
}: {
  photos: GalleryItem[];
  scriptLabel?: string;
  title?: string;
  description?: string;
}) {
  const previewPhotos = photos.slice(0, 5);
  if (previewPhotos.length === 0) return null;

  return (
    <Section tone="white" id="atmosphere">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          scriptLabel={scriptLabel}
          title={title}
          description={description}
          className="md:max-w-xl"
        />

        <Button
          href="/gallery"
          variant="outline"
          size="md"
          leftIcon={<Camera className="h-4 w-4" />}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Explore Full Gallery
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
        {previewPhotos.map((photo, index) => {
          const spanClass =
            index === 0
              ? 'lg:col-span-6 lg:row-span-2 min-h-[320px] lg:min-h-[460px]'
              : 'lg:col-span-3 min-h-[220px]';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl bg-brand-bg shadow-soft ${spanClass}`}
            >
              <Link href="/gallery" className="block h-full w-full">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-block rounded-full bg-brand-teal/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {photo.category}
                  </span>
                  <h3 className="mt-2 font-heading text-lg sm:text-xl font-medium">
                    {photo.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-brand-mint-light/90">
                    {photo.caption}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
