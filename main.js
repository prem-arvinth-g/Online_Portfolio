/* Prem Arvinth G — portfolio
   Plain JS + GSAP/ScrollTrigger + Lenis. Everything degrades to a static,
   fully readable page if the CDN scripts fail or the visitor prefers reduced motion. */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const EMAIL = 'premarvinthg@gmail.com';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ───────────────────────── Data ───────────────────────── */
  const TOTAL_MS = 48;
  const SPANS = [
    { name: '<b>ProfilePage</b>.ngOnInit', layer: 'ui', depth: 0, start: 0, dur: 48 },
    { name: 'HttpClient GET <b>/api/developers</b>', layer: 'ui', depth: 1, start: 2, dur: 43 },
    { name: '<b>DevelopersController</b>.Get', layer: 'api', depth: 2, start: 5, dur: 37 },
    { name: '<b>DeveloperService</b>.GetProfileAsync', layer: 'api', depth: 3, start: 7, dur: 31 },
    { name: 'EF Core <b>Developers</b>.FirstAsync', layer: 'data', depth: 4, start: 10, dur: 22 },
    { name: 'SQL Server <b>usp_GetProfile</b>', layer: 'data', depth: 5, start: 13, dur: 15 },
  ];
  const LAYER_NAME = { ui: 'Interface', api: 'API', data: 'Data', hw: 'Hardware & ML' };

  const RESPONSE = [
    ['{', ''],
    ['  ', 'name', 'Prem Arvinth G'],
    ['  ', 'role', 'Software Developer'],
    ['  ', 'company', 'Russell Tobin'],
    ['  ', 'since', '2026-08'],
    ['  ', 'stack', ['Angular', 'C#', 'ASP.NET Core', 'SQL Server']],
    ['  ', 'basedIn', 'Chennai, India'],
    ['}', ''],
  ];

  const GH = 'https://github.com/prem-arvinth-g/';
  const PROJECTS = [
    {
      id: 'sms',
      title: 'Student Management System',
      year: '2026',
      layers: ['ui', 'api', 'data'],
      summary: 'Role-based portals for admins, staff and students, built in ASP.NET Core MVC.',
      detail: 'A college management app with a separate, secure portal for each role. Admins run departments and users, staff record attendance and marks for their subjects, and students follow their own progress.',
      points: [
        'Role-based login with dedicated Admin, Staff and Student dashboards',
        'Entity Framework Core code-first models and migrations on MySQL',
        'Modules for attendance, marks, departments and staff-to-subject assignment',
      ],
      stack: ['C#', 'ASP.NET Core MVC', 'Entity Framework Core', 'MySQL', 'Razor'],
      links: [{ label: 'View code', href: GH + 'Student_Management_System_.NET' }],
    },
    {
      id: 'velora',
      title: 'Velora fashion store',
      year: '2026',
      layers: ['ui', 'api', 'data'],
      summary: 'A full-stack clothing store: React + TypeScript storefront on a Django REST API.',
      detail: 'An online fashion shop where the front end and back end are fully separate and talk over a token-secured REST API.',
      points: [
        'JWT authentication plus Google sign-in',
        'Cart, checkout and orders with courier name and estimated delivery',
        'PostgreSQL, Cloudinary image hosting, all secrets read from environment variables',
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Django REST Framework', 'PostgreSQL', 'Cloudinary'],
      links: [{ label: 'View code', href: GH + 'Dress_Shop' }],
    },
    {
      id: 'flashmart',
      title: 'FlashMart e-commerce',
      year: '2025',
      layers: ['ui', 'api', 'data'],
      summary: 'An Amazon-inspired Django store with listings, cart and checkout, deployed on PythonAnywhere.',
      detail: 'My first complete web application, used to learn the whole request cycle from template to database.',
      points: [
        'Product catalogue across categories with a seed-data management command',
        'Cart and checkout workflow with a documented payment flow',
        'Deployed and running on PythonAnywhere',
      ],
      stack: ['Python', 'Django', 'Bootstrap', 'SQL'],
      links: [{ label: 'View code', href: GH + 'E-Com' }],
    },
    {
      id: 'anpr',
      title: 'Number plate recognition',
      year: '2025',
      layers: ['hw'],
      summary: 'Reads licence plates from traffic video using YOLOv8, SORT tracking and OCR.',
      detail: 'A computer-vision pipeline that finds every vehicle in a video, follows it across frames, and reads its plate once.',
      points: [
        'Two YOLOv8 models: one for vehicles, one custom-trained for plates',
        'SORT tracking gives each vehicle a stable ID across frames',
        'Tesseract OCR output is logged to CSV and rendered onto an annotated video',
      ],
      stack: ['Python', 'YOLOv8', 'OpenCV', 'SORT', 'Tesseract OCR'],
      links: [{ label: 'View code', href: GH + 'Automatic_Number_Plate_Recognition' }],
    },
    {
      id: 'streetlight',
      title: 'Smart streetlight fault detector',
      year: '2026',
      layers: ['hw', 'ui'],
      summary: 'ESP32 sensors spot failed streetlights and report them to a live web dashboard.',
      detail: 'My final-year project. It shortens repair time by telling maintenance teams exactly which light failed and why.',
      points: [
        'Light and current sensors together tell a bulb failure apart from a power failure',
        'The ESP32 posts JSON status updates over WiFi to a web dashboard (green = working, red = fault)',
        'Written up as an IEEE-format paper and presented at a conference',
      ],
      stack: ['ESP32', 'Embedded C', 'WiFi / HTTP', 'Django dashboard'],
      links: [{ label: 'View project files', href: GH + 'Automatic_Smart_Streetlight_Fault_Detection_and_Response_System' }],
    },
    {
      id: 'retail',
      title: 'Retail sales insights',
      year: '2025',
      layers: ['data'],
      summary: 'Pandas cleaning, SQL window-function analysis and a Power BI report on e-commerce orders.',
      detail: 'Business questions answered end to end: from a messy CSV to queries a manager could act on.',
      points: [
        'Top products in each region with ROW_NUMBER() OVER (PARTITION BY …)',
        'Month-over-month 2022 vs 2023 comparison with CTEs and conditional aggregation',
        'Power BI report on sales, profit margin and segments',
      ],
      stack: ['Python', 'Pandas', 'MySQL', 'Power BI'],
      links: [{ label: 'View code', href: GH + 'Retail-Sales-Insights-using-SQL' }],
    },
    {
      id: 'fraud',
      title: 'Discount fraud detection',
      year: '2025',
      layers: ['data'],
      summary: 'A Power BI rule that catches products whose listed discount doesn’t match their prices.',
      detail: 'DAX measures recompute each product’s real discount and compare it with the one advertised.',
      points: [
        'Flags a listing if the discounts differ by more than 1% or if the selling price is above the original price',
        'KPI card, detail table, brand breakdown and a price-vs-discount scatter plot',
        'Caught one mismatched listing in the dataset',
      ],
      stack: ['Power BI', 'DAX', 'Power Query'],
      links: [{ label: 'View report', href: GH + 'Fraud-detecting-Power-Bi' }],
    },
  ];

  /* ───────────────────────── Small helpers ───────────────────────── */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-on'), 2200);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast('Email copied');
    } catch {
      toast(EMAIL);
    }
  }

  /* ───────────────────────── Smooth scroll ───────────────────────── */
  let lenis = null;
  if (!reduceMotion && typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3.2), smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollToTarget(target) {
    if (target === '#top' || target === document.body) {
      if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      return;
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const offset = -88;
    if (lenis) lenis.scrollTo(el, { offset });
    else {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    scrollToTarget(id === '#top' ? '#top' : el);
    history.replaceState(null, '', id);
    if (id === '#main') el.focus?.();
  });

  /* ───────────────────────── Hero trace ───────────────────────── */
  function renderSpans() {
    const list = $('#spans');
    list.innerHTML = SPANS.map((s, i) => {
      const start = (s.start / TOTAL_MS) * 100;
      const dur = (s.dur / TOTAL_MS) * 100;
      return `<li><button type="button" class="span" data-layer="${s.layer}" data-i="${i}"
          aria-label="${esc(s.name.replace(/<[^>]+>/g, ''))}, ${s.dur} milliseconds. Jump to the ${LAYER_NAME[s.layer]} layer"
          style="--depth:${Math.min(s.depth, 4)};--start:${start}%;--dur:${dur}%">
          <span class="span-name">${s.name}</span>
          <span class="span-track"><span class="span-bar"></span><span class="span-ms${start + dur > 80 ? ' is-inside' : ''}">${s.dur} ms</span></span>
        </button></li>`;
    }).join('');

    list.addEventListener('click', (e) => {
      const b = e.target.closest('.span');
      if (b) scrollToTarget('#layer-' + b.dataset.layer);
    });
  }

  function responseLines() {
    return RESPONSE.map((row, i) => {
      if (row.length === 2) return row[0];
      const [ind, key, val] = row;
      const comma = i < RESPONSE.length - 2 ? ',' : '';
      const v = Array.isArray(val)
        ? '[' + val.map((x) => `<span class="s">"${esc(x)}"</span>`).join(', ') + ']'
        : `<span class="s">"${esc(val)}"</span>`;
      return `${ind}<span class="k">"${key}"</span>: ${v}${comma}`;
    });
  }

  function showFinalTrace() {
    $('#trace-status').textContent = '200 OK · 48 ms';
    $('#trace-status').classList.add('is-ok');
    $('#response').innerHTML = responseLines().join('\n');
  }

  function playIntro() {
    const lines = responseLines();
    const resp = $('#response');
    const status = $('#trace-status');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-title .line-inner', { yPercent: 105, duration: 1.1, stagger: 0.09, ease: 'power4.out' })
      .from('.hero-status', { opacity: 0, y: 10, duration: 0.6 }, 0.25)
      .from(['.hero-lede', '.hero-actions'], { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.4)
      .from('.trace', { opacity: 0, y: 24, scale: 0.985, duration: 0.9 }, 0.3)
      .add(() => { status.textContent = 'sending…'; }, 0.7)
      .from('.span', { opacity: 0, x: -8, duration: 0.35, stagger: 0.06 }, 0.75);

    // bars grow in the order the spans start: a waterfall
    $$('.span-bar').forEach((bar, i) => {
      tl.from(bar, { scaleX: 0, duration: 0.5 + SPANS[i].dur / 60, ease: 'power2.inOut' }, 0.95 + SPANS[i].start / 40);
    });
    tl.from('.span-ms', { opacity: 0, duration: 0.4, stagger: 0.05 }, '-=0.4')
      .add(() => {
        status.textContent = '200 OK · 48 ms';
        status.classList.add('is-ok');
      })
      .add(() => typeLines(resp, lines), '+=0.05');
  }

  function typeLines(el, lines) {
    let i = 0;
    const step = () => {
      el.innerHTML = lines.slice(0, i + 1).join('\n') + (i < lines.length - 1 ? '\n' : ' ') + '<span class="caret"></span>';
      i += 1;
      if (i < lines.length) setTimeout(step, 85);
    };
    step();
  }

  /* ───────────────────────── Projects ───────────────────────── */
  function renderProjects() {
    const list = $('#projects');
    list.innerHTML = PROJECTS.map((p) => `
      <li class="project" data-layers="${p.layers.join(' ')}" id="project-${p.id}">
        <button type="button" class="project-head" aria-expanded="false" aria-controls="pb-${p.id}">
          <span class="p-main">
            <span class="p-title">${esc(p.title)}</span>
            <span class="p-sum">${esc(p.summary)}</span>
          </span>
          <span class="p-layers" aria-label="Layers: ${p.layers.map((l) => LAYER_NAME[l]).join(', ')}">
            ${p.layers.map((l) => `<span class="dot dot-${l}"></span>`).join('')}
          </span>
          <span class="p-right"><span class="p-year">${p.year}</span><span class="p-toggle" aria-hidden="true"></span></span>
        </button>
        <div class="project-body" id="pb-${p.id}" role="region" aria-label="${esc(p.title)} details">
          <div>
            <div class="p-detail">
              <div>
                <p>${esc(p.detail)}</p>
                <ul class="points">${p.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
              </div>
              <div class="p-side">
                <div><h4>Built with</h4><ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
                <div class="p-links">${p.links.map((l) => `<a class="btn btn-line" href="${l.href}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}</div>
              </div>
            </div>
          </div>
        </div>
      </li>`).join('');

    // collapsed bodies must not be tabbable
    $$('.project-body', list).forEach((b) => (b.inert = true));

    list.addEventListener('click', (e) => {
      const head = e.target.closest('.project-head');
      if (head) toggleProject(head.closest('.project'));
    });

    $$('.filter').forEach((btn) => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      $$('.filter').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      const items = $$('.project');
      items.forEach((it) => {
        const show = f === 'all' || it.dataset.layers.split(' ').includes(f);
        it.classList.toggle('is-hidden', !show);
      });
      if (hasGsap && !reduceMotion) {
        gsap.fromTo(items.filter((it) => !it.classList.contains('is-hidden')),
          { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', clearProps: 'all' });
      }
      if (hasGsap) ScrollTrigger.refresh();
    }));
  }

  function toggleProject(item, force) {
    const open = force ?? !item.classList.contains('is-open');
    item.classList.toggle('is-open', open);
    $('.project-head', item).setAttribute('aria-expanded', String(open));
    $('.project-body', item).inert = !open;
    if (hasGsap) setTimeout(() => ScrollTrigger.refresh(), 600);
  }

  /* ───────────────────────── Stack section ───────────────────────── */
  function setLayer(layer) {
    $$('.slab').forEach((s) => s.classList.toggle('is-active', s.dataset.layer === layer));
    $$('.layer').forEach((l) => l.classList.toggle('is-active', l.dataset.layer === layer));
  }

  function initStack() {
    const packet = $('#packet');
    const label = $('#packet-label');
    const TOP = 40, BOTTOM = 400;

    if (!hasGsap) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => en.isIntersecting && setLayer(en.target.dataset.layer));
      }, { rootMargin: '-45% 0px -45% 0px' });
      $$('.layer').forEach((l) => io.observe(l));
      setLayer('ui');
      return;
    }

    $$('.layer').forEach((l) => {
      ScrollTrigger.create({
        trigger: l, start: 'top 55%', end: 'bottom 55%',
        onToggle: (self) => self.isActive && setLayer(l.dataset.layer),
      });
    });
    setLayer('ui');

    if (reduceMotion) return;
    // the packet travels down as a request, then back up as the response
    ScrollTrigger.create({
      trigger: '.stack-text', start: 'top 60%', end: 'bottom 70%', scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        const down = p < 0.72;
        const t = down ? p / 0.72 : 1 - (p - 0.72) / 0.28;
        packet.setAttribute('cy', (TOP + (BOTTOM - TOP) * t).toFixed(1));
        label.textContent = down ? 'request ↓' : 'response ↑ 200 OK';
      },
    });
  }

  /* ───────────────────────── Path timeline ───────────────────────── */
  function initTimeline() {
    const tl = $('#timeline');
    const items = $$('li', tl);
    if (!hasGsap) { items.forEach((li) => li.classList.add('is-lit')); tl.style.setProperty('--fill', 1); return; }
    ScrollTrigger.create({
      trigger: tl, start: 'top 65%', end: 'bottom 65%', scrub: true,
      onUpdate: (self) => tl.style.setProperty('--fill', self.progress.toFixed(3)),
    });
    items.forEach((li) => ScrollTrigger.create({
      trigger: li, start: 'top 65%',
      onEnter: () => li.classList.add('is-lit'),
      onLeaveBack: () => li.classList.remove('is-lit'),
    }));
  }

  /* ───────────────────────── Nav ───────────────────────── */
  function initNav() {
    const nav = $('#nav');
    const bar = $('#progress-bar');
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    if (lenis) lenis.on('scroll', onScroll); else window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const links = $$('.nav-links a');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['stack', 'now', 'work', 'path', 'contact'].forEach((id) => io.observe(document.getElementById(id)));
  }

  /* ───────────────────────── Command palette ───────────────────────── */
  function initPalette() {
    const dlg = $('#palette');
    const input = $('#palette-input');
    const list = $('#palette-list');
    const opener = $('#palette-open');
    let lastFocus = null;
    let sel = 0;
    let shown = [];

    const go = (id) => () => scrollToTarget(id);
    const ACTIONS = [
      { label: 'Top', hint: 'Section', run: go('#top') },
      { label: 'Stack: one request, three layers', hint: 'Section', run: go('#stack') },
      { label: 'Right now at Russell Tobin', hint: 'Section', run: go('#now') },
      { label: 'Things I’ve built', hint: 'Section', run: go('#work') },
      { label: 'How I got here', hint: 'Section', run: go('#path') },
      { label: 'Contact', hint: 'Section', run: go('#contact') },
      { label: 'Copy email address', hint: 'Action', run: copyEmail },
      { label: 'Write an email', hint: 'Action', run: () => { location.href = 'mailto:' + EMAIL; } },
      { label: 'Open LinkedIn', hint: 'Link', run: () => window.open('https://www.linkedin.com/in/prem-arvinthg/', '_blank', 'noopener') },
      { label: 'Open GitHub', hint: 'Link', run: () => window.open('https://github.com/prem-arvinth-g', '_blank', 'noopener') },
      ...PROJECTS.map((p) => ({
        label: p.title, hint: 'Project',
        run: () => {
          $$('.filter')[0].click();
          const item = document.getElementById('project-' + p.id);
          toggleProject(item, true);
          setTimeout(() => scrollToTarget(item), 60);
        },
      })),
    ];

    function render() {
      const q = input.value.trim().toLowerCase();
      shown = ACTIONS.filter((a) => !q || (a.label + ' ' + a.hint).toLowerCase().includes(q));
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      list.innerHTML = shown.length
        ? shown.map((a, i) => `<li role="option" id="opt-${i}" aria-selected="${i === sel}" data-i="${i}">${esc(a.label)}<span class="hint">${a.hint}</span></li>`).join('')
        : '<li class="empty">Nothing matches. Try “work”, “email” or a project name.</li>';
      input.setAttribute('aria-activedescendant', shown.length ? 'opt-' + sel : '');
      $('#opt-' + sel)?.scrollIntoView({ block: 'nearest' });
    }

    function open() {
      lastFocus = document.activeElement;
      dlg.hidden = false;
      lenis?.stop();
      input.value = '';
      sel = 0;
      render();
      requestAnimationFrame(() => input.focus());
    }
    function close() {
      dlg.hidden = true;
      lenis?.start();
      lastFocus?.focus?.();
    }
    function run(i) {
      const a = shown[i];
      if (!a) return;
      close();
      a.run();
    }

    opener.addEventListener('click', open);
    dlg.addEventListener('mousedown', (e) => { if (e.target === dlg) close(); });
    input.addEventListener('input', () => { sel = 0; render(); });
    list.addEventListener('mousemove', (e) => {
      const li = e.target.closest('li[data-i]');
      if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; render(); }
    });
    list.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-i]');
      if (li) run(+li.dataset.i);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(1, shown.length); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + shown.length) % Math.max(1, shown.length); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
      else if (e.key === 'Tab') { e.preventDefault(); } // keep focus inside the dialog
    });
    document.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg.hidden ? open() : close(); }
      else if (e.key === '/' && !typing && dlg.hidden) { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && !dlg.hidden) { close(); }
    });
  }

  /* ───────────────────────── Live bits ───────────────────────── */
  function initLive() {
    $('#year').textContent = new Date().getFullYear();

    const clock = $('#clock');
    const fmt = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);

    // tenure counted the way LinkedIn does (inclusive months since Aug 2026)
    const now = new Date();
    const months = (now.getFullYear() - 2026) * 12 + (now.getMonth() - 7) + 1;
    if (months > 0) {
      const y = Math.floor(months / 12), m = months % 12;
      const parts = [];
      if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
      if (m) parts.push(`${m} month${m > 1 ? 's' : ''}`);
      $('#tenure').textContent = parts.join(' ');
    }

    $$('[data-copy]').forEach((b) => b.addEventListener('click', copyEmail));
  }

  /* ───────────────────────── Section reveals (one quiet move each) ───────────────────────── */
  function initReveals() {
    if (!hasGsap || reduceMotion) return;
    $$('.section-title, .contact-title').forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
    gsap.from('.now-photo', {
      clipPath: 'inset(100% 0 0 0 round 22px)', duration: 1.2, ease: 'power4.inOut',
      scrollTrigger: { trigger: '.now-photo', start: 'top 80%', once: true },
    });
  }

  /* ───────────────────────── Boot ───────────────────────── */
  renderSpans();
  renderProjects();
  initLive();
  initNav();
  initPalette();

  initStack();
  initTimeline();
  initReveals();

  if (hasGsap && !reduceMotion) {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      playIntro();
      document.documentElement.classList.remove('intro');
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    setTimeout(start, 1200); // never wait on slow fonts for long
  } else {
    document.documentElement.classList.remove('intro');
    showFinalTrace();
  }

  window.addEventListener('load', () => hasGsap && ScrollTrigger.refresh());
})();
