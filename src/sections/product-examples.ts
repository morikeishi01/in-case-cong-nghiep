import { productExamples } from '../data/business-model';
import { contributionMargin } from '../lib/finance';
import { formatVND, formatNumber } from '../lib/format';

export function renderProductExamples(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'product-examples';
  section.className = 'band-light';

  const rows = productExamples.map((p) => {
    const marginLow = contributionMargin(p.sellRangeLow, p.fullyLoadedCost);
    const marginHigh = contributionMargin(p.sellRangeHigh, p.fullyLoadedCost);
    return `
      <tr>
        <td>${p.name}</td>
        <td class="data">${formatNumber(p.weightGrams)} g</td>
        <td class="data">${formatNumber(p.printHours)} h</td>
        <td class="data">${formatVND(p.fullyLoadedCost)}</td>
        <td class="data">${formatVND(p.sellRangeLow)} &ndash; ${formatVND(p.sellRangeHigh)}</td>
        <td class="data margin-positive">${formatVND(marginLow)} &ndash; ${formatVND(marginHigh)}</td>
      </tr>`;
  }).join('');

  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[04]</span> V&iacute; d&#7921; s&#7843;n ph&#7849;m</h2>
      </div>
      <p>Gi&aacute; th&agrave;nh &ldquo;fully loaded&rdquo; bao g&#7891;m v&#7853;t li&#7879;u, m&aacute;y, nh&acirc;n c&ocirc;ng l&#7853;p t&#7921;, gia c&ocirc;ng h&#7853;u k&#7929; v&agrave; &#273;&oacute;ng g&oacute;i.</p>
      <div class="table-wrapper">
        <table>
          <caption class="visually-hidden">B&#7843;ng v&iacute; d&#7921; s&#7843;n ph&#7849;m: gi&aacute; th&agrave;nh, gi&aacute; b&aacute;n v&agrave; l&#7907;i nhu&#7853;n bi&ecirc;n</caption>
          <thead>
            <tr>
              <th>S&#7843;n ph&#7849;m</th>
              <th>Kh&#7889;i l&#432;&#7907;ng</th>
              <th>Th&#7901;i gian</th>
              <th>Gi&aacute; th&agrave;nh</th>
              <th>Gi&aacute; b&aacute;n</th>
              <th>L&#7907;i nhu&#7853;n bi&ecirc;n</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <p class="dim-label section-note">
        L&#7907;i nhu&#7853;n bi&ecirc;n t&iacute;nh t&#7915; gi&aacute; b&aacute;n th&#7845;p nh&#7845;t &minus; gi&aacute; th&agrave;nh fully loaded.
        <span class="dim-label">K&#7871;t qu&#7843; m&ocirc; h&igrave;nh.</span>
      </p>
    </div>
  `;
  return section;
}
