export function renderRoiCalculator(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'roi-calculator';
  section.className = 'band-light';
  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[06]</span> B&#7897; t&iacute;nh ROI</h2>
      </div>
      <div class="stub-notice">
        B&#7897; t&iacute;nh s&#7869; t&#7843;i &mdash; &#273;ang ph&aacute;t tri&#7875;n.
      </div>
      <p class="dim-label section-note">
        T&iacute;nh n&#259;ng t&#432;&#417;ng t&aacute;c cho ph&eacute;p &#273;i&#7873;u ch&#7881;nh t&#7927; l&#7879; s&#7917; d&#7909;ng v&agrave; xem k&#7871;t qu&#7843; ho&agrave;n v&#7889;n ngay l&#7853;p t&#7913;c.
      </p>
    </div>
  `;
  return section;
}
