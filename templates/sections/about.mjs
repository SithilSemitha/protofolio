import { site } from "../../data/site.mjs";

export function renderAbout() {
  return `<section class="section" id="about">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">01 / PROFILE</p>
        <h2 class="section-title">SOFTWARE ENGINEERING<br />MEETS <em>APPLIED AI.</em></h2>
      </div>
      <div class="about-grid">
        <div class="about-text reveal">
          <p>I'm a third-year <strong>BSc (Hons) Computer Science with Applied Artificial Intelligence</strong> undergraduate. My work sits across full-stack development, backend engineering, and applied AI — building systems end to end rather than staying in one layer of the stack.</p>
          <p>Most of what I build falls into three buckets: <strong>full-stack applications</strong> with real backend architecture behind them, <strong>microservice-based systems</strong> that need to scale independently, and <strong>AI-engineering experiments</strong> — RAG pipelines, local LLMs, and agentic tooling.</p>
          <p>I like understanding systems at the level of databases, algorithms, and architecture, not just the surface UI. That's the thread connecting a finance platform built on Spring Boot microservices, a TSP-solving fleet optimizer, and a RAG assistant for board documents.</p>
        </div>
        <div class="about-list reveal reveal-d1">
          <div class="about-item">
            <span class="num mono">01</span>
            <div><strong>BSc Computer Science with Applied AI</strong><span>3rd Year · 2024 — 2028</span></div>
          </div>
          <div class="about-item">
            <span class="num mono">02</span>
            <div><strong>Top 3 in Batch — Year 1</strong><span>3.991 GPA, Distinction</span></div>
          </div>
          <div class="about-item">
            <span class="num mono">03</span>
            <div><strong>Best Project Award</strong><span>TechSpace · Enterprise ERP</span></div>
          </div>
          <div class="about-item">
            <span class="num mono">04</span>
            <div><strong>Cloud &amp; AI Certified</strong><span>Oracle OCI · Microsoft Azure · Cisco</span></div>
          </div>
          <div class="about-item">
            <span class="num mono">05</span>
            <div><strong>${site.email}</strong><span>${site.availability}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
