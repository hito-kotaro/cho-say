import { describe, it, expect } from 'vitest';
import { formatDate } from '../format';

describe('formatDate', () => {
  it('formats date-only string', () => {
    // 2026-04-15 is a Wednesday
    expect(formatDate('2026-04-15')).toBe('4/15(水)');
  });

  it('formats date with time', () => {
    expect(formatDate('2026-04-15 19:00')).toBe('4/15(水) 19:00');
  });

  it('handles Sunday', () => {
    // 2026-04-12 is a Sunday
    expect(formatDate('2026-04-12')).toBe('4/12(日)');
  });

  it('handles Saturday', () => {
    // 2026-04-11 is a Saturday
    expect(formatDate('2026-04-11')).toBe('4/11(土)');
  });

  it('does not zero-pad month and day', () => {
    // 2026-01-05 is a Monday
    expect(formatDate('2026-01-05')).toBe('1/5(月)');
  });

  it('formats date with different time', () => {
    expect(formatDate('2026-12-25 18:30')).toBe('12/25(金) 18:30');
  });
});
