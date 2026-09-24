import { site } from "../../data/site.mjs";
import { icons } from "../icons.mjs";

export function renderContact() {
  return `<section class="section" id="contact" style="border-bottom:none;">
    <div class="container">
      <div class="contact-grid">
        <div class="reveal">
          <p class="eyebrow">09 / CONTACT</p>
          <h2 class="contact-title">LET'S BUILD<br /><em>SOMETHING.</em></h2>
          <div class="contact-text">
            <p>Open to software engineering, full-stack development, AI engineering opportunities, collaborations, and interesting projects.</p>
          </div>
          <div class="contact-cta">
            <a class="btn btn-fill" href="mailto:${site.email}">Email Me ${icons.arrowRight}</a>
            <a class="btn btn-outline" href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn ${icons.arrowRight}</a>
          </div>
        </div>
        <div class="contact-links reveal reveal-d1">
          <a class="contact-link" href="${site.cvUrl}" target="_blank" rel="noopener">${icons.file}<span>Download CV</span><span class="arrow mono">→</span></a>
          <a class="contact-link" href="mailto:${site.email}">${icons.mail}<span>${site.email}</span><span class="arrow mono">→</span></a>
          <a class="contact-link" href="${site.github}" target="_blank" rel="noopener">${icons.github}<span>github.com/${site.githubHandle}</span><span class="arrow mono">→</span></a>
          <a class="contact-link" href="${site.linkedin}" target="_blank" rel="noopener">${icons.linkedin}<span>linkedin.com/in/sithil-semitha</span><span class="arrow mono">→</span></a>
          <a class="contact-link" href="${site.instagram}" target="_blank" rel="noopener">${icons.instagram}<span>@semithaaaaa</span><span class="arrow mono">→</span></a>
        </div>
      </div>
    </div>
  </section>`;
}
