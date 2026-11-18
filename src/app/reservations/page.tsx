'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { getSeatingZones, getSiteConfig } from '@/lib/cms';
import { cn } from '@/lib/utils';

const timeGroups = [
  {
    label: 'Morning Brew & Brunch',
    slots: ['8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM'],
  },
  {
    label: 'Midday Hearth Lunch',
    slots: ['12:30 PM', '1:30 PM', '2:30 PM', '4:00 PM'],
  },
  {
    label: 'Evening Wood-Fired Grill',
    slots: ['5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:15 PM'],
  },
];

const occasions = [
  'Casual Dining',
  'Birthday Celebration',
  'Anniversary',
  'Business Coffee / Lunch',
  'Date Night',
];

export default function ReservationsPage() {
  const seatingZones = getSeatingZones();
  const site = getSiteConfig();

  const defaultDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [zoneId, setZoneId] = useState(seatingZones[0].id);
  const [occasion, setOccasion] = useState('Casual Dining');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const selectedZone =
    seatingZones.find((z) => z.id === zoneId) || seatingZones[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setConfirmedRef(`CBG-${randomCode}`);
  };

  return (
    <>
      <PageHero
        scriptLabel="Reserve Your Sanctuary"
        title="Book a Table"
        description="Choose your preferred dining zone—from our sunlit Botanical Conservatory to a seat beside the glowing white-oak hearth."
      />

      <Section tone="sageTint">
        {confirmedRef ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl rounded-3xl border border-brand-mint/45 bg-white p-8 text-center shadow-elevated sm:p-12"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
              <CheckCircle2 className="h-9 w-9" />
            </span>

            <p className="mt-5 font-script text-3xl text-brand-teal">
              We Look Forward to Welcoming You
            </p>
            <h2 className="mt-1 font-heading text-3xl font-semibold text-brand-dark">
              Table Request Reserved
            </h2>
            <p className="mt-2 text-sm text-brand-dark/75">
              Confirmation Reference:{' '}
              <span className="font-semibold text-brand-sage">
                {confirmedRef}
              </span>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-brand-mint/35 bg-brand-bg p-6 text-left text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-sage">
                  Guest
                </p>
                <p className="mt-1 font-semibold text-brand-dark">
                  {fullName}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-sage">
                  Party Size
                </p>
                <p className="mt-1 font-semibold text-brand-dark">
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-sage">
                  Date &amp; Time
                </p>
                <p className="mt-1 font-semibold text-brand-dark">
                  {date} • {timeSlot}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-sage">
                  Seating Area
                </p>
                <p className="mt-1 font-semibold text-brand-dark">
                  {selectedZone.name}
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-brand-dark/65">
              Phase 1 Demo Preview — No live booking email was dispatched. When Phase 2 CMS/API is connected, instant SMS &amp; email confirmations will fire automatically.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => setConfirmedRef(null)}
                variant="outline"
                size="md"
              >
                Modify or New Booking
              </Button>
              <Button href="/menu" variant="primary" size="md">
                Explore the Menu
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Main Interactive Booking Form */}
            <form
              onSubmit={handleConfirm}
              className="space-y-8 rounded-3xl border border-brand-mint/35 bg-white p-6 shadow-soft sm:p-10 lg:col-span-8"
            >
              {/* Step 1: Party Size & Date */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-brand-dark">
                  1. Party Size &amp; Date
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage">
                      Number of Guests
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 8].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setGuests(count)}
                          className={cn(
                            'h-10 min-w-[2.6rem] rounded-xl border px-3 text-sm font-semibold transition-all',
                            guests === count
                              ? 'border-brand-teal bg-brand-teal text-white shadow-sm'
                              : 'border-brand-mint/45 bg-brand-bg/50 text-brand-dark hover:border-brand-teal'
                          )}
                        >
                          {count === 8 ? '8+' : count}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                    >
                      Select Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-2.5 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Time Slot */}
              <div className="border-t border-brand-mint/25 pt-7">
                <h2 className="font-heading text-2xl font-semibold text-brand-dark">
                  2. Preferred Seating Time
                </h2>
                <div className="mt-4 space-y-4">
                  {timeGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
                        {group.label}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={cn(
                              'rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all',
                              timeSlot === slot
                                ? 'border-brand-teal bg-brand-teal text-white shadow-glow'
                                : 'border-brand-mint/40 bg-brand-bg/50 text-brand-dark hover:border-brand-teal'
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Seating Area */}
              <div className="border-t border-brand-mint/25 pt-7">
                <h2 className="font-heading text-2xl font-semibold text-brand-dark">
                  3. Choose Your Atmosphere
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {seatingZones.map((zone) => {
                    const active = zoneId === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setZoneId(zone.id)}
                        className={cn(
                          'flex flex-col rounded-2xl border p-4 text-left transition-all',
                          active
                            ? 'border-brand-teal bg-brand-teal/8 ring-1 ring-brand-teal'
                            : 'border-brand-mint/40 bg-brand-bg/40 hover:border-brand-sage/60'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-heading text-lg font-semibold text-brand-dark">
                            {zone.name}
                          </span>
                          <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-brand-sage shadow-sm">
                            {zone.capacity}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-brand-dark/75">
                          {zone.description}
                        </p>
                        <span className="mt-2.5 text-[11px] font-medium text-brand-teal">
                          {zone.ambiance}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Occasion & Guest Details */}
              <div className="border-t border-brand-mint/25 pt-7 space-y-5">
                <h2 className="font-heading text-2xl font-semibold text-brand-dark">
                  4. Guest Information
                </h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-sage">
                    Occasion
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {occasions.map((occ) => (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setOccasion(occ)}
                        className={cn(
                          'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                          occasion === occ
                            ? 'border-brand-sage bg-brand-sage text-white'
                            : 'border-brand-mint/40 bg-brand-bg/40 text-brand-dark/80 hover:border-brand-sage'
                        )}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="res-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                    >
                      Full Name *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Julian Mercer"
                      className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-2.5 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="res-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                    >
                      Email *
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="julian@example.com"
                      className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-2.5 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="res-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (503) 555-0188"
                      className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-2.5 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-brand-sage"
                  >
                    Dietary Notes or Special Requests
                  </label>
                  <textarea
                    id="res-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Allergies, high chair request, celebratory dessert message..."
                    className="mt-1.5 w-full rounded-xl border border-brand-mint/45 bg-brand-bg/50 px-4 py-2.5 text-sm text-brand-dark focus:border-brand-teal focus:bg-white focus:outline-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Confirm Table Reservation
                </Button>
              </div>
            </form>

            {/* Right Sidebar: Live Summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-3xl border border-brand-mint/35 bg-brand-sage p-7 text-white shadow-elevated">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-mint-light">
                    <Sparkles className="h-4 w-4" />
                    <span>Reservation Summary</span>
                  </div>

                  <h3 className="mt-3 font-heading text-2xl font-semibold">
                    {site.brandName}
                  </h3>

                  <div className="mt-6 space-y-4 border-t border-white/15 pt-5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-brand-mint-light">
                        <Users className="h-4 w-4" />
                        Guests
                      </span>
                      <span className="font-semibold">
                        {guests} {guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-brand-mint-light">
                        <CalendarDays className="h-4 w-4" />
                        Date
                      </span>
                      <span className="font-semibold">{date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-brand-mint-light">
                        <Clock className="h-4 w-4" />
                        Time
                      </span>
                      <span className="font-semibold">{timeSlot}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="flex items-center gap-2 text-brand-mint-light shrink-0">
                        <MapPin className="h-4 w-4" />
                        Zone
                      </span>
                      <span className="font-semibold text-right">
                        {selectedZone.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-brand-mint-light">Occasion</span>
                      <span className="font-semibold">{occasion}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-mint/35 bg-white p-6 text-xs leading-relaxed text-brand-dark/75 shadow-soft space-y-2.5">
                  <p className="font-semibold uppercase tracking-wider text-brand-sage">
                    Dining Notes
                  </p>
                  <p>
                    • Tables are held for 15 minutes past your reserved time.
                  </p>
                  <p>
                    • Groups of 9 or more? Please contact{' '}
                    <span className="font-medium text-brand-teal">
                      {site.contact.eventsEmail}
                    </span>{' '}
                    for custom group tasting menus.
                  </p>
                  <p>
                    • Our morning espresso bar welcomes walk-in guests all day without a booking.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </Section>
    </>
  );
}
