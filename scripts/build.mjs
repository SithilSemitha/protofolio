// Zero-dependency static site generator.
// Reads /data + /templates, writes index.html, /projects/<slug>/index.html,
// sitemap.xml, robots.txt, and 404.html directly into the project root.
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "../data/site.mjs";
import { projects } from "../data/projects.mjs";
import { page, renderHead } from "../templates/layout.mjs";
import { renderHero } from "../templates/sections/hero.mjs";
import { renderAbout } from "../templates/sections/about.mjs";
import { renderEducation } from "../templates/sections/education.mjs";
import { renderCertifications } from "../templates/sections/certifications.mjs";
import { renderStack } from "../templates/sections/stack.mjs";
import { renderProjects } from "../templates/sections/projects.mjs";
import { renderExperience } from "../templates/sections/experience.mjs";
import { renderLeadership } from "../templates/sections/leadership.mjs";
import { renderPhilosophy } from "../templates/sections/philosophy.mjs";
import { renderExploring } from "../templates/sections/exploring.mjs";
import { renderGithub } from "../templates/sections/github.mjs";
import { renderContact } from "../templates/sections/contact.mjs";
import { renderCaseStudy } from "../templates/caseStudy.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function writeHtml(relPath, html) {
  const abs = path.join(ROOT, relPath);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, html, "utf8");
  console.log("  wrote", relPath);
}

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Software Engineer & AI Engineer",
    sameAs: [site.github, site.linkedin],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "BSc (Hons) Computer Science with Applied Artificial Intelligence",
    },
  };
}

async function buildHome() {
  const head = renderHead({
    title: site.title,
    description: site.description,
    path: "/",
    jsonLd: personJsonLd(),
  });
  const body = [
    renderHero(),
    renderAbout(),
    renderEducation(),
    renderCertifications(),
    renderStack(),
    renderProjects(),
    renderExperience(),
    renderLeadership(),
    renderPhilosophy(),
    renderExploring(),
    renderGithub(),
    renderContact(),
  ].join("\n");
  const html = page({ head, body, bodyClass: "has-custom-cursor" });
  await writeHtml("index.html", html);
}

async function buildProjectPages() {
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const prev = projects[i - 1] ?? null;
    const next = projects[i + 1] ?? null;
    const head = renderHead({
      title: `${p.title} — ${site.name}`,
      description: p.summary,
      path: `/projects/${p.slug}/`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        description: p.summary,
        creator: { "@type": "Person", name: site.name },
        keywords: p.stack.join(", "),
      },
    });
    const body = `<article>${renderCaseStudy(p, { prev, next })}</article>`;
    const html = page({ head, body, bodyClass: "has-custom-cursor" });
    await writeHtml(`projects/${p.slug}/index.html`, html);
  }
}

async function build404() {
  const head = renderHead({
    title: `404 — ${site.name}`,
    description: "Page not found.",
    path: "/404.html",
  });
  const body = `<div class="error-page">
    <p class="eyebrow" style="margin:0">ERROR</p>
    <div class="error-code mono">404</div>
    <p style="color:var(--text-1)">This route doesn't exist in the system.</p>
    <a class="btn btn-fill" href="/">Return Home</a>
  </div>`;
  const html = page({ head, body });
  await writeHtml("404.html", html);
}

async function buildSitemap() {
  const urls = ["/", ...projects.map((p) => `/projects/${p.slug}/`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u, site.url).toString()}</loc></url>`).join("\n")}
</urlset>
`;
  await writeFile(path.join(ROOT, "sitemap.xml"), xml, "utf8");
  console.log("  wrote sitemap.xml");
}

async function buildRobots() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", site.url).toString()}
`;
  await writeFile(path.join(ROOT, "robots.txt"), txt, "utf8");
  console.log("  wrote robots.txt");
}

async function buildFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#050505"/><text x="50%" y="63%" text-anchor="middle" font-size="46" font-family="monospace" font-weight="700" fill="#B6FF00">S</text></svg>`;
  await writeFile(path.join(ROOT, "favicon.svg"), svg, "utf8");
  console.log("  wrote favicon.svg");
}

async function main() {
  console.log("Building sithil.me...");
  await buildHome();
  await buildProjectPages();
  await build404();
  await buildSitemap();
  await buildRobots();
  await buildFavicon();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
