import { describe, it, expect } from 'vitest';
import {
  effectiveCostPerGram,
  materialMachineCost,
  contributionMargin,
  calculateContributionPerHour,
  monthlyRecovery,
  paybackMonths,
  maxHoursPerMonth,
} from '../src/lib/finance';
import { assumptions } from '../src/data/business-model';

// ── 1. effectiveCostPerGram ────────────────────────────────────────────

describe('effectiveCostPerGram', () => {
  it('300k/kg with 10% waste → 333.33 VND/g', () => {
    expect(effectiveCostPerGram(300_000, 0.1)).toBeCloseTo(333.33, 2);
  });

  it('300k/kg with 0% waste → 300 VND/g', () => {
    expect(effectiveCostPerGram(300_000, 0)).toBe(300);
  });
});

// ── 2. materialMachineCost ─────────────────────────────────────────────
// These EXCLUDE labor, post-processing, and packaging.
// Formula: weightGrams * costPerGram + hours * machineRate

describe('materialMachineCost', () => {
  const costPerGram = effectiveCostPerGram(300_000, 0.1); // 333.33
  const machineRate = assumptions.machineRatePerHour; // 4000

  it('Small: 50g / 2.5h ≈ 26,667 VND', () => {
    expect(materialMachineCost(50, costPerGram, 2.5, machineRate)).toBeCloseTo(26_667, 0);
  });

  it('Medium: 150g / 6h ≈ 74,000 VND', () => {
    expect(materialMachineCost(150, costPerGram, 6, machineRate)).toBeCloseTo(74_000, 0);
  });

  it('Large: 400g / 16h ≈ 197,333 VND', () => {
    expect(materialMachineCost(400, costPerGram, 16, machineRate)).toBeCloseTo(197_333, 0);
  });
});

// ── 3. contributionMargin ──────────────────────────────────────────────

describe('contributionMargin', () => {
  it('100,000 - 46,700 = 53,300 VND', () => {
    expect(contributionMargin(100_000, 46_700)).toBe(53_300);
  });
});

// ── 4. calculateContributionPerHour ────────────────────────────────────

describe('calculateContributionPerHour', () => {
  it('53,300 / 2.5h = 21,320 VND/h', () => {
    expect(calculateContributionPerHour(53_300, 2.5)).toBeCloseTo(21_320, 0);
  });
});

// ── 5. monthlyRecovery ─────────────────────────────────────────────────
// Formula: contributionPerHour * soldHours - fixedCost

describe('monthlyRecovery', () => {
  it('Conservative: 12,000 * 144 - 1,000,000 = 728,000', () => {
    expect(monthlyRecovery(12_000, 144, 1_000_000)).toBe(728_000);
  });

  it('Base: 20,000 * 252 - 1,200,000 = 3,840,000', () => {
    expect(monthlyRecovery(20_000, 252, 1_200_000)).toBe(3_840_000);
  });

  it('Aggressive: 28,000 * 396 - 1,500,000 = 9,588,000', () => {
    expect(monthlyRecovery(28_000, 396, 1_500_000)).toBe(9_588_000);
  });
});

// ── 6. paybackMonths ───────────────────────────────────────────────────
// Formula: capital / monthlyRecovery; Infinity if recovery <= 0

describe('paybackMonths', () => {
  const capital = assumptions.startupBaseline; // 18,000,000

  it('Conservative: 18M / 728k ≈ 24.73 months', () => {
    expect(paybackMonths(capital, 728_000)).toBeCloseTo(24.73, 1);
  });

  it('Base: 18M / 3,840k ≈ 4.69 months', () => {
    expect(paybackMonths(capital, 3_840_000)).toBeCloseTo(4.69, 1);
  });

  it('Aggressive: 18M / 9,588k ≈ 1.88 months', () => {
    expect(paybackMonths(capital, 9_588_000)).toBeCloseTo(1.88, 1);
  });

  it('Zero recovery → Infinity', () => {
    expect(paybackMonths(capital, 0)).toBe(Infinity);
  });
});

// ── 7. maxHoursPerMonth ────────────────────────────────────────────────

describe('maxHoursPerMonth', () => {
  it('24h/day * 30 days = 720 hours', () => {
    expect(maxHoursPerMonth(24, 30)).toBe(720);
  });

  it('equals assumptions.maxCalendarHoursPerMonth', () => {
    expect(maxHoursPerMonth(24, 30)).toBe(assumptions.maxCalendarHoursPerMonth);
  });
});
