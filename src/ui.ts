// ============================================
// NEXUS AGENCY — UI Components
// Premium Edition v2.0
// ============================================

// Custom cursor with state management
export function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  // Hide on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx - 4 + 'px';
    cursor.style.top = my - 4 + 'px';
  });

  function followCursor() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx - 18 + 'px';
    follower.style.top = fy - 18 + 'px';
    requestAnimationFrame(followCursor);
  }
  followCursor();

  // Hover effect on interactive elements
  document.addEventListener('mouseover', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const closest = target.closest('a, button, .glass-card, .service-card, .portfolio-card, .blog-card, input, textarea, select, .radio-option, .checkbox-option, .tab-btn, .calendar-day, .time-slot');
    if (closest) {
      document.body.classList.add('cursor-hover');
    }
    // Text cursor on inputs
    if (target.closest('input, textarea')) {
      document.body.classList.add('cursor-text');
    }
  });
  document.addEventListener('mouseout', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const closest = target.closest('a, button, .glass-card, .service-card, .portfolio-card, .blog-card, input, textarea, select, .radio-option, .checkbox-option, .tab-btn, .calendar-day, .time-slot');
    if (closest) {
      document.body.classList.remove('cursor-hover');
    }
    if (target.closest('input, textarea')) {
      document.body.classList.remove('cursor-text');
    }
  });
}

// Scroll progress with glow
export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const winHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / winHeight) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

// Back to top
export function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Navbar scroll effect
export function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger menu
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Update auth links dynamically
  function updateAuthNav() {
    if (!navLinks) return;
    // Remove any existing auth-link we injected
    const existing = document.getElementById('nav-auth-link');
    if (existing) existing.remove();

    const token = localStorage.getItem('accessToken');
    const authLink = document.createElement('a');
    authLink.id = 'nav-auth-link';
    authLink.className = 'nav-link';
    authLink.setAttribute('data-link', '');

    if (token) {
      authLink.href = '/dashboard';
      authLink.textContent = 'Dashboard';
    } else {
      authLink.href = '/auth';
      authLink.textContent = 'Sign In';
    }

    // Insert before the nav-actions container
    const navActions = navLinks.querySelector('.nav-actions');
    if (navActions) {
      navLinks.insertBefore(authLink, navActions);
    } else {
      navLinks.appendChild(authLink);
    }
  }

  updateAuthNav();
  window.addEventListener('authChange', updateAuthNav);
}

// Magnetic tilt effect for glass cards
export function initMagneticTilt() {
  // Only on desktop
  if ('ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    const cards = document.querySelectorAll<HTMLElement>('.glass-card, .service-card, .portfolio-card, .stat-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < 300) {
        const factor = (300 - distance) / 300;
        const rotateX = (distY / rect.height) * -4 * factor;
        const rotateY = (distX / rect.width) * 4 * factor;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${factor * 3}px)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

// Button ripple effect
export function initButtonRipple() {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('.btn') as HTMLElement;
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// Toast notification helper
export function showToast(message: string, type: string = 'success') {
  let toast = document.getElementById('nexus-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nexus-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast-${type} visible`;
  setTimeout(() => toast.classList.remove('visible'), 3500);
}
(window as any).showToast = showToast;
