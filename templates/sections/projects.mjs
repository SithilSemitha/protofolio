import { projects } from "../../data/projects.mjs";
import { icons } from "../icons.mjs";

function tagClass(tag) {
  return `project-tag`;
}

export function renderProjects() {
  return `<section class="section" id="work">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">05 / SELECTED WORK</p>
        <h2 class="section-title">THINGS<br />I'VE <em>BUILT.</em></h2>
      </div>

      ${projects
        .map(
          (p) => `<article class="project-case reveal">
        <div class="project-meta-col">
          <div class="project-number mono">${p.id} / ${String(projects.length).padStart(3, "0")}</div>
          <span class="${tagClass(p.tag)} mono">${p.category}</span>
          ${p.badge ? `<div class="project-award mono">${icons.star}${p.badge}</div>` : ""}
          <h3 class="project-title">${p.title}</h3>
          <div class="project-links">
            ${p.repo ? `<a class="btn btn-outline" href="${p.repo}" target="_blank" rel="noopener">${icons.github}Code</a>` : ""}
            <a class="btn btn-fill" href="/projects/${p.slug}/">Case Study ${icons.arrowRight}</a>
          </div>
        </div>
        <div class="project-body">
          <p>${p.summary}</p>
          <div class="project-tech">
            ${p.stack.map((s) => `<span class="tech-chip mono">${s}</span>`).join("")}
          </div>
          <div class="arch-diagram" role="img" aria-label="Architecture: ${p.architecture.join(" leads to ")}">
            ${p.architecture
              .map((node, i) => `${i > 0 ? `<div class="arch-arrow" aria-hidden="true">↓</div>` : ""}<div class="arch-node">${node}</div>`)
              .join("")}
          </div>
          <p class="arch-note">${p.architectureNote}</p>
        </div>
      </article>`
        )
        .join("")}
    </div>
  </section>`;
}
