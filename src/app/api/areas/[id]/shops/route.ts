import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const shops = await prisma.shop.findMany({
    where: { areaId: id },
    orderBy: { id: 'asc' },
  });
  return NextResponse.json(shops);
}
