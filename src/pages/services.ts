// ============================================
// NEXUS AGENCY â€ Services Page
// ============================================

function renderServiceCard(s, i) {
  const priceStr = s.startingPrice ? `Starting at $${s.startingPrice}` : (s.price || 'Contact for price');
  const benefits = s.benefits || ['SEO Optimized', 'Lightning Fast', 'Fully Responsive', 'Analytics Dashboard'];
  const tech = s.tech || ['React', 'Next.js', 'Node.js', 'Prisma'];
  const descText = s.description || s.desc;
  const sName = s.title || s.name;

  return `
    <div class="service-detail-card reveal">
      <div class="service-detail-content">
        <div class="service-pricing">
          <span class="service-pricing-label">Starting at</span>
          <span class="service-pricing-value">${priceStr}</span>
        </div>
        <h3>${s.icon} ${sName}</h3>
        <p>${descText}</p>
        <div class="service-benefits">
          ${benefits.map(b => `
            <div class="service-benefit">
              <span class="benefit-check">âœ</span>
              <span>${b}</span>
            </div>
          `).join('')}
        </div>
        <div class="service-tech-badges">
          ${tech.map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
        <a href="./start-project" class="btn btn-primary" data-link>Get Started â†</a>
      </div>
      <div class="service-detail-visual">
        <div class="service-visual-card">${s.icon}</div>
      </div>
    </div>
  `;
}

