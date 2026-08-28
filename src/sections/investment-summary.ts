import { assumptions } from '../data/business-model';
import { formatVND } from '../lib/format';

export function renderInvestmentSummary(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'investment-summary';
  section.className = 'band-light';
  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[02]</span> T&#7893;ng quan &#273;&#7847;u t&#432;</h2>
      </div>
      <p>V&#7889;n kh&#7903;i &#273;&#7847;u d&#432;&#7899;i 20 tri&#7879;u &#273;&#7891;ng cho m&#7897;t m&aacute;y in FDM + v&#7853;t t&#432; ban &#273;&#7847;u.</p>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>H&#7841;ng m&#7909;c</th>
              <th>Chi ti&#7871;t</th>
              <th>Gi&aacute; tr&#7883;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>M&aacute;y in FDM</td>
              <td>M&aacute;y in 3D c&#7845;p nh&#7853;p, kh&#7889;i l&#432;&#7907;ng in 220 &times; 220 &times; 250 mm</td>
              <td class="data">${formatVND(assumptions.printerCost)}</td>
            </tr>
            <tr>
              <td>T&#7891;n kho filament</td>
              <td>PLA/PETG ban &#273;&#7847;u, ~10 kg</td>
              <td class="data">${formatVND(assumptions.filamentInventory)}</td>
            </tr>
            <tr class="total-row">
              <td>T&#7893;ng</td>
              <td></td>
              <td class="data">${formatVND(assumptions.startupBaseline)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="dim-label" style="margin-top:calc(var(--grid-unit)*0.5);">
        Gi&#7843; &#273;&#7883;nh: gi&aacute; m&aacute;y v&agrave; filament t&#7841;i th&#7901;i &#273;i&#7875;m l&#7853;p k&#7871; ho&#7841;ch. Kh&ocirc;ng bao g&#7891;m chi ph&iacute; v&#7853;n chuy&#7875;n, thu&#7871;, ho&#7863;c owner salary.
      </p>
    </div>
  `;
  return section;
}
