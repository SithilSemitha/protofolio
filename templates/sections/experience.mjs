import { experience } from "../../data/experience.mjs";

export function renderExperience() {
  return `<section class="section" id="experience">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">06 / EXPERIENCE</p>
        <h2 class="section-title">WHERE I'VE <em>WORKED.</em></h2>
      </div>
      <div class="timeline">
        ${experience
          .map(
            (e) => `<div class="timeline-item reveal">
          <div class="timeline-head">
            <div>
              <div class="timeline-role">${e.role}</div>
              <div class="timeline-org">${e.org}</div>
            </div>
            <div class="timeline-meta">${e.period.toUpperCase()}<br />${e.type.toUpperCase()}</div>
          </div>
          <ul class="timeline-points">
            ${e.points.map((pt) => `<li>${pt}</li>`).join("")}
          </ul>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
