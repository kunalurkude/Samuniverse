/* ============================================================
   Samuniverse — behaviour
   No build step, no dependencies. Edit js/config.js for content.
   ============================================================ */
(() => {
  "use strict";

  const S = window.SAM || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Fill links from config ---------- */
  const ytUrl = S.youtube?.url || "https://www.youtube.com/@samuniverseofficial";
  const igUrl = S.instagram?.url || "https://www.instagram.com/samuniverse12/";
  $$("[data-yt-subscribe]").forEach(a => (a.href = ytUrl + "?sub_confirmation=1"));
  $$("[data-ig-follow]").forEach(a => (a.href = igUrl));
  $("#moreOnYoutube").href = ytUrl + "/videos";
  if (S.youtube?.handle) $$("[data-yt-handle]").forEach(el => (el.textContent = S.youtube.handle));
  if (S.instagram?.handle) $$("[data-ig-handle]").forEach(el => (el.textContent = S.instagram.handle));

  $$("[data-email]").forEach(a => {
    a.href = "mailto:" + (S.email || "");
    a.textContent = S.email || "Email us";
  });
  const wa = (S.whatsapp || "").replace(/\D/g, "");
  if (wa) $$("[data-whatsapp]").forEach(a => (a.href = "https://wa.me/" + wa));
  else $$("[data-wa-row]").forEach(el => el.remove());

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Page-load sequence ---------- */
  requestAnimationFrame(() => document.documentElement.classList.add("is-ready"));

  /* ---------- Nav: hide on scroll down, show on scroll up ---------- */
  const nav = $("#nav");
  let lastY = window.scrollY, ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const menuOpen = burger.getAttribute("aria-expanded") === "true";
      nav.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 400);
      lastY = y;
      ticking = false;
    });
  }, { passive: true });

  // Highlight the section in view
  const navLinks = $$(".nav__links a");
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["work", "services", "process", "channels", "contact"].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const menu = $("#menu");
  const setMenu = open => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open")));
    } else {
      menu.classList.remove("is-open");
      setTimeout(() => { if (burger.getAttribute("aria-expanded") === "false") menu.hidden = true; }, 400);
    }
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") setMenu(false); });

  /* ---------- Hero sky + timeline (one shared 8s loop) ---------- */
  const canvas = $("#sky");
  const ctx = canvas.getContext("2d");
  const playhead = $("#playhead");
  const heroMark = $(".hero__mark");
  const tc = $("#tc");
  const LOOP = 8000; // ms
  const FPS = 25;
  let W = 0, H = 0, DPR = 1, stars = [];
  let mx = 0, my = 0, tx = 0, ty = 0;
  let running = true, start = performance.now();

  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const C = { red: css("--red"), ember: css("--ember"), rose: css("--rose"), blush: css("--blush"), paper: css("--paper"), ice: css("--ice") };

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const count = Math.round((W * H) / 5200);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + .3,
      d: Math.random() * .8 + .2,          // depth for parallax
      p: Math.random() * Math.PI * 2,      // twinkle phase
      ice: Math.random() < .3
    }));
  }

  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function draw(now) {
    const t = ((now - start) % LOOP) / LOOP;       // 0..1 through the loop
    tx += (mx - tx) * .05; ty += (my - ty) * .05;  // smoothed pointer

    ctx.clearRect(0, 0, W, H);

    // Stars
    for (const s of stars) {
      const a = .35 + .45 * Math.sin(s.p + t * Math.PI * 2 * (1 + s.d));
      ctx.globalAlpha = Math.max(.08, a);
      ctx.fillStyle = s.ice ? C.ice : C.paper;
      ctx.beginPath();
      ctx.arc(s.x + tx * 14 * s.d, s.y + ty * 10 * s.d, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Logo mark: parallax + "breathes" on the keyframes shown in the timeline (12% → 50% → 88%)
    const k = t < .12 ? 0 : t < .5 ? easeInOut((t - .12) / .38) : t < .88 ? 1 - easeInOut((t - .5) / .38) : 0;
    if (heroMark) {
      heroMark.style.setProperty("--mx", (tx * 18).toFixed(2) + "px");
      heroMark.style.setProperty("--my", (ty * 14 - k * 10).toFixed(2) + "px");
      heroMark.style.setProperty("--k", k.toFixed(3));
    }
    // Timeline playhead + timecode
    const lane = playhead.parentElement;
    const laneW = lane.clientWidth - playhead.offsetLeft - 10;
    playhead.style.transform = `translateX(${t * laneW}px)`;
    const frames = Math.floor((t * LOOP / 1000) * FPS);
    const sec = Math.floor(frames / FPS), fr = frames % FPS;
    tc.textContent = `00:00:${String(sec).padStart(2, "0")}:${String(fr).padStart(2, "0")}`;

    if (running && !reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", () => { resize(); if (reduceMotion) draw(start + LOOP * .3); });

  if (!reduceMotion) {
    window.addEventListener("pointermove", e => {
      mx = (e.clientX / window.innerWidth - .5) * 2;
      my = (e.clientY / window.innerHeight - .5) * 2;
    }, { passive: true });

    // Pause the canvas when the hero is off-screen
    new IntersectionObserver(([e]) => {
      const was = running;
      running = e.isIntersecting;
      if (running && !was) requestAnimationFrame(draw);
    }).observe($(".hero"));
    requestAnimationFrame(draw);
  } else {
    draw(start + LOOP * .3);
  }

  /* ---------- Portfolio ---------- */
  const grid = $("#workGrid");
  const work = Array.isArray(S.work) ? S.work : [];
  const playSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  grid.innerHTML = work.map((w, i) => {
    const cat = ["business", "education", "shorts", "films"].includes(w.category) ? w.category : "business";
    const size = w.size === "wide" ? " card--wide" : w.size === "tall" ? " card--tall" : "";
    const id = (w.youtubeId || "").trim();
    const screen = id
      ? `<img src="https://i.ytimg.com/vi/${esc(id)}/${cat === "shorts" ? "hqdefault" : "maxresdefault"}.jpg" data-fallback="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy" decoding="async" />`
      : `<div class="poster" aria-hidden="true"><span class="poster__orb"></span><span class="poster__ring"></span><span class="poster__moon"></span><span class="poster__type">${esc(w.title)}</span></div>`;
    const action = id ? `Play ${esc(w.title)}` : `Watch ${esc(w.title)} on YouTube (opens a new tab)`;
    return `
      <article class="card reveal${size}" data-cat="${cat}" style="transition-delay:${(i % 3) * 70}ms">
        <button class="card__btn" data-index="${i}" aria-label="${action}">
          <span class="card__screen">
            ${screen}
            <span class="card__play">${playSVG}</span>
            ${w.length ? `<span class="card__len">${esc(w.length)}</span>` : ""}
          </span>
          <span class="card__meta">
            <span class="card__title">${esc(w.title)}</span>
            <span class="card__client">${esc(w.client || "")}</span>
          </span>
        </button>
      </article>`;
  }).join("");

  // Older videos have no HD thumbnail (YouTube returns a 120px grey placeholder) — fall back
  $$("img[data-fallback]", grid).forEach(img => {
    const swap = () => { if (img.dataset.fallback && img.src !== img.dataset.fallback) img.src = img.dataset.fallback; };
    img.addEventListener("error", swap);
    img.addEventListener("load", () => { if (img.naturalWidth <= 120) swap(); });
  });

  // Filters
  const chips = $$(".chip");
  chips.forEach(chip => chip.addEventListener("click", () => {
    const f = chip.dataset.filter;
    chips.forEach(c => { const on = c === chip; c.classList.toggle("is-active", on); c.setAttribute("aria-selected", String(on)); });
    $$(".card", grid).forEach(card => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("is-hidden", !show);
      if (show) card.classList.add("is-in");
    });
  }));

  /* ---------- Video modal ---------- */
  const modal = $("#modal");
  const frame = $("#modalFrame");
  const modalTitle = $("#modalTitle");
  let lastFocus = null;

  function openVideo(w) {
    const id = (w.youtubeId || "").trim();
    if (!id) { window.open(ytUrl + "/videos", "_blank", "noopener"); return; }
    lastFocus = document.activeElement;
    frame.classList.toggle("is-vertical", w.category === "shorts" || w.size === "tall");
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1" title="${esc(w.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    modalTitle.textContent = w.title || "";
    modal.showModal();
  }
  function closeVideo() {
    modal.close();
  }
  modal.addEventListener("close", () => { frame.innerHTML = ""; lastFocus?.focus(); });
  $("#modalClose").addEventListener("click", closeVideo);
  modal.addEventListener("click", e => { if (e.target === modal) closeVideo(); });
  grid.addEventListener("click", e => {
    const btn = e.target.closest(".card__btn");
    if (btn) openVideo(work[+btn.dataset.index]);
  });

  /* ---------- YouTube: latest uploads (loads only when tapped) ---------- */
  const ytBox = $("#ytUploads");
  const channelId = S.youtube?.channelId || "";
  $(".player__facade", ytBox).addEventListener("click", () => {
    if (!channelId.startsWith("UC")) { window.open(ytUrl, "_blank", "noopener"); return; }
    const uploads = "UU" + channelId.slice(2);
    ytBox.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=${uploads}&autoplay=1&rel=0" title="Latest uploads from Sam Universe" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  });

  /* ---------- Instagram reels ---------- */
  const reelsBox = $("#igReels");
  const reels = (S.instagram?.reels || []).filter(Boolean);
  if (reels.length) {
    reelsBox.classList.add("reels--embed");
    reelsBox.innerHTML = reels.slice(0, 3).map((url, i) => {
      const clean = url.split("?")[0].replace(/\/?$/, "/");
      return `<iframe src="${esc(clean)}embed" title="Instagram post ${i + 1} from samuniverse" loading="lazy" allowtransparency="true" scrolling="no"></iframe>`;
    }).join("");
  } else {
    const labels = ["Science in 60 seconds", "Behind the animation", "Motion tips"];
    reelsBox.innerHTML = labels.map(l => `<a class="reel-tile" href="${esc(igUrl)}" target="_blank" rel="noopener"><span>${l}</span></a>`).join("");
  }

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  const status = $("#formStatus");
  const setStatus = (msg, err = false) => { status.textContent = msg; status.classList.toggle("is-error", err); };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    let firstBad = null;
    $$("input[required], textarea[required]", form).forEach(f => {
      const ok = f.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()) : f.value.trim().length > 0;
      f.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) firstBad = f;
    });
    if (firstBad) {
      setStatus(firstBad.type === "email" ? "Enter an email address like name@example.com." : "Fill in your name, email and a few words about the project.", true);
      firstBad.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const btn = $("button[type=submit]", form);

    if (S.formEndpoint) {
      btn.disabled = true;
      setStatus("Sending…");
      try {
        const res = await fetch(S.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        setStatus("Message sent. We'll reply within one working day.");
      } catch {
        setStatus(`Couldn't send right now. Email us directly at ${S.email}.`, true);
      } finally {
        btn.disabled = false;
      }
    } else {
      const subject = `New project: ${data.type} — ${data.name}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nType: ${data.type}\n\n${data.message}`;
      window.location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Your email app is opening with the message filled in. Press send there.");
    }
  });
  $$("input, textarea", form).forEach(f => f.addEventListener("input", () => f.removeAttribute("aria-invalid")));

  /* ---------- Scroll reveals ---------- */
  $$(".section__head, .svc, .step, .channel, .contact__intro, .form").forEach(el => el.classList.add("reveal"));
  if (reduceMotion || !("IntersectionObserver" in window)) {
    $$(".reveal").forEach(el => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    $$(".reveal").forEach(el => io.observe(el));
  }
})();
