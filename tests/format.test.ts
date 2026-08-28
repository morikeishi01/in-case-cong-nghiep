import { describe, it, expect } from 'vitest';
import { formatVND, formatPercent, formatMonths, formatNumber } from '../src/lib/format';

// ── formatVND ──────────────────────────────────────────────────────

describe('formatVND', () => {
  it('formats 12_000_000 with currency symbol', () => {
    const result = formatVND(12_000_000);
    expect(result).toContain('12.000.000');
    expect(result).toContain('₫');
  });

  it('formats 0', () => {
    const result = formatVND(0);
    expect(result).toContain('0');
  });

  it('formats negative values', () => {
    const result = formatVND(-500_000);
    expect(result).toContain('500.000');
  });

  it('rejects NaN', () => {
    expect(() => formatVND(NaN)).toThrow(RangeError);
  });

  it('rejects Infinity', () => {
    expect(() => formatVND(Infinity)).toThrow(RangeError);
  });

  it('rejects -Infinity', () => {
    expect(() => formatVND(-Infinity)).toThrow(RangeError);
  });
});

// ── formatPercent ──────────────────────────────────────────────────

describe('formatPercent', () => {
  it('formats 0.35 as 35%', () => {
    const result = formatPercent(0.35);
    expect(result).toContain('35');
  });

  it('formats 0 as 0%', () => {
    const result = formatPercent(0);
    expect(result).toContain('0');
  });

  it('formats 1 as 100%', () => {
    const result = formatPercent(1);
    expect(result).toContain('100');
  });

  it('rejects NaN', () => {
    expect(() => formatPercent(NaN)).toThrow(RangeError);
  });

  it('rejects Infinity', () => {
    expect(() => formatPercent(Infinity)).toThrow(RangeError);
  });

  it('rejects -Infinity', () => {
    expect(() => formatPercent(-Infinity)).toThrow(RangeError);
  });
});

// ── formatMonths ───────────────────────────────────────────────────

describe('formatMonths', () => {
  it('formats 4.69 with unit label', () => {
    const result = formatMonths(4.69);
    expect(result).toContain('4');
    expect(result).toContain('69');
    expect(result).toContain('tháng');
  });

  it('formats 0 as 0,0 tháng', () => {
    const result = formatMonths(0);
    expect(result).toContain('0');
    expect(result).toContain('tháng');
  });

  it('rejects NaN', () => {
    expect(() => formatMonths(NaN)).toThrow(RangeError);
  });

  it('rejects Infinity', () => {
    expect(() => formatMonths(Infinity)).toThrow(RangeError);
  });

  it('rejects -Infinity', () => {
    expect(() => formatMonths(-Infinity)).toThrow(RangeError);
  });
});

// ── formatNumber ───────────────────────────────────────────────────

describe('formatNumber', () => {
  it('formats 720 without grouping', () => {
    expect(formatNumber(720)).toContain('720');
  });

  it('formats 12_000 with grouping', () => {
    const result = formatNumber(12_000);
    expect(result).toContain('12');
    expect(result).toContain('000');
  });

  it('formats 0', () => {
    expect(formatNumber(0)).toContain('0');
  });

  it('rejects NaN', () => {
    expect(() => formatNumber(NaN)).toThrow(RangeError);
  });

  it('rejects Infinity', () => {
    expect(() => formatNumber(Infinity)).toThrow(RangeError);
  });

  it('rejects -Infinity', () => {
    expect(() => formatNumber(-Infinity)).toThrow(RangeError);
  });
});
