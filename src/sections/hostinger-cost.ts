import { hostingerPlans, hostingerSource } from '../data/business-model';
import { formatVND } from '../lib/format';

export function renderHostingerCost(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'hostinger-cost';
  section.className = 'band-light';

  const rows = hostingerPlans
    .map(
      (p) => `
      <tr>
        <td>${p.name}</td>
        <td class="data">${formatVND(p.promoMonthly)}/th&aacute;ng</td>
        <td class="data">${formatVND(p.prepaidTotal)} / ${p.prepaidMonths} th&aacute;ng</td>
        <td class="data">${formatVND(p.renewalMonthly)}/th&aacute;ng</td>
      </tr>`,
    )
    .join('');

  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[10]</span> Chi ph&iacute; hosting (Hostinger)</h2>
      </div>
      <p>Gi&aacute; hosting t&#7889;i &#432;u cho website t&iacute;nh (static site).</p>
      <div class="table-wrapper">
        <table>
          <caption class="visually-hidden">B&#7843;ng gi&aacute; hosting Hostinger: khuy&#7871;n m&atilde;i, tr&#7843; tr&#432;&#7899;c v&agrave; gia h&#7841;n</caption>
          <thead>
            <tr>
              <th>G&oacute;i</th>
              <th>Khuy&#7871;n m&atilde;i</th>
              <th>Tr&#7843; tr&#432;&#7899;c</th>
              <th>Gia h&#7841;n</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <p class="caveat">${hostingerSource.checkoutCaveat}</p>
      <p class="source-ref">
        Ngu&#7891;n: <a href="${hostingerSource.url}" target="_blank" rel="noopener noreferrer">${hostingerSource.url}</a>
        &mdash; truy c&#7853;p ng&agrave;y ${hostingerSource.accessDate}
      </p>
    </div>
  `;
  return section;
}
