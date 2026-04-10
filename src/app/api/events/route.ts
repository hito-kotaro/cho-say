import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, dates } = body;

    if (!title || !dates || !Array.isArray(dates) || dates.length === 0) {
      return NextResponse.json(
        { error: 'title and dates (non-empty array) are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description: description ?? '',
        dates: {
          create: dates.map((d: string) => ({ date: new Date(d) })),
        },
      },
      include: { dates: true },
    });

    // Return in the shape the frontend expects
    return NextResponse.json({
      id: event.id,
      title: event.title,
      description: event.description,
      dates: event.dates.map((d) => d.date.toISOString()),
      createdAt: event.createdAt.toISOString(),
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
