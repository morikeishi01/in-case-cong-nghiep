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
import { assumptions, scenarios } from '../src/data/business-model';

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

// ── 8. Validation: wasteRate edge cases ──────────────────────────────

describe('effectiveCostPerGram validation', () => {
  it('wasteRate = 1 throws RangeError', () => {
    expect(() => effectiveCostPerGram(300_000, 1)).toThrow(RangeError);
  });

  it('wasteRate = -0.1 throws RangeError', () => {
    expect(() => effectiveCostPerGram(300_000, -0.1)).toThrow(RangeError);
  });

  it('wasteRate = NaN throws RangeError', () => {
    expect(() => effectiveCostPerGram(300_000, NaN)).toThrow(RangeError);
  });

  it('wasteRate = Infinity throws RangeError', () => {
    expect(() => effectiveCostPerGram(300_000, Infinity)).toThrow(RangeError);
  });

  it('costPerKg = NaN throws RangeError', () => {
    expect(() => effectiveCostPerGram(NaN, 0.1)).toThrow(RangeError);
  });

  it('costPerKg = -1 throws RangeError', () => {
    expect(() => effectiveCostPerGram(-1, 0.1)).toThrow(RangeError);
  });

  it('costPerKg = Infinity throws RangeError', () => {
    expect(() => effectiveCostPerGram(Infinity, 0.1)).toThrow(RangeError);
  });

  it('costPerKg = 0 is valid (free filament)', () => {
    expect(effectiveCostPerGram(0, 0.1)).toBe(0);
  });
});

// ── 9. Validation: hours = 0 for calculateContributionPerHour ────────

describe('calculateContributionPerHour validation', () => {
  it('hours = 0 throws RangeError', () => {
    expect(() => calculateContributionPerHour(1000, 0)).toThrow(RangeError);
  });

  it('hours = -1 throws RangeError', () => {
    expect(() => calculateContributionPerHour(1000, -1)).toThrow(RangeError);
  });

  it('contribution = NaN throws RangeError', () => {
    expect(() => calculateContributionPerHour(NaN, 2)).toThrow(RangeError);
  });

  it('hours = NaN throws RangeError', () => {
    expect(() => calculateContributionPerHour(1000, NaN)).toThrow(RangeError);
  });

  it('contribution = Infinity throws RangeError', () => {
    expect(() => calculateContributionPerHour(Infinity, 2)).toThrow(RangeError);
  });

  it('negative contribution is valid (loss-making product)', () => {
    expect(calculateContributionPerHour(-5000, 2)).toBe(-2500);
  });
});

// ── 10. Validation: NaN / non-finite on all functions ────────────────

describe('NaN and non-finite rejection', () => {
  it('materialMachineCost rejects NaN weightGrams', () => {
    expect(() => materialMachineCost(NaN, 100, 2, 4000)).toThrow(RangeError);
  });

  it('materialMachineCost rejects Infinity costPerGram', () => {
    expect(() => materialMachineCost(50, Infinity, 2, 4000)).toThrow(RangeError);
  });

  it('materialMachineCost rejects -Infinity hours', () => {
    expect(() => materialMachineCost(50, 100, -Infinity, 4000)).toThrow(RangeError);
  });

  it('contributionMargin rejects NaN sellPrice', () => {
    expect(() => contributionMargin(NaN, 100)).toThrow(RangeError);
  });

  it('contributionMargin rejects Infinity fullyLoadedCost', () => {
    expect(() => contributionMargin(100, Infinity)).toThrow(RangeError);
  });

  it('monthlyRecovery rejects NaN contributionPerHourValue', () => {
    expect(() => monthlyRecovery(NaN, 100, 5000)).toThrow(RangeError);
  });

  it('monthlyRecovery rejects Infinity soldHours', () => {
    expect(() => monthlyRecovery(1000, Infinity, 5000)).toThrow(RangeError);
  });

  it('maxHoursPerMonth rejects NaN hoursPerDay', () => {
    expect(() => maxHoursPerMonth(NaN, 30)).toThrow(RangeError);
  });

  it('maxHoursPerMonth rejects -Infinity daysPerMonth', () => {
    expect(() => maxHoursPerMonth(24, -Infinity)).toThrow(RangeError);
  });
});

// ── 11. Validation: negative / zero capital ──────────────────────────

