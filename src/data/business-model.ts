// ── Business Assumptions ──────────────────────────────────────────────

export interface BusinessAssumptions {
  readonly printerCost: number;
  readonly filamentInventory: number;
  readonly startupBaseline: number;
  readonly filamentCostPerKg: number;
  readonly wasteRate: number;
  readonly effectiveCostPerGram: number;
  readonly machineRatePerHour: number;
  readonly maxCalendarHoursPerMonth: number;
}

export const assumptions: BusinessAssumptions = {
  printerCost: 12_000_000,
  filamentInventory: 3_000_000,
  startupBaseline: 18_000_000,
  filamentCostPerKg: 300_000,
  wasteRate: 0.1,
  effectiveCostPerGram: 333.33,
  machineRatePerHour: 4_000,
  maxCalendarHoursPerMonth: 720,
};

// ── Utilization Scenarios ─────────────────────────────────────────────

export type ScenarioLabel = 'conservative' | 'base' | 'aggressive';

export interface Scenario {
  readonly label: ScenarioLabel;
  readonly utilization: number;
  readonly soldHours: number;
  readonly contributionPerHour: number;
  readonly fixedCost: number;
  readonly monthlyRecovery: number;
  readonly paybackMonths: number;
  readonly rampPaybackLabel?: string;
}

export const scenarios: readonly Scenario[] = [
  {
    label: 'conservative',
    utilization: 0.2,
    soldHours: 144,
    contributionPerHour: 12_000,
    fixedCost: 1_000_000,
    monthlyRecovery: 728_000,
    paybackMonths: 24.7,
  },
  {
    label: 'base',
    utilization: 0.35,
    soldHours: 252,
    contributionPerHour: 20_000,
    fixedCost: 1_200_000,
    monthlyRecovery: 3_840_000,
    paybackMonths: 4.69,
    rampPaybackLabel: '6–8 tháng',
  },
  {
    label: 'aggressive',
    utilization: 0.55,
    soldHours: 396,
    contributionPerHour: 28_000,
    fixedCost: 1_500_000,
    monthlyRecovery: 9_588_000,
    paybackMonths: 1.88,
  },
];

// ── Product Examples ──────────────────────────────────────────────────

export interface ProductExample {
  readonly name: string;
  readonly weightGrams: number;
  readonly printHours: number;
  /**
   * Fully loaded cost includes material + machine + active labor,
   * post-processing, and packaging. Intentionally higher than the
   * materialMachineCost returned by finance.ts, which excludes
   * labor, post-processing, and packaging.
   */
  readonly fullyLoadedCost: number;
  readonly sellRangeLow: number;
  readonly sellRangeHigh: number;
}

export const productExamples: readonly ProductExample[] = [
  {
    name: 'Small',
    weightGrams: 50,
    printHours: 2.5,
    fullyLoadedCost: 46_700,
    sellRangeLow: 100_000,
    sellRangeHigh: 120_000,
  },
  {
    name: 'Medium',
    weightGrams: 150,
    printHours: 6,
    fullyLoadedCost: 104_000,
    sellRangeLow: 230_000,
    sellRangeHigh: 280_000,
  },
  {
    name: 'Large',
    weightGrams: 400,
    printHours: 16,
    fullyLoadedCost: 242_000,
    sellRangeLow: 600_000,
    sellRangeHigh: 700_000,
  },
];

// ── Web Build Market Assumptions ──────────────────────────────────────

export interface WebMarketTier {
  readonly label: string;
  readonly low: number;
  readonly high: number;
  readonly note: string;
}

export const webMarketTiers: readonly WebMarketTier[] = [
  {
    label: 'Static basic',
    low: 5_000_000,
    high: 8_000_000,
    note: 'Assumption: market-rate estimate for a basic static site.',
  },
  {
    label: 'Professional interactive',
    low: 8_000_000,
    high: 15_000_000,
    note: 'Assumption: market-rate estimate for professional interactive site.',
  },
  {
    label: 'Agency',
    low: 15_000_000,
    high: 30_000_000,
    note: 'Assumption: market-rate estimate for agency-built site.',
  },
];

export interface WebMaintenance {
  readonly label: string;
  readonly low: number;
  readonly high: number;
  readonly note: string;
}

export const webMaintenance: WebMaintenance = {
  label: 'Annual maintenance',
  low: 1_000_000,
  high: 3_000_000,
  note: 'Assumption: yearly maintenance cost range.',
};

// ── Hostinger Pricing ────────────────────────────────────────────────

export interface HostingerPlan {
  readonly name: string;
  readonly promoMonthly: number;
  readonly prepaidTotal: number;
  readonly prepaidMonths: number;
  readonly renewalMonthly: number;
}

export interface HostingerSource {
  readonly url: string;
  readonly accessDate: string;
  readonly checkoutCaveat: string;
}

export const hostingerPlans: readonly HostingerPlan[] = [
  {
    name: 'Single',
    promoMonthly: 19_900,
    prepaidTotal: 955_200,
    prepaidMonths: 48,
    renewalMonthly: 80_900,
  },
  {
    name: 'Premium',
    promoMonthly: 41_900,
    prepaidTotal: 2_011_200,
    prepaidMonths: 48,
    renewalMonthly: 125_900,
  },
];

export const hostingerSource: HostingerSource = {
  url: 'https://www.hostinger.com/vn/web-hosting',
  accessDate: '2026-08-28',
  checkoutCaveat:
    'Prices shown are promotional; actual checkout price may vary by payment term and region.',
};

// ── Target Bands ──────────────────────────────────────────────────────

export interface TargetBand {
  readonly utilizationRange: string;
  readonly paybackRange: string;
  readonly note: string;
}

export const targetBands: readonly TargetBand[] = [
  {
    utilizationRange: '20–25%',
    paybackRange: '~12 tháng',
    note: 'Conservative baseline.',
  },
  {
    utilizationRange: '30–40%',
    paybackRange: '6–8 tháng',
    note: 'Realistic target with steady demand.',
  },
];

export const ownerSalaryNote =
  'Owner salary materially increases the payback threshold; scenarios above exclude owner draw.';
