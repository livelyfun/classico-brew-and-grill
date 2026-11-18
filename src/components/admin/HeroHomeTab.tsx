'use client';

import React, { useEffect, useState } from 'react';
import {
  Coffee,
  Eye,
  EyeOff,
  Flame,
  Home,
  Leaf,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CloudinaryImageInput } from '@/components/admin/CloudinaryImageInput';
import {
  CraftPillar,
  HeroContentData,
  SignatureSplitItem,
} from '@/types/cms';
import { cn } from '@/lib/utils';

interface HeroHomeTabProps {
  hero: HeroContentData | null;
  onSave: (updatedHero: HeroContentData) => Promise<void>;
  busy: boolean;
}

const inputClass =
  'mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-dark/40 transition-colors focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/15';

const labelClass = 'block text-sm font-medium text-brand-dark';
const hintClass = 'mt-1 text-xs text-brand-dark/55';

export function HeroHomeTab({ hero, onSave, busy }: HeroHomeTabProps) {
  const [form, setForm] = useState<HeroContentData | null>(hero);

  useEffect(() => {
    setForm(hero);
  }, [hero]);

  if (!form) {
    return (
      <div className="rounded-3xl border border-brand-mint/40 bg-white p-10 text-center text-sm text-brand-dark/70">
        Homepage settings could not be loaded. Try refreshing the page.
      </div>
    );
  }

  const updatePillar = (index: number, patch: Partial<CraftPillar>) => {
    const next = [...form.pillars];
    next[index] = { ...next[index], ...patch };
    setForm({ ...form, pillars: next });
  };

  const addPillar = () => {
    setForm({
      ...form,
      pillars: [
        ...form.pillars,
        { label: 'New Feature', sublabel: 'Short detail', iconName: 'Coffee' },
      ],
    });
  };

  const removePillar = (index: number) => {
    setForm({
      ...form,
      pillars: form.pillars.filter((_, i) => i !== index),
    });
  };

  const updateSplitItem = (
    index: number,
    patch: Partial<SignatureSplitItem>
  ) => {
    const nextItems = [...form.signatureSplit.items];
    nextItems[index] = { ...nextItems[index], ...patch };
    setForm({
      ...form,
      signatureSplit: { ...form.signatureSplit, items: nextItems },
    });
  };

  const updateSplitHighlight = (
    itemIdx: number,
    hlIdx: number,
    value: string
  ) => {
    const item = form.signatureSplit.items[itemIdx];
    const nextHighlights = [...item.highlights];
    nextHighlights[hlIdx] = value;
    updateSplitItem(itemIdx, { highlights: nextHighlights });
  };

  const addSplitHighlight = (itemIdx: number) => {
    const item = form.signatureSplit.items[itemIdx];
    updateSplitItem(itemIdx, {
      highlights: [...item.highlights, ''],
    });
  };

  const removeSplitHighlight = (itemIdx: number, hlIdx: number) => {
    const item = form.signatureSplit.items[itemIdx];
    updateSplitItem(itemIdx, {
      highlights: item.highlights.filter((_, i) => i !== hlIdx),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Sticky/Top Action Strip */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-brand-mint/45 bg-white p-5 shadow-soft sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-teal">
            <Home className="h-3.5 w-3.5" />
            <span>Homepage Designer</span>
          </div>
          <h2 className="mt-0.5 font-heading text-xl font-semibold text-brand-dark">
            Edit Your Welcome Banner &amp; Front Page Story
          </h2>
          <p className="text-xs text-brand-dark/65">
            Update headlines, welcome photos, and reservation banners shown on your website&apos;s front page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, published: !form.published })}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors',
              form.published
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            )}
          >
            {form.published ? (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>Visible on Live Site</span>
              </>
            ) : (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                <span>Hidden (Draft)</span>
              </>
            )}
          </button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={busy}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {busy ? 'Saving...' : 'Save Homepage Changes'}
          </Button>
        </div>
      </div>

      {/* SECTION 1: MAIN WELCOME BANNER */}
      <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-6">
        <div className="border-b border-brand-mint/25 pb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
            <Sparkles className="h-3 w-3" />
            Step 1
          </span>
          <h3 className="mt-2 font-heading text-2xl font-semibold text-brand-dark">
            Main Welcome Section (Top of Page)
          </h3>
          <p className="text-xs text-brand-dark/65">
            This is the very first thing guests see when visiting your website.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Small Top Tag</label>
            <input
              type="text"
              value={form.badgeText}
              onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
              placeholder="e.g. Botanical Roastery & Wood-Fired Kitchen"
              className={inputClass}
            />
            <p className={hintClass}>Appears in a small pill above the main headline.</p>
          </div>

          <div>
            <label className={labelClass}>Cursive Script Greeting</label>
            <input
              type="text"
              value={form.scriptAccent}
              onChange={(e) =>
                setForm({ ...form, scriptAccent: e.target.value })
              }
              placeholder="e.g. Crafted with Calm & Ember"
              className={inputClass}
            />
            <p className={hintClass}>Displayed in elegant handwritten style.</p>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Big Welcome Headline</label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              placeholder="e.g. Where Artisanal Roasts Meet the Open Flame"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Welcome Paragraph</label>
            <textarea
              rows={3}
              value={form.subheadline}
              onChange={(e) =>
                setForm({ ...form, subheadline: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Main Button Text</label>
            <input
              type="text"
              value={form.primaryCtaLabel}
              onChange={(e) =>
                setForm({ ...form, primaryCtaLabel: e.target.value })
              }
              placeholder="e.g. Book a Table"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Main Button Opens Page</label>
            <input
              type="text"
              value={form.primaryCtaHref}
              onChange={(e) =>
                setForm({ ...form, primaryCtaHref: e.target.value })
              }
              placeholder="/reservations"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Second Button Text</label>
            <input
              type="text"
              value={form.secondaryCtaLabel}
              onChange={(e) =>
                setForm({ ...form, secondaryCtaLabel: e.target.value })
              }
              placeholder="e.g. Explore Our Menu"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Second Button Opens Page</label>
            <input
              type="text"
              value={form.secondaryCtaHref}
              onChange={(e) =>
                setForm({ ...form, secondaryCtaHref: e.target.value })
              }
              placeholder="/menu"
              className={inputClass}
            />
          </div>
        </div>

        <div className="border-t border-brand-mint/25 pt-5">
          <CloudinaryImageInput
            label="Main Welcome Photo"
            helperText="Displayed on the right side of the welcome banner (for example, your signature latte cup)."
            value={form.heroImageUrl}
            onChange={(url) => setForm({ ...form, heroImageUrl: url })}
          />
        </div>

        {/* Floating Highlight Badges on Photo */}
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-mint/35 bg-brand-bg/50 p-4 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
              Photo Callout Badge 1
            </p>
            <div>
              <label className="block text-xs font-medium text-brand-dark">
                Title
              </label>
              <input
                type="text"
                value={form.floatingCard1Title}
                onChange={(e) =>
                  setForm({ ...form, floatingCard1Title: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-dark">
                Subtitle
              </label>
              <input
                type="text"
                value={form.floatingCard1Subtitle}
                onChange={(e) =>
                  setForm({ ...form, floatingCard1Subtitle: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
              Photo Callout Badge 2
            </p>
            <div>
              <label className="block text-xs font-medium text-brand-dark">
                Title
              </label>
              <input
                type="text"
                value={form.floatingCard2Title}
                onChange={(e) =>
                  setForm({ ...form, floatingCard2Title: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brand-dark">
                Subtitle
              </label>
              <input
                type="text"
                value={form.floatingCard2Subtitle}
                onChange={(e) =>
                  setForm({ ...form, floatingCard2Subtitle: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Highlight Pillars */}
        <div className="space-y-3 border-t border-brand-mint/25 pt-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-brand-dark">
                Quick Highlights Row (Under Buttons)
              </h4>
              <p className="text-xs text-brand-dark/60">
                Up to 3 short facts like Roastery hours, Grill style, and Neighborhood.
              </p>
            </div>
            <button
              type="button"
              onClick={addPillar}
              className="inline-flex items-center gap-1 rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Highlight
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {form.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-brand-mint/40 bg-brand-bg/40 p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-sage">
                    Highlight #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePillar(idx)}
                    className="rounded-lg p-1 text-red-500 hover:bg-red-50"
                    title="Remove highlight"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark">
                    Icon
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-1.5">
                    {(
                      [
                        { name: 'Coffee', Icon: Coffee, label: 'Coffee' },
                        { name: 'Flame', Icon: Flame, label: 'Fire' },
                        { name: 'Leaf', Icon: Leaf, label: 'Leaf' },
                      ] as const
                    ).map(({ name, Icon, label }) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => updatePillar(idx, { iconName: name })}
                        className={cn(
                          'flex items-center justify-center gap-1 rounded-lg border py-1.5 text-[11px] font-medium transition-colors',
                          pillar.iconName === name
                            ? 'border-brand-teal bg-brand-teal text-white'
                            : 'border-brand-mint/40 bg-white text-brand-dark hover:border-brand-teal'
                        )}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark">
                    Title
                  </label>
                  <input
                    type="text"
                    value={pillar.label}
                    onChange={(e) =>
                      updatePillar(idx, { label: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-dark">
                    Short Detail
                  </label>
                  <input
                    type="text"
                    value={pillar.sublabel}
                    onChange={(e) =>
                      updatePillar(idx, { sublabel: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: SIGNATURE SPLIT (MORNING BREWS & EVENING GRILL) */}
      <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-6">
        <div className="border-b border-brand-mint/25 pb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-sage/12 px-3 py-1 text-xs font-semibold text-brand-sage">
            Step 2
          </span>
          <h3 className="mt-2 font-heading text-2xl font-semibold text-brand-dark">
            Two Feature Cards (Morning Brews &amp; Evening Grill)
          </h3>
          <p className="text-xs text-brand-dark/65">
            Showcase the two sides of your kitchen and café right below the welcome section.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Section Cursive Subtitle</label>
            <input
              type="text"
              value={form.signatureSplit.scriptLabel}
              onChange={(e) =>
                setForm({
                  ...form,
                  signatureSplit: {
                    ...form.signatureSplit,
                    scriptLabel: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Section Title</label>
            <input
              type="text"
              value={form.signatureSplit.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  signatureSplit: {
                    ...form.signatureSplit,
                    title: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Section Description</label>
            <textarea
              rows={2}
              value={form.signatureSplit.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  signatureSplit: {
                    ...form.signatureSplit,
                    description: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {form.signatureSplit.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="rounded-2xl border border-brand-mint/45 bg-brand-bg/35 p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-mint/25 pb-2.5">
                <span className="font-heading text-lg font-semibold text-brand-dark">
                  Feature Card {idx + 1}: {item.title || 'Untitled'}
                </span>
                <select
                  value={item.accentColor}
                  onChange={(e) =>
                    updateSplitItem(idx, {
                      accentColor: e.target.value as 'teal' | 'sage',
                    })
                  }
                  className="rounded-lg border border-brand-mint/45 bg-white px-2.5 py-1 text-xs font-medium text-brand-dark"
                >
                  <option value="teal">Teal Accent</option>
                  <option value="sage">Sage Green Accent</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-brand-dark">
                    Small Cursive Label
                  </label>
                  <input
                    type="text"
                    value={item.script}
                    onChange={(e) =>
                      updateSplitItem(idx, { script: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-dark">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateSplitItem(idx, { title: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-dark">
                  Card Subtitle
                </label>
                <input
                  type="text"
                  value={item.subtitle}
                  onChange={(e) =>
                    updateSplitItem(idx, { subtitle: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-dark">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) =>
                    updateSplitItem(idx, { description: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <CloudinaryImageInput
                label="Feature Card Photo"
                value={item.imageUrl}
                onChange={(url) => updateSplitItem(idx, { imageUrl: url })}
              />

              {/* Bullet Points */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-brand-dark">
                    Key Highlights (Bullet List)
                  </label>
                  <button
                    type="button"
                    onClick={() => addSplitHighlight(idx)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-teal hover:underline"
                  >
                    <Plus className="h-3 w-3" /> Add Bullet
                  </button>
                </div>
                {item.highlights.map((hl, hlIdx) => (
                  <div key={hlIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={hl}
                      onChange={(e) =>
                        updateSplitHighlight(idx, hlIdx, e.target.value)
                      }
                      placeholder={`Highlight #${hlIdx + 1}`}
                      className="flex-1 rounded-xl border border-brand-mint/45 bg-white px-3 py-2 text-xs text-brand-dark focus:border-brand-teal focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeSplitHighlight(idx, hlIdx)}
                      className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                      title="Remove bullet"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-brand-dark">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={item.ctaLabel}
                    onChange={(e) =>
                      updateSplitItem(idx, { ctaLabel: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-dark">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={item.ctaHref}
                    onChange={(e) =>
                      updateSplitItem(idx, { ctaHref: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: BOTTOM CALL-TO-ACTION BANNER */}
      <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
        <div className="border-b border-brand-mint/25 pb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
            Step 3
          </span>
          <h3 className="mt-2 font-heading text-2xl font-semibold text-brand-dark">
            Bottom Booking Invitation Banner
          </h3>
          <p className="text-xs text-brand-dark/65">
            Shown at the bottom of the homepage to encourage table reservations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Top Small Badge</label>
            <input
              type="text"
              value={form.ctaBanner.badgeText}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: { ...form.ctaBanner, badgeText: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cursive Accent Text</label>
            <input
              type="text"
              value={form.ctaBanner.scriptAccent}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: { ...form.ctaBanner, scriptAccent: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Banner Headline</label>
            <input
              type="text"
              value={form.ctaBanner.headline}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: { ...form.ctaBanner, headline: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Banner Description</label>
            <textarea
              rows={2}
              value={form.ctaBanner.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: { ...form.ctaBanner, description: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Main Button Text</label>
            <input
              type="text"
              value={form.ctaBanner.primaryCtaLabel}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: {
                    ...form.ctaBanner,
                    primaryCtaLabel: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Main Button Page Link</label>
            <input
              type="text"
              value={form.ctaBanner.primaryCtaHref}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: {
                    ...form.ctaBanner,
                    primaryCtaHref: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Second Button Text</label>
            <input
              type="text"
              value={form.ctaBanner.secondaryCtaLabel}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: {
                    ...form.ctaBanner,
                    secondaryCtaLabel: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Second Button Page Link</label>
            <input
              type="text"
              value={form.ctaBanner.secondaryCtaHref}
              onChange={(e) =>
                setForm({
                  ...form,
                  ctaBanner: {
                    ...form.ctaBanner,
                    secondaryCtaHref: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-brand-mint/25 pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={busy}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {busy ? 'Saving Homepage...' : 'Save All Homepage Changes'}
          </Button>
        </div>
      </div>
    </form>
  );
}
