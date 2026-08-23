(() => {
  const HEADER_OFFSET = 64;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================================================================
     Lucide Icons
     ================================================================ */
  if (window.lucide?.createIcons) window.lucide.createIcons();

  /* ================================================================
     DOM References
     ================================================================ */
  const header = document.getElementById('header');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');
  const navLinks = Array.from(document.querySelectorAll('a[data-scroll]'));

  const sectionIds = [
    '#desafios',
    '#processo',
    '#solucoes',
    '#tecnologia',
    '#cases',
    '#mobilidade',
    '#mvp',
    '#contato',
    '#criar',
    '#conectar',
    '#operar',
    '#consultoria',
  ];

  /* ================================================================
     Smooth Scroll
     ================================================================ */
  function smoothScrollTo(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    if (prefersReducedMotion) {
      window.scrollTo(0, y);
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  document.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a[data-scroll]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    smoothScrollTo(href);
    closeMobileMenu();
  });

  /* ================================================================
     Mobile Menu
     ================================================================ */
  let lastFocusedEl = null;

  function getFocusable(container) {
    return Array.from(container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  }

  function openMobileMenu() {
    if (!mobileMenu || !mobileBtn) return;
    lastFocusedEl = document.activeElement;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileBtn.setAttribute('aria-expanded', 'true');
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    if (sbw > 0) {
      document.body.style.paddingRight = sbw + 'px';
      if (header) header.style.paddingRight = sbw + 'px';
    }
    document.body.style.overflow = 'hidden';
    const focusable = getFocusable(mobileMenu);
    if (focusable.length) focusable[0].focus();
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileBtn) return;
    if (!mobileMenu.classList.contains('open')) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (header) header.style.paddingRight = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function trapFocus(e) {
    if (!mobileMenu?.classList.contains('open')) return;
    if (e.key !== 'Tab') return;
    const focusable = getFocusable(mobileMenu);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  mobileBtn?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
    trapFocus(e);
  });

  /* ================================================================
     Active Section Tracking
     ================================================================ */
  const sections = sectionIds
    .map((hash) => ({ hash, el: document.querySelector(hash) }))
    .filter((item) => item.el);

  function setActiveSection() {
    let active = '';
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      if (sections[i].el.getBoundingClientRect().top <= 120) {
        active = sections[i].hash;
        break;
      }
    }
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === active);
    });
  }

  function onScroll() {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    setActiveSection();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ================================================================
     Scroll Reveal
     ================================================================ */
  if (prefersReducedMotion) {
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      el.classList.add('visible');
    });
  } else {
    const revealEls = Array.from(document.querySelectorAll('.scroll-reveal'));
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => {
      if (!el.classList.contains('visible')) revealObs.observe(el);
    });
  }

  /* ================================================================
     Process Scroll Line
     ================================================================ */
  (function initProcessLine() {
    const processSection = document.getElementById('processo');
    if (!processSection) return;

    const lineFill = processSection.querySelector('.process-line-fill');
    const steps = processSection.querySelectorAll('.process-step');
    if (!lineFill || steps.length === 0) return;

    if (prefersReducedMotion) {
      steps.forEach((s) => s.classList.add('active'));
      lineFill.style.height = '100%';
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    );

    steps.forEach((step) => obs.observe(step));

    function updateLineFill() {
      const firstStep = steps[0];
      const lastStep = steps[steps.length - 1];
      if (!firstStep || !lastStep) return;

      const sectionRect = processSection.getBoundingClientRect();
      const firstRect = firstStep.getBoundingClientRect();
      const lastRect = lastStep.getBoundingClientRect();

      const sectionTop = sectionRect.top;
      const firstCenter = firstRect.top + firstRect.height / 2 - sectionTop;
      const lastCenter = lastRect.top + lastRect.height / 2 - sectionTop;

      const viewCenter = window.innerHeight / 2;
      const sectionViewTop = sectionRect.top;
      const progress = Math.max(0, Math.min(1,
        (viewCenter - sectionViewTop - firstCenter) / (lastCenter - firstCenter)
      ));

      lineFill.style.height = `${progress * 100}%`;
    }

    window.addEventListener('scroll', updateLineFill, { passive: true });
    window.addEventListener('resize', updateLineFill, { passive: true });
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(updateLineFill);
      ro.observe(processSection);
      steps.forEach((s) => ro.observe(s));
    }
    updateLineFill();
  })();

  /* ================================================================
     Hero Particle Canvas
     ================================================================ */
  (function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (prefersReducedMotion) {
      canvas.style.display = 'none';
      return;
    }

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 18 : 45;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_REPULSE_DISTANCE = 100;
    const MOUSE_REPULSE_FORCE = 0.8;
    const DRIFT_SPEED = 0.3;

    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animFrame;
    let isVisible = true;

    function resize() {
      const hero = canvas.parentElement;
      if (!hero) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = hero.offsetWidth * dpr;
      canvas.height = hero.offsetHeight * dpr;
      canvas.style.width = hero.offsetWidth + 'px';
      canvas.style.height = hero.offsetHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
          radius: 1.5 + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.3,
        });
      }
    }

    function drawParticles() {
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      ctx.clearRect(0, 0, w, h);

      /* Update positions */
      for (const p of particles) {
        /* Mouse repulsion */
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPULSE_DISTANCE && dist > 0) {
          const force = (1 - dist / MOUSE_REPULSE_DISTANCE) * MOUSE_REPULSE_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        /* Damping */
        p.vx *= 0.98;
        p.vy *= 0.98;

        /* Clamp velocity */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        /* Apply drift */
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap around edges */
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      /* Draw connections */
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.08;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw particles */
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx.fill();
      }
    }

    function animate() {
      if (!isVisible) {
        animFrame = requestAnimationFrame(animate);
        return;
      }
      drawParticles();
      animFrame = requestAnimationFrame(animate);
    }

    /* Track mouse relative to canvas */
    canvas.parentElement?.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement?.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    /* Visibility API — pause when tab hidden */
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    /* Pause when hero not in viewport */
    const heroObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    const heroSection = canvas.closest('.hero');
    if (heroSection) heroObserver.observe(heroSection);

    resize();
    createParticles();
    animate();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    });
  })();

  /* ================================================================
     Contact Form Success Animation
     ================================================================ */
  (function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<i data-lucide="check"></i> Enviado';
        btn.disabled = true;
        if (window.lucide?.createIcons) window.lucide.createIcons();
      }
      form.classList.add('submitted');
    });
  })();
})();
