// ============================================
// NEXUS AGENCY  Main Entry Point
// Premium Edition v2.0
// ============================================

import './styles/index.css';

import { Router } from './router';
import { initTheme } from './theme';
import { initCursor, initScrollProgress, initBackToTop, initNavbar, initMagneticTilt, initButtonRipple } from './ui';
import { initChatWidget } from './components/chat-widget';
import { initParticles } from './components/particles';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after content loads
  const loader = document.getElementById('page-loader');
  const percentage = document.getElementById('loader-percentage');
  let progress = 0;
  
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    if (percentage) percentage.textContent = Math.floor(progress) + '%';
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
      }, 300);
    }
  }, 100);

  // Initialize core features
  initTheme();
  initNavbar();
  initScrollProgress();
  initBackToTop();
  initCursor();
  initMagneticTilt();
  initButtonRipple();

  // Initialize particle background
  initParticles();

  // Initialize router
  const router = new Router();
  router.init();

  // Initialize chat widget
  initChatWidget();

  // Initialize reveal animations
  initRevealAnimations();
});

// Intersection Observer for reveal animations
export function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

// Animated counter
export function animateCounters() {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.count || '0');
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2000;
        const start = Date.now();

        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = prefix + current.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}
