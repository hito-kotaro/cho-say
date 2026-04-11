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

describe('POST /api/events/[id]/responses', () => {
  it('creates a response and returns 201', async () => {
    prisma.event.findUnique.mockResolvedValue({ id: 'uuid-1' });
    prisma.response.create.mockResolvedValue({
      id: 'resp-1',
      eventId: 'uuid-1',
      name: '田中',
      availability: [
        { id: 'a1', responseId: 'resp-1', date: '2026-05-01 19:00', answer: 'ok' },
      ],
    });

    const req = new Request('http://localhost/api/events/uuid-1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '田中',
        availability: { '2026-05-01 19:00': 'ok' },
      }),
    });

    const res = await POST(req, makeParams('uuid-1'));
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.name).toBe('田中');
    expect(body.availability['2026-05-01 19:00']).toBe('ok');
  });

  it('returns 404 when event not found', async () => {
    prisma.event.findUnique.mockResolvedValue(null);

    const req = new Request('http://localhost/api/events/nonexistent/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '田中', availability: {} }),
    });

    const res = await POST(req, makeParams('nonexistent'));
    expect(res.status).toBe(404);
  });

  it('returns 400 when name is missing', async () => {
    prisma.event.findUnique.mockResolvedValue({ id: 'uuid-1' });

    const req = new Request('http://localhost/api/events/uuid-1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ availability: {} }),
    });

    const res = await POST(req, makeParams('uuid-1'));
    expect(res.status).toBe(400);
  });

  it('returns 400 when availability is missing', async () => {
    prisma.event.findUnique.mockResolvedValue({ id: 'uuid-1' });

    const req = new Request('http://localhost/api/events/uuid-1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '田中' }),
    });

    const res = await POST(req, makeParams('uuid-1'));
    expect(res.status).toBe(400);
  });
});
