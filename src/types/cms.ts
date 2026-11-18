export type MenuCategorySlug = string;

export type DietaryTag =
  | 'Signature'
  | 'Wood-Fired'
  | 'Single Origin'
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free';

export interface OpeningHour {
  days: string;
  hours: string;
  note?: string;
}

export interface SiteSettingsData {
  id: string;
  brandName: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  logoUrl: string;
  street: string;
  district: string;
  city: string;
  fullAddress: string;
  mapsQueryUrl: string;
  mapsEmbedUrl: string;
  phone: string;
  email: string;
  eventsEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  tripadvisorUrl: string;
  roasteryHours: string;
  grillHours: string;
  openingHours: OpeningHour[];
  published: boolean;
}

export interface CraftPillar {
  label: string;
  sublabel: string;
  iconName: 'Coffee' | 'Flame' | 'Leaf';
}

export interface SignatureSplitItem {
  id: string;
  script: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor: 'teal' | 'sage';
}

export interface CtaBannerData {
  badgeText: string;
  scriptAccent: string;
  headline: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface HeroContentData {
  id: string;
  badgeText: string;
  scriptAccent: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  heroImageUrl: string;
  floatingCard1Title: string;
  floatingCard1Subtitle: string;
  floatingCard2Title: string;
  floatingCard2Subtitle: string;
  pillars: CraftPillar[];
  signatureSplit: {
    scriptLabel: string;
    title: string;
    description: string;
    items: SignatureSplitItem[];
  };
  ctaBanner: CtaBannerData;
  published: boolean;
}

export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  scriptLabel: string;
  description: string;
  sortOrder: number;
  published: boolean;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categorySlug?: string;
  categoryName?: string;
  price: number;
  description: string;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  pairingNote?: string | null;
  sortOrder: number;
  published: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  imageUrl: string;
  aspect: string;
  sortOrder: number;
  published: boolean;
}

export interface BrandValue {
  id: string;
  title: string;
  description: string;
  iconName: 'Flame' | 'Coffee' | 'Leaf' | 'HeartHandshake';
}

export interface StoryChapter {
  year: string;
  title: string;
  content: string;
}

export interface CraftLeader {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export interface SeatingZone {
  id: string;
  name: string;
  capacity: string;
  description: string;
  ambiance: string;
}

export interface AboutPageContentJson {
  storyScript: string;
  storyHeadline: string;
  storyImageUrl: string;
  storyOverlayTitle: string;
  storyOverlaySubtitle: string;
  chapters: StoryChapter[];
  valuesScript: string;
  valuesTitle: string;
  valuesDescription: string;
  values: BrandValue[];
  leadersScript: string;
  leadersTitle: string;
  leadersDescription: string;
  leaders: CraftLeader[];
  testimonialsScript: string;
  testimonialsTitle: string;
  testimonials: Testimonial[];
}

export interface PageSectionData<T = Record<string, unknown>> {
  id: string;
  slug: string;
  scriptLabel: string;
  title: string;
  description: string;
  content: T;
  published: boolean;
}

export interface ReservationRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingZone: string;
  occasion: string;
  notes?: string | null;
  status: string;
  published: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorRole?: string | null;
  category: string;
  readTime: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  authorRole?: string | null;
  rating: number;
  comment: string;
  approved: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
