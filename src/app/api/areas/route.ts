import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const areas = await prisma.area.findMany({ orderBy: { id: 'asc' } });
    return NextResponse.json(areas);
  } catch (error) {
    console.error('GET /api/areas error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch areas', detail: String(error) },
      { status: 500 }
    );
  }
}
