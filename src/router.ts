// ============================================
// NEXUS AGENCY â€” Client-Side Router
// Premium Edition v2.0
// ============================================

import { renderHome, initHomePage } from './pages/home';
import { renderServices, initServices } from './pages/services';
import { renderPortfolio, initPortfolio } from './pages/portfolio';
import { renderContact, initContact } from './pages/contact';
import { renderFAQ } from './pages/faq';
import { renderStartProject, initStartProject } from './pages/start-project';
import { renderBlog, initBlog } from './pages/blog';
import { renderTracker, initTracker } from './pages/tracker';
import { renderConsultation } from './pages/consultation';
import { renderReviews, initReviews } from './pages/reviews';
import { renderEstimator } from './pages/estimator';
import { renderAuth, initAuth } from './pages/auth';
import { renderDashboard, initDashboard } from './pages/dashboard';
import { initRevealAnimations, animateCounters } from './main';

interface RouteConfig {
  render: () => string;
  init?: () => void;
  title: string;
  description?: string;
  protected?: boolean;
  admin?: boolean;
}

const routes: Record<string, RouteConfig> = {
  '/': { render: renderHome, init: initHomePage, title: 'Nexus Agency â€” Premium Digital Experiences', description: 'We design and develop premium digital experiences that help businesses grow.' },
  '/services': { render: renderServices, init: initServices, title: 'Services â€” Nexus Agency', description: 'End-to-end digital solutions: web development, mobile apps, UI/UX design, branding, AI, and more.' },
  '/portfolio': { render: renderPortfolio, init: initPortfolio, title: 'Portfolio â€” Nexus Agency', description: 'Explore our selected projects showcasing expertise in web, mobile, AI, and branding.' },
  '/contact': { render: renderContact, init: initContact, title: 'Contact â€” Nexus Agency', description: 'Get in touch with our team. We respond within 24 hours.' },
  '/faq': { render: renderFAQ, title: 'FAQ â€” Nexus Agency', description: 'Frequently asked questions about our services, pricing, process, and support.' },
  '/start-project': { render: renderStartProject, init: initStartProject, title: 'Start Your Project â€” Nexus Agency', description: 'Tell us about your project and get a free consultation and quote.' },
  '/blog': { render: renderBlog, init: initBlog, title: 'Blog â€” Nexus Agency', description: 'Tips, trends, and insights from our team of digital experts.' },
  '/tracker': { render: renderTracker, init: initTracker, title: 'Project Tracker â€” Nexus Agency', description: 'Track the progress of your project in real-time.' },
  '/consultation': { render: renderConsultation, title: 'Book Consultation â€” Nexus Agency', description: 'Schedule a free consultation to discuss your project needs.' },
  '/reviews': { render: renderReviews, init: initReviews, title: 'Client Reviews â€” Nexus Agency', description: 'Read what our clients say about working with Nexus Agency.' },
  '/estimator': { render: renderEstimator, title: 'Cost Estimator â€” Nexus Agency', description: 'Get an instant cost estimate for your project based on your requirements.' },
  '/auth': { render: renderAuth, init: initAuth, title: 'Sign In / Register â€” Nexus Agency', description: 'Sign in to your Nexus account or create a new one.' },
  '/signin': { render: renderAuth, init: initAuth, title: 'Sign In / Register â€” Nexus Agency', description: 'Sign in to your Nexus account.' },
  '/dashboard': { render: renderDashboard, init: initDashboard, title: 'Dashboard â€” Nexus Agency', protected: true, description: 'Manage your projects, messages, and account.' },
  '/admin/dashboard': { render: renderDashboard, init: initDashboard, title: 'Admin Console â€” Nexus Agency', admin: true, description: 'Admin console for managing the platform.' },
};

export class Router {
  private app: HTMLElement | null;

  constructor() {
    this.app = document.getElementById('app');
  }

  init() {
    // Handle link clicks and internal navigation
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('[data-link]') as HTMLAnchorElement;
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          this.navigate(href);
        }
      }
    });

    // Handle browser history navigation and hash-based fallback
    window.addEventListener('popstate', () => this.render());
    window.addEventListener('hashchange', () => this.render());

    // Initial render
    this.render();
  }

  private getCurrentPath(): string {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      return hash.slice(1).replace(/\/+$/, '') || '/';
    }

    const path = window.location.pathname;
    return path.replace(/\/+$/, '') || '/';
  }

  private normalizePath(path: string): string {
    if (!path) return '/';
    let normalized = path.trim();
    normalized = normalized.replace(/^\./, '');
    normalized = normalized.replace(/\/+$/, '');
    if (!normalized) return '/';
    if (!normalized.startsWith('/')) normalized = '/' + normalized;
    return normalized;
  }

  private navigate(path: string) {
    const normalized = this.normalizePath(path.startsWith('#') ? path.slice(1) : path);
    const currentPath = this.getCurrentPath();
    if (currentPath !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    this.render();
  }

  async render() {
    const path = this.getCurrentPath();
    const route = routes[path] || routes['/'];

    // Route Protection logic
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (route.admin && (!user || user.role !== 'ADMIN')) {
      return this.navigate('/signin');
    }
    if (route.protected && !user) {
      return this.navigate('/signin');
    }

    // Update page title and meta description
    document.title = route.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && route.description) {
      metaDesc.setAttribute('content', route.description);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const normalizedHref = this.normalizePath(href.startsWith('#') ? href.slice(1) : href);
      link.classList.toggle('active', normalizedHref === path);
    });

    // Close mobile menu
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.getElementById('nav-hamburger');
    if (navLinks) navLinks.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');

    // Render page with transition
    if (this.app) {
      this.app.classList.remove('page-enter');
      this.app.innerHTML = route.render();
      // Force reflow
      void this.app.offsetWidth;
      this.app.classList.add('page-enter');
    }

    // Re-init animations
    setTimeout(() => {
      initRevealAnimations();
      animateCounters();
      // Call page-specific init if exists
      if (route.init) route.init();
    }, 50);
  }
}

