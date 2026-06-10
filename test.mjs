// Automated test script for Nexus Agency website
const BASE = 'http://localhost:3001';
const routes = ['/', '/services', '/portfolio', '/start-project', '/contact', '/faq', '/blog', '/tracker', '/consultation', '/reviews', '/estimator'];
let pass = 0, fail = 0;

function check(name, condition) {
  if (condition) { pass++; console.log(`  ✅ ${name}`); }
  else { fail++; console.log(`  ❌ ${name}`); }
}

async function testRoute(path) {
  console.log(`\n📄 Testing ${path}`);
  try {
    const res = await fetch(BASE + path);
    check('HTTP 200', res.status === 200);
    const html = await res.text();
    check('Has HTML content', html.length > 1000);
    check('Has <title>', html.includes('<title>'));
    check('Has meta description', html.includes('meta name="description"'));
    check('Has nav', html.includes('id="navbar"'));
    check('Has footer', html.includes('id="footer"'));
    check('Has main app div', html.includes('id="app"'));
    check('Has Inter font', html.includes('Inter'));
    check('Loads main.js', html.includes('src="/src/main.js"'));
  } catch (e) {
    fail++;
    console.log(`  ❌ Failed to fetch: ${e.message}`);
  }
}

async function testCSS() {
  console.log('\n🎨 Testing CSS modules');
  const cssFiles = ['variables.css', 'base.css', 'animations.css', 'components.css', 'components2.css', 'pages.css', 'pages2.css', 'responsive.css'];
  for (const f of cssFiles) {
    try {
      const res = await fetch(`${BASE}/src/styles/${f}`);
      const css = await res.text();
      check(`${f} loads (${css.length} bytes)`, res.status === 200 && css.length > 100);
    } catch (e) {
      fail++;
      console.log(`  ❌ ${f}: ${e.message}`);
    }
  }
}

async function testJS() {
  console.log('\n⚙️ Testing JS modules');
  const jsFiles = ['main.js', 'router.js', 'theme.js', 'ui.js'];
  for (const f of jsFiles) {
    try {
      const res = await fetch(`${BASE}/src/${f}`);
      check(`${f} loads`, res.status === 200);
    } catch (e) {
      fail++;
      console.log(`  ❌ ${f}: ${e.message}`);
    }
  }
  const pageFiles = ['home.js','services.js','portfolio.js','start-project.js','contact.js','faq.js','blog.js','tracker.js','consultation.js','reviews.js','estimator.js'];
  for (const f of pageFiles) {
    try {
      const res = await fetch(`${BASE}/src/pages/${f}`);
      check(`pages/${f} loads`, res.status === 200);
    } catch (e) {
      fail++;
      console.log(`  ❌ pages/${f}: ${e.message}`);
    }
  }
}

async function testAssets() {
  console.log('\n📦 Testing assets');
  for (const f of ['/favicon.svg', '/manifest.json']) {
    try {
      const res = await fetch(BASE + f);
      check(`${f} loads`, res.status === 200);
    } catch (e) {
      fail++;
      console.log(`  ❌ ${f}: ${e.message}`);
    }
  }
}

