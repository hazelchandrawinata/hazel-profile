const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('.reveal');
const backToTop = document.querySelector('.back-to-top');
const yearElement = document.getElementById('year');
const cvToast = document.getElementById('cv-toast');
const cvTrigger = document.querySelector('[data-cv-trigger]');
const themeToggle = document.querySelector('.theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = 'hazel-profile-theme';

const getInitialTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  } catch (error) {
    console.warn('Unable to read the saved color theme.', error);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme, savePreference = false) => {
  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${nextTheme} mode`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  }

  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#111820' : '#101C2C');
  }

  if (savePreference) {
    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      console.warn('Unable to save the selected color theme.', error);
    }
  }
};

applyTheme(getInitialTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('main section[id]').forEach((section) => {
  sectionObserver.observe(section);
});

const showToast = (message) => {
  if (!cvToast) return;
  cvToast.textContent = message;
  cvToast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    cvToast.classList.remove('show');
  }, 3200);
};

if (cvTrigger) {
  cvTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    const cvPath = 'assets/documents/Hazel-Chandrawinata-CV.pdf';

    const shouldDownload = window.confirm(
      'A CV file has not been added yet. Add the PDF to assets/documents/Hazel-Chandrawinata-CV.pdf and refresh to enable direct download.'
    );

    if (shouldDownload) {
      showToast('CV file not added yet. Save your PDF to assets/documents and refresh the page.');
    } else {
      showToast('CV file not added yet. Save your PDF to assets/documents and refresh the page.');
    }

    window.location.href = '#contact';

    const pdfExists = false;
    if (pdfExists) {
      window.location.href = cvPath;
    }
  });
}

window.addEventListener('scroll', () => {
  if (!backToTop) return;
  if (window.scrollY > 260) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
