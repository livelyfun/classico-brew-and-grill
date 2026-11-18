import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getAdminBundle } from '@/lib/cms';
import { prisma } from '@/lib/prisma';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function revalidateAllPublic() {
  revalidatePath('/', 'layout');
  revalidatePath('/');
  revalidatePath('/menu');
  revalidatePath('/about');
  revalidatePath('/gallery');
  revalidatePath('/contact');
  revalidatePath('/reservations');
  revalidatePath('/blog');
  revalidatePath('/faq');
}

export async function GET() {
  const session = getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const bundle = await getAdminBundle();
  return NextResponse.json(bundle);
}

export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      entity:
        | 'category'
        | 'menuItem'
        | 'gallery'
        | 'settings'
        | 'hero'
        | 'page'
        | 'reservation'
        | 'blog'
        | 'faq'
        | 'review';
      action:
        | 'create'
        | 'update'
        | 'delete'
        | 'togglePublish'
        | 'approveReview';
      id?: string;
      data?: Record<string, unknown>;
    };

    const { entity, action, id, data = {} } = body;

    // 1. MENU CATEGORIES
    if (entity === 'category') {
      if (action === 'create') {
        const name = String(data.name ?? '').trim();
        const slug = String(data.slug ?? '').trim() || slugify(name);
        await prisma.menuCategory.create({
          data: {
            name,
            slug,
            scriptLabel: String(data.scriptLabel ?? ''),
            description: String(data.description ?? ''),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'update' && id) {
        await prisma.menuCategory.update({
          where: { id },
          data: {
            name: String(data.name ?? ''),
            slug: String(data.slug ?? ''),
            scriptLabel: String(data.scriptLabel ?? ''),
            description: String(data.description ?? ''),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'togglePublish' && id) {
        await prisma.menuCategory.update({
          where: { id },
          data: { published: Boolean(data.published) },
        });
      } else if (action === 'delete' && id) {
        await prisma.menuCategory.delete({ where: { id } });
      }
    }

    // 2. MENU ITEMS
    else if (entity === 'menuItem') {
      if (action === 'create') {
        const name = String(data.name ?? '').trim();
        const slug = `${slugify(name)}-${Date.now().toString().slice(-4)}`;
        const tags = Array.isArray(data.tags)
          ? data.tags.map(String)
          : String(data.tags ?? '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);
        await prisma.menuItem.create({
          data: {
            slug,
            name,
            description: String(data.description ?? ''),
            price: Number(data.price ?? 0),
            imageUrl: String(data.imageUrl ?? ''),
            featured: Boolean(data.featured ?? false),
            tags,
            pairingNote: data.pairingNote ? String(data.pairingNote) : null,
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
            categoryId: String(data.categoryId),
          },
        });
      } else if (action === 'update' && id) {
        const tags = Array.isArray(data.tags)
          ? data.tags.map(String)
          : String(data.tags ?? '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);
        await prisma.menuItem.update({
          where: { id },
          data: {
            name: String(data.name ?? ''),
            description: String(data.description ?? ''),
            price: Number(data.price ?? 0),
            imageUrl: String(data.imageUrl ?? ''),
            featured: Boolean(data.featured ?? false),
            tags,
            pairingNote: data.pairingNote ? String(data.pairingNote) : null,
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
            categoryId: String(data.categoryId),
          },
        });
      } else if (action === 'togglePublish' && id) {
        await prisma.menuItem.update({
          where: { id },
          data: { published: Boolean(data.published) },
        });
      } else if (action === 'delete' && id) {
        await prisma.menuItem.delete({ where: { id } });
      }
    }

    // 3. GALLERY IMAGES
    else if (entity === 'gallery') {
      if (action === 'create') {
        await prisma.galleryImage.create({
          data: {
            title: String(data.title ?? ''),
            caption: String(data.caption ?? ''),
            category: String(data.category ?? 'atmosphere'),
            imageUrl: String(data.imageUrl ?? ''),
            aspect: String(data.aspect ?? 'square'),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'update' && id) {
        await prisma.galleryImage.update({
          where: { id },
          data: {
            title: String(data.title ?? ''),
            caption: String(data.caption ?? ''),
            category: String(data.category ?? 'atmosphere'),
            imageUrl: String(data.imageUrl ?? ''),
            aspect: String(data.aspect ?? 'square'),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'togglePublish' && id) {
        await prisma.galleryImage.update({
          where: { id },
          data: { published: Boolean(data.published) },
        });
      } else if (action === 'delete' && id) {
        await prisma.galleryImage.delete({ where: { id } });
      }
    }

    // 4. SITE SETTINGS
    else if (entity === 'settings' && id && action === 'update') {
      await prisma.siteSettings.update({
        where: { id },
        data: {
          brandName: String(data.brandName ?? ''),
          shortName: String(data.shortName ?? ''),
          tagline: String(data.tagline ?? ''),
          subTagline: String(data.subTagline ?? ''),
          logoUrl: String(data.logoUrl ?? ''),
          street: String(data.street ?? ''),
          district: String(data.district ?? ''),
          city: String(data.city ?? ''),
          fullAddress: String(data.fullAddress ?? ''),
          mapsQueryUrl: String(data.mapsQueryUrl ?? ''),
          mapsEmbedUrl: String(data.mapsEmbedUrl ?? ''),
          phone: String(data.phone ?? ''),
          email: String(data.email ?? ''),
          eventsEmail: String(data.eventsEmail ?? ''),
          instagramUrl: String(data.instagramUrl ?? ''),
          facebookUrl: String(data.facebookUrl ?? ''),
          tripadvisorUrl: String(data.tripadvisorUrl ?? ''),
          roasteryHours: String(data.roasteryHours ?? ''),
          grillHours: String(data.grillHours ?? ''),
          openingHoursJson: (data.openingHours ?? []) as object,
          published: Boolean(data.published ?? true),
        },
      });
    }

    // 5. HERO & HOMEPAGE CONTENT
    else if (entity === 'hero' && id && action === 'update') {
      const heroImages = Array.isArray(data.heroImages)
        ? data.heroImages.map((u) => String(u).trim()).filter(Boolean)
        : [];
      const ctaObj =
        data.ctaBanner && typeof data.ctaBanner === 'object'
          ? (data.ctaBanner as Record<string, unknown>)
          : {};

      await prisma.heroContent.update({
        where: { id },
        data: {
          badgeText: String(data.badgeText ?? ''),
          scriptAccent: String(data.scriptAccent ?? ''),
          headline: String(data.headline ?? ''),
          subheadline: String(data.subheadline ?? ''),
          primaryCtaLabel: String(data.primaryCtaLabel ?? ''),
          primaryCtaHref: String(data.primaryCtaHref ?? ''),
          secondaryCtaLabel: String(data.secondaryCtaLabel ?? ''),
          secondaryCtaHref: String(data.secondaryCtaHref ?? ''),
          heroImageUrl: heroImages[0] || String(data.heroImageUrl ?? ''),
          floatingCard1Title: String(data.floatingCard1Title ?? ''),
          floatingCard1Subtitle: String(data.floatingCard1Subtitle ?? ''),
          floatingCard2Title: String(data.floatingCard2Title ?? ''),
          floatingCard2Subtitle: String(data.floatingCard2Subtitle ?? ''),
          pillarsJson: (data.pillars ?? []) as object,
          signatureSplitJson: (data.signatureSplit ?? {}) as object,
          ctaBannerJson: { ...ctaObj, heroImages } as object,
          published: Boolean(data.published ?? true),
        },
      });
    }

    // 6. PAGE SECTIONS (About, Menu, Gallery, Contact, Reservations)
    else if (entity === 'page' && id) {
      if (action === 'update') {
        await prisma.pageSection.update({
          where: { id },
          data: {
            scriptLabel: String(data.scriptLabel ?? ''),
            title: String(data.title ?? ''),
            description: String(data.description ?? ''),
            contentJson: (data.content ?? {}) as object,
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'togglePublish') {
        await prisma.pageSection.update({
          where: { id },
          data: { published: Boolean(data.published) },
        });
      }
    }

    // 7. RESERVATIONS
    else if (entity === 'reservation' && id) {
      if (action === 'update') {
        await prisma.reservation.update({
          where: { id },
          data: {
            status: String(data.status ?? 'Confirmed'),
          },
        });
      } else if (action === 'delete') {
        await prisma.reservation.delete({ where: { id } });
      }
    }

    // 8. BLOG POSTS
    else if (entity === 'blog') {
      if (action === 'create') {
        const title = String(data.title ?? '').trim();
        const slug =
          String(data.slug ?? '').trim() ||
          `${slugify(title)}-${Date.now().toString().slice(-4)}`;
        await prisma.blogPost.create({
          data: {
            slug,
            title,
            excerpt: String(data.excerpt ?? ''),
            content: String(data.content ?? ''),
            coverImage: String(data.coverImage ?? ''),
            author: String(data.author ?? 'Classico Team'),
            authorRole: data.authorRole ? String(data.authorRole) : null,
            category: String(data.category ?? 'Roastery & Brews'),
            readTime: String(data.readTime ?? '4 min read'),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'update' && id) {
        await prisma.blogPost.update({
          where: { id },
          data: {
            title: String(data.title ?? ''),
            slug: String(data.slug ?? ''),
            excerpt: String(data.excerpt ?? ''),
            content: String(data.content ?? ''),
            coverImage: String(data.coverImage ?? ''),
            author: String(data.author ?? 'Classico Team'),
            authorRole: data.authorRole ? String(data.authorRole) : null,
            category: String(data.category ?? 'Roastery & Brews'),
            readTime: String(data.readTime ?? '4 min read'),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'togglePublish' && id) {
        await prisma.blogPost.update({
          where: { id },
          data: { published: Boolean(data.published) },
        });
      } else if (action === 'delete' && id) {
        await prisma.blogPost.delete({ where: { id } });
      }
    }

    // 9. FAQ ITEMS
    else if (entity === 'faq') {
      if (action === 'create') {
        await prisma.faqItem.create({
          data: {
            question: String(data.question ?? '').trim(),
            answer: String(data.answer ?? '').trim(),
            category: String(data.category ?? 'General').trim(),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'update' && id) {
        await prisma.faqItem.update({
          where: { id },
          data: {
            question: String(data.question ?? '').trim(),
            answer: String(data.answer ?? '').trim(),
            category: String(data.category ?? 'General').trim(),
            sortOrder: Number(data.sortOrder ?? 0),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'togglePublish' && id) {
        await prisma.faqItem.update({
          where: { id },
          data: { published: Boolean(data.published) },
        });
      } else if (action === 'delete' && id) {
        await prisma.faqItem.delete({ where: { id } });
      }
    }

    // 10. CUSTOMER REVIEWS (CMS Moderation & CRUD)
    else if (entity === 'review') {
      if (action === 'create') {
        await prisma.customerReview.create({
          data: {
            authorName: String(data.authorName ?? '').trim(),
            authorRole: data.authorRole ? String(data.authorRole).trim() : null,
            rating: Math.min(5, Math.max(1, Number(data.rating ?? 5))),
            comment: String(data.comment ?? '').trim(),
            approved: Boolean(data.approved ?? true),
            published: Boolean(data.published ?? true),
          },
        });
      } else if (action === 'update' && id) {
        await prisma.customerReview.update({
          where: { id },
          data: {
            authorName: String(data.authorName ?? '').trim(),
            authorRole: data.authorRole ? String(data.authorRole).trim() : null,
            rating: Math.min(5, Math.max(1, Number(data.rating ?? 5))),
            comment: String(data.comment ?? '').trim(),
            approved: Boolean(data.approved ?? false),
            published: Boolean(data.published ?? false),
          },
        });
      } else if (action === 'approveReview' && id) {
        const approved = Boolean(data.approved ?? true);
        await prisma.customerReview.update({
          where: { id },
          data: {
            approved,
            published: approved, // approving also publishes by default
          },
        });
      } else if (action === 'togglePublish' && id) {
        await prisma.customerReview.update({
          where: { id },
          data: { published: Boolean(data.published) },
        });
      } else if (action === 'delete' && id) {
        await prisma.customerReview.delete({ where: { id } });
      }
    }

    revalidateAllPublic();
    const updatedBundle = await getAdminBundle();
    return NextResponse.json({ ok: true, bundle: updatedBundle });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'CMS update operation failed.',
      },
      { status: 500 }
    );
  }
}
