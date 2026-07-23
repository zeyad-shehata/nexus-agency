// ============================================
// NEXUS AGENCY â€ Cost Estimator
// ============================================

export function renderEstimator() {
  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">âœ¦ Cost Estimator</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Project <span class="gradient-text">Estimator</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Get an instant estimate for your project based on your requirements.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width:800px;">
        <div class="glass-card reveal" style="padding:var(--space-10);">
          <!-- Project Type -->
          <div style="margin-bottom:var(--space-8);">
            <h3 style="font-weight:700;margin-bottom:var(--space-4);">1. Project Type</h3>
            <div class="radio-group" id="est-type">
              ${[
                { label: 'Landing Page', value: 1500 },
                { label: 'Business Website', value: 3000 },
                { label: 'E-Commerce Store', value: 5000 },
                { label: 'Web Application', value: 8000 },
                { label: 'Mobile App', value: 10000 },
                { label: 'Full Platform', value: 20000 },
              ].map((t, i) => `
                <div class="radio-option ${i === 0 ? 'selected' : ''}" data-value="${t.value}" onclick="selectEstOption(this, 'est-type')">
                  <div class="radio-dot"></div>
                  <span>${t.label}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Features -->
          <div style="margin-bottom:var(--space-8);">
            <h3 style="font-weight:700;margin-bottom:var(--space-4);">2. Additional Features</h3>
            <div class="radio-group" id="est-features" style="grid-template-columns:1fr;">
              ${[
                { label: 'User Authentication', value: 500 },
                { label: 'Payment Integration', value: 800 },
                { label: 'Admin Dashboard', value: 1500 },
                { label: 'Chat / Messaging', value: 1000 },
                { label: 'AI / ML Integration', value: 3000 },
                { label: 'API Development', value: 1200 },
                { label: 'Multi-language Support', value: 600 },
                { label: 'Analytics Dashboard', value: 800 },
              ].map(f => `
                <div class="radio-option" data-value="${f.value}" onclick="toggleEstFeature(this)" style="cursor:pointer;">
                  <div style="width:18px;height:18px;border-radius:4px;border:2px solid var(--text-muted);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;transition:all 0.2s;" class="est-check"></div>
                  <span>${f.label}</span>
                  <span style="margin-left:auto;color:var(--text-tertiary);font-size:var(--font-size-sm);">+$${f.value.toLocaleString()}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Timeline -->
          <div style="margin-bottom:var(--space-8);">
            <h3 style="font-weight:700;margin-bottom:var(--space-4);">3. Timeline</h3>
            <div class="radio-group" id="est-timeline">
              ${[
                { label: 'Rush (1-2 weeks)', multiplier: 1.5 },
                { label: 'Standard (1-2 months)', multiplier: 1 },
                { label: 'Relaxed (3+ months)', multiplier: 0.9 },
              ].map((t, i) => `
                <div class="radio-option ${i === 1 ? 'selected' : ''}" data-multiplier="${t.multiplier}" onclick="selectEstOption(this, 'est-timeline')">
                  <div class="radio-dot"></div>
                  <span>${t.label}</span>
                  ${t.multiplier !== 1 ? `<span style="margin-left:auto;font-size:var(--font-size-xs);color:${t.multiplier > 1 ? 'var(--accent-tertiary)' : 'var(--accent-secondary)'};">${t.multiplier > 1 ? '+50%' : '-10%'}</span>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Design -->
          <div style="margin-bottom:var(--space-10);">
            <h3 style="font-weight:700;margin-bottom:var(--space-4);">4. Design Level</h3>
            <div class="radio-group" id="est-design">
              ${[
                { label: 'Standard Design', value: 0 },
                { label: 'Premium Design', value: 2000 },
                { label: 'Ultra-Premium / Custom', value: 5000 },
              ].map((d, i) => `
                <div class="radio-option ${i === 0 ? 'selected' : ''}" data-value="${d.value}" onclick="selectEstOption(this, 'est-design')">
                  <div class="radio-dot"></div>
                  <span>${d.label}</span>
                  ${d.value > 0 ? `<span style="margin-left:auto;color:var(--text-tertiary);font-size:var(--font-size-sm);">+$${d.value.toLocaleString()}</span>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Result -->
          <div style="text-align:center;padding:var(--space-8);background:rgba(var(--accent-primary-rgb),0.05);border-radius:var(--radius-xl);border:1px solid rgba(var(--accent-primary-rgb),0.15);">
            <div style="font-size:var(--font-size-sm);color:var(--text-tertiary);margin-bottom:var(--space-2);">Estimated Project Cost</div>
            <div id="estimate-result" style="font-size:var(--font-size-4xl);font-weight:900;" class="gradient-text">$1,500</div>
            <div style="font-size:var(--font-size-xs);color:var(--text-muted);margin-top:var(--space-2);">This is an estimate. Final pricing may vary.</div>
          </div>

          <div style="text-align:center;margin-top:var(--space-8);">
            <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>Start Your Project â†</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

(window as any).selectEstOption = function(el: HTMLElement, groupId: string) {
  document.querySelectorAll(`#${groupId} .radio-option`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  updateEstimate();
};

(window as any).toggleEstFeature = function(el: HTMLElement) {
  el.classList.toggle('selected');
  const check = el.querySelector('.est-check') as HTMLElement;
  if (!check) return;
  if (el.classList.contains('selected')) {
    check.textContent = 'âœ';
    check.style.borderColor = 'var(--accent-primary)';
    check.style.background = 'var(--accent-primary)';
    check.style.color = 'white';
  } else {
    check.textContent = '';
    check.style.borderColor = 'var(--text-muted)';
    check.style.background = 'transparent';
  }
  updateEstimate();
};

function updateEstimate() {
  let total = 0;

  // Base type
  const typeEl = document.querySelector<HTMLElement>('#est-type .radio-option.selected');
  if (typeEl) total += parseInt(typeEl.dataset.value || '0');

  // Features
  document.querySelectorAll<HTMLElement>('#est-features .radio-option.selected').forEach(f => {
    total += parseInt(f.dataset.value || '0');
  });

  // Design
  const designEl = document.querySelector<HTMLElement>('#est-design .radio-option.selected');
  if (designEl) total += parseInt(designEl.dataset.value || '0');

  // Timeline multiplier
  const timeEl = document.querySelector<HTMLElement>('#est-timeline .radio-option.selected');
  if (timeEl) total = Math.round(total * parseFloat(timeEl.dataset.multiplier || '1'));

  const result = document.getElementById('estimate-result');
  if (result) result.textContent = '$' + total.toLocaleString();
}

