import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '@/__mocks__/prisma';

vi.mock('@/lib/prisma', () => ({ prisma }));

import { POST } from '../route';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/events', () => {
  it('creates an event and returns 201', async () => {
    const mockEvent = {
      id: 'uuid-1',
      title: '忘年会',
      description: '今年もお疲れ様',
      createdAt: new Date('2026-04-10T00:00:00Z'),
      dates: [
        { id: 'd1', date: new Date('2026-05-01T19:00:00'), eventId: 'uuid-1' },
      ],
    };
    prisma.event.create.mockResolvedValue(mockEvent);

    const req = new Request('http://localhost/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: '忘年会',
        description: '今年もお疲れ様',
        dates: ['2026-05-01 19:00'],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.id).toBe('uuid-1');
    expect(body.title).toBe('忘年会');
    expect(body.dates).toHaveLength(1);
  });

  it('returns 400 when title is missing', async () => {
    const req = new Request('http://localhost/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dates: ['2026-05-01'] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 when dates is empty', async () => {
    const req = new Request('http://localhost/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test', dates: [] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 when dates is missing', async () => {
    const req = new Request('http://localhost/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
