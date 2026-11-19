'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Check,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { SiteSettingsData } from '@/types/cms';

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog & Stories', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Footer({ settings }: { settings: SiteSettingsData | null }) {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  if (pathname?.startsWith('/classic-admin') || !settings) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      {/* Top Botanical Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-sage via-brand-teal to-brand-mint" />

      {/* Soft decorative ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-sage/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="h-14 w-14 rounded-full bg-white p-1 shadow-md ring-2 ring-brand-mint/40 transition-transform group-hover:scale-105">
                <img
                  src={settings.logoUrl || '/images/logo.png'}
                  alt={settings.brandName}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-heading text-2xl font-semibold text-white">
                  {settings.shortName}
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand-mint">
                  Brew &amp; Grill
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-brand-mint-light/85 max-w-sm">
              {settings.subTagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-mint/30 bg-white/5 text-brand-mint-light transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-mint/30 bg-white/5 text-brand-mint-light transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {settings.mapsQueryUrl && (
                <a
                  href={settings.mapsQueryUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Google Maps Location"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-mint/30 bg-white/5 text-brand-mint-light transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
                >
                  <MapPin className="h-4 w-4" />
                </a>
              )}
              <a
                href={`mailto:${settings.email}`}
                aria-label={`Email ${settings.brandName}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-mint/30 bg-white/5 text-brand-mint-light transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-lg font-medium text-white">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-brand-mint-light/80">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-brand-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reservations"
                  className="font-medium text-brand-teal transition-colors hover:text-brand-mint-light"
                >
                  Book a Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Location */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-lg font-medium text-white">
              Visit &amp; Hours
            </h3>
            <div className="space-y-3 text-sm text-brand-mint-light/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <span>
                  {settings.street}
                  <br />
                  {settings.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-teal" />
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <div className="space-y-1 text-xs text-brand-mint-light/80">
                  {settings.openingHours.map((slot) => (
                    <p key={slot.days}>
                      <span className="font-medium text-white">{slot.days}:</span>{' '}
                      {slot.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Journal / Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-lg font-medium text-white">
              Seasonal Notes
            </h3>
            <p className="text-sm text-brand-mint-light/80 leading-relaxed">
              Receive updates on evening specials, seasonal garden menus, and live gatherings at Classico Biratnagar.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl border border-brand-mint/30 bg-brand-sage/40 px-4 py-3 text-xs text-brand-mint-light">
                <Check className="h-4 w-4 shrink-0 text-brand-teal" />
                <span>Welcome to the Classico table. We’ll be in touch soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email for newsletter"
                  className="w-full rounded-full border border-brand-mint/30 bg-white/10 px-4 py-2.5 text-xs text-white placeholder:text-brand-mint-light/60 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white transition-colors hover:bg-brand-teal-dark"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-brand-mint-light/65 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.brandName}. Crafted with care.
          </p>
          <p className="font-script text-xl text-brand-mint-light/90">
            Coffee House • Restro Garden • Grill — Biratnagar
          </p>
        </div>
      </div>
    </footer>
  );
}
