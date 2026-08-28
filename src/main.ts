/* ── Styles ──────────────────────────────────────────────────────────── */
import './styles/tokens.css';
import './styles/base.css';
import './styles/blueprint.css';

/* ── Section renderers ───────────────────────────────────────────────── */
import { renderHero } from './sections/hero';
import { renderInvestmentSummary } from './sections/investment-summary';
import { renderUnitEconomics } from './sections/unit-economics';
import { renderProductExamples } from './sections/product-examples';
import { renderUtilizationScenarios } from './sections/utilization-scenarios';
import { renderRoiCalculator } from './sections/roi-calculator-section';
import { renderBusinessHypotheses } from './sections/business-hypotheses';
import { renderNinetyDayPlan } from './sections/ninety-day-plan';
import { renderWebBuildCost } from './sections/web-build-cost';
import { renderHostingerCost } from './sections/hostinger-cost';
import { renderConclusionCta } from './sections/conclusion-cta';

/* ── Mount ───────────────────────────────────────────────────────────── */
const main = document.getElementById('app');
if (!main) throw new Error('#app not found');

const sections: HTMLElement[] = [
  renderHero(),            // 01
  renderInvestmentSummary(), // 02
  renderUnitEconomics(),   // 03
  renderProductExamples(), // 04
  renderUtilizationScenarios(), // 05
  renderRoiCalculator(),   // 06
  renderBusinessHypotheses(), // 07
  renderNinetyDayPlan(),   // 08
  renderWebBuildCost(),    // 09
  renderHostingerCost(),   // 10
  renderConclusionCta(),   // 11
];

for (const s of sections) {
  main.appendChild(s);
}

/* ── Footer ──────────────────────────────────────────────────────────── */
const footer = document.createElement('footer');
footer.className = 'site-footer';
footer.innerHTML = `
  <div class="container">
    <p>IN CASE C&Ocirc;NG NGHI&#7878;P &mdash; N&#7873;n t&#7843;ng tr&igrave;nh b&agrave;y nh&agrave; &#273;&#7847;u t&#432;</p>
  </div>
`;
main.appendChild(footer);
