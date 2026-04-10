import { NextResponse } from 'next/server';
import { createEvent } from '@/lib/store';

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

    const event = createEvent({
      title,
      description: description ?? '',
      dates,
    });

    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
