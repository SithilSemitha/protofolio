import { certifications } from "../../data/certifications.mjs";

export function renderCertifications() {
  return `<section class="section" id="certifications">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">03 / CREDENTIALS</p>
        <h2 class="section-title">CERTIFIED TO <em>BUILD.</em></h2>
      </div>
      <div class="cert-timeline">
        ${certifications
          .map(
            (c, i) => `<div class="cert-row reveal ${i % 2 ? "reveal-d1" : ""}">
          <div class="cert-card">
            <div class="cert-info">
              <strong>${c.title}</strong>
              <div class="cert-provider mono">${c.provider} · ${c.year}</div>
            </div>
            <div class="cert-side">
              <span class="cert-cat mono">${c.category}</span>
              <a class="cert-verify" href="${c.url}" target="_blank" rel="noopener">VERIFY CREDENTIAL →</a>
            </div>
          </div>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
