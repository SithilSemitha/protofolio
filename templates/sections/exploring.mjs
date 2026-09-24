import { exploring } from "../../data/skills.mjs";

export function renderExploring() {
  return `<section class="section" aria-label="Currently exploring">
    <div class="container">
      <div class="explore-panel reveal">
        <div>
          <p class="eyebrow" style="margin-bottom:1.2rem;">CURRENTLY EXPLORING</p>
          <div class="explore-tags">
            ${exploring.map((e) => `<span class="explore-tag">${e}</span>`).join("")}
          </div>
        </div>
        <div class="explore-status">
          <span class="lbl">STATUS</span>
          <span class="val"><span class="status-dot" aria-hidden="true"></span>ACTIVE</span>
        </div>
      </div>
    </div>
  </section>`;
}