describe('paybackMonths validation', () => {
  it('capital = 0 returns 0', () => {
    expect(paybackMonths(0, 1_000_000)).toBe(0);
  });

  it('capital = -1 throws RangeError', () => {
    expect(() => paybackMonths(-1, 1_000_000)).toThrow(RangeError);
  });

  it('capital = NaN throws RangeError', () => {
    expect(() => paybackMonths(NaN, 1_000_000)).toThrow(RangeError);
  });

  it('capital = Infinity throws RangeError', () => {
    expect(() => paybackMonths(Infinity, 1_000_000)).toThrow(RangeError);
  });

  it('monthlyRecoveryValue = NaN throws RangeError', () => {
    expect(() => paybackMonths(18_000_000, NaN)).toThrow(RangeError);
  });

  it('monthlyRecoveryValue = Infinity throws RangeError', () => {
    expect(() => paybackMonths(18_000_000, Infinity)).toThrow(RangeError);
  });

  it('negative recovery returns Infinity', () => {
    expect(paybackMonths(18_000_000, -500_000)).toBe(Infinity);
  });

  it('zero recovery returns Infinity', () => {
    expect(paybackMonths(18_000_000, 0)).toBe(Infinity);
  });
});

// ── 12. Negative contribution margin (loss-making) ───────────────────

describe('negative contribution margin', () => {
  it('contributionMargin allows negative (cost > price)', () => {
    expect(contributionMargin(30_000, 46_700)).toBe(-16_700);
  });

  it('monthlyRecovery allows negative result', () => {
    // contributionPerHour * soldHours < fixedCost
    expect(monthlyRecovery(5_000, 100, 1_000_000)).toBe(-500_000);
  });

  it('paybackMonths with negative recovery → Infinity', () => {
    expect(paybackMonths(18_000_000, -500_000)).toBe(Infinity);
  });
});

// ── 13. Non-negative guards on materialMachineCost / monthlyRecovery ─

describe('non-negative guards', () => {
  it('materialMachineCost rejects negative weightGrams', () => {
    expect(() => materialMachineCost(-1, 100, 2, 4000)).toThrow(RangeError);
  });

  it('materialMachineCost rejects negative costPerGram', () => {
    expect(() => materialMachineCost(50, -1, 2, 4000)).toThrow(RangeError);
  });

  it('materialMachineCost rejects negative hours', () => {
    expect(() => materialMachineCost(50, 100, -1, 4000)).toThrow(RangeError);
  });

  it('materialMachineCost rejects negative machineRate', () => {
    expect(() => materialMachineCost(50, 100, 2, -1)).toThrow(RangeError);
  });

  it('monthlyRecovery rejects negative soldHours', () => {
    expect(() => monthlyRecovery(1000, -1, 5000)).toThrow(RangeError);
  });

  it('monthlyRecovery rejects negative fixedCost', () => {
    expect(() => monthlyRecovery(1000, 100, -1)).toThrow(RangeError);
  });

  it('maxHoursPerMonth rejects negative hoursPerDay', () => {
    expect(() => maxHoursPerMonth(-1, 30)).toThrow(RangeError);
  });

  it('maxHoursPerMonth rejects negative daysPerMonth', () => {
    expect(() => maxHoursPerMonth(24, -1)).toThrow(RangeError);
  });
});

// ── 14. Scenario formula exactness & rounding tolerance ──────────────

describe('scenario values match formulas', () => {
  const capital = assumptions.startupBaseline; // 18,000,000

  for (const s of scenarios) {
    describe(s.label, () => {
      const expectedRecovery =
        s.contributionPerHour * s.soldHours - s.fixedCost;
      const expectedPayback = capital / expectedRecovery;

      it(`monthlyRecovery matches formula exactly (${expectedRecovery})`, () => {
        expect(s.monthlyRecovery).toBe(expectedRecovery);
      });

      it(`stored paybackMonths ${s.paybackMonths} is within 0.05 of computed ${expectedPayback.toFixed(4)}`, () => {
        expect(Math.abs(s.paybackMonths - expectedPayback)).toBeLessThan(0.05);
      });
    });
  }
});

// ── 15. Derived effectiveCostPerGram in assumptions ──────────────────

describe('assumptions.effectiveCostPerGram', () => {
  it('matches effectiveCostPerGram(filamentCostPerKg, wasteRate)', () => {
    const computed = effectiveCostPerGram(
      assumptions.filamentCostPerKg,
      assumptions.wasteRate,
    );
    expect(assumptions.effectiveCostPerGram).toBe(computed);
  });
});
