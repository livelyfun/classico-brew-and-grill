import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { SignatureSplit } from '@/components/home/SignatureSplit';
import { FeaturedMenuSection } from '@/components/home/FeaturedMenuSection';
import { AtmospherePreview } from '@/components/home/AtmospherePreview';
import { CustomerReviewsSection } from '@/components/reviews/CustomerReviewsSection';
import { LocationHoursSection } from '@/components/home/LocationHoursSection';
import { CtaBanner } from '@/components/home/CtaBanner';
import {
  getApprovedCustomerReviews,
  getPublishedGalleryItems,
  getPublishedHeroContent,
  getPublishedMenuCategories,
  getPublishedMenuItems,
  getPublishedPageSection,
  getPublishedSiteSettings,
} from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [hero, settings, categories, items, gallery, galleryPage, reviews] =
    await Promise.all([
      getPublishedHeroContent(),
      getPublishedSiteSettings(),
      getPublishedMenuCategories(),
      getPublishedMenuItems(),
      getPublishedGalleryItems(),
      getPublishedPageSection<{
        homePreviewScript?: string;
        homePreviewTitle?: string;
        homePreviewDescription?: string;
      }>('gallery'),
      getApprovedCustomerReviews(),
    ]);

  return (
    <>
      {hero && <HeroSection hero={hero} />}
      {hero && <SignatureSplit data={hero.signatureSplit} />}
      <FeaturedMenuSection categories={categories} items={items} />
      <AtmospherePreview
        photos={gallery}
        scriptLabel={galleryPage?.content?.homePreviewScript}
        title={galleryPage?.content?.homePreviewTitle}
        description={galleryPage?.content?.homePreviewDescription}
      />
      <CustomerReviewsSection reviews={reviews} />
      <LocationHoursSection settings={settings} />
      {hero && <CtaBanner data={hero.ctaBanner} />}
    </>
  );
}
