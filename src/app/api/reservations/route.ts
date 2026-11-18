import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      phone?: string;
      guests?: number;
      date?: string;
      timeSlot?: string;
      seatingZone?: string;
      occasion?: string;
      notes?: string;
    };

    if (
      !body.fullName?.trim() ||
      !body.email?.trim() ||
      !body.phone?.trim() ||
      !body.date?.trim() ||
      !body.timeSlot?.trim()
    ) {
      return NextResponse.json(
        { error: 'Please complete all required reservation fields.' },
        { status: 400 }
      );
    }

    const referenceCode = `CBG-${Math.floor(1000 + Math.random() * 9000)}`;

    const created = await prisma.reservation.create({
      data: {
        referenceCode,
        fullName: body.fullName.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        guests: Number(body.guests ?? 2),
        date: body.date.trim(),
        timeSlot: body.timeSlot.trim(),
        seatingZone: body.seatingZone?.trim() || 'Botanical Conservatory',
        occasion: body.occasion?.trim() || 'Casual Dining',
        notes: body.notes?.trim() || null,
        status: 'Confirmed',
        published: true,
      },
    });

    return NextResponse.json({
      ok: true,
      referenceCode: created.referenceCode,
      reservation: created,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'Could not save reservation.',
      },
      { status: 500 }
    );
  }
}
