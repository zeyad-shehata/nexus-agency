// ============================================
// NEXUS AGENCY — Book Consultation
// ============================================

export function renderConsultation() {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, today.getMonth(), 1).getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let calendarDays = dayNames.map(d => `<div class="calendar-day calendar-day-header">${d}</div>`).join('');
  for (let i = 0; i < firstDay; i++) calendarDays += '<div class="calendar-day disabled"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const isPast = d < today.getDate();
    const isToday = d === today.getDate();
    calendarDays += `<div class="calendar-day ${isPast ? 'disabled' : ''} ${isToday ? 'selected' : ''}" onclick="selectDay(this, ${d})">${d}</div>`;
  }

  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Book a Consultation</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Let's <span class="gradient-text">Talk</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Schedule a free consultation to discuss your project.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width:900px;">
        <!-- Meeting Type -->
        <div class="reveal" style="margin-bottom:var(--space-12);">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">Choose Meeting Type</h2>
          <div class="meeting-type-cards">
            ${[
              { icon: '🎥', name: 'Zoom Call', desc: 'Video call via Zoom' },
              { icon: '📹', name: 'Google Meet', desc: 'Video call via Google Meet' },
              { icon: '📞', name: 'Phone Call', desc: 'Traditional phone call' },
            ].map((m, i) => `
              <div class="glass-card meeting-type-card ${i === 0 ? 'selected' : ''}" onclick="selectMeetingType(this)">
                <div class="meeting-type-icon">${m.icon}</div>
                <h3 style="font-weight:700;margin-bottom:var(--space-1);">${m.name}</h3>
                <p style="font-size:var(--font-size-sm);color:var(--text-secondary);">${m.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Calendar -->
        <div class="reveal" style="margin-bottom:var(--space-12);">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">${month} ${year}</h2>
          <div class="glass-card" style="max-width:500px;margin:0 auto;">
            <div class="calendar-grid">${calendarDays}</div>
          </div>
        </div>

        <!-- Time Slots -->
        <div class="reveal" style="margin-bottom:var(--space-12);">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">Available Times</h2>
          <div class="time-slots" style="max-width:500px;margin:0 auto;">
            ${['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((t, i) => `
              <div class="time-slot ${i === 2 ? 'selected' : ''}" onclick="selectTimeSlot(this)">${t}</div>
            `).join('')}
          </div>
        </div>

        <!-- Contact Info -->
        <div class="reveal" style="max-width:500px;margin:0 auto;">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">Your Details</h2>
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-input" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label class="form-label">Email *</label>
            <input type="email" class="form-input" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label class="form-label">What would you like to discuss?</label>
            <textarea class="form-textarea form-input" placeholder="Brief description..." style="min-height:80px;"></textarea>
          </div>
          <button class="btn btn-primary btn-large btn-shimmer" style="width:100%;justify-content:center;" onclick="bookConsultation()">
            Book Consultation →
          </button>
        </div>

        <div id="booking-success" style="display:none;text-align:center;padding:var(--space-16) 0;">
          <div style="font-size:5rem;margin-bottom:var(--space-4);">📅</div>
          <h2 style="font-size:var(--font-size-2xl);font-weight:800;margin-bottom:var(--space-3);">Booked!</h2>
          <p style="color:var(--text-secondary);">You'll receive a confirmation email with meeting details shortly.</p>
        </div>
      </div>
    </section>
  `;
}

window.selectDay = function(el, day) {
  document.querySelectorAll('.calendar-day:not(.calendar-day-header):not(.disabled)').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
};

window.selectTimeSlot = function(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
};

window.selectMeetingType = function(el) {
  document.querySelectorAll('.meeting-type-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
};

window.bookConsultation = function() {
  document.getElementById('booking-success').style.display = 'block';
  document.getElementById('booking-success').scrollIntoView({ behavior: 'smooth' });
};
