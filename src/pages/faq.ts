// ============================================
// NEXUS AGENCY â€” FAQ Page
// Premium Edition v2.0 â€” with search filter
// ============================================

export function renderFAQ() {
  const categories = [
    {
      name: 'General',
      icon: 'ðŸ“‹',
      faqs: [
        { q: 'What services does Nexus Agency offer?', a: 'We offer a comprehensive range of digital services including web development, mobile app development, e-commerce solutions, UI/UX design, graphic design, branding, AI solutions, and digital marketing.' },
        { q: 'How do I start a project with Nexus?', a: 'Simply fill out our "Start Your Project" form or contact us directly. We\'ll schedule a free consultation to discuss your needs and provide a detailed proposal.' },
        { q: 'Do you work with international clients?', a: 'Absolutely! We work with clients worldwide. Our team collaborates across time zones to ensure smooth communication and project delivery.' },
      ]
    },
    {
      name: 'Pricing',
      icon: 'ðŸ’°',
      faqs: [
        { q: 'How much does a website cost?', a: 'Website costs vary based on complexity and features. Simple landing pages start at $1,500, while complex web applications can range from $5,000 to $50,000+. Contact us for a free quote.' },
        { q: 'What payment methods do you accept?', a: 'We accept bank transfers, credit cards, PayPal, and cryptocurrency. We offer flexible payment plans for larger projects â€” typically 50% upfront and 50% upon completion.' },
        { q: 'Is there a refund policy?', a: 'We offer a satisfaction guarantee. If you\'re not happy with the initial concept, we\'ll refund your deposit minus any work already completed. Detailed terms are in our contract.' },
      ]
    },
    {
      name: 'Process',
      icon: 'ðŸ”„',
      faqs: [
        { q: 'What is your development process?', a: 'We follow an agile methodology: Discovery â†’ Planning â†’ Design â†’ Development â†’ Testing â†’ Launch â†’ Support. You\'ll be involved at every stage with regular updates and checkpoints.' },
        { q: 'How long does a typical project take?', a: 'Timelines vary: Landing pages (1-2 weeks), websites (2-6 weeks), mobile apps (4-12 weeks), complex platforms (3-6 months). We\'ll provide a detailed timeline during the proposal phase.' },
        { q: 'How many revisions are included?', a: 'Our standard packages include 3-5 revision rounds per design phase. Additional revisions can be arranged at an hourly rate.' },
      ]
    },
    {
      name: 'Support',
      icon: 'ðŸ›¡ï¸',
      faqs: [
        { q: 'Do you offer post-launch support?', a: 'Yes! We offer ongoing maintenance packages that include bug fixes, security updates, content updates, performance monitoring, and priority support.' },
        { q: 'What if something breaks after launch?', a: 'All our projects come with a 30-day warranty period for bug fixes. After that, our maintenance plans cover ongoing support starting at $200/month.' },
        { q: 'Can I update content myself?', a: 'Absolutely! We build with user-friendly CMS solutions and provide training. You\'ll be able to update text, images, products, and blog posts easily.' },
      ]
    },
    {
      name: 'Technical',
      icon: 'âš™ï¸',
      faqs: [
        { q: 'What technologies do you use?', a: 'We use modern, industry-standard technologies: React, Next.js, Vue, Node.js, Python, Flutter, React Native, and more. We choose the best stack based on your project\'s specific needs.' },
        { q: 'Will my website be mobile-responsive?', a: 'Every project we deliver is fully responsive and tested across all devices and browsers. Mobile-first design is a core part of our process.' },
        { q: 'Do you handle SEO?', a: 'Yes, we implement technical SEO best practices on every project. We also offer ongoing SEO services and content marketing as part of our digital marketing packages.' },
      ]
    },
  ];

  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">âœ¦ FAQ</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Frequently Asked <span class="gradient-text">Questions</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Everything you need to know about working with us.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width:800px;">
        <!-- Search -->
        <div class="faq-search reveal">
          <span class="faq-search-icon">ðŸ”</span>
          <input type="text" class="faq-search-input" placeholder="Search questions..." oninput="filterFAQ(this.value)" />
        </div>

        <div id="faq-list">
          ${categories.map((cat, ci) => `
            <div class="reveal faq-category-group" style="margin-bottom:var(--space-12);">
              <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);display:flex;align-items:center;gap:var(--space-3);">
                <span style="font-size:1.5rem;">${cat.icon}</span>
                <span class="badge">${cat.name}</span>
              </h2>
              ${cat.faqs.map(f => `
                <div class="accordion-item faq-item" data-question="${f.q.toLowerCase()}" data-answer="${f.a.toLowerCase()}" onclick="this.classList.toggle('active');const b=this.querySelector('.accordion-body');b.style.maxHeight=this.classList.contains('active')?b.scrollHeight+'px':'0'">
                  <div class="accordion-header">
                    <span>${f.q}</span>
                    <span class="accordion-icon">â–¼</span>
                  </div>
                  <div class="accordion-body">
                    <div class="accordion-body-inner">${f.a}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>

        <div id="faq-no-results" style="display:none;text-align:center;padding:var(--space-12) 0;">
          <div style="font-size:3rem;margin-bottom:var(--space-4);">ðŸ¤”</div>
          <h3 style="font-size:var(--font-size-lg);font-weight:700;margin-bottom:var(--space-2);">No results found</h3>
          <p style="color:var(--text-secondary);">Try different keywords or <a href="./contact" data-link style="color:var(--accent-primary);">contact us</a> directly.</p>
        </div>

        <div class="reveal" style="text-align:center;margin-top:var(--space-12);">
          <div class="glass-card" style="padding:var(--space-12);">
            <h3 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-3);">Still Have Questions?</h3>
            <p style="color:var(--text-secondary);margin-bottom:var(--space-6);">We're here to help. Reach out and we'll respond within 24 hours.</p>
            <a href="./contact" class="btn btn-primary" data-link>Contact Us â†’</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

(window as any).filterFAQ = function(query: string) {
  const q = query.toLowerCase().trim();
  const items = document.querySelectorAll<HTMLElement>('.faq-item');
  const groups = document.querySelectorAll<HTMLElement>('.faq-category-group');
  const noResults = document.getElementById('faq-no-results');
  let totalVisible = 0;

  items.forEach(item => {
    const question = item.dataset.question || '';
    const answer = item.dataset.answer || '';
    const matches = !q || question.includes(q) || answer.includes(q);
    item.style.display = matches ? '' : 'none';
    if (matches) totalVisible++;
  });

  // Hide empty category groups
  groups.forEach(group => {
    const visibleItems = group.querySelectorAll('.faq-item:not([style*="display: none"])');
    group.style.display = visibleItems.length > 0 ? '' : 'none';
  });

  if (noResults) {
    noResults.style.display = totalVisible === 0 ? '' : 'none';
  }
};

