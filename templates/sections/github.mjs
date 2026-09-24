import { site } from "../../data/site.mjs";
import { icons } from "../icons.mjs";

export function renderGithub() {
  return `<section class="section" id="code">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">08 / CODE</p>
        <h2 class="section-title">THE CODE<br />IS <em>OUT THERE.</em></h2>
      </div>
      <div class="gh-panel reveal" id="ghPanel" data-github-user="${site.githubHandle}">
        <div class="gh-head">
          <div class="gh-user mono">${icons.github} <span>@${site.githubHandle}</span></div>
          <div class="gh-stats" id="ghStats">
            <div><b id="ghRepoCount">—</b>REPOS</div>
            <div><b id="ghStarCount">—</b>STARS</div>
            <div><b id="ghFollowers">—</b>FOLLOWERS</div>
          </div>
          <a class="btn btn-outline" href="${site.github}" target="_blank" rel="noopener">View Source ${icons.arrowRight}</a>
        </div>
        <div class="gh-repos" id="ghRepos">
          <div class="gh-skeleton"></div>
          <div class="gh-skeleton"></div>
          <div class="gh-skeleton"></div>
          <div class="gh-skeleton"></div>
        </div>
        <noscript>
          <p class="gh-fallback">Enable JavaScript to load live repository data, or visit <a style="color:var(--lime)" href="${site.github}">github.com/${site.githubHandle}</a> directly.</p>
        </noscript>
      </div>
    </div>
  </section>`;
}
