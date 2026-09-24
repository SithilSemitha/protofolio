import { skillGroups } from "../../data/skills.mjs";

export function renderStack() {
  return `<section class="section" id="stack">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">04 / STACK</p>
        <h2 class="section-title">THE TOOLS<br />I <em>BUILD WITH.</em></h2>
      </div>
      <div class="stack-grid">
        ${skillGroups
          .map(
            (g, i) => `<div class="reveal ${i % 3 ? `reveal-d${(i % 3)}` : ""}">
          <p class="stack-group-title">${g.group}</p>
          <div class="stack-pills">
            ${g.items.map((s) => `<span class="stack-pill">${s}</span>`).join("")}
          </div>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
