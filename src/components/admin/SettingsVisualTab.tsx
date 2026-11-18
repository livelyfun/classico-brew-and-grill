'use client';

import React, { useEffect, useState } from 'react';
import {
  Clock,
  Globe,
  MapPin,
  Plus,
  Save,
  Settings,
  Store,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CloudinaryImageInput } from '@/components/admin/CloudinaryImageInput';
import { OpeningHour, SiteSettingsData } from '@/types/cms';

interface SettingsVisualTabProps {
  settings: SiteSettingsData | null;
  onSave: (updated: SiteSettingsData) => Promise<void>;
  busy: boolean;
}

const inputClass =
  'mt-1 w-full rounded-xl border border-brand-mint/50 bg-brand-bg/40 px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-dark/40 transition-colors focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/15';

const labelClass = 'block text-sm font-medium text-brand-dark';

export function SettingsVisualTab({
  settings,
  onSave,
  busy,
}: SettingsVisualTabProps) {
  const [form, setForm] = useState<SiteSettingsData | null>(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  if (!form) {
    return (
      <div className="rounded-3xl border border-brand-mint/40 bg-white p-10 text-center text-sm text-brand-dark/70">
        Restaurant details could not be loaded.
      </div>
    );
  }

  const updateHourRow = (idx: number, patch: Partial<OpeningHour>) => {
    const next = [...form.openingHours];
    next[idx] = { ...next[idx], ...patch };
    setForm({ ...form, openingHours: next });
  };

  const addHourRow = () => {
    setForm({
      ...form,
      openingHours: [
        ...form.openingHours,
        { days: 'Monday – Friday', hours: '8:00 AM – 10:00 PM', note: '' },
      ],
    });
  };

  const removeHourRow = (idx: number) => {
    setForm({
      ...form,
      openingHours: form.openingHours.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Save Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-brand-mint/45 bg-white p-5 shadow-soft sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-teal">
            <Settings className="h-3.5 w-3.5" />
            <span>Restaurant Profile</span>
          </div>
          <h2 className="mt-0.5 font-heading text-xl font-semibold text-brand-dark">
            Restaurant Info, Opening Hours &amp; Contact Links
          </h2>
          <p className="text-xs text-brand-dark/65">
            Changes here update your website header, footer, and contact page automatically.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={busy}
          leftIcon={<Save className="h-4 w-4" />}
        >
          {busy ? 'Saving Info...' : 'Save Restaurant Info'}
        </Button>
      </div>

      {/* 1. BRAND IDENTITY & LOGO */}
      <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-brand-mint/25 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal/12 text-brand-teal">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-brand-dark">
              1. Brand Identity &amp; Logo
            </h3>
            <p className="text-xs text-brand-dark/60">
              Your restaurant name, logo, and welcome tagline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Full Restaurant Name</label>
            <input
              type="text"
              value={form.brandName}
              onChange={(e) => setForm({ ...form, brandName: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Short Display Name</label>
            <input
              type="text"
              value={form.shortName}
              onChange={(e) => setForm({ ...form, shortName: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Main Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Short Description / Sub-Tagline</label>
            <textarea
              rows={2}
              value={form.subTagline}
              onChange={(e) => setForm({ ...form, subTagline: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <CloudinaryImageInput
          label="Restaurant Logo Photo"
          value={form.logoUrl}
          onChange={(url) => setForm({ ...form, logoUrl: url })}
        />
      </div>

      {/* 2. CONTACT DETAILS & ADDRESS */}
      <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-brand-mint/25 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-sage/12 text-brand-sage">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-brand-dark">
              2. Contact Details &amp; Location
            </h3>
            <p className="text-xs text-brand-dark/60">
              How guests call, email, and find your dining room on Google Maps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>General Contact Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Private Events Email</label>
            <input
              type="email"
              value={form.eventsEmail}
              onChange={(e) =>
                setForm({ ...form, eventsEmail: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Street Address</label>
            <input
              type="text"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Neighborhood / District</label>
            <input
              type="text"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>City &amp; Postal Code</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-3">
            <label className={labelClass}>Full Formatted Address</label>
            <input
              type="text"
              value={form.fullAddress}
              onChange={(e) =>
                setForm({ ...form, fullAddress: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-3">
            <label className={labelClass}>Google Maps Directions Link</label>
            <input
              type="text"
              value={form.mapsQueryUrl}
              onChange={(e) =>
                setForm({ ...form, mapsQueryUrl: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-3">
            <label className={labelClass}>Google Maps Embed URL</label>
            <input
              type="text"
              value={form.mapsEmbedUrl}
              onChange={(e) =>
                setForm({ ...form, mapsEmbedUrl: e.target.value })
              }
              className={inputClass}
            />
            <p className="mt-1 text-xs text-brand-dark/55">
              Used to display the interactive map on your Visit Us / Contact page.
            </p>
          </div>
        </div>
      </div>

      {/* 3. OPENING HOURS SCHEDULE */}
      <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
        <div className="flex flex-col justify-between gap-3 border-b border-brand-mint/25 pb-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal/12 text-brand-teal">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-brand-dark">
                3. Opening Hours Schedule
              </h3>
              <p className="text-xs text-brand-dark/60">
                Add or update your weekly café and dinner service hours.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addHourRow}
            className="inline-flex items-center gap-1 self-start rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3.5 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal hover:text-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add Hours Row
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Morning Roastery Summary</label>
            <input
              type="text"
              value={form.roasteryHours}
              onChange={(e) =>
                setForm({ ...form, roasteryHours: e.target.value })
              }
              placeholder="e.g. Daily 7:30 AM – 3:00 PM"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Evening Grill Summary</label>
            <input
              type="text"
              value={form.grillHours}
              onChange={(e) => setForm({ ...form, grillHours: e.target.value })}
              placeholder="e.g. Daily 11:30 AM – 10:30 PM"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage">
            Weekly Opening Hours Table
          </label>
          {form.openingHours.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-3 rounded-2xl border border-brand-mint/40 bg-brand-bg/40 p-4 sm:grid-cols-12 sm:items-end"
            >
              <div className="sm:col-span-4">
                <label className="block text-xs font-medium text-brand-dark">
                  Days of Week
                </label>
                <input
                  type="text"
                  value={row.days}
                  onChange={(e) => updateHourRow(idx, { days: e.target.value })}
                  placeholder="e.g. Mon – Thu"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-4">
                <label className="block text-xs font-medium text-brand-dark">
                  Open Hours
                </label>
                <input
                  type="text"
                  value={row.hours}
                  onChange={(e) => updateHourRow(idx, { hours: e.target.value })}
                  placeholder="e.g. 7:30 AM – 10:00 PM"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-brand-dark">
                  Note (Optional)
                </label>
                <input
                  type="text"
                  value={row.note ?? ''}
                  onChange={(e) => updateHourRow(idx, { note: e.target.value })}
                  placeholder="e.g. All-day dining"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeHourRow(idx)}
                  className="rounded-xl border border-red-200 bg-white p-2.5 text-red-600 hover:bg-red-50"
                  title="Remove row"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SOCIAL MEDIA PROFILES */}
      <div className="rounded-3xl border border-brand-mint/45 bg-white p-6 shadow-soft sm:p-8 space-y-5">
        <div className="flex items-center gap-2.5 border-b border-brand-mint/25 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-sage/12 text-brand-sage">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-brand-dark">
              4. Social Media Links
            </h3>
            <p className="text-xs text-brand-dark/60">
              Links to your official Instagram, Facebook, and TripAdvisor pages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              type="text"
              value={form.instagramUrl}
              onChange={(e) =>
                setForm({ ...form, instagramUrl: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input
              type="text"
              value={form.facebookUrl}
              onChange={(e) =>
                setForm({ ...form, facebookUrl: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>TripAdvisor URL</label>
            <input
              type="text"
              value={form.tripadvisorUrl}
              onChange={(e) =>
                setForm({ ...form, tripadvisorUrl: e.target.value })
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
            {busy ? 'Saving Info...' : 'Save All Restaurant Info'}
          </Button>
        </div>
      </div>
    </form>
  );
}
