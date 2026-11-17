// Borno Sarker Portfolio interactions

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Dark and light mode
const savedTheme = localStorage.getItem('borno-portfolio-theme');

if (savedTheme === 'light' || savedTheme === 'dark') {
  root.dataset.theme = savedTheme;
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const nextTheme =
    root.dataset.theme === 'light' ? 'dark' : 'light';

  root.dataset.theme = nextTheme;

  localStorage.setItem('borno-portfolio-theme', nextTheme);

  updateThemeIcon();
});

function updateThemeIcon() {
  const isLight = root.dataset.theme === 'light';

  themeIcon.textContent = isLight ? '☾' : '☀';

  themeToggle.setAttribute(
    'aria-label',
    isLight ? 'Switch to dark theme' : 'Switch to light theme'
  );
}

// Mobile navigation menu
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));

  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  );

  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');

    menuToggle.textContent = '☰';
  });
});

// Reveal sections on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

// Highlight active navigation section
const sections = document.querySelectorAll('main section[id]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  rootMargin: '-35% 0px -55% 0px'
});

sections.forEach(section => navObserver.observe(section));

// Animated role text
const roleElement = document.getElementById('typedRole');

const roles = [
  'Software Engineer',
  'Web Developer',
  'Lifelong Learner'
];

let roleIndex = 0;

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;

    roleElement.textContent = roles[roleIndex];
  }, 2600);
}

// Automatic copyright year
document.getElementById('year').textContent =
  new Date().getFullYear();