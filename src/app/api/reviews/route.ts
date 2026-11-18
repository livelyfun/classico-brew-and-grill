import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorName, authorRole, rating, comment } = body ?? {};

    if (!authorName || typeof authorName !== 'string' || !authorName.trim()) {
      return NextResponse.json(
        { error: 'Please enter your name.' },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== 'string' || comment.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please write a review with at least 5 characters.' },
        { status: 400 }
      );
    }

    const numericRating = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));

    const created = await prisma.customerReview.create({
      data: {
        authorName: authorName.trim(),
        authorRole:
          typeof authorRole === 'string' && authorRole.trim()
            ? authorRole.trim()
            : 'Classico Guest',
        rating: numericRating,
        comment: comment.trim(),
        // IMPORTANT: Strictly pending approval. Never public until approved by admin in CMS.
        approved: false,
        published: false,
      },
    });

    return NextResponse.json({
      ok: true,
      id: created.id,
      message:
        'Thank you for your review! It has been submitted and will appear on our website once approved by our team.',
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to submit your review. Please try again later.',
      },
      { status: 500 }
    );
  }
}
