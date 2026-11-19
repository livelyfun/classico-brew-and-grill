import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { menuCategories, menuItems } from '@/data/menuData';
import { galleryItems } from '@/data/galleryData';
import {
  brandValues,
  craftLeaders,
  seatingZones,
  siteConfig,
  storyChapters,
  testimonials,
} from '@/data/siteData';

let seedingPromise: Promise<void> | null = null;

export async function ensureDatabaseSeeded(): Promise<void> {
  if (seedingPromise) return seedingPromise;
  seedingPromise = (async () => {
    const [settingsCount, blogCount, faqCount, reviewsCount] = await Promise.all([
      prisma.siteSettings.count(),
      prisma.blogPost.count(),
      prisma.faqItem.count(),
      prisma.customerReview.count(),
    ]);
    if (
      settingsCount > 0 &&
      blogCount > 0 &&
      faqCount > 0 &&
      reviewsCount > 0
    ) {
      return;
    }

    await runSeed();
  })();
  try {
    await seedingPromise;
  } finally {
    seedingPromise = null;
  }
}

export async function runSeed(): Promise<void> {
  const adminUsername = process.env.ADMIN_USERNAME?.trim() || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'classico2026';

  // 1. Admin User
  await prisma.user.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      passwordHash: hashPassword(adminPassword),
      role: 'admin',
      published: true,
    },
  });

  // 2. Site Settings
  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        brandName: siteConfig.brandName,
        shortName: siteConfig.shortName,
        tagline: siteConfig.tagline,
        subTagline: siteConfig.subTagline,
        logoUrl: '/images/logo.png',
        street: siteConfig.address.street,
        district: siteConfig.address.district,
        city: siteConfig.address.city,
        fullAddress: siteConfig.address.full,
        mapsQueryUrl: siteConfig.address.mapsQueryUrl,
        mapsEmbedUrl: siteConfig.address.mapsEmbedUrl,
        phone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        eventsEmail: siteConfig.contact.eventsEmail,
        instagramUrl: siteConfig.socials.instagram,
        facebookUrl: siteConfig.socials.facebook,
        tripadvisorUrl: siteConfig.socials.tripadvisor,
        roasteryHours: siteConfig.roasteryHours,
        grillHours: siteConfig.grillHours,
        openingHoursJson: siteConfig.openingHours as unknown as object,
        published: true,
      },
    });
  }

  // 3. Hero & Homepage Sections
  const heroCount = await prisma.heroContent.count();
  if (heroCount === 0) {
    const heroImages = [
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069465/classico-brew-and-grill/mezzanine-bar-evening.jpg',
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069460/classico-brew-and-grill/espresso-la-cimbali.jpg',
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069462/classico-brew-and-grill/garden-evening.jpg',
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069454/classico-brew-and-grill/cappuccino-americano-duo.jpg',
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069463/classico-brew-and-grill/garden-lounge-day.jpg',
      'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069456/classico-brew-and-grill/chatpate-sadeko.jpg',
    ];

    await prisma.heroContent.create({
      data: {
        badgeText: 'Coffee House • Restro Garden • Bed & Breakfast',
        scriptAccent: 'Welcome to Classico, Biratnagar',
        headline: siteConfig.tagline,
        subheadline: siteConfig.subTagline,
        primaryCtaLabel: 'Book a Table',
        primaryCtaHref: '/reservations',
        secondaryCtaLabel: 'Explore Our Menu',
        secondaryCtaHref: '/menu',
        heroImageUrl: heroImages[0],
        floatingCard1Title: 'La Cimbali Espresso',
        floatingCard1Subtitle: 'Coffee House from 7:30 AM',
        floatingCard2Title: 'Restro Garden & Deck',
        floatingCard2Subtitle: 'Open-Air Evenings',
        pillarsJson: [
          {
            label: 'Coffee House',
            sublabel: 'From 7:30 AM Daily',
            iconName: 'Coffee',
          },
          {
            label: 'Grill & Kitchen',
            sublabel: 'Fresh Plates All Day',
            iconName: 'Flame',
          },
          {
            label: 'Restro Garden',
            sublabel: 'Airport Road, Biratnagar',
            iconName: 'Leaf',
          },
        ],
        signatureSplitJson: {
          scriptLabel: 'Morning Brews to Evening Garden',
          title: 'Two Experiences Under One Roof in Biratnagar',
          description:
            'Classico Brew & Grill seamlessly transitions from a calm Airport Road coffee house in the morning to a lantern-lit restro garden and mezzanine lounge after sunset.',
          items: [
            {
              id: 'brews',
              script: 'Coffee House',
              title: 'La Cimbali Espresso & Iced Brews',
              subtitle: 'Fresh Morning Coffee Bar from 7:30 AM Daily',
              description:
                'Begin your day with rich double espressos, velvety latte-art cappuccinos, bold classic Americanos, and chilled iced teas prepared fresh on our Italian La Cimbali M23 UP espresso bar.',
              highlights: [
                'Italian La Cimbali M23 UP espresso extraction',
                'Fresh cappuccinos, lattes, Americanos & chilled iced mint tea',
                'Paired with grilled club sandwiches & light breakfast plates',
              ],
              imageUrl:
                'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069460/classico-brew-and-grill/espresso-la-cimbali.jpg',
              ctaLabel: 'Explore Coffee & Brews',
              ctaHref: '/menu?category=coffee-brews',
              accentColor: 'teal',
            },
            {
              id: 'grill',
              script: 'Restro Garden & Mezzanine',
              title: 'Evening Grill Specials & Bar',
              subtitle: 'Open Courtyard, Covered Lounge & Upper Deck',
              description:
                'Unwind outdoors or up on our illuminated mezzanine deck over house evening specials—from Mutton Cheese Finger and Chicken Khumbi to Stuffed Grill Paneer, Devil Mojito mocktails, and Pink Lady cocktails.',
              highlights: [
                'Chef Eve Specials: Mutton Cheese Finger, Chicken Khumbi & Stuffed Paneer',
                'Bar Specials: Devil Mojito Mocktail & Pink Lady Cocktail',
                'Breezy garden courtyard, shaded sofa pergola & covered guest parking',
              ],
              imageUrl:
                'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069465/classico-brew-and-grill/mezzanine-bar-evening.jpg',
              ctaLabel: 'Explore Grill & Specials',
              ctaHref: '/menu?category=grill',
              accentColor: 'sage',
            },
          ],
        },
        ctaBannerJson: {
          badgeText: 'Restro Garden Courtyard • Covered Lounge • Mezzanine Deck',
          scriptAccent: 'Save Your Seat at Classico',
          headline: 'Join Us for Morning Coffee or Open-Air Evenings',
          description:
            'Reserve your spot in our Restro Garden Courtyard, Covered Garden Lounge, or Upper Mezzanine Deck along Airport Road, Biratnagar.',
          primaryCtaLabel: 'Book a Table Now',
          primaryCtaHref: '/reservations',
          secondaryCtaLabel: 'Browse the Full Menu',
          secondaryCtaHref: '/menu',
          heroImages,
        },
        published: true,
      },
    });
  }

  // 4. Page Sections (Menu, About, Gallery, Contact, Reservations)
  const pagesSeed = [
    {
      slug: 'menu',
      scriptLabel: 'Coffee House & All-Day Kitchen',
      title: 'Our Menu',
      description:
        'Freshly pulled espresso, classic café bites, Nepali favorites, and Classico’s evening grill & bar specials served daily from 7:30 AM to 10:00 PM.',
      contentJson: {
        pairingBadge: 'Chef & Barista Favorites',
        pairingTitle: 'Popular Pairings at Classico',
        pairingDescription:
          'Ask our staff for today’s evening board specials—from warm cappuccinos alongside grilled club sandwiches in the morning to crisp spiced chatpate and chilled iced mint tea in the garden.',
        pairingDuo1: 'Signature Cappuccino + Grilled Club Sandwich & Fries',
        pairingDuo2: 'Iced Lemon Mint Tea + Spiced Nepali Chatpate',
      },
    },
    {
      slug: 'about',
      scriptLabel: 'Airport Road, Biratnagar',
      title: 'The Story of Classico',
      description:
        'A welcoming Coffee House, Restro Garden, Grill & Bed & Breakfast built for relaxed mornings and memorable Biratnagar evenings.',
      contentJson: {
        storyScript: 'Rooted in Biratnagar',
        storyHeadline: 'Coffee House by Morning, Restro Garden by Dusk',
        storyImageUrl:
          'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069462/classico-brew-and-grill/garden-evening.jpg',
        storyOverlayTitle: 'Classico Restro Garden',
        storyOverlaySubtitle: 'Airport Road, Biratnagar-4',
        chapters: storyChapters,
        valuesScript: 'What Defines Us',
        valuesTitle: 'Our Four Pillars of Hospitality',
        valuesDescription:
          'Every cup pulled at dawn and every platter served in the courtyard reflects genuine warmth, honest flavors, and inviting space.',
        values: brandValues,
        leadersScript: 'The People Behind Classico',
        leadersTitle: 'At Your Service Every Day',
        leadersDescription:
          'From our morning espresso baristas to our evening kitchen and bar crew, our team is dedicated to attentive, welcoming service.',
        leaders: craftLeaders.map((l) => ({
          id: l.id,
          name: l.name,
          role: l.role,
          specialty: l.specialty,
          bio: l.bio,
          imageUrl: l.image,
        })),
        testimonialsScript: 'Guest Feedback',
        testimonialsTitle: 'Voices from Biratnagar',
        testimonials,
      },
    },
    {
      slug: 'gallery',
      scriptLabel: 'Visual Journal',
      title: 'Moments at Classico',
      description:
        'Step inside our Airport Road coffee house, shaded restro garden, illuminated upper mezzanine deck, and fresh kitchen favorites.',
      contentJson: {
        homePreviewScript: 'The Restro Garden',
        homePreviewTitle: 'Atmosphere, Coffee & Courtyard Glimpses',
        homePreviewDescription:
          'Illuminated evening mezzanine decks, shaded garden sofas beneath prayer flags, La Cimbali espresso shots, and fresh kitchen plates.',
      },
    },
    {
      slug: 'contact',
      scriptLabel: "We'd Love to Hear From You",
      title: 'Contact & Visit Us',
      description:
        'Questions about table reservations, group gatherings, takeaway orders, or Bed & Breakfast stays near Biratnagar Airport? Get in touch with our team.',
      contentJson: {
        deskTitle: 'Hospitality Desk',
        deskSubtitle:
          'Airport Road, Biratnagar-4 • Also reachable at +977 970-9129167',
        formScript: 'Send a Note',
        formTitle: 'Direct Inquiry Form',
      },
    },
    {
      slug: 'reservations',
      scriptLabel: 'Reserve Your Table',
      title: 'Book a Table',
      description:
        'Pick your preferred setting—from our breezy Restro Garden Courtyard and shaded Covered Garden Lounge to the elevated Upper Mezzanine Deck.',
      contentJson: {
        seatingZones,
        timeGroups: [
          {
            label: 'Morning Coffee & Breakfast',
            slots: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
          },
          {
            label: 'Midday Lunch & Café',
            slots: ['12:30 PM', '1:30 PM', '2:30 PM', '4:00 PM'],
          },
          {
            label: 'Evening Restro Garden & Grill',
            slots: ['5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:00 PM'],
          },
        ],
        occasions: [
          'Casual Dining',
          'Coffee Meetup',
          'Birthday Celebration',
          'Family Dinner',
          'Group Hangout',
        ],
      },
    },
  ];

  for (const page of pagesSeed) {
    await prisma.pageSection.upsert({
      where: { slug: page.slug },
      update: {},
      create: {
        slug: page.slug,
        scriptLabel: page.scriptLabel,
        title: page.title,
        description: page.description,
        contentJson: page.contentJson as unknown as object,
        published: true,
      },
    });
  }

  // 5. Menu Categories & Items
  const catIdMap = new Map<string, string>();
  for (let i = 0; i < menuCategories.length; i++) {
    const cat = menuCategories[i];
    const saved = await prisma.menuCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        name: cat.name,
        scriptLabel: cat.scriptLabel,
        description: cat.description,
        sortOrder: i + 1,
        published: true,
      },
    });
    catIdMap.set(cat.slug, saved.id);
  }

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const categoryId = catIdMap.get(item.category);
    if (!categoryId) continue;
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.image,
        featured: Boolean(item.featured),
        tags: item.tags ?? [],
        pairingNote: item.pairingNote ?? null,
        sortOrder: i + 1,
        published: true,
        categoryId,
      },
    });
  }

  // 6. Gallery Images
  const galleryCount = await prisma.galleryImage.count();
  if (galleryCount === 0) {
    for (let i = 0; i < galleryItems.length; i++) {
      const g = galleryItems[i];
      await prisma.galleryImage.create({
        data: {
          title: g.title,
          caption: g.caption,
          category: g.category,
          imageUrl: g.image,
          aspect: g.aspect ?? 'square',
          sortOrder: i + 1,
          published: true,
        },
      });
    }
  }

  // 7. Blog Posts
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    const initialBlogPosts = [
      {
        slug: 'morning-espresso-la-cimbali-biratnagar',
        title: 'Morning Espresso Craft on Airport Road: Inside Our Coffee House',
        excerpt:
          'Starting at 7:30 AM daily, how our Italian La Cimbali M23 UP bar serves rich double espressos, creamy cappuccinos, and smooth Americanos for Biratnagar coffee lovers.',
        content: `Great mornings in Biratnagar begin with fresh air, friendly company, and an espresso pulled with care. At Classico Brew & Grill, our Coffee House opens bright and early at 7:30 AM.

### Brewed on the La Cimbali M23 UP
Every espresso, cappuccino, and Americano starts with freshly ground beans extracted under steady pressure on our La Cimbali M23 UP machine—delivering thick, aromatic golden crema in every cup.

### From Quick Airport Stops to Slow Catch-Ups
Whether you are catching a morning flight at nearby Biratnagar Airport or meeting friends for a quiet cappuccino and grilled club sandwich, our front bar and sunny courtyard tables welcome walk-ins all day.`,
        coverImage:
          'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069460/classico-brew-and-grill/espresso-la-cimbali.jpg',
        author: 'Classico Barista Team',
        authorRole: 'Coffee House',
        category: 'Coffee & Brews',
        readTime: '3 min read',
        sortOrder: 1,
        published: true,
      },
      {
        slug: 'evenings-in-the-restro-garden-and-mezzanine',
        title: 'Dusk in the Restro Garden: Courtyard Tables & Our Mezzanine Deck',
        excerpt:
          'As evening settles over Airport Road, lantern-lit garden seating, warm mezzanine lights, and sizzling chef specials transform Classico into a relaxing hangout.',
        content: `When the afternoon heat softens into evening twilight, Classico Brew & Grill comes alive under soft architectural lights and hanging lanterns.

### Spaces for Every Group
Guests can settle into our shaded garden lounge lined with cushioned seating and colorful prayer flags, pull up chairs in the open-air courtyard, or climb up to our illuminated two-story mezzanine deck for sunset views.

### Evening Chef & Bar Specials
Evenings bring our chalkboard specials to life—featuring Mutton Cheese Finger, Chicken Khumbi, Singapore Mushroom, and Stuffed Grill Paneer paired with Devil Mojito mocktails and Pink Lady cocktails.`,
        coverImage:
          'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069465/classico-brew-and-grill/mezzanine-bar-evening.jpg',
        author: 'Classico Hospitality Team',
        authorRole: 'Restro Garden',
        category: 'Atmosphere & Garden',
        readTime: '4 min read',
        sortOrder: 2,
        published: true,
      },
      {
        slug: 'fresh-afternoon-bites-and-iced-refreshers',
        title: 'Afternoon Favorites: Iced Lemon Mint Tea, Chatpate & Grilled Sandwiches',
        excerpt:
          'A closer look at the refreshing iced teas, crisp Nepali chatpate, and golden toasted club sandwiches our guests love sharing beneath the pergola.',
        content: `Midday and late afternoon are made for easygoing plates shared outdoors. Our menu blends beloved Nepali café flavors with satisfying grilled comfort classics.

### Crisp, Tangy & Fresh
Our Spiced Nepali Chatpate balances crunchy puffed rice, fresh diced tomatoes, crisp herbs, and lively seasoning, while our Grilled Club Sandwich arrives hot off the press with golden fries and house dipping sauce.

### Beat the Afternoon Warmth
Paired with a tall frosted glass of Iced Lemon Mint Tea garnished with fresh mint leaves, it is one of the simplest ways to unwind with friends in Biratnagar.`,
        coverImage:
          'https://res.cloudinary.com/m2ns7bvs/image/upload/v1795069463/classico-brew-and-grill/garden-lounge-day.jpg',
        author: 'Classico Kitchen Team',
        authorRole: 'Kitchen & Bar',
        category: 'Kitchen & Drinks',
        readTime: '3 min read',
        sortOrder: 3,
        published: true,
      },
    ];

    for (const post of initialBlogPosts) {
      await prisma.blogPost.create({ data: post });
    }
  }

  // 8. FAQ Items
  const faqCount = await prisma.faqItem.count();
  if (faqCount === 0) {
    const initialFaqItems = [
      {
        question: 'Where is Classico Brew & Grill located in Biratnagar?',
        answer:
          'We are located along Airport Road in Biratnagar-4, Morang (56613), right near the Biratnagar Airport area. You can open exact Google Maps directions from our Contact page or footer.',
        category: 'Location & Hours',
        sortOrder: 1,
        published: true,
      },
      {
        question: 'What are your daily opening hours?',
        answer:
          'Classico Brew & Grill is open every day of the week from 7:30 AM to 10:00 PM—serving early morning coffee and breakfast through evening grill specials and dinner.',
        category: 'Location & Hours',
        sortOrder: 2,
        published: true,
      },
      {
        question: 'Do I need a reservation, or are walk-ins welcome?',
        answer:
          'Walk-in guests are always welcome at our Coffee House, Covered Garden Lounge, and Courtyard. For weekend evenings or larger groups on the Upper Mezzanine Deck, you can reserve online or call +977 982-7326578 / +977 970-9129167.',
        category: 'Reservations & Seating',
        sortOrder: 3,
        published: true,
      },
      {
        question: 'Is guest parking available on-site?',
        answer:
          'Yes! We have both convenient motorbike parking out front along Airport Road and dedicated covered vehicle parking beside our Restro Garden.',
        category: 'Location & Hours',
        sortOrder: 4,
        published: true,
      },
      {
        question: 'What kind of seating areas do you offer?',
        answer:
          'Guests can choose between our open-air Restro Garden Courtyard, our shaded Covered Garden Lounge with cushioned sofas, the elevated Upper Mezzanine Deck, or the indoor Coffee House & Bar counter.',
        category: 'Reservations & Seating',
        sortOrder: 5,
        published: true,
      },
      {
        question: 'What food and drinks are Classico known for?',
        answer:
          'We serve freshly pulled espresso, cappuccinos, and Americanos on our La Cimbali espresso machine alongside chilled iced teas, grilled sandwiches, momos, chatpate, pizzas, and evening specials like Mutton Cheese Finger, Chicken Khumbi, Stuffed Grill Paneer, and Devil Mojito.',
        category: 'Food & Coffee',
        sortOrder: 6,
        published: true,
      },
      {
        question: 'Do you offer takeaway, delivery, or group celebrations?',
        answer:
          'Yes, we provide dine-in, takeaway, and local delivery options, and we happily host birthdays, casual get-togethers, and small celebrations. Reach us at theclassico777@gmail.com or call +977 982-7326578.',
        category: 'Events & Services',
        sortOrder: 7,
        published: true,
      },
      {
        question: 'How can I inquire about Bed & Breakfast availability?',
        answer:
          'For Bed & Breakfast room inquiries near Biratnagar Airport, please email us at theclassico777@gmail.com or call +977 982-7326578 / +977 970-9129167 directly.',
        category: 'Events & Services',
        sortOrder: 8,
        published: true,
      },
    ];

    for (const faq of initialFaqItems) {
      await prisma.faqItem.create({ data: faq });
    }
  }

  // 9. Customer Reviews
  const reviewsCount = await prisma.customerReview.count();
  if (reviewsCount === 0) {
    const initialReviews = [
      {
        authorName: 'Biratnagar Coffee Regular',
        authorRole: 'Google Maps Review Highlight',
        rating: 5,
        comment:
          'Warm and inviting atmosphere near the airport with great fresh coffee and well-prepared food. One of the best outdoor garden hangout spots in Biratnagar.',
        approved: true,
        published: true,
      },
      {
        authorName: 'Evening Garden Visitor',
        authorRole: 'Google Maps Review Highlight',
        rating: 4,
        comment:
          'Cool evening ambiance in the open courtyard and upper deck. Pleasant, attentive staff and fast service for coffee, sandwiches, and evening snacks.',
        approved: true,
        published: true,
      },
      {
        authorName: 'Airport Road Guest',
        authorRole: 'Dine-In Patron',
        rating: 5,
        comment:
          'Ideal place for morning espresso before a flight or catching up with friends over iced mint tea and spiced chatpate under the shaded pergola.',
        approved: true,
        published: true,
      },
      {
        authorName: 'Weekend Group Table',
        authorRole: 'Restro Garden Guest',
        rating: 4,
        comment:
          'Comfortable outdoor seating, friendly hospitality, and tasty grill specials. Really convenient parking and a relaxing vibe right on Airport Road.',
        approved: true,
        published: true,
      },
    ];

    for (const r of initialReviews) {
      await prisma.customerReview.create({ data: r });
    }
  }
}
