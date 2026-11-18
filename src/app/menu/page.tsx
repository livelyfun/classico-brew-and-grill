import React, { Suspense } from 'react';
import {
  getPublishedMenuCategories,
  getPublishedMenuItems,
  getPublishedPageSection,
} from '@/lib/cms';
import { MenuPageClient } from '@/components/pages/MenuPageClient';

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const [pageSection, categories, items] = await Promise.all([
    getPublishedPageSection<{
      pairingBadge?: string;
      pairingTitle?: string;
      pairingDescription?: string;
      pairingDuo1?: string;
      pairingDuo2?: string;
    }>('menu'),
    getPublishedMenuCategories(),
    getPublishedMenuItems(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-bg pt-36 text-center text-brand-sage">
          Loading seasonal menu...
        </div>
      }
    >
      <MenuPageClient
        pageSection={pageSection}
        categories={categories}
        items={items}
      />
    </Suspense>
  );
}
