interface Milestone {
  week: string;
  title: string;
  detail: string;
}

const milestones: readonly Milestone[] = [
  { week: 'Tu&#7847;n 1\u20132', title: '&#272;&#7863;t h&agrave;ng & chu&#7849;n b&#7883;', detail: 'Order m&aacute;y in, filament, d&#7909; c&#7909;. Setup workspace, ngu&#7891;n &#273;i&#7879;n, b&agrave;n l&agrave;m.' },
  { week: 'Tu&#7847;n 3\u20134', title: 'Nh&#7853;n h&agrave;ng & calibration', detail: 'L&#7855;p &#273;&#7863;t, test print, calibrate bed leveling v&agrave; extrusion.' },
  { week: 'Tu&#7847;n 5\u20136', title: 'Portfolio s&#7843;n ph&#7849;m m&#7851;u', detail: 'In 5\u201310 m&#7851;u &#273;&#7841;i di&#7879;n: case nh&#7887;, trung b&igrave;nh, l&#7899;n. Ch&#7909;p &#7843;nh, ghi nh&#7853;n chi ph&iacute; th&#7921;c t&#7871;.' },
  { week: 'Tu&#7847;n 7\u20138', title: 'Ra m&#7855;t k&ecirc;nh b&aacute;n h&agrave;ng', detail: 'Website, m&#7841;ng x&atilde; h&#7897;i, danh thi&#7879;p. B&#7855;t &#273;&#7847;u ti&#7871;p c&#7853;n kh&aacute;ch h&agrave;ng ti&#7873;m n&#259;ng.' },
  { week: 'Tu&#7847;n 9\u201310', title: '&#272;&#417;n h&agrave;ng &#273;&#7847;u ti&ecirc;n', detail: 'Nh&#7853;n &#273;&#417;n, s&#7843;n xu&#7845;t, giao h&agrave;ng. Thu th&#7853;p ph&#7843;n h&#7891;i kh&aacute;ch h&agrave;ng.' },
  { week: 'Tu&#7847;n 11\u201312', title: 'T&#7889;i &#432;u quy tr&igrave;nh', detail: '&#272;&aacute;nh gi&aacute; utilization th&#7921;c t&#7871;, t&#7889;i &#432;u slicing profile, gi&#7843;m waste.' },
  { week: 'Tu&#7847;n 13', title: 'T&#7893;ng k&#7871;t & quy&#7871;t &#273;&#7883;nh', detail: 'So s&aacute;nh k&#7871;t qu&#7843; v&#7899;i m&ocirc; h&igrave;nh. Quy&#7871;t &#273;&#7883;nh m&#7903; r&#7897;ng ho&#7863;c &#273;i&#7873;u ch&#7881;nh.' },
];

export function renderNinetyDayPlan(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'ninety-day-plan';
  section.className = 'band-light';

  const items = milestones
    .map(
      (m) => `
      <div class="timeline-item">
        <div class="timeline-week">${m.week}</div>
        <div class="timeline-title">${m.title}</div>
        <div class="timeline-detail">${m.detail}</div>
      </div>`,
    )
    .join('');

  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[08]</span> K&#7871; ho&#7841;ch 90 ng&agrave;y</h2>
      </div>
      <p>T&#7915; ng&agrave;y mua m&aacute;y &#273;&#7871;n doanh thu &#273;&#7847;u ti&ecirc;n.</p>
      <div class="timeline">
        ${items}
      </div>
    </div>
  `;
  return section;
}
