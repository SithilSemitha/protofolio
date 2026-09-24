(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const fill = document.getElementById("preloaderFill");
    const percentEl = document.getElementById("preloaderPercent");
    const statusEl = document.getElementById("preloaderStatus");
    const cursorEl = statusEl ? statusEl.querySelector(".term-cursor") : null;
    const messages = ["INITIALIZING SYSTEM", "LOADING MODULES", "CONNECTING SERVICES", "RENDERING INTERFACE"];

    const setStatus = (text) => {
      if (!statusEl) return;
      statusEl.textContent = text;
      if (cursorEl) statusEl.appendChild(cursorEl);
    };

    const start = performance.now();
    let rafId = null;
    let msgTimer = null;
    let msgIndex = 0;

    if (reducedMotion) {
      if (fill) fill.style.width = "90%";
      if (percentEl) percentEl.textContent = "90%";
    } else {
      const tick = (now) => {
        const elapsed = now - start;
        const pct = Math.min(90, 90 * (1 - Math.exp(-elapsed / 900)));
        if (fill) fill.style.width = pct + "%";
        if (percentEl) percentEl.textContent = Math.round(pct) + "%";
        if (pct < 89.5) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      msgTimer = setInterval(() => {
        msgIndex = (msgIndex + 1) % messages.length;
        setStatus(messages[msgIndex]);
      }, 500);
    }

    const MIN_VISIBLE = reducedMotion ? 0 : 900;
    let hideCalled = false;

    const hide = () => {
      if (hideCalled) return;
      hideCalled = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_VISIBLE - elapsed);
      setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        if (msgTimer) clearInterval(msgTimer);
        if (fill) fill.style.width = "100%";
        if (percentEl) percentEl.textContent = "100%";
        setStatus("SYSTEM READY");
        setTimeout(
          () => {
            preloader.classList.add("is-hidden");
            document.body.classList.remove("is-loading");
            setTimeout(() => preloader.remove(), 550);
          },
          reducedMotion ? 0 : 250
        );
      }, wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      // Fallback in case the load event never fires cleanly.
      setTimeout(hide, 5000);
    }
  }

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const root = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const colors = { dark: "#050505", light: "#fafafa" };

    const currentTheme = () => (root.getAttribute("data-theme") === "light" ? "light" : "dark");

    const applyTheme = (theme) => {
      root.setAttribute("data-theme", theme);
      themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
      if (metaThemeColor) metaThemeColor.setAttribute("content", colors[theme]);
    };

    applyTheme(currentTheme());

    themeToggle.addEventListener("click", () => {
      const next = currentTheme() === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* ---------- MOBILE MENU ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- NAV ACTIVE STATE ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((a) => {
              a.classList.toggle("is-active", a.getAttribute("href") === `/#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => navIO.observe(s));
  }

  /* ---------- CUSTOM CURSOR ---------- */
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  if (dot && ring && !isTouch) {
    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;
    let raf = null;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function tick() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    }
    tick();

    const setHover = (label) => {
      ring.classList.add("is-active");
      ring.textContent = label || "";
    };
    const clearHover = () => {
      ring.classList.remove("is-active");
      ring.textContent = "";
    };

    document.querySelectorAll('a[href*="github.com"], a[href*="github"]').forEach((el) => {
      el.addEventListener("mouseenter", () => setHover("CODE"));
      el.addEventListener("mouseleave", clearHover);
    });
    document.querySelectorAll(".project-case, .gh-repo").forEach((el) => {
      el.addEventListener("mouseenter", () => setHover("VIEW"));
      el.addEventListener("mouseleave", clearHover);
    });
    document.querySelectorAll("a, button").forEach((el) => {
      if (el.matches('a[href*="github"], .project-case a, .gh-repo a')) return;
      el.addEventListener("mouseenter", () => setHover());
      el.addEventListener("mouseleave", clearHover);
    });
  } else if (dot && ring) {
    dot.remove();
    ring.remove();
  }

  /* ---------- HERO TERMINAL BOOT SEQUENCE ---------- */
  const termBody = document.getElementById("termBody");
  if (termBody) {
    const lines = [
      { html: '<span class="term-ok">[OK]</span> CORE MODULE', dim: false },
      { html: '<span class="term-ok">[OK]</span> DATABASE', dim: false },
      { html: '<span class="term-ok">[OK]</span> API LAYER', dim: false },
      { html: '<span class="term-ok">[OK]</span> AI ENGINE', dim: false },
      { html: '<span class="term-ok">[OK]</span> VECTOR SEARCH', dim: false },
      { html: "", dim: false },
      { html: '<span class="term-ready">SYSTEM READY<span class="term-cursor"></span></span>', dim: false },
    ];

    if (reducedMotion) {
      termBody.innerHTML = lines.map((l) => `<div class="term-line" style="opacity:1">${l.html}</div>`).join("");
    } else {
      let delay = 150;
      lines.forEach((l, i) => {
        const div = document.createElement("div");
        div.className = "term-line";
        div.style.animationDelay = `${delay / 1000}s`;
        div.innerHTML = l.html;
        termBody.appendChild(div);
        delay += i === 0 ? 200 : 260;
      });
    }
  }

  /* ---------- GITHUB API ---------- */
  const ghPanel = document.getElementById("ghPanel");
  if (ghPanel) {
    const user = ghPanel.getAttribute("data-github-user");
    const reposEl = document.getElementById("ghRepos");
    const repoCountEl = document.getElementById("ghRepoCount");
    const starCountEl = document.getElementById("ghStarCount");
    const followersEl = document.getElementById("ghFollowers");

    const fallback = () => {
      reposEl.innerHTML = `<p class="gh-fallback" style="grid-column:1/-1">Live repository data unavailable right now — visit <a style="color:var(--lime)" href="https://github.com/${user}">github.com/${user}</a> directly.</p>`;
    };

    Promise.all([
      fetch(`https://api.github.com/users/${user}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
      fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`).then((r) =>
        r.ok ? r.json() : Promise.reject(r.status)
      ),
    ])
      .then(([userData, repos]) => {
        followersEl.textContent = userData.followers ?? "—";
        repoCountEl.textContent = userData.public_repos ?? "—";
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        starCountEl.textContent = totalStars;

        if (!Array.isArray(repos) || repos.length === 0) {
          fallback();
          return;
        }

        reposEl.innerHTML = repos
          .slice(0, 4)
          .map(
            (r) => `<a class="gh-repo" href="${r.html_url}" target="_blank" rel="noopener">
              <span class="gh-repo-name mono">${r.name}</span>
              <p class="gh-repo-desc">${r.description ? escapeHtml(r.description) : "No description provided."}</p>
              <div class="gh-repo-meta">
                ${r.language ? `<span><span class="gh-lang-dot"></span>${r.language}</span>` : ""}
                <span>★ ${r.stargazers_count}</span>
                <span>⑂ ${r.forks_count}</span>
              </div>
            </a>`
          )
          .join("");
      })
      .catch(() => {
        followersEl.textContent = "—";
        repoCountEl.textContent = "—";
        starCountEl.textContent = "—";
        fallback();
      });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
