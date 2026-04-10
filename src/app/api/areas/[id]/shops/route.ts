import { NextResponse } from 'next/server';
import { getShopsByArea } from '@/lib/data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const shops = getShopsByArea(id);
  return NextResponse.json(shops);
}
