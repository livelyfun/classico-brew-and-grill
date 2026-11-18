import React from 'react';
import {
  getPublishedPageSection,
  getPublishedSiteSettings,
} from '@/lib/cms';
import { ContactPageClient } from '@/components/pages/ContactPageClient';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const [pageSection, settings] = await Promise.all([
    getPublishedPageSection<{
      deskTitle?: string;
      deskSubtitle?: string;
      formScript?: string;
      formTitle?: string;
    }>('contact'),
    getPublishedSiteSettings(),
  ]);

  return <ContactPageClient pageSection={pageSection} settings={settings} />;
}
