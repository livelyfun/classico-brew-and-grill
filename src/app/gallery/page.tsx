import React from 'react';
import {
  getPublishedGalleryItems,
  getPublishedPageSection,
} from '@/lib/cms';
import { GalleryPageClient } from '@/components/pages/GalleryPageClient';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const [pageSection, gallery] = await Promise.all([
    getPublishedPageSection('gallery'),
    getPublishedGalleryItems(),
  ]);

  return <GalleryPageClient pageSection={pageSection} allItems={gallery} />;
}
