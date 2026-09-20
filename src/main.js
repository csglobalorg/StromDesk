/* ==========================================================
   STROMDESK DIGITAL SOLUTIONS — INTERACTIVE SCRIPTS
   Brand Color Guide v2: #0A1F44, #0066FF, #00D4FF, #FFFFFF
   ========================================================== */

// Prevent theme flash
(function() {
  const savedTheme = localStorage.getItem('stromdesk_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initBentoTabs();
  initModals();
  initContactFormAndToasts();
  initMobileMenu();
  initScrollSpy();
});

/* ----------------------------------------------------------
   0. THEME SWITCHER (Dark Mode <-> Brand Guide v2 Light Mode)
   ---------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  if (!toggleBtns.length) return;

  function updateButtonsUI(theme) {
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('.theme-toggle-icon');
      const label = btn.querySelector('.theme-toggle-label') || btn.querySelector('.theme-toggle-text');
      if (theme === 'light') {
        if (icon) icon.textContent = '🌙';
        if (label) label.textContent = 'Dark Mode';
        btn.setAttribute('title', 'Switch to Dark Mode');
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        if (icon) icon.textContent = '☀️';
        if (label) label.textContent = 'Light Mode';
        btn.setAttribute('title', 'Switch to Light Brand Guide Mode');
        btn.setAttribute('aria-label', 'Switch to Light Brand Guide Mode');
      }
    });
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateButtonsUI(currentTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = active === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('stromdesk_theme', nextTheme);
      updateButtonsUI(nextTheme);
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => observer.observe(sec));
}

/* ----------------------------------------------------------
   1. NAVBAR SCROLL & ACTIVE TRACKING
   ---------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else if (link.getAttribute('href')?.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  });
}

/* ----------------------------------------------------------
   2. HERO BENTO INTERACTIVE TABS
   ---------------------------------------------------------- */
function initBentoTabs() {
  const tabBtns = document.querySelectorAll('.bento-tab-btn');
  const metricLighthouse = document.getElementById('metricLighthouse');
  const metricSpeed = document.getElementById('metricSpeed');
  const metricStack = document.getElementById('metricStack');

  if (!tabBtns.length) return;

  const bentoData = {
    performance: { score: '100', speed: '0.38s', stack: 'React/Vite' },
    responsive: { score: '99', speed: '0.42s', stack: 'Mobile-1st' },
    conversion: { score: '+48%', speed: '<0.5s', stack: 'UX Flow' }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabKey = btn.getAttribute('data-bento-tab');
      if (bentoData[tabKey]) {
        if (metricLighthouse) metricLighthouse.textContent = bentoData[tabKey].score;
        if (metricSpeed) metricSpeed.textContent = bentoData[tabKey].speed;
        if (metricStack) metricStack.textContent = bentoData[tabKey].stack;
      }
    });
  });
}


/* ----------------------------------------------------------
   5. CONSULTATION & PROJECT INQUIRY MODAL
   ---------------------------------------------------------- */
function initModals() {
  const modal = document.getElementById('consultationModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const triggerButtons = document.querySelectorAll('[data-open-modal="consultation"]');

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!modal) return;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal(modal);
    }
  });

  function closeModal(m) {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ----------------------------------------------------------
   6. CONTACT FORM & TOAST NOTIFICATIONS
   ---------------------------------------------------------- */
function initContactFormAndToasts() {
  const forms = [
    document.getElementById('contactForm'),
    document.getElementById('modalConsultationForm')
  ];

  forms.forEach(form => {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[type="text"]');
      const name = nameInput ? nameInput.value : 'there';
      
      const modal = document.getElementById('consultationModal');
      if (modal && modal.classList.contains('open')) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      showToast(`Thank you, ${name}! Your inquiry has been received. A StromDesk digital strategist will contact you shortly.`);
      form.reset();
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: #00D4FF; font-size: 1.1rem; font-weight: bold;">✓</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* ----------------------------------------------------------
   7. MOBILE HAMBURGER MENU
   ---------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}
