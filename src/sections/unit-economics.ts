import { assumptions } from '../data/business-model';
import { formatVND, formatPercent, formatNumber } from '../lib/format';

export function renderUnitEconomics(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'unit-economics';
  section.className = 'band-dark';
  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[03]</span> Kinh t&#7871; &#273;&#417;n v&#7883;</h2>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Th&ocirc;ng s&#7889;</th>
              <th>Gi&aacute; tr&#7883;</th>
              <th>Ghi ch&uacute;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gi&aacute; filament</td>
              <td class="data">${formatVND(assumptions.filamentCostPerKg)}/kg</td>
              <td>PLA/PETG trung b&igrave;nh</td>
            </tr>
            <tr>
              <td>T&#7887; l&#7879; ph&iacute;</td>
              <td class="data">${formatPercent(assumptions.wasteRate)}</td>
              <td>In h&#7887;ng, test, calibration</td>
            </tr>
            <tr>
              <td>Gi&aacute; th&agrave;nh hi&#7879;u l&#7921;c/gram</td>
              <td class="data">${formatVND(assumptions.effectiveCostPerGram)}/g</td>
              <td class="dim-label">K&#7871;t qu&#7843; m&ocirc; h&igrave;nh</td>
            </tr>
            <tr>
              <td>T&#7889;c &#273;&#7897; m&aacute;y</td>
              <td class="data">${formatVND(assumptions.machineRatePerHour)}/gi&#7901;</td>
              <td>Chi ph&iacute; &#273;i&#7879;n + hao m&ograve;n m&aacute;y</td>
            </tr>
            <tr>
              <td>Gi&#7901; l&#7883;ch/tu&#7847;n</td>
              <td class="data">${formatNumber(assumptions.maxCalendarHoursPerMonth)} gi&#7901;/th&aacute;ng</td>
              <td class="dim-label">24h &times; 30 ng&agrave;y = t&#7889;i &#273;a</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="key-line">
        &ldquo;L&#7907;i nhu&#7853;n kh&ocirc;ng n&#7857;m &#7903; s&#7889; gram nh&#7921;a; l&#7907;i nhu&#7853;n n&#7857;m &#7903; gi&aacute; tr&#7883; tr&ecirc;n m&#7895;i gi&#7901; m&aacute;y.&rdquo;
      </div>
    </div>
  `;
  return section;
}
