import { scenarios } from '../data/business-model';
import { formatVND, formatPercent, formatMonths } from '../lib/format';

const labelMap: Record<string, string> = {
  conservative: 'Th&#7853;n tr&#7885;ng',
  base: 'C&#417; s&#7903;',
  aggressive: 'T&iacute;ch c&#7921;c',
};

export function renderUtilizationScenarios(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'utilization-scenarios';
  section.className = 'band-dark';

  const dossiers = scenarios.map((s) => {
    const isBase = s.label === 'base';
    const isAggressive = s.label === 'aggressive';
    let cls = 'dossier';
    if (isBase) cls += ' dossier-highlight';
    if (isAggressive) cls += ' dossier-aggressive';

    return `
      <article class="${cls}">
        <div class="dossier-header">${labelMap[s.label] ?? s.label}</div>
        <div class="dossier-row"><span>S&#7917; d&#7909;ng</span><span class="data">${formatPercent(s.utilization)}</span></div>
        <div class="dossier-row"><span>Gi&#7901; b&aacute;n</span><span class="data">${s.soldHours} h/th&aacute;ng</span></div>
        <div class="dossier-row"><span>&#272;&oacute;ng g&oacute;p/h</span><span class="data">${formatVND(s.contributionPerHour)}</span></div>
        <div class="dossier-row"><span>Chi ph&iacute; c&#7889; &#273;&#7883;nh</span><span class="data">${formatVND(s.fixedCost)}</span></div>
        <div class="dossier-row"><span>Thu l&#7841;i/th&aacute;ng</span><span class="data">${formatVND(s.monthlyRecovery)}</span></div>
        ${s.rampPaybackLabel ? `<div class="dossier-row"><span>Ramp-up</span><span class="data">${s.rampPaybackLabel}</span></div>` : ''}
        <div class="dossier-payback">${formatMonths(s.paybackMonths)}</div>
      </article>`;
  }).join('');

  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[05]</span> K&#7883;ch b&#7843;n s&#7917; d&#7909;ng</h2>
      </div>
      <p>Ba k&#7883;ch b&#7843;n t&#7915; th&#7853;n tr&#7885;ng &#273;&#7871;n t&iacute;ch c&#7921;c. K&#7883;ch b&#7843;n c&#417; s&#7903; (base) &#273;&#432;&#7907;c &#273;&aacute;nh d&#7845;u n&#7893;i b&#7853;t.</p>
      <div class="dossier-grid">
        ${dossiers}
      </div>
      <p class="dim-label section-note--wide">
        Thu l&#7841;i = &#273;&oacute;ng g&oacute;p/h &times; gi&#7901; b&aacute;n &minus; chi ph&iacute; c&#7889; &#273;&#7883;nh.
        Ho&agrave;n v&#7889;n = v&#7889;n &divide; thu l&#7841;i/th&aacute;ng.
        <span class="dim-label">K&#7871;t qu&#7843; m&ocirc; h&igrave;nh.</span>
      </p>
    </div>
  `;
  return section;
}
