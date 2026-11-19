'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BlogPost } from '@/types/cms';
import { cn } from '@/lib/utils';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCat =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [posts, selectedCategory, search]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-brand-bg pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="block font-script text-3xl md:text-4xl text-brand-teal mb-2">
            Classico Journal &amp; Stories
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark">
            Coffee House Chronicles &amp; Garden Kitchen
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-dark/75 leading-relaxed">
            Stories from our Airport Road coffee house, restro garden evenings, espresso craft, and seasonal kitchen favorites in Biratnagar.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-brand-mint/30 pb-6">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                selectedCategory === 'all'
                  ? 'bg-brand-sage text-white shadow-soft'
                  : 'bg-white border border-brand-mint/40 text-brand-dark/80 hover:border-brand-teal hover:text-brand-teal'
              )}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
                  selectedCategory === cat
                    ? 'bg-brand-sage text-white shadow-soft'
                    : 'bg-white border border-brand-mint/40 text-brand-dark/80 hover:border-brand-teal hover:text-brand-teal'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/45" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journals..."
              className="w-full rounded-full border border-brand-mint/45 bg-white pl-10 pr-4 py-2 text-xs text-brand-dark placeholder:text-brand-dark/45 focus:border-brand-teal focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-brand-mint/60 bg-white p-12 text-center text-sm text-brand-dark/65">
            No journal articles found matching &ldquo;{search}&rdquo;. Try another topic.
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {/* Featured Post Card */}
            {featuredPost && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative grid grid-cols-1 overflow-hidden rounded-3xl border border-brand-mint/45 bg-white shadow-soft transition-all duration-300 hover:border-brand-teal/50 hover:shadow-card md:grid-cols-12"
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:col-span-7 bg-brand-mint/20 overflow-hidden">
                  {featuredPost.coverImage && (
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-brand-dark/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      Featured Story
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-brand-sage font-medium">
                      <span>{featuredPost.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-brand-dark/60">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-dark group-hover:text-brand-teal transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm text-brand-dark/75 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-brand-mint/25 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-brand-dark">
                          {featuredPost.author}
                        </p>
                        {featuredPost.authorRole && (
                          <p className="text-[11px] text-brand-sage">
                            {featuredPost.authorRole}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => setActiveArticle(featuredPost)}
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-mint/40 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-card"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-mint/20">
                        {post.coverImage && (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-brand-dark/75 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-brand-dark/55 mb-2.5">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl font-semibold text-brand-dark group-hover:text-brand-teal transition-colors">
                          {post.title}
                        </h3>

                        <p className="mt-2.5 text-xs sm:text-sm text-brand-dark/70 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-brand-mint/25 p-6 pt-4">
                      <div>
                        <p className="text-xs font-semibold text-brand-dark">
                          {post.author}
                        </p>
                        {post.authorRole && (
                          <p className="text-[11px] text-brand-sage">
                            {post.authorRole}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveArticle(post)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-teal hover:text-brand-teal/80 transition-colors"
                      >
                        Read
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative my-8 w-full max-w-3xl rounded-3xl border border-brand-mint/45 bg-white shadow-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-brand-dark/70 p-2 text-white hover:bg-brand-dark transition-colors"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>

              {activeArticle.coverImage && (
                <div className="relative aspect-[21/9] w-full bg-brand-mint/20">
                  <Image
                    src={activeArticle.coverImage}
                    alt={activeArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="rounded-full bg-brand-teal px-3 py-1 text-xs font-semibold text-white">
                      {activeArticle.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-10 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-brand-dark/60 mb-2">
                    <span className="flex items-center gap-1 font-semibold text-brand-dark">
                      <User className="h-3.5 w-3.5 text-brand-teal" />
                      {activeArticle.author}{' '}
                      {activeArticle.authorRole ? `(${activeArticle.authorRole})` : ''}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {activeArticle.readTime}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-4xl font-bold text-brand-dark leading-tight">
                    {activeArticle.title}
                  </h2>
                </div>

                <div className="border-l-4 border-brand-teal bg-brand-bg p-4 rounded-r-2xl">
                  <p className="text-sm font-medium text-brand-dark/85 italic leading-relaxed">
                    {activeArticle.excerpt}
                  </p>
                </div>

                <div className="prose prose-sm max-w-none text-brand-dark/85 leading-relaxed space-y-4">
                  {activeArticle.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h4
                          key={i}
                          className="font-heading text-lg font-semibold text-brand-dark pt-3"
                        >
                          {paragraph.replace('### ', '')}
                        </h4>
                      );
                    }
                    return (
                      <p key={i} className="text-sm sm:text-base leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                <div className="border-t border-brand-mint/30 pt-6 flex justify-end">
                  <Button
                    onClick={() => setActiveArticle(null)}
                    variant="outline"
                    size="sm"
                  >
                    Back to Journal
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
