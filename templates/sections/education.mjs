import { education, academicRecord, achievements } from "../../data/education.mjs";

export function renderEducation() {
  return `<section class="section" id="education">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">02 / EDUCATION</p>
        <h2 class="section-title">ACADEMIC <em>RECORD.</em></h2>
      </div>

      <div class="edu-primary reveal">
        <div class="edu-top">
          <div>
            <div class="edu-degree">${education.primary.degree}</div>
            <div class="edu-status mono"><span class="status-dot" aria-hidden="true"></span>${education.primary.status.toUpperCase()}</div>
          </div>
          <div class="edu-period">${education.primary.period}</div>
        </div>
        <div class="edu-areas">
          ${education.primary.areas.map((a) => `<span class="edu-area">${a}</span>`).join("")}
        </div>
      </div>

      <div class="edu-prev-grid reveal reveal-d1">
        ${education.previous
          .map(
            (p) => `<div class="edu-prev">
          <strong>${p.degree}</strong>
          <div class="meta">${p.period === p.status ? p.status.toUpperCase() : `${p.period.toUpperCase()} · ${p.status.toUpperCase()}`}</div>
        </div>`
          )
          .join("")}
      </div>

      <table class="record-table reveal reveal-d2">
        <thead>
          <tr><th>Year</th><th>GPA</th><th>Batch Rank</th><th>Note</th></tr>
        </thead>
        <tbody>
          ${academicRecord
            .map(
              (r) => `<tr><td>${r.year}</td><td class="gpa">${r.gpa}</td><td>${r.rank}</td><td>${r.note}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>

      <div class="stats-row reveal reveal-d2" id="achievements">
        ${achievements
          .map((a) => `<div class="stat-card"><span class="val">${a.value}</span><span class="lbl">${a.label.toUpperCase()}</span></div>`)
          .join("")}
      </div>
    </div>
  </section>`;
}
