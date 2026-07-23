// ============================================
// NEXUS AGENCY  Project Tracker
// ============================================

export function renderTracker() {
  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">? Track Your Project</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Project <span class="gradient-text">Tracker</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Enter your project ID or email to check the current status of your project.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tracker-form reveal">
          <div class="tracker-input-group">
            <input type="text" class="form-input" id="tracker-input" placeholder="Enter Project ID or Email" />
            <button class="btn btn-primary" onclick="trackProject()">Track ?</button>
          </div>
        </div>

        <div id="tracker-result" style="display:none;">
          <div class="glass-card reveal" style="max-width:700px;margin:0 auto;padding:var(--space-10);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-8);">
              <div>
                <h3 style="font-size:var(--font-size-xl);font-weight:700;">E-Commerce Platform</h3>
                <span style="color:var(--text-tertiary);font-size:var(--font-size-sm);">Project ID: NX-2026-0042</span>
              </div>
              <span class="badge-green badge" style="font-size:var(--font-size-sm);">In Progress</span>
            </div>

            <div class="timeline-tracker">
              <div class="timeline-line"></div>

              ${[
                { title: 'Pending', date: 'May 15, 2026', status: 'completed' },
                { title: 'Under Review', date: 'May 16, 2026', status: 'completed' },
                { title: 'Planning', date: 'May 18, 2026', status: 'completed' },
                { title: 'Designing', date: 'May 25, 2026', status: 'completed' },
                { title: 'Development', date: 'Jun 2, 2026', status: 'active' },
                { title: 'Testing', date: 'Estimated: Jun 15', status: '' },
                { title: 'Completed', date: 'Estimated: Jun 20', status: '' },
              ].map((step, i) => `
                <div class="timeline-step ${step.status}">
                  <div class="timeline-dot">
                    ${step.status === 'completed' ? '?' : step.status === 'active' ? '◆' : (i + 1)}
                  </div>
                  <div class="timeline-content">
                    <div class="timeline-title">${step.title}</div>
                    <div class="timeline-date">${step.date}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

(window as any).trackProject = async function() {
  const input = document.getElementById('tracker-input') as HTMLInputElement;
  const result = document.getElementById('tracker-result');
  if (!input || !input.value.trim()) return;

  const projectId = input.value.trim();
  const token = localStorage.getItem('accessToken');
  if (!token) {
    alert('Please sign in to track your project.');
    return;
  }

  try {
    const { apiFetch } = await import('../utils/api');
    const res = await apiFetch(`/projects/${projectId}`);
    const p = await res.json();
    if (!res.ok) throw new Error(p.error || 'Project not found.');

    const statuses = ['PENDING', 'UNDER_REVIEW', 'PLANNING', 'DESIGNING', 'DEVELOPMENT', 'TESTING', 'COMPLETED'];
    const currentStatusIndex = statuses.indexOf(p.status || 'PENDING');

    const statusDisplayNames = {
      PENDING: 'Pending',
      UNDER_REVIEW: 'Under Review',
      PLANNING: 'Planning',
      DESIGNING: 'Designing',
      DEVELOPMENT: 'Development',
      TESTING: 'Testing',
      COMPLETED: 'Completed'
    };

    result.innerHTML = `
      <div class="glass-card reveal" style="max-width:700px;margin:0 auto;padding:var(--space-10);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-8);">
          <div>
            <h3 style="font-size:var(--font-size-xl);font-weight:700;">${p.title}</h3>
            <span style="color:var(--text-tertiary);font-size:var(--font-size-sm);">Project ID: ${p.id}</span>
          </div>
          <span class="badge-green badge" style="font-size:var(--font-size-sm);">${statusDisplayNames[p.status] || p.status}</span>
        </div>

        <div class="timeline-tracker">
          <div class="timeline-line"></div>

          ${statuses.map((step, i) => {
            let stepStatus = '';
            if (i < currentStatusIndex) stepStatus = 'completed';
            else if (i === currentStatusIndex) stepStatus = 'active';

            const stepLabel = statusDisplayNames[step];
            const dateStr = i < currentStatusIndex ? 'Completed' : (i === currentStatusIndex ? 'In Progress' : 'Pending Stage');

            return `
              <div class="timeline-step ${stepStatus}">
                <div class="timeline-dot">
                  ${stepStatus === 'completed' ? '?' : stepStatus === 'active' ? '◆' : (i + 1)}
                </div>
                <div class="timeline-content">
                  <div class="timeline-title">${stepLabel}</div>
                  <div class="timeline-date">${dateStr}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    alert(`Tracking search failed: ${err.message}`);
  }
};

export function initTracker() {}
