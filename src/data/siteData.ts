import {
  BrandValue,
  OpeningHour,
  SeatingZone,
  Testimonial,
} from '@/types/cms';

interface SeedCraftLeader {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
}

interface SeedSiteConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  address: {
    street: string;
    district: string;
    city: string;
    full: string;
    mapsQueryUrl: string;
    mapsEmbedUrl: string;
  };
  contact: {
    phone: string;
    email: string;
    eventsEmail: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    tripadvisor: string;
  };
  openingHours: OpeningHour[];
  roasteryHours: string;
  grillHours: string;
}

export const siteConfig: SeedSiteConfig = {
  brandName: 'Classico Brew & Grill',
  shortName: 'Classico',
  tagline: 'Where Fresh Brews Meet the Restro Garden',
  subTagline:
    'Located along Airport Road in Biratnagar-4, Classico Brew & Grill brings together our morning Coffee House, open-air Restro Garden, evening grill specials, and welcoming Bed & Breakfast hospitality.',
  address: {
    street: 'Airport Road, Biratnagar-4',
    district: 'Airport Area, Biratnagar-4',
    city: 'Biratnagar 56613, Koshi Province, Nepal',
    full: 'Airport Road, Biratnagar-4, Morang 56613, Koshi Province, Nepal',
    mapsQueryUrl: 'https://maps.app.goo.gl/PwGkHoddoBmUc6u36',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.6!2d87.2684502!3d26.4852374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef757b5875761b%3A0xd123465b6abe0627!2sClassico%20Brew%20%26%20Grill!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp',
  },
  contact: {
    phone: '+977 982-7326578',
    email: 'theclassico777@gmail.com',
    eventsEmail: 'theclassico777@gmail.com',
  },
  socials: {
    instagram: '',
    facebook: 'https://www.facebook.com/theclassico777/',
    tripadvisor: '',
  },
  openingHours: [
    {
      days: 'Sunday – Friday',
      hours: '7:30 AM – 10:00 PM',
      note: 'Coffee House from 7:30 AM • Grill & Restro Garden All Day',
    },
    {
      days: 'Saturday',
      hours: '7:30 AM – 10:00 PM',
      note: 'Weekend Garden Lounge, Mezzanine & Evening Specials',
    },
  ],
  roasteryHours: 'Daily: 7:30 AM – 10:00 PM',
  grillHours: 'Daily: 11:00 AM – 10:00 PM',
};

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const brandValues: BrandValue[] = [
  {
    id: 'val-coffee',
    title: 'La Cimbali Coffee House',
    description:
      'Every morning starts at 7:30 AM with freshly pulled double espressos, velvety cappuccinos, and classic Americanos brewed on our Italian La Cimbali M23 UP.',
    iconName: 'Coffee',
  },
  {
    id: 'val-grill',
    title: 'Fresh Kitchen & Grill Specials',
    description:
      'From toasted club sandwiches and Nepali chatpate to evening specials like Mutton Cheese Finger, Chicken Khumbi, and Stuffed Grill Paneer.',
    iconName: 'Flame',
  },
  {
    id: 'val-garden',
    title: 'Open-Air Restro Garden',
    description:
      'Relax beneath our covered pergola lounge, open stone courtyard, or two-story illuminated mezzanine deck framed by greenery and hanging lanterns.',
    iconName: 'Leaf',
  },
  {
    id: 'val-hospitality',
    title: 'Warm Biratnagar Hospitality',
    description:
      'Conveniently situated near Biratnagar Airport with dedicated covered parking, friendly table service, takeaway, and Bed & Breakfast convenience.',
    iconName: 'HeartHandshake',
  },
];

export const storyChapters = [
  {
    year: 'Coffee House',
    title: 'Morning Rituals on Airport Road',
    content:
      'Classico Brew & Grill opened near Biratnagar Airport with a clear vision: create a welcoming neighborhood spot where travelers, families, and friends can start the day at 7:30 AM with a properly pulled espresso or frothy cappuccino.',
  },
  {
    year: 'Restro Garden',
    title: 'From Sunlit Courtyard to Mezzanine Evenings',
    content:
      'Behind our Airport Road storefront sits an expansive open-air Restro Garden—featuring shaded pergola sofas, stone walkways, greenery, and an illuminated upper mezzanine deck overlooking the courtyard at dusk.',
  },
  {
    year: 'Grill & Stay',
    title: 'All-Day Dining, Bar Specials & Bed & Breakfast',
    content:
      'From quick midday bites and Nepali favorites to evening grill specials, mocktails, and Bed & Breakfast hospitality, our team welcomes walk-ins, casual meetups, and celebrations every day until 10:00 PM.',
  },
];

export const craftLeaders: SeedCraftLeader[] = [
  {
    id: 'leader-1',
    name: 'Espresso & Coffee Bar Team',
    role: 'Classico Coffee House',
    specialty: 'La Cimbali M23 UP Espresso & Refreshers',
    bio: 'Our baristas dial in rich single and double shots, creamy cappuccinos, classic Americanos, and chilled iced teas from 7:30 AM daily.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069460/classico-brew-and-grill/espresso-la-cimbali.jpg',
  },
  {
    id: 'leader-2',
    name: 'Kitchen, Bar & Garden Team',
    role: 'Restro Garden & Mezzanine Lounge',
    specialty: 'Evening Chef Specials, Grill & Bar Craft',
    bio: 'Our chefs and hospitality crew craft evening favorites—from Mutton Cheese Finger and Stuffed Grill Paneer to signature mocktails—across our courtyard and upper deck.',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069465/classico-brew-and-grill/mezzanine-bar-evening.jpg',
  },
];

export const seatingZones: SeatingZone[] = [
  {
    id: 'garden-courtyard',
    name: 'Restro Garden Courtyard',
    capacity: '2 – 8 Guests',
    description:
      'Open-air stone courtyard surrounded by courtyard trees, potted greenery, and soft evening accent lighting.',
    ambiance: 'Breezy, lively & open-air',
  },
  {
    id: 'covered-lounge',
    name: 'Covered Garden Lounge',
    capacity: '2 – 6 Guests',
    description:
      'Shaded pergola seating with cushioned wooden lounge chairs, hanging lanterns, ceiling fans, and prayer flags.',
    ambiance: 'Relaxed, shaded & cozy',
  },
  {
    id: 'mezzanine-deck',
    name: 'Upper Mezzanine Deck',
    capacity: '2 – 8 Guests',
    description:
      'Elevated open-air balcony lounge lit with warm amber strips, overlooking the garden and Biratnagar sky.',
    ambiance: 'Scenic & intimate',
  },
  {
    id: 'coffee-bar',
    name: 'Coffee House & Bar Counter',
    capacity: '1 – 4 Guests',
    description:
      'Casual ground-level counter seating beside our espresso bar and evening beverage station.',
    ambiance: 'Quick, casual & welcoming',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Warm, inviting atmosphere near the airport with fresh coffee, tasty snacks, and a lovely outdoor garden for evening catch-ups.',
    author: 'Biratnagar Local Guests',
    context: 'Google Maps Visitor Feedback (4.1★)',
  },
  {
    id: 't2',
    quote:
      'Pleasant, attentive staff and comfortable open-air seating—ideal whether stopping for a morning cappuccino or relaxing on the upper deck at dusk.',
    author: 'Airport Road Patrons',
    context: 'Dine-In & Restro Garden Guests',
  },
];
