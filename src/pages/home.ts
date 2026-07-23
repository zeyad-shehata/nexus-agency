// ============================================
// NEXUS AGENCY â€” Home Page
// Premium Edition v2.0
// ============================================

export function renderHome() {
  return `
    ${heroSection()}
    ${techTicker()}
    ${statsSection()}
    ${whyChooseUs()}
    ${servicesPreview()}
    ${portfolioPreview()}
    ${testimonialsSection()}
    ${ctaSection()}
  `;
}

function heroSection() {
  // Generate particles
  const particles = Array.from({ length: 25 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 8 + Math.random() * 12;
    const size = 2 + Math.random() * 4;
    const opacity = 0.2 + Math.random() * 0.4;
    return `<div class="hero-particle" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;opacity:${opacity};"></div>`;
  }).join('');

  return `
    <section class="hero" id="hero">
      <div class="hero-bg"></div>
      <div class="hero-particles">${particles}</div>
      <div class="hero-shapes">
        <div class="hero-shape hero-shape-1"></div>
        <div class="hero-shape hero-shape-2"></div>
        <div class="hero-shape hero-shape-3"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge reveal">
            <span class="hero-badge-dot"></span>
            Available for new projects
          </div>
          <h1 class="hero-title reveal reveal-delay-1">
            Turn Your Vision<br>Into <span class="gradient-text">Reality.</span>
          </h1>
          <p class="hero-subtitle reveal reveal-delay-2">
            We design and develop premium <span class="typing-wrapper"><span class="typing-text" id="typing-text">websites</span></span> that help businesses grow, scale, and dominate their market.
          </p>
          <div class="hero-buttons reveal reveal-delay-3">
            <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>
              Start Your Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="./portfolio" class="btn btn-secondary btn-large" data-link>
              View Portfolio
            </a>
          </div>
        </div>
      </div>
      <div class="hero-scroll-indicator">
        <div class="scroll-mouse"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  `;
}

function techTicker() {
  const techs = [
    { icon: 'âš›ï¸', name: 'React' },
    { icon: 'ðŸ”º', name: 'Next.js' },
    { icon: 'ðŸ’š', name: 'Vue.js' },
    { icon: 'ðŸŸ¦', name: 'TypeScript' },
    { icon: 'ðŸ', name: 'Python' },
    { icon: 'ðŸ”¥', name: 'Firebase' },
    { icon: 'â˜ï¸', name: 'AWS' },
    { icon: 'ðŸ¤–', name: 'TensorFlow' },
    { icon: 'ðŸ“±', name: 'Flutter' },
    { icon: 'ðŸŽ¨', name: 'Figma' },
    { icon: 'ðŸ”·', name: 'Docker' },
    { icon: 'âš¡', name: 'Node.js' },
    { icon: 'ðŸ›¡ï¸', name: 'GraphQL' },
    { icon: 'ðŸ”®', name: 'OpenAI' },
    { icon: 'ðŸŒŠ', name: 'Tailwind' },
    { icon: 'ðŸ—„ï¸', name: 'PostgreSQL' },
  ];

  const items = techs.map(t => `
    <div class="ticker-item">
      <span class="ticker-icon">${t.icon}</span>
      <span>${t.name}</span>
    </div>
  `).join('');

  return `
    <div class="tech-ticker">
      <div class="ticker-track">
        ${items}${items}
      </div>
    </div>
  `;
}

