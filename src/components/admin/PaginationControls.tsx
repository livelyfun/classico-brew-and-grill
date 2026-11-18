'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationControlsProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export function PaginationControls({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [6, 10, 15, 25],
}: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(totalItems, safePage * pageSize);

  if (totalItems === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex flex-col justify-between gap-3 rounded-2xl border border-brand-mint/35 bg-white px-4 py-3 text-xs shadow-sm sm:flex-row sm:items-center">
      <div className="flex items-center gap-3 text-brand-dark/75">
        <span>
          Showing <strong className="text-brand-dark">{start}</strong>–
          <strong className="text-brand-dark">{end}</strong> of{' '}
          <strong className="text-brand-dark">{totalItems}</strong>
        </span>

        <label className="flex items-center gap-1.5">
          <span className="text-brand-sage">Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="rounded-lg border border-brand-mint/45 bg-brand-bg px-2 py-1 text-xs font-medium text-brand-dark focus:border-brand-teal focus:outline-none"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          aria-label="Previous page"
          className="inline-flex items-center gap-1 rounded-full border border-brand-mint/45 px-3 py-1.5 font-medium text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={cn(
                'h-7 min-w-[1.75rem] rounded-full px-2 font-semibold transition-all',
                p === safePage
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'text-brand-dark/75 hover:bg-brand-bg hover:text-brand-teal'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          aria-label="Next page"
          className="inline-flex items-center gap-1 rounded-full border border-brand-mint/45 px-3 py-1.5 font-medium text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal disabled:opacity-40 disabled:pointer-events-none"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
