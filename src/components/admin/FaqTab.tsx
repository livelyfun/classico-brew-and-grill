'use client';

import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  HelpCircle,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PaginationControls } from '@/components/admin/PaginationControls';
import { FaqItem } from '@/types/cms';
import { cn } from '@/lib/utils';

interface FaqTabProps {
  faqs: FaqItem[];
  onMutate: (payload: {
    entity: 'faq';
    action: 'create' | 'update' | 'delete' | 'togglePublish';
    id?: string;
    data?: Record<string, unknown>;
  }) => Promise<void>;
  busy: boolean;
}

export function FaqTab({ faqs, onMutate, busy }: FaqTabProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'Reservations & Seating',
    sortOrder: 0,
    published: true,
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchCat = categoryFilter === 'all' || f.category === categoryFilter;
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' ? f.published : !f.published);
      const matchQuery =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      return matchCat && matchStatus && matchQuery;
    });
  }, [faqs, search, categoryFilter, statusFilter]);

  const paginatedFaqs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredFaqs.slice(start, start + pageSize);
  }, [filteredFaqs, page, pageSize]);

  const handleStartCreate = () => {
    setEditingId(null);
    setForm({
      question: '',
      answer: '',
      category: categories[0] || 'Reservations & Seating',
      sortOrder: faqs.length + 1,
      published: true,
    });
    setIsEditing(true);
  };

  const handleStartEdit = (f: FaqItem) => {
    setEditingId(f.id);
    setForm({
      question: f.question,
      answer: f.answer,
      category: f.category,
      sortOrder: f.sortOrder,
      published: f.published,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) return;

    if (editingId) {
      await onMutate({
        entity: 'faq',
        action: 'update',
        id: editingId,
        data: form,
      });
    } else {
      await onMutate({
        entity: 'faq',
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
            <HelpCircle className="h-4 w-4" />
            <span>Knowledge Base & Support</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-brand-dark">
            Manage Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-brand-dark/70">
            Keep guest inquiries answered on location, opening hours, dining, coffee house, and reservations.
          </p>
        </div>

        <Button
          onClick={handleStartCreate}
          variant="primary"
          size="sm"
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New FAQ Question</span>
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
              {editingId ? 'Edit FAQ Item' : 'Create New FAQ Item'}
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
                Question *
              </label>
              <input
                type="text"
                required
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="e.g. Do I need a reservation to visit Classico?"
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Category
              </label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Reservations & Seating"
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
              <label className="block text-xs font-semibold uppercase text-brand-sage mb-1">
                Answer *
              </label>
              <textarea
                rows={4}
                required
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="Provide a clear, helpful response for guests..."
                className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
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
                <span>Published immediately on FAQ page</span>
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
              {editingId ? 'Save Changes' : 'Create FAQ Item'}
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
            placeholder="Search FAQs by question or answer keywords..."
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

      {/* FAQ Cards */}
      <div className="space-y-3">
        {paginatedFaqs.map((faq) => (
          <div
            key={faq.id}
            className={cn(
              'rounded-2xl border bg-white p-5 shadow-soft transition-all',
              faq.published
                ? 'border-brand-mint/40 hover:border-brand-teal/40'
                : 'border-amber-300/60 bg-amber-50/20'
            )}
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-sage/12 px-2.5 py-0.5 text-[11px] font-semibold text-brand-sage">
                    {faq.category}
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      faq.published
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    )}
                  >
                    {faq.published ? (
                      <>
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        Published
                      </>
                    ) : (
                      'Draft'
                    )}
                  </span>
                  <span className="text-[10px] text-brand-dark/40 font-mono">
                    Order: {faq.sortOrder}
                  </span>
                </div>

                <h3 className="font-heading text-base font-semibold text-brand-dark">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-brand-dark/75 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() =>
                    onMutate({
                      entity: 'faq',
                      action: 'togglePublish',
                      id: faq.id,
                      data: { published: !faq.published },
                    })
                  }
                  className={cn(
                    'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors',
                    faq.published
                      ? 'text-amber-700 hover:bg-amber-50'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  )}
                >
                  {faq.published ? (
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

                <button
                  type="button"
                  onClick={() => handleStartEdit(faq)}
                  className="rounded-lg p-1.5 text-brand-teal hover:bg-brand-teal/10 transition-colors"
                  title="Edit FAQ"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete FAQ question "${faq.question}"?`)) {
                      onMutate({
                        entity: 'faq',
                        action: 'delete',
                        id: faq.id,
                      });
                    }
                  }}
                  className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-brand-mint/50 p-12 text-center text-sm text-brand-dark/60">
          No FAQ items found matching your filter criteria.
        </div>
      )}

      {/* Pagination */}
      <PaginationControls
        totalItems={filteredFaqs.length}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[6, 10, 20, 50]}
      />
    </div>
  );
}
