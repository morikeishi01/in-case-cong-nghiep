/**
 * ROI Calculator — pure projection function + interactive DOM component.
 *
 * calculateRoiProjection(inputs) is a pure, side-effect-free function
 * that computes sold hours, monthly recovery, and payback period.
 *
 * createRoiCalculator(container) builds an accessible interactive form
 * with live results and an inline SVG bar chart comparing 3 scenarios.
 *
 * All monetary values in VND. Vietnamese UI labels.
 */

import { assumptions } from '../data/business-model';
import { monthlyRecovery, paybackMonths } from '../lib/finance';
import { formatVND, formatMonths, formatNumber } from '../lib/format';
import { createUtilizationChart } from './utilization-chart';

// ── Types ───────────────────────────────────────────────────────────

export interface RoiInputs {
  readonly utilization: number;
  readonly contributionPerHour: number;
  readonly fixedCost: number;
  readonly startupCapital: number;
  readonly maxCalendarHoursPerMonth: number;
}

export interface RoiProjection {
  readonly soldHours: number;
  readonly monthlyRecovery: number;
  readonly paybackMonths: number;
}

// ── Pure projection function ────────────────────────────────────────

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} phải là số hữu hạn, nhận được ${value}`);
  }
}

function assertPositive(value: number, name: string): void {
  assertFinite(value, name);
  if (value <= 0) {
    throw new RangeError(`${name} phải lớn hơn 0, nhận được ${value}`);
  }
}

function assertNonNegative(value: number, name: string): void {
  assertFinite(value, name);
  if (value < 0) {
    throw new RangeError(`${name} phải không âm, nhận được ${value}`);
  }
}

/**
 * Compute ROI projection from investor-adjustable inputs.
 *
 * @param inputs - utilization (0–1+), contributionPerHour (VND),
 *   fixedCost (VND), startupCapital (VND ≥ 0),
 *   maxCalendarHoursPerMonth (hours > 0)
 * @returns soldHours, monthlyRecovery (may be negative), paybackMonths
 *   (Infinity when recovery ≤ 0 and capital > 0)
 * @throws RangeError on NaN, Infinity, or domain violations
 */
export function calculateRoiProjection(inputs: RoiInputs): RoiProjection {
  assertFinite(inputs.utilization, 'utilization');
  assertFinite(inputs.contributionPerHour, 'contributionPerHour');
  assertNonNegative(inputs.fixedCost, 'fixedCost');
  assertNonNegative(inputs.startupCapital, 'startupCapital');
  assertPositive(inputs.maxCalendarHoursPerMonth, 'maxCalendarHoursPerMonth');

  const soldHours = Math.round(inputs.utilization * inputs.maxCalendarHoursPerMonth);
  const recovery = monthlyRecovery(
    inputs.contributionPerHour,
    soldHours,
    inputs.fixedCost,
  );
  const payback = paybackMonths(inputs.startupCapital, recovery);

  return {
    soldHours,
    monthlyRecovery: recovery,
    paybackMonths: payback,
  };
}

// ── Scenario presets for chart comparison ───────────────────────────

interface ScenarioPreset {
  readonly label: string;
  readonly utilization: number;
  readonly contributionPerHour: number;
  readonly fixedCost: number;
}

const scenarioPresets: readonly ScenarioPreset[] = [
  { label: 'Thận trọng', utilization: 0.20, contributionPerHour: 12_000, fixedCost: 1_000_000 },
  { label: 'Cơ sở', utilization: 0.35, contributionPerHour: 20_000, fixedCost: 1_200_000 },
  { label: 'Tích cực', utilization: 0.55, contributionPerHour: 28_000, fixedCost: 1_500_000 },
];

// ── DOM helpers ─────────────────────────────────────────────────────

/**
 * Query a required element by selector with a type assertion.
 * Throws a descriptive error if the element is missing (template drift).
 */
function queryRequired<K extends keyof HTMLElementTagNameMap>(
  container: HTMLElement,
  selector: K,
): HTMLElementTagNameMap[K];
function queryRequired<T extends Element>(
  container: HTMLElement,
  selector: string,
  expectedType: string,
): T;
function queryRequired(
  container: HTMLElement,
  selector: string,
  expectedType?: string,
): Element {
  const el = container.querySelector(selector);
  if (!el) {
    const desc = expectedType ?? selector;
    throw new Error(
      `Required element "${selector}" (${desc}) not found — template may have drifted.`,
    );
  }
  return el;
}

// ── DOM component ───────────────────────────────────────────────────

/**
 * Build and mount the interactive ROI calculator into the given container.
 * The container's innerHTML is replaced entirely.
 */
export function createRoiCalculator(container: HTMLElement): void {
  const maxHours = assumptions.maxCalendarHoursPerMonth;
  const capital = assumptions.startupBaseline;

  // Build form HTML
  container.innerHTML = `
    <div class="roi-calc">
      <div class="roi-calc-layout">
        <div class="roi-calculator-controls">
          <div class="roi-field">
            <label for="roi-utilization" class="roi-label">Tỷ lệ sử dụng</label>
            <div class="roi-range-row">
              <input
                type="range"
                id="roi-utilization"
                class="roi-range"
                min="5" max="80" step="1" value="35"
                aria-describedby="roi-utilization-val"
              />
              <output id="roi-utilization-val" class="roi-output data" for="roi-utilization">35%</output>
            </div>
          </div>
          <div class="roi-field">
            <label for="roi-contribution" class="roi-label">Đóng góp/giờ (₫)</label>
            <input
              type="number"
              id="roi-contribution"
              class="roi-input"
              min="0" step="1000" value="20000"
            />
          </div>
          <div class="roi-field">
            <label for="roi-fixed" class="roi-label">Chi phí cố định/tháng (₫)</label>
            <input
              type="number"
              id="roi-fixed"
              class="roi-input"
              min="0" step="100000" value="1200000"
            />
          </div>
          <div class="roi-field">
            <label for="roi-capital" class="roi-label">Vốn đầu tư (₫)</label>
            <input
              type="number"
              id="roi-capital"
              class="roi-input"
              min="0" step="100000" value="${capital}"
            />
          </div>
        </div>
        <div class="roi-calculator-results" aria-live="polite" aria-atomic="true">
          <div class="roi-result-grid">
            <div class="roi-result-item">
              <span class="roi-result-label dim-label">Giờ bán/tháng</span>
              <output id="roi-out-hours" class="roi-result-value data" for="roi-utilization roi-contribution roi-fixed roi-capital">—</output>
            </div>
            <div class="roi-result-item">
              <span class="roi-result-label dim-label">Thu lại/tháng</span>
              <output id="roi-out-recovery" class="roi-result-value data" for="roi-utilization roi-contribution roi-fixed roi-capital">—</output>
            </div>
            <div class="roi-result-item roi-result-payback">
              <span class="roi-result-label dim-label">Hoàn vốn</span>
              <output id="roi-out-payback" class="roi-result-value roi-payback-value data" for="roi-utilization roi-contribution roi-fixed roi-capital">—</output>
            </div>
          </div>
          <div id="roi-error" class="roi-error" role="alert" aria-live="assertive"></div>
        </div>
      </div>
      <div id="roi-chart-container" class="roi-chart-container"></div>
    </div>
  `;

  // Element references — typed query helper throws on template drift
  const elUtilization = queryRequired<HTMLInputElement>(container, '#roi-utilization', 'HTMLInputElement');
  const elUtilizationVal = queryRequired<HTMLOutputElement>(container, '#roi-utilization-val', 'HTMLOutputElement');
  const elContribution = queryRequired<HTMLInputElement>(container, '#roi-contribution', 'HTMLInputElement');
  const elFixed = queryRequired<HTMLInputElement>(container, '#roi-fixed', 'HTMLInputElement');
  const elCapital = queryRequired<HTMLInputElement>(container, '#roi-capital', 'HTMLInputElement');
  const elOutHours = queryRequired<HTMLOutputElement>(container, '#roi-out-hours', 'HTMLOutputElement');
  const elOutRecovery = queryRequired<HTMLOutputElement>(container, '#roi-out-recovery', 'HTMLOutputElement');
  const elOutPayback = queryRequired<HTMLOutputElement>(container, '#roi-out-payback', 'HTMLOutputElement');
  const elError = queryRequired<HTMLElement>(container, '#roi-error', 'HTMLElement');
  const chartContainer = queryRequired<HTMLElement>(container, '#roi-chart-container', 'HTMLElement');
  const elResults = queryRequired<HTMLElement>(container, '.roi-calculator-results', 'HTMLElement');

  // Last valid result for preserving display on invalid input
  let lastValidResult: RoiProjection | null = null;

  function readInputs(): RoiInputs | null {
    const utilRaw = elUtilization.valueAsNumber;
    const contribRaw = elContribution.valueAsNumber;
    const fixedRaw = elFixed.valueAsNumber;
    const capitalRaw = elCapital.valueAsNumber;

    // Check for empty/NaN
    if (
      Number.isNaN(utilRaw) ||
      Number.isNaN(contribRaw) ||
      Number.isNaN(fixedRaw) ||
      Number.isNaN(capitalRaw)
    ) {
      return null;
    }

    return {
      utilization: utilRaw / 100,
      contributionPerHour: contribRaw,
      fixedCost: fixedRaw,
      startupCapital: capitalRaw,
      maxCalendarHoursPerMonth: maxHours,
    };
  }

  function formatPayback(months: number): string {
    if (!Number.isFinite(months)) return 'Không hoàn vốn';
    return formatMonths(months);
  }

  function markStale(stale: boolean): void {
    elResults.classList.toggle('roi-results--stale', stale);
  }

  function update(): void {
    elError.textContent = '';
    elError.style.display = 'none';
    markStale(false);

    const inputs = readInputs();
    if (!inputs) {
      if (lastValidResult) {
        // Keep last valid result visible but mark stale
        elError.textContent = 'Vui lòng nhập đầy đủ giá trị hợp lệ.';
        elError.style.display = '';
        markStale(true);
      } else {
        elOutHours.textContent = '—';
        elOutRecovery.textContent = '—';
        elOutPayback.textContent = '—';
        elError.textContent = 'Vui lòng nhập đầy đủ giá trị hợp lệ.';
        elError.style.display = '';
        markStale(true);
      }
      return;
    }

    // Range validation
    const utilPct = elUtilization.valueAsNumber;
    if (utilPct < 5 || utilPct > 80) {
      elError.textContent = 'Tỷ lệ sử dụng phải từ 5% đến 80%.';
      elError.style.display = '';
      markStale(true);
      return;
    }

    try {
      const result = calculateRoiProjection(inputs);
      lastValidResult = result;

      elUtilizationVal.textContent = `${utilPct}%`;
      elOutHours.textContent = `${formatNumber(result.soldHours)} giờ`;
      elOutRecovery.textContent = formatVND(result.monthlyRecovery);
      elOutPayback.textContent = formatPayback(result.paybackMonths);

      // Update chart with user scenario + presets
      updateUserChart(chartContainer, result, maxHours, capital);
    } catch (err: unknown) {
      if (err instanceof RangeError) {
        elError.textContent = err.message;
        elError.style.display = '';
        markStale(true);
        if (!lastValidResult) {
          elOutHours.textContent = '—';
          elOutRecovery.textContent = '—';
          elOutPayback.textContent = '—';
        }
      } else {
        throw err;
      }
    }
  }

  // Wire up events
  elUtilization.addEventListener('input', update);
  elContribution.addEventListener('input', update);
  elFixed.addEventListener('input', update);
  elCapital.addEventListener('input', update);

  // Initial render
  update();
}

// ── Chart update helper ─────────────────────────────────────────────

function updateUserChart(
  chartContainer: HTMLElement,
  userResult: RoiProjection,
  maxHours: number,
  capital: number,
): void {
  // Build 3 preset scenarios + user scenario
  const presetResults = scenarioPresets.map((preset) => {
    const proj = calculateRoiProjection({
      utilization: preset.utilization,
      contributionPerHour: preset.contributionPerHour,
      fixedCost: preset.fixedCost,
      startupCapital: capital,
      maxCalendarHoursPerMonth: maxHours,
    });
    return { label: preset.label, ...proj };
  });

  // Check if user scenario matches a preset
  const userMatchesPreset = presetResults.some(
    (p) =>
      p.monthlyRecovery === userResult.monthlyRecovery &&
      p.soldHours === userResult.soldHours,
  );

  const scenarios: Array<{ label: string; monthlyRecovery: number; isBase?: boolean; isUser?: boolean }> = [
    ...presetResults.map((p) => ({
      label: p.label,
      monthlyRecovery: p.monthlyRecovery,
      isBase: p.label === 'Cơ sở',
    })),
  ];

  if (!userMatchesPreset) {
    scenarios.push({
      label: 'Tùy chỉnh',
      monthlyRecovery: userResult.monthlyRecovery,
      isUser: true,
    });
  }

  createUtilizationChart(chartContainer, scenarios);
}
