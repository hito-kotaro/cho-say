import { NextResponse } from 'next/server';
import { getEvent, getResponses, getShopVotes } from '@/lib/store';
import { areas, shops } from '@/lib/data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = getEvent(id);

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  const responses = getResponses(id);
  const shopVotes = getShopVotes(id);

  return NextResponse.json({
    event,
    responses,
    shopVotes,
    areas,
    shops,
  });
}
