// ============================================
// NEXUS AGENCY — Blog Page
// Premium Edition v2.0 — Featured post + enhanced cards
// ============================================

const blogPosts = [
  { title: '10 Web Design Trends Dominating 2026', cat: 'Web Design', excerpt: 'Explore the cutting-edge design trends that are shaping the digital landscape this year, from AI-driven interfaces to immersive 3D experiences.', date: 'Jun 5, 2026', read: '8 min', icon: '🎨' },
  { title: 'Why Your Brand Needs a Design System', cat: 'Branding', excerpt: 'A design system is more than a style guide — it\'s the foundation for scalable, consistent, and efficient product development.', date: 'Jun 2, 2026', read: '6 min', icon: '💼' },
  { title: 'SEO in 2026: What Actually Works', cat: 'SEO', excerpt: 'With AI-powered search reshaping the landscape, here are the strategies that still drive organic traffic and sustainable growth.', date: 'May 28, 2026', read: '10 min', icon: '📈' },
  { title: 'Building Accessible Web Applications', cat: 'Technology', excerpt: 'Accessibility isn\'t optional — it\'s essential. Learn how to build inclusive digital products that work for everyone.', date: 'May 22, 2026', read: '7 min', icon: '♿' },
  { title: 'The ROI of Premium UX Design', cat: 'Business Tips', excerpt: 'Investment in UX design delivers measurable returns. Here\'s how to calculate and maximize your design ROI.', date: 'May 18, 2026', read: '5 min', icon: '💰' },
  { title: 'AI-Powered Marketing: A Complete Guide', cat: 'Marketing', excerpt: 'From predictive analytics to automated content creation — how AI is revolutionizing digital marketing strategies.', date: 'May 12, 2026', read: '12 min', icon: '🤖' },
  { title: 'Micro-Animations That Boost Engagement', cat: 'Web Design', excerpt: 'Subtle animations can dramatically improve user experience. Learn the principles behind effective micro-interactions.', date: 'May 8, 2026', read: '6 min', icon: '✨' },
  { title: 'Choosing the Right Tech Stack in 2026', cat: 'Technology', excerpt: 'React vs Vue vs Svelte? Node.js vs Go? Navigate the complex landscape of modern web development technologies.', date: 'May 3, 2026', read: '9 min', icon: '⚙️' },
  { title: 'E-Commerce Conversion Optimization', cat: 'Marketing', excerpt: 'Proven strategies to turn more visitors into customers, from checkout optimization to personalized experiences.', date: 'Apr 28, 2026', read: '8 min', icon: '🛒' },
];

function renderBlogPost(p, i) {
  const cat = p.category || p.cat || 'Technology';
  const excerptText = p.excerpt || (p.content ? p.content.slice(0, 120) + '...' : '');
  const dateStr = p.date || new Date(p.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const readTime = p.read || '5 min';
  const icon = p.icon || '📝';
  const coverImg = p.coverImage || '';

  const visualHtml = coverImg 
    ? `<img src="${coverImg}" style="width:100%; height:200px; object-fit:cover; border-top-left-radius:var(--radius-md); border-top-right-radius:var(--radius-md);" />`
    : `<div class="blog-card-image-placeholder">${icon}</div>`;

  return `
    <div class="blog-card reveal reveal-delay-${(i % 3) + 1}" data-category="${cat}">
      ${visualHtml}
      <div class="blog-card-body">
        <div class="blog-card-category">${cat}</div>
        <h3 class="blog-card-title">${p.title}</h3>
        <p class="blog-card-excerpt">${excerptText}</p>
        <div class="blog-card-meta">
          <span>📅 ${dateStr}</span>
          <span>⏱️ ${readTime} read</span>
        </div>
      </div>
    </div>
  `;
}

function renderFeaturedPost(p) {
  return `
    <div class="blog-featured reveal" data-category="${p.cat}">
      <div class="blog-featured-image" style="background:linear-gradient(135deg, rgba(124, 92, 252, 0.15), rgba(0, 212, 170, 0.08));display:flex;align-items:center;justify-content:center;">
        <span style="font-size:6rem;">${p.icon}</span>
      </div>
      <div class="blog-featured-content">
        <div class="blog-featured-badge">
          <span class="badge badge-warm">✨ Featured</span>
        </div>
        <h2 class="blog-featured-title">${p.title}</h2>
        <p class="blog-featured-excerpt">${p.excerpt}</p>
        <div class="blog-featured-meta">
          <span>📅 ${p.date}</span>
          <span>⏱️ ${p.read} read</span>
          <span>🏷️ ${p.cat}</span>
        </div>
      </div>
    </div>
  `;
}

export function renderBlog() {
  const categories = ['All', 'Web Design', 'Branding', 'Marketing', 'SEO', 'Business Tips', 'Technology'];
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Blog</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Insights & <span class="gradient-text">Articles</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Tips, trends, and insights from our team of experts.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Featured Post -->
        ${renderFeaturedPost(featured)}

        <div class="tabs reveal" id="blog-tabs">
          ${categories.map((c, i) => `
            <button class="tab-btn ${i === 0 ? 'active' : ''}" onclick="filterBlog('${c}')">${c}</button>
          `).join('')}
        </div>

        <div class="blog-grid" id="blog-grid">
          ${rest.map((p, i) => renderBlogPost(p, i)).join('')}
        </div>
      </div>
    </section>
  `;
}

export async function initBlog() {
  const container = document.getElementById('blog-grid');
  if (!container) return;

  try {
    const { apiFetch } = await import('../utils/api');
    const res = await apiFetch('/blog');
    const dbBlogs = await res.json();
    if (res.ok && dbBlogs.length > 0) {
      container.innerHTML = dbBlogs.map((p: any, i: number) => renderBlogPost(p, i)).join('');
    }
  } catch (e) {
    console.warn('⚠️ Could not fetch blogs from API, falling back to static mock data.', e);
  }
}

(window as any).filterBlog = function(category: string) {
  const cards = document.querySelectorAll<HTMLElement>('.blog-card');
  const featured = document.querySelector<HTMLElement>('.blog-featured');
  const btns = document.querySelectorAll('#blog-tabs .tab-btn');
  btns.forEach(b => b.classList.toggle('active', b.textContent === category));
  cards.forEach(card => {
    const show = category === 'All' || card.dataset.category === category;
    card.style.display = show ? '' : 'none';
    if (show) card.style.animation = 'scaleIn 0.4s ease forwards';
  });
  if (featured) {
    const showFeatured = category === 'All' || featured.dataset.category === category;
    featured.style.display = showFeatured ? '' : 'none';
  }
};
