'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  MessageSquare,
  PenSquare,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CustomerReview } from '@/types/cms';
import { cn } from '@/lib/utils';

interface CustomerReviewsSectionProps {
  reviews: CustomerReview[];
}

export function CustomerReviewsSection({
  reviews,
}: CustomerReviewsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: authorName.trim(),
          authorRole: authorRole.trim() || 'Guest Diner',
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review.');
      }

      setSubmitSuccess(true);
      setAuthorName('');
      setAuthorRole('');
      setComment('');
      setRating(5);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-bg py-20 sm:py-24">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-brand-mint/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <span className="font-script text-2xl sm:text-3xl text-brand-teal">
              Guest Reflections &amp; Stories
            </span>
            <h2 className="mt-1 font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark">
              What Our Patrons Say
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-dark/75 leading-relaxed">
              Every cup pulled at our Coffee House and every plate served in our Restro Garden is crafted with genuine hospitality. Read reflections from guests who have visited us in Biratnagar.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              onClick={() => {
                setSubmitSuccess(false);
                setErrorMessage('');
                setModalOpen(true);
              }}
              variant="primary"
              size="md"
              className="gap-2 shadow-md"
            >
              <PenSquare className="h-4 w-4" />
              <span>Write a Review</span>
            </Button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-brand-mint/60 bg-white/70 p-12 text-center text-sm text-brand-dark/60">
              Be the first to share your dining experience at Classico Brew &amp; Grill.
            </div>
          ) : (
            reviews.map((rev, idx) => (
              <motion.div
                key={rev.id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-brand-mint/40 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal hover:shadow-card"
              >
                <div>
                  {/* Rating Stars & Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-200'
                          )}
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-teal">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  </div>

                  {/* Comment */}
                  <blockquote className="mt-4 text-sm text-brand-dark/85 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="mt-6 border-t border-brand-mint/25 pt-4">
                  <p className="font-heading text-sm font-semibold text-brand-dark">
                    {rev.authorName}
                  </p>
                  {rev.authorRole && (
                    <p className="text-xs text-brand-sage font-medium">
                      {rev.authorRole}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl border border-brand-mint/45 bg-white p-6 sm:p-8 shadow-card"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-5 top-5 rounded-full p-2 text-brand-dark/50 hover:bg-brand-bg hover:text-brand-dark transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {submitSuccess ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-brand-dark">
                    Thank You for Your Review!
                  </h3>
                  <p className="mt-2 text-sm text-brand-dark/75 leading-relaxed max-w-sm mx-auto">
                    Your reflection has been safely received. To ensure authenticity, our team reviews all submissions before they appear on the public page.
                  </p>
                  <Button
                    onClick={() => setModalOpen(false)}
                    variant="primary"
                    size="sm"
                    className="mt-6"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="font-script text-xl text-brand-teal">
                      Share Your Story
                    </span>
                    <h3 className="font-heading text-2xl font-semibold text-brand-dark">
                      Leave a Guest Review
                    </h3>
                    <p className="text-xs text-brand-dark/70 mt-1">
                      Tell us about your coffee, food, or Restro Garden experience.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs text-rose-800">
                      {errorMessage}
                    </div>
                  )}

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            className={cn(
                              'h-7 w-7 transition-colors',
                              star <= (hoverRating || rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-200'
                            )}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-xs font-semibold text-brand-dark">
                        {rating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name and Role */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Maya Shrestha"
                        className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-1">
                        Role or Context
                      </label>
                      <input
                        type="text"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        placeholder="e.g. Weekend Brunch / Coffee Lover"
                        className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage mb-1">
                      Your Experience *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What did you enjoy most about our food, coffee, atmosphere, or hospitality?"
                      className="w-full rounded-xl border border-brand-mint/45 bg-brand-bg px-3.5 py-2 text-sm text-brand-dark focus:border-brand-teal focus:outline-none"
                    />
                  </div>

                  <p className="text-[11px] text-brand-dark/60 leading-normal">
                    <ShieldCheck className="inline h-3.5 w-3.5 text-brand-teal mr-1 align-text-bottom" />
                    To prevent spam and maintain genuine reviews, submissions will be displayed publicly following quick verification by our team.
                  </p>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? 'Submitting...' : 'Post Review'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
