import {
  BrandValue,
  CraftLeader,
  SeatingZone,
  SiteConfig,
  Testimonial,
} from '@/types/cms';

export const siteConfig: SiteConfig = {
  brandName: 'Classico Brew & Grill',
  shortName: 'Classico',
  tagline: 'Where Artisanal Roasts Meet the Open Flame',
  subTagline:
    'A serene botanical sanctuary uniting small-batch specialty coffee by morning with wood-fired culinary craft from midday into the evening.',
  address: {
    street: '428 Botanical Promenade, Suite 102',
    district: 'Willow Creek Quarter',
    city: 'Portland, OR 97209',
    full: '428 Botanical Promenade, Willow Creek Quarter, Portland, OR 97209',
    mapsQueryUrl:
      'https://maps.google.com/?q=Pearl+District+Portland+OR+97209',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11181.20165502364!2d-122.688169!3d45.526696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a02332a173d%3A0x8c1e74e1620a1869!2sPearl%20District%2C%20Portland%2C%20OR!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus',
  },
  contact: {
    phone: '+1 (503) 555-0194',
    email: 'hello@classicobrewgrill.com',
    eventsEmail: 'gatherings@classicobrewgrill.com',
  },
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tripadvisor: 'https://tripadvisor.com',
  },
  openingHours: [
    {
      days: 'Monday – Thursday',
      hours: '7:30 AM – 10:00 PM',
      note: 'Roastery from 7:30 AM • Wood Grill from 11:30 AM',
    },
    {
      days: 'Friday – Saturday',
      hours: '7:30 AM – 11:30 PM',
      note: 'Late Evening Acoustic Lounge & Grill',
    },
    {
      days: 'Sunday',
      hours: '8:00 AM – 9:30 PM',
      note: 'Botanical Brunch until 2:30 PM',
    },
  ],
  roasteryHours: 'Daily: 7:30 AM – 5:00 PM',
  grillHours: 'Daily: 11:30 AM – Close',
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
    id: 'val-sourcing',
    title: 'Single-Origin Roastery',
    description:
      'Every morning begins with sustainably harvested micro-lot beans roasted in small batches for bright floral clarity and velvet crema.',
    iconName: 'Coffee',
  },
  {
    id: 'val-flame',
    title: 'White Oak & Applewood Fire',
    description:
      'Our custom open-hearth grill infuses prime pasture-raised cuts and coastal seafood with subtle, aromatic wood smoke.',
    iconName: 'Flame',
  },
  {
    id: 'val-botanical',
    title: 'Botanical Pantry',
    description:
      'From house-steeped sage and rosemary syrups to seasonal market greens, fresh botanicals anchor both our bar and kitchen.',
    iconName: 'Leaf',
  },
  {
    id: 'val-hospitality',
    title: 'Unrushed Hospitality',
    description:
      'Designed as a timeless neighborhood refuge where quiet morning rituals flow effortlessly into candlelit evening dinners.',
    iconName: 'HeartHandshake',
  },
];

export const storyChapters = [
  {
    year: 'Dawn Ritual',
    title: 'Crafted in the Conservatory',
    content:
      'Classico began with a simple question: why do the finest specialty coffee houses close just as dinner begins, while great grill rooms rarely honor the art of a morning espresso? We built one unified conservatory where both crafts live under a canopy of olive leaves and warm oak.',
  },
  {
    year: 'Open Hearth',
    title: 'Honest Ingredients, Patient Fire',
    content:
      'By 11:30 each morning, the espresso grinder shares the spotlight with glowing white oak embers. Our culinary team partners directly with local ranchers, artisan cheesemakers, and coastal fishers so every plate needs little more than sea salt, cold-pressed herbs, and clean flame.',
  },
  {
    year: 'Everyday Elegance',
    title: 'A Table for Every Chapter of the Day',
    content:
      'Whether you arrive at 8 AM for a hand-poured Ethiopian single-origin and toasted sourdough, or gather at 8 PM over cedar-planked salmon and prime ribeye, Classico welcomes you with soft mint calm and genuine warmth.',
  },
];

export const craftLeaders: CraftLeader[] = [
  {
    id: 'leader-1',
    name: 'Elena Vance',
    role: 'Head Roaster & Beverage Director',
    specialty: 'Botanical Infusions & Precision Pour-Overs',
    bio: 'With twelve years sourcing direct-trade harvests across Ethiopia and Colombia, Elena crafts Classico’s signature espresso blends and herbal cold brews.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'leader-2',
    name: 'Marco Bellini',
    role: 'Executive Wood-Fire Chef',
    specialty: 'Live-Fire Aging & Coastal Grills',
    bio: 'Trained in Northern Italian hearth kitchens and Pacific Northwest smokehouses, Chef Marco balances classic dry-aged richness with vibrant botanical accompaniments.',
    image:
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
  },
];

export const seatingZones: SeatingZone[] = [
  {
    id: 'conservatory',
    name: 'Botanical Conservatory',
    capacity: '2 – 6 Guests',
    description: 'Sunlit glass atrium framed by indoor olive trees and sage velvet banquettes.',
    ambiance: 'Bright, airy & serene',
  },
  {
    id: 'hearth-lounge',
    name: 'Fireside Grill Lounge',
    capacity: '2 – 8 Guests',
    description: 'Warm timber tables overlooking the glow of the open white-oak hearth.',
    ambiance: 'Intimate & aromatic',
  },
  {
    id: 'garden-terrace',
    name: 'Covered Garden Terrace',
    capacity: '2 – 10 Guests',
    description: 'Heated stone courtyard surrounded by rosemary planters and soft string lights.',
    ambiance: 'Breezy outdoor sanctuary',
  },
  {
    id: 'chefs-counter',
    name: "Chef's & Barista Counter",
    capacity: '1 – 4 Guests',
    description: 'Front-row seats to precision pour-over service and live culinary plating.',
    ambiance: 'Interactive craft experience',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'The Pistachio Sage Latte in the sunlit conservatory is my weekly ritual, and the wood-fired ribeye we had Friday night rivaled the finest steakhouses in town.',
    author: 'Camille Laurent',
    context: 'Local Food & Design Journal',
  },
  {
    id: 't2',
    quote:
      'Rarely does a space feel this calm yet vibrant. Every detail—from the botanical palette to the attentive pacing of courses—feels truly timeless.',
    author: 'Julian & Priya Mercer',
    context: 'Anniversary Dinner Guests',
  },
];
