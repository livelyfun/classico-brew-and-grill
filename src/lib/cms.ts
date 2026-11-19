import { prisma } from '@/lib/prisma';
import { ensureDatabaseSeeded } from '@/lib/seed';
import {
  AboutPageContentJson,
  BlogPost,
  CraftPillar,
  CtaBannerData,
  CustomerReview,
  FaqItem,
  GalleryItem,
  HeroContentData,
  MenuCategory,
  MenuItem,
  OpeningHour,
  PageSectionData,
  ReservationRecord,
  SignatureSplitItem,
  SiteSettingsData,
} from '@/types/cms';

function mapSiteSettings(row: {
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
  openingHoursJson: unknown;
  published: boolean;
}): SiteSettingsData {
  return {
    id: row.id,
    brandName: row.brandName,
    shortName: row.shortName,
    tagline: row.tagline,
    subTagline: row.subTagline,
    logoUrl: row.logoUrl,
    street: row.street,
    district: row.district,
    city: row.city,
    fullAddress: row.fullAddress,
    mapsQueryUrl: row.mapsQueryUrl,
    mapsEmbedUrl: row.mapsEmbedUrl,
    phone: row.phone,
    email: row.email,
    eventsEmail: row.eventsEmail,
    instagramUrl: row.instagramUrl,
    facebookUrl: row.facebookUrl,
    tripadvisorUrl: row.tripadvisorUrl,
    roasteryHours: row.roasteryHours,
    grillHours: row.grillHours,
    openingHours: Array.isArray(row.openingHoursJson)
      ? (row.openingHoursJson as OpeningHour[])
      : [],
    published: row.published,
  };
}

export const DEFAULT_HERO_GRID_IMAGES = [
  'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069465/classico-brew-and-grill/mezzanine-bar-evening.jpg',
  'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069460/classico-brew-and-grill/espresso-la-cimbali.jpg',
  'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069462/classico-brew-and-grill/garden-evening.jpg',
  'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069454/classico-brew-and-grill/cappuccino-americano-duo.jpg',
  'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069463/classico-brew-and-grill/garden-lounge-day.jpg',
  'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069456/classico-brew-and-grill/chatpate-sadeko.jpg',
];

function mapHeroContent(row: {
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
  pillarsJson: unknown;
  signatureSplitJson: unknown;
  ctaBannerJson: unknown;
  published: boolean;
}): HeroContentData {
  const sig = (row.signatureSplitJson ?? {}) as {
    scriptLabel?: string;
    title?: string;
    description?: string;
    items?: SignatureSplitItem[];
  };
  const ctaObj = (row.ctaBannerJson ?? {}) as Record<string, unknown>;
  const cta = ctaObj as Partial<CtaBannerData>;

  const rawHeroImages = Array.isArray(ctaObj.heroImages)
    ? ctaObj.heroImages.map((u) => String(u).trim()).filter(Boolean)
    : [];
  const rowImage = row.heroImageUrl?.trim();
  const cleanedImages =
    rawHeroImages.length > 0
      ? rawHeroImages
      : rowImage && rowImage !== '/images/hero-latte.png'
      ? [rowImage, ...DEFAULT_HERO_GRID_IMAGES]
      : DEFAULT_HERO_GRID_IMAGES;

  return {
    id: row.id,
    badgeText: row.badgeText,
    scriptAccent: row.scriptAccent,
    headline: row.headline,
    subheadline: row.subheadline,
    primaryCtaLabel: row.primaryCtaLabel,
    primaryCtaHref: row.primaryCtaHref,
    secondaryCtaLabel: row.secondaryCtaLabel,
    secondaryCtaHref: row.secondaryCtaHref,
    heroImageUrl: cleanedImages[0] || row.heroImageUrl,
    heroImages: cleanedImages,
    floatingCard1Title: row.floatingCard1Title,
    floatingCard1Subtitle: row.floatingCard1Subtitle,
    floatingCard2Title: row.floatingCard2Title,
    floatingCard2Subtitle: row.floatingCard2Subtitle,
    pillars: Array.isArray(row.pillarsJson)
      ? (row.pillarsJson as CraftPillar[])
      : [],
    signatureSplit: {
      scriptLabel: sig.scriptLabel ?? '',
      title: sig.title ?? '',
      description: sig.description ?? '',
      items: Array.isArray(sig.items) ? sig.items : [],
    },
    ctaBanner: {
      badgeText: cta.badgeText ?? '',
      scriptAccent: cta.scriptAccent ?? '',
      headline: cta.headline ?? '',
      description: cta.description ?? '',
      primaryCtaLabel: cta.primaryCtaLabel ?? '',
      primaryCtaHref: cta.primaryCtaHref ?? '/reservations',
      secondaryCtaLabel: cta.secondaryCtaLabel ?? '',
      secondaryCtaHref: cta.secondaryCtaHref ?? '/menu',
    },
    published: row.published,
  };
}

// ---------- PUBLIC QUERIES (Published Only) ----------

export async function getPublishedSiteSettings(): Promise<SiteSettingsData | null> {
  await ensureDatabaseSeeded();
  const row = await prisma.siteSettings.findFirst({
    where: { published: true },
    orderBy: { createdAt: 'asc' },
  });
  return row ? mapSiteSettings(row) : null;
}

export async function getPublishedHeroContent(): Promise<HeroContentData | null> {
  await ensureDatabaseSeeded();
  const row = await prisma.heroContent.findFirst({
    where: { published: true },
    orderBy: { createdAt: 'asc' },
  });
  return row ? mapHeroContent(row) : null;
}

