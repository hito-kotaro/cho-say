import { NextResponse } from 'next/server';
import { getEvent, addResponse } from '@/lib/store';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = getEvent(id);

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

    const response = addResponse(id, { name, availability });
    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
