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
    await prisma.heroContent.create({
      data: {
        badgeText: 'Botanical Roastery & Wood-Fired Kitchen',
        scriptAccent: 'Crafted with Calm & Ember',
        headline: siteConfig.tagline,
        subheadline: siteConfig.subTagline,
        primaryCtaLabel: 'Book a Table',
        primaryCtaHref: '/reservations',
        secondaryCtaLabel: 'Explore Our Menu',
        secondaryCtaHref: '/menu',
        heroImageUrl: '/images/hero-latte.png',
        floatingCard1Title: 'Single-Origin Espresso',
        floatingCard1Subtitle: 'Botanical Infusions',
        floatingCard2Title: 'White-Oak Grill',
        floatingCard2Subtitle: 'Wood-Fired Evenings',
        pillarsJson: [
          {
            label: 'Roastery',
            sublabel: 'From 7:30 AM Daily',
            iconName: 'Coffee',
          },
          {
            label: 'Oak Hearth',
            sublabel: 'Dry-Aged & Coastal',
            iconName: 'Flame',
          },
          {
            label: 'Conservatory',
            sublabel: 'Willow Creek Quarter',
            iconName: 'Leaf',
          },
        ],
        signatureSplitJson: {
          scriptLabel: 'Two Timeless Crafts',
          title: 'From Dawn Espresso to Ember-Kissed Evenings',
          description:
            'Classico bridges the quiet serenity of a specialty conservatory café with the warmth and richness of a classic wood-fired dining room.',
          items: [
            {
              id: 'brews',
              script: 'Morning & Midday',
              title: 'Signature Artisanal Brews',
              subtitle: 'Small-Batch Roastery & Botanical Espresso Bar',
              description:
                'Start your morning beneath natural conservatory light with precision V60 pour-overs, cold-steeped rosemary tonics, and our signature Pistachio Sage Latte crafted with house-made infusions.',
              highlights: [
                'Direct-trade Ethiopian & Colombian single origins',
                'House-steeped pistachio, sage & Madagascar vanilla syrups',
                'Fresh-baked sourdough focaccia & morning pastries',
              ],
              imageUrl:
                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
              ctaLabel: 'Explore Coffee & Brews',
              ctaHref: '/menu?category=coffee-brews',
              accentColor: 'teal',
            },
            {
              id: 'grill',
              script: 'Lunch & Candlelit Dinner',
              title: 'White-Oak Grill Specials',
              subtitle: 'Open-Hearth Cuts, Coastal Seafood & Handmade Mains',
              description:
                'As afternoon turns to dusk, our white oak and applewood hearth comes alive. Savor 28-day dry-aged ribeye, cedar-seared Atlantic salmon, and herb-crusted lamb finished with cultured herb butter.',
              highlights: [
                'Seasoned white oak & fragrant Pacific fruitwood embers',
                'Pasture-raised prime cuts & sustainable coastal catches',
                'Handmade pappardelle, truffle risotto & blistered sides',
              ],
              imageUrl:
                'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
              ctaLabel: 'Explore Grill & Mains',
              ctaHref: '/menu?category=grill',
              accentColor: 'sage',
            },
          ],
        },
        ctaBannerJson: {
          badgeText: 'Morning Coffee • Candlelit Grill • Private Gatherings',
          scriptAccent: 'Save Your Seat at Classico',
          headline: 'Ready for Slow Mornings or Wood-Fired Evenings?',
          description:
            'Reserve your preferred space in our Botanical Conservatory, Fireside Grill Lounge, or Garden Terrace in just a few clicks.',
          primaryCtaLabel: 'Book a Table Now',
          primaryCtaHref: '/reservations',
          secondaryCtaLabel: 'Browse the Full Menu',
          secondaryCtaHref: '/menu',
        },
        published: true,
      },
    });
  }

  // 4. Page Sections (Menu, About, Gallery, Contact, Reservations)
  const pagesSeed = [
    {
      slug: 'menu',
      scriptLabel: 'Seasonal Roasts & Open-Flame Kitchen',
      title: 'Our Menu',
      description:
        'Every dish and brew at Classico is crafted to order — uniting single-origin espresso artistry with white-oak grilled classics.',
      contentJson: {
        pairingBadge: 'Sommelier & Barista Pairings',
        pairingTitle: 'Curated Tasting Duos',
        pairingDescription:
          'Ask your server about our complimentary pairing recommendations—from bright Ethiopian pour-overs alongside warm Basque cheesecake to smoky rosemary spritzes crafted to balance white-oak aged ribeye.',
        pairingDuo1: 'Pistachio Latte + Espresso Tiramisu',
        pairingDuo2: 'Prime Ribeye + Rosemary Grapefruit Spritz',
      },
    },
    {
      slug: 'about',
      scriptLabel: 'Our Heritage & Philosophy',
      title: 'The Story of Classico',
      description:
        'Born from a passion for unhurried mornings and vibrant open-flame dinners, Classico Brew & Grill is an evergreen sanctuary of craft.',
      contentJson: {
        storyScript: 'Rooted in Botanical Calm',
        storyHeadline: 'A Place Where Every Hour Feels Considered',
        storyImageUrl:
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        storyOverlayTitle: 'Dual-Craft Conservatory',
        storyOverlaySubtitle: 'Specialty Roastery & Wood-Fired Kitchen',
        chapters: storyChapters,
        valuesScript: 'What Guides Us',
        valuesTitle: 'Our Four Pillars of Craft',
        valuesDescription:
          'Every cup pulled and every plate lifted from the hearth reflects our dedication to honest sourcing and serene hospitality.',
        values: brandValues,
        leadersScript: 'The Artisans',
        leadersTitle: 'Meet the Minds Behind the Bar & Hearth',
        leadersDescription:
          'Our roastery and kitchen are led by craftspeople who treat provenance and patience as essential ingredients.',
        leaders: craftLeaders.map((l) => ({
          id: l.id,
          name: l.name,
          role: l.role,
          specialty: l.specialty,
          bio: l.bio,
          imageUrl: l.image,
        })),
        testimonialsScript: 'Kind Words',
        testimonialsTitle: 'Voices from Our Table',
        testimonials,
      },
    },
    {
      slug: 'gallery',
      scriptLabel: 'Visual Journal',
      title: 'Moments at Classico',
      description:
        'Step inside our botanical conservatory, morning espresso bar, and glowing white-oak hearth.',
      contentJson: {
        homePreviewScript: 'The Sanctuary',
        homePreviewTitle: 'Atmosphere & Conservatory Glimpses',
        homePreviewDescription:
          'Soft sage banquettes, warm oak tables, indoor olive greenery, and the ambient glow of the open hearth.',
      },
    },
    {
      slug: 'contact',
      scriptLabel: "We'd Love to Hear From You",
      title: 'Contact & Visit Us',
      description:
        'Questions about private conservatory dining, bespoke coffee tastings, or upcoming gatherings? Reach out to our hospitality team.',
      contentJson: {
        deskTitle: 'Hospitality Desk',
        deskSubtitle: "Willow Creek Quarter's botanical café & grill.",
        formScript: 'Send a Note',
        formTitle: 'Direct Inquiry Form',
      },
    },
    {
      slug: 'reservations',
      scriptLabel: 'Reserve Your Sanctuary',
      title: 'Book a Table',
      description:
        'Choose your preferred dining zone—from our sunlit Botanical Conservatory to a seat beside the glowing white-oak hearth.',
      contentJson: {
        seatingZones,
        timeGroups: [
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
        ],
        occasions: [
          'Casual Dining',
          'Birthday Celebration',
          'Anniversary',
          'Business Coffee / Lunch',
          'Date Night',
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
        slug: 'art-of-slow-roasting',
        title: 'The Art of Slow Roasting: Sourcing & Crafting Single-Origin Coffees',
        excerpt:
          'From high-altitude volcanic terraces to our copper drum roaster: how patience and precise airflow bring out notes of jasmine, stone fruit, and dark chocolate.',
        content: `Coffee roasting at Classico is not merely a process—it is a sensory ritual that starts thousands of miles away on steep, mist-cloaked mountain terraces.

### Direct Trade Relationships
We partner directly with family-run estates across Yirgacheffe, Huila, and Antigua. By cutting out intermediaries, we ensure growers receive ethical premiums while securing lots harvested at the apex of ripeness.

### The Thermal Profile
Inside our vintage-inspired copper drum roaster, temperatures are monitored second-by-second. We favor a medium-light roast curve that preserves delicate floral top notes without sacrificing body.

### Brewing at Home
To experience our beans at their best, grind immediately before brewing, use filtered water at 93°C (200°F), and allow a gentle 45-second bloom to unlock trapped carbon and sweetness.`,
        coverImage:
          'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
        author: 'Elias Vance',
        authorRole: 'Head Roaster',
        category: 'Roastery & Brews',
        readTime: '4 min read',
        sortOrder: 1,
        published: true,
      },
      {
        slug: 'wood-smoke-and-season',
        title: 'Wood, Smoke, and Season: Unlocking Deep Flavors with White-Oak Fire',
        excerpt:
          'Why the ancient art of open-fire hearth cooking creates texture and nuance that modern kitchen stoves simply cannot replicate.',
        content: `Before gas burners and electric ovens, cooking was a dialogue between embers, cast iron, and patience. At Classico, our hearth burns throughout the day and evening.

### The Selection of Oak & Applewood
We source sustainably harvested white oak and cured applewood. Oak generates the steady, fierce 700°F coal base needed to sear dry-aged cuts, while applewood contributes a gentle, fruity aromatic smoke.

### The Art of Temperature Zones
Our grill master works across three distinct elevations: searing directly over incandescent embers, slow-roasting root vegetables in copper pans on the perimeter, and resting meats on the raised warming lattice.

### Respecting the Ingredient
We let high-grade ingredients speak with minimal interference: flaky sea salt, cold-pressed olive oil, fresh thyme from our herb garden, and the unmistakable kiss of live wood smoke.`,
        coverImage:
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        author: 'Chef Marcus Hayes',
        authorRole: 'Executive Chef',
        category: 'Wood-Fired Hearth',
        readTime: '5 min read',
        sortOrder: 2,
        published: true,
      },
      {
        slug: 'botanical-tonics-cold-brew',
        title: 'Botanical Tonics & Cold Brew: Crafting Refreshment for Sunlit Afternoons',
        excerpt:
          'How house-distilled rosemary syrup, citrus oleo-saccharum, and single-origin cold brew unite into layered non-alcoholic refreshments.',
        content: `When the midday sun floods our Glass Conservatory, guests often seek something uniquely refreshing: the invigorating depth of specialty coffee paired with lively herbs and botanicals.

### The 18-Hour Slow Cold Drip
Unlike flash-chilled coffee, our signature cold brew is extracted drop-by-drop over 18 hours using ice-cold mountain spring water. This prevents bitter tannins from extracting, leaving a velvety body with cocoa and blueberry sweetness.

### Garden Herb Infusions
Our beverage team harvests fresh rosemary, lavender, and mint daily from the courtyard planters. By infusing these herbs at low temperatures, we capture bright essential oils without herbal bitterness.

### The Perfect Glass
Served in chilled crystal highballs over crystalline hand-carved ice, accompanied by dried blood orange wheels and aromatic botanical smoke.`,
        coverImage:
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
        author: 'Elena Rostova',
        authorRole: 'Beverage Director',
        category: 'Beverage Craft',
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
        question: 'Do I need a reservation to visit Classico Brew & Grill?',
        answer:
          'Reservations are recommended for dinner and weekend brunch, especially in our Glass Conservatory and Hearth dining rooms. Walk-ins are always welcomed at our Espresso Bar, Garden Veranda, and counter seating.',
        category: 'Reservations & Seating',
        sortOrder: 1,
        published: true,
      },
      {
        question: 'Can you accommodate dietary restrictions and food allergies?',
        answer:
          'Absolutely. Our menu clearly marks Vegetarian, Vegan, and Gluten-Free selections. Please mention any allergies or dietary preferences to your server or note them in your table reservation booking.',
        category: 'Dining & Kitchen',
        sortOrder: 2,
        published: true,
      },
      {
        question: 'Where do you source your coffee beans?',
        answer:
          'We directly partner with smallholder farms across Ethiopia, Colombia, and Guatemala. All beans are roasted in-house in small 5kg batches to ensure peak aroma and nuance.',
        category: 'Roastery & Brews',
        sortOrder: 3,
        published: true,
      },
      {
        question: 'What wood do you use for your wood-fired grill?',
        answer:
          'We burn seasoned white oak and wild applewood. This imparts a balanced, subtly sweet aroma that accentuates prime meats, fresh seafood, and roasted hearth vegetables without overpowering them.',
        category: 'Dining & Kitchen',
        sortOrder: 4,
        published: true,
      },
      {
        question: 'Do you host private events, celebrations, or corporate gatherings?',
        answer:
          'Yes. Our Glass Conservatory and Mezzanine are available for private parties, tasting dinners, and celebrations. Contact events@classicobrewgrill.com or use our reservation form.',
        category: 'Private Events',
        sortOrder: 5,
        published: true,
      },
      {
        question: 'What are your operating hours for coffee versus the grill?',
        answer:
          'Our Specialty Roastery & Espresso Bar opens early from 7:30 AM daily. Wood-Fired Hearth and Kitchen service begins at 11:30 AM for lunch and continues through late evening dinner service.',
        category: 'General',
        sortOrder: 6,
        published: true,
      },
      {
        question: 'Is there parking available on-site?',
        answer:
          'We offer dedicated guest parking behind our heritage building along with bicycle stands in the front garden arbor.',
        category: 'General',
        sortOrder: 7,
        published: true,
      },
      {
        question: 'Can I purchase fresh coffee beans or merchandise to take home?',
        answer:
          'Yes, our whole bean coffees (roasted within the week), custom ceramic mugs, and brew gear are available for purchase at the front roastery counter.',
        category: 'Roastery & Brews',
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
        authorName: 'Julian Montgomery',
        authorRole: 'Food & Travel Critic',
        rating: 5,
        comment:
          'The dry-aged ribeye seared over white oak is phenomenal, but the surprise was their Geisha pour-over. A rare balance of culinary excellence and genuine warmth.',
        approved: true,
        published: true,
      },
      {
        authorName: 'Sophia Chen',
        authorRole: 'Local Architect & Coffee Enthusiast',
        rating: 5,
        comment:
          'The glasshouse conservatory is easily the most atmospheric spot in town for a morning espresso and weekend brunch. The attention to natural light and greenery is inspiring.',
        approved: true,
        published: true,
      },
      {
        authorName: 'David K. Sharma',
        authorRole: 'Neighborhood Regular',
        rating: 5,
        comment:
          'Outstanding hospitality. The smoked salt caramel tart and botanical tonics are now weekly rituals for my family. The staff treats you like an old friend from day one.',
        approved: true,
        published: true,
      },
      {
        authorName: 'Claire & Thomas',
        authorRole: 'Anniversary Dinner Guests',
        rating: 5,
        comment:
          'Celebrated our anniversary by the hearth fire. Every course was flawless, and the staff made our night feel truly special. We will remember this evening for years.',
        approved: true,
        published: true,
      },
      {
        authorName: 'Marcus B.',
        authorRole: 'First-Time Visitor',
        rating: 5,
        comment:
          'Visited for Sunday brunch. The brioche french toast and flat white were incredible. Fast service even during rush hour!',
        approved: false,
        published: false,
      },
    ];

    for (const r of initialReviews) {
      await prisma.customerReview.create({ data: r });
    }
  }
}
