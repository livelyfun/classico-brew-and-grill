import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminPath, getAdminSession } from '@/lib/auth';
import { getAdminBundle } from '@/lib/cms';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function ClassicAdminPage() {
  const session = getAdminSession();
  const adminPath = getAdminPath();

  if (!session.authenticated) {
    redirect(`${adminPath}/login`);
  }

  const bundle = await getAdminBundle();

  return (
    <AdminDashboardClient
      initialBundle={bundle}
      username={session.username ?? 'admin'}
      adminBasePath={adminPath}
    />
  );
}
