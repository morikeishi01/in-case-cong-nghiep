import { createRoiCalculator } from '../components/roi-calculator';

export function renderRoiCalculator(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'roi-calculator';
  section.className = 'band-light';

  const header = document.createElement('div');
  header.className = 'container section-inner';
  header.innerHTML = `
    <div class="section-header">
      <h2><span class="section-index">[06]</span> B&#7897; t&iacute;nh ROI</h2>
    </div>
    <p>Thay &#273;&#7893;i gi&#7843; &#273;&#7883;nh &#273;&#7875; xem gi&#7901; b&aacute;n, thu l&#7841;i v&agrave; ho&agrave;n v&#7889;n.</p>
  `;

  const calcContainer = document.createElement('div');
  calcContainer.className = 'container';

  section.appendChild(header);
  section.appendChild(calcContainer);

  // Mount calculator after DOM insertion (deferred)
  requestAnimationFrame(() => {
    createRoiCalculator(calcContainer);
  });

  return section;
}
