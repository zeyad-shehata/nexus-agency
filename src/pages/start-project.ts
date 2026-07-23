// ============================================
// NEXUS AGENCY â€ Start Your Project (Multi-Step Form)
// ============================================

export function renderStartProject() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return `
      <section class="page-hero">
        <div class="page-hero-bg"></div>
        <div class="page-hero-content">
          <div class="container">
            <span class="section-label reveal">âœ¦ Start Your Project</span>
            <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Let's Build <span class="gradient-text">Together</span></h1>
            <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Tell us about your project and we'll bring your vision to life.</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container" style="max-width: 500px; text-align:center;">
          <div class="glass-card reveal" style="padding: var(--space-10);">
            <div style="font-size:3.5rem; margin-bottom: var(--space-4);">ðŸ</div>
            <h2 style="font-size: var(--font-size-xl); font-weight:800; margin-bottom: var(--space-2);">Authentication Required</h2>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">Please sign in or register a workspace account to submit project proposals and track development.</p>
            <a href="./auth" class="btn btn-primary" data-link>Sign In / Register</a>
          </div>
        </div>
      </section>
    `;
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return `
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">âœ¦ Start Your Project</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Let's Build <span class="gradient-text">Together</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Tell us about your project and we'll bring your vision to life.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="multistep-container reveal">
          <div class="step-progress" id="step-progress">
            ${Array.from({length: 8}, (_, i) => `<div class="step-dot ${i === 0 ? 'active' : ''}" data-step="${i}"></div>`).join('')}
          </div>

          <!-- Step 1: Personal Info -->
          <div class="step-panel active" data-panel="0">
            <h2 class="step-title">Personal Information</h2>
            <p class="step-subtitle">Verify your contact details.</p>
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="form-name" value="${user.name || ''}" disabled />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" id="form-email" value="${user.email || ''}" disabled />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-input" id="form-phone" value="${user.phone || ''}" disabled />
            </div>
            <div class="step-buttons">
              <div></div>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†</button>
            </div>
          </div>

          <!-- Step 2: Project Info -->
          <div class="step-panel" data-panel="1">
            <h2 class="step-title">Project Information</h2>
            <p class="step-subtitle">Tell us about your project type and business.</p>
            <div class="form-group">
              <label class="form-label">Project Type *</label>
              <select class="form-select form-input" id="form-type">
                <option value="">Select project type</option>
                <option>Website</option>
                <option>Mobile App</option>
                <option>E-Commerce</option>
                <option>UI/UX Design</option>
                <option>Branding</option>
                <option>AI Solution</option>
                <option>Digital Marketing</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Business Name</label>
              <input type="text" class="form-input" id="form-business" placeholder="Your Company" />
            </div>
            <div class="form-group">
              <label class="form-label">Industry</label>
              <select class="form-select form-input" id="form-industry">
                <option value="">Select industry</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>E-Commerce</option>
                <option>Education</option>
                <option>Real Estate</option>
                <option>Food & Beverage</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Country</label>
              <input type="text" class="form-input" id="form-country" placeholder="United States" />
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†</button>
            </div>
          </div>

          <!-- Step 3: Project Details -->
          <div class="step-panel" data-panel="2">
            <h2 class="step-title">Project Details</h2>
            <p class="step-subtitle">Share more about what you need.</p>
            <div class="form-group">
              <label class="form-label">Detailed Description *</label>
              <textarea class="form-textarea form-input" id="form-desc" placeholder="Describe your project in detail..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Target Audience</label>
              <input type="text" class="form-input" id="form-audience" placeholder="e.g., Young professionals aged 25-40" />
            </div>
            <div class="form-group">
              <label class="form-label">Required Features</label>
              <textarea class="form-textarea form-input" id="form-features" placeholder="List the key features you need..." style="min-height:80px;"></textarea>
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†</button>
            </div>
          </div>

          <!-- Step 4: Design Preferences -->
          <div class="step-panel" data-panel="3">
            <h2 class="step-title">Design Preferences</h2>
            <p class="step-subtitle">Help us understand your visual style.</p>
            <div class="form-group">
              <label class="form-label">Preferred Colors</label>
              <input type="text" class="form-input" id="form-colors" placeholder="e.g., Blue, White, Gold" />
            </div>
            <div class="form-group">
              <label class="form-label">Preferred Style</label>
              <div class="radio-group" id="form-style-group">
                ${['Modern & Minimal', 'Bold & Colorful', 'Corporate & Professional', 'Elegant & Luxury'].map(s => `
                  <div class="radio-option" onclick="selectRadio(this)">
                    <div class="radio-dot"></div>
                    <span>${s}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Reference Websites</label>
              <textarea class="form-textarea form-input" id="form-references" placeholder="Share URLs of websites you like..." style="min-height:80px;"></textarea>
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†</button>
            </div>
          </div>

          <!-- Step 5: Budget -->
          <div class="step-panel" data-panel="4">
            <h2 class="step-title">Budget Range</h2>
            <p class="step-subtitle">Select your approximate budget range.</p>
            <div class="radio-group" id="form-budget-group" style="grid-template-columns:1fr;">
              ${['Under $500', '$500 â€ $1,000', '$1,000 â€ $5,000', '$5,000 â€ $10,000', '$10,000+'].map(b => `
                <div class="radio-option" onclick="selectRadio(this)">
                  <div class="radio-dot"></div>
                  <span>${b}</span>
                </div>
              `).join('')}
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†</button>
            </div>
          </div>

          <!-- Step 6: Timeline -->
          <div class="step-panel" data-panel="5">
            <h2 class="step-title">Timeline</h2>
            <p class="step-subtitle">When do you need the project completed?</p>
            <div class="radio-group" id="form-timeline-group">
              ${['ASAP', '1 Month', '2 Months', 'Flexible'].map(t => `
                <div class="radio-option" onclick="selectRadio(this)">
                  <div class="radio-dot"></div>
                  <span>${t}</span>
                </div>
              `).join('')}
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†</button>
            </div>
          </div>

          <!-- Step 7: File Upload -->
          <div class="step-panel" data-panel="6">
            <h2 class="step-title">File Uploads</h2>
            <p class="step-subtitle">Attach any relevant files (logos, documents, references).</p>
            <div class="file-upload-area" onclick="document.getElementById('file-input').click()">
              <div class="file-upload-icon">ðŸ</div>
              <div class="file-upload-text">Click or drag files here to upload</div>
              <div class="file-upload-hint">Supports: Images, PDFs, Word, ZIP (Max 10MB each)</div>
              <input type="file" id="file-input" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.zip" style="display:none" onchange="handleStepFileChange(this)" />
            </div>
            <div id="file-list" style="margin-top:var(--space-4);"></div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†</button>
            </div>
          </div>

          <!-- Step 8: Additional Notes -->
          <div class="step-panel" data-panel="7">
            <h2 class="step-title">Additional Notes</h2>
            <p class="step-subtitle">Anything else you'd like us to know?</p>
            <div class="form-group">
              <textarea class="form-textarea form-input" id="form-notes" placeholder="Share any additional information, questions, or specific requirements..." style="min-height:200px;"></textarea>
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary btn-large btn-shimmer" onclick="submitProject()">
                ðŸš€ Submit Project
              </button>
            </div>
          </div>

          <!-- Success State -->
          <div class="step-panel" data-panel="success" style="text-align:center;padding:var(--space-16) 0;">
            <div style="font-size:5rem;margin-bottom:var(--space-6);">ðŸŽ‰</div>
            <h2 class="step-title" style="margin-bottom:var(--space-4);">Project Submitted!</h2>
            <p style="color:var(--text-secondary);margin-bottom:var(--space-8);max-width:500px;margin-left:auto;margin-right:auto;">
              Thank you for choosing Nexus! We've received your project details and have initialized your workspace project tracker.
            </p>
            <a href="./dashboard" class="btn btn-primary btn-large" data-link>Go to Dashboard</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Multi-step form logic
