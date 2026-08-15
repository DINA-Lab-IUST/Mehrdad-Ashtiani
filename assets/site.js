(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  const THEME_ICONS = {
    moon: '<svg aria-hidden="true" class="theme-icon theme-icon--moon" fill="none" height="19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24" width="19"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.6 8.6 0 1 0 20.5 14.2Z"></path></svg>',
    sun: '<svg aria-hidden="true" class="theme-icon theme-icon--sun" fill="none" height="19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24" width="19"><circle cx="12" cy="12" r="3.6"></circle><path d="M12 2.4v2.1M12 19.5v2.1M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.4 12h2.1M19.5 12h2.1M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5"></path></svg>'
  };


  const MENU_ICONS = {
    menu: '<svg aria-hidden="true" class="menu-icon menu-icon--hamburger" fill="none" viewBox="0 0 24 24"><path d="M4.5 6.5H19.5M4.5 12H19.5M4.5 17.5H19.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"></path></svg>',
    close: '<svg aria-hidden="true" class="menu-icon menu-icon--close" fill="none" viewBox="0 0 24 24"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"></path></svg>'
  };

  const syncMenuControl = (open = false) => {
    if (!menuToggle) return;
    menuToggle.innerHTML = open ? MENU_ICONS.close : MENU_ICONS.menu;
    menuToggle.dataset.icon = open ? 'close' : 'menu';
    menuToggle.setAttribute('aria-expanded', String(open));
    const label = open ? 'Close menu' : 'Open menu';
    menuToggle.setAttribute('aria-label', label);
    menuToggle.setAttribute('title', label);
  };

  const syncThemeControl = () => {
    if (!themeToggle) return;
    const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextIsLight = current === 'dark';
    themeToggle.innerHTML = nextIsLight ? THEME_ICONS.sun : THEME_ICONS.moon;
    const label = nextIsLight ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  };

  document.querySelectorAll('a[href="#top"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', window.location.pathname + window.location.search);
    });
  });

  if (themeToggle) {
    syncThemeControl();
    themeToggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('ma-theme', next); } catch (_) {}
      syncThemeControl();
    });
  }

  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    mobileNav.classList.remove('open');
    syncMenuControl(false);
  };

  if (menuToggle && mobileNav) {
    syncMenuControl(mobileNav.classList.contains('open'));
    menuToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      syncMenuControl(open);
      if (open) mobileNav.querySelector('a')?.focus();
    });
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 780 && mobileNav.classList.contains('open')) closeMenu();
    });
  }



  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'floating-back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.setAttribute('title', 'Back to top');
  backToTop.setAttribute('aria-hidden', 'true');
  backToTop.tabIndex = -1;
  document.body.appendChild(backToTop);

  const backToTopThreshold = 520;
  let scrollTicking = false;
  const syncBackToTop = () => {
    const visible = window.scrollY >= backToTopThreshold;
    backToTop.classList.toggle('is-visible', visible);
    backToTop.setAttribute('aria-hidden', String(!visible));
    backToTop.tabIndex = visible ? 0 : -1;
    scrollTicking = false;
  };
  const requestBackToTopSync = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(syncBackToTop);
  };
  window.addEventListener('scroll', requestBackToTopSync, { passive: true });
  syncBackToTop();
  backToTop.addEventListener('click', () => {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach((el) => observer.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add('visible'));
  }
})();
