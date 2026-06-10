// ============================================
// NEXUS AGENCY — Client Reviews Page
// Premium Edition v2.0 — Rating breakdown
// ============================================

const staticReviews = [
  { name: 'Sarah Johnson', company: 'TechVentures Inc.', initials: 'SJ', rating: 5, text: 'Nexus transformed our online presence completely. The attention to detail and the quality of design exceeded our expectations. Our conversion rate increased by 340% within the first month. Truly world-class work!', verified: true },
  { name: 'Michael Chen', company: 'GrowthLab', initials: 'MC', rating: 5, text: 'Working with Nexus was the best investment we made for our startup. They delivered a beautiful, fast, and scalable platform that our users absolutely love. The communication was excellent throughout.', verified: true },
  { name: 'Emma Williams', company: 'Luxe Retail', initials: 'EW', rating: 5, text: 'The e-commerce platform they built for us is stunning. Sales increased 250% after launch. The team is professional, responsive, and truly cares about results.', verified: true },
  { name: 'David Park', company: 'NeuralWave AI', initials: 'DP', rating: 5, text: 'Their AI expertise is exceptional. They built a custom analytics dashboard that saves our team 20+ hours per week. Design is world-class and code quality is impeccable.', verified: true },
  { name: 'Lisa Zhang', company: 'Bloom Beauty', initials: 'LZ', rating: 5, text: 'From branding to website to mobile app — Nexus handled everything flawlessly. True partners who understand business needs and translate them into beautiful products.', verified: true },
  { name: 'James Miller', company: 'FinEdge Capital', initials: 'JM', rating: 4, text: 'Great work on our fintech platform. The design is sleek and modern. Development was mostly on time with some minor delays, but the final product exceeded expectations.', verified: true },
  { name: 'Anna Kowalski', company: 'EcoMarket', initials: 'AK', rating: 5, text: 'The team delivered an incredible sustainable marketplace platform. The UX research they conducted was thorough, and it shows in the final product. Highly recommend!', verified: true },
  { name: 'Robert Singh', company: 'CloudSync Pro', initials: 'RS', rating: 5, text: 'Enterprise-grade quality at a fair price. Our cloud management dashboard is fast, reliable, and our team loves using it. Outstanding technical execution.', verified: true },
];

function renderReviewCard(r, i) {
  const name = r.name || r.user?.name || 'Nexus Client';
  const initials = r.initials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const company = r.company || (r.user?.role === 'ADMIN' ? 'Nexus Team' : 'Nexus Partner');
  const verified = r.verified !== undefined ? r.verified : true;
  const rating = r.rating || 5;
  const comment = r.comment || r.text || '';

  const colors = ['var(--gradient-primary)', 'var(--gradient-secondary)', 'linear-gradient(135deg, #38bdf8, #22d3ee)', 'linear-gradient(135deg, #a78bfa, #7c5cfc)'];

  return `
    <div class="glass-card review-card reveal reveal-delay-${(i % 3) + 1}">
      <div class="review-header">
        <div class="review-author">
          <div class="review-avatar" style="background:${colors[i % colors.length]};">${initials}</div>
          <div>
            <div style="font-weight:700;">${name}</div>
            <div style="font-size:var(--font-size-xs);color:var(--text-tertiary);">${company}</div>
            ${verified ? '<div class="review-verified">✓ Verified Client</div>' : ''}
          </div>
        </div>
        <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
      </div>
      <p class="review-text">${comment}</p>
    </div>
  `;
}

