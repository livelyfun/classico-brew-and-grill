'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  MessageSquare,
  Pencil,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PaginationControls } from '@/components/admin/PaginationControls';
import { CustomerReview } from '@/types/cms';
import { cn } from '@/lib/utils';

interface ReviewsTabProps {
  reviews: CustomerReview[];
  onMutate: (payload: {
    entity: 'review';
    action: 'create' | 'update' | 'delete' | 'togglePublish' | 'approveReview';
    id?: string;
    data?: Record<string, unknown>;
  }) => Promise<void>;
  busy: boolean;
}

export function ReviewsTab({ reviews, onMutate, busy }: ReviewsTabProps) {
  const [search, setSearch] = useState('');
  const [approvalFilter, setApprovalFilter] = useState<
    'all' | 'pending' | 'approved'
  >('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    authorName: '',
    authorRole: 'Guest Diner',
    rating: 5,
    comment: '',
    approved: true,
    published: true,
  });

  const pendingCount = useMemo(() => {
    return reviews.filter((r) => !r.approved).length;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reviews.filter((r) => {
      const matchApproval =
        approvalFilter === 'all' ||
        (approvalFilter === 'pending' ? !r.approved : r.approved);
      const matchQuery =
        !q ||
        r.authorName.toLowerCase().includes(q) ||
        (r.authorRole && r.authorRole.toLowerCase().includes(q)) ||
        r.comment.toLowerCase().includes(q);
      return matchApproval && matchQuery;
    });
  }, [reviews, search, approvalFilter]);

  const paginatedReviews = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredReviews.slice(start, start + pageSize);
  }, [filteredReviews, page, pageSize]);

  const handleStartCreate = () => {
    setEditingId(null);
    setForm({
      authorName: '',
      authorRole: 'Verified Guest',
      rating: 5,
      comment: '',
      approved: true,
      published: true,
    });
    setIsEditing(true);
  };

  const handleStartEdit = (r: CustomerReview) => {
    setEditingId(r.id);
    setForm({
      authorName: r.authorName,
      authorRole: r.authorRole ?? 'Guest Diner',
      rating: r.rating,
      comment: r.comment,
      approved: r.approved,
      published: r.published,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorName.trim() || !form.comment.trim()) return;

    if (editingId) {
      await onMutate({
        entity: 'review',
        action: 'update',
        id: editingId,
        data: form,
      });
    } else {
      await onMutate({
        entity: 'review',
        action: 'create',
        data: form,
      });
    }
    setIsEditing(false);
    setEditingId(null);
  };

  const handleApprove = async (id: string) => {
    await onMutate({
      entity: 'review',
      action: 'approveReview',
      id,
      data: { approved: true, published: true },
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal">
            <MessageSquare className="h-4 w-4" />
            <span>Community Feedback & Testimonials</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-brand-dark">
            Customer Reviews Moderation
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/70">
            Public user submissions require approval here before appearing on the live website.
          </p>
        </div>

        <Button
          onClick={handleStartCreate}
          variant="primary"
          size="sm"
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Testimonial</span>
        </Button>
      </div>

      {/* Moderation Alert Banner if Pending Submissions exist */}
      {pendingCount > 0 && (
        <div className="flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-900">
                {pendingCount} Review{pendingCount > 1 ? 's' : ''} Awaiting Approval
              </h4>
              <p className="text-xs text-amber-800">
                Guests submitted new reviews on the website. Approve them to display publicly.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setApprovalFilter('pending');
              setPage(1);
            }}
            className="rounded-xl bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
          >
            Review Pending
          </button>
        </div>
      )}

      {/* Editor Modal / Card */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-brand-mint/60 bg-white p-6 shadow-card transition-all space-y-4"
        >
          <div className="flex items-center justify-between border-b border-brand-mint/30 pb-3">
            <h3 className="font-heading text-lg font-semibold text-brand-dark">
              {editingId ? 'Edit Review / Testimonial' : 'Add New Testimonial'}
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
            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Author / Guest Name *
              </label>
              <input
                type="text"
                required
                value={form.authorName}
                onChange={(e) =>
                  setForm({ ...form, authorName: e.target.value })
                }
                placeholder="e.g. Biratnagar Coffee Regular"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Author Role / Context
              </label>
              <input
                type="text"
                value={form.authorRole}
                onChange={(e) =>
                  setForm({ ...form, authorRole: e.target.value })
                }
                placeholder="e.g. Food Critic / Neighborhood Regular"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Star Rating (1 - 5)
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={cn(
                        'h-6 w-6',
                        star <= form.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs font-semibold text-brand-dark ml-2">
                  {form.rating} out of 5
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2">
              <label className="inline-flex items-center gap-2 text-xs font-medium text-brand-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.approved}
                  onChange={(e) =>
                    setForm({ ...form, approved: e.target.checked })
                  }
                  className="rounded border-brand-mint text-brand-teal focus:ring-brand-teal"
                />
                <span className="font-semibold text-emerald-800">
                  Approved by Moderator
                </span>
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-medium text-brand-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                  className="rounded border-brand-mint text-brand-teal focus:ring-brand-teal"
                />
                <span>Published on live website</span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Review Comment *
              </label>
              <textarea
                rows={3}
                required
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Share the guest experience..."
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
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
              {editingId ? 'Save Review' : 'Create Testimonial'}
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
            placeholder="Search reviews by guest name, comment, role..."
            className="w-full rounded-xl border border-brand-mint/35 bg-brand-bg pl-9 pr-3.5 py-1.5 text-xs text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-teal focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={approvalFilter}
            onChange={(e) => {
              setApprovalFilter(
                e.target.value as 'all' | 'pending' | 'approved'
              );
              setPage(1);
            }}
            className="rounded-xl border border-brand-mint/35 bg-brand-bg px-2.5 py-1.5 text-xs text-brand-dark focus:border-brand-teal focus:outline-none"
          >
            <option value="all">All Reviews ({reviews.length})</option>
            <option value="pending">
              Pending Approval ({pendingCount})
            </option>
            <option value="approved">
              Approved ({reviews.length - pendingCount})
            </option>
          </select>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {paginatedReviews.map((r) => (
          <div
            key={r.id}
            className={cn(
              'flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-soft transition-all',
              !r.approved
                ? 'border-amber-400 bg-amber-50/30'
                : r.published
                ? 'border-brand-mint/45 hover:border-brand-teal/40'
                : 'border-gray-200 bg-gray-50/50'
            )}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < r.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200'
                      )}
                    />
                  ))}
                  <span className="text-xs font-bold text-brand-dark ml-1">
                    {r.rating}.0
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {!r.approved ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                      <Clock className="h-3 w-3" />
                      Pending Approval
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                      <ShieldCheck className="h-3 w-3" />
                      Approved
                    </span>
                  )}

                  {r.approved && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                        r.published
                          ? 'bg-brand-teal/15 text-brand-teal'
                          : 'bg-gray-200 text-gray-700'
                      )}
                    >
                      {r.published ? 'Live' : 'Hidden'}
                    </span>
                  )}
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-brand-dark/85 leading-relaxed">
                &ldquo;{r.comment}&rdquo;
              </blockquote>

              <div className="pt-2 border-t border-brand-mint/20 flex items-center justify-between text-xs text-brand-dark/60">
                <div>
                  <span className="font-semibold text-brand-dark">
                    {r.authorName}
                  </span>
                  {r.authorRole && (
                    <span className="ml-1.5 text-brand-sage">
                      • {r.authorRole}
                    </span>
                  )}
                </div>
                <time className="text-[11px] text-brand-dark/45">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}
                </time>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="mt-4 flex flex-wrap items-center justify-between border-t border-brand-mint/25 pt-3">
              {!r.approved ? (
                <button
                  type="button"
                  onClick={() => handleApprove(r.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve & Publish
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onMutate({
                      entity: 'review',
                      action: 'togglePublish',
                      id: r.id,
                      data: { published: !r.published },
                    })
                  }
                  className={cn(
                    'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors',
                    r.published
                      ? 'text-amber-700 hover:bg-amber-50'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  )}
                >
                  {r.published ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      Hide from Live
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      Show on Live
                    </>
                  )}
                </button>
              )}

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStartEdit(r)}
                  className="rounded-lg p-1.5 text-brand-teal hover:bg-brand-teal/10 transition-colors"
                  title="Edit Review"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        `Delete review from "${r.authorName}" permanently?`
                      )
                    ) {
                      onMutate({
                        entity: 'review',
                        action: 'delete',
                        id: r.id,
                      });
                    }
                  }}
                  className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="rounded-2xl border border-dashed border-brand-mint/50 p-12 text-center text-sm text-brand-dark/60">
          No customer reviews found matching your filter criteria.
        </div>
      )}

      {/* Pagination */}
      <PaginationControls
        totalItems={filteredReviews.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[6, 10, 20, 50]}
      />
    </div>
  );
}
