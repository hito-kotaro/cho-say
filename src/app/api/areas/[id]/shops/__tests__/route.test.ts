import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '@/__mocks__/prisma';

vi.mock('@/lib/prisma', () => ({ prisma }));

import { GET } from '../route';

beforeEach(() => {
  vi.clearAllMocks();
});

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe('GET /api/areas/[id]/shops', () => {
  it('returns shops for given area', async () => {
    const mockShops = [
      {
        id: 'shop-shibuya-01',
        name: '炭火居酒屋 渋谷炎',
        areaId: 'shibuya',
        genre: '居酒屋',
        budget: '3000〜4000円',
        address: '東京都渋谷区',
        url: null,
        imageUrl: null,
      },
    ];
    prisma.shop.findMany.mockResolvedValue(mockShops);

    const req = new Request('http://localhost/api/areas/shibuya/shops');
    const res = await GET(req, makeParams('shibuya'));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].name).toBe('炭火居酒屋 渋谷炎');
  });

  it('returns empty array for area with no shops', async () => {
    prisma.shop.findMany.mockResolvedValue([]);

    const req = new Request('http://localhost/api/areas/unknown/shops');
    const res = await GET(req, makeParams('unknown'));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toEqual([]);
  });
});