export async function getPublishedMenuCategories(): Promise<MenuCategory[]> {
  await ensureDatabaseSeeded();
  return prisma.menuCategory.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getPublishedMenuItems(): Promise<MenuItem[]> {
  await ensureDatabaseSeeded();
  const rows = await prisma.menuItem.findMany({
    where: {
      published: true,
      category: { published: true },
    },
    include: { category: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    categoryId: r.categoryId,
    categorySlug: r.category.slug,
    categoryName: r.category.name,
    price: r.price,
    description: r.description,
    imageUrl: r.imageUrl,
    featured: r.featured,
    tags: r.tags,
    pairingNote: r.pairingNote,
    sortOrder: r.sortOrder,
    published: r.published,
  }));
}

export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  await ensureDatabaseSeeded();
  return prisma.galleryImage.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getPublishedPageSection<T = Record<string, unknown>>(
  slug: string
): Promise<PageSectionData<T> | null> {
  await ensureDatabaseSeeded();
  const row = await prisma.pageSection.findFirst({
    where: { slug, published: true },
  });
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    scriptLabel: row.scriptLabel,
    title: row.title,
    description: row.description,
    content: (row.contentJson ?? {}) as T,
    published: row.published,
  };
}

export async function getPublishedAboutPage() {
  return getPublishedPageSection<AboutPageContentJson>('about');
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  await ensureDatabaseSeeded();
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.coverImage,
    author: r.author,
    authorRole: r.authorRole,
    category: r.category,
    readTime: r.readTime,
    sortOrder: r.sortOrder,
    published: r.published,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export async function getPublishedBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  await ensureDatabaseSeeded();
  const r = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
  if (!r) return null;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.coverImage,
    author: r.author,
    authorRole: r.authorRole,
    category: r.category,
    readTime: r.readTime,
    sortOrder: r.sortOrder,
    published: r.published,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export async function getPublishedFaqItems(): Promise<FaqItem[]> {
  await ensureDatabaseSeeded();
  const rows = await prisma.faqItem.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
  return rows.map((r) => ({
    id: r.id,
    question: r.question,
    answer: r.answer,
    category: r.category,
    sortOrder: r.sortOrder,
    published: r.published,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export async function getApprovedCustomerReviews(): Promise<CustomerReview[]> {
  await ensureDatabaseSeeded();
  const rows = await prisma.customerReview.findMany({
    where: { approved: true, published: true },
    orderBy: { createdAt: 'desc' },
  });
  return rows.map((r) => ({
    id: r.id,
    authorName: r.authorName,
    authorRole: r.authorRole,
    rating: r.rating,
    comment: r.comment,
    approved: r.approved,
    published: r.published,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

// ---------- ADMIN QUERIES (All Records: Published + Drafts) ----------

export async function getAdminBundle() {
  await ensureDatabaseSeeded();

  const [
    settingsRow,
    heroRow,
    categories,
    rawItems,
    gallery,
    pageRows,
    reservations,
    blogs,
    faqs,
    reviews,
  ] = await Promise.all([
    prisma.siteSettings.findFirst({ orderBy: { createdAt: 'asc' } }),
    prisma.heroContent.findFirst({ orderBy: { createdAt: 'asc' } }),
    prisma.menuCategory.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
    prisma.menuItem.findMany({
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
    prisma.galleryImage.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
    prisma.pageSection.findMany({ orderBy: { slug: 'asc' } }),
    prisma.reservation.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.blogPost.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.faqItem.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
    prisma.customerReview.findMany({
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const items: MenuItem[] = rawItems.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    categoryId: r.categoryId,
    categorySlug: r.category.slug,
    categoryName: r.category.name,
    price: r.price,
    description: r.description,
    imageUrl: r.imageUrl,
    featured: r.featured,
    tags: r.tags,
    pairingNote: r.pairingNote,
    sortOrder: r.sortOrder,
    published: r.published,
  }));

  const pages: PageSectionData[] = pageRows.map((p) => ({
    id: p.id,
    slug: p.slug,
    scriptLabel: p.scriptLabel,
    title: p.title,
    description: p.description,
    content: (p.contentJson ?? {}) as Record<string, unknown>,
    published: p.published,
  }));

  const reservationRecords: ReservationRecord[] = reservations.map((r) => ({
    id: r.id,
    referenceCode: r.referenceCode,
    fullName: r.fullName,
    email: r.email,
    phone: r.phone,
    guests: r.guests,
    date: r.date,
    timeSlot: r.timeSlot,
    seatingZone: r.seatingZone,
    occasion: r.occasion,
    notes: r.notes,
    status: r.status,
    published: r.published,
    createdAt: r.createdAt.toISOString(),
  }));

  const blogPosts: BlogPost[] = blogs.map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    content: b.content,
    coverImage: b.coverImage,
    author: b.author,
    authorRole: b.authorRole,
    category: b.category,
    readTime: b.readTime,
    sortOrder: b.sortOrder,
    published: b.published,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));

  const faqItems: FaqItem[] = faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    sortOrder: f.sortOrder,
    published: f.published,
    createdAt: f.createdAt.toISOString(),
    updatedAt: f.updatedAt.toISOString(),
  }));

  const customerReviews: CustomerReview[] = reviews.map((r) => ({
    id: r.id,
    authorName: r.authorName,
    authorRole: r.authorRole,
    rating: r.rating,
    comment: r.comment,
    approved: r.approved,
    published: r.published,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return {
    settings: settingsRow ? mapSiteSettings(settingsRow) : null,
    hero: heroRow ? mapHeroContent(heroRow) : null,
    categories,
    items,
    gallery,
    pages,
    reservations: reservationRecords,
    blogPosts,
    faqItems,
    reviews: customerReviews,
  };
}
