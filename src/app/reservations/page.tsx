import React from 'react';
import {
  getPublishedPageSection,
  getPublishedSiteSettings,
} from '@/lib/cms';
import { ReservationsPageClient } from '@/components/pages/ReservationsPageClient';
import { SeatingZone } from '@/types/cms';

export const dynamic = 'force-dynamic';

export default async function ReservationsPage() {
  const [pageSection, settings] = await Promise.all([
    getPublishedPageSection<{
      seatingZones?: SeatingZone[];
      timeGroups?: Array<{ label: string; slots: string[] }>;
      occasions?: string[];
    }>('reservations'),
    getPublishedSiteSettings(),
  ]);

  return (
    <ReservationsPageClient pageSection={pageSection} settings={settings} />
  );
}
