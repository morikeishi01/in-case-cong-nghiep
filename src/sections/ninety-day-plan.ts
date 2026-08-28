import { milestones } from '../data/business-model';

export function renderNinetyDayPlan(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'ninety-day-plan';
  section.className = 'band-light';

  const items = milestones
    .map(
      (m) => `
      <li class="timeline-item">
        <div class="timeline-week">${m.week}</div>
        <div class="timeline-title">${m.title}</div>
        <div class="timeline-detail">${m.detail}</div>
      </li>`,
    )
    .join('');

  section.innerHTML = `
    <div class="container section-inner">
      <div class="section-header">
        <h2><span class="section-index">[08]</span> K&#7871; ho&#7841;ch 90 ng&#224;y</h2>
      </div>
      <p>T&#7915; ng&#224;y mua m&#225;y &#273;&#7871;n doanh thu &#273;&#7847;u ti&#234;n.</p>
      <ol class="timeline">
        ${items}
      </ol>
    </div>
  `;
  return section;
}
