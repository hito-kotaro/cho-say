import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '@/__mocks__/prisma';

vi.mock('@/lib/prisma', () => ({ prisma }));

import { GET } from '../route';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/areas', () => {
  it('returns list of areas', async () => {
    const mockAreas = [
      { id: 'shibuya', name: '渋谷' },
      { id: 'shinjuku', name: '新宿' },
    ];
    prisma.area.findMany.mockResolvedValue(mockAreas);

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(2);
    expect(body[0].name).toBe('渋谷');
  });

  it('returns 500 on error', async () => {
    prisma.area.findMany.mockRejectedValue(new Error('DB error'));

    const res = await GET();
    expect(res.status).toBe(500);
  });
});
