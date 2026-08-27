// ===================================================================
// Mobile nav toggle
// ===================================================================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===================================================================
// Stack filter tabs
// ===================================================================
const stackTabs = document.getElementById('stackTabs');
const stackChips = document.querySelectorAll('.stack-chip');

if (stackTabs) {
  stackTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.stack-tab');
    if (!btn) return;

    stackTabs.querySelectorAll('.stack-tab').forEach((t) => t.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    stackChips.forEach((chip) => {
      const match = filter === 'all' || chip.dataset.cat === filter;
      chip.classList.toggle('is-hidden', !match);
    });
  });
}

// ===================================================================
// Hero console — simulated pipeline status log
// ===================================================================
const consoleLines = [
  { status: '✓', text: 'Dados extraídos', tag: 'Planilhas · APIs' },
  { status: '✓', text: 'Pipeline ETL/ELT concluído', tag: 'Python · Apache Hop' },
  { status: '→', text: 'Carregando no banco de dados', tag: 'PostgreSQL · MySQL', pending: true },
  { status: '✓', text: 'Modelo dimensional atualizado', tag: 'Data Modeling' },
  { status: '✓', text: 'Dashboard atualizado', tag: 'Power BI · DAX' },
];

const consoleBody = document.getElementById('consoleBody');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderConsoleLines() {
  if (!consoleBody) return;
  consoleBody.innerHTML = '';
  consoleLines.forEach((line, i) => {
    const el = document.createElement('div');
    el.className = 'console-line' + (line.pending ? ' is-pending' : '');
    el.style.animationDelay = prefersReducedMotion ? '0s' : `${i * 0.12}s`;
    el.innerHTML = `
      <span class="status">${line.status}</span>
      <span class="txt">${line.text}</span>
      <span class="tag">// ${line.tag}</span>
    `;
    consoleBody.appendChild(el);
  });
}

renderConsoleLines();

if (!prefersReducedMotion && consoleBody) {
  setInterval(() => {
    consoleLines.push(consoleLines.shift());
    renderConsoleLines();
  }, 4200);
}

// ===================================================================
// Scroll reveal
// ===================================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
