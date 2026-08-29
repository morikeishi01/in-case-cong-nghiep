import { describe, it, expect } from 'vitest';
import { calculateRoiProjection } from '../src/components/roi-calculator';
import { assumptions } from '../src/data/business-model';

// ── Base case: 35% utilization ──────────────────────────────────────

describe('calculateRoiProjection – base case (35%)', () => {
  const result = calculateRoiProjection({
    utilization: 0.35,
    contributionPerHour: 20_000,
    fixedCost: 1_200_000,
    startupCapital: assumptions.startupBaseline,
    maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
  });

  it('soldHours = 0.35 × 720 = 252', () => {
    expect(result.soldHours).toBe(252);
  });

  it('monthlyRecovery = 20,000 × 252 − 1,200,000 = 3,840,000', () => {
    expect(result.monthlyRecovery).toBe(3_840_000);
  });

  it('paybackMonths = 18,000,000 / 3,840,000 ≈ 4.69', () => {
    expect(result.paybackMonths).toBeCloseTo(4.69, 2);
  });
});

// ── Custom 30% utilization ──────────────────────────────────────────

describe('calculateRoiProjection – custom 30%', () => {
  const result = calculateRoiProjection({
    utilization: 0.30,
    contributionPerHour: 20_000,
    fixedCost: 1_200_000,
    startupCapital: assumptions.startupBaseline,
    maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
  });

  it('soldHours = 0.30 × 720 = 216', () => {
    expect(result.soldHours).toBe(216);
  });

  it('monthlyRecovery = 20,000 × 216 − 1,200,000 = 3,120,000', () => {
    expect(result.monthlyRecovery).toBe(3_120_000);
  });

  it('paybackMonths = 18,000,000 / 3,120,000 ≈ 5.77', () => {
    expect(result.paybackMonths).toBeCloseTo(5.77, 2);
  });
});

// ── Zero recovery → Infinity payback ────────────────────────────────

describe('calculateRoiProjection – zero recovery', () => {
  // Integer-arithmetic exact zero: 20,000 × 50 − 1,000,000 = 0
  const result = calculateRoiProjection({
    utilization: 0.50,
    contributionPerHour: 20_000,
    fixedCost: 1_000_000,
    startupCapital: assumptions.startupBaseline,
    maxCalendarHoursPerMonth: 100,
  });

  it('soldHours = 0.50 × 100 = 50', () => {
    expect(result.soldHours).toBe(50);
  });

  it('monthlyRecovery = 20,000 × 50 − 1,000,000 = 0', () => {
    expect(result.monthlyRecovery).toBe(0);
  });

  it('paybackMonths is Infinity when recovery is exactly zero', () => {
    expect(result.paybackMonths).toBe(Infinity);
  });
});

// ── Negative recovery → Infinity payback ────────────────────────────

describe('calculateRoiProjection – negative recovery', () => {
  const result = calculateRoiProjection({
    utilization: 0.05,
    contributionPerHour: 10_000,
    fixedCost: 1_200_000,
    startupCapital: assumptions.startupBaseline,
    maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
  });

  it('soldHours = 0.05 × 720 = 36', () => {
    expect(result.soldHours).toBe(36);
  });

  it('monthlyRecovery = 10,000 × 36 − 1,200,000 = −840,000', () => {
    expect(result.monthlyRecovery).toBe(-840_000);
  });

  it('paybackMonths is Infinity when recovery is negative', () => {
    expect(result.paybackMonths).toBe(Infinity);
  });
});

// ── Uses assumptions.maxCalendarHoursPerMonth, never hardcodes 720 ──

describe('calculateRoiProjection – uses maxCalendarHoursPerMonth param', () => {
  it('soldHours changes when maxCalendarHoursPerMonth changes', () => {
    const r720 = calculateRoiProjection({
      utilization: 0.50,
      contributionPerHour: 20_000,
      fixedCost: 1_200_000,
      startupCapital: assumptions.startupBaseline,
      maxCalendarHoursPerMonth: 720,
    });
    const r500 = calculateRoiProjection({
      utilization: 0.50,
      contributionPerHour: 20_000,
      fixedCost: 1_200_000,
      startupCapital: assumptions.startupBaseline,
      maxCalendarHoursPerMonth: 500,
    });
    expect(r720.soldHours).toBe(360);
    expect(r500.soldHours).toBe(250);
  });
});

// ── Bounds / NaN validation ─────────────────────────────────────────

