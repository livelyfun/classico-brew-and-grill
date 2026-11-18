import React from 'react';
import type { Metadata } from 'next';
import { getPublishedBlogPosts, getPublishedSiteSettings } from '@/lib/cms';
import { BlogPageClient } from '@/components/pages/BlogPageClient';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublishedSiteSettings();
  const brandName = settings?.brandName || 'Classico Brew & Grill';
  return {
    title: `Journal & Roastery Stories | ${brandName}`,
    description:
      'Explore articles on artisanal coffee roasting, wood-fired hearth gastronomy, origin farms, and culinary craft.',
  };
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  return <BlogPageClient posts={posts} />;
}
