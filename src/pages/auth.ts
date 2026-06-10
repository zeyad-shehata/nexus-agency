// ============================================
// NEXUS AGENCY — Authentication (Login/Register)
// ============================================

import { apiFetch } from '../utils/api';
import { showAlert } from '../components/ui/Alert';

export function renderAuth() {
  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Access Portal</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Client <span class="gradient-text">Portal</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Sign in to track projects, manage deliverables, and chat with your team.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 500px;">
        <div class="glass-card reveal" style="padding: var(--space-8);">
          <div class="tabs" style="margin-bottom: var(--space-6);">
            <button class="tab-btn active" id="tab-login" data-auth-tab="login">Sign In</button>
            <button class="tab-btn" id="tab-register" data-auth-tab="register">Register</button>
          </div>

          <!-- Alert Container -->
          <div id="auth-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--font-size-sm);"></div>

          <!-- Login Form -->
          <form id="login-form">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="login-email" class="form-input" placeholder="you@example.com" required />
            </div>
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-1);">
                <label class="form-label" style="margin: 0;">Password</label>
                <a href="#" class="gradient-text" style="font-size: var(--font-size-xs);" id="forgot-password-link">Forgot Password?</a>
              </div>
              <input type="password" id="login-password" class="form-input" placeholder="••••••••" required />
            </div>
            <div class="form-group" style="display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-3);">
              <input type="checkbox" id="login-remember" />
              <label for="login-remember" style="font-size: var(--font-size-sm); color: var(--text-secondary); cursor: pointer;">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary btn-large btn-shimmer" style="width: 100%; justify-content: center; margin-top: var(--space-4);">
              Sign In →
            </button>
          </form>

          <!-- Register Form -->
          <form id="register-form" style="display: none;">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" id="register-name" class="form-input" placeholder="John Doe" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input type="email" id="register-email" class="form-input" placeholder="john@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" id="register-phone" class="form-input" placeholder="+1 (555) 019-2834" />
            </div>
            <div class="form-group">
              <label class="form-label">Password * (Min 8 chars, with uppercase, lowercase & number)</label>
              <input type="password" id="register-password" class="form-input" placeholder="••••••••" required minlength="8" />
            </div>
            <button type="submit" class="btn btn-primary btn-large btn-shimmer" style="width: 100%; justify-content: center; margin-top: var(--space-4);">
              Create Account →
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Forgot Password Modal -->
    <div id="forgot-password-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: var(--z-modal); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
      <div class="glass-card" style="width: 90%; max-width: 400px; padding: var(--space-8); position: relative;">
        <button id="forgot-modal-close" style="position: absolute; top: var(--space-4); right: var(--space-4); background: none; border: none; color: var(--text-secondary); font-size: var(--font-size-lg); cursor: pointer;">✕</button>
        <h3 style="font-size: var(--font-size-xl); font-weight: 800; margin-bottom: var(--space-2);">Reset Password</h3>
        <p style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-6);">Enter your email address and we'll send you a password reset link.</p>
        
        <div id="forgot-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--font-size-sm);"></div>
        
        <form id="forgot-form">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="forgot-email" class="form-input" placeholder="you@example.com" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: var(--space-2);">Send Reset Link</button>
        </form>
      </div>
    </div>

    <!-- Reset Password Modal (Triggered if ?token= is in URL) -->
    <div id="reset-password-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: var(--z-modal); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
      <div class="glass-card" style="width: 90%; max-width: 400px; padding: var(--space-8); position: relative;">
        <h3 style="font-size: var(--font-size-xl); font-weight: 800; margin-bottom: var(--space-2);">Set New Password</h3>
        <p style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-6);">Create a secure new password for your account.</p>
        
        <div id="reset-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--font-size-sm);"></div>
        
        <form id="reset-form">
          <div class="form-group">
            <label class="form-label">New Password * (Min 8 chars)</label>
            <input type="password" id="reset-password-input" class="form-input" placeholder="••••••••" required minlength="8" />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: var(--space-2);">Update Password</button>
        </form>
      </div>
    </div>
  `;
}

export function initAuth() {
  // Check if reset password token is in query params
  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get('token');
  const mode = urlParams.get('mode'); // verify-email or reset-password

  if (resetToken) {
    if (mode === 'verify') {
      verifyEmail(resetToken);
    } else {
      setTimeout(() => {
        showResetPasswordModal(resetToken);
      }, 100);
    }
  }

  // Tab switching via event delegation
  document.querySelectorAll('[data-auth-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchAuthTab(btn.getAttribute('data-auth-tab'));
    });
  });

  // Forgot password link
  const forgotLink = document.getElementById('forgot-password-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showForgotPasswordModal();
    });
  }

  // Forgot modal close
  const forgotClose = document.getElementById('forgot-modal-close');
  if (forgotClose) {
    forgotClose.addEventListener('click', closeForgotPasswordModal);
  }

  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  // Register form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterSubmit);
  }

  // Forgot password form
  const forgotForm = document.getElementById('forgot-form');
  if (forgotForm) {
    forgotForm.addEventListener('submit', handleForgotPasswordSubmit);
  }

  // Reset password form
  const resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', handleResetPasswordSubmit);
  }
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const alert = document.getElementById('auth-alert');
  if (alert) alert.style.display = 'none';

  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    tabLogin.classList.remove('active');
    tabRegister.classList.add('active');
  }
}

function showForgotPasswordModal() {
  const modal = document.getElementById('forgot-password-modal');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';
  }, 10);
}

function closeForgotPasswordModal() {
  const modal = document.getElementById('forgot-password-modal');
  modal.style.opacity = '0';
  modal.style.pointerEvents = 'none';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function showResetPasswordModal(token) {
  const modal = document.getElementById('reset-password-modal');
  modal.style.display = 'flex';
  modal.dataset.token = token;
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';
  }, 10);
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const email = (document.getElementById('login-email') as HTMLInputElement).value;
  const password = (document.getElementById('login-password') as HTMLInputElement).value;
  const rememberMe = (document.getElementById('login-remember') as HTMLInputElement).checked;
  const alert = document.getElementById('auth-alert');

  try {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, rememberMe })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || data.message || 'Authentication failed');

    // Use the correct token keys from the API response
    const accessToken = data.accessToken || data.token;
    const refreshToken = data.refreshToken;

    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    showAlert(alert, 'success', 'Login successful! Redirecting...');
    setTimeout(() => {
      const redirectPath = data.user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
      window.history.pushState({}, '', redirectPath);
      // Dispatch navigation update
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.dispatchEvent(new Event('authChange'));
    }, 1000);
  } catch (err) {
    showAlert(alert, 'error', err.message);
  }
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = (document.getElementById('register-name') as HTMLInputElement).value;
  const email = (document.getElementById('register-email') as HTMLInputElement).value;
  const phone = (document.getElementById('register-phone') as HTMLInputElement).value;
  const password = (document.getElementById('register-password') as HTMLInputElement).value;
  const alert = document.getElementById('auth-alert');

  try {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, password })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || data.message || 'Registration failed');

    showAlert(alert, 'success', 'Account created successfully! Check your email for verification. You can sign in now.');
    setTimeout(() => {
      switchAuthTab('login');
    }, 3000);
  } catch (err) {
    showAlert(alert, 'error', err.message);
  }
}

async function handleForgotPasswordSubmit(e) {
  e.preventDefault();
  const email = (document.getElementById('forgot-email') as HTMLInputElement).value;
  const alert = document.getElementById('forgot-alert');

  try {
    const res = await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || data.message || 'Failed to send reset link.');

    showAlert(alert, 'success', 'Password reset email sent. Please check your inbox.');
    e.target.reset();
  } catch (err) {
    showAlert(alert, 'error', err.message);
  }
}

async function handleResetPasswordSubmit(e) {
  e.preventDefault();
  const password = (document.getElementById('reset-password-input') as HTMLInputElement).value;
  const modal = document.getElementById('reset-password-modal');
  const token = modal.dataset.token;
  const alert = document.getElementById('reset-alert');

  try {
    const res = await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || data.message || 'Failed to reset password.');

    showAlert(alert, 'success', 'Password reset successful! Redirecting to sign in...');
    setTimeout(() => {
      modal.style.opacity = '0';
      modal.style.pointerEvents = 'none';
      setTimeout(() => {
        modal.style.display = 'none';
        switchAuthTab('login');
      }, 300);
    }, 2000);
  } catch (err) {
    showAlert(alert, 'error', err.message);
  }
}

async function verifyEmail(token) {
  const alert = document.getElementById('auth-alert');
  try {
    const res = await apiFetch(`/auth/verify-email?token=${token}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || 'Verification failed.');

    showAlert(alert, 'success', 'Email verified successfully! You can now log in.');
  } catch (err) {
    showAlert(alert, 'error', `Email verification failed: ${err.message}`);
  }
}

