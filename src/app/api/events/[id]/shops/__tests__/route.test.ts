import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '@/__mocks__/prisma';

vi.mock('@/lib/prisma', () => ({ prisma }));

import { POST } from '../route';

beforeEach(() => {
  vi.clearAllMocks();
});

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe('POST /api/events/[id]/shops', () => {
  it('creates a shop vote and returns 201', async () => {
    prisma.event.findUnique.mockResolvedValue({ id: 'uuid-1' });
    prisma.shop.findUnique.mockResolvedValue({ id: 'shop-1' });
    prisma.shopVote.upsert.mockResolvedValue({
      id: 'vote-1',
      eventId: 'uuid-1',
      shopId: 'shop-1',
      count: 1,
    });

    const req = new Request('http://localhost/api/events/uuid-1/shops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopId: 'shop-1' }),
    });

    const res = await POST(req, makeParams('uuid-1'));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.shopId).toBe('shop-1');
    expect(body.count).toBe(1);
  });

  it('returns 404 when event not found', async () => {
    prisma.event.findUnique.mockResolvedValue(null);

    const req = new Request('http://localhost/api/events/nonexistent/shops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopId: 'shop-1' }),
    });

    const res = await POST(req, makeParams('nonexistent'));
    expect(res.status).toBe(404);
  });

  it('returns 404 when shop not found', async () => {
    prisma.event.findUnique.mockResolvedValue({ id: 'uuid-1' });
    prisma.shop.findUnique.mockResolvedValue(null);

    const req = new Request('http://localhost/api/events/uuid-1/shops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopId: 'nonexistent' }),
    });

    const res = await POST(req, makeParams('uuid-1'));
    expect(res.status).toBe(404);
  });

  it('returns 400 when shopId is missing', async () => {
    prisma.event.findUnique.mockResolvedValue({ id: 'uuid-1' });

    const req = new Request('http://localhost/api/events/uuid-1/shops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const res = await POST(req, makeParams('uuid-1'));
    expect(res.status).toBe(400);
  });
});
