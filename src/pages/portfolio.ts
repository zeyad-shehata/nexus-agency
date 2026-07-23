// ============================================
// NEXUS AGENCY â€ Portfolio Page
// Premium Edition v2.0 â€ with Lightbox
// ============================================

const projectsData = [
  { title: 'Quantum Finance', cat: 'Web App', desc: 'A cutting-edge fintech platform with real-time analytics, AI-powered insights, and seamless payment processing.', tech: ['React', 'Node.js', 'AWS'], icon: 'ðŸ¦', metrics: '340% conversion increase', color: '#7c5cfc', client: 'FinEdge Capital', duration: '3 months', challenge: 'Building a real-time trading dashboard that handles 10K+ concurrent users with sub-second latency.' },
  { title: 'Verdant Health', cat: 'Mobile', desc: 'A comprehensive health and wellness app with AI-driven personalized recommendations and telemedicine.', tech: ['Flutter', 'Firebase', 'TensorFlow'], icon: 'ðŸ¥', metrics: '500K+ downloads', color: '#00d4aa', client: 'Verdant Health Inc.', duration: '4 months', challenge: 'Integrating HIPAA-compliant video calls with AI-powered health assessments.' },
  { title: 'Luxe Fashion', cat: 'E-Commerce', desc: 'Premium fashion e-commerce with AR try-on, personalized styling, and global shipping integration.', tech: ['Next.js', 'Stripe', 'Sanity'], icon: 'ðŸ', metrics: '250% revenue growth', color: '#ff6b9d', client: 'Luxe Retail Group', duration: '2.5 months', challenge: 'Creating a seamless AR try-on experience that works across all mobile browsers.' },
  { title: 'Neural Analytics', cat: 'AI', desc: 'An intelligent data analytics dashboard with predictive modeling and natural language querying.', tech: ['Python', 'React', 'TensorFlow'], icon: 'ðŸ§ ', metrics: '20hrs/week saved', color: '#ffa94d', client: 'NeuralWave AI', duration: '5 months', challenge: 'Training custom ML models on proprietary data while maintaining enterprise-grade security.' },
  { title: 'Bloom Beauty', cat: 'Branding', desc: 'Complete brand identity redesign for a luxury beauty brand including logo, packaging, and digital presence.', tech: ['Figma', 'Illustrator', 'After Effects'], icon: 'ðŸŒ¸', metrics: '180% brand awareness', color: '#e879f9', client: 'Bloom Beauty Co.', duration: '6 weeks', challenge: 'Maintaining brand heritage while creating a modern, Gen-Z appealing identity.' },
  { title: 'CloudSync Pro', cat: 'Web App', desc: 'Enterprise cloud management platform with automated deployment, monitoring, and cost optimization.', tech: ['Vue.js', 'Go', 'Kubernetes'], icon: 'â˜ï¸', metrics: '60% cost reduction', color: '#38bdf8', client: 'CloudSync Inc.', duration: '4 months', challenge: 'Building a multi-cloud orchestration layer that supports AWS, GCP, and Azure.' },
  { title: 'FoodieHub', cat: 'Mobile', desc: 'Food delivery app with real-time tracking, AI-based recommendations, and social dining features.', tech: ['React Native', 'Node.js', 'MongoDB'], icon: 'ðŸ•', metrics: '1M+ orders/month', color: '#fb923c', client: 'FoodieHub Inc.', duration: '3.5 months', challenge: 'Implementing real-time GPS tracking with live route optimization for drivers.' },
  { title: 'EcoMarket', cat: 'E-Commerce', desc: 'Sustainable marketplace connecting eco-friendly brands with conscious consumers worldwide.', tech: ['Shopify', 'Next.js', 'GraphQL'], icon: 'ðŸŒ¿', metrics: '400% growth in 6mo', color: '#4ade80', client: 'EcoMarket LLC', duration: '2 months', challenge: 'Building a carbon footprint calculator integrated into the checkout process.' },
  { title: 'PixelForge Studio', cat: 'Branding', desc: 'Creative agency rebrand with a bold, modern identity system across all touchpoints.', tech: ['Figma', 'Cinema 4D', 'Photoshop'], icon: 'ðŸŽ¨', metrics: '2x client inquiries', color: '#a78bfa', client: 'PixelForge Studio', duration: '4 weeks', challenge: 'Designing a flexible identity system that works across 50+ brand touchpoints.' },
];

function renderPortfolioItem(p, i) {
  const cat = p.category || p.cat || 'Web App';
  const descText = p.description || p.desc;
  const tech = p.technologies || p.tech || ['React', 'Next.js'];
  const metricsText = p.metrics || 'Successful Deployment';
  const iconText = p.icon || 'âœ¦';
  const colorText = p.color || '#7c5cfc';
  const coverImg = p.coverImage || '';

  const visualHtml = coverImg 
    ? `<img src="${coverImg}" style="width:100%; height:${180 + (i % 3) * 40}px; object-fit:cover;" />`
    : `<div style="height:${180 + (i % 3) * 40}px;background:linear-gradient(135deg, ${colorText}22, ${colorText}11);display:flex;align-items:center;justify-content:center;font-size:4rem;transition:transform 0.5s;">${iconText}</div>`;

  return `
    <div class="masonry-item reveal reveal-delay-${(i % 3) + 1}" data-category="${cat}" onclick="openProjectLightbox(${i})" style="cursor:pointer;">
      <div class="glass-card" style="padding:0;overflow:hidden;">
        ${visualHtml}
        <div style="padding:var(--space-6);">
          <div class="portfolio-category">${cat}</div>
          <h3 style="font-size:var(--font-size-md);font-weight:700;margin-bottom:var(--space-2);">${p.title || ''}</h3>
          <p style="font-size:var(--font-size-sm);color:var(--text-secondary);line-height:var(--line-height-relaxed);margin-bottom:var(--space-4);">${descText}</p>
          <div class="portfolio-tech" style="margin-bottom:var(--space-3);">
            ${tech.map(t => `<span class="badge">${t}</span>`).join('')}
          </div>
          <div class="badge-green badge">${metricsText}</div>
        </div>
      </div>
    </div>
  `;
}

