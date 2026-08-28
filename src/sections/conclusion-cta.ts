export function renderConclusionCta(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'conclusion-cta';
  section.className = 'band-dark';
  section.innerHTML = `
    <div class="container section-inner">
      <div class="cta-block">
        <h2><span class="section-index">[11]</span> T&#7893;ng k&#7871;t</h2>
        <p class="cta-summary">
          V&#7889;n kh&#7903;i &#273;&#7847;u d&#432;&#7899;i 20 tri&#7879;u, ho&agrave;n v&#7889;n d&#7921; ki&#7871;n 4,69 th&aacute;ng &#7903; k&#7883;ch b&#7843;n c&#417; s&#7903;.
          R&agrave;o c&#7843; gia nh&#7853;p th&#7845;p, m&ocirc; h&igrave;nh kinh t&#7871; r&otilde; r&agrave;ng, kh&ocirc;ng c&#7847;n kho l&#7899;n hay nh&acirc;n s&#7921; &#273;&ocirc;ng.
        </p>
        <p class="cta-lead">
          B&#432;&#7899;c ti&#7871;p:
        </p>
        <ol class="cta-next-steps">
          <li>X&aacute;c nh&#7853;n v&#7889;n kh&#7843; d&#7909;ng v&agrave; th&#7901;i gian cam k&#7871;t</li>
          <li>&#272;&#7863;t h&agrave;ng m&aacute;y in v&agrave; filament</li>
          <li>Ch&#7841;y k&#7871; ho&#7841;ch 90 ng&agrave;y</li>
          <li>&#272;&aacute;nh gi&aacute; k&#7871;t qu&#7843; th&#7921;c t&#7871; sau tu&#7847;n 13</li>
        </ol>
        <p class="cta-contact">
          Li&ecirc;n h&#7879; &#273;&#7875; th&#7843;o lu&#7853;n chi ti&#7871;t.
        </p>
      </div>
    </div>
  `;
  return section;
}
