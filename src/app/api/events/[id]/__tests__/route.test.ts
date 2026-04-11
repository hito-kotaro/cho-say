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

describe('GET /api/events/[id]', () => {
  it('returns event with all related data', async () => {
    const mockEvent = {
      id: 'uuid-1',
      title: '忘年会',
      description: '',
      createdAt: new Date('2026-04-10T00:00:00Z'),
      dates: [
        { id: 'd1', date: new Date('2026-05-01T19:00:00'), eventId: 'uuid-1' },
      ],
    };
    prisma.event.findUnique.mockResolvedValue(mockEvent);
    prisma.response.findMany.mockResolvedValue([]);
    prisma.shopVote.findMany.mockResolvedValue([]);
    prisma.area.findMany.mockResolvedValue([{ id: 'shibuya', name: '渋谷' }]);
    prisma.shop.findMany.mockResolvedValue([
      {
        id: 'shop-1',
        name: 'テスト店',
        areaId: 'shibuya',
        genre: '居酒屋',
        budget: '3000円',
        address: '東京都渋谷区',
        url: null,
        imageUrl: null,
      },
    ]);

    const req = new Request('http://localhost/api/events/uuid-1');
    const res = await GET(req, makeParams('uuid-1'));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.event.id).toBe('uuid-1');
    expect(body.event.title).toBe('忘年会');
    expect(body.responses).toEqual([]);
    expect(body.shopVotes).toEqual([]);
    expect(body.areas).toHaveLength(1);
    expect(body.shops).toHaveLength(1);
    expect(body.shops[0].area).toBe('shibuya');
  });

  it('returns 404 when event not found', async () => {
    prisma.event.findUnique.mockResolvedValue(null);

    const req = new Request('http://localhost/api/events/nonexistent');
    const res = await GET(req, makeParams('nonexistent'));
    expect(res.status).toBe(404);
  });

  it('returns 500 on internal error', async () => {
    prisma.event.findUnique.mockRejectedValue(new Error('DB error'));

    const req = new Request('http://localhost/api/events/uuid-1');
    const res = await GET(req, makeParams('uuid-1'));
    expect(res.status).toBe(500);
  });
});
