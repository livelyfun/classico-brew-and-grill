import React from 'react';
import type { Metadata } from 'next';
import { getPublishedFaqItems, getPublishedSiteSettings } from '@/lib/cms';
import { FaqPageClient } from '@/components/pages/FaqPageClient';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublishedSiteSettings();
  const brandName = settings?.brandName || 'Classico Brew & Grill';
  return {
    title: `Frequently Asked Questions | ${brandName}`,
    description:
      'Answers to common guest questions regarding reservations, wood-fired hearth dining, dietary accommodations, and our specialty coffee roastery.',
  };
}

export default async function FaqPage() {
  const faqs = await getPublishedFaqItems();
  return <FaqPageClient faqs={faqs} />;
}
