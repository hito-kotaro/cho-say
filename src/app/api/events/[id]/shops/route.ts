import { NextResponse } from 'next/server';
import { getEvent, voteForShop } from '@/lib/store';
import { getShopById } from '@/lib/data';

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
    const { shopId } = body;

    if (!shopId) {
      return NextResponse.json(
        { error: 'shopId is required' },
        { status: 400 }
      );
    }

    const shop = getShopById(shopId);
    if (!shop) {
      return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
    }

    const vote = voteForShop(id, shopId);
    return NextResponse.json(vote, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
