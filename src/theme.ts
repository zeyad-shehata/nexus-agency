// ============================================
// NEXUS AGENCY  Theme Manager
// ============================================

export function initTheme() {
  const stored = localStorage.getItem('nexus-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', stored);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nexus-theme', next);
    });
  }
}
