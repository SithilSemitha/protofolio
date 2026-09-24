import { leadership } from "../../data/experience.mjs";

export function renderLeadership() {
  return `<section class="section" id="leadership">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">07 / LEADERSHIP</p>
        <h2 class="section-title">BEYOND <em>THE CODE.</em></h2>
      </div>
      <div class="leader-grid">
        ${leadership
          .map(
            (l, i) => `<div class="leader-card reveal ${i % 4 ? `reveal-d${i % 3}` : ""}">
          <strong>${l.org}</strong>
          <p>${l.focus}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
