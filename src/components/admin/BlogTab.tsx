'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CloudinaryImageInput } from '@/components/admin/CloudinaryImageInput';
import { PaginationControls } from '@/components/admin/PaginationControls';
import { BlogPost } from '@/types/cms';
import { cn } from '@/lib/utils';

interface BlogTabProps {
  posts: BlogPost[];
  onMutate: (payload: {
    entity: 'blog';
    action: 'create' | 'update' | 'delete' | 'togglePublish';
    id?: string;
    data?: Record<string, unknown>;
  }) => Promise<void>;
  busy: boolean;
}

export function BlogTab({ posts, onMutate, busy }: BlogTabProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Roastery & Brews',
    author: 'Classico Team',
    authorRole: 'Head Roaster & Chef',
    readTime: '4 min read',
    coverImage: '',
    excerpt: '',
    content: '',
    sortOrder: 0,
    published: true,
  });

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
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' ? p.published : !p.published);
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);
      return matchCat && matchStatus && matchQuery;
    });
  }, [posts, search, categoryFilter, statusFilter]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, page, pageSize]);

  const handleStartCreate = () => {
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      category: categories[0] || 'Roastery & Brews',
      author: 'Classico Team',
      authorRole: 'Culinary Team',
      readTime: '4 min read',
      coverImage:
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      excerpt: '',
      content: '',
      sortOrder: posts.length + 1,
      published: true,
    });
    setIsEditing(true);
  };

  const handleStartEdit = (p: BlogPost) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      category: p.category,
      author: p.author,
      authorRole: p.authorRole ?? '',
      readTime: p.readTime,
      coverImage: p.coverImage,
      excerpt: p.excerpt,
      content: p.content,
      sortOrder: p.sortOrder,
      published: p.published,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingId) {
      await onMutate({
        entity: 'blog',
        action: 'update',
        id: editingId,
        data: form,
      });
    } else {
      await onMutate({
        entity: 'blog',
        action: 'create',
        data: form,
      });
    }
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal">
            <BookOpen className="h-4 w-4" />
            <span>Journal & Articles</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-brand-dark">
            Manage Blog Posts
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/70">
            Publish roastery stories, culinary guides, and artisan coffee techniques to the public blog.
          </p>
        </div>

        <Button
          onClick={handleStartCreate}
          variant="primary"
          size="sm"
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Article</span>
        </Button>
      </div>

      {/* Editor Modal / Card */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-brand-mint/60 bg-white p-6 shadow-card transition-all space-y-4"
        >
          <div className="flex items-center justify-between border-b border-brand-mint/30 pb-3">
            <h3 className="font-heading text-lg font-semibold text-brand-dark">
              {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-full p-1.5 text-brand-dark/60 hover:bg-brand-bg hover:text-brand-dark"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Post Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. The Art of Slow Roasting"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                URL Slug (Optional auto-generated)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="e.g. art-of-slow-roasting"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Roastery & Brews"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. Elias Vance"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Author Role / Specialty
              </label>
              <input
                type="text"
                value={form.authorRole}
                onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                placeholder="e.g. Head Roaster"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Estimated Read Time
              </label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                placeholder="e.g. 4 min read"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <CloudinaryImageInput
                label="Cover Image"
                value={form.coverImage}
                onChange={(url) => setForm({ ...form, coverImage: url })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Short Excerpt (Cards & SEO) *
              </label>
              <textarea
                rows={2}
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="A brief summary for previews..."
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Full Article Content (Markdown / Text) *
              </label>
              <textarea
                rows={8}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write article content. Supports markdown headers (###) and paragraphs..."
                className="w-full font-mono rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-xs text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <label className="inline-flex items-center gap-2 text-xs font-medium text-brand-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                  className="rounded border-brand-mint text-brand-teal focus:ring-brand-teal"
                />
                <span>Published immediately on public blog</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={busy}>
              <Save className="h-4 w-4 mr-1.5" />
              {editingId ? 'Save Changes' : 'Create Article'}
            </Button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-brand-mint/35 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/45" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search articles by title, excerpt, author..."
            className="w-full rounded-xl border border-brand-mint/35 bg-brand-bg pl-9 pr-3.5 py-1.5 text-xs text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-brand-mint/35 bg-brand-bg px-2.5 py-1.5 text-xs text-brand-dark focus:border-brand-teal focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as 'all' | 'published' | 'draft');
              setPage(1);
            }}
            className="rounded-xl border border-brand-mint/35 bg-brand-bg px-2.5 py-1.5 text-xs text-brand-dark focus:border-brand-teal focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Post List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <div
            key={post.id}
            className={cn(
              'group flex flex-col justify-between overflow-hidden rounded-3xl border bg-white shadow-soft transition-all',
              post.published
                ? 'border-brand-mint/45 hover:border-brand-teal/50'
                : 'border-amber-300/60 bg-amber-50/20'
            )}
          >
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-mint/20">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-brand-dark/40">
                    No Cover Image
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-brand-dark/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm',
                      post.published
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-amber-600/90 text-white'
                    )}
                  >
                    {post.published ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        Live
                      </>
                    ) : (
                      'Draft'
                    )}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-[11px] text-brand-dark/60 mb-2">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-heading text-base font-semibold text-brand-dark line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-brand-dark/70 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-brand-mint/25 px-5 py-3 bg-brand-bg/40">
              <button
                type="button"
                onClick={() =>
                  onMutate({
                    entity: 'blog',
                    action: 'togglePublish',
                    id: post.id,
                    data: { published: !post.published },
                  })
                }
                className={cn(
                  'inline-flex items-center gap-1 text-xs font-semibold transition-colors',
                  post.published
                    ? 'text-amber-700 hover:text-amber-800'
                    : 'text-emerald-700 hover:text-emerald-800'
                )}
              >
                {post.published ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    Unpublish
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    Publish
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStartEdit(post)}
                  className="rounded-lg p-1.5 text-brand-teal hover:bg-brand-teal/10 transition-colors"
                  title="Edit Article"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete article "${post.title}"?`)) {
                      onMutate({
                        entity: 'blog',
                        action: 'delete',
                        id: post.id,
                      });
                    }
                  }}
                  className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Article"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-brand-mint/50 p-12 text-center text-sm text-brand-dark/60">
          No blog posts found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      <PaginationControls
        totalItems={filteredPosts.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[6, 9, 15, 30]}
      />
    </div>
  );
}