function renderRatingBreakdown(reviews) {
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    const rating = r.rating || 5;
    if (rating >= 1 && rating <= 5) counts[rating - 1]++;
  });
  const total = reviews.length;
  
  return `
    <div class="glass-card" style="padding:var(--space-6);">
      <h4 style="font-weight:700;margin-bottom:var(--space-4);font-size:var(--font-size-sm);">Rating Distribution</h4>
      <div class="rating-breakdown">
        ${[5, 4, 3, 2, 1].map(star => {
          const count = counts[star - 1];
          const percent = total > 0 ? (count / total * 100) : 0;
          return `
            <div class="rating-bar-row">
              <span class="rating-bar-label">${star}★</span>
              <div class="rating-bar-track">
                <div class="rating-bar-fill" style="width:${percent}%;"></div>
              </div>
              <span class="rating-bar-count">${count}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function renderReviews() {
  const avgRating = (staticReviews.reduce((sum, r) => sum + r.rating, 0) / staticReviews.length).toFixed(1);

  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Reviews</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Client <span class="gradient-text">Reviews</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Hear from our clients about their experience working with us.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Stats summary -->
        <div class="reveal" style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:var(--space-6);margin-bottom:var(--space-12);">
          <div class="glass-card" style="text-align:center;padding:var(--space-6);">
            <div style="font-size:var(--font-size-3xl);font-weight:900;color:var(--accent-warm);">${avgRating}</div>
            <div class="stars" style="justify-content:center;margin:var(--space-2) 0;">
              ${'★'.repeat(5)}
            </div>
            <div style="font-size:var(--font-size-sm);color:var(--text-secondary);">Average Rating</div>
          </div>
          <div class="glass-card" style="text-align:center;padding:var(--space-6);">
            <div style="font-size:var(--font-size-3xl);font-weight:900;" class="gradient-text">${staticReviews.length}</div>
            <div style="font-size:var(--font-size-sm);color:var(--text-secondary);margin-top:var(--space-2);">Total Reviews</div>
          </div>
          <div class="glass-card" style="text-align:center;padding:var(--space-6);">
            <div style="font-size:var(--font-size-3xl);font-weight:900;color:var(--accent-secondary);">100%</div>
            <div style="font-size:var(--font-size-sm);color:var(--text-secondary);margin-top:var(--space-2);">Would Recommend</div>
          </div>
          ${renderRatingBreakdown(staticReviews)}
        </div>

        <!-- Reviews grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(350px, 1fr));gap:var(--space-6);" id="reviews-list-grid">
          ${staticReviews.map((r, i) => renderReviewCard(r, i)).join('')}
        </div>
      </div>
    </section>

    <!-- Client submission portal -->
    <section class="section" id="write-review-section">
      <div class="container" id="write-review-container" style="max-width: 600px;"></div>
    </section>
  `;
}

export async function initReviews() {
  const grid = document.getElementById('reviews-list-grid');
  const writeReviewContainer = document.getElementById('write-review-container');
  if (!grid) return;

  const token = localStorage.getItem('accessToken');
  if (token && writeReviewContainer) {
    writeReviewContainer.innerHTML = `
      <div class="glass-card reveal" style="padding: var(--space-8);">
        <h3 style="font-size: var(--font-size-lg); font-weight: 800; margin-bottom: var(--space-2);">✍️ Write a Review</h3>
        <p style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-6);">Share your experience working with Nexus. Your review will be published upon admin approval.</p>
        
        <form id="submit-review-form" onsubmit="handleReviewSubmit(event)">
          <div class="form-group">
            <label class="form-label">Rating</label>
            <select id="review-rating" class="form-input" style="width: 160px;" required>
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Review Comment</label>
            <textarea id="review-comment" class="form-textarea form-input" placeholder="Type your comment..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="margin-top: var(--space-2);">Submit Review →</button>
        </form>
      </div>
    `;

    (window as any).handleReviewSubmit = async function(e: Event) {
      e.preventDefault();
      const rating = parseInt((document.getElementById('review-rating') as HTMLSelectElement).value, 10);
      const comment = (document.getElementById('review-comment') as HTMLTextAreaElement).value;

      try {
        const { apiFetch } = await import('../utils/api');
        const res = await apiFetch('/reviews', {
          method: 'POST',
          body: JSON.stringify({ rating, comment })
        });
        if (!res.ok) throw new Error();

        if ((window as any).showToast) (window as any).showToast('Review submitted! Awaiting approval. 🎉');
        (e.target as HTMLFormElement).reset();
      } catch (err) {
        if ((window as any).showToast) (window as any).showToast('Failed to submit review.', 'error');
      }
    };
  }

  try {
    const { apiFetch } = await import('../utils/api');
    const res = await apiFetch('/reviews');
    const dbReviews = await res.json();
    if (res.ok && dbReviews.length > 0) {
      grid.innerHTML = dbReviews.map((r, i) => renderReviewCard(r, i)).join('');
    }
  } catch (e) {
    console.warn('⚠️ Could not fetch reviews from API, falling back to static mock data.', e);
  }
}
