'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Share2,
} from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageSectionData, SiteSettingsData } from '@/types/cms';

export function ContactPageClient({
  pageSection,
  settings,
}: {
  pageSection: PageSectionData<{
    deskTitle?: string;
    deskSubtitle?: string;
    formScript?: string;
    formTitle?: string;
  }> | null;
  settings: SiteSettingsData | null;
}) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!settings) return null;

  return (
    <>
      <PageHero
        scriptLabel={pageSection?.scriptLabel || "We'd Love to Hear From You"}
        title={pageSection?.title || 'Contact & Visit Us'}
        description={
          pageSection?.description ||
          'Reach out to our hospitality desk for private dining or tastings.'
        }
      />

      <Section tone="sageTint">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-brand-mint/35 bg-white p-7 shadow-soft space-y-6"
            >
              <div>
                <h2 className="font-heading text-2xl font-semibold text-brand-dark">
                  {pageSection?.content?.deskTitle || 'Hospitality Desk'}
                </h2>
                <p className="mt-1 text-sm text-brand-dark/70">
                  {pageSection?.content?.deskSubtitle || settings.district}
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/12 text-brand-teal">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-dark">Location</p>
                    <p className="text-brand-dark/75">
                      {settings.street}
                      <br />
                      {settings.district}, {settings.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/12 text-brand-teal">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-dark">Phone</p>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-brand-dark/75 hover:text-brand-teal transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/12 text-brand-teal">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-dark">Email</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-brand-dark/75 hover:text-brand-teal transition-colors"
                    >
                      {settings.email}
                    </a>
                    <p className="mt-0.5 text-xs text-brand-sage">
                      Private Events: {settings.eventsEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-brand-mint/30 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
                  Follow Our Journal
                </p>
                <div className="mt-3 flex gap-3">
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-mint/45 bg-brand-bg px-4 py-2 text-xs font-medium text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    Instagram
                  </a>
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-mint/45 bg-brand-bg px-4 py-2 text-xs font-medium text-brand-dark transition-colors hover:border-brand-teal hover:text-brand-teal"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Facebook
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-3xl border border-brand-mint/35 bg-brand-sage p-7 text-white shadow-soft"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-brand-mint-light" />
                <h2 className="font-heading text-2xl font-semibold">
                  Opening Hours
                </h2>
              </div>

              <div className="mt-5 space-y-3.5 text-sm">
                {settings.openingHours.map((slot) => (
                  <div
                    key={slot.days}
                    className="flex flex-col justify-between border-b border-white/15 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                  >
                    <span className="font-medium text-brand-mint-light">
                      {slot.days}
                    </span>
                    <span className="font-semibold text-white">
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-white/10 p-3.5 text-xs text-brand-mint-light/90">
                <p>• Espresso &amp; Roastery Bar: {settings.roasteryHours}</p>
                <p className="mt-1">
                  • Open-Hearth Grill Kitchen: {settings.grillHours}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="rounded-3xl border border-brand-mint/35 bg-white p-7 shadow-soft sm:p-10"
            >
              <span className="font-script text-3xl text-brand-teal">
                {pageSection?.content?.formScript || 'Send a Note'}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-dark">
                {pageSection?.content?.formTitle || 'Direct Inquiry Form'}
              </h2>
              <p className="mt-2 text-sm text-brand-dark/70">
                For table bookings of 1–12 guests, you can also use our instant{' '}
                <a
                  href="/reservations"
                  className="font-medium text-brand-teal underline underline-offset-4"
                >
                  Reservations page
                </a>
                .
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-brand-mint/45 bg-brand-bg p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-brand-teal" />
                  <h3 className="mt-4 font-heading text-2xl font-semibold text-brand-dark">
                    Thank You, {formState.name}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-brand-dark/75">
                    Your message has been received by our hospitality desk. Expect a warm reply within one business day.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Inquiry',
                          message: '',
                        });
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Clara Bennett"
                        className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-3 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="clara@example.com"
                        className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-3 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        placeholder="+1 (503) 555-0140"
                        className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-3 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                      >
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({ ...formState, subject: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-3 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                      >
                        <option>General Inquiry</option>
                        <option>Private Dining &amp; Events</option>
                        <option>Coffee Wholesale &amp; Cupping</option>
                        <option>Dietary &amp; Menu Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="How can our team help craft your visit?"
                      className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-3 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    leftIcon={<Send className="h-4 w-4" />}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            <div className="overflow-hidden rounded-3xl border border-brand-mint/40 bg-white p-3 shadow-soft">
              <div className="overflow-hidden rounded-2xl">
                <iframe
                  title={`${settings.brandName} Location Map`}
                  src={settings.mapsEmbedUrl}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
