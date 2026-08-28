const viVN = 'vi-VN';

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be finite, got ${value}`);
  }
}

/**
 * Format a number as Vietnamese Dong currency.
 * Example: 12_000_000 → "12.000.000 ₫"
 * @throws RangeError if value is NaN or Infinity
 */
export function formatVND(value: number): string {
  assertFinite(value, 'value');
  return new Intl.NumberFormat(viVN, {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a decimal ratio as a percentage string.
 * Example: 0.35 → "35%"
 * @throws RangeError if ratio is NaN or Infinity
 */
export function formatPercent(ratio: number): string {
  assertFinite(ratio, 'ratio');
  return new Intl.NumberFormat(viVN, {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(ratio);
}

/**
 * Format months with up to two decimals and unit label.
 * Example: 4.69 → "4,69 tháng"
 * @throws RangeError if months is NaN or Infinity
 */
export function formatMonths(months: number): string {
  assertFinite(months, 'months');
  const formatted = new Intl.NumberFormat(viVN, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(months);
  return `${formatted} tháng`;
}

/**
 * Format a plain number with locale-specific grouping.
 * Example: 720 → "720", 12_000 → "12.000"
 * @throws RangeError if value is NaN or Infinity
 */
export function formatNumber(value: number): string {
  assertFinite(value, 'value');
  return new Intl.NumberFormat(viVN).format(value);
}
