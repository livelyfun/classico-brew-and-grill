export type MenuCategorySlug =
  | 'coffee-brews'
  | 'grill'
  | 'mains'
  | 'sides'
  | 'desserts'
  | 'drinks';

export type DietaryTag =
  | 'Signature'
  | 'Wood-Fired'
  | 'Single Origin'
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free';

export interface MenuCategory {
  id: string;
  slug: MenuCategorySlug;
  name: string;
  scriptLabel: string;
  description: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  category: MenuCategorySlug;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
  tags?: DietaryTag[];
  pairingNote?: string;
}

export type GalleryCategory =
  | 'all'
  | 'brews'
  | 'grill'
  | 'atmosphere'
  | 'desserts';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'all'>;
  image: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface OpeningHour {
  days: string;
  hours: string;
  note?: string;
}

export interface BrandValue {
  id: string;
  title: string;
  description: string;
  iconName: 'Flame' | 'Coffee' | 'Leaf' | 'HeartHandshake';
}

export interface CraftLeader {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  image: string;
}

export interface SeatingZone {
  id: string;
  name: string;
  capacity: string;
  description: string;
  ambiance: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export interface SiteConfig {
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
