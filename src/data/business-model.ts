import { effectiveCostPerGram } from '../lib/finance';

// ── Business Assumptions ──────────────────────────────────────────────

export interface BusinessAssumptions {
  readonly printerCost: number;
  readonly filamentInventory: number;
  readonly supportingSetupAndBuffer: number;
  readonly startupBaseline: number;
  readonly filamentCostPerKg: number;
  readonly wasteRate: number;
  readonly effectiveCostPerGram: number;
  readonly machineRatePerHour: number;
  readonly maxCalendarHoursPerMonth: number;
}

const _filamentCostPerKg = 300_000;
const _wasteRate = 0.1;

export const assumptions: BusinessAssumptions = {
  printerCost: 12_000_000,
  filamentInventory: 3_000_000,
  supportingSetupAndBuffer: 3_000_000,
  startupBaseline: 18_000_000,
  filamentCostPerKg: _filamentCostPerKg,
  wasteRate: _wasteRate,
  effectiveCostPerGram: effectiveCostPerGram(_filamentCostPerKg, _wasteRate),
  machineRatePerHour: 4_000,
  maxCalendarHoursPerMonth: 720,
};

// ── Presentation rounding note ───────────────────────────────────────
// Scenario monthlyRecovery and paybackMonths are pre-computed for display.
// monthlyRecovery is exact (integer arithmetic).
// paybackMonths is rounded to 2 decimal places for presentation; tests
// verify the stored value is within 0.05 month of the computed value.

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

// ── 90-Day Milestones ────────────────────────────────────────────────

export interface Milestone {
  readonly week: string;
  readonly title: string;
  readonly detail: string;
}

export const milestones: readonly Milestone[] = [
  { week: 'Tu\u1EA7n 1\u20132', title: '\u0110\u1EB7t h\u00E0ng & chu\u1EA9n b\u1ECB', detail: 'Order m\u00E1y in, filament, d\u1EE5 c\u1EE5. Setup workspace, ngu\u1ED3n \u0111i\u1EC7n, b\u00E0n l\u00E0m.' },
  { week: 'Tu\u1EA7n 3\u20134', title: 'Nh\u1EADn h\u00E0ng & calibration', detail: 'L\u1EAFp \u0111\u1EB7t, test print, calibrate bed leveling v\u00E0 extrusion.' },
  { week: 'Tu\u1EA7n 5\u20136', title: 'Portfolio s\u1EA3n ph\u1EA9m m\u1EABu', detail: 'In 5\u201310 m\u1EABu \u0111\u1EA1i di\u1EC7n: case nh\u1ECF, trung b\u00ECnh, l\u1EDBn. Ch\u1EE5p \u1EA3nh, ghi nh\u1EADn chi ph\u00ED th\u1EF1c t\u1EBF.' },
  { week: 'Tu\u1EA7n 7\u20138', title: 'Ra m\u1EB7t k\u00EAnh b\u00E1n h\u00E0ng', detail: 'Website, m\u1EA1ng x\u00E3 h\u1ED9i, danh thi\u1EC7p. B\u1EAFt \u0111\u1EA7u ti\u1EBFp c\u1EADn kh\u00E1ch h\u00E0ng ti\u1EC1m n\u0103ng.' },
  { week: 'Tu\u1EA7n 9\u201310', title: '\u0110\u01A1n h\u00E0ng \u0111\u1EA7u ti\u00EAn', detail: 'Nh\u1EADn \u0111\u01A1n, s\u1EA3n xu\u1EA5t, giao h\u00E0ng. Thu th\u1EADp ph\u1EA3n h\u1ED3i kh\u00E1ch h\u00E0ng.' },
  { week: 'Tu\u1EA7n 11\u201312', title: 'T\u1ED1i \u01B0u quy tr\u00ECnh', detail: '\u0110\u00E1nh gi\u00E1 utilization th\u1EF1c t\u1EBF, t\u1ED1i \u01B0u slicing profile, gi\u1EA3m waste.' },
  { week: 'Tu\u1EA7n 13', title: 'T\u1ED5ng k\u1EBFt & quy\u1EBFt \u0111\u1ECBnh', detail: 'So s\u00E1nh k\u1EBFt qu\u1EA3 v\u1EDBi m\u00F4 h\u00ECnh. Quy\u1EBFt \u0111\u1ECBnh m\u1EDF r\u1ED9ng ho\u1EB7c \u0111i\u1EC1u ch\u1EC9nh.' },
];