let currentFormStep = 0;

export function initStartProject() {
  currentFormStep = 0;

  (window as any).nextStep = function() {
    const panels = document.querySelectorAll('.step-panel');
    const dots = document.querySelectorAll('.step-dot');
    if (currentFormStep < 7) {
      panels[currentFormStep].classList.remove('active');
      dots[currentFormStep].classList.remove('active');
      dots[currentFormStep].classList.add('completed');
      currentFormStep++;
      panels[currentFormStep].classList.add('active');
      dots[currentFormStep].classList.add('active');
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  (window as any).prevStep = function() {
    const panels = document.querySelectorAll('.step-panel');
    const dots = document.querySelectorAll('.step-dot');
    if (currentFormStep > 0) {
      panels[currentFormStep].classList.remove('active');
      dots[currentFormStep].classList.remove('active');
      currentFormStep--;
      panels[currentFormStep].classList.add('active');
      dots[currentFormStep].classList.add('active');
      dots[currentFormStep].classList.remove('completed');
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  (window as any).selectRadio = function(el: HTMLElement) {
    el.closest('.radio-group').querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
  };

  (window as any).handleStepFileChange = function(input: HTMLInputElement) {
    const list = document.getElementById('file-list');
    if (!list || !input.files) return;
    list.innerHTML = Array.from(input.files).map((f: File) => `
      <div style="background:rgba(255,255,255,0.02); padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm); margin-bottom:var(--space-2); font-size:var(--font-size-xs);">
        ðŸ„ ${f.name} (${(f.size/1024).toFixed(1)} KB)
      </div>
    `).join('');
  };

  (window as any).submitProject = async function() {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const pType = (document.getElementById('form-type') as HTMLSelectElement).value;
    if (!pType) {
      alert('Please select a project type.');
      return;
    }

    const title = `${pType} Development`;
    const businessName = (document.getElementById('form-business') as HTMLInputElement).value;
    const industry = (document.getElementById('form-industry') as HTMLSelectElement).value;
    const country = (document.getElementById('form-country') as HTMLInputElement).value;
    const descriptionText = (document.getElementById('form-desc') as HTMLTextAreaElement).value;
    const targetAudience = (document.getElementById('form-audience') as HTMLInputElement).value;
    const features = (document.getElementById('form-features') as HTMLTextAreaElement).value;
    const preferredColors = (document.getElementById('form-colors') as HTMLInputElement).value;

    const styleEl = document.querySelector('#form-style-group .radio-option.selected span');
    const preferredStyle = styleEl ? styleEl.textContent : '';

    const references = (document.getElementById('form-references') as HTMLTextAreaElement).value;

    const budgetEl = document.querySelector('#form-budget-group .radio-option.selected span');
    const budget = budgetEl ? budgetEl.textContent : 'Flexible';

    const timelineEl = document.querySelector('#form-timeline-group .radio-option.selected span');
    const timeline = timelineEl ? timelineEl.textContent : 'Flexible';

    const notes = (document.getElementById('form-notes') as HTMLTextAreaElement).value;

    const fullDescription = `
Business: ${businessName}
Industry: ${industry}
Country: ${country}

Project Description:
${descriptionText}

Target Audience:
${targetAudience}

Key Features:
${features}

Preferred Style: ${preferredStyle}
References:
${references}

Notes:
${notes}
`.trim();

    try {
      const { apiFetch } = await import('../utils/api');
      const res = await apiFetch('/projects', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description: fullDescription,
          industry,
          budget,
          timeline,
          preferredColors
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit project proposal.');

      // Upload files if present
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      const files = fileInput?.files || [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('name', files[i].name);

        await apiFetch(`/projects/${data.id}/files`, {
          method: 'POST',
          body: formData
        });
      }

      // Success visual transition
      const panels = document.querySelectorAll('.step-panel');
      const dots = document.querySelectorAll('.step-dot');
      panels[currentFormStep].classList.remove('active');
      dots[currentFormStep].classList.add('completed');
      const successPanel = document.querySelector('[data-panel="success"]') as HTMLElement;
      if (successPanel) {
        successPanel.classList.add('active');
        successPanel.style.display = 'block';
      }
      currentFormStep = 0;
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (err: any) {
      alert(`Error submitting project: ${err.message}`);
    }
  };
}

