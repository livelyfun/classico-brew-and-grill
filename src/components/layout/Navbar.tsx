'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Clock, Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SiteSettingsData } from '@/types/cms';
import { cn } from '@/lib/utils';

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar({ settings }: { settings: SiteSettingsData | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollYRef = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const isHoveringNavRef = useRef(false);
  const mobileOpenRef = useRef(false);
  const hiddenRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleIdleHide = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!isHoveringNavRef.current && !mobileOpenRef.current) {
        setHidden(true);
      }
    }, 4000);
  }, []);

  const wakeNavbar = useCallback(() => {
    setHidden(false);
    scheduleIdleHide();
  }, [scheduleIdleHide]);

  useEffect(() => {
    hiddenRef.current = hidden;
  }, [hidden]);

  useEffect(() => {
    if (pathname?.startsWith('/classic-admin')) {
      document.documentElement.style.setProperty('--navbar-offset', '0px');
      return;
    }

    const syncOffset = () => {
      const isHidden = hidden && !mobileOpen;
      const offset = isHidden
        ? 0
        : headerRef.current?.offsetHeight ?? (scrolled ? 69 : 76);

      document.documentElement.style.setProperty(
        '--navbar-offset',
        `${offset}px`
      );
      window.dispatchEvent(
        new CustomEvent('classico:navbar-offset', {
          detail: { offset, hidden: isHidden },
        })
      );
    };

    syncOffset();
    window.addEventListener('resize', syncOffset);
    return () => window.removeEventListener('resize', syncOffset);
  }, [hidden, mobileOpen, scrolled, pathname]);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
    if (mobileOpen) {
      setHidden(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    } else {
      scheduleIdleHide();
    }
  }, [mobileOpen, scheduleIdleHide]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setScrolled(window.scrollY > 18);
    scheduleIdleHide();

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 18);
      const delta = currentY - lastScrollYRef.current;

      if (delta > 6 && currentY > 36 && !mobileOpenRef.current) {
        setHidden(true);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      } else if (delta < -6 || (currentY <= 18 && delta < 0)) {
        wakeNavbar();
      }

      lastScrollYRef.current = currentY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 8 && hiddenRef.current) {
        wakeNavbar();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [scheduleIdleHide, wakeNavbar]);

  useEffect(() => {
    setMobileOpen(false);
    wakeNavbar();
  }, [pathname, wakeNavbar]);

  if (pathname?.startsWith('/classic-admin')) {
    return null;
  }

  const shortName = settings?.shortName || 'Classico';
  const brandName = settings?.brandName || 'Classico Brew & Grill';
  const logoUrl = settings?.logoUrl || '/images/logo.png';
  const phone = settings?.phone || '';
  const todayHours = settings?.openingHours?.[0]?.hours || '';

  return (
    <>
      {hidden && !mobileOpen && (
        <div
          aria-hidden="true"
          onMouseEnter={wakeNavbar}
          onTouchStart={wakeNavbar}
          className="fixed inset-x-0 top-0 z-40 h-1.5"
        />
      )}
      <header
        ref={headerRef}
        onMouseEnter={() => {
          isHoveringNavRef.current = true;
          setHidden(false);
          if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        }}
        onMouseMove={() => {
          isHoveringNavRef.current = true;
          if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        }}
        onMouseLeave={() => {
          isHoveringNavRef.current = false;
          scheduleIdleHide();
        }}
        onFocusCapture={() => {
          setHidden(false);
          scheduleIdleHide();
        }}
        onTouchStart={() => {
          setHidden(false);
          scheduleIdleHide();
        }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          hidden && !mobileOpen
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100',
          scrolled
            ? 'border-b border-brand-mint/35 bg-brand-bg/92 py-2.5 shadow-soft backdrop-blur-md'
            : 'bg-brand-bg/75 py-3.5 backdrop-blur-sm'
        )}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label={`${brandName} Home`}
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/90 p-0.5 shadow-sm ring-1 ring-brand-mint/40 transition-transform duration-300 group-hover:scale-105">
            <img
              src={logoUrl}
              alt={`${brandName} Logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-brand-dark transition-colors group-hover:text-brand-teal">
              {shortName}
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-sage">
              Brew &amp; Grill
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-brand-mint/30 bg-white/75 px-2 py-1 shadow-sm"
        >
          {navigationLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-white'
                    : 'text-brand-dark/80 hover:text-brand-teal'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 -z-0 rounded-full bg-brand-sage shadow-sm"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            href="/reservations"
            variant="primary"
            size="sm"
            leftIcon={<CalendarDays className="h-3.5 w-3.5" />}
            className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold"
          >
            Book a Table
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-mint/40 bg-white text-brand-dark shadow-sm transition-colors hover:border-brand-teal hover:text-brand-teal md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-brand-mint/30 bg-white/98 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">
              {navigationLinks.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-brand-bg text-brand-teal font-semibold'
                        : 'text-brand-dark hover:bg-brand-bg/60'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-brand-teal" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-3">
                <Button
                  href="/reservations"
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<CalendarDays className="h-4 w-4" />}
                >
                  Book a Table
                </Button>
              </div>

              {(todayHours || phone) && (
                <div className="mt-4 flex flex-col gap-2 rounded-xl bg-brand-bg p-4 text-xs text-brand-dark/75">
                  {todayHours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-brand-teal" />
                      <span>Open Today: {todayHours}</span>
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-brand-teal" />
                      <span>{phone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
