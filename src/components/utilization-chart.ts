/**
 * Accessible inline SVG horizontal bar chart comparing scenarios.
 *
 * - role="img" with Vietnamese aria-label
 * - Text labels and numeric values on each bar (no color-only meaning)
 * - No external chart library
 * - No inline styles; uses CSS classes and SVG attributes
 * - Scaled to max monthlyRecovery
 * - Base scenario highlighted with signal color
 */

// ── Types ───────────────────────────────────────────────────────────

export interface ChartScenario {
  readonly label: string;
  readonly monthlyRecovery: number;
  readonly isBase?: boolean;
  readonly isUser?: boolean;
}

// ── Constants ───────────────────────────────────────────────────────

const SVG_NS = 'http://www.w3.org/2000/svg';

const BAR_HEIGHT = 32;
const BAR_GAP = 12;
const LABEL_WIDTH = 100;
const VALUE_WIDTH = 140;
const CHART_PADDING = 16;
const MIN_CHART_WIDTH = 320;

// ── Helpers ─────────────────────────────────────────────────────────

function createSvgElement(tag: string, attrs: Record<string, string> = {}): SVGElement {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

function formatVNDShort(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}tr ₫`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k ₫`;
  }
  return `${value} ₫`;
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Render an accessible horizontal bar chart into the given container.
 * Replaces container's innerHTML entirely.
 *
 * @param container - DOM element to render into
 * @param scenarios - Array of scenario data with label and monthlyRecovery
 */
export function createUtilizationChart(
  container: HTMLElement,
  scenarios: readonly ChartScenario[],
): void {
  if (scenarios.length === 0) {
    container.innerHTML = '';
    return;
  }

  // Find max for scaling (use max of positive values, or 1 if all ≤ 0)
  const maxRecovery = Math.max(
    1,
    ...scenarios.map((s) => Math.max(0, s.monthlyRecovery)),
  );

  const totalBars = scenarios.length;
  const chartHeight = totalBars * (BAR_HEIGHT + BAR_GAP) - BAR_GAP + CHART_PADDING * 2;

  // Compute available bar width from container
  const containerWidth = container.clientWidth || MIN_CHART_WIDTH;
  const barAreaWidth = Math.max(
    100,
    containerWidth - LABEL_WIDTH - VALUE_WIDTH - CHART_PADDING * 2,
  );

  const svgWidth = LABEL_WIDTH + barAreaWidth + VALUE_WIDTH + CHART_PADDING * 2;

  // Build aria description
  const ariaDesc = scenarios
    .map((s) => `${s.label}: ${formatVNDShort(s.monthlyRecovery)}`)
    .join('; ');
  const ariaLabel = `Biểu đồ so sánh thu lại hàng tháng: ${ariaDesc}`;

  // Create SVG
  const svg = createSvgElement('svg', {
    role: 'img',
    'aria-label': ariaLabel,
    class: 'roi-chart-svg',
    viewBox: `0 0 ${svgWidth} ${chartHeight}`,
    width: '100%',
  });

  // Title for accessibility
  const title = createSvgElement('title');
  title.textContent = 'So sánh thu lại hàng tháng giữa các kịch bản';
  svg.appendChild(title);

  // Description for accessibility
  const desc = createSvgElement('desc');
  desc.textContent = ariaDesc;
  svg.appendChild(desc);

  scenarios.forEach((scenario, index) => {
    const y = CHART_PADDING + index * (BAR_HEIGHT + BAR_GAP);
    const isPositive = scenario.monthlyRecovery > 0;
    const barWidth = isPositive
      ? Math.max(2, (scenario.monthlyRecovery / maxRecovery) * barAreaWidth)
      : 0;

    // Determine CSS class
    let barClass = 'roi-chart-bar';
    if (scenario.isBase) barClass += ' roi-chart-bar--base';
    else if (scenario.isUser) barClass += ' roi-chart-bar--user';
    else if (scenario.monthlyRecovery <= 0) barClass += ' roi-chart-bar--negative';

    let labelClass = 'roi-chart-label';
    if (scenario.isBase) labelClass += ' roi-chart-label--base';

    // Label (left)
    const label = createSvgElement('text', {
      x: String(CHART_PADDING),
      y: String(y + BAR_HEIGHT / 2 + 5),
      class: labelClass,
    });
    label.textContent = scenario.label;
    svg.appendChild(label);

    // Bar
    if (isPositive) {
      const rect = createSvgElement('rect', {
        x: String(LABEL_WIDTH + CHART_PADDING),
        y: String(y),
        width: String(barWidth),
        height: String(BAR_HEIGHT),
        class: barClass,
        rx: '3',
        ry: '3',
      });
      svg.appendChild(rect);
    } else {
      // Zero/negative: show a thin dashed line indicator
      const line = createSvgElement('line', {
        x1: String(LABEL_WIDTH + CHART_PADDING),
        y1: String(y + BAR_HEIGHT / 2),
        x2: String(LABEL_WIDTH + CHART_PADDING + 20),
        y2: String(y + BAR_HEIGHT / 2),
        class: 'roi-chart-bar roi-chart-bar--negative',
        'stroke-dasharray': '4,3',
      });
      svg.appendChild(line);
    }

    // Value text (right of bar)
    const valueX = LABEL_WIDTH + CHART_PADDING + barWidth + 8;
    const value = createSvgElement('text', {
      x: String(Math.min(valueX, svgWidth - CHART_PADDING)),
      y: String(y + BAR_HEIGHT / 2 + 5),
      class: 'roi-chart-value data',
    });
    value.textContent = formatVNDShort(scenario.monthlyRecovery);
    svg.appendChild(value);
  });

  container.innerHTML = '';
  container.appendChild(svg);
}
