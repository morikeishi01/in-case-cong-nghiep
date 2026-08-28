import { webMarketTiers, webMaintenance } from '../data/business-model';
import { formatVND } from '../lib/format';

export function renderWebBuildCost(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'web-build-cost';
  section.className = 'band-dark';

  const rows = webMarketTiers
    .map(
      (t) => `
      <tr>
        <td>${t.label}</td>
        <td class="data">${formatVND(t.low)} &ndash; ${formatVND(t.high)}</td>
        <td class="dim-label">${t.note}</td>
      </tr>`,
    )
    .join('');

  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[09]</span> Chi ph&iacute; x&acirc;y d&#7921;ng website</h2>
      </div>
      <p>U&#7899;c t&iacute;nh th&#7883; tr&#432;&#7901;ng cho vi&#7879;c x&acirc;y d&#7921;ng website gi&#7899;i thi&#7879;u doanh nghi&#7879;p.</p>
      <div class="table-wrapper">
        <table>
          <caption class="visually-hidden">B&#7843;ng &#432;&#7899;c t&iacute;nh chi ph&iacute; x&acirc;y d&#7921;ng website theo h&#7841;ng m&#7909;c</caption>
          <thead>
            <tr>
              <th>H&#7841;ng m&#7909;c</th>
              <th>Chi ph&iacute;</th>
              <th>Ghi ch&uacute;</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
            <tr>
              <td>${webMaintenance.label}</td>
              <td class="data">${formatVND(webMaintenance.low)} &ndash; ${formatVND(webMaintenance.high)}/n&#259;m</td>
              <td class="dim-label">${webMaintenance.note}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="dim-label section-note">
        Gi&#7843; &#273;&#7883;nh: &#432;&#7899;c t&iacute;nh th&#7883; tr&#432;&#7901;ng, kh&ocirc;ng ph&#7843;i b&aacute;o gi&aacute; c&#7909; th&#7875;.
      </p>
    </div>
  `;
  return section;
}
