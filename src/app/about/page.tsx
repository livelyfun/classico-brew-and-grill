import React from 'react';
import { getPublishedAboutPage } from '@/lib/cms';
import { AboutPageClient } from '@/components/pages/AboutPageClient';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const pageSection = await getPublishedAboutPage();
  return <AboutPageClient pageSection={pageSection} />;
}
