interface SeedGalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  aspect?: string;
}

export const galleryCategories = [
  { key: 'all', label: 'All Moments' },
  { key: 'atmosphere', label: 'Atmosphere & Garden' },
  { key: 'brews', label: 'Coffee & Brews' },
  { key: 'grill', label: 'Grill & Kitchen' },
  { key: 'desserts', label: 'Drinks & Refreshers' },
] as const;

export const galleryItems: SeedGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Illuminated Mezzanine & Evening Bar',
    caption:
      'Our two-story mezzanine deck and ground-floor bar glowing warmly at dusk.',
    category: 'atmosphere',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069465/classico-brew-and-grill/mezzanine-bar-evening.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'Restro Garden at Blue Hour',
    caption:
      'Lantern-lit pergola seating and open stone courtyard framed by greenery.',
    category: 'atmosphere',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069462/classico-brew-and-grill/garden-evening.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-3',
    title: 'La Cimbali Espresso Craft',
    caption:
      'Fresh double-shot espresso with rich golden crema pulled to order from 7:30 AM.',
    category: 'brews',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069460/classico-brew-and-grill/espresso-la-cimbali.jpg',
    aspect: 'square',
  },
  {
    id: 'gal-4',
    title: 'Shaded Garden Sofa Lounge',
    caption:
      'Breezy cushioned seating beneath colorful prayer flags and hanging lamps.',
    category: 'atmosphere',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069463/classico-brew-and-grill/garden-lounge-day.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gal-5',
    title: 'Morning Cappuccino & Americano',
    caption:
      'Silky micro-foam latte art paired with bold black coffee at our outdoor tables.',
    category: 'brews',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069454/classico-brew-and-grill/cappuccino-americano-duo.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-6',
    title: 'Airport Road Entrance & Signage',
    caption:
      'Welcome to Classico — Coffee House, Restro Garden & Bed & Breakfast in Biratnagar-4.',
    category: 'atmosphere',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069461/classico-brew-and-grill/exterior-storefront.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gal-7',
    title: 'Grilled Club Sandwich & Fries',
    caption:
      'Toasted multi-layer sandwich triangles plated with crisp fries and signature dip.',
    category: 'grill',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069457/classico-brew-and-grill/club-sandwich-fries.jpg',
    aspect: 'square',
  },
  {
    id: 'gal-8',
    title: 'Spiced Nepali Chatpate Bowl',
    caption:
      'Crispy puffed rice tossed with tomatoes, fresh cilantro, and house spices.',
    category: 'grill',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069456/classico-brew-and-grill/chatpate-sadeko.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gal-9',
    title: 'Chilled Iced Lemon Mint Tea',
    caption:
      'Golden brewed iced tea finished with fresh mint leaves on the upper terrace.',
    category: 'desserts',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069464/classico-brew-and-grill/iced-mint-tea.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gal-10',
    title: 'Sunlit Courtyard Overview',
    caption:
      'Spacious outdoor seating surrounded by potted palms, trees, and shaded booths.',
    category: 'atmosphere',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069459/classico-brew-and-grill/courtyard-overview.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gal-11',
    title: 'Upper Terrace Sunset View',
    caption:
      'Golden-hour skies and dedicated covered guest parking viewed from the mezzanine deck.',
    category: 'atmosphere',
    image:
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069453/classico-brew-and-grill/balcony-sunset-view.jpg',
    aspect: 'landscape',
  },
];
