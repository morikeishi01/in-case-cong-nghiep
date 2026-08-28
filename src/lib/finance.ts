/**
 * Pure finance calculation functions for IN CASE CÔNG NGHIỆP.
 * All monetary values in VND. No DOM, no side effects.
 *
 * Validation contract:
 * - Every public function rejects NaN and non-finite inputs.
 * - Domain-specific guards (nonnegative costs, 0 ≤ wasteRate < 1, hours > 0)
 *   throw RangeError with a descriptive message.
 * - Negative contribution margin / monthly recovery is preserved where
 *   mathematically meaningful (contributionMargin, monthlyRecovery).
 */

// ── Helpers ───────────────────────────────────────────────────────────

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be finite, got ${value}`);
  }
}

function assertNonNegative(value: number, name: string): void {
  assertFinite(value, name);
  if (value < 0) {
    throw new RangeError(`${name} must be non-negative, got ${value}`);
  }
}

function assertPositive(value: number, name: string): void {
  assertFinite(value, name);
  if (value <= 0) {
    throw new RangeError(`${name} must be positive, got ${value}`);
  }
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Effective cost per gram after accounting for waste.
 * @param costPerKg - Filament cost per kilogram (VND), finite ≥ 0
 * @param wasteRate - Waste ratio (0 ≤ rate < 1), e.g. 0.1 = 10%
 * @returns Cost per gram in VND
 * @throws RangeError if costPerKg is not finite or negative,
 *         or wasteRate is not finite or outside [0, 1)
 */
export function effectiveCostPerGram(costPerKg: number, wasteRate: number): number {
  assertNonNegative(costPerKg, 'costPerKg');
  assertFinite(wasteRate, 'wasteRate');
  if (wasteRate < 0 || wasteRate >= 1) {
    throw new RangeError(`wasteRate must be in [0, 1), got ${wasteRate}`);
  }
  return costPerKg / (1000 * (1 - wasteRate));
}

/**
 * Material + machine cost for a single product.
 * EXCLUDES labor, post-processing, and packaging — those are added
 * separately in fullyLoadedCost on ProductExample.
 *
 * @param weightGrams - Filament weight in grams, finite ≥ 0
 * @param costPerGram - Effective cost per gram (VND), finite ≥ 0
 * @param hours - Print time in hours, finite ≥ 0
 * @param machineRate - Machine rate per hour (VND), finite ≥ 0
 * @returns Material + machine cost in VND
 */
export function materialMachineCost(
  weightGrams: number,
  costPerGram: number,
  hours: number,
  machineRate: number,
): number {
  assertNonNegative(weightGrams, 'weightGrams');
  assertNonNegative(costPerGram, 'costPerGram');
  assertNonNegative(hours, 'hours');
  assertNonNegative(machineRate, 'machineRate');
  return weightGrams * costPerGram + hours * machineRate;
}

/**
 * Contribution margin = sell price minus fully loaded cost.
 * May be negative when the product loses money.
 * @param sellPrice - Selling price (VND), finite
 * @param fullyLoadedCost - Total cost including material, machine, labor, packaging (VND), finite
 * @returns Contribution margin in VND (may be negative)
 */
export function contributionMargin(sellPrice: number, fullyLoadedCost: number): number {
  assertFinite(sellPrice, 'sellPrice');
  assertFinite(fullyLoadedCost, 'fullyLoadedCost');
  return sellPrice - fullyLoadedCost;
}

/**
 * Contribution margin per machine-hour.
 * @param contribution - Total contribution margin (VND), finite (may be negative)
 * @param hours - Print time in hours, finite > 0
 * @returns Contribution per hour in VND/h
 * @throws RangeError if hours ≤ 0
 */
export function calculateContributionPerHour(contribution: number, hours: number): number {
  assertFinite(contribution, 'contribution');
  assertPositive(hours, 'hours');
  return contribution / hours;
}

/**
 * Monthly recovery = (contribution/hour × sold hours) − fixed costs.
 * May be negative when fixed costs exceed contribution.
 * @param contributionPerHourValue - Contribution per hour (VND), finite
 * @param soldHours - Hours sold per month, finite ≥ 0
 * @param fixedCost - Monthly fixed costs (VND), finite ≥ 0
 * @returns Monthly net recovery in VND (may be negative)
 */
export function monthlyRecovery(
  contributionPerHourValue: number,
  soldHours: number,
  fixedCost: number,
): number {
  assertFinite(contributionPerHourValue, 'contributionPerHourValue');
  assertNonNegative(soldHours, 'soldHours');
  assertNonNegative(fixedCost, 'fixedCost');
  return contributionPerHourValue * soldHours - fixedCost;
}

/**
 * Payback period in months = capital ÷ monthly recovery.
 * - capital === 0 → 0 (nothing to recover)
 * - capital < 0   → RangeError (nonsensical)
 * - recovery ≤ 0  → Infinity (never pays back)
 * @param capital - Total startup capital (VND), finite ≥ 0
 * @param monthlyRecoveryValue - Monthly net recovery (VND), finite
 * @returns Months to payback, 0, or Infinity
 */
export function paybackMonths(capital: number, monthlyRecoveryValue: number): number {
  assertFinite(capital, 'capital');
  assertFinite(monthlyRecoveryValue, 'monthlyRecoveryValue');
  if (capital < 0) {
    throw new RangeError(`capital must be non-negative, got ${capital}`);
  }
  if (capital === 0) return 0;
  if (monthlyRecoveryValue <= 0) return Infinity;
  return capital / monthlyRecoveryValue;
}

/**
 * Maximum calendar hours available per month.
 * @param hoursPerDay - Hours per day (typically 24 for a printer running continuously), finite ≥ 0
 * @param daysPerMonth - Days in month (typically 30), finite ≥ 0
 * @returns Total available hours
 */
export function maxHoursPerMonth(hoursPerDay: number, daysPerMonth: number): number {
  assertNonNegative(hoursPerDay, 'hoursPerDay');
  assertNonNegative(daysPerMonth, 'daysPerMonth');
  return hoursPerDay * daysPerMonth;
}
