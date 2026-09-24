import { site } from "../../data/site.mjs";
import { icons } from "../icons.mjs";

export function renderHero() {
  return `<section class="hero" id="home">
    <div class="hero-grid">
      <div>
        <p class="hero-label mono">// SOFTWARE ENGINEER · AI BUILDER · CS UNDERGRADUATE</p>
        <h1 class="hero-title">I BUILD<br />SOFTWARE<br /><span class="accent">THAT THINKS.</span></h1>
        <p class="hero-sub">
          Computer Science undergraduate specializing in <strong>Applied AI</strong>,
          full-stack development, and intelligent software systems.
        </p>
        <dl class="hero-meta">
          <div><dt>LOCATION</dt><dd>${site.location.toUpperCase()}</dd></div>
          <div><dt>DISCIPLINE</dt><dd>${site.discipline.toUpperCase()}</dd></div>
          <div><dt>SPECIALIZATION</dt><dd>${site.specialization.toUpperCase()}</dd></div>
          <div><dt>STATUS</dt><dd>${site.status.toUpperCase()}</dd></div>
        </dl>
        <div class="hero-cta">
          <a href="#work" class="btn btn-fill">View Work ${icons.arrowRight}</a>
          <a href="${site.cvUrl}" target="_blank" rel="noopener" class="btn btn-outline">Download CV ${icons.arrowDown}</a>
        </div>
      </div>

      <div class="hero-side">
        <div class="hero-profile reveal">
          <div class="hero-avatar-wrap">
            <img class="hero-avatar" src="/assets/img/profile.png" alt="Photo of Sithil Semitha" width="104" height="104" loading="eager" />
          </div>
          <div class="hero-profile-body">
            <div class="hero-profile-name mono">SITHIL SEMITHA</div>
            <div class="hero-profile-links">
              <a href="${site.github}" target="_blank" rel="noopener" aria-label="GitHub">${icons.github}</a>
              <a href="${site.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icons.linkedin}</a>
              <a href="mailto:${site.email}" aria-label="Email">${icons.mail}</a>
              <a href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>
            </div>
          </div>
        </div>

        <div class="terminal reveal" role="img" aria-label="System initialization terminal showing core module, database, API layer, AI engine, and vector search all reporting OK, ending in SYSTEM READY.">
          <div class="terminal-bar">
            <span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-dot"></span>
            <span class="terminal-title mono">system.init — sithil</span>
          </div>
          <div class="terminal-body" id="termBody" aria-hidden="true"></div>
          <div class="terminal-nodes">
            <div class="terminal-node"><span class="val">04</span><span class="lbl">PROJECTS</span></div>
            <div class="terminal-node"><span class="val">03</span><span class="lbl">YEARS CS</span></div>
            <div class="terminal-node"><span class="val">06</span><span class="lbl">CREDENTIALS</span></div>
          </div>
        </div>
      </div>
    </div>
    <a href="#about" class="hero-scroll mono">SCROLL TO EXPLORE</a>
  </section>`;
}
