import { site } from "../data/site.mjs";
import { icons } from "./icons.mjs";

export function renderHead({ title, description, path = "/", ogImage = "/assets/img/profile.png", jsonLd = null }) {
  const canonical = new URL(path, site.url).toString();
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta name="theme-color" content="#050505" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script>
      // Applied before first paint to avoid a flash of the wrong theme.
      (function () {
        try {
          var saved = localStorage.getItem("theme");
          if (saved === "light" || saved === "dark") {
            document.documentElement.setAttribute("data-theme", saved);
          }
        } catch (e) {}
      })();
    </script>

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${new URL(ogImage, site.url).toString()}" />
    <meta property="og:site_name" content="${site.name}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${new URL(ogImage, site.url).toString()}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/css/style.css" />
    ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ""}
  </head>`;
}

export function renderNav() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <nav class="nav" aria-label="Primary">
    <a href="/#home" class="nav-logo">${site.logo.replace(".ME", "")}<span>.ME</span></a>
    <ul class="nav-links">
      ${site.nav
        .map((n) => `<li><a href="${n.href}" data-num="${n.num}">${n.label}</a></li>`)
        .join("")}
    </ul>
    <div class="nav-right">
      <div class="status-pill"><span class="status-dot" aria-hidden="true"></span>${site.availability.toUpperCase()}</div>
      <a class="nav-cv-desktop mono" href="${site.cvUrl}" target="_blank" rel="noopener" style="font-size:.72rem;letter-spacing:.08em;color:var(--text-1);display:flex;align-items:center;gap:.4rem;">${icons.file}CV</a>
      <button class="theme-toggle" id="themeToggle" aria-label="Switch to light theme">
        <span class="icon-moon">${icons.moon}</span><span class="icon-sun">${icons.sun}</span>
      </button>
      <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <nav aria-label="Mobile">
      ${site.nav
        .map((n) => `<a href="${n.href}"><span>${n.num}</span>${n.label}</a>`)
        .join("")}
    </nav>
    <div class="mobile-menu-footer">
      <a class="btn btn-outline" href="${site.github}" target="_blank" rel="noopener">GitHub</a>
      <a class="btn btn-outline" href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      <a class="btn btn-fill" href="mailto:${site.email}">Email</a>
    </div>
  </div>`;
}

export function renderFooter() {
  const year = new Date().getFullYear();
  return `<footer class="footer">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">SITHIL<span>.ME</span></div>
        <p class="footer-roles">${site.roles.join(" · ")}</p>
      </div>
      <div class="footer-links">
        <a href="${site.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:${site.email}">Email</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${year} ${site.name}</span>
      <span class="footer-status"><span class="status-dot" aria-hidden="true"></span>SYSTEM STATUS: ONLINE</span>
    </div>
  </footer>`;
}

export function renderPreloader() {
  return `<noscript><style>#preloader{display:none!important;}</style></noscript>
  <div class="preloader" id="preloader" role="status" aria-live="polite" aria-label="Loading">
    <span class="preloader-marker preloader-marker-tl mono" aria-hidden="true">SYS/BOOT</span>
    <span class="preloader-marker preloader-marker-br mono" aria-hidden="true" id="preloaderPercent">0%</span>
    <div class="preloader-inner">
      <div class="preloader-logo mono">SITHIL<span>.ME</span></div>
      <div class="preloader-bar"><div class="preloader-bar-fill" id="preloaderFill"></div></div>
      <div class="preloader-status mono" id="preloaderStatus">INITIALIZING SYSTEM<span class="term-cursor" aria-hidden="true"></span></div>
    </div>
  </div>`;
}

export function renderCursor() {
  return `<div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
  <div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>`;
}

export function renderBackdrop() {
  return `<div class="backdrop" aria-hidden="true"></div><div class="noise" aria-hidden="true"></div>`;
}

export function page({ head, body, bodyClass = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
${head}
<body class="${bodyClass} is-loading">
${renderPreloader()}
${renderCursor()}
${renderBackdrop()}
${renderNav()}
<main id="main">
${body}
</main>
${renderFooter()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}
