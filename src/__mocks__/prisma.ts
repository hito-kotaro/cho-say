import { vi } from 'vitest';

export const prisma = {
  event: {
    create: vi.fn(),
    findUnique: vi.fn(),
  },
  response: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
  shopVote: {
    upsert: vi.fn(),
    findMany: vi.fn(),
  },
  area: {
    findMany: vi.fn(),
  },
  shop: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
  },
};
