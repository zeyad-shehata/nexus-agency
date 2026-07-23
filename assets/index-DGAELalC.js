var lt=Object.defineProperty;var ct=(e,t,a)=>t in e?lt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var Ae=(e,t,a)=>ct(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();function dt(){return`
    ${pt()}
    ${mt()}
    ${ut()}
    ${vt()}
    ${gt()}
    ${ft()}
    ${ht()}
    ${yt()}
  `}function pt(){return`
    <section class="hero" id="hero">
      <div class="hero-bg"></div>
      <div class="hero-particles">${Array.from({length:25},(t,a)=>{const s=Math.random()*100,i=Math.random()*8,n=8+Math.random()*12,o=2+Math.random()*4,r=.2+Math.random()*.4;return`<div class="hero-particle" style="left:${s}%;width:${o}px;height:${o}px;animation-duration:${n}s;animation-delay:${i}s;opacity:${r};"></div>`}).join("")}</div>
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
  `}function mt(){const t=[{icon:"âš›ï¸",name:"React"},{icon:"ðŸ”º",name:"Next.js"},{icon:"ðŸ’š",name:"Vue.js"},{icon:"ðŸŸ¦",name:"TypeScript"},{icon:"ðŸ",name:"Python"},{icon:"ðŸ”¥",name:"Firebase"},{icon:"â˜ï¸",name:"AWS"},{icon:"ðŸ¤–",name:"TensorFlow"},{icon:"ðŸ“±",name:"Flutter"},{icon:"ðŸŽ¨",name:"Figma"},{icon:"ðŸ”·",name:"Docker"},{icon:"âš¡",name:"Node.js"},{icon:"ðŸ›¡ï¸",name:"GraphQL"},{icon:"ðŸ”®",name:"OpenAI"},{icon:"ðŸŒŠ",name:"Tailwind"},{icon:"ðŸ—„ï¸",name:"PostgreSQL"}].map(a=>`
    <div class="ticker-item">
      <span class="ticker-icon">${a.icon}</span>
      <span>${a.name}</span>
    </div>
  `).join("");return`
    <div class="tech-ticker">
      <div class="ticker-track">
        ${t}${t}
      </div>
    </div>
  `}function ut(){return`
    <section class="section stats-section" id="stats">
      <div class="container">
        <div class="stats-grid">
          ${[{count:150,suffix:"+",label:"Projects Completed",icon:"ðŸš€"},{count:120,suffix:"+",label:"Happy Clients",icon:"ðŸ˜Š"},{count:8,suffix:"+",label:"Years of Experience",icon:"â­"},{count:99,suffix:"%",label:"Client Satisfaction",icon:"ðŸ’¯"}].map((t,a)=>`
            <div class="stat-card glass-card reveal reveal-delay-${a+1}">
              <div style="font-size:2rem;margin-bottom:var(--space-3);">${t.icon}</div>
              <div class="stat-number" data-count="${t.count}" data-suffix="${t.suffix}">0${t.suffix}</div>
              <div class="stat-label">${t.label}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `}function vt(){return`
    <section class="section" id="why-us">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Why Choose Us</span>
          <h2 class="section-title">Built Different. <span class="gradient-text">Built Better.</span></h2>
          <p class="section-subtitle">We combine cutting-edge technology with stunning design to create digital experiences that drive real business results.</p>
        </div>
        <div class="features-grid">
          ${[{icon:"ðŸ‘¥",title:"Professional Team",desc:"Expert designers and developers with years of experience building world-class digital products.",color:"var(--accent-primary-rgb)"},{icon:"âš¡",title:"Fast Delivery",desc:"We deliver projects on time without compromising on quality, using agile methodologies.",color:"var(--accent-secondary-rgb)"},{icon:"ðŸ’Ž",title:"Premium Quality",desc:"Every pixel matters. We craft premium designs that stand out and drive real results.",color:"var(--accent-tertiary-rgb)"},{icon:"ðŸ”’",title:"Secure Process",desc:"Enterprise-grade security practices to protect your data and your users throughout.",color:"var(--accent-warm-rgb)"},{icon:"ðŸ› ï¸",title:"Continuous Support",desc:"We don't disappear after launch. Ongoing maintenance, updates, and 24/7 support.",color:"var(--accent-cyan-rgb)"},{icon:"ðŸ§ ",title:"Modern Technologies",desc:"Latest tech stack including AI, cloud-native, and cutting-edge frameworks.",color:"var(--accent-primary-rgb)"}].map((t,a)=>`
            <div class="glass-card feature-card reveal reveal-delay-${a+1}">
              <div class="feature-icon" style="background:rgba(${t.color}, 0.1);border-color:rgba(${t.color}, 0.2);">${t.icon}</div>
              <h3 class="feature-title">${t.title}</h3>
              <p class="feature-desc">${t.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `}function gt(){return`
    <section class="section" id="services-preview" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Our Services</span>
          <h2 class="section-title">What We <span class="gradient-text">Create</span></h2>
          <p class="section-subtitle">End-to-end digital solutions tailored to your business needs and growth objectives.</p>
        </div>
        <div class="services-grid">
          ${[{icon:"ðŸŒ",name:"Website Development",desc:"Custom websites built with modern frameworks and best practices."},{icon:"ðŸ“±",name:"Mobile Applications",desc:"Native and cross-platform apps for iOS and Android."},{icon:"ðŸ›’",name:"E-Commerce Stores",desc:"Powerful online stores that convert visitors into customers."},{icon:"ðŸŽ¨",name:"UI/UX Design",desc:"Intuitive interfaces designed for maximum user engagement."},{icon:"âœï¸",name:"Graphic Design",desc:"Stunning visual assets that elevate your brand identity."},{icon:"ðŸ’¼",name:"Branding",desc:"Complete brand identity systems that make you unforgettable."},{icon:"ðŸ¤–",name:"AI Solutions",desc:"Intelligent automation and AI-powered tools for your business."},{icon:"ðŸ“ˆ",name:"Digital Marketing",desc:"Data-driven strategies to grow your reach and revenue."}].map((t,a)=>`
            <div class="glass-card service-card reveal reveal-delay-${a%4+1}" onclick="window.history.pushState({},'','/services');window.dispatchEvent(new PopStateEvent('popstate'))">
              <div class="service-icon">${t.icon}</div>
              <h3 class="service-name">${t.name}</h3>
              <p class="service-desc">${t.desc}</p>
              <span class="service-arrow">Learn more â†’</span>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `}function ft(){return`
    <section class="section" id="portfolio-preview">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Featured Work</span>
          <h2 class="section-title">Our <span class="gradient-text">Portfolio</span></h2>
          <p class="section-subtitle">Selected projects that showcase our expertise and commitment to excellence.</p>
        </div>
        <div class="portfolio-grid">
          ${[{title:"Quantum Finance",category:"Web Application",tech:["React","Node.js","AWS"],color:"#7c5cfc",icon:"ðŸ¦"},{title:"Verdant Health",category:"Mobile App",tech:["Flutter","Firebase","AI"],color:"#00d4aa",icon:"ðŸ¥"},{title:"Luxe Fashion",category:"E-Commerce",tech:["Next.js","Stripe","Sanity"],color:"#ff6b9d",icon:"ðŸ‘—"},{title:"Neural Analytics",category:"AI Platform",tech:["Python","TensorFlow","React"],color:"#ffa94d",icon:"ðŸ§ "}].map((t,a)=>`
            <div class="portfolio-card reveal reveal-delay-${a%2+1}">
              <div class="portfolio-image-wrapper">
                <div class="portfolio-image" style="height:280px;background:linear-gradient(135deg, ${t.color}22, ${t.color}11);display:flex;align-items:center;justify-content:center;font-size:4rem;">
                  ${t.icon}
                </div>
                <div class="portfolio-overlay">
                  <a href="./portfolio" class="btn btn-primary btn-shimmer" data-link>View Details</a>
                </div>
              </div>
              <div class="portfolio-info">
                <div class="portfolio-category">${t.category}</div>
                <h3 class="portfolio-title">${t.title}</h3>
                <div class="portfolio-tech">
                  ${t.tech.map(s=>`<span class="badge">${s}</span>`).join("")}
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        <div style="text-align:center;margin-top:var(--space-10);" class="reveal">
          <a href="./portfolio" class="btn btn-secondary btn-large" data-link>View All Projects â†’</a>
        </div>
      </div>
    </section>
  `}function ht(){const e=[{name:"Sarah Johnson",company:"TechVentures Inc.",initials:"SJ",quote:"Nexus transformed our online presence completely. The attention to detail and the quality of design exceeded our expectations. Our conversion rate increased by 340% within the first month.",rating:5},{name:"Michael Chen",company:"GrowthLab",initials:"MC",quote:"Working with Nexus was the best investment we made for our startup. They delivered a beautiful, fast, and scalable platform that our users absolutely love. Highly recommend!",rating:5},{name:"Emma Williams",company:"Luxe Retail",initials:"EW",quote:"The e-commerce platform they built for us is stunning. Sales increased 250% after launch. The team is professional, responsive, and truly cares about delivering the best result.",rating:5},{name:"David Park",company:"NeuralWave AI",initials:"DP",quote:"Their AI solutions expertise is exceptional. They built a custom dashboard that saves our team 20+ hours per week. The design is world-class and the code quality is impeccable.",rating:5},{name:"Lisa Zhang",company:"Bloom Beauty",initials:"LZ",quote:"From branding to website to mobile app â€” Nexus handled everything flawlessly. They are a true partner who understands business needs and translates them into beautiful products.",rating:5}],t="â˜…".repeat(5);return`
    <section class="section testimonials-section" id="testimonials" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">âœ¦ Testimonials</span>
          <h2 class="section-title">What Our <span class="gradient-text">Clients Say</span></h2>
          <p class="section-subtitle">Don't just take our word for it â€” hear from some of our amazing clients.</p>
        </div>
        <div style="overflow:hidden;" class="reveal" id="testimonial-wrapper">
          <div class="testimonial-slider" id="testimonial-slider">
            ${e.map(a=>`
              <div class="glass-card testimonial-card">
                <div class="stars" style="margin-bottom:var(--space-4);color:var(--accent-warm);">${t}</div>
                <p class="testimonial-quote">${a.quote}</p>
                <div class="testimonial-author">
                  <div class="testimonial-avatar">${a.initials}</div>
                  <div>
                    <div class="testimonial-name">${a.name}</div>
                    <div class="testimonial-company">${a.company}</div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="testimonial-controls reveal">
          <button class="testimonial-btn" onclick="slideTestimonials(-1)" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div class="testimonial-dots" id="testimonial-dots">
            ${e.map((a,s)=>`<div class="testimonial-dot ${s===0?"active":""}" onclick="goToTestimonial(${s})"></div>`).join("")}
          </div>
          <button class="testimonial-btn" onclick="slideTestimonials(1)" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  `}function yt(){return`
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
  `}function bt(){const e=["websites","mobile apps","AI solutions","brands","platforms","experiences"];let t=0,a=0,s=!1;const i=document.getElementById("typing-text");if(!i)return;function n(){const o=e[t];s?(a--,i.textContent=o.substring(0,a)):(a++,i.textContent=o.substring(0,a));let r=s?40:80;!s&&a===o.length?(r=2e3,s=!0):s&&a===0&&(s=!1,t=(t+1)%e.length,r=300),setTimeout(n,r)}setTimeout(n,1500)}let _=0,fe=!1;window.slideTestimonials=function(e){const t=document.getElementById("testimonial-slider");if(!t)return;const a=t.children,s=a.length;_=(_+e+s)%s;const i=a[0].offsetWidth+24;t.style.transform=`translateX(-${_*i}px)`,Re()};window.goToTestimonial=function(e){const t=document.getElementById("testimonial-slider");if(!t)return;_=e;const s=t.children[0].offsetWidth+24;t.style.transform=`translateX(-${_*s}px)`,Re()};function Re(){document.querySelectorAll(".testimonial-dot").forEach((t,a)=>t.classList.toggle("active",a===_))}document.addEventListener("mouseover",e=>{e.target.closest("#testimonial-wrapper")&&(fe=!0)});document.addEventListener("mouseout",e=>{e.target.closest("#testimonial-wrapper")&&(fe=!1)});setInterval(()=>{document.getElementById("testimonial-slider")&&!fe&&window.slideTestimonials(1)},5e3);function wt(){bt()}function Oe(e,t){const a=e.startingPrice?`Starting at $${e.startingPrice}`:e.price||"Contact for price",s=e.benefits||["SEO Optimized","Lightning Fast","Fully Responsive","Analytics Dashboard"],i=e.tech||["React","Next.js","Node.js","Prisma"],n=e.description||e.desc,o=e.title||e.name;return`
    <div class="service-detail-card reveal">
      <div class="service-detail-content">
        <div class="service-pricing">
          <span class="service-pricing-label">Starting at</span>
          <span class="service-pricing-value">${a}</span>
        </div>
        <h3>${e.icon} ${o}</h3>
        <p>${n}</p>
        <div class="service-benefits">
          ${s.map(r=>`
            <div class="service-benefit">
              <span class="benefit-check">âœ“</span>
              <span>${r}</span>
            </div>
          `).join("")}
        </div>
        <div class="service-tech-badges">
          ${i.map(r=>`<span class="badge">${r}</span>`).join("")}
        </div>
        <a href="./start-project" class="btn btn-primary" data-link>Get Started â†’</a>
      </div>
      <div class="service-detail-visual">
        <div class="service-visual-card">${e.icon}</div>
      </div>
    </div>
  `}function xt(){return`
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
        ${[{icon:"ðŸŒ",name:"Website Development",desc:"Custom-built, high-performance websites tailored to your brand and business goals. From landing pages to complex web applications.",benefits:["SEO Optimized","Lightning Fast","Fully Responsive","CMS Integration","Analytics Dashboard"],tech:["React","Next.js","Vue","Node.js","WordPress"],price:"From $1,500",faq:[{q:"How long does a website take?",a:"Typically 2-6 weeks depending on complexity and features required."},{q:"Do you provide hosting?",a:"Yes, we offer managed hosting with 99.9% uptime guarantee."}]},{icon:"ðŸ“±",name:"Mobile Applications",desc:"Native and cross-platform mobile apps that provide seamless user experiences across all devices.",benefits:["Cross-Platform","Push Notifications","Offline Support","App Store Ready","Performance Optimized"],tech:["React Native","Flutter","Swift","Kotlin","Firebase"],price:"From $3,000",faq:[{q:"iOS or Android first?",a:"We recommend cross-platform development with Flutter or React Native for cost efficiency."},{q:"Do you handle app store submission?",a:"Yes, we handle the entire submission process for both App Store and Google Play."}]},{icon:"ðŸ›’",name:"E-Commerce Stores",desc:"Powerful online stores designed to maximize conversions and provide a seamless shopping experience.",benefits:["Payment Integration","Inventory Management","Multi-Currency","Order Tracking","Analytics"],tech:["Shopify","WooCommerce","Next.js","Stripe","Sanity"],price:"From $2,000",faq:[{q:"Which payment gateways?",a:"We integrate Stripe, PayPal, Apple Pay, Google Pay, and regional providers."},{q:"Can I manage products myself?",a:"Absolutely! We build an intuitive admin panel for complete control."}]},{icon:"ðŸŽ¨",name:"UI/UX Design",desc:"Research-driven design that puts users first. We create intuitive, beautiful interfaces that drive engagement and retention.",benefits:["User Research","Wireframing","Prototyping","Usability Testing","Design Systems"],tech:["Figma","Adobe XD","Framer","Principle","Maze"],price:"From $1,000",faq:[{q:"Do you do user research?",a:"Yes, we conduct user interviews, surveys, and usability testing."},{q:"How many revisions?",a:"Our packages include 3-5 revision rounds to ensure perfection."}]},{icon:"âœï¸",name:"Graphic Design",desc:"Eye-catching visual assets that communicate your brand message and captivate your audience.",benefits:["Brand Consistency","Print & Digital","Social Media","Marketing Materials","Illustrations"],tech:["Photoshop","Illustrator","After Effects","Figma","Blender"],price:"From $500",faq:[{q:"What file formats?",a:"We deliver in all formats needed â€” SVG, PNG, PDF, AI, PSD, and more."},{q:"Do you do motion graphics?",a:"Yes! We create animated logos, social media content, and video intros."}]},{icon:"ðŸ’¼",name:"Branding",desc:"Complete brand identity systems that make your business unforgettable and build lasting connections with your audience.",benefits:["Logo Design","Brand Guidelines","Color Palettes","Typography","Brand Strategy"],tech:["Figma","Illustrator","InDesign","Photoshop"],price:"From $2,000",faq:[{q:"What does branding include?",a:"Logo, color palette, typography, brand guidelines, stationery, and social media kit."},{q:"How long does branding take?",a:"A complete branding project typically takes 2-4 weeks."}]},{icon:"ðŸ¤–",name:"AI Solutions",desc:"Leverage artificial intelligence to automate processes, gain insights, and create intelligent experiences for your users.",benefits:["Chatbots","Data Analytics","Automation","ML Models","NLP Integration"],tech:["Python","TensorFlow","OpenAI","LangChain","AWS"],price:"From $5,000",faq:[{q:"What kind of AI solutions?",a:"Chatbots, recommendation engines, data analytics, process automation, and custom ML models."},{q:"Do you train custom models?",a:"Yes, we build and train custom models tailored to your specific business needs."}]},{icon:"ðŸ“ˆ",name:"Digital Marketing",desc:"Data-driven marketing strategies that grow your online presence, drive traffic, and increase conversions.",benefits:["SEO","Social Media","PPC Campaigns","Content Strategy","Email Marketing"],tech:["Google Ads","Meta Ads","Ahrefs","HubSpot","Mailchimp"],price:"From $800/mo",faq:[{q:"How soon will I see results?",a:"SEO takes 3-6 months; paid campaigns can show results within the first week."},{q:"Do you provide reports?",a:"Yes, detailed monthly reports with KPIs, insights, and recommendations."}]}].map((t,a)=>Oe(t)).join("")}
      </div>
    </section>

    <section class="section cta-section" style="background:var(--bg-secondary);">
      <div class="cta-glow"></div>
      <div class="container">
        <div class="cta-content reveal">
          <h2 class="cta-title">Ready to Get Started?</h2>
          <p class="cta-subtitle">Tell us about your project and we'll provide a free consultation and quote.</p>
          <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>Start Your Project â†’</a>
        </div>
      </div>
    </section>
  `}async function kt(){const e=document.getElementById("services-list-container");if(e)try{const t=await fetch("http://localhost:5000/api/v1/services"),a=await t.json();t.ok&&a.length>0&&(e.innerHTML=a.map((s,i)=>Oe(s,i)).join(""))}catch(t){console.warn("âš ï¸ Could not fetch services from API, falling back to static mock data.",t)}}const St="modulepreload",Et=function(e,t){return new URL(e,t).href},je={},Y=function(t,a,s){let i=Promise.resolve();if(a&&a.length>0){let o=function(p){return Promise.all(p.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};const r=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=o(a.map(p=>{if(p=Et(p,s),p in je)return;je[p]=!0;const u=p.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(!!s)for(let $=r.length-1;$>=0;$--){const A=r[$];if(A.href===p&&(!u||A.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${m}`))return;const b=document.createElement("link");if(b.rel=u?"stylesheet":St,u||(b.as="script"),b.crossOrigin="",b.href=p,c&&b.setAttribute("nonce",c),document.head.appendChild(b),u)return new Promise(($,A)=>{b.addEventListener("load",$),b.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${p}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return i.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})},He=[{title:"Quantum Finance",cat:"Web App",desc:"A cutting-edge fintech platform with real-time analytics, AI-powered insights, and seamless payment processing.",tech:["React","Node.js","AWS"],icon:"ðŸ¦",metrics:"340% conversion increase",color:"#7c5cfc",client:"FinEdge Capital",duration:"3 months",challenge:"Building a real-time trading dashboard that handles 10K+ concurrent users with sub-second latency."},{title:"Verdant Health",cat:"Mobile",desc:"A comprehensive health and wellness app with AI-driven personalized recommendations and telemedicine.",tech:["Flutter","Firebase","TensorFlow"],icon:"ðŸ¥",metrics:"500K+ downloads",color:"#00d4aa",client:"Verdant Health Inc.",duration:"4 months",challenge:"Integrating HIPAA-compliant video calls with AI-powered health assessments."},{title:"Luxe Fashion",cat:"E-Commerce",desc:"Premium fashion e-commerce with AR try-on, personalized styling, and global shipping integration.",tech:["Next.js","Stripe","Sanity"],icon:"ðŸ‘—",metrics:"250% revenue growth",color:"#ff6b9d",client:"Luxe Retail Group",duration:"2.5 months",challenge:"Creating a seamless AR try-on experience that works across all mobile browsers."},{title:"Neural Analytics",cat:"AI",desc:"An intelligent data analytics dashboard with predictive modeling and natural language querying.",tech:["Python","React","TensorFlow"],icon:"ðŸ§ ",metrics:"20hrs/week saved",color:"#ffa94d",client:"NeuralWave AI",duration:"5 months",challenge:"Training custom ML models on proprietary data while maintaining enterprise-grade security."},{title:"Bloom Beauty",cat:"Branding",desc:"Complete brand identity redesign for a luxury beauty brand including logo, packaging, and digital presence.",tech:["Figma","Illustrator","After Effects"],icon:"ðŸŒ¸",metrics:"180% brand awareness",color:"#e879f9",client:"Bloom Beauty Co.",duration:"6 weeks",challenge:"Maintaining brand heritage while creating a modern, Gen-Z appealing identity."},{title:"CloudSync Pro",cat:"Web App",desc:"Enterprise cloud management platform with automated deployment, monitoring, and cost optimization.",tech:["Vue.js","Go","Kubernetes"],icon:"â˜ï¸",metrics:"60% cost reduction",color:"#38bdf8",client:"CloudSync Inc.",duration:"4 months",challenge:"Building a multi-cloud orchestration layer that supports AWS, GCP, and Azure."},{title:"FoodieHub",cat:"Mobile",desc:"Food delivery app with real-time tracking, AI-based recommendations, and social dining features.",tech:["React Native","Node.js","MongoDB"],icon:"ðŸ•",metrics:"1M+ orders/month",color:"#fb923c",client:"FoodieHub Inc.",duration:"3.5 months",challenge:"Implementing real-time GPS tracking with live route optimization for drivers."},{title:"EcoMarket",cat:"E-Commerce",desc:"Sustainable marketplace connecting eco-friendly brands with conscious consumers worldwide.",tech:["Shopify","Next.js","GraphQL"],icon:"ðŸŒ¿",metrics:"400% growth in 6mo",color:"#4ade80",client:"EcoMarket LLC",duration:"2 months",challenge:"Building a carbon footprint calculator integrated into the checkout process."},{title:"PixelForge Studio",cat:"Branding",desc:"Creative agency rebrand with a bold, modern identity system across all touchpoints.",tech:["Figma","Cinema 4D","Photoshop"],icon:"ðŸŽ¨",metrics:"2x client inquiries",color:"#a78bfa",client:"PixelForge Studio",duration:"4 weeks",challenge:"Designing a flexible identity system that works across 50+ brand touchpoints."}];function We(e,t){const a=e.category||e.cat||"Web App",s=e.description||e.desc,i=e.technologies||e.tech||["React","Next.js"],n=e.metrics||"Successful Deployment",o=e.icon||"âœ¦",r=e.color||"#7c5cfc",l=e.coverImage||"",c=l?`<img src="${l}" style="width:100%; height:${180+t%3*40}px; object-fit:cover;" />`:`<div style="height:${180+t%3*40}px;background:linear-gradient(135deg, ${r}22, ${r}11);display:flex;align-items:center;justify-content:center;font-size:4rem;transition:transform 0.5s;">${o}</div>`;return`
    <div class="masonry-item reveal reveal-delay-${t%3+1}" data-category="${a}" onclick="openProjectLightbox(${t})" style="cursor:pointer;">
      <div class="glass-card" style="padding:0;overflow:hidden;">
        ${c}
        <div style="padding:var(--space-6);">
          <div class="portfolio-category">${a}</div>
          <h3 style="font-size:var(--font-size-md);font-weight:700;margin-bottom:var(--space-2);">${e.title||""}</h3>
          <p style="font-size:var(--font-size-sm);color:var(--text-secondary);line-height:var(--line-height-relaxed);margin-bottom:var(--space-4);">${s}</p>
          <div class="portfolio-tech" style="margin-bottom:var(--space-3);">
            ${i.map(p=>`<span class="badge">${p}</span>`).join("")}
          </div>
          <div class="badge-green badge">${n}</div>
        </div>
      </div>
    </div>
  `}function $t(){return`
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
          ${["All","Web App","Mobile","E-Commerce","Branding","AI"].map((t,a)=>`
            <button class="tab-btn ${a===0?"active":""}" onclick="filterPortfolio('${t}')">${t}</button>
          `).join("")}
        </div>

        <div class="masonry-grid" id="portfolio-masonry">
          ${He.map((t,a)=>We(t,a)).join("")}
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div class="lightbox-overlay" id="portfolio-lightbox" onclick="if(event.target===this)closeProjectLightbox()">
      <div class="lightbox-content" id="lightbox-body"></div>
    </div>
  `}async function It(){const e=document.getElementById("portfolio-masonry");if(e)try{const{apiFetch:t}=await Y(async()=>{const{apiFetch:i}=await Promise.resolve().then(()=>G);return{apiFetch:i}},void 0,import.meta.url),a=await t("/portfolio"),s=await a.json();a.ok&&s.length>0&&(e.innerHTML=s.map((i,n)=>We(i,n)).join(""))}catch(t){console.warn("âš ï¸ Could not fetch portfolio from API, falling back to static mock data.",t)}}window.openProjectLightbox=function(e){const t=He[e];if(!t)return;const a=document.getElementById("portfolio-lightbox"),s=document.getElementById("lightbox-body");!a||!s||(s.innerHTML=`
    <button class="lightbox-close" onclick="closeProjectLightbox()">âœ•</button>
    <div class="lightbox-visual" style="background:linear-gradient(135deg, ${t.color}33, ${t.color}11);">
      <span style="font-size:6rem;">${t.icon}</span>
    </div>
    <div class="lightbox-header">
      <div class="portfolio-category" style="margin-bottom:var(--space-2);">${t.cat}</div>
      <h2 style="font-size:var(--font-size-2xl);font-weight:800;margin-bottom:var(--space-3);">${t.title}</h2>
      <p style="color:var(--text-secondary);line-height:var(--line-height-relaxed);">${t.desc}</p>
    </div>
    <div class="lightbox-tech">
      ${t.tech.map(i=>`<span class="badge">${i}</span>`).join("")}
    </div>
    <div class="lightbox-stats">
      <div class="lightbox-stat">
        <div class="lightbox-stat-value gradient-text">${t.metrics}</div>
        <div class="lightbox-stat-label">Key Result</div>
      </div>
      <div class="lightbox-stat">
        <div class="lightbox-stat-value" style="color:var(--accent-secondary);">${t.duration||"3 months"}</div>
        <div class="lightbox-stat-label">Duration</div>
      </div>
      <div class="lightbox-stat">
        <div class="lightbox-stat-value" style="color:var(--accent-warm);">${t.client||"Enterprise"}</div>
        <div class="lightbox-stat-label">Client</div>
      </div>
    </div>
    ${t.challenge?`
      <div style="padding:var(--space-6);background:var(--bg-glass);border:1px solid var(--bg-glass-border);border-radius:var(--radius-lg);margin-bottom:var(--space-6);">
        <h4 style="font-weight:700;margin-bottom:var(--space-2);font-size:var(--font-size-sm);">ðŸ’¡ The Challenge</h4>
        <p style="color:var(--text-secondary);font-size:var(--font-size-sm);line-height:var(--line-height-relaxed);">${t.challenge}</p>
      </div>
    `:""}
    <div style="text-align:center;">
      <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>Start a Similar Project â†’</a>
    </div>
  `,a.classList.add("active"),document.body.style.overflow="hidden")};window.closeProjectLightbox=function(){const e=document.getElementById("portfolio-lightbox");e&&e.classList.remove("active"),document.body.style.overflow=""};document.addEventListener("keydown",e=>{e.key==="Escape"&&window.closeProjectLightbox()});window.filterPortfolio=function(e){const t=document.querySelectorAll(".masonry-item");document.querySelectorAll(".tab-btn").forEach(s=>s.classList.toggle("active",s.textContent===e)),t.forEach(s=>{const i=e==="All"||s.dataset.category===e;s.style.display=i?"":"none",i&&(s.style.animation="scaleIn 0.4s ease forwards")})};function Tt(){return`
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Get in Touch</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Contact <span class="gradient-text">Us</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Have a question or want to start a project? We'd love to hear from you.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="reveal">
            <h2 style="font-size:var(--font-size-2xl);font-weight:800;margin-bottom:var(--space-6);">Send Us a Message</h2>
            <form id="contact-form" onsubmit="handleContactSubmit(event)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
                <div class="form-group">
                  <label class="form-label">Full Name *</label>
                  <input type="text" class="form-input" placeholder="Your name" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" class="form-input" placeholder="your@email.com" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" class="form-input" placeholder="How can we help?" required />
              </div>
              <div class="form-group">
                <label class="form-label">Message *</label>
                <textarea class="form-textarea form-input" placeholder="Tell us about your project..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-large btn-shimmer" style="width:100%;justify-content:center;">
                Send Message
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </div>

          <div class="reveal reveal-delay-2">
            <div class="contact-info-cards">
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">📧</div>
                <div class="contact-info-label">Email</div>
                <div class="contact-info-value">hello@nexus.agency</div>
              </div>
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">📞</div>
                <div class="contact-info-label">Phone</div>
                <div class="contact-info-value">+1 (234) 567-890</div>
              </div>
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">📍</div>
                <div class="contact-info-label">Location</div>
                <div class="contact-info-value">San Francisco, CA</div>
              </div>
              <div class="glass-card contact-info-card">
                <div class="contact-info-icon">🕐</div>
                <div class="contact-info-label">Hours</div>
                <div class="contact-info-value">Mon–Fri, 9am–6pm</div>
              </div>
            </div>

            <!-- Animated Map -->
            <div class="contact-map-animated">
              <div class="map-grid"></div>
              <div class="map-pin">
                <div class="map-pin-ring"></div>
                <div class="map-pin-icon">📍</div>
                <div class="map-pin-label">San Francisco, CA</div>
              </div>
            </div>

            <div style="margin-top:var(--space-6);">
              <h4 style="font-size:var(--font-size-sm);font-weight:700;margin-bottom:var(--space-4);">Follow Us</h4>
              <div style="display:flex;gap:var(--space-3);">
                <a href="#" class="social-link" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="Dribbble">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32M8.56 2.75c4.37 6 6.56 12.3 7.1 19.36"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}window.handleContactSubmit=async function(e){e.preventDefault();const t=e.target,a=t.querySelectorAll("input, textarea"),s=a[0].value,i=a[1].value,n=a[2].value,o=a[3].value,r=t.querySelector('button[type="submit"]'),l=r.innerHTML;r.innerHTML='<span style="animation:spin 1s linear infinite;display:inline-block;">⏳</span> Sending...',r.disabled=!0;try{if(!(await fetch("http://localhost:5000/api/v1/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s,email:i,subject:n,message:o})})).ok)throw new Error;t.innerHTML=`
      <div style="text-align:center;padding:var(--space-12) 0;">
        <div style="font-size:4rem;margin-bottom:var(--space-4);animation:bounceIn 0.6s ease;">✅</div>
        <h3 style="font-size:var(--font-size-xl);margin-bottom:var(--space-3);">Message Sent!</h3>
        <p style="color:var(--text-secondary);">Thank you, ${s}. We'll get back to you within 24 hours.</p>
      </div>
    `,window.showToast&&window.showToast("Message sent successfully! 🎉")}catch{r.innerHTML=l,r.disabled=!1,window.showToast&&window.showToast("Failed to send. Please try again.","error")}};function Ct(){}function At(){return`
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
          ${[{name:"General",icon:"ðŸ“‹",faqs:[{q:"What services does Nexus Agency offer?",a:"We offer a comprehensive range of digital services including web development, mobile app development, e-commerce solutions, UI/UX design, graphic design, branding, AI solutions, and digital marketing."},{q:"How do I start a project with Nexus?",a:`Simply fill out our "Start Your Project" form or contact us directly. We'll schedule a free consultation to discuss your needs and provide a detailed proposal.`},{q:"Do you work with international clients?",a:"Absolutely! We work with clients worldwide. Our team collaborates across time zones to ensure smooth communication and project delivery."}]},{name:"Pricing",icon:"ðŸ’°",faqs:[{q:"How much does a website cost?",a:"Website costs vary based on complexity and features. Simple landing pages start at $1,500, while complex web applications can range from $5,000 to $50,000+. Contact us for a free quote."},{q:"What payment methods do you accept?",a:"We accept bank transfers, credit cards, PayPal, and cryptocurrency. We offer flexible payment plans for larger projects â€” typically 50% upfront and 50% upon completion."},{q:"Is there a refund policy?",a:"We offer a satisfaction guarantee. If you're not happy with the initial concept, we'll refund your deposit minus any work already completed. Detailed terms are in our contract."}]},{name:"Process",icon:"ðŸ”„",faqs:[{q:"What is your development process?",a:"We follow an agile methodology: Discovery â†’ Planning â†’ Design â†’ Development â†’ Testing â†’ Launch â†’ Support. You'll be involved at every stage with regular updates and checkpoints."},{q:"How long does a typical project take?",a:"Timelines vary: Landing pages (1-2 weeks), websites (2-6 weeks), mobile apps (4-12 weeks), complex platforms (3-6 months). We'll provide a detailed timeline during the proposal phase."},{q:"How many revisions are included?",a:"Our standard packages include 3-5 revision rounds per design phase. Additional revisions can be arranged at an hourly rate."}]},{name:"Support",icon:"ðŸ›¡ï¸",faqs:[{q:"Do you offer post-launch support?",a:"Yes! We offer ongoing maintenance packages that include bug fixes, security updates, content updates, performance monitoring, and priority support."},{q:"What if something breaks after launch?",a:"All our projects come with a 30-day warranty period for bug fixes. After that, our maintenance plans cover ongoing support starting at $200/month."},{q:"Can I update content myself?",a:"Absolutely! We build with user-friendly CMS solutions and provide training. You'll be able to update text, images, products, and blog posts easily."}]},{name:"Technical",icon:"âš™ï¸",faqs:[{q:"What technologies do you use?",a:"We use modern, industry-standard technologies: React, Next.js, Vue, Node.js, Python, Flutter, React Native, and more. We choose the best stack based on your project's specific needs."},{q:"Will my website be mobile-responsive?",a:"Every project we deliver is fully responsive and tested across all devices and browsers. Mobile-first design is a core part of our process."},{q:"Do you handle SEO?",a:"Yes, we implement technical SEO best practices on every project. We also offer ongoing SEO services and content marketing as part of our digital marketing packages."}]}].map((t,a)=>`
            <div class="reveal faq-category-group" style="margin-bottom:var(--space-12);">
              <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);display:flex;align-items:center;gap:var(--space-3);">
                <span style="font-size:1.5rem;">${t.icon}</span>
                <span class="badge">${t.name}</span>
              </h2>
              ${t.faqs.map(s=>`
                <div class="accordion-item faq-item" data-question="${s.q.toLowerCase()}" data-answer="${s.a.toLowerCase()}" onclick="this.classList.toggle('active');const b=this.querySelector('.accordion-body');b.style.maxHeight=this.classList.contains('active')?b.scrollHeight+'px':'0'">
                  <div class="accordion-header">
                    <span>${s.q}</span>
                    <span class="accordion-icon">â–¼</span>
                  </div>
                  <div class="accordion-body">
                    <div class="accordion-body-inner">${s.a}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          `).join("")}
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
  `}window.filterFAQ=function(e){const t=e.toLowerCase().trim(),a=document.querySelectorAll(".faq-item"),s=document.querySelectorAll(".faq-category-group"),i=document.getElementById("faq-no-results");let n=0;a.forEach(o=>{const r=o.dataset.question||"",l=o.dataset.answer||"",c=!t||r.includes(t)||l.includes(t);o.style.display=c?"":"none",c&&n++}),s.forEach(o=>{const r=o.querySelectorAll('.faq-item:not([style*="display: none"])');o.style.display=r.length>0?"":"none"}),i&&(i.style.display=n===0?"":"none")};function jt(){if(!localStorage.getItem("accessToken"))return`
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
            <div style="font-size:3.5rem; margin-bottom: var(--space-4);">ðŸ”’</div>
            <h2 style="font-size: var(--font-size-xl); font-weight:800; margin-bottom: var(--space-2);">Authentication Required</h2>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">Please sign in or register a workspace account to submit project proposals and track development.</p>
            <a href="./auth" class="btn btn-primary" data-link>Sign In / Register</a>
          </div>
        </div>
      </section>
    `;const t=JSON.parse(localStorage.getItem("user")||"{}");return`
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
            ${Array.from({length:8},(a,s)=>`<div class="step-dot ${s===0?"active":""}" data-step="${s}"></div>`).join("")}
          </div>

          <!-- Step 1: Personal Info -->
          <div class="step-panel active" data-panel="0">
            <h2 class="step-title">Personal Information</h2>
            <p class="step-subtitle">Verify your contact details.</p>
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="form-name" value="${t.name||""}" disabled />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" id="form-email" value="${t.email||""}" disabled />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-input" id="form-phone" value="${t.phone||""}" disabled />
            </div>
            <div class="step-buttons">
              <div></div>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†’</button>
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
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†’</button>
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
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†’</button>
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
                ${["Modern & Minimal","Bold & Colorful","Corporate & Professional","Elegant & Luxury"].map(a=>`
                  <div class="radio-option" onclick="selectRadio(this)">
                    <div class="radio-dot"></div>
                    <span>${a}</span>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Reference Websites</label>
              <textarea class="form-textarea form-input" id="form-references" placeholder="Share URLs of websites you like..." style="min-height:80px;"></textarea>
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†’</button>
            </div>
          </div>

          <!-- Step 5: Budget -->
          <div class="step-panel" data-panel="4">
            <h2 class="step-title">Budget Range</h2>
            <p class="step-subtitle">Select your approximate budget range.</p>
            <div class="radio-group" id="form-budget-group" style="grid-template-columns:1fr;">
              ${["Under $500","$500 â€” $1,000","$1,000 â€” $5,000","$5,000 â€” $10,000","$10,000+"].map(a=>`
                <div class="radio-option" onclick="selectRadio(this)">
                  <div class="radio-dot"></div>
                  <span>${a}</span>
                </div>
              `).join("")}
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†’</button>
            </div>
          </div>

          <!-- Step 6: Timeline -->
          <div class="step-panel" data-panel="5">
            <h2 class="step-title">Timeline</h2>
            <p class="step-subtitle">When do you need the project completed?</p>
            <div class="radio-group" id="form-timeline-group">
              ${["ASAP","1 Month","2 Months","Flexible"].map(a=>`
                <div class="radio-option" onclick="selectRadio(this)">
                  <div class="radio-dot"></div>
                  <span>${a}</span>
                </div>
              `).join("")}
            </div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†’</button>
            </div>
          </div>

          <!-- Step 7: File Upload -->
          <div class="step-panel" data-panel="6">
            <h2 class="step-title">File Uploads</h2>
            <p class="step-subtitle">Attach any relevant files (logos, documents, references).</p>
            <div class="file-upload-area" onclick="document.getElementById('file-input').click()">
              <div class="file-upload-icon">ðŸ“</div>
              <div class="file-upload-text">Click or drag files here to upload</div>
              <div class="file-upload-hint">Supports: Images, PDFs, Word, ZIP (Max 10MB each)</div>
              <input type="file" id="file-input" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.zip" style="display:none" onchange="handleStepFileChange(this)" />
            </div>
            <div id="file-list" style="margin-top:var(--space-4);"></div>
            <div class="step-buttons">
              <button class="btn btn-secondary" onclick="prevStep()">â† Back</button>
              <button class="btn btn-primary" onclick="nextStep()">Next Step â†’</button>
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
  `}let S=0;function zt(){S=0,window.nextStep=function(){const e=document.querySelectorAll(".step-panel"),t=document.querySelectorAll(".step-dot");S<7&&(e[S].classList.remove("active"),t[S].classList.remove("active"),t[S].classList.add("completed"),S++,e[S].classList.add("active"),t[S].classList.add("active"),window.scrollTo({top:400,behavior:"smooth"}))},window.prevStep=function(){const e=document.querySelectorAll(".step-panel"),t=document.querySelectorAll(".step-dot");S>0&&(e[S].classList.remove("active"),t[S].classList.remove("active"),S--,e[S].classList.add("active"),t[S].classList.add("active"),t[S].classList.remove("completed"),window.scrollTo({top:400,behavior:"smooth"}))},window.selectRadio=function(e){e.closest(".radio-group").querySelectorAll(".radio-option").forEach(t=>t.classList.remove("selected")),e.classList.add("selected")},window.handleStepFileChange=function(e){const t=document.getElementById("file-list");!t||!e.files||(t.innerHTML=Array.from(e.files).map(a=>`
      <div style="background:rgba(255,255,255,0.02); padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm); margin-bottom:var(--space-2); font-size:var(--font-size-xs);">
        ðŸ“„ ${a.name} (${(a.size/1024).toFixed(1)} KB)
      </div>
    `).join(""))},window.submitProject=async function(){if(!localStorage.getItem("accessToken"))return;const t=document.getElementById("form-type").value;if(!t){alert("Please select a project type.");return}const a=`${t} Development`,s=document.getElementById("form-business").value,i=document.getElementById("form-industry").value,n=document.getElementById("form-country").value,o=document.getElementById("form-desc").value,r=document.getElementById("form-audience").value,l=document.getElementById("form-features").value,c=document.getElementById("form-colors").value,p=document.querySelector("#form-style-group .radio-option.selected span"),u=p?p.textContent:"",m=document.getElementById("form-references").value,h=document.querySelector("#form-budget-group .radio-option.selected span"),b=h?h.textContent:"Flexible",$=document.querySelector("#form-timeline-group .radio-option.selected span"),A=$?$.textContent:"Flexible",V=document.getElementById("form-notes").value,Z=`
Business: ${s}
Industry: ${i}
Country: ${n}

Project Description:
${o}

Target Audience:
${r}

Key Features:
${l}

Preferred Style: ${u}
References:
${m}

Notes:
${V}
`.trim();try{const{apiFetch:I}=await Y(async()=>{const{apiFetch:g}=await Promise.resolve().then(()=>G);return{apiFetch:g}},void 0,import.meta.url),q=await I("/projects",{method:"POST",body:JSON.stringify({title:a,description:Z,industry:i,budget:b,timeline:A,preferredColors:c})}),F=await q.json();if(!q.ok)throw new Error(F.error||"Failed to submit project proposal.");const N=document.getElementById("file-input"),B=(N==null?void 0:N.files)||[];for(let g=0;g<B.length;g++){const f=new FormData;f.append("file",B[g]),f.append("name",B[g].name),await I(`/projects/${F.id}/files`,{method:"POST",body:f})}const w=document.querySelectorAll(".step-panel"),R=document.querySelectorAll(".step-dot");w[S].classList.remove("active"),R[S].classList.add("completed");const P=document.querySelector('[data-panel="success"]');P&&(P.classList.add("active"),P.style.display="block"),S=0,window.scrollTo({top:400,behavior:"smooth"})}catch(I){alert(`Error submitting project: ${I.message}`)}}}const ze=[{title:"10 Web Design Trends Dominating 2026",cat:"Web Design",excerpt:"Explore the cutting-edge design trends that are shaping the digital landscape this year, from AI-driven interfaces to immersive 3D experiences.",date:"Jun 5, 2026",read:"8 min",icon:"🎨"},{title:"Why Your Brand Needs a Design System",cat:"Branding",excerpt:"A design system is more than a style guide — it's the foundation for scalable, consistent, and efficient product development.",date:"Jun 2, 2026",read:"6 min",icon:"💼"},{title:"SEO in 2026: What Actually Works",cat:"SEO",excerpt:"With AI-powered search reshaping the landscape, here are the strategies that still drive organic traffic and sustainable growth.",date:"May 28, 2026",read:"10 min",icon:"📈"},{title:"Building Accessible Web Applications",cat:"Technology",excerpt:"Accessibility isn't optional — it's essential. Learn how to build inclusive digital products that work for everyone.",date:"May 22, 2026",read:"7 min",icon:"♿"},{title:"The ROI of Premium UX Design",cat:"Business Tips",excerpt:"Investment in UX design delivers measurable returns. Here's how to calculate and maximize your design ROI.",date:"May 18, 2026",read:"5 min",icon:"💰"},{title:"AI-Powered Marketing: A Complete Guide",cat:"Marketing",excerpt:"From predictive analytics to automated content creation — how AI is revolutionizing digital marketing strategies.",date:"May 12, 2026",read:"12 min",icon:"🤖"},{title:"Micro-Animations That Boost Engagement",cat:"Web Design",excerpt:"Subtle animations can dramatically improve user experience. Learn the principles behind effective micro-interactions.",date:"May 8, 2026",read:"6 min",icon:"✨"},{title:"Choosing the Right Tech Stack in 2026",cat:"Technology",excerpt:"React vs Vue vs Svelte? Node.js vs Go? Navigate the complex landscape of modern web development technologies.",date:"May 3, 2026",read:"9 min",icon:"⚙️"},{title:"E-Commerce Conversion Optimization",cat:"Marketing",excerpt:"Proven strategies to turn more visitors into customers, from checkout optimization to personalized experiences.",date:"Apr 28, 2026",read:"8 min",icon:"🛒"}];function _e(e,t){const a=e.category||e.cat||"Technology",s=e.excerpt||(e.content?e.content.slice(0,120)+"...":""),i=e.date||new Date(e.createdAt||Date.now()).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),n=e.read||"5 min",o=e.icon||"📝",r=e.coverImage||"",l=r?`<img src="${r}" style="width:100%; height:200px; object-fit:cover; border-top-left-radius:var(--radius-md); border-top-right-radius:var(--radius-md);" />`:`<div class="blog-card-image-placeholder">${o}</div>`;return`
    <div class="blog-card reveal reveal-delay-${t%3+1}" data-category="${a}">
      ${l}
      <div class="blog-card-body">
        <div class="blog-card-category">${a}</div>
        <h3 class="blog-card-title">${e.title}</h3>
        <p class="blog-card-excerpt">${s}</p>
        <div class="blog-card-meta">
          <span>📅 ${i}</span>
          <span>⏱️ ${n} read</span>
        </div>
      </div>
    </div>
  `}function Pt(e){return`
    <div class="blog-featured reveal" data-category="${e.cat}">
      <div class="blog-featured-image" style="background:linear-gradient(135deg, rgba(124, 92, 252, 0.15), rgba(0, 212, 170, 0.08));display:flex;align-items:center;justify-content:center;">
        <span style="font-size:6rem;">${e.icon}</span>
      </div>
      <div class="blog-featured-content">
        <div class="blog-featured-badge">
          <span class="badge badge-warm">✨ Featured</span>
        </div>
        <h2 class="blog-featured-title">${e.title}</h2>
        <p class="blog-featured-excerpt">${e.excerpt}</p>
        <div class="blog-featured-meta">
          <span>📅 ${e.date}</span>
          <span>⏱️ ${e.read} read</span>
          <span>🏷️ ${e.cat}</span>
        </div>
      </div>
    </div>
  `}function Bt(){const e=["All","Web Design","Branding","Marketing","SEO","Business Tips","Technology"],t=ze[0],a=ze.slice(1);return`
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
        ${Pt(t)}

        <div class="tabs reveal" id="blog-tabs">
          ${e.map((s,i)=>`
            <button class="tab-btn ${i===0?"active":""}" onclick="filterBlog('${s}')">${s}</button>
          `).join("")}
        </div>

        <div class="blog-grid" id="blog-grid">
          ${a.map((s,i)=>_e(s,i)).join("")}
        </div>
      </div>
    </section>
  `}async function Lt(){const e=document.getElementById("blog-grid");if(e)try{const{apiFetch:t}=await Y(async()=>{const{apiFetch:i}=await Promise.resolve().then(()=>G);return{apiFetch:i}},void 0,import.meta.url),a=await t("/blog"),s=await a.json();a.ok&&s.length>0&&(e.innerHTML=s.map((i,n)=>_e(i,n)).join(""))}catch(t){console.warn("⚠️ Could not fetch blogs from API, falling back to static mock data.",t)}}window.filterBlog=function(e){const t=document.querySelectorAll(".blog-card"),a=document.querySelector(".blog-featured");if(document.querySelectorAll("#blog-tabs .tab-btn").forEach(i=>i.classList.toggle("active",i.textContent===e)),t.forEach(i=>{const n=e==="All"||i.dataset.category===e;i.style.display=n?"":"none",n&&(i.style.animation="scaleIn 0.4s ease forwards")}),a){const i=e==="All"||a.dataset.category===e;a.style.display=i?"":"none"}};function Mt(){return`
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Track Your Project</span>
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
            <button class="btn btn-primary" onclick="trackProject()">Track →</button>
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

              ${[{title:"Pending",date:"May 15, 2026",status:"completed"},{title:"Under Review",date:"May 16, 2026",status:"completed"},{title:"Planning",date:"May 18, 2026",status:"completed"},{title:"Designing",date:"May 25, 2026",status:"completed"},{title:"Development",date:"Jun 2, 2026",status:"active"},{title:"Testing",date:"Estimated: Jun 15",status:""},{title:"Completed",date:"Estimated: Jun 20",status:""}].map((e,t)=>`
                <div class="timeline-step ${e.status}">
                  <div class="timeline-dot">
                    ${e.status==="completed"?"✓":e.status==="active"?"◆":t+1}
                  </div>
                  <div class="timeline-content">
                    <div class="timeline-title">${e.title}</div>
                    <div class="timeline-date">${e.date}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
  `}window.trackProject=async function(){const e=document.getElementById("tracker-input"),t=document.getElementById("tracker-result");if(!e||!e.value.trim())return;const a=e.value.trim();if(!localStorage.getItem("accessToken")){alert("Please sign in to track your project.");return}try{const{apiFetch:i}=await Y(async()=>{const{apiFetch:p}=await Promise.resolve().then(()=>G);return{apiFetch:p}},void 0,import.meta.url),n=await i(`/projects/${a}`),o=await n.json();if(!n.ok)throw new Error(o.error||"Project not found.");const r=["PENDING","UNDER_REVIEW","PLANNING","DESIGNING","DEVELOPMENT","TESTING","COMPLETED"],l=r.indexOf(o.status||"PENDING"),c={PENDING:"Pending",UNDER_REVIEW:"Under Review",PLANNING:"Planning",DESIGNING:"Designing",DEVELOPMENT:"Development",TESTING:"Testing",COMPLETED:"Completed"};t.innerHTML=`
      <div class="glass-card reveal" style="max-width:700px;margin:0 auto;padding:var(--space-10);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-8);">
          <div>
            <h3 style="font-size:var(--font-size-xl);font-weight:700;">${o.title}</h3>
            <span style="color:var(--text-tertiary);font-size:var(--font-size-sm);">Project ID: ${o.id}</span>
          </div>
          <span class="badge-green badge" style="font-size:var(--font-size-sm);">${c[o.status]||o.status}</span>
        </div>

        <div class="timeline-tracker">
          <div class="timeline-line"></div>

          ${r.map((p,u)=>{let m="";u<l?m="completed":u===l&&(m="active");const h=c[p],b=u<l?"Completed":u===l?"In Progress":"Pending Stage";return`
              <div class="timeline-step ${m}">
                <div class="timeline-dot">
                  ${m==="completed"?"✓":m==="active"?"◆":u+1}
                </div>
                <div class="timeline-content">
                  <div class="timeline-title">${h}</div>
                  <div class="timeline-date">${b}</div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,t.style.display="block",t.scrollIntoView({behavior:"smooth",block:"start"})}catch(i){alert(`Tracking search failed: ${i.message}`)}};function Dt(){}function Nt(){const e=new Date,t=e.toLocaleString("default",{month:"long"}),a=e.getFullYear(),s=new Date(a,e.getMonth()+1,0).getDate(),i=new Date(a,e.getMonth(),1).getDay();let o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(r=>`<div class="calendar-day calendar-day-header">${r}</div>`).join("");for(let r=0;r<i;r++)o+='<div class="calendar-day disabled"></div>';for(let r=1;r<=s;r++){const l=r<e.getDate(),c=r===e.getDate();o+=`<div class="calendar-day ${l?"disabled":""} ${c?"selected":""}" onclick="selectDay(this, ${r})">${r}</div>`}return`
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Book a Consultation</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Let's <span class="gradient-text">Talk</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Schedule a free consultation to discuss your project.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width:900px;">
        <!-- Meeting Type -->
        <div class="reveal" style="margin-bottom:var(--space-12);">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">Choose Meeting Type</h2>
          <div class="meeting-type-cards">
            ${[{icon:"🎥",name:"Zoom Call",desc:"Video call via Zoom"},{icon:"📹",name:"Google Meet",desc:"Video call via Google Meet"},{icon:"📞",name:"Phone Call",desc:"Traditional phone call"}].map((r,l)=>`
              <div class="glass-card meeting-type-card ${l===0?"selected":""}" onclick="selectMeetingType(this)">
                <div class="meeting-type-icon">${r.icon}</div>
                <h3 style="font-weight:700;margin-bottom:var(--space-1);">${r.name}</h3>
                <p style="font-size:var(--font-size-sm);color:var(--text-secondary);">${r.desc}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Calendar -->
        <div class="reveal" style="margin-bottom:var(--space-12);">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">${t} ${a}</h2>
          <div class="glass-card" style="max-width:500px;margin:0 auto;">
            <div class="calendar-grid">${o}</div>
          </div>
        </div>

        <!-- Time Slots -->
        <div class="reveal" style="margin-bottom:var(--space-12);">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">Available Times</h2>
          <div class="time-slots" style="max-width:500px;margin:0 auto;">
            ${["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"].map((r,l)=>`
              <div class="time-slot ${l===2?"selected":""}" onclick="selectTimeSlot(this)">${r}</div>
            `).join("")}
          </div>
        </div>

        <!-- Contact Info -->
        <div class="reveal" style="max-width:500px;margin:0 auto;">
          <h2 style="font-size:var(--font-size-xl);font-weight:700;margin-bottom:var(--space-6);text-align:center;">Your Details</h2>
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-input" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label class="form-label">Email *</label>
            <input type="email" class="form-input" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label class="form-label">What would you like to discuss?</label>
            <textarea class="form-textarea form-input" placeholder="Brief description..." style="min-height:80px;"></textarea>
          </div>
          <button class="btn btn-primary btn-large btn-shimmer" style="width:100%;justify-content:center;" onclick="bookConsultation()">
            Book Consultation →
          </button>
        </div>

        <div id="booking-success" style="display:none;text-align:center;padding:var(--space-16) 0;">
          <div style="font-size:5rem;margin-bottom:var(--space-4);">📅</div>
          <h2 style="font-size:var(--font-size-2xl);font-weight:800;margin-bottom:var(--space-3);">Booked!</h2>
          <p style="color:var(--text-secondary);">You'll receive a confirmation email with meeting details shortly.</p>
        </div>
      </div>
    </section>
  `}window.selectDay=function(e,t){document.querySelectorAll(".calendar-day:not(.calendar-day-header):not(.disabled)").forEach(a=>a.classList.remove("selected")),e.classList.add("selected")};window.selectTimeSlot=function(e){document.querySelectorAll(".time-slot").forEach(t=>t.classList.remove("selected")),e.classList.add("selected")};window.selectMeetingType=function(e){document.querySelectorAll(".meeting-type-card").forEach(t=>t.classList.remove("selected")),e.classList.add("selected")};window.bookConsultation=function(){document.getElementById("booking-success").style.display="block",document.getElementById("booking-success").scrollIntoView({behavior:"smooth"})};const J=[{name:"Sarah Johnson",company:"TechVentures Inc.",initials:"SJ",rating:5,text:"Nexus transformed our online presence completely. The attention to detail and the quality of design exceeded our expectations. Our conversion rate increased by 340% within the first month. Truly world-class work!",verified:!0},{name:"Michael Chen",company:"GrowthLab",initials:"MC",rating:5,text:"Working with Nexus was the best investment we made for our startup. They delivered a beautiful, fast, and scalable platform that our users absolutely love. The communication was excellent throughout.",verified:!0},{name:"Emma Williams",company:"Luxe Retail",initials:"EW",rating:5,text:"The e-commerce platform they built for us is stunning. Sales increased 250% after launch. The team is professional, responsive, and truly cares about results.",verified:!0},{name:"David Park",company:"NeuralWave AI",initials:"DP",rating:5,text:"Their AI expertise is exceptional. They built a custom analytics dashboard that saves our team 20+ hours per week. Design is world-class and code quality is impeccable.",verified:!0},{name:"Lisa Zhang",company:"Bloom Beauty",initials:"LZ",rating:5,text:"From branding to website to mobile app — Nexus handled everything flawlessly. True partners who understand business needs and translate them into beautiful products.",verified:!0},{name:"James Miller",company:"FinEdge Capital",initials:"JM",rating:4,text:"Great work on our fintech platform. The design is sleek and modern. Development was mostly on time with some minor delays, but the final product exceeded expectations.",verified:!0},{name:"Anna Kowalski",company:"EcoMarket",initials:"AK",rating:5,text:"The team delivered an incredible sustainable marketplace platform. The UX research they conducted was thorough, and it shows in the final product. Highly recommend!",verified:!0},{name:"Robert Singh",company:"CloudSync Pro",initials:"RS",rating:5,text:"Enterprise-grade quality at a fair price. Our cloud management dashboard is fast, reliable, and our team loves using it. Outstanding technical execution.",verified:!0}];function Ue(e,t){var c,p;const a=e.name||((c=e.user)==null?void 0:c.name)||"Nexus Client",s=e.initials||a.split(" ").map(u=>u[0]).join("").slice(0,2).toUpperCase(),i=e.company||(((p=e.user)==null?void 0:p.role)==="ADMIN"?"Nexus Team":"Nexus Partner"),n=e.verified!==void 0?e.verified:!0,o=e.rating||5,r=e.comment||e.text||"",l=["var(--gradient-primary)","var(--gradient-secondary)","linear-gradient(135deg, #38bdf8, #22d3ee)","linear-gradient(135deg, #a78bfa, #7c5cfc)"];return`
    <div class="glass-card review-card reveal reveal-delay-${t%3+1}">
      <div class="review-header">
        <div class="review-author">
          <div class="review-avatar" style="background:${l[t%l.length]};">${s}</div>
          <div>
            <div style="font-weight:700;">${a}</div>
            <div style="font-size:var(--font-size-xs);color:var(--text-tertiary);">${i}</div>
            ${n?'<div class="review-verified">✓ Verified Client</div>':""}
          </div>
        </div>
        <div class="stars">${"★".repeat(o)}${"☆".repeat(5-o)}</div>
      </div>
      <p class="review-text">${r}</p>
    </div>
  `}function qt(e){const t=[0,0,0,0,0];e.forEach(s=>{const i=s.rating||5;i>=1&&i<=5&&t[i-1]++});const a=e.length;return`
    <div class="glass-card" style="padding:var(--space-6);">
      <h4 style="font-weight:700;margin-bottom:var(--space-4);font-size:var(--font-size-sm);">Rating Distribution</h4>
      <div class="rating-breakdown">
        ${[5,4,3,2,1].map(s=>{const i=t[s-1],n=a>0?i/a*100:0;return`
            <div class="rating-bar-row">
              <span class="rating-bar-label">${s}★</span>
              <div class="rating-bar-track">
                <div class="rating-bar-fill" style="width:${n}%;"></div>
              </div>
              <span class="rating-bar-count">${i}</span>
            </div>
          `}).join("")}
      </div>
    </div>
  `}function Ft(){return`
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
            <div style="font-size:var(--font-size-3xl);font-weight:900;color:var(--accent-warm);">${(J.reduce((t,a)=>t+a.rating,0)/J.length).toFixed(1)}</div>
            <div class="stars" style="justify-content:center;margin:var(--space-2) 0;">
              ${"★".repeat(5)}
            </div>
            <div style="font-size:var(--font-size-sm);color:var(--text-secondary);">Average Rating</div>
          </div>
          <div class="glass-card" style="text-align:center;padding:var(--space-6);">
            <div style="font-size:var(--font-size-3xl);font-weight:900;" class="gradient-text">${J.length}</div>
            <div style="font-size:var(--font-size-sm);color:var(--text-secondary);margin-top:var(--space-2);">Total Reviews</div>
          </div>
          <div class="glass-card" style="text-align:center;padding:var(--space-6);">
            <div style="font-size:var(--font-size-3xl);font-weight:900;color:var(--accent-secondary);">100%</div>
            <div style="font-size:var(--font-size-sm);color:var(--text-secondary);margin-top:var(--space-2);">Would Recommend</div>
          </div>
          ${qt(J)}
        </div>

        <!-- Reviews grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(350px, 1fr));gap:var(--space-6);" id="reviews-list-grid">
          ${J.map((t,a)=>Ue(t,a)).join("")}
        </div>
      </div>
    </section>

    <!-- Client submission portal -->
    <section class="section" id="write-review-section">
      <div class="container" id="write-review-container" style="max-width: 600px;"></div>
    </section>
  `}async function Rt(){const e=document.getElementById("reviews-list-grid"),t=document.getElementById("write-review-container");if(!e)return;localStorage.getItem("accessToken")&&t&&(t.innerHTML=`
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
    `,window.handleReviewSubmit=async function(s){s.preventDefault();const i=parseInt(document.getElementById("review-rating").value,10),n=document.getElementById("review-comment").value;try{const{apiFetch:o}=await Y(async()=>{const{apiFetch:l}=await Promise.resolve().then(()=>G);return{apiFetch:l}},void 0,import.meta.url);if(!(await o("/reviews",{method:"POST",body:JSON.stringify({rating:i,comment:n})})).ok)throw new Error;window.showToast&&window.showToast("Review submitted! Awaiting approval. 🎉"),s.target.reset()}catch{window.showToast&&window.showToast("Failed to submit review.","error")}});try{const{apiFetch:s}=await Y(async()=>{const{apiFetch:o}=await Promise.resolve().then(()=>G);return{apiFetch:o}},void 0,import.meta.url),i=await s("/reviews"),n=await i.json();i.ok&&n.length>0&&(e.innerHTML=n.map((o,r)=>Ue(o,r)).join(""))}catch(s){console.warn("⚠️ Could not fetch reviews from API, falling back to static mock data.",s)}}function Ot(){return`
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
              ${[{label:"Landing Page",value:1500},{label:"Business Website",value:3e3},{label:"E-Commerce Store",value:5e3},{label:"Web Application",value:8e3},{label:"Mobile App",value:1e4},{label:"Full Platform",value:2e4}].map((e,t)=>`
                <div class="radio-option ${t===0?"selected":""}" data-value="${e.value}" onclick="selectEstOption(this, 'est-type')">
                  <div class="radio-dot"></div>
                  <span>${e.label}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Features -->
          <div style="margin-bottom:var(--space-8);">
            <h3 style="font-weight:700;margin-bottom:var(--space-4);">2. Additional Features</h3>
            <div class="radio-group" id="est-features" style="grid-template-columns:1fr;">
              ${[{label:"User Authentication",value:500},{label:"Payment Integration",value:800},{label:"Admin Dashboard",value:1500},{label:"Chat / Messaging",value:1e3},{label:"AI / ML Integration",value:3e3},{label:"API Development",value:1200},{label:"Multi-language Support",value:600},{label:"Analytics Dashboard",value:800}].map(e=>`
                <div class="radio-option" data-value="${e.value}" onclick="toggleEstFeature(this)" style="cursor:pointer;">
                  <div style="width:18px;height:18px;border-radius:4px;border:2px solid var(--text-muted);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;transition:all 0.2s;" class="est-check"></div>
                  <span>${e.label}</span>
                  <span style="margin-left:auto;color:var(--text-tertiary);font-size:var(--font-size-sm);">+$${e.value.toLocaleString()}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Timeline -->
          <div style="margin-bottom:var(--space-8);">
            <h3 style="font-weight:700;margin-bottom:var(--space-4);">3. Timeline</h3>
            <div class="radio-group" id="est-timeline">
              ${[{label:"Rush (1-2 weeks)",multiplier:1.5},{label:"Standard (1-2 months)",multiplier:1},{label:"Relaxed (3+ months)",multiplier:.9}].map((e,t)=>`
                <div class="radio-option ${t===1?"selected":""}" data-multiplier="${e.multiplier}" onclick="selectEstOption(this, 'est-timeline')">
                  <div class="radio-dot"></div>
                  <span>${e.label}</span>
                  ${e.multiplier!==1?`<span style="margin-left:auto;font-size:var(--font-size-xs);color:${e.multiplier>1?"var(--accent-tertiary)":"var(--accent-secondary)"};">${e.multiplier>1?"+50%":"-10%"}</span>`:""}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Design -->
          <div style="margin-bottom:var(--space-10);">
            <h3 style="font-weight:700;margin-bottom:var(--space-4);">4. Design Level</h3>
            <div class="radio-group" id="est-design">
              ${[{label:"Standard Design",value:0},{label:"Premium Design",value:2e3},{label:"Ultra-Premium / Custom",value:5e3}].map((e,t)=>`
                <div class="radio-option ${t===0?"selected":""}" data-value="${e.value}" onclick="selectEstOption(this, 'est-design')">
                  <div class="radio-dot"></div>
                  <span>${e.label}</span>
                  ${e.value>0?`<span style="margin-left:auto;color:var(--text-tertiary);font-size:var(--font-size-sm);">+$${e.value.toLocaleString()}</span>`:""}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Result -->
          <div style="text-align:center;padding:var(--space-8);background:rgba(var(--accent-primary-rgb),0.05);border-radius:var(--radius-xl);border:1px solid rgba(var(--accent-primary-rgb),0.15);">
            <div style="font-size:var(--font-size-sm);color:var(--text-tertiary);margin-bottom:var(--space-2);">Estimated Project Cost</div>
            <div id="estimate-result" style="font-size:var(--font-size-4xl);font-weight:900;" class="gradient-text">$1,500</div>
            <div style="font-size:var(--font-size-xs);color:var(--text-muted);margin-top:var(--space-2);">This is an estimate. Final pricing may vary.</div>
          </div>

          <div style="text-align:center;margin-top:var(--space-8);">
            <a href="./start-project" class="btn btn-primary btn-large btn-shimmer" data-link>Start Your Project â†’</a>
          </div>
        </div>
      </div>
    </section>
  `}window.selectEstOption=function(e,t){document.querySelectorAll(`#${t} .radio-option`).forEach(a=>a.classList.remove("selected")),e.classList.add("selected"),Ye()};window.toggleEstFeature=function(e){e.classList.toggle("selected");const t=e.querySelector(".est-check");t&&(e.classList.contains("selected")?(t.textContent="âœ“",t.style.borderColor="var(--accent-primary)",t.style.background="var(--accent-primary)",t.style.color="white"):(t.textContent="",t.style.borderColor="var(--text-muted)",t.style.background="transparent"),Ye())};function Ye(){let e=0;const t=document.querySelector("#est-type .radio-option.selected");t&&(e+=parseInt(t.dataset.value||"0")),document.querySelectorAll("#est-features .radio-option.selected").forEach(n=>{e+=parseInt(n.dataset.value||"0")});const a=document.querySelector("#est-design .radio-option.selected");a&&(e+=parseInt(a.dataset.value||"0"));const s=document.querySelector("#est-timeline .radio-option.selected");s&&(e=Math.round(e*parseFloat(s.dataset.multiplier||"1")));const i=document.getElementById("estimate-result");i&&(i.textContent="$"+e.toLocaleString())}const le={},Ht="http://localhost:5000/api/v1",y=typeof import.meta<"u"&&(le==null?void 0:le.VITE_API_BASE)||Ht,Ge=y.replace(/\/api\/v1$/,"");async function Wt(){const e=localStorage.getItem("refreshToken");if(!e)return null;try{const t=await fetch(`${y}/auth/refresh`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:e})});if(!t.ok)throw new Error("Refresh failed");const a=await t.json(),s=a.accessToken||a.token;return s&&localStorage.setItem("accessToken",s),a.refreshToken&&localStorage.setItem("refreshToken",a.refreshToken),s}catch{return localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),null}}async function j(e,t={}){const a=e.startsWith("http")?e:`${y}${e.startsWith("/")?e:"/"+e}`;t.headers={...t.headers},t.body&&!(t.body instanceof FormData)&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/json");const s=localStorage.getItem("accessToken");s&&(t.headers.Authorization=`Bearer ${s}`);let i=await fetch(a,t);if(i.status===401&&s){const n=await Wt();n?(t.headers.Authorization=`Bearer ${n}`,i=await fetch(a,t)):(localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),window.history.pushState({},"","/auth"),window.dispatchEvent(new PopStateEvent("popstate")))}return i}const G=Object.freeze(Object.defineProperty({__proto__:null,API_BASE:y,SOCKET_URL:Ge,apiFetch:j},Symbol.toStringTag,{value:"Module"}));function E(e,t,a){e&&(e.textContent=a,e.style.display="block",t==="success"?(e.style.background="rgba(0, 212, 170, 0.15)",e.style.border="1px solid var(--accent-secondary)",e.style.color="var(--accent-secondary)"):t==="error"?(e.style.background="rgba(255, 107, 157, 0.15)",e.style.border="1px solid var(--accent-tertiary)",e.style.color="var(--accent-tertiary)"):(e.style.background="rgba(124, 92, 252, 0.15)",e.style.border="1px solid var(--accent-primary)",e.style.color="var(--accent-primary)"))}function Pe(){return`
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container">
          <span class="section-label reveal">✦ Access Portal</span>
          <h1 class="section-title reveal reveal-delay-1" style="font-size:var(--font-size-hero);">Client <span class="gradient-text">Portal</span></h1>
          <p class="section-subtitle reveal reveal-delay-2" style="margin:0 auto;">Sign in to track projects, manage deliverables, and chat with your team.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 500px;">
        <div class="glass-card reveal" style="padding: var(--space-8);">
          <div class="tabs" style="margin-bottom: var(--space-6);">
            <button class="tab-btn active" id="tab-login" data-auth-tab="login">Sign In</button>
            <button class="tab-btn" id="tab-register" data-auth-tab="register">Register</button>
          </div>

          <!-- Alert Container -->
          <div id="auth-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--font-size-sm);"></div>

          <!-- Login Form -->
          <form id="login-form">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="login-email" class="form-input" placeholder="you@example.com" required />
            </div>
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-1);">
                <label class="form-label" style="margin: 0;">Password</label>
                <a href="#" class="gradient-text" style="font-size: var(--font-size-xs);" id="forgot-password-link">Forgot Password?</a>
              </div>
              <input type="password" id="login-password" class="form-input" placeholder="••••••••" required />
            </div>
            <div class="form-group" style="display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-3);">
              <input type="checkbox" id="login-remember" />
              <label for="login-remember" style="font-size: var(--font-size-sm); color: var(--text-secondary); cursor: pointer;">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary btn-large btn-shimmer" style="width: 100%; justify-content: center; margin-top: var(--space-4);">
              Sign In →
            </button>
          </form>

          <!-- Register Form -->
          <form id="register-form" style="display: none;">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" id="register-name" class="form-input" placeholder="John Doe" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input type="email" id="register-email" class="form-input" placeholder="john@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" id="register-phone" class="form-input" placeholder="+1 (555) 019-2834" />
            </div>
            <div class="form-group">
              <label class="form-label">Password * (Min 8 chars, with uppercase, lowercase & number)</label>
              <input type="password" id="register-password" class="form-input" placeholder="••••••••" required minlength="8" />
            </div>
            <button type="submit" class="btn btn-primary btn-large btn-shimmer" style="width: 100%; justify-content: center; margin-top: var(--space-4);">
              Create Account →
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Forgot Password Modal -->
    <div id="forgot-password-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: var(--z-modal); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
      <div class="glass-card" style="width: 90%; max-width: 400px; padding: var(--space-8); position: relative;">
        <button id="forgot-modal-close" style="position: absolute; top: var(--space-4); right: var(--space-4); background: none; border: none; color: var(--text-secondary); font-size: var(--font-size-lg); cursor: pointer;">✕</button>
        <h3 style="font-size: var(--font-size-xl); font-weight: 800; margin-bottom: var(--space-2);">Reset Password</h3>
        <p style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-6);">Enter your email address and we'll send you a password reset link.</p>
        
        <div id="forgot-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--font-size-sm);"></div>
        
        <form id="forgot-form">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="forgot-email" class="form-input" placeholder="you@example.com" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: var(--space-2);">Send Reset Link</button>
        </form>
      </div>
    </div>

    <!-- Reset Password Modal (Triggered if ?token= is in URL) -->
    <div id="reset-password-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: var(--z-modal); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
      <div class="glass-card" style="width: 90%; max-width: 400px; padding: var(--space-8); position: relative;">
        <h3 style="font-size: var(--font-size-xl); font-weight: 800; margin-bottom: var(--space-2);">Set New Password</h3>
        <p style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-6);">Create a secure new password for your account.</p>
        
        <div id="reset-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--font-size-sm);"></div>
        
        <form id="reset-form">
          <div class="form-group">
            <label class="form-label">New Password * (Min 8 chars)</label>
            <input type="password" id="reset-password-input" class="form-input" placeholder="••••••••" required minlength="8" />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: var(--space-2);">Update Password</button>
        </form>
      </div>
    </div>
  `}function Be(){const e=new URLSearchParams(window.location.search),t=e.get("token"),a=e.get("mode");t&&(a==="verify"?Kt(t):setTimeout(()=>{Yt(t)},100)),document.querySelectorAll("[data-auth-tab]").forEach(c=>{c.addEventListener("click",()=>{he(c.getAttribute("data-auth-tab"))})});const s=document.getElementById("forgot-password-link");s&&s.addEventListener("click",c=>{c.preventDefault(),_t()});const i=document.getElementById("forgot-modal-close");i&&i.addEventListener("click",Ut);const n=document.getElementById("login-form");n&&n.addEventListener("submit",Gt);const o=document.getElementById("register-form");o&&o.addEventListener("submit",Vt);const r=document.getElementById("forgot-form");r&&r.addEventListener("submit",Jt);const l=document.getElementById("reset-form");l&&l.addEventListener("submit",Xt)}function he(e){const t=document.getElementById("login-form"),a=document.getElementById("register-form"),s=document.getElementById("tab-login"),i=document.getElementById("tab-register"),n=document.getElementById("auth-alert");n&&(n.style.display="none"),e==="login"?(t.style.display="block",a.style.display="none",s.classList.add("active"),i.classList.remove("active")):(t.style.display="none",a.style.display="block",s.classList.remove("active"),i.classList.add("active"))}function _t(){const e=document.getElementById("forgot-password-modal");e.style.display="flex",setTimeout(()=>{e.style.opacity="1",e.style.pointerEvents="all"},10)}function Ut(){const e=document.getElementById("forgot-password-modal");e.style.opacity="0",e.style.pointerEvents="none",setTimeout(()=>{e.style.display="none"},300)}function Yt(e){const t=document.getElementById("reset-password-modal");t.style.display="flex",t.dataset.token=e,setTimeout(()=>{t.style.opacity="1",t.style.pointerEvents="all"},10)}async function Gt(e){e.preventDefault();const t=document.getElementById("login-email").value,a=document.getElementById("login-password").value,s=document.getElementById("login-remember").checked,i=document.getElementById("auth-alert");try{const n=await j("/auth/login",{method:"POST",body:JSON.stringify({email:t,password:a,rememberMe:s})}),o=await n.json();if(!n.ok)throw new Error(o.error||o.message||"Authentication failed");const r=o.accessToken||o.token,l=o.refreshToken;r&&localStorage.setItem("accessToken",r),l&&localStorage.setItem("refreshToken",l),localStorage.setItem("user",JSON.stringify(o.user)),E(i,"success","Login successful! Redirecting..."),setTimeout(()=>{const c=o.user.role==="ADMIN"?"/admin/dashboard":"/dashboard";window.history.pushState({},"",c),window.dispatchEvent(new PopStateEvent("popstate")),window.dispatchEvent(new Event("authChange"))},1e3)}catch(n){E(i,"error",n.message)}}async function Vt(e){e.preventDefault();const t=document.getElementById("register-name").value,a=document.getElementById("register-email").value,s=document.getElementById("register-phone").value,i=document.getElementById("register-password").value,n=document.getElementById("auth-alert");try{const o=await j("/auth/register",{method:"POST",body:JSON.stringify({name:t,email:a,phone:s,password:i})}),r=await o.json();if(!o.ok)throw new Error(r.error||r.message||"Registration failed");E(n,"success","Account created successfully! Check your email for verification. You can sign in now."),setTimeout(()=>{he("login")},3e3)}catch(o){E(n,"error",o.message)}}async function Jt(e){e.preventDefault();const t=document.getElementById("forgot-email").value,a=document.getElementById("forgot-alert");try{const s=await j("/auth/forgot-password",{method:"POST",body:JSON.stringify({email:t})}),i=await s.json();if(!s.ok)throw new Error(i.error||i.message||"Failed to send reset link.");E(a,"success","Password reset email sent. Please check your inbox."),e.target.reset()}catch(s){E(a,"error",s.message)}}async function Xt(e){e.preventDefault();const t=document.getElementById("reset-password-input").value,a=document.getElementById("reset-password-modal"),s=a.dataset.token,i=document.getElementById("reset-alert");try{const n=await j("/auth/reset-password",{method:"POST",body:JSON.stringify({token:s,password:t})}),o=await n.json();if(!n.ok)throw new Error(o.error||o.message||"Failed to reset password.");E(i,"success","Password reset successful! Redirecting to sign in..."),setTimeout(()=>{a.style.opacity="0",a.style.pointerEvents="none",setTimeout(()=>{a.style.display="none",he("login")},300)},2e3)}catch(n){E(i,"error",n.message)}}async function Kt(e){const t=document.getElementById("auth-alert");try{const a=await j(`/auth/verify-email?token=${e}`),s=await a.json();if(!a.ok)throw new Error(s.error||s.message||"Verification failed.");E(t,"success","Email verified successfully! You can now log in.")}catch(a){E(t,"error",`Email verification failed: ${a.message}`)}}let k=null,T=null;function C(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Le(){const e=localStorage.getItem("user");if(!e)return`
      <section class="section" style="padding-top:12rem; text-align:center;">
        <div class="container" style="max-width: 500px;">
          <div class="glass-card reveal" style="padding:var(--space-10);">
            <div style="font-size:4rem; margin-bottom:var(--space-4);">ðŸ”’</div>
            <h2 style="font-size:var(--font-size-2xl); font-weight:800; margin-bottom:var(--space-2);">Access Denied</h2>
            <p style="color:var(--text-secondary); margin-bottom:var(--space-6);">You must be logged in to access the dashboard portal.</p>
            <a href="./auth" class="btn btn-primary" data-link>Sign In</a>
          </div>
        </div>
      </section>
    `;const t=JSON.parse(e),a=t.role==="ADMIN";return`
    <section class="page-hero" style="padding: 10rem 0 3rem 0;">
      <div class="page-hero-bg"></div>
      <div class="page-hero-content">
        <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-4);">
          <div>
            <span class="section-label">âœ¦ Workspace</span>
            <h1 class="section-title" style="font-size:var(--font-size-3xl); margin-bottom:0;">Welcome back, <span class="gradient-text">${t.name}</span></h1>
            <p style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">${a?"Nexus Administrator Console":"Nexus Client Portal"}</p>
          </div>
          <button class="btn btn-secondary" onclick="handleLogout()" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary);">Sign Out</button>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: var(--space-4);">
      <div class="container">
        <div style="display:grid; grid-template-columns: 240px 1fr; gap:var(--space-8); align-items:start;" class="dashboard-grid">
          
          <!-- Sidebar Navigation -->
          <div class="glass-card" style="padding:var(--space-4); display:flex; flex-direction:column; gap:var(--space-2);">
            <button class="tab-btn active" id="btn-tab-overview" onclick="switchDashboardTab('overview')" style="width:100%; text-align:left; justify-content:flex-start;">ðŸ“Š Overview</button>
            <button class="tab-btn" id="btn-tab-projects" onclick="switchDashboardTab('projects')" style="width:100%; text-align:left; justify-content:flex-start;">ðŸ“ Projects</button>
            <button class="tab-btn" id="btn-tab-chat" onclick="switchDashboardTab('chat')" style="width:100%; text-align:left; justify-content:flex-start;">ðŸ’¬ Support Chat</button>
            ${a?`
              <button class="tab-btn" id="btn-tab-cms" onclick="switchDashboardTab('cms')" style="width:100%; text-align:left; justify-content:flex-start;">âš™ï¸ CMS Manager</button>
              <button class="tab-btn" id="btn-tab-clients" onclick="switchDashboardTab('clients')" style="width:100%; text-align:left; justify-content:flex-start;">ðŸ‘¥ Clients</button>
              <button class="tab-btn" id="btn-tab-logs" onclick="switchDashboardTab('logs')" style="width:100%; text-align:left; justify-content:flex-start;">ðŸ“œ Audit Logs</button>
            `:`
              <button class="tab-btn" id="btn-tab-notifications" onclick="switchDashboardTab('notifications')" style="width:100%; text-align:left; justify-content:flex-start;">ðŸ”” Notifications <span class="badge" id="noti-unread-count" style="display:none; background:var(--accent-tertiary); margin-left:var(--space-2);">0</span></button>
            `}
            <button class="tab-btn" id="btn-tab-settings" onclick="switchDashboardTab('settings')" style="width:100%; text-align:left; justify-content:flex-start;">ðŸ”’ Account</button>
          </div>

          <!-- Content Panel -->
          <div class="dashboard-content-panel">
            <div id="db-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); margin-bottom: var(--space-6); font-size: var(--font-size-sm);"></div>

            <!-- Tab: Overview -->
            <div class="db-tab-content" id="tab-content-overview">
              <div id="overview-loading" class="loader-spinner">Loading metrics...</div>
              <div id="overview-content" style="display:none;"></div>
            </div>

            <!-- Tab: Projects -->
            <div class="db-tab-content" id="tab-content-projects" style="display:none;">
              <div id="projects-loading" class="loader-spinner">Loading projects...</div>
              <div id="projects-content" style="display:none;"></div>
            </div>

            <!-- Tab: Chat -->
            <div class="db-tab-content" id="tab-content-chat" style="display:none;">
              <div class="glass-card" style="padding:0; overflow:hidden; display:grid; grid-template-columns: ${a?"280px 1fr":"1fr"}; height:600px;">
                ${a?`
                  <div style="border-right:1px solid var(--border-subtle); display:flex; flex-direction:column;">
                    <div style="padding:var(--space-4); font-weight:700; border-bottom:1px solid var(--border-subtle);">Client Channels</div>
                    <div id="chat-channels-list" style="overflow-y:auto; flex:1;">
                      <div style="padding:var(--space-4); color:var(--text-tertiary); text-align:center;">No active channels.</div>
                    </div>
                  </div>
                `:""}
                <div style="display:flex; flex-direction:column; height:100%;">
                  <!-- Chat Header -->
                  <div style="padding:var(--space-4); border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.01);">
                    <div style="display:flex; align-items:center; gap:var(--space-2);">
                      <div style="width:10px; height:10px; border-radius:50%; background:var(--accent-secondary);" id="chat-status-dot"></div>
                      <span style="font-weight:700;" id="chat-header-title">${a?"Select a channel":"Nexus Concierge support"}</span>
                      <span id="chat-typing-indicator" style="display:none; font-size:var(--font-size-xs); color:var(--text-tertiary); margin-left:var(--space-2);">typing...</span>
                    </div>
                  </div>
                  <!-- Chat Messages -->
                  <div id="chat-messages-container" style="flex:1; overflow-y:auto; padding:var(--space-6); display:flex; flex-direction:column; gap:var(--space-4); background:rgba(0,0,0,0.15);"></div>
                  <!-- Chat Input -->
                  <form id="chat-input-form" onsubmit="handleSendDashboardMessage(event)" style="padding:var(--space-4); border-top:1px solid var(--border-subtle); display:flex; gap:var(--space-3); background:var(--bg-secondary);">
                    <input type="text" id="chat-msg-input" placeholder="Type your message..." class="form-input" style="flex:1;" oninput="emitTypingState()" />
                    <button type="submit" class="btn btn-primary">Send</button>
                  </form>
                </div>
              </div>
            </div>

            <!-- Tab: CMS (Admin only) -->
            ${a?`
              <div class="db-tab-content" id="tab-content-cms" style="display:none;">
                <div class="tabs" style="margin-bottom: var(--space-4); overflow-x:auto;">
                  <button class="tab-btn active" id="btn-cms-services" onclick="switchCMSTab('services')">ðŸ’¼ Services</button>
                  <button class="tab-btn" id="btn-cms-portfolio" onclick="switchCMSTab('portfolio')">ðŸŽ¨ Portfolio</button>
                  <button class="tab-btn" id="btn-cms-blog" onclick="switchCMSTab('blog')">ðŸ“ Blog</button>
                  <button class="tab-btn" id="btn-cms-reviews" onclick="switchCMSTab('reviews')">â­ Reviews</button>
                  <button class="tab-btn" id="btn-cms-contacts" onclick="switchCMSTab('contacts')">ðŸ“§ Contact Requests</button>
                </div>
                <div id="cms-editor-content"></div>
              </div>
              
              <div class="db-tab-content" id="tab-content-clients" style="display:none;">
                <div style="display:flex; flex-direction:column; gap:var(--space-4);">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-3);">
                    <div>
                      <h3 style="font-weight:800; font-size:var(--font-size-xl); margin:0;">Client Directory</h3>
                      <p style="color:var(--text-secondary); margin-top:var(--space-2); font-size:var(--font-size-sm);">Quickly view and manage your active customers, contact details, and project status.</p>
                    </div>
                    <button class="btn btn-secondary" onclick="loadClientDirectory()" style="padding:var(--space-2) var(--space-4);">Refresh</button>
                  </div>
                  <div style="display:grid; grid-template-columns: 1fr 320px; gap:var(--space-4); align-items:start;">
                    <div class="glass-card" style="padding:var(--space-4); min-height: 360px;" id="client-directory-list">Loading clients...</div>
                    <div class="glass-card" style="padding:var(--space-4); min-height: 360px;" id="client-directory-detail">
                      <div style="color:var(--text-secondary);">Select a customer to view their profile and recent activity.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="db-tab-content" id="tab-content-logs" style="display:none;">
                <h3 style="font-weight:800; font-size:var(--font-size-xl); margin-bottom:var(--space-4);">System Audit Log</h3>
                <div class="glass-card" style="padding:0; overflow:hidden;">
                  <table style="width:100%; border-collapse:collapse; font-size:var(--font-size-sm); text-align:left;">
                    <thead>
                      <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(255,255,255,0.02);">
                        <th style="padding:var(--space-3);">Timestamp</th>
                        <th style="padding:var(--space-3);">User ID</th>
                        <th style="padding:var(--space-3);">Action</th>
                        <th style="padding:var(--space-3);">Details</th>
                      </tr>
                    </thead>
                    <tbody id="logs-table-body"></tbody>
                  </table>
                </div>
              </div>
            `:`
              <!-- Tab: Notifications (Client only) -->
              <div class="db-tab-content" id="tab-content-notifications" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
                  <h3 style="font-weight:800; font-size:var(--font-size-xl); margin:0;">Notifications</h3>
                  <button class="btn btn-secondary" onclick="markAllNotificationsRead()" style="padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">Mark all as read</button>
                </div>
                <div id="notifications-list" style="display:flex; flex-direction:column; gap:var(--space-3);"></div>
              </div>
            `}

            <!-- Tab: Settings -->
            <div class="db-tab-content" id="tab-content-settings" style="display:none;">
              <h3 style="font-weight:800; font-size:var(--font-size-xl); margin-bottom:var(--space-6);">Change Password</h3>
              <form id="change-pwd-form" onsubmit="handleChangePasswordSubmit(event)" style="max-width:400px;">
                <div class="form-group">
                  <label class="form-label">Current Password</label>
                  <input type="password" id="change-pwd-current" class="form-input" required />
                </div>
                <div class="form-group">
                  <label class="form-label">New Password (Min 6 chars)</label>
                  <input type="password" id="change-pwd-new" class="form-input" required minlength="6" />
                </div>
                <button type="submit" class="btn btn-primary" style="margin-top:var(--space-2);">Update Password</button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  `}function Me(){const e=localStorage.getItem("user");if(!e)return;const t=JSON.parse(e);window.switchDashboardTab("overview"),Qt(t),window.switchDashboardTab=function(a){document.querySelectorAll(".db-tab-content").forEach(n=>n.style.display="none"),document.querySelectorAll(".dashboard-grid .tab-btn").forEach(n=>n.classList.remove("active"));const s=document.getElementById(`tab-content-${a}`),i=document.getElementById(`btn-tab-${a}`);s&&(s.style.display="block"),i&&i.classList.add("active"),a==="overview"&&ea(t),a==="projects"&&ue(t),a==="chat"&&setTimeout(()=>{const n=document.getElementById("chat-messages-container");n&&(n.scrollTop=n.scrollHeight)},50),a==="clients"&&t.role==="ADMIN"&&ta(),a==="cms"&&t.role==="ADMIN"&&window.switchCMSTab("services"),a==="logs"&&t.role==="ADMIN"&&aa(),a==="notifications"&&t.role!=="ADMIN"&&Ke()},window.handleLogout=function(){localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("user"),k&&k.disconnect(),window.history.pushState({},"","/auth"),window.dispatchEvent(new Event("popstate")),window.dispatchEvent(new Event("authChange"))},window.handleChangePasswordSubmit=async function(a){a.preventDefault();const s=document.getElementById("change-pwd-current").value,i=document.getElementById("change-pwd-new").value,n=document.getElementById("db-alert");try{const o=await fetch(`${y}/auth/change-password`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify({currentPassword:s,newPassword:i})}),r=await o.json();if(!o.ok)throw new Error(r.error||"Failed to change password.");E(n,"success","Password updated successfully!"),a.target.reset()}catch(o){E(n,"error",o.message)}}}function Qt(e){const t=localStorage.getItem("accessToken");if(t)if(typeof window.io>"u"){const a=document.createElement("script");a.src="https://cdn.socket.io/4.7.5/socket.io.min.js",a.onload=()=>De(e,t),document.head.appendChild(a)}else De(e,t)}let Ve=[],oe=[];function De(e,t){k||(k=window.io(Ge,{auth:{token:t}}),k.on("connect",()=>{console.log("âš¡ Connected to support WebSocket server.");const a=document.getElementById("chat-status-dot");a&&(a.style.background="var(--accent-secondary)"),e.role==="USER"?Zt():me()}),k.on("online_users",a=>{if(Ve=a,e.role==="ADMIN")ye();else{const s=document.getElementById("chat-status-dot");s&&(s.style.background=a.length>1?"#10B981":"var(--accent-secondary)")}}),k.on("message_received",a=>{if(T&&a.conversationId===T)Xe(a,e.id),k.emit("message_read",{conversationId:T,messageId:a.id});else if(e.role==="ADMIN")me();else{const s=document.getElementById("btn-tab-chat-badge");s&&(s.style.display="inline-block")}}),k.on("user_typing",({conversationId:a,typing:s,userId:i})=>{if(a===T&&i!==e.id){const n=document.getElementById("chat-typing-indicator");n&&(n.style.display=s?"inline":"none")}}),k.on("message_read_receipt",({conversationId:a,userId:s})=>{if(a===T&&s!==e.id){const i=document.getElementById("chat-messages-container");i&&i.querySelectorAll(".msg-status-receipt").forEach(o=>{o.textContent="seen",o.style.color="#10B981"})}}),k.on("disconnect",()=>{const a=document.getElementById("chat-status-dot");a&&(a.style.background="var(--text-muted)")}))}async function Zt(){try{const e=await fetch(`${y}/chat/conversations`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}}),t=await e.json();if(!e.ok)throw new Error(t.error||"Failed to fetch messages.");let a=t[0];a||(a=await(await fetch(`${y}/chat/conversation`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify({})})).json()),a&&(T=a.id,k.emit("join_conversation",{conversationId:a.id}),k.emit("message_read",{conversationId:a.id}),Je(a.id))}catch(e){console.error(e)}}async function me(){if(document.getElementById("chat-channels-list"))try{const t=await fetch(`${y}/chat/conversations`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(oe=await t.json(),!t.ok)throw new Error;ye()}catch(t){console.error(t)}}function ye(){const e=document.getElementById("chat-channels-list");if(e){if(oe.length===0){e.innerHTML='<div style="padding:var(--space-4); color:var(--text-tertiary); text-align:center;">No channels active.</div>';return}e.innerHTML=oe.map(t=>{var c,p;const a=((c=t.messages[t.messages.length-1])==null?void 0:c.content)||((p=t.messages[t.messages.length-1])==null?void 0:p.message)||"No messages yet",s=t.id===T,i=Ve.includes(t.client.id),n=t.client.name.split(" ").map(u=>u[0]).join("").slice(0,2).toUpperCase(),o=t.client.avatar?`<img src="${t.client.avatar}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; display:block;" />`:`<div style="width:36px; height:36px; border-radius:50%; background:var(--accent-primary); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px;">${n}</div>`,r=new Date(t.updatedAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),l=t.unreadCount>0?`<div style="background:var(--accent-secondary); color:white; font-size:10px; font-weight:700; min-width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; padding:0 4px; margin-left:var(--space-2);">${t.unreadCount}</div>`:"";return`
      <div onclick="selectAdminChannel('${t.id}', '${t.client.name}')" class="chat-channel-item" 
           style="display:flex; align-items:center; gap:var(--space-3); padding:var(--space-4); border-bottom:1px solid var(--border-subtle); cursor:pointer; background:${s?"rgba(255,255,255,0.05)":"none"}; position:relative;">
        <div style="position:relative;">
          ${o}
          <div style="width:10px; height:10px; border-radius:50%; border:2px solid var(--bg-primary); background:${i?"#10B981":"#6B7280"}; position:absolute; bottom:0; right:0;"></div>
        </div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
            <span style="font-weight:700; font-size:var(--font-size-sm); color:var(--text-primary);">${t.client.name}</span>
            <span style="font-size:10px; color:var(--text-tertiary);">${r}</span>
          </div>
          <div style="font-size:var(--font-size-xs); color:var(--text-secondary); text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">
            ${a}
          </div>
        </div>
        <div>
          ${l}
        </div>
      </div>
    `}).join("")}}window.selectAdminChannel=function(e,t){T=e,document.getElementById("chat-header-title").textContent=`Chat with ${t}`,k.emit("join_conversation",{conversationId:e}),k.emit("message_read",{conversationId:e});const a=oe.find(s=>s.id===e);a&&(a.unreadCount=0),Je(e),ye()};async function Je(e){const t=document.getElementById("chat-messages-container");if(!t)return;const a=JSON.parse(localStorage.getItem("user"));try{const s=await fetch(`${y}/chat/${e}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}}),i=await s.json();if(!s.ok)throw new Error;t.innerHTML=i.map(n=>{const o=n.senderId===a.id,r=n.attachmentUrl||n.attachment&&n.attachment.url||n.attachment,l=n.content||n.message||"File";let c="";r?r.match(/\.(jpeg|jpg|gif|png)/i)||n.attachment&&n.attachment.isImage?c=`<img src="${r}" style="max-width:240px; max-height:240px; border-radius:var(--radius-sm); margin-top:var(--space-2); display:block;" alt="${l}" />`:c=`
            <div style="display:flex; align-items:center; gap:var(--space-2); padding:var(--space-2); background:rgba(255,255,255,0.05); border-radius:var(--radius-sm); margin-top:var(--space-2);">
              <span>ðŸ“„</span>
              <span style="font-size:var(--font-size-xs); color:white; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">${l}</span>
              <a href="${r}" download target="_blank" style="color:var(--accent-primary); text-decoration:none;">â¬‡ï¸</a>
            </div>
          `:c=`<div>${C(n.content||n.message||"")}</div>`;let p="";return o&&(n.seen?p='<span class="msg-status-receipt" style="font-size:9px; color:#10B981; margin-left:4px;">seen</span>':n.delivered?p='<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">delivered</span>':p='<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">sent</span>'),`
        <div style="align-self: ${o?"flex-end":"flex-start"}; max-width: 70%; display: flex; flex-direction: column; align-items: ${o?"flex-end":"flex-start"};">
          <div style="background: ${o?"var(--accent-primary)":"rgba(255,255,255,0.05)"}; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-size-sm); border-top-${o?"right":"left"}-radius: 0;">
            ${c}
          </div>
          <div style="display:flex; align-items:center; margin-top: var(--space-1);">
            <span style="font-size: 10px; color: var(--text-tertiary);">${new Date(n.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
            ${p}
          </div>
        </div>
      `}).join(""),t.scrollTop=t.scrollHeight}catch(s){console.error(s)}}function Xe(e,t){const a=document.getElementById("chat-messages-container");if(!a)return;const s=e.senderId===t,i=document.createElement("div");i.style.alignSelf=s?"flex-end":"flex-start",i.style.maxWidth="70%",i.style.display="flex",i.style.flexDirection="column",i.style.alignItems=s?"flex-end":"flex-start";const n=e.attachmentUrl||e.attachment&&e.attachment.url||e.attachment,o=e.content||e.message||"File";let r="";n?n.match(/\.(jpeg|jpg|gif|png)/i)||e.attachment&&e.attachment.isImage?r=`<img src="${n}" style="max-width:240px; max-height:240px; border-radius:var(--radius-sm); margin-top:var(--space-2); display:block;" alt="${o}" />`:r=`
        <div style="display:flex; align-items:center; gap:var(--space-2); padding:var(--space-2); background:rgba(255,255,255,0.05); border-radius:var(--radius-sm); margin-top:var(--space-2);">
          <span>ðŸ“„</span>
          <span style="font-size:var(--font-size-xs); color:white; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">${o}</span>
          <a href="${n}" download target="_blank" style="color:var(--accent-primary); text-decoration:none;">â¬‡ï¸</a>
        </div>
      `:r=`<div>${C(e.content||e.message||"")}</div>`;let l="";s&&(e.seen?l='<span class="msg-status-receipt" style="font-size:9px; color:#10B981; margin-left:4px;">seen</span>':e.delivered?l='<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">delivered</span>':l='<span class="msg-status-receipt" style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">sent</span>'),i.innerHTML=`
    <div style="background: ${s?"var(--accent-primary)":"rgba(255,255,255,0.05)"}; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-size-sm); border-top-${s?"right":"left"}-radius: 0;">
      ${r}
    </div>
    <div style="display:flex; align-items:center; margin-top: var(--space-1);">
      <span style="font-size: 10px; color: var(--text-tertiary);">${new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
      ${l}
    </div>
  `,a.appendChild(i),a.scrollTop=a.scrollHeight}let ce=null;window.emitTypingState=function(){!k||!T||(ce&&clearTimeout(ce),k.emit("typing_state",{conversationId:T,typing:!0}),ce=setTimeout(()=>{k.emit("typing_state",{conversationId:T,typing:!1})},2e3))};window.handleSendDashboardMessage=async function(e){e.preventDefault();const t=document.getElementById("chat-msg-input"),a=t.value.trim();if(!(!a||!T))try{const s=await fetch(`${y}/chat/send`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify({conversationId:T,message:a})}),i=await s.json();if(!s.ok)throw new Error;t.value="",k.emit("typing_state",{conversationId:T,typing:!1});const n=JSON.parse(localStorage.getItem("user"));Xe(i,n.id),n.role==="ADMIN"&&me()}catch(s){console.error(s)}};async function ea(e){const t=document.getElementById("overview-loading"),a=document.getElementById("overview-content");if(!(!t||!a))try{if(e.role==="ADMIN"){const s=await j("/admin/analytics"),i=await s.json();if(!s.ok)throw new Error(i.error||"Failed to fetch metrics");const n=i.analytics||i;t.style.display="none",a.style.display="block",a.innerHTML=`
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-4); margin-bottom:var(--space-8);">
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${n.activeProjects??0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Active Projects</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${n.pendingProjects??0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Pending Proposals</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${n.totalClients??0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Total Clients</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2rem; font-weight:900;" class="gradient-text">${n.pendingContactRequests??0}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Inquiries</div>
          </div>
        </div>

        <h3 style="font-weight:800; font-size:var(--font-size-xl); margin-bottom:var(--space-4);">Recent Client Proposals</h3>
        <div id="admin-recent-proposals" style="display:flex; flex-direction:column; gap:var(--space-4);"></div>
      `;const o=await j("/projects"),r=await o.json(),l=Array.isArray(r)?r:r.projects||[];o.ok&&l.length>0?document.getElementById("admin-recent-proposals").innerHTML=l.slice(0,3).map(c=>{var p;return`
          <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-4);">
            <div>
              <div style="font-weight:700;">${C(c.title)}</div>
              <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-top:var(--space-1);">Client: ${C(((p=c.client)==null?void 0:p.name)||"N/A")} | Budget: ${C(c.budget)}</div>
            </div>
            <span class="badge" style="background:var(--bg-tertiary);">${C(c.status)}</span>
          </div>
        `}).join(""):document.getElementById("admin-recent-proposals").innerHTML='<div style="color:var(--text-tertiary);">No proposals submitted yet.</div>'}else{t.style.display="none",a.style.display="block";const s=await j("/projects"),i=await s.json();if(!s.ok)throw new Error;const n=Array.isArray(i)?i:i.projects||[],o=n.filter(r=>r.status!=="Completed");a.innerHTML=`
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-4); margin-bottom:var(--space-8);">
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2.5rem; font-weight:900; color:var(--accent-primary);">${n.length}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Total Submitted Projects</div>
          </div>
          <div class="glass-card" style="text-align:center;">
            <div style="font-size:2.5rem; font-weight:900; color:var(--accent-secondary);">${o.length}</div>
            <div style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-top:var(--space-1);">Active Projects</div>
          </div>
        </div>

        <div class="glass-card" style="padding:var(--space-6);">
          <h3 style="font-weight:800; font-size:var(--font-size-lg); margin-bottom:var(--space-2);">Welcome to your Workspace</h3>
          <p style="color:var(--text-secondary); font-size:var(--font-size-sm); line-height:var(--line-height-relaxed);">
            Track progress of your requested proposals, chat with the development leads, upload design mockups or source specifications, and download product prototypes straight from the "Projects" and "Support Chat" tabs.
          </p>
        </div>
      `}}catch(s){t.textContent=`Error loading overview: ${s.message}`}}async function ue(e){const t=document.getElementById("projects-loading"),a=document.getElementById("projects-content");if(!(!t||!a))try{const s=await j("/projects"),i=await s.json();if(!s.ok)throw new Error(i.error||"Failed to load projects");const n=Array.isArray(i)?i:i.projects||[];if(t.style.display="none",a.style.display="block",n.length===0){a.innerHTML=`<div style="text-align:center; padding:var(--space-12); color:var(--text-secondary);">
        No projects found. Ready to kickstart your next build? <a href="./start-project" class="gradient-text" data-link>Start your project proposal â†’</a>
      </div>`;return}a.innerHTML=n.map(o=>{var r;return`
      <div class="glass-card" style="margin-bottom:var(--space-6); padding:var(--space-6);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-4); margin-bottom:var(--space-4);">
          <div>
            <h3 style="font-weight:800; font-size:var(--font-size-lg); margin:0;">${o.title}</h3>
            <span style="font-size:var(--font-size-xs); color:var(--text-secondary);">ID: ${o.id}</span>
          </div>
          <div style="display:flex; align-items:center; gap:var(--space-2); flex-wrap:wrap;">
            ${e.role==="ADMIN"?`
              <select class="form-select form-input" style="padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);" onchange="updateProjectStatusDirect('${o.id}', this.value)">
                ${["Under Review","Approved","Discovery","Design","Development","Testing","Completed","Cancelled"].map(l=>`
                  <option value="${l}" ${o.status===l?"selected":""}>${l}</option>
                `).join("")}
              </select>
              <button class="btn btn-secondary" onclick="showCustomerDetails('${((r=o.client)==null?void 0:r.id)||""}')" style="padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">View Client</button>
              <button class="btn btn-secondary" onclick="deleteProjectDirect('${o.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">Delete</button>
            `:`
              <span class="badge badge-green">${o.status}</span>
            `}
          </div>
        </div>

        <p style="color:var(--text-secondary); font-size:var(--font-size-sm); margin-bottom:var(--space-4);">${o.description}</p>
        
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-4); font-size:var(--font-size-xs); color:var(--text-tertiary); margin-bottom:var(--space-6);">
          <div><strong>Industry:</strong> ${o.industry||"General"}</div>
          <div><strong>Budget:</strong> ${o.budget||"N/A"}</div>
          <div><strong>Timeline:</strong> ${o.timeline||"Flexible"}</div>
          <div><strong>Preferred Colors:</strong> ${o.preferredColors||"N/A"}</div>
        </div>

        ${o.aiSummary?`
          <div style="background:rgba(124, 92, 252, 0.05); border-left:3px solid var(--accent-primary); padding:var(--space-3) var(--space-4); border-radius:var(--radius-sm); margin-bottom:var(--space-6);">
            <div style="font-weight:700; color:var(--accent-primary); font-size:var(--font-size-xs); margin-bottom:var(--space-1);">âœ¦ AI Technical Assessment</div>
            <p style="font-size:var(--font-size-sm); color:var(--text-secondary); line-height:var(--line-height-relaxed); margin:0;">${o.aiSummary}</p>
          </div>
        `:""}

        <!-- Files Section -->
        <h4 style="font-size:var(--font-size-sm); font-weight:700; margin-bottom:var(--space-3);">Project Documents & Deliverables</h4>
        <div style="display:flex; flex-direction:column; gap:var(--space-2); margin-bottom:var(--space-4);">
          ${o.files&&o.files.length>0?o.files.map(l=>`
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:var(--space-2) var(--space-4); border-radius:var(--radius-sm); font-size:var(--font-size-xs);">
              <span>ðŸ“„ ${C(l.filename||l.name||"File")}</span>
              <a href="${l.url}" target="_blank" class="gradient-text">Download</a>
            </div>
          `).join(""):'<div style="font-size:var(--font-size-xs); color:var(--text-muted);">No documents uploaded yet.</div>'}
        </div>

        <!-- File Upload Form -->
        <form onsubmit="handleProjectFileUpload(event, '${o.id}')" style="display:flex; gap:var(--space-2); align-items:center;">
          <input type="file" required class="form-input" style="font-size:var(--font-size-xs); flex:1; max-width:300px; padding:var(--space-1);" />
          <button type="submit" class="btn btn-primary" style="padding:var(--space-1) var(--space-4); font-size:var(--font-size-xs);">Upload File</button>
        </form>
      </div>
    `}).join(""),window.updateProjectStatusDirect=async function(o,r){try{if(!(await fetch(`${y}/projects/${o}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify({status:r})})).ok)throw new Error;E(document.getElementById("db-alert"),"success","Project status updated!")}catch{E(document.getElementById("db-alert"),"error","Failed to update project status.")}},window.deleteProjectDirect=async function(o){if(confirm("Are you sure you want to delete this project?"))try{if(!(await fetch(`${y}/projects/${o}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}})).ok)throw new Error;E(document.getElementById("db-alert"),"success","Project deleted!"),ue(e)}catch{E(document.getElementById("db-alert"),"error","Failed to delete project.")}},window.handleProjectFileUpload=async function(o,r){o.preventDefault();const c=o.target.querySelector('input[type="file"]').files[0];if(!c)return;const p=o.target.querySelector("button");p.textContent="Uploading...",p.disabled=!0;const u=new FormData;u.append("file",c),u.append("name",c.name);try{const m=await fetch(`${y}/projects/${r}/files`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:u}),h=await m.json();if(!m.ok)throw new Error(h.error||"Upload failed.");E(document.getElementById("db-alert"),"success","File uploaded successfully!"),ue(e)}catch(m){E(document.getElementById("db-alert"),"error",m.message)}finally{p.textContent="Upload File",p.disabled=!1}}}catch(s){t.textContent=`Error: ${s.message}`}}let se=[];async function ta(){const e=document.getElementById("client-directory-list"),t=document.getElementById("client-directory-detail");if(!(!e||!t)){e.innerHTML='<div class="loader-spinner">Loading clients...</div>',t.innerHTML='<div style="color:var(--text-secondary);">Select a customer to view their profile and project details.</div>';try{const a=await j("/admin/users"),s=await a.json();if(!a.ok)throw new Error(s.error||"Failed to load clients.");if(se=Array.isArray(s.users)?s.users:s.users||[],se.length===0){e.innerHTML='<div style="color:var(--text-secondary);">No customers found yet.</div>';return}e.innerHTML=se.map(i=>`
      <div class="glass-card" style="padding:var(--space-3); margin-bottom:var(--space-2); display:flex; justify-content:space-between; align-items:center; gap:var(--space-3);">
        <div style="min-width:0;">
          <div style="font-weight:700;">${C(i.name||"Unnamed")}</div>
          <div style="font-size:var(--font-size-xs); color:var(--text-secondary);">${C(i.email)}</div>
        </div>
        <button class="btn btn-secondary" onclick="showCustomerDetails('${i.id}')" style="padding:var(--space-1) var(--space-3); font-size:var(--font-size-xs);">Show</button>
      </div>
    `).join("")}catch(a){e.innerHTML=`<div style="color:var(--accent-danger);">${a.message}</div>`,console.error(a)}}}window.showCustomerDetails=function(e){const t=document.getElementById("client-directory-detail");if(!t)return;const a=se.find(s=>s.id===e);if(!a){t.innerHTML='<div style="color:var(--accent-danger);">Customer information not available. Please refresh the directory.</div>';return}t.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:var(--space-3); flex-wrap:wrap;">
      <div>
        <div style="font-size:var(--font-size-xl); font-weight:800;">${C(a.name)}</div>
        <div style="font-size:var(--font-size-sm); color:var(--text-secondary);">${C(a.email)}</div>
      </div>
      <span class="badge" style="background:var(--accent-secondary);">${C(a.role)}</span>
    </div>
    <div style="margin-top:var(--space-4); display:grid; grid-template-columns:1fr; gap:var(--space-3);">
      <div style="background:rgba(255,255,255,0.03); padding:var(--space-3); border-radius:var(--radius-sm);">
        <div style="font-weight:700; margin-bottom:var(--space-1);">Contact</div>
        <div style="font-size:var(--font-size-sm); color:var(--text-secondary);">Phone: ${C(a.phone||"Not provided")}</div>
        <div style="font-size:var(--font-size-sm); color:var(--text-secondary);">Member since: ${new Date(a.createdAt).toLocaleDateString()}</div>
      </div>
      <div style="background:rgba(255,255,255,0.03); padding:var(--space-3); border-radius:var(--radius-sm);">
        <div style="font-weight:700; margin-bottom:var(--space-1);">Quick Actions</div>
        <button class="btn btn-primary" onclick="window.location.href='/dashboard'" style="width:100%; padding:var(--space-2);">View full dashboard</button>
      </div>
    </div>
  `};async function Ke(){const e=document.getElementById("notifications-list");if(e)try{const t=await fetch(`${y}/notifications`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}}),a=await t.json();if(!t.ok)throw new Error;const s=a.filter(n=>!n.read).length,i=document.getElementById("noti-unread-count");if(i&&(i.textContent=s,i.style.display=s>0?"inline":"none"),a.length===0){e.innerHTML='<div style="text-align:center; color:var(--text-tertiary); padding:var(--space-6);">No notifications yet.</div>';return}e.innerHTML=a.map(n=>`
      <div class="glass-card" style="opacity: ${n.read?"0.6":"1"}; border-left: 3px solid ${n.read?"transparent":"var(--accent-secondary)"}; padding:var(--space-3) var(--space-4);">
        <div style="font-weight:700; font-size:var(--font-size-sm);">${n.title}</div>
        <p style="font-size:var(--font-size-xs); color:var(--text-secondary); margin:var(--space-1) 0 0 0;">${n.message}</p>
        <span style="font-size:9px; color:var(--text-tertiary);">${new Date(n.createdAt).toLocaleDateString()}</span>
      </div>
    `).join("")}catch(t){console.error(t)}}window.markAllNotificationsRead=async function(){try{await fetch(`${y}/notifications/read`,{method:"PATCH",headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}}),Ke()}catch(e){console.error(e)}};async function aa(){const e=document.getElementById("logs-table-body");if(e)try{const t=await j("/admin/logs"),a=await t.json();if(!t.ok)throw new Error;const s=Array.isArray(a)?a:a.logs||[];e.innerHTML=s.map(i=>`
      <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:var(--space-2) var(--space-3); color:var(--text-secondary);">${new Date(i.createdAt).toLocaleString()}</td>
        <td style="padding:var(--space-2) var(--space-3); color:var(--text-tertiary);">${i.userId||"SYSTEM"}</td>
        <td style="padding:var(--space-2) var(--space-3); font-weight:700;">${i.action}</td>
        <td style="padding:var(--space-2) var(--space-3); color:var(--text-secondary);">${i.details}</td>
      </tr>
    `).join("")}catch{e.innerHTML='<tr><td colspan="4" style="text-align:center; color:var(--text-tertiary); padding:var(--space-4);">Failed to load audit logs.</td></tr>'}}window.switchCMSTab=async function(e){const t=document.getElementById("cms-editor-content");if(!t)return;document.querySelectorAll("#tab-content-cms .tab-btn").forEach(s=>s.classList.remove("active"));const a=document.getElementById(`btn-cms-${e}`);a&&a.classList.add("active"),t.innerHTML='<div class="loader-spinner">Loading CMS list...</div>';try{const s=await fetch(`${y}/${e==="contacts"?"contact":e}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}}),i=await s.json();if(!s.ok)throw new Error;e==="services"?sa(i,t):e==="portfolio"?ia(i,t):e==="blog"?na(i,t):e==="reviews"?oa(i,t):e==="contacts"&&ra(i,t)}catch{t.innerHTML='<div style="color:var(--text-tertiary);">Failed to load resource list.</div>'}};function sa(e,t){t.innerHTML=`
    <button class="btn btn-primary" onclick="showServiceForm()" style="margin-bottom:var(--space-4);">Add Service</button>
    <div id="service-form-wrapper" style="display:none;" class="glass-card"></div>
    <div style="display:flex; flex-direction:column; gap:var(--space-3); margin-top:var(--space-4);">
      ${e.map(a=>`
        <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) var(--space-4);">
          <div>
            <strong>${a.icon} ${a.title}</strong> - starting price: $${a.startingPrice}
            <div style="font-size:var(--font-size-xs); color:var(--text-secondary);">${a.description}</div>
          </div>
          <button class="btn btn-secondary" onclick="deleteCMSItem('services', '${a.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Delete</button>
        </div>
      `).join("")}
    </div>
  `,window.showServiceForm=()=>{const a=document.getElementById("service-form-wrapper");a.style.display="block",a.innerHTML=`
      <form onsubmit="handleCreateService(event)" style="padding:var(--space-4);">
        <h4 style="margin-top:0;">New Service</h4>
        <div class="form-group"><label class="form-label">Icon (Emoji)</label><input type="text" id="srv-icon" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Title</label><input type="text" id="srv-title" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Description</label><textarea id="srv-desc" class="form-textarea form-input" required></textarea></div>
        <div class="form-group"><label class="form-label">Starting Price ($)</label><input type="number" id="srv-price" class="form-input" required /></div>
        <button type="submit" class="btn btn-primary">Save Service</button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('service-form-wrapper').style.display='none'">Cancel</button>
      </form>
    `},window.handleCreateService=async a=>{a.preventDefault();const s=document.getElementById("srv-icon").value,i=document.getElementById("srv-title").value,n=document.getElementById("srv-desc").value,o=parseFloat(document.getElementById("srv-price").value);try{await fetch(`${y}/services`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify({icon:s,title:i,description:n,startingPrice:o})}),window.switchCMSTab("services")}catch(r){console.error(r)}}}function ia(e,t){t.innerHTML=`
    <button class="btn btn-primary" onclick="showPortfolioForm()" style="margin-bottom:var(--space-4);">Add Portfolio Item</button>
    <div id="portfolio-form-wrapper" style="display:none;" class="glass-card"></div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:var(--space-4); margin-top:var(--space-4);">
      ${e.map(a=>`
        <div class="glass-card" style="padding:var(--space-4); display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <img src="${a.coverImage}" style="width:100%; height:120px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:var(--space-2);" />
            <strong>${a.title}</strong>
            <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-top:var(--space-1);">${a.description}</div>
            <div style="font-size:10px; color:var(--text-tertiary); margin-top:var(--space-2);">Category: ${a.category} | Tech: ${a.technologies.join(", ")}</div>
          </div>
          <button class="btn btn-secondary" onclick="deleteCMSItem('portfolio', '${a.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); margin-top:var(--space-3); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs); width:100%;">Delete</button>
        </div>
      `).join("")}
    </div>
  `,window.showPortfolioForm=()=>{const a=document.getElementById("portfolio-form-wrapper");a.style.display="block",a.innerHTML=`
      <form onsubmit="handleCreatePortfolio(event)" style="padding:var(--space-4);">
        <h4 style="margin-top:0;">New Portfolio Project</h4>
        <div class="form-group"><label class="form-label">Title</label><input type="text" id="port-title" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Description</label><textarea id="port-desc" class="form-textarea form-input" required></textarea></div>
        <div class="form-group"><label class="form-label">Category</label><input type="text" id="port-cat" class="form-input" placeholder="Web App, Mobile, E-Commerce" required /></div>
        <div class="form-group"><label class="form-label">Cover Image URL</label><input type="text" id="port-img" class="form-input" placeholder="https://..." required /></div>
        <div class="form-group"><label class="form-label">Technologies (comma separated)</label><input type="text" id="port-tech" class="form-input" placeholder="Next.js, Tailwind, GraphQL" required /></div>
        <button type="submit" class="btn btn-primary">Save Project</button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('portfolio-form-wrapper').style.display='none'">Cancel</button>
      </form>
    `},window.handleCreatePortfolio=async a=>{a.preventDefault();const s=document.getElementById("port-title").value,i=document.getElementById("port-desc").value,n=document.getElementById("port-cat").value,o=document.getElementById("port-img").value,r=document.getElementById("port-tech").value.split(",").map(l=>l.trim());try{await fetch(`${y}/portfolio`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify({title:s,description:i,category:n,coverImage:o,technologies:r,gallery:[o]})}),window.switchCMSTab("portfolio")}catch(l){console.error(l)}}}function na(e,t){t.innerHTML=`
    <button class="btn btn-primary" onclick="showBlogForm()" style="margin-bottom:var(--space-4);">New Article</button>
    <div id="blog-form-wrapper" style="display:none;" class="glass-card"></div>
    <div style="display:flex; flex-direction:column; gap:var(--space-3); margin-top:var(--space-4);">
      ${e.map(a=>`
        <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) var(--space-4);">
          <div>
            <strong>${a.title}</strong>
            <span class="badge" style="background:${a.published?"rgba(0,212,170,0.1)":"rgba(255,107,157,0.1)"}; margin-left:var(--space-2);">${a.published?"Published":"Draft"}</span>
          </div>
          <button class="btn btn-secondary" onclick="deleteCMSItem('blog', '${a.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Delete</button>
        </div>
      `).join("")}
    </div>
  `,window.showBlogForm=()=>{const a=document.getElementById("blog-form-wrapper");a.style.display="block",a.innerHTML=`
      <form onsubmit="handleCreateBlog(event)" style="padding:var(--space-4);">
        <h4 style="margin-top:0;">New Blog Post</h4>
        <div class="form-group"><label class="form-label">Title</label><input type="text" id="blog-title" class="form-input" required /></div>
        <div class="form-group"><label class="form-label">Excerpt / Short Description</label><textarea id="blog-excerpt" class="form-textarea form-input" required></textarea></div>
        <div class="form-group"><label class="form-label">Full Markdown Content</label><textarea id="blog-content" class="form-textarea form-input" style="min-height:150px;" required></textarea></div>
        <div class="form-group"><label class="form-label">Cover Image URL</label><input type="text" id="blog-img" class="form-input" required /></div>
        <div class="form-group" style="display:flex; align-items:center; gap:var(--space-2);">
          <input type="checkbox" id="blog-pub" /> <label class="form-label" style="margin:0;">Publish immediately</label>
        </div>
        <button type="submit" class="btn btn-primary">Save Post</button>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('blog-form-wrapper').style.display='none'">Cancel</button>
      </form>
    `},window.handleCreateBlog=async a=>{a.preventDefault();const s=document.getElementById("blog-title").value,i=s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),n=document.getElementById("blog-content").value,o=document.getElementById("blog-img").value,r=document.getElementById("blog-pub").checked;try{await fetch(`${y}/blog`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify({title:s,slug:i,content:n,coverImage:o,published:r})}),window.switchCMSTab("blog")}catch(l){console.error(l)}}}function oa(e,t){t.innerHTML=`
    <div style="display:flex; flex-direction:column; gap:var(--space-3);">
      ${e.length===0?'<div style="color:var(--text-tertiary); text-align:center; padding:var(--space-4);">No reviews submitted.</div>':e.map(a=>`
        <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) var(--space-4); opacity:${a.approved?"1":"0.7"};">
          <div>
            <strong>Client ID: ${a.userId}</strong> | Rating: ${"â˜…".repeat(a.rating)}
            <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-top:var(--space-1);">${a.comment}</div>
          </div>
          <div style="display:flex; gap:var(--space-2);">
            ${a.approved?"":`<button class="btn btn-primary" onclick="approveReviewCMS('${a.id}')" style="padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Approve</button>`}
            <button class="btn btn-secondary" onclick="deleteCMSItem('reviews', '${a.id}')" style="border-color:var(--accent-tertiary); color:var(--accent-tertiary); padding:var(--space-1) var(--space-2); font-size:var(--font-size-xs);">Delete</button>
          </div>
        </div>
      `).join("")}
    </div>
  `,window.approveReviewCMS=async a=>{try{await fetch(`${y}/reviews/${a}`,{method:"PATCH",headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}}),window.switchCMSTab("reviews")}catch(s){console.error(s)}}}function ra(e,t){t.innerHTML=`
    <div style="display:flex; flex-direction:column; gap:var(--space-3);">
      ${e.length===0?'<div style="color:var(--text-tertiary); text-align:center; padding:var(--space-4);">No contact requests received.</div>':e.map(a=>`
        <div class="glass-card" style="padding:var(--space-4);">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:var(--font-size-sm); margin-bottom:var(--space-2);">
            <strong>${a.name}</strong>
            <span style="color:var(--text-tertiary); font-size:var(--font-size-xs);">${new Date(a.createdAt).toLocaleString()}</span>
          </div>
          <div style="font-size:var(--font-size-xs); color:var(--text-secondary); margin-bottom:var(--space-2);">Email: ${a.email} | Subject: ${a.subject}</div>
          <p style="font-size:var(--font-size-sm); color:var(--text-primary); margin:0;">${a.message}</p>
        </div>
      `).join("")}
    </div>
  `}window.deleteCMSItem=async function(e,t){if(confirm(`Are you sure you want to delete this ${e} item?`))try{if(!(await fetch(`${y}/${e}/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}})).ok)throw new Error;window.switchCMSTab(e)}catch(a){console.error(a)}};const Ne={"/":{render:dt,init:wt,title:"Nexus Agency â€” Premium Digital Experiences",description:"We design and develop premium digital experiences that help businesses grow."},"/services":{render:xt,init:kt,title:"Services â€” Nexus Agency",description:"End-to-end digital solutions: web development, mobile apps, UI/UX design, branding, AI, and more."},"/portfolio":{render:$t,init:It,title:"Portfolio â€” Nexus Agency",description:"Explore our selected projects showcasing expertise in web, mobile, AI, and branding."},"/contact":{render:Tt,init:Ct,title:"Contact â€” Nexus Agency",description:"Get in touch with our team. We respond within 24 hours."},"/faq":{render:At,title:"FAQ â€” Nexus Agency",description:"Frequently asked questions about our services, pricing, process, and support."},"/start-project":{render:jt,init:zt,title:"Start Your Project â€” Nexus Agency",description:"Tell us about your project and get a free consultation and quote."},"/blog":{render:Bt,init:Lt,title:"Blog â€” Nexus Agency",description:"Tips, trends, and insights from our team of digital experts."},"/tracker":{render:Mt,init:Dt,title:"Project Tracker â€” Nexus Agency",description:"Track the progress of your project in real-time."},"/consultation":{render:Nt,title:"Book Consultation â€” Nexus Agency",description:"Schedule a free consultation to discuss your project needs."},"/reviews":{render:Ft,init:Rt,title:"Client Reviews â€” Nexus Agency",description:"Read what our clients say about working with Nexus Agency."},"/estimator":{render:Ot,title:"Cost Estimator â€” Nexus Agency",description:"Get an instant cost estimate for your project based on your requirements."},"/auth":{render:Pe,init:Be,title:"Sign In / Register â€” Nexus Agency",description:"Sign in to your Nexus account or create a new one."},"/signin":{render:Pe,init:Be,title:"Sign In / Register â€” Nexus Agency",description:"Sign in to your Nexus account."},"/dashboard":{render:Le,init:Me,title:"Dashboard â€” Nexus Agency",protected:!0,description:"Manage your projects, messages, and account."},"/admin/dashboard":{render:Le,init:Me,title:"Admin Console â€” Nexus Agency",admin:!0,description:"Admin console for managing the platform."}};class la{constructor(){Ae(this,"app");this.app=document.getElementById("app")}init(){document.addEventListener("click",t=>{const s=t.target.closest("[data-link]");if(s){t.preventDefault();const i=s.getAttribute("href");i&&this.navigate(i)}}),window.addEventListener("popstate",()=>this.render()),window.addEventListener("hashchange",()=>this.render()),this.render()}getCurrentPath(){const t=window.location.hash;return t.startsWith("#/")?t.slice(1).replace(/\/+$/,"")||"/":window.location.pathname.replace(/\/+$/,"")||"/"}normalizePath(t){if(!t)return"/";let a=t.trim();return a=a.replace(/^\./,""),a=a.replace(/\/+$/,""),a?(a.startsWith("/")||(a="/"+a),a):"/"}navigate(t){const a=this.normalizePath(t.startsWith("#")?t.slice(1):t);this.getCurrentPath()!==a&&window.history.pushState({},"",a),this.render()}async render(){const t=this.getCurrentPath(),a=Ne[t]||Ne["/"],s=localStorage.getItem("user"),i=s?JSON.parse(s):null;if(a.admin&&(!i||i.role!=="ADMIN"))return this.navigate("/signin");if(a.protected&&!i)return this.navigate("/signin");document.title=a.title;const n=document.querySelector('meta[name="description"]');n&&a.description&&n.setAttribute("content",a.description),window.scrollTo({top:0,behavior:"instant"}),document.querySelectorAll(".nav-link").forEach(l=>{const c=l.getAttribute("href")||"",p=this.normalizePath(c.startsWith("#")?c.slice(1):c);l.classList.toggle("active",p===t)});const o=document.getElementById("nav-links"),r=document.getElementById("nav-hamburger");o&&o.classList.remove("active"),r&&r.classList.remove("active"),this.app&&(this.app.classList.remove("page-enter"),this.app.innerHTML=a.render(),this.app.offsetWidth,this.app.classList.add("page-enter")),setTimeout(()=>{nt(),Ea(),a.init&&a.init()},50)}}function ca(){const e=localStorage.getItem("nexus-theme")||"dark";document.documentElement.setAttribute("data-theme",e);const t=document.getElementById("theme-toggle");t&&t.addEventListener("click",()=>{const s=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",s),localStorage.setItem("nexus-theme",s)})}function da(){const e=document.getElementById("cursor"),t=document.getElementById("cursor-follower");if(!e||!t)return;if("ontouchstart"in window){e.style.display="none",t.style.display="none";return}let a=0,s=0,i=0,n=0;document.addEventListener("mousemove",r=>{a=r.clientX,s=r.clientY,e.style.left=a-4+"px",e.style.top=s-4+"px"});function o(){i+=(a-i)*.12,n+=(s-n)*.12,t.style.left=i-18+"px",t.style.top=n-18+"px",requestAnimationFrame(o)}o(),document.addEventListener("mouseover",r=>{const l=r.target;l.closest("a, button, .glass-card, .service-card, .portfolio-card, .blog-card, input, textarea, select, .radio-option, .checkbox-option, .tab-btn, .calendar-day, .time-slot")&&document.body.classList.add("cursor-hover"),l.closest("input, textarea")&&document.body.classList.add("cursor-text")}),document.addEventListener("mouseout",r=>{const l=r.target;l.closest("a, button, .glass-card, .service-card, .portfolio-card, .blog-card, input, textarea, select, .radio-option, .checkbox-option, .tab-btn, .calendar-day, .time-slot")&&document.body.classList.remove("cursor-hover"),l.closest("input, textarea")&&document.body.classList.remove("cursor-text")})}function pa(){const e=document.getElementById("scroll-progress");e&&window.addEventListener("scroll",()=>{const t=document.documentElement.scrollHeight-window.innerHeight,a=window.scrollY/t*100;e.style.width=a+"%"},{passive:!0})}function ma(){const e=document.getElementById("back-to-top");e&&(window.addEventListener("scroll",()=>{e.classList.toggle("visible",window.scrollY>500)},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function ua(){const e=document.getElementById("navbar");if(!e)return;window.addEventListener("scroll",()=>{e.classList.toggle("scrolled",window.scrollY>50)},{passive:!0});const t=document.getElementById("nav-hamburger"),a=document.getElementById("nav-links");t&&a&&t.addEventListener("click",()=>{t.classList.toggle("active"),a.classList.toggle("active")});function s(){if(!a)return;const i=document.getElementById("nav-auth-link");i&&i.remove();const n=localStorage.getItem("accessToken"),o=document.createElement("a");o.id="nav-auth-link",o.className="nav-link",o.setAttribute("data-link",""),n?(o.href="/dashboard",o.textContent="Dashboard"):(o.href="/auth",o.textContent="Sign In");const r=a.querySelector(".nav-actions");r?a.insertBefore(o,r):a.appendChild(o)}s(),window.addEventListener("authChange",s)}function va(){"ontouchstart"in window||window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.addEventListener("mousemove",e=>{document.querySelectorAll(".glass-card, .service-card, .portfolio-card, .stat-card").forEach(a=>{const s=a.getBoundingClientRect(),i=s.left+s.width/2,n=s.top+s.height/2,o=e.clientX-i,r=e.clientY-n,l=Math.sqrt(o*o+r*r);if(l<300){const c=(300-l)/300,p=r/s.height*-4*c,u=o/s.width*4*c;a.style.transform=`perspective(1000px) rotateX(${p}deg) rotateY(${u}deg) translateY(-${c*3}px)`}else a.style.transform=""})})}function ga(){document.addEventListener("click",e=>{const a=e.target.closest(".btn");if(!a)return;const s=document.createElement("span");s.className="btn-ripple";const i=a.getBoundingClientRect(),n=Math.max(i.width,i.height);s.style.width=s.style.height=n+"px",s.style.left=e.clientX-i.left-n/2+"px",s.style.top=e.clientY-i.top-n/2+"px",a.appendChild(s),setTimeout(()=>s.remove(),600)})}function fa(e,t="success"){let a=document.getElementById("nexus-toast");a||(a=document.createElement("div"),a.id="nexus-toast",a.className="toast",document.body.appendChild(a)),a.textContent=e,a.className=`toast toast-${t} visible`,setTimeout(()=>a.classList.remove("visible"),3500)}window.showToast=fa;const ve="nexus_chat_history",Qe="nexus_chat_status",be="nexus_chat_unread",Ze="nexus-chat-message",et="nexus-chat-status-change",Q="nexus-chat-typing",we={OPEN:"Open",PENDING:"Pending",CLOSED:"Closed"},qe=[{id:"msg-welcome",sender:"admin",text:"Hello! Welcome to Nexus Agency. How can we help you today?",timestamp:new Date(Date.now()-6e4).toISOString(),type:"text"}];function xe(){const e=localStorage.getItem(ve);return e?JSON.parse(e):(localStorage.setItem(ve,JSON.stringify(qe)),qe)}function ha(e){localStorage.setItem(ve,JSON.stringify(e))}function ya(){return localStorage.getItem(Qe)||we.OPEN}function tt(e){Object.values(we).includes(e)&&(localStorage.setItem(Qe,e),window.dispatchEvent(new CustomEvent(et,{detail:{status:e}})))}function at(){return parseInt(localStorage.getItem(be)||"0",10)}function st(){const e=at();localStorage.setItem(be,(e+1).toString())}function Fe(){localStorage.setItem(be,"0")}function ie(e,t="text",a="user",s=null){const i=xe(),n={id:`msg-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,sender:a,text:e,timestamp:new Date().toISOString(),type:t,attachment:s};return i.push(n),ha(i),window.dispatchEvent(new CustomEvent(Ze,{detail:n})),a==="user"&&(tt(we.OPEN),ba(e)),n}let de=null;function ba(e){de&&clearTimeout(de),window.dispatchEvent(new CustomEvent(Q,{detail:{typing:!0}}));const t=e.toLowerCase();let a="Thanks for reaching out! One of our design agents will connect with you shortly.";t.includes("hello")||t.includes("hi")?a="Hi there! Glad you popped in. What kind of digital product are you planning to build?":t.includes("pricing")||t.includes("cost")||t.includes("budget")?a="Our projects start around $1,500. You can also try our interactive Cost Estimator at /estimator to get an instant breakdown!":t.includes("portfolio")||t.includes("work")||t.includes("projects")?a="We've delivered over 150+ projects! Head over to /portfolio to browse our masonry grid of case studies.":t.includes("time")||t.includes("long")||t.includes("duration")?a="Most standard web builds take 2-6 weeks. Custom enterprise portals or mobile apps might take 8-12 weeks.":(t.includes("contact")||t.includes("phone")||t.includes("email"))&&(a="You can drop us an email at hello@nexus.agency, call +1 (234) 567-890, or fill out the contact form at /contact."),de=setTimeout(()=>{window.dispatchEvent(new CustomEvent(Q,{detail:{typing:!1}})),ie(a,"text","admin"),st()},2e3+Math.random()*2e3)}let H=!1,te=!1,W=!1,z=null,D=[];function X(e=600,t="sine",a=.15){try{z||(z=new(window.AudioContext||window.webkitAudioContext)),z.state==="suspended"&&z.resume();const s=z.createOscillator(),i=z.createGain();s.type=t,s.frequency.setValueAtTime(e,z.currentTime),i.gain.setValueAtTime(.08,z.currentTime),i.gain.exponentialRampToValueAtTime(.001,z.currentTime+a),s.connect(i),i.connect(z.destination),s.start(),s.stop(z.currentTime+a)}catch{}}function U(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function it(e){const t=new Date(e);let a=t.getHours();const s=t.getMinutes().toString().padStart(2,"0"),i=a>=12?"PM":"AM";return a=a%12||12,`${a}:${s} ${i}`}const wa=["😊","👍","🔥","🚀","🙌","💡","✨","💻","🎨","💼","👏","🎉"];function xa(){if(document.getElementById("nexus-chat-widget"))return;const e=document.createElement("link");e.rel="stylesheet",e.href="/src/styles/chat-widget.css",document.head.appendChild(e);const t=document.createElement("div");t.id="nexus-chat-widget",t.className="nexus-chat-widget",t.innerHTML=`
    <!-- Floating Admin Toggle -->
    <button id="admin-sim-fab" class="admin-sim-fab" title="Open Admin Simulator Console" aria-label="Open Admin Simulator Console">
      <span class="admin-sim-badge" id="admin-sim-badge" style="display: none;">0</span>
      🛠️ Admin
    </button>

    <!-- Floating Client Button -->
    <button id="chat-fab" class="chat-fab" aria-label="Open support chat">
      <span class="chat-badge" id="chat-fab-badge" style="display: none;">0</span>
      <svg class="chat-icon-msg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg class="chat-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Chat Window (Client View) -->
    <div id="chat-window" class="chat-window">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-avatar">NC</div>
        <div class="chat-header-info">
          <div class="chat-title">Nexus Concierge</div>
          <div class="chat-status">
            <span class="status-dot online"></span>
            <span id="chat-status-text">Status: Open</span>
          </div>
        </div>
        <button id="chat-close-btn" class="chat-header-close" aria-label="Minimize chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"></path>
          </svg>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="chat-messages" id="chat-messages-container">
        <!-- Message list will render here -->
      </div>

      <!-- Typing Indicator -->
      <div class="chat-typing-indicator" id="chat-typing" style="display: none;">
        <span></span><span></span><span></span>
      </div>

      <!-- Error Overlay / Alert -->
      <div class="chat-error-alert" id="chat-error" style="display: none;"></div>

      <!-- Form Area -->
      <form id="chat-input-form" class="chat-input-form">
        <!-- Emoji Picker Panel -->
        <div id="emoji-picker" class="emoji-picker" style="display: none;">
          <div class="emoji-grid">
            ${wa.map(d=>`<button type="button" class="emoji-btn" data-emoji="${d}">${d}</button>`).join("")}
          </div>
        </div>

        <div class="chat-input-wrapper">
          <!-- Attachment Button -->
          <button type="button" id="chat-attach-btn" class="chat-action-btn" aria-label="Attach file">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
          <input type="file" id="chat-file-input" style="display: none;" accept="image/*,.pdf,.zip" />

          <!-- Text Input -->
          <textarea id="chat-text-input" class="chat-textarea" placeholder="Type a message..." rows="1"></textarea>

          <!-- Emoji Toggle -->
          <button type="button" id="chat-emoji-btn" class="chat-action-btn" aria-label="Insert emoji">
            😊
          </button>

          <!-- Send Button -->
          <button type="submit" id="chat-send-btn" class="chat-send-btn" disabled aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>

    <!-- Admin Console Window (Simulator Mode) -->
    <div id="admin-window" class="admin-window">
      <!-- Admin Header -->
      <div class="admin-header">
        <div class="admin-avatar">ADM</div>
        <div class="admin-header-info">
          <div class="admin-title">Nexus Agent Simulator</div>
          <div style="font-size: 11px; opacity: 0.8;">Real-Time Control Panel</div>
        </div>
        <button id="admin-close-btn" class="admin-header-close" aria-label="Close Admin View">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Control Settings Pane -->
      <div class="admin-controls">
        <div class="control-row">
          <label class="control-label">Status:</label>
          <select id="admin-status-select" class="admin-select">
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div class="control-row">
          <label class="control-label" style="display:flex;align-items:center;gap:6px;cursor:pointer;">
            <input type="checkbox" id="admin-typing-chk" />
            <span>Simulate Typing State</span>
          </label>
        </div>
      </div>

      <!-- Admin Messages History -->
      <div class="admin-messages" id="admin-messages-container">
        <!-- Message list from Admin view -->
      </div>

      <!-- Admin Input Form -->
      <form id="admin-input-form" class="admin-input-form">
        <div class="chat-input-wrapper">
          <textarea id="admin-text-input" class="chat-textarea" placeholder="Reply as admin..." rows="1"></textarea>
          <button type="submit" id="admin-send-btn" class="chat-send-btn" disabled aria-label="Send reply">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  `,document.body.appendChild(t);const a=document.getElementById("chat-fab"),s=a.querySelector(".chat-icon-msg"),i=a.querySelector(".chat-icon-close"),n=document.getElementById("chat-window"),o=document.getElementById("chat-close-btn"),r=document.getElementById("chat-input-form"),l=document.getElementById("chat-text-input"),c=document.getElementById("chat-send-btn"),p=document.getElementById("chat-emoji-btn"),u=document.getElementById("emoji-picker"),m=document.getElementById("chat-attach-btn"),h=document.getElementById("chat-file-input"),b=document.getElementById("chat-typing");document.getElementById("chat-fab-badge");const $=document.getElementById("admin-sim-fab"),A=document.getElementById("admin-window"),V=document.getElementById("admin-close-btn"),Z=document.getElementById("admin-input-form"),I=document.getElementById("admin-text-input"),q=document.getElementById("admin-send-btn"),F=document.getElementById("admin-status-select"),N=document.getElementById("admin-typing-chk"),B=document.getElementById("admin-sim-badge"),w=localStorage.getItem("accessToken"),R=JSON.parse(localStorage.getItem("user")||"null"),P="http://localhost:5000/api/v1";let g=null;D=[];let f=null,re=null;w&&$&&($.style.display="none");async function ot(){if(!(!w||!R)){if(typeof window.io>"u"){const d=document.createElement("script");d.src="https://cdn.socket.io/4.7.5/socket.io.min.js",d.onload=()=>Se(),document.head.appendChild(d)}else Se();try{let x=(await(await fetch(`${P}/chat/conversations`,{headers:{Authorization:`Bearer ${w}`}})).json())[0];x||(x=await(await fetch(`${P}/chat/conversation`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify({})})).json()),x&&(g=x.id,f&&f.emit("join_conversation",{conversationId:x.id}),await ke(x.id))}catch(d){console.error("Failed to init real-time client chat:",d)}}}async function ke(d){try{D=await(await fetch(`${P}/chat/${d}`,{headers:{Authorization:`Bearer ${w}`}})).json(),M()}catch(v){console.error("Failed to load messages from server:",v)}}function Se(){f||(f=window.io("http://localhost:5000",{auth:{token:w}}),f.on("connect",()=>{console.log("⚡ Client connected to support socket."),g&&f.emit("join_conversation",{conversationId:g})}),f.on("message_received",d=>{d.conversationId===g&&(D.find(v=>v.id===d.id)||(D.push(d),M(),X(640,"sine",.15),H?f.emit("message_read",{conversationId:g,messageId:d.id}):(st(),ae())))}),f.on("user_typing",({conversationId:d,typing:v,userId:x})=>{d===g&&x!==R.id&&(b.style.display=v?"flex":"none",ge())}),f.on("message_read_receipt",({conversationId:d,messageId:v,userId:x})=>{d===g&&x!==R.id&&(D.forEach(L=>{L.senderId===R.id&&(L.seen=!0)}),M())}),f.on("disconnect",()=>{console.log("🔌 Client socket disconnected.")}))}function rt(){!f||!g||(re&&clearTimeout(re),f.emit("typing_state",{conversationId:g,typing:!0}),re=setTimeout(()=>{f.emit("typing_state",{conversationId:g,typing:!1})},2e3))}const Ee=async()=>{H=!H,H?(n.classList.add("open"),s.style.display="none",i.style.display="block",Fe(),ae(),w?(await ke(g),f&&g&&f.emit("message_read",{conversationId:g})):M(),setTimeout(()=>l.focus(),300),X(800,"sine",.08)):(n.classList.remove("open"),s.style.display="block",i.style.display="none",u.style.display="none",f&&g&&f.emit("typing_state",{conversationId:g,typing:!1}))},$e=()=>{te=!te,te?(A.classList.add("open"),$.classList.add("active"),pe(),B.style.display="none",B.textContent="0",setTimeout(()=>I.focus(),300),X(450,"sine",.1)):(A.classList.remove("open"),$.classList.remove("active"))};a.addEventListener("click",Ee),o.addEventListener("click",Ee),$.addEventListener("click",$e),V.addEventListener("click",$e),F.addEventListener("change",d=>{tt(d.target.value)}),N.addEventListener("change",d=>{window.dispatchEvent(new CustomEvent(Q,{detail:{typing:d.target.checked}}))}),l.addEventListener("input",()=>{const d=l.value.trim().length>0;c.disabled=!d||W,l.style.height="auto",l.style.height=`${Math.min(l.scrollHeight,120)}px`,w&&g&&rt()}),l.addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),c.disabled||r.requestSubmit())}),r.addEventListener("submit",async d=>{d.preventDefault();const v=l.value.trim();if(!(!v||W)){W=!0,c.disabled=!0,l.disabled=!0;try{if(v.toLowerCase().includes("spam")||v.toLowerCase().includes("abuse"))throw new Error("Message flagged by spam protection.");if(w){const x=await fetch(`${P}/chat/send`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify({conversationId:g,message:v})}),L=await x.json();if(!x.ok)throw new Error(L.error||"Failed to send message.");D.push(L),M(),f&&f.emit("typing_state",{conversationId:g,typing:!1})}else ie(v,"text","user");l.value="",l.style.height="auto",ne()}catch(x){K(x.message||"Failed to send message.")}finally{W=!1,l.disabled=!1,c.disabled=!0,l.focus()}}}),I.addEventListener("input",()=>{q.disabled=I.value.trim().length===0,I.style.height="auto",I.style.height=`${Math.min(I.scrollHeight,120)}px`}),I.addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),q.disabled||Z.requestSubmit())}),Z.addEventListener("submit",d=>{d.preventDefault();const v=I.value.trim();v&&(ie(v,"text","admin"),N.checked&&(N.checked=!1,window.dispatchEvent(new CustomEvent(Q,{detail:{typing:!1}}))),I.value="",I.style.height="auto",q.disabled=!0,I.focus())}),p.addEventListener("click",()=>{u.style.display=u.style.display==="none"?"block":"none"}),u.addEventListener("click",d=>{const v=d.target.closest(".emoji-btn");v&&(l.value+=v.dataset.emoji||"",l.dispatchEvent(new Event("input")),u.style.display="none",l.focus())}),m.addEventListener("click",()=>h.click()),h.addEventListener("change",async()=>{const d=h.files[0];if(!d)return;const v=10*1024*1024;if(d.size>v){K("File exceeds 10MB limit."),h.value="";return}const x=["jpg","jpeg","png","gif","pdf","zip","docx"],L=d.name.split(".").pop().toLowerCase();if(!x.includes(L)){K("Format not supported. Upload image, PDF, DOCX, or ZIP."),h.value="";return}W=!0,l.disabled=!0,c.disabled=!0,K("Uploading attachment...","info");try{if(w){const O=new FormData;O.append("file",d);const ee=await fetch(`${P}/upload`,{method:"POST",headers:{Authorization:`Bearer ${w}`},body:O}),Ie=await ee.json();if(!ee.ok)throw new Error(Ie.error||"Upload failed.");const Te=await fetch(`${P}/chat/send`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify({conversationId:g,message:d.name,attachmentUrl:Ie.url})}),Ce=await Te.json();if(!Te.ok)throw new Error(Ce.error||"Failed to send message.");D.push(Ce),M(),ne()}else{await new Promise(ee=>setTimeout(ee,1200));const O=URL.createObjectURL(d);ie(d.name,"file","user",{name:d.name,size:(d.size/1024).toFixed(1)+" KB",url:O,isImage:d.type.startsWith("image/")}),ne()}}catch(O){K(O.message||"Failed to upload file.")}finally{W=!1,l.disabled=!1,h.value="",l.focus()}}),window.addEventListener(Ze,(d=>{if(w)return;const v=d.detail;if(M(),pe(),v.sender==="user"){if(X(520,"triangle",.12),!te){const x=parseInt(B.textContent||"0",10);B.textContent=(x+1).toString(),B.style.display="flex"}}else v.sender==="admin"&&(X(640,"sine",.15),H?Fe():ae())})),window.addEventListener(Q,(d=>{if(w)return;const{typing:v}=d.detail;b.style.display=v?"flex":"none",H&&ge()})),window.addEventListener(et,(d=>{if(w)return;const v=document.getElementById("chat-status-text");v&&(v.textContent=`Status: ${d.detail.status}`),F.value=d.detail.status})),w?ot():(F.value=ya(),ae(),M(),pe())}function ae(){const e=document.getElementById("chat-fab-badge");if(!e)return;const t=at();t>0?(e.textContent=t.toString(),e.style.display="flex"):e.style.display="none"}function K(e,t="error"){const a=document.getElementById("chat-error");a&&(a.className=`chat-error-alert ${t}`,a.textContent=e,a.style.display="block",setTimeout(()=>ne(),4e3))}function ne(){const e=document.getElementById("chat-error");e&&(e.style.display="none")}function ge(){const e=document.getElementById("chat-messages-container");e&&e.scrollTo({top:e.scrollHeight,behavior:"smooth"})}function ka(){const e=document.getElementById("admin-messages-container");e&&e.scrollTo({top:e.scrollHeight,behavior:"smooth"})}function M(){const e=document.getElementById("chat-messages-container");if(!e)return;const t=localStorage.getItem("accessToken"),a=JSON.parse(localStorage.getItem("user")||"null"),s=t?D:xe();e.innerHTML=s.map(i=>{const n=t?i.senderId===a.id:i.sender==="user",o=n?"user":"admin";let r="";const l=i.attachmentUrl||i.attachment&&i.attachment.url,c=i.content||i.message||i.text||"File";l?l.match(/\.(jpeg|jpg|gif|png)/i)||i.attachment&&i.attachment.isImage?r=`<img src="${l}" class="chat-msg-img" alt="${U(c)}" />`:r=`
          <div class="chat-msg-file">
            <span class="file-icon">📄</span>
            <div class="file-info">
              <span class="file-name">${U(c)}</span>
            </div>
            <a href="${l}" download target="_blank" class="file-download-btn">⬇️</a>
          </div>
        `:r=`<p>${U(i.content||i.message||i.text||"")}</p>`;let p="";n&&t&&(i.seen?p='<span style="font-size:9px; color:#10B981; margin-left:4px;">seen</span>':i.delivered?p='<span style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">delivered</span>':p='<span style="font-size:9px; color:var(--text-tertiary); margin-left:4px;">sent</span>');const u=i.createdAt||i.timestamp||new Date().toISOString();return`
      <div class="chat-message-bubble ${o}">
        <div class="chat-message-content">
          ${r}
          <div style="display:flex; justify-content:flex-end; align-items:center;">
            <span class="chat-message-time">${it(u)}</span>
            ${p}
          </div>
        </div>
      </div>
    `}).join(""),ge()}function pe(){const e=document.getElementById("admin-messages-container");if(!e)return;const t=xe();e.innerHTML=t.map(a=>{const s=a.sender==="user",i=s?"admin":"user",n=s?"CLIENT":"ADMIN";let o="";return a.type==="file"&&a.attachment?a.attachment.isImage?o=`<img src="${a.attachment.url}" class="chat-msg-img" alt="${U(a.text)}" />`:o=`
          <div class="chat-msg-file">
            <span class="file-icon">📄</span>
            <div class="file-info">
              <span class="file-name">${U(a.attachment.name)}</span>
              <span class="file-size">${a.attachment.size}</span>
            </div>
            <a href="${a.attachment.url}" download class="file-download-btn">⬇️</a>
          </div>
        `:o=`<p>${U(a.text)}</p>`,`
      <div class="chat-message-bubble ${i}">
        <div style="font-size: 8px; margin-bottom: 2px; opacity: 0.6; padding-left: 4px;">
          ${n}
        </div>
        <div class="chat-message-content">
          ${o}
          <span class="chat-message-time">${it(a.timestamp)}</span>
        </div>
      </div>
    `}).join(""),ka()}function Sa(){const e=document.getElementById("particle-canvas");if(!e)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.style.display="none";return}const t=e.getContext("2d");let a=[],s,i=!0;function n(){e.width=window.innerWidth,e.height=window.innerHeight}function o(){const l=Math.min(Math.floor(e.width*e.height/25e3),60);a=[];for(let c=0;c<l;c++)a.push({x:Math.random()*e.width,y:Math.random()*e.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,radius:Math.random()*1.5+.5,opacity:Math.random()*.4+.1})}function r(){if(!i)return;t.clearRect(0,0,e.width,e.height);const l=document.documentElement.getAttribute("data-theme"),c="124, 92, 252",p=l==="light"?"124, 92, 252":"255, 255, 255",u=120;for(let m=0;m<a.length;m++)for(let h=m+1;h<a.length;h++){const b=a[m].x-a[h].x,$=a[m].y-a[h].y,A=Math.sqrt(b*b+$*$);if(A<u){const V=(1-A/u)*.08;t.beginPath(),t.moveTo(a[m].x,a[m].y),t.lineTo(a[h].x,a[h].y),t.strokeStyle=`rgba(${p}, ${V})`,t.lineWidth=.5,t.stroke()}}for(const m of a)t.beginPath(),t.arc(m.x,m.y,m.radius,0,Math.PI*2),t.fillStyle=`rgba(${c}, ${m.opacity})`,t.fill(),m.x+=m.vx,m.y+=m.vy,(m.x<0||m.x>e.width)&&(m.vx*=-1),(m.y<0||m.y>e.height)&&(m.vy*=-1);s=requestAnimationFrame(r)}document.addEventListener("visibilitychange",()=>{i=!document.hidden,i?r():cancelAnimationFrame(s)}),window.addEventListener("resize",()=>{n(),o()}),n(),o(),r()}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("page-loader"),t=document.getElementById("loader-percentage");let a=0;const s=setInterval(()=>{a+=Math.random()*15,a>100&&(a=100),t&&(t.textContent=Math.floor(a)+"%"),a>=100&&(clearInterval(s),setTimeout(()=>{e&&e.classList.add("hidden")},300))},100);ca(),ua(),pa(),ma(),da(),va(),ga(),Sa(),new la().init(),xa(),nt()});function nt(){const e=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("revealed"),e.unobserve(a.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right").forEach(t=>e.observe(t))}function Ea(){const e=document.querySelectorAll("[data-count]"),t=new IntersectionObserver(a=>{a.forEach(s=>{if(s.isIntersecting){const i=s.target,n=parseInt(i.dataset.count||"0"),o=i.dataset.suffix||"",r=i.dataset.prefix||"",l=2e3,c=Date.now(),p=()=>{const u=Date.now()-c,m=Math.min(u/l,1),h=1-Math.pow(1-m,3),b=Math.floor(h*n);i.textContent=r+b.toLocaleString()+o,m<1&&requestAnimationFrame(p)};requestAnimationFrame(p),t.unobserve(i)}})},{threshold:.5});e.forEach(a=>t.observe(a))}
