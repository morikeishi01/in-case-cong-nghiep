import { assumptions, targetBands, ownerSalaryNote } from '../data/business-model';
import { formatVND, formatPercent } from '../lib/format';

export function renderBusinessHypotheses(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'business-hypotheses';
  section.className = 'band-dark';

  const bandRows = targetBands.map(
    (b) =>
      `<li>
        <span class="hypo-tag hypo-tag--assumption">Gi&#7843; &#273;&#7883;nh</span>
        <span>Utilization ${b.utilizationRange} &rarr; ho&agrave;n v&#7889;n ${b.paybackRange} &mdash; ${b.note}</span>
      </li>`,
  ).join('');

  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[07]</span> Gi&#7843; thuy&#7879;t kinh doanh</h2>
      </div>
      <ul class="hypothesis-list">
        <li>
          <span class="hypo-tag hypo-tag--assumption">Gi&#7843; &#273;&#7883;nh</span>
          <span>Gi&aacute; filament ${formatVND(assumptions.filamentCostPerKg)}/kg v&agrave; t&#7927; l&#7879; hao h&#7909;t ${formatPercent(assumptions.wasteRate)}</span>
        </li>
        <li>
          <span class="hypo-tag hypo-tag--assumption">Gi&#7843; &#273;&#7883;nh</span>
          <span>Chi ph&iacute; m&aacute;y ${formatVND(assumptions.machineRatePerHour)}/gi&#7901; (&#273;i&#7879;n + hao m&ograve;n)</span>
        </li>
        ${bandRows}
        <li>
          <span class="hypo-tag hypo-tag--result">K&#7871;t qu&#7843;</span>
          <span>Ho&agrave;n v&#7889;n 4,69 th&aacute;ng &#7903; k&#7883;ch b&#7843;n c&#417; s&#7903; (35% utilization)</span>
        </li>
        <li>
          <span class="hypo-tag hypo-tag--result">K&#7871;t qu&#7843;</span>
          <span>Chi ph&iacute; th&#7921;c t&#7871; sau hao h&#7909;t: ${formatVND(assumptions.effectiveCostPerGram)}/gram</span>
        </li>
        <li>
          <span class="hypo-tag hypo-tag--sensitivity">&#272;&#7863;c t&iacute;nh</span>
          <span>${ownerSalaryNote}</span>
        </li>
      </ul>
    </div>
  `;
  return section;
}