async function testContent() {
  console.log('\n📝 Testing page content (via JS module imports)');
  try {
    const home = await fetch(`${BASE}/src/pages/home.js`);
    const homeJS = await home.text();
    check('Home has hero section', homeJS.includes('hero'));
    check('Home has stats', homeJS.includes('Projects Completed'));
    check('Home has services', homeJS.includes('Website Development'));
    check('Home has testimonials', homeJS.includes('testimonial'));
    check('Home has CTA', homeJS.includes("Let's Build"));
    check('Home has counter animation', homeJS.includes('data-count'));

    const svc = await fetch(`${BASE}/src/pages/services.js`);
    const svcJS = await svc.text();
    check('Services has 8 services', (svcJS.match(/icon: '/g) || []).length >= 8);
    check('Services has pricing', svcJS.includes('From $'));
    check('Services has FAQ', svcJS.includes('accordion'));

    const port = await fetch(`${BASE}/src/pages/portfolio.js`);
    const portJS = await port.text();
    check('Portfolio has filter tabs', portJS.includes('filterPortfolio'));
    check('Portfolio has masonry grid', portJS.includes('masonry'));
    check('Portfolio has 9+ projects', (portJS.match(/title: '/g) || []).length >= 9);

    const sp = await fetch(`${BASE}/src/pages/start-project.js`);
    const spJS = await sp.text();
    check('Start Project has 8 steps', (spJS.match(/data-panel="/g) || []).length >= 8);
    check('Start Project has file upload', spJS.includes('file-upload'));
    check('Start Project has budget options', spJS.includes('Under $500'));
    check('Start Project has timeline options', spJS.includes('ASAP'));

    const contact = await fetch(`${BASE}/src/pages/contact.js`);
    const contactJS = await contact.text();
    check('Contact has form', contactJS.includes('contact-form'));
    check('Contact has email info', contactJS.includes('hello@nexus.agency'));

    const faq = await fetch(`${BASE}/src/pages/faq.js`);
    const faqJS = await faq.text();
    check('FAQ has 5 categories', (faqJS.match(/name: '/g) || []).length >= 5);
    check('FAQ has accordion', faqJS.includes('accordion-item'));

    const blog = await fetch(`${BASE}/src/pages/blog.js`);
    const blogJS = await blog.text();
    check('Blog has category filter', blogJS.includes('filterBlog'));
    check('Blog has 9 posts', (blogJS.match(/title: '/g) || []).length >= 9);

    const tracker = await fetch(`${BASE}/src/pages/tracker.js`);
    const trackerJS = await tracker.text();
    check('Tracker has timeline', trackerJS.includes('timeline-tracker'));
    check('Tracker has 7 stages', (trackerJS.match(/title: '/g) || []).length >= 7);

    const consult = await fetch(`${BASE}/src/pages/consultation.js`);
    const consultJS = await consult.text();
    check('Consultation has calendar', consultJS.includes('calendar-grid'));
    check('Consultation has time slots', consultJS.includes('time-slot'));
    check('Consultation has meeting types', consultJS.includes('Zoom'));

    const reviews = await fetch(`${BASE}/src/pages/reviews.js`);
    const reviewsJS = await reviews.text();
    check('Reviews has ratings', reviewsJS.includes('rating'));
    check('Reviews has verified badges', reviewsJS.includes('Verified'));

    const est = await fetch(`${BASE}/src/pages/estimator.js`);
    const estJS = await est.text();
    check('Estimator has calculator', estJS.includes('updateEstimate'));
    check('Estimator has feature toggles', estJS.includes('toggleEstFeature'));

    // Chat Widget Tests
    console.log('\n💬 Testing Live Chat Widget Component & State');
    const chatWidget = await fetch(`${BASE}/src/components/chat-widget.js`);
    const chatWidgetJS = await chatWidget.text();
    check('Chat widget contains client DOM elements', chatWidgetJS.includes('chat-window'));
    check('Chat widget contains admin DOM elements', chatWidgetJS.includes('admin-window'));
    check('Chat widget contains sound handlers', chatWidgetJS.includes('playBeep'));
    check('Chat widget contains sanitizeHTML helper', chatWidgetJS.includes('sanitizeHTML'));

    const chatState = await fetch(`${BASE}/src/utils/chat-state.js`);
    const chatStateJS = await chatState.text();
    check('Chat state has storage hooks', chatStateJS.includes('localStorage'));
    check('Chat state defines events', chatStateJS.includes('nexus-chat-message'));
    check('Chat state handles auto replies', chatStateJS.includes('triggerAutoReply'));

    const chatCSS = await fetch(`${BASE}/src/styles/chat-widget.css`);
    const chatCSSContent = await chatCSS.text();
    check('Chat CSS loads and is larger than 1KB', chatCSSContent.length > 1000);
    check('Chat CSS styling for glassmorphism exists', chatCSSContent.includes('backdrop-filter'));
  } catch (e) {
    fail++;
    console.log(`  ❌ Content test error: ${e.message}`);
  }
}

// Run all tests
console.log('🧪 NEXUS AGENCY — Automated Test Suite\n' + '='.repeat(45));
await testRoute('/');
for (const r of routes.slice(1)) await testRoute(r);
await testCSS();
await testJS();
await testAssets();
await testContent();

console.log(`\n${'='.repeat(45)}`);
console.log(`📊 Results: ${pass} passed, ${fail} failed, ${pass + fail} total`);
console.log(fail === 0 ? '🎉 ALL TESTS PASSED!' : `⚠️  ${fail} test(s) failed`);
process.exit(fail > 0 ? 1 : 0);
