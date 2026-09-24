import { icons } from "./icons.mjs";

const sections = [
  ["problem", "Problem"],
  ["objective", "Objective"],
  ["architecture", "Architecture"],
  ["stack", "Technology"],
  ["implementation", "Implementation"],
  ["challenges", "Challenges"],
  ["result", "Result"],
  ["learned", "What I Learned"],
];

export function renderCaseStudy(project, { prev, next }) {
  return `<div class="case-hero">
    <a class="case-back mono" href="/#work">${icons.arrowRight.replace("M5 12h14M13 6l6 6-6 6", "M19 12H5M11 18l-6-6 6-6")}BACK TO WORK</a>
    <p class="eyebrow">${project.id} / SELECTED WORK</p>
    <h1 class="case-title">${project.title}</h1>
    ${project.badge ? `<div class="project-award mono">${icons.star}${project.badge}</div>` : ""}
    <p class="case-summary">${project.summary}</p>
    <dl class="case-meta-row">
      <div><dt>Category</dt><dd>${project.category}</dd></div>
      <div><dt>Stack</dt><dd>${project.stack.join(", ")}</dd></div>
      <div><dt>Repository</dt><dd>${
        project.repo
          ? `<a href="${project.repo}" target="_blank" rel="noopener" style="color:var(--lime)">${project.repoFrontend ? "Backend" : "View Source"} →</a>${
              project.repoFrontend
                ? ` &nbsp;<a href="${project.repoFrontend}" target="_blank" rel="noopener" style="color:var(--lime)">Frontend →</a>`
                : ""
            }`
          : "Private"
      }</dd></div>
    </dl>
  </div>
  <div class="case-body">
    <nav class="case-toc" aria-label="Case study sections">
      ${sections.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}
    </nav>
    <div>
      <div class="case-section" id="problem">
        <h2>Problem</h2>
        <p>${project.problem}</p>
      </div>
      <div class="case-section" id="objective">
        <h2>Objective</h2>
        <p>${project.objective}</p>
      </div>
      <div class="case-section" id="architecture">
        <h2>Architecture</h2>
        <div class="arch-diagram" role="img" aria-label="Architecture: ${project.architecture.join(" leads to ")}">
          ${project.architecture
            .map((node, i) => `${i > 0 ? `<div class="arch-arrow" aria-hidden="true">↓</div>` : ""}<div class="arch-node">${node}</div>`)
            .join("")}
        </div>
        <p class="arch-note">${project.architectureNote}</p>
      </div>
      <div class="case-section" id="stack">
        <h2>Technology</h2>
        <div class="project-tech">
          ${project.stack.map((s) => `<span class="tech-chip mono">${s}</span>`).join("")}
        </div>
      </div>
      <div class="case-section" id="implementation">
        <h2>Implementation</h2>
        <p>${project.implementation}</p>
      </div>
      <div class="case-section" id="challenges">
        <h2>Challenges</h2>
        <p>${project.challenges}</p>
      </div>
      <div class="case-section" id="result">
        <h2>Result</h2>
        <p>${project.result}</p>
      </div>
      <div class="case-section" id="learned">
        <h2>What I Learned</h2>
        <p>${project.learned}</p>
      </div>

      <div class="case-nav-links mono">
        ${prev ? `<a href="/projects/${prev.slug}/">← ${prev.title}</a>` : "<span></span>"}
        ${next ? `<a href="/projects/${next.slug}/">${next.title} →</a>` : "<span></span>"}
      </div>
    </div>
  </div>`;
}