export function renderPortfolio() {
  const categories = ['All', 'Web App', 'Mobile', 'E-Commerce', 'Branding', 'AI'];

  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">âœ¦ Our Work</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Our <span class="gradient-text">Portfolio</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Explore our selected projects and see how we bring ideas to life.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tabs reveal" id="portfolio-tabs">
          ${categories.map((c, i) => `
            <button class="tab-btn ${i === 0 ? 'active' : ''}" onclick="filterPortfolio('${c}')">${c}</button>
          `).join('')}
        </div>

        <div class="masonry-grid" id="portfolio-masonry">
          ${projectsData.map((p, i) => renderPortfolioItem(p, i)).join('')}
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div class="lightbox-overlay" id="portfolio-lightbox" onclick="if(event.target===this)closeProjectLightbox()">
      <div class="lightbox-content" id="lightbox-body"></div>
    </div>
  `;
}

export async function initPortfolio() {
  const container = document.getElementById('portfolio-masonry');
  if (!container) return;

  try {
    const { apiFetch } = await import('../utils/api');
    const res = await apiFetch('/portfolio');
    const dbProjects = await res.json();
    if (res.ok && dbProjects.length > 0) {
      container.innerHTML = dbProjects.map((p, i) => renderPortfolioItem(p, i)).join('');
    }
  } catch (e) {
    console.warn('âš ï¸ Could not fetch portfolio from API, falling back to static mock data.', e);
  }
}

// Lightbox
(window as any).openProjectLightbox = function(index: number) {
  const p = projectsData[index];
  if (!p) return;
  const lb = document.getElementById('portfolio-lightbox');
  const body = document.getElementById('lightbox-body');
  if (!lb || !body) return;

  body.innerHTML = `
    <button class="lightbox-close" onclick="closeProjectLightbox()">âœ•</button>
    <div class="lightbox-visual" style="background:linear-gradient(135deg, ${p.color}33, ${p.color}11);">
      <span style="font-size:6rem;">${p.icon}</span>
    </div>
    <div class="lightbox-header">
      <div class="portfolio-category" style="margin-bottom:var(--space-2);">${p.cat}</div>
      <h2 style="font-size:var(--font-size-2xl);font-weight:800;margin-bottom:var(--space-3);">${p.title}</h2>
      <p style="color:var(--text-secondary);line-height:var(--line-height-relaxed);">${p.desc}</p>
    </div>
    <div class="lightbox-tech">
      ${p.tech.map(t => `<span class="badge">${t}</span>`).join('')}
    </div>
    <div class="lightbox-stats">
      <div class="lightbox-stat">
        <div class="lightbox-stat-value gradient-text">${p.metrics}</div>
        <div class="lightbox-stat-label">Key Result</div>
      </div>
      <div class="lightbox-stat">
        <div class="lightbox-stat-value" style="color:var(--accent-secondary);">${p.duration || '3 months'}</div>
        <div class="lightbox-stat-label">Duration</div>
      </div>
      <div class="lightbox-stat">
        <div class="lightbox-stat-value" style="color:var(--accent-warm);">${p.client || 'Enterprise'}</div>
        <div class="lightbox-stat-label">Client</div>
      </div>
    </div>
    ${p.challenge ? `
      <div style="padding:var(--space-6);background:var(--bg-glass);border:1px solid var(--bg-glass-border);border-radius:var(--radius-lg);margin-bottom:var(--space-6);">
        <h4 style="font-weight:700;margin-bottom:var(--space-2);font-size:var(--font-size-sm);">ðŸ¡ The Challenge</h4>
        <p style="color:var(--text-secondary);font-size:var(--font-size-sm);line-height:var(--line-height-relaxed);">${p.challenge}</p>
      </div>
    ` : ''}
    <div style="text-align:center;">
      <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>Start a Similar Project â†</a>
    </div>
  `;

  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
};

(window as any).closeProjectLightbox = function() {
  const lb = document.getElementById('portfolio-lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
};

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') (window as any).closeProjectLightbox();
});

// Portfolio filter
(window as any).filterPortfolio = function(category: string) {
  const items = document.querySelectorAll<HTMLElement>('.masonry-item');
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(b => b.classList.toggle('active', b.textContent === category));
  items.forEach(item => {
    const show = category === 'All' || item.dataset.category === category;
    item.style.display = show ? '' : 'none';
    if (show) {
      item.style.animation = 'scaleIn 0.4s ease forwards';
    }
  });
};

