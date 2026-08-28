/**
 * Pure finance calculation functions for IN CASE CÔNG NGHIỆP.
 * All monetary values in VND. No DOM, no side effects.
 */

/**
 * Effective cost per gram after accounting for waste.
 * @param costPerKg - Filament cost per kilogram (VND)
 * @param wasteRate - Waste ratio (0–1), e.g. 0.1 = 10%
 * @returns Cost per gram in VND
 */
export function effectiveCostPerGram(costPerKg: number, wasteRate: number): number {
  return costPerKg / (1000 * (1 - wasteRate));
}

/**
 * Material + machine cost for a single product.
 * EXCLUDES labor, post-processing, and packaging — those are added
 * separately in fullyLoadedCost on ProductExample.
 *
 * @param weightGrams - Filament weight in grams
 * @param costPerGram - Effective cost per gram (VND), from effectiveCostPerGram
 * @param hours - Print time in hours
 * @param machineRate - Machine rate per hour (VND)
 * @returns Material + machine cost in VND
 */
export function materialMachineCost(
  weightGrams: number,
  costPerGram: number,
  hours: number,
  machineRate: number,
): number {
  return weightGrams * costPerGram + hours * machineRate;
}

/**
 * Contribution margin = sell price minus fully loaded cost.
 * @param sellPrice - Selling price (VND)
 * @param fullyLoadedCost - Total cost including material, machine, labor, packaging (VND)
 * @returns Contribution margin in VND
 */
export function contributionMargin(sellPrice: number, fullyLoadedCost: number): number {
  return sellPrice - fullyLoadedCost;
}

/**
 * Contribution margin per machine-hour.
 * @param contribution - Total contribution margin (VND)
 * @param hours - Print time in hours
 * @returns Contribution per hour in VND/h
 */
export function calculateContributionPerHour(contribution: number, hours: number): number {
  return contribution / hours;
}

/**
 * Monthly recovery = (contribution/hour × sold hours) − fixed costs.
 * @param contributionPerHourValue - Contribution per hour (VND)
 * @param soldHours - Hours sold per month
 * @param fixedCost - Monthly fixed costs (VND)
 * @returns Monthly net recovery in VND
 */
export function monthlyRecovery(
  contributionPerHourValue: number,
  soldHours: number,
  fixedCost: number,
): number {
  return contributionPerHourValue * soldHours - fixedCost;
}

/**
 * Payback period in months = capital ÷ monthly recovery.
 * Returns Infinity if recovery is zero or negative (never pays back).
 * @param capital - Total startup capital (VND)
 * @param monthlyRecoveryValue - Monthly net recovery (VND)
 * @returns Months to payback, or Infinity
 */
export function paybackMonths(capital: number, monthlyRecoveryValue: number): number {
  if (monthlyRecoveryValue <= 0) return Infinity;
  return capital / monthlyRecoveryValue;
}

/**
 * Maximum calendar hours available per month.
 * @param hoursPerDay - Hours per day (typically 24 for a printer running continuously)
 * @param daysPerMonth - Days in month (typically 30)
 * @returns Total available hours
 */
export function maxHoursPerMonth(hoursPerDay: number, daysPerMonth: number): number {
  return hoursPerDay * daysPerMonth;
}
