'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SiteSettingsData } from '@/types/cms';

export function LocationHoursSection({
  settings,
}: {
  settings: SiteSettingsData | null;
}) {
  if (!settings) return null;

  return (
    <Section tone="mintSoft" id="visit">
      <SectionHeading
        scriptLabel="Join Us"
        title="Location & Opening Hours"
        description={`Situated near Biratnagar Airport in ${settings.district}. Walk-ins are always welcome at our Coffee House, and evening Restro Garden table reservations are warmly recommended.`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className="mt-12 grid grid-cols-1 overflow-hidden rounded-3xl border border-brand-mint/40 bg-white shadow-elevated lg:grid-cols-12"
      >
        <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-3.5 py-1 text-xs font-semibold text-brand-teal">
            <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
            <span>Open Daily • Coffee House &amp; Restro Garden</span>
          </div>

          <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-semibold text-brand-dark">
            Hours of Service
          </h3>

          <div className="mt-6 divide-y divide-brand-mint/30">
            {settings.openingHours.map((slot) => (
              <div
                key={slot.days}
                className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium text-brand-dark">{slot.days}</p>
                  {slot.note && (
                    <p className="text-xs text-brand-sage mt-0.5">{slot.note}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 font-semibold text-brand-teal text-sm sm:text-base">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{slot.hours}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-brand-bg p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
                  Address
                </p>
                <p className="mt-1 text-sm text-brand-dark">
                  {settings.street}
                  <br />
                  {settings.city}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-brand-teal" />
                <a
                  href={`tel:${settings.phone}`}
                  className="font-medium text-brand-dark hover:text-brand-teal"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-brand-teal" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-brand-dark/80 hover:text-brand-teal truncate"
                >
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              href="/contact"
              variant="outline"
              size="md"
              rightIcon={<ExternalLink className="h-4 w-4" />}
            >
              Contact &amp; Map Details
            </Button>
            <Button href="/reservations" variant="primary" size="md">
              Reserve Your Table
            </Button>
          </div>
        </div>

        <div className="relative min-h-[320px] bg-brand-sage text-white lg:col-span-5">
          <img
            src="https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069461/classico-brew-and-grill/exterior-storefront.jpg"
            alt="Classico Brew & Grill Airport Road Storefront"
            loading="lazy"
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-sage/60 to-brand-sage/30" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
            <div>
              <p className="font-script text-3xl text-brand-mint-light">
                {settings.district}
              </p>
              <h4 className="mt-1 font-heading text-2xl font-semibold text-white">
                {settings.street}
              </h4>
              <p className="mt-2 text-sm text-brand-mint-light/90">
                {settings.city} — Near Biratnagar Airport • Coffee House, Restro Garden &amp; Evening Grill.
              </p>

              <a
                href={settings.mapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-dark shadow-md transition-colors hover:bg-brand-teal hover:text-white"
              >
                <span>Get Directions</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