describe('calculateRoiProjection – input validation', () => {
  const base = {
    utilization: 0.35,
    contributionPerHour: 20_000,
    fixedCost: 1_200_000,
    startupCapital: assumptions.startupBaseline,
    maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
  };

  it('NaN utilization throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, utilization: NaN })).toThrow(RangeError);
  });

  it('NaN contributionPerHour throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, contributionPerHour: NaN })).toThrow(RangeError);
  });

  it('NaN fixedCost throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, fixedCost: NaN })).toThrow(RangeError);
  });

  it('NaN startupCapital throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, startupCapital: NaN })).toThrow(RangeError);
  });

  it('NaN maxCalendarHoursPerMonth throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, maxCalendarHoursPerMonth: NaN })).toThrow(RangeError);
  });

  it('Infinity utilization throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, utilization: Infinity })).toThrow(RangeError);
  });

  it('Infinity contributionPerHour throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, contributionPerHour: Infinity })).toThrow(RangeError);
  });

  it('negative fixedCost throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, fixedCost: -1 })).toThrow(RangeError);
  });

  it('negative startupCapital throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, startupCapital: -1 })).toThrow(RangeError);
  });

  it('zero maxCalendarHoursPerMonth throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, maxCalendarHoursPerMonth: 0 })).toThrow(RangeError);
  });

  it('negative maxCalendarHoursPerMonth throws RangeError', () => {
    expect(() => calculateRoiProjection({ ...base, maxCalendarHoursPerMonth: -100 })).toThrow(RangeError);
  });
});

// ── Edge: utilization at bounds ─────────────────────────────────────

describe('calculateRoiProjection – utilization bounds', () => {
  it('5% utilization works', () => {
    const r = calculateRoiProjection({
      utilization: 0.05,
      contributionPerHour: 20_000,
      fixedCost: 1_200_000,
      startupCapital: assumptions.startupBaseline,
      maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
    });
    expect(r.soldHours).toBe(36);
  });

  it('80% utilization works', () => {
    const r = calculateRoiProjection({
      utilization: 0.80,
      contributionPerHour: 20_000,
      fixedCost: 1_200_000,
      startupCapital: assumptions.startupBaseline,
      maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
    });
    expect(r.soldHours).toBe(576);
  });

  it('utilization > 1 is allowed (oversell scenario)', () => {
    const r = calculateRoiProjection({
      utilization: 1.0,
      contributionPerHour: 20_000,
      fixedCost: 1_200_000,
      startupCapital: assumptions.startupBaseline,
      maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
    });
    expect(r.soldHours).toBe(720);
  });
});

// ── Zero startup capital → payback 0 ────────────────────────────────

describe('calculateRoiProjection – zero capital', () => {
  it('paybackMonths = 0 when startupCapital = 0', () => {
    const r = calculateRoiProjection({
      utilization: 0.35,
      contributionPerHour: 20_000,
      fixedCost: 1_200_000,
      startupCapital: 0,
      maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
    });
    expect(r.paybackMonths).toBe(0);
  });
});

// ── Aggressive scenario cross-check ─────────────────────────────────

describe('calculateRoiProjection – aggressive 55%', () => {
  const result = calculateRoiProjection({
    utilization: 0.55,
    contributionPerHour: 28_000,
    fixedCost: 1_500_000,
    startupCapital: assumptions.startupBaseline,
    maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
  });

  it('soldHours = 0.55 × 720 = 396', () => {
    expect(result.soldHours).toBe(396);
  });

  it('monthlyRecovery = 28,000 × 396 − 1,500,000 = 9,588,000', () => {
    expect(result.monthlyRecovery).toBe(9_588_000);
  });

  it('paybackMonths ≈ 1.88', () => {
    expect(result.paybackMonths).toBeCloseTo(1.88, 2);
  });
});

// ── Conservative scenario cross-check ───────────────────────────────

describe('calculateRoiProjection – conservative 20%', () => {
  const result = calculateRoiProjection({
    utilization: 0.20,
    contributionPerHour: 12_000,
    fixedCost: 1_000_000,
    startupCapital: assumptions.startupBaseline,
    maxCalendarHoursPerMonth: assumptions.maxCalendarHoursPerMonth,
  });

  it('soldHours = 0.20 × 720 = 144', () => {
    expect(result.soldHours).toBe(144);
  });

  it('monthlyRecovery = 12,000 × 144 − 1,000,000 = 728,000', () => {
    expect(result.monthlyRecovery).toBe(728_000);
  });

  it('paybackMonths ≈ 24.73', () => {
    expect(result.paybackMonths).toBeCloseTo(24.73, 1);
  });
});