export function renderServices() {
  const services = [
    {
      icon: '??', name: 'Website Development', desc: 'Custom-built, high-performance websites tailored to your brand and business goals. From landing pages to complex web applications.',
      benefits: ['SEO Optimized', 'Lightning Fast', 'Fully Responsive', 'CMS Integration', 'Analytics Dashboard'],
      tech: ['React', 'Next.js', 'Vue', 'Node.js', 'WordPress'],
      price: 'From $1,500',
      faq: [
        { q: 'How long does a website take?', a: 'Typically 2-6 weeks depending on complexity and features required.' },
        { q: 'Do you provide hosting?', a: 'Yes, we offer managed hosting with 99.9% uptime guarantee.' },
      ]
    },
    {
      icon: '??', name: 'Mobile Applications', desc: 'Native and cross-platform mobile apps that provide seamless user experiences across all devices.',
      benefits: ['Cross-Platform', 'Push Notifications', 'Offline Support', 'App Store Ready', 'Performance Optimized'],
      tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      price: 'From $3,000',
      faq: [
        { q: 'iOS or Android first?', a: 'We recommend cross-platform development with Flutter or React Native for cost efficiency.' },
        { q: 'Do you handle app store submission?', a: 'Yes, we handle the entire submission process for both App Store and Google Play.' },
      ]
    },
    {
      icon: '??', name: 'E-Commerce Stores', desc: 'Powerful online stores designed to maximize conversions and provide a seamless shopping experience.',
      benefits: ['Payment Integration', 'Inventory Management', 'Multi-Currency', 'Order Tracking', 'Analytics'],
      tech: ['Shopify', 'WooCommerce', 'Next.js', 'Stripe', 'Sanity'],
      price: 'From $2,000',
      faq: [
        { q: 'Which payment gateways?', a: 'We integrate Stripe, PayPal, Apple Pay, Google Pay, and regional providers.' },
        { q: 'Can I manage products myself?', a: 'Absolutely! We build an intuitive admin panel for complete control.' },
      ]
    },
    {
      icon: '??', name: 'UI/UX Design', desc: 'Research-driven design that puts users first. We create intuitive, beautiful interfaces that drive engagement and retention.',
      benefits: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems'],
      tech: ['Figma', 'Adobe XD', 'Framer', 'Principle', 'Maze'],
      price: 'From $1,000',
      faq: [
        { q: 'Do you do user research?', a: 'Yes, we conduct user interviews, surveys, and usability testing.' },
        { q: 'How many revisions?', a: 'Our packages include 3-5 revision rounds to ensure perfection.' },
      ]
    },
    {
      icon: '??', name: 'Graphic Design', desc: 'Eye-catching visual assets that communicate your brand message and captivate your audience.',
      benefits: ['Brand Consistency', 'Print & Digital', 'Social Media', 'Marketing Materials', 'Illustrations'],
      tech: ['Photoshop', 'Illustrator', 'After Effects', 'Figma', 'Blender'],
      price: 'From $500',
      faq: [
        { q: 'What file formats?', a: 'We deliver in all formats needed â€ SVG, PNG, PDF, AI, PSD, and more.' },
        { q: 'Do you do motion graphics?', a: 'Yes! We create animated logos, social media content, and video intros.' },
      ]
    },
    {
      icon: '??', name: 'Branding', desc: 'Complete brand identity systems that make your business unforgettable and build lasting connections with your audience.',
      benefits: ['Logo Design', 'Brand Guidelines', 'Color Palettes', 'Typography', 'Brand Strategy'],
      tech: ['Figma', 'Illustrator', 'InDesign', 'Photoshop'],
      price: 'From $2,000',
      faq: [
        { q: 'What does branding include?', a: 'Logo, color palette, typography, brand guidelines, stationery, and social media kit.' },
        { q: 'How long does branding take?', a: 'A complete branding project typically takes 2-4 weeks.' },
      ]
    },
    {
      icon: '??', name: 'AI Solutions', desc: 'Leverage artificial intelligence to automate processes, gain insights, and create intelligent experiences for your users.',
      benefits: ['Chatbots', 'Data Analytics', 'Automation', 'ML Models', 'NLP Integration'],
      tech: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'AWS'],
      price: 'From $5,000',
      faq: [
        { q: 'What kind of AI solutions?', a: 'Chatbots, recommendation engines, data analytics, process automation, and custom ML models.' },
        { q: 'Do you train custom models?', a: 'Yes, we build and train custom models tailored to your specific business needs.' },
      ]
    },
    {
      icon: '??', name: 'Digital Marketing', desc: 'Data-driven marketing strategies that grow your online presence, drive traffic, and increase conversions.',
      benefits: ['SEO', 'Social Media', 'PPC Campaigns', 'Content Strategy', 'Email Marketing'],
      tech: ['Google Ads', 'Meta Ads', 'Ahrefs', 'HubSpot', 'Mailchimp'],
      price: 'From $800/mo',
      faq: [
        { q: 'How soon will I see results?', a: 'SEO takes 3-6 months; paid campaigns can show results within the first week.' },
        { q: 'Do you provide reports?', a: 'Yes, detailed monthly reports with KPIs, insights, and recommendations.' },
      ]
    },
  ];

  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">âœ¦ Our Services</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">What We <span class="gradient-text">Offer</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">End-to-end digital solutions crafted with precision, powered by innovation.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" id="services-list-container">
        ${services.map((s, i) => renderServiceCard(s, i)).join('')}
      </div>
    </section>

    <section class="section cta-section" style="background:var(--bg-secondary);">
      <div class="cta-glow"></div>
      <div class="container">
        <div class="cta-content reveal">
          <h2 class="cta-title">Ready to Get Started?</h2>
          <p class="cta-subtitle">Tell us about your project and we'll provide a free consultation and quote.</p>
          <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>Start Your Project â†</a>
        </div>
      </div>
    </section>
  `;
}

export async function initServices() {
  const container = document.getElementById('services-list-container');
  if (!container) return;

  try {
    const res = await fetch('http://localhost:5000/api/v1/services');
    const dbServices = await res.json();
    if (res.ok && dbServices.length > 0) {
      container.innerHTML = dbServices.map((s, i) => renderServiceCard(s, i)).join('');
    }
  } catch (e) {
    console.warn('âš ï¸ Could not fetch services from API, falling back to static mock data.', e);
  }
}

