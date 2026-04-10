import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      dates: { orderBy: { date: 'asc' } },
    },
  });

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  const responses = await prisma.response.findMany({
    where: { eventId: id },
    include: { availability: true },
    orderBy: { createdAt: 'asc' },
  });

  const shopVotes = await prisma.shopVote.findMany({
    where: { eventId: id },
  });

  const areas = await prisma.area.findMany({ orderBy: { id: 'asc' } });
  const shops = await prisma.shop.findMany({ orderBy: { id: 'asc' } });

  // Transform dates to strings the frontend expects (e.g. "2026-04-15 19:00")
  const dateStrings = event.dates.map((d) => {
    const dt = d.date;
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    if (hours === '00' && minutes === '00') {
      return `${year}-${month}-${day}`;
    }
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  });

  // Transform responses to the shape frontend expects
  const transformedResponses = responses.map((r) => ({
    id: r.id,
    eventId: r.eventId,
    name: r.name,
    availability: Object.fromEntries(
      r.availability.map((a) => [a.date, a.answer])
    ),
  }));

  const transformedVotes = shopVotes.map((v) => ({
    shopId: v.shopId,
    count: v.count,
  }));

  return NextResponse.json({
    event: {
      id: event.id,
      title: event.title,
      description: event.description,
      dates: dateStrings,
      createdAt: event.createdAt.toISOString(),
    },
    responses: transformedResponses,
    shopVotes: transformedVotes,
    areas,
    shops,
  });
}
