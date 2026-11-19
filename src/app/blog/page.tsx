import React from 'react';
import type { Metadata } from 'next';
import { getPublishedBlogPosts, getPublishedSiteSettings } from '@/lib/cms';
import { BlogPageClient } from '@/components/pages/BlogPageClient';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublishedSiteSettings();
  const brandName = settings?.brandName || 'Classico Brew & Grill';
  return {
    title: `Journal & Stories | ${brandName}`,
    description:
      'Stories from Classico Brew & Grill on Airport Road, Biratnagar — morning espresso craft, Restro Garden evenings, and seasonal kitchen specials.',
  };
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  return <BlogPageClient posts={posts} />;
}
