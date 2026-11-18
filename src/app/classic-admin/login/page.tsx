'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  LogIn,
  MessageSquareHeart,
  ShieldCheck,
  User,
  UtensilsCrossed,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const highlights = [
  {
    icon: UtensilsCrossed,
    title: 'Menu & Prices',
    desc: 'Add dishes, adjust prices, or hide seasonal specials in one click.',
  },
  {
    icon: CalendarCheck,
    title: 'Table Bookings',
    desc: 'See upcoming reservations, guest counts, and special occasions.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Guest Reviews',
    desc: 'Read new feedback and approve reviews before they go live.',
  },
  {
    icon: ImageIcon,
    title: 'Photos & Hours',
    desc: 'Upload fresh food photos and update holiday opening hours easily.',
  },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(
          data.error ||
            'The username or password you entered did not match. Please check and try again.'
        );
        setLoading(false);
        return;
      }

      const currentPath = window.location.pathname;
      const baseAdminPath =
        currentPath.replace(/\/login\/?$/, '') || '/classic-admin';
      router.push(baseAdminPath);
      router.refresh();
    } catch {
      setError(
        'Could not connect right now. Please check your internet connection and try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg lg:grid lg:grid-cols-12">
      {/* Left Brand & Hospitality Panel */}
      <aside className="relative flex flex-col justify-between overflow-hidden bg-brand-dark px-6 py-10 text-white sm:px-10 lg:col-span-5 lg:px-12 lg:py-14 xl:col-span-5">
        {/* Soft botanical ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-sage/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl"
        />

        <div className="relative z-10 space-y-8">
          {/* Top Brand Header */}
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-white p-1 shadow-md ring-2 ring-brand-mint/40 transition-transform group-hover:scale-105">
                <img
                  src="/images/logo.png"
                  alt="Classico Brew & Grill Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xl font-semibold tracking-tight text-white">
                  Classico
                </span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-mint-light">
                  Brew &amp; Grill
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-brand-mint-light transition-colors hover:bg-white/15 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>

          {/* Main Welcome Message */}
          <div className="pt-2 lg:pt-6">
            <span className="font-script text-2xl sm:text-3xl text-brand-mint">
              Hospitality Back Office
            </span>
            <h1 className="mt-1 font-heading text-3xl sm:text-4xl font-semibold leading-tight text-white">
              Staff &amp; Manager Workspace
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-brand-mint-light/85">
              Everything you need to keep your restaurant website fresh, warm, and
              accurate — designed for everyday use without any technical setup.
            </p>
          </div>

          {/* Simple Feature Summary */}
          <div className="hidden grid-cols-1 gap-4 pt-2 sm:grid sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-teal/20 text-brand-mint-light">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-0.5 text-xs leading-relaxed text-brand-mint-light/75">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-10 hidden items-center gap-2 border-t border-white/10 pt-5 text-xs text-brand-mint-light/70 lg:flex">
          <Clock className="h-3.5 w-3.5 text-brand-teal" />
          <span>Updates saved here appear immediately on your live website.</span>
        </div>
      </aside>

      {/* Right Sign-In Form Panel */}
      <main className="flex items-center justify-center px-4 py-12 sm:px-8 lg:col-span-7 lg:py-16">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-brand-mint/45 bg-white p-7 shadow-elevated sm:p-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Private Manager Access</span>
              </div>
              <h2 className="font-heading text-3xl font-semibold text-brand-dark">
                Welcome Back
              </h2>
              <p className="text-sm leading-relaxed text-brand-dark/70">
                Sign in with your staff username and password to manage your
                restaurant website.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-sm font-medium text-brand-dark"
                >
                  Staff Username
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-sage" />
                  <input
                    id="admin-username"
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full rounded-xl border border-brand-mint/55 bg-brand-bg/40 py-3 pl-10 pr-4 text-sm text-brand-dark placeholder:text-brand-dark/40 transition-colors focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/15"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-brand-dark"
                >
                  Password
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-sage" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-brand-mint/55 bg-brand-bg/40 py-3 pl-10 pr-12 text-sm text-brand-dark placeholder:text-brand-dark/40 transition-colors focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-brand-sage transition-colors hover:bg-brand-bg hover:text-brand-dark focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-brand-dark/55">
                  Tip: Click the eye icon to double-check your password for typos.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                leftIcon={<LogIn className="h-4 w-4" />}
              >
                {loading ? 'Signing You In...' : 'Sign In to Workspace'}
              </Button>
            </form>

            <div className="mt-6 border-t border-brand-mint/30 pt-5 text-center">
              <p className="text-xs text-brand-dark/60">
                Forgot your staff login details? Please ask your restaurant manager
                to reset your credentials.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
