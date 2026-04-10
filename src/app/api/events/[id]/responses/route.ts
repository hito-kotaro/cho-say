import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { name, availability } = body;

    if (!name || !availability || typeof availability !== 'object') {
      return NextResponse.json(
        { error: 'name and availability are required' },
        { status: 400 }
      );
    }

    const response = await prisma.response.create({
      data: {
        eventId: id,
        name,
        availability: {
          create: Object.entries(availability).map(([date, answer]) => ({
            date,
            answer: answer as string,
          })),
        },
      },
      include: { availability: true },
    });

    return NextResponse.json({
      id: response.id,
      eventId: response.eventId,
      name: response.name,
      availability: Object.fromEntries(
        response.availability.map((a) => [a.date, a.answer])
      ),
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