function statsSection() {
  const stats = [
    { count: 150, suffix: '+', label: 'Projects Completed', icon: 'ðŸš€' },
    { count: 120, suffix: '+', label: 'Happy Clients', icon: 'ðŸ˜Š' },
    { count: 8, suffix: '+', label: 'Years of Experience', icon: 'â­' },
    { count: 99, suffix: '%', label: 'Client Satisfaction', icon: 'ðŸ’¯' },
  ];

  return `
    <section class="section stats-section" id="stats">
      <div class="container">
        <div class="stats-grid">
          ${stats.map((s, i) => `
            <div class="stat-card glass-card reveal reveal-delay-${i + 1}">
              <div style="font-size:2rem;margin-bottom:var(--space-3);">${s.icon}</div>
              <div class="stat-number" data-count="${s.count}" data-suffix="${s.suffix}">0${s.suffix}</div>
              <div class="stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function whyChooseUs() {
  const features = [
    { icon: 'ðŸ‘¥', title: 'Professional Team', desc: 'Expert designers and developers with years of experience building world-class digital products.', color: 'var(--accent-primary-rgb)' },
    { icon: 'âš¡', title: 'Fast Delivery', desc: 'We deliver projects on time without compromising on quality, using agile methodologies.', color: 'var(--accent-secondary-rgb)' },
    { icon: 'ðŸ’Ž', title: 'Premium Quality', desc: 'Every pixel matters. We craft premium designs that stand out and drive real results.', color: 'var(--accent-tertiary-rgb)' },
    { icon: 'ðŸ”’', title: 'Secure Process', desc: 'Enterprise-grade security practices to protect your data and your users throughout.', color: 'var(--accent-warm-rgb)' },
    { icon: 'ðŸ› ï¸', title: 'Continuous Support', desc: 'We don\'t disappear after launch. Ongoing maintenance, updates, and 24/7 support.', color: 'var(--accent-cyan-rgb)' },
    { icon: 'ðŸ§ ', title: 'Modern Technologies', desc: 'Latest tech stack including AI, cloud-native, and cutting-edge frameworks.', color: 'var(--accent-primary-rgb)' },
  ];

  return `
    <section class="section" id="why-us">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Why Choose Us</span>
          <h2 class="section-title">Built Different. <span class="gradient-text">Built Better.</span></h2>
          <p class="section-subtitle">We combine cutting-edge technology with stunning design to create digital experiences that drive real business results.</p>
        </div>
        <div class="features-grid">
          ${features.map((f, i) => `
            <div class="glass-card feature-card reveal reveal-delay-${i + 1}">
              <div class="feature-icon" style="background:rgba(${f.color}, 0.1);border-color:rgba(${f.color}, 0.2);">${f.icon}</div>
              <h3 class="feature-title">${f.title}</h3>
              <p class="feature-desc">${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function servicesPreview() {
  const services = [
    { icon: 'ðŸŒ', name: 'Website Development', desc: 'Custom websites built with modern frameworks and best practices.' },
    { icon: 'ðŸ“±', name: 'Mobile Applications', desc: 'Native and cross-platform apps for iOS and Android.' },
    { icon: 'ðŸ›’', name: 'E-Commerce Stores', desc: 'Powerful online stores that convert visitors into customers.' },
    { icon: 'ðŸŽ¨', name: 'UI/UX Design', desc: 'Intuitive interfaces designed for maximum user engagement.' },
    { icon: 'âœï¸', name: 'Graphic Design', desc: 'Stunning visual assets that elevate your brand identity.' },
    { icon: 'ðŸ’¼', name: 'Branding', desc: 'Complete brand identity systems that make you unforgettable.' },
    { icon: 'ðŸ¤–', name: 'AI Solutions', desc: 'Intelligent automation and AI-powered tools for your business.' },
    { icon: 'ðŸ“ˆ', name: 'Digital Marketing', desc: 'Data-driven strategies to grow your reach and revenue.' },
  ];

  return `
    <section class="section" id="services-preview" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Our Services</span>
          <h2 class="section-title">What We <span class="gradient-text">Create</span></h2>
          <p class="section-subtitle">End-to-end digital solutions tailored to your business needs and growth objectives.</p>
        </div>
        <div class="services-grid">
          ${services.map((s, i) => `
            <div class="glass-card service-card reveal reveal-delay-${(i % 4) + 1}" onclick="window.history.pushState({},'','/services');window.dispatchEvent(new PopStateEvent('popstate'))">
              <div class="service-icon">${s.icon}</div>
              <h3 class="service-name">${s.name}</h3>
              <p class="service-desc">${s.desc}</p>
              <span class="service-arrow">Learn more â†’</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function portfolioPreview() {
  const projects = [
    { title: 'Quantum Finance', category: 'Web Application', tech: ['React', 'Node.js', 'AWS'], color: '#7c5cfc', icon: 'ðŸ¦' },
    { title: 'Verdant Health', category: 'Mobile App', tech: ['Flutter', 'Firebase', 'AI'], color: '#00d4aa', icon: 'ðŸ¥' },
    { title: 'Luxe Fashion', category: 'E-Commerce', tech: ['Next.js', 'Stripe', 'Sanity'], color: '#ff6b9d', icon: 'ðŸ‘—' },
    { title: 'Neural Analytics', category: 'AI Platform', tech: ['Python', 'TensorFlow', 'React'], color: '#ffa94d', icon: 'ðŸ§ ' },
  ];

  return `
    <section class="section" id="portfolio-preview">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Featured Work</span>
          <h2 class="section-title">Our <span class="gradient-text">Portfolio</span></h2>
          <p class="section-subtitle">Selected projects that showcase our expertise and commitment to excellence.</p>
        </div>
        <div class="portfolio-grid">
          ${projects.map((p, i) => `
            <div class="portfolio-card reveal reveal-delay-${(i % 2) + 1}">
              <div class="portfolio-image-wrapper">
                <div class="portfolio-image" style="height:280px;background:linear-gradient(135deg, ${p.color}22, ${p.color}11);display:flex;align-items:center;justify-content:center;font-size:4rem;">
                  ${p.icon}
                </div>
                <div class="portfolio-overlay">
                  <a href="./portfolio" class="btn btn-primary btn-shimmer" data-link>View Details</a>
                </div>
              </div>
              <div class="portfolio-info">
                <div class="portfolio-category">${p.category}</div>
                <h3 class="portfolio-title">${p.title}</h3>
                <div class="portfolio-tech">
                  ${p.tech.map(t => `<span class="badge">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:var(--space-10);" class="reveal">
          <a href="./portfolio" class="btn btn-secondary btn-large" data-link>View All Projects â†’</a>
        </div>
      </div>
    </section>
  `;
}

function testimonialsSection() {
  const testimonials = [
    { name: 'Sarah Johnson', company: 'TechVentures Inc.', initials: 'SJ', quote: 'Nexus transformed our online presence completely. The attention to detail and the quality of design exceeded our expectations. Our conversion rate increased by 340% within the first month.', rating: 5 },
    { name: 'Michael Chen', company: 'GrowthLab', initials: 'MC', quote: 'Working with Nexus was the best investment we made for our startup. They delivered a beautiful, fast, and scalable platform that our users absolutely love. Highly recommend!', rating: 5 },
    { name: 'Emma Williams', company: 'Luxe Retail', initials: 'EW', quote: 'The e-commerce platform they built for us is stunning. Sales increased 250% after launch. The team is professional, responsive, and truly cares about delivering the best result.', rating: 5 },
    { name: 'David Park', company: 'NeuralWave AI', initials: 'DP', quote: 'Their AI solutions expertise is exceptional. They built a custom dashboard that saves our team 20+ hours per week. The design is world-class and the code quality is impeccable.', rating: 5 },
    { name: 'Lisa Zhang', company: 'Bloom Beauty', initials: 'LZ', quote: 'From branding to website to mobile app â€” Nexus handled everything flawlessly. They are a true partner who understands business needs and translates them into beautiful products.', rating: 5 },
  ];

  const stars = 'â˜…'.repeat(5);

  return `
    <section class="section testimonials-section" id="testimonials" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Testimonials</span>
          <h2 class="section-title">What Our <span class="gradient-text">Clients Say</span></h2>
          <p class="section-subtitle">Don't just take our word for it â€” hear from some of our amazing clients.</p>
        </div>
        <div style="overflow:hidden;" class="reveal" id="testimonial-wrapper">
          <div class="testimonial-slider" id="testimonial-slider">
            ${testimonials.map(t => `
              <div class="glass-card testimonial-card">
                <div class="stars" style="margin-bottom:var(--space-4);color:var(--accent-warm);">${stars}</div>
                <p class="testimonial-quote">${t.quote}</p>
                <div class="testimonial-author">
                  <div class="testimonial-avatar">${t.initials}</div>
                  <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-company">${t.company}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="testimonial-controls reveal">
          <button class="testimonial-btn" onclick="slideTestimonials(-1)" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div class="testimonial-dots" id="testimonial-dots">
            ${testimonials.map((_, i) => `<div class="testimonial-dot ${i === 0 ? 'active' : ''}" onclick="goToTestimonial(${i})"></div>`).join('')}
          </div>
          <button class="testimonial-btn" onclick="slideTestimonials(1)" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  `;
}

function ctaSection() {
  return `
    <section class="section cta-section" id="cta">
      <div class="cta-glow"></div>
      <div class="container">
        <div class="cta-content reveal">
          <span class="section-label">âœ¦ Ready to Start?</span>
          <h2 class="cta-title">Let's Build Something <span class="gradient-text">Extraordinary</span></h2>
          <p class="cta-subtitle">Your vision deserves a world-class digital presence. Let's make it happen together.</p>
          <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>
            Let's Build Your Project
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  `;
}

// Typing effect
function initTypingEffect() {
  const words = ['websites', 'mobile apps', 'AI solutions', 'brands', 'platforms', 'experiences'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const el = document.getElementById('typing-text');
  if (!el) return;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      el.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      el.textContent = currentWord.substring(0, charIndex);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 300;
    }

    setTimeout(type, speed);
  }
  setTimeout(type, 1500);
}

// Testimonial slider logic (exposed globally)
let currentSlide = 0;
let autoSlideInterval: ReturnType<typeof setInterval>;
let isPaused = false;

(window as any).slideTestimonials = function(dir: number) {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;
  const cards = slider.children as HTMLCollectionOf<HTMLElement>;
  const total = cards.length;
  currentSlide = (currentSlide + dir + total) % total;
  const cardWidth = cards[0].offsetWidth + 24; // gap
  slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  updateDots();
};

(window as any).goToTestimonial = function(i: number) {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;
  currentSlide = i;
  const cards = slider.children as HTMLCollectionOf<HTMLElement>;
  const cardWidth = cards[0].offsetWidth + 24;
  slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  updateDots();
};

function updateDots() {
  const dots = document.querySelectorAll('.testimonial-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

// Pause on hover
document.addEventListener('mouseover', (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('#testimonial-wrapper')) isPaused = true;
});
document.addEventListener('mouseout', (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('#testimonial-wrapper')) isPaused = false;
});

// Auto-slide
setInterval(() => {
  if (document.getElementById('testimonial-slider') && !isPaused) {
    (window as any).slideTestimonials(1);
  }
}, 5000);

// Init typing on page load â€” called from router
export function initHomePage() {
  initTypingEffect();
}

