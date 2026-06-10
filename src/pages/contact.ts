// ============================================
// NEXUS AGENCY — Contact Page
// Premium Edition v2.0 — Animated map + toast
// ============================================

export function renderContact() {
  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Get in Touch</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Contact <span class="gradient-text">Us</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Have a question or want to start a project? We'd love to hear from you.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="reveal">
            <h2 style="font-size:var(--font-size-2xl);font-weight:800;margin-bottom:var(--space-6);">Send Us a Message</h2>
            <form id="contact-form" onsubmit="handleContactSubmit(event)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
                <div class="form-group">
                  <label class="form-label">Full Name *</label>
                  <input type="text" class="form-input" placeholder="Your name" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" class="form-input" placeholder="your@email.com" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" class="form-input" placeholder="How can we help?" required />
              </div>
              <div class="form-group">
                <label class="form-label">Message *</label>
                <textarea class="form-textarea form-input" placeholder="Tell us about your project..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-large btn-shimmer" style="width:100%;justify-content:center;">
                Send Message
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </div>

          <div class="reveal reveal-delay-2">
            <div class="contact-info-cards">
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">📧</div>
                <div class="contact-info-label">Email</div>
                <div class="contact-info-value">hello@nexus.agency</div>
              </div>
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">📞</div>
                <div class="contact-info-label">Phone</div>
                <div class="contact-info-value">+1 (234) 567-890</div>
              </div>
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">📍</div>
                <div class="contact-info-label">Location</div>
                <div class="contact-info-value">San Francisco, CA</div>
              </div>
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">🕐</div>
                <div class="contact-info-label">Hours</div>
                <div class="contact-info-value">Mon–Fri, 9am–6pm</div>
              </div>
            </div>

            <!-- Animated Map -->
            <div class="contact-map-animated">
              <div class="map-grid"></div>
              <div class="map-pin">
                <div class="map-pin-ring"></div>
                <div class="map-pin-icon">📍</div>
                <div class="map-pin-label">San Francisco, CA</div>
              </div>
            </div>

            <div style="margin-top:var(--space-6);">
              <h4 style="font-size:var(--font-size-sm);font-weight:700;margin-bottom:var(--space-4);">Follow Us</h4>
              <div style="display:flex;gap:var(--space-3);">
                <a href="#" class="social-link" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="Dribbble">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32M8.56 2.75c4.37 6 6.56 12.3 7.1 19.36"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

window.handleContactSubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea');
  
  const name = inputs[0].value;
  const email = inputs[1].value;
  const subject = inputs[2].value;
  const message = inputs[3].value;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span style="animation:spin 1s linear infinite;display:inline-block;">⏳</span> Sending...';
  submitBtn.disabled = true;

  try {
    const res = await fetch('http://localhost:5000/api/v1/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
    if (!res.ok) throw new Error();

    form.innerHTML = `
      <div style="text-align:center;padding:var(--space-12) 0;">
        <div style="font-size:4rem;margin-bottom:var(--space-4);animation:bounceIn 0.6s ease;">✅</div>
        <h3 style="font-size:var(--font-size-xl);margin-bottom:var(--space-3);">Message Sent!</h3>
        <p style="color:var(--text-secondary);">Thank you, ${name}. We'll get back to you within 24 hours.</p>
      </div>
    `;
    if (window.showToast) window.showToast('Message sent successfully! 🎉');
  } catch (err) {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    if (window.showToast) window.showToast('Failed to send. Please try again.', 'error');
  }
};

export function initContact() {}
