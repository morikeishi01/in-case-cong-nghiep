const viVN = 'vi-VN';

/**
 * Format a number as Vietnamese Dong currency.
 * Example: 12_000_000 → "12.000.000 ₫"
 */
export function formatVND(value: number): string {
  return new Intl.NumberFormat(viVN, {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a decimal ratio as a percentage string.
 * Example: 0.35 → "35%"
 */
export function formatPercent(ratio: number): string {
  return new Intl.NumberFormat(viVN, {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(ratio);
}

/**
 * Format months with one decimal and unit label.
 * Example: 4.69 → "4,69 tháng"
 */
export function formatMonths(months: number): string {
  const formatted = new Intl.NumberFormat(viVN, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(months);
  return `${formatted} tháng`;
}

/**
 * Format a plain number with locale-specific grouping.
 * Example: 720 → "720", 12_000 → "12.000"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat(viVN).format(value);
}
