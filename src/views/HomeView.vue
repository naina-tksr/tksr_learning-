<script setup lang="ts">
import { ref, computed } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import LogoMarquee from '../components/LogoMarquee.vue'
import { courses, CATEGORIES } from '../data/site'

const activeCategory = ref<string>(CATEGORIES[0])
const leadPurpose = ref('Career Growth')
const leadAgreed = ref(false)
const leadSubmitted = ref(false)

const filtered = computed(() =>
  activeCategory.value === CATEGORIES[0]
    ? courses
    : courses.filter((c) => c.category === activeCategory.value),
)

const awards = [
  {
    title: 'EdTech Excellence Award 2026',
    text: 'Outstanding Contribution to Skill-Based Learning',
    emoji: '🏆',
  },
  {
    title: 'Innovation in Learning Award 2026',
    text: 'Innovation in Technology-Enabled Education',
    emoji: '💡',
  },
  {
    title: 'Learner Success Award 2026',
    text: 'Excellence in Career-Focused Learning',
    emoji: '🎓',
  },
]

const reviews = [
  { name: 'Google Reviews', rating: '4.5/5', count: '12,000 Reviews' },
  { name: 'Facebook Reviews', rating: '4.6/5', count: '1,000 Reviews' },
  { name: 'Trustpilot', rating: '4.5/5', count: '1,200 Reviews' },
  { name: 'SwitchUp', rating: '4.8/5', count: '200 Reviews' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'DevOps Engineer @ Accenture',
    text: 'The DevOps program transformed my career. Within two months of graduating I moved from a support role to a cloud engineer position with a 70% hike.',
  },
  {
    name: 'Rahul Verma',
    role: 'Scrum Master @ Deloitte',
    text: 'The Scrum Master bootcamp was brutally practical — live mock interviews with real product people helped me clear my interviews in three weeks.',
  },
  {
    name: 'Ananya Iyer',
    role: 'QA Lead @ Infosys',
    text: 'I loved how every module was tied to a real project. The automation testing course gave me the confidence to lead a testing team transition to Selenium.',
  },
]

const featureComparison = [
  {
    label: 'Learning Mode',
    ours: 'Project-Led & Immersive — real-world simulations and hands-on projects that prepare you for day-one productivity.',
    theirs: 'Theory-Heavy — traditional classroom approach with limited practical exposure.',
  },
  {
    label: 'Mentorship',
    ours: 'Global Industry Architects — direct 1-on-1 mentorship from Fortune 500 experts.',
    theirs: 'Generic Trainers — academics or trainers with limited current industry experience.',
  },
  {
    label: 'Certifications',
    ours: 'Globally Accredited — credentials recognized by the world’s leading governing bodies.',
    theirs: 'Local Certifications — certificates with limited global or industry recognition.',
  },
  {
    label: 'Career Support',
    ours: 'Scalable Career Growth — lifelong access to our elite professional network and 100% placement aid.',
    theirs: 'Basic Support — limited job assistance with no long-term career tracking.',
  },
  {
    label: 'Real-Time Impact',
    ours: 'Live Enterprise Projects — work on actual projects for global brands and startups.',
    theirs: 'Simulated Projects — basic, outdated capstones that don’t reflect industry reality.',
  },
]

const features = [
  { icon: '🎯', title: 'Customized Training', text: 'Programs shaped around your business, technology and workforce needs.' },
  { icon: '👩‍🏫', title: 'Expert-Led Learning', text: 'Masterclasses and workshops by industry architects with 10+ years of experience.' },
  { icon: '🛠️', title: 'Hands-On Learning', text: 'Real tools, real environments and real projects from day one.' },
  { icon: '🗓️', title: 'Flexible Delivery', text: 'Online, onsite or hybrid — scheduled around your team’s rhythm.' },
]

const values = [
  { icon: '🎓', num: '60%', label: 'Average Hike' },
  { icon: '💼', num: '86 LPA', label: 'Highest Salary' },
  { icon: '🔄', num: '10,000+', label: 'Career Transitions' },
  { icon: '🤝', num: '400+', label: 'Hiring Partners' },
]
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy fade-up">
          <span class="eyebrow">📈 Industry-Aligned Live Training</span>
          <h1>
            Master In-Demand Skills and Unlock Your
            <span class="grad-text">Career Potential</span>
          </h1>
          <p class="hero-sub">
            Expert-Curated Learning designed to help you master in-demand skills —
            DevOps, Agile & Scrum, Software Testing, Project Management and more.
          </p>
          <div class="hero-cta">
            <a href="#lead" class="btn btn-primary">Unlock Your Potential</a>
            <a href="/contact-us" class="btn btn-outline">Request Expert Guidance</a>
          </div>
          <div class="hero-stats">
            <div class="hs"><strong>15K+</strong><span>Job Transitions</span></div>
            <div class="hs"><strong>100K+</strong><span>Active Learners</span></div>
            <div class="hs"><strong>1,000+</strong><span>Expert Mentors</span></div>
          </div>
        </div>

        <div class="hero-visual fade-up">
          <div class="hero-card">
            <div class="hero-avatar">🧑‍💻</div>
            <div class="hero-avatar-caption">
              <strong>TKSR Learner</strong>
              <span>Career growth programs</span>
            </div>
            <div class="chip chip-a">✅ 100% Placement Aid</div>
            <div class="chip chip-b">🏅 Globally Accredited</div>
            <div class="chip chip-c">💬 1-on-1 Expert Mentorship</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ HIRING PARTNERS ============ -->
    <section class="section partners">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">🤝 Trusted by Industry</span>
          <h2>Our Network of 400+ Hiring Partners</h2>
        </div>
        <LogoMarquee />
      </div>
    </section>

    <!-- ============ COURSES ============ -->
    <section class="section section--soft" id="courses">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">📚 Explore</span>
          <h2>Build the Right Skills for Your Career</h2>
          <p>Explore courses designed to help you learn, grow and move forward.</p>
        </div>
        <div class="cat-tabs" role="tablist">
          <button
            v-for="c in CATEGORIES"
            :key="c"
            class="cat-tab"
            :class="{ active: activeCategory === c }"
            @click="activeCategory = c"
          >
            {{ c }}
          </button>
        </div>
        <div class="course-grid">
          <CourseCard v-for="c in filtered.slice(0, 6)" :key="c.id" :course="c" />
        </div>
        <div class="center-cta">
          <router-link to="/courses" class="btn btn-primary">View All Courses</router-link>
        </div>
      </div>
    </section>

    <!-- ============ SUCCESS STORIES ============ -->
    <section class="section section--dark" id="success-stories">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">🌟 Outcomes That Matter</span>
          <h2 style="color: #fff">Real Stories, Real Transformations</h2>
          <p>
            See how our learners are scaling their careers and making successful
            transitions into high-growth roles.
          </p>
        </div>

        <div class="success-grid">
          <div class="value-card" v-for="v in values" :key="v.label">
            <div class="vc-icon">{{ v.icon }}</div>
            <strong>{{ v.num }}</strong>
            <span>{{ v.label }}</span>
          </div>
        </div>

        <div class="testimonial-grid">
          <figure v-for="t in testimonials" :key="t.name" class="testimonial">
            <div class="quote-mark">“</div>
            <blockquote>{{ t.text }}</blockquote>
            <figcaption>
              <div class="t-avatar">{{ t.name.charAt(0) }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.role }}</span>
              </div>
            </figcaption>
          </figure>
        </div>

        <div class="review-strip">
          <div v-for="r in reviews" :key="r.name" class="review-chip">
            <span class="r-name">{{ r.name }}</span>
            <span class="r-rating">★ {{ r.rating }}</span>
            <span class="r-count">{{ r.count }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ AWARDS ============ -->
    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">🏅 Recognition</span>
          <h2>Awards &amp; Recognition</h2>
          <p>Celebrating the milestones that reflect our commitment to quality learning and student success.</p>
        </div>
        <div class="award-grid">
          <div v-for="a in awards" :key="a.title" class="award-card">
            <div class="award-icon">{{ a.emoji }}</div>
            <h3>{{ a.title }}</h3>
            <p>{{ a.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ LIVE WEBINARS ============ -->
    <section class="section webinar">
      <div class="container">
        <div class="webinar-panel">
          <div class="section-head">
            <span class="eyebrow">🎥 Live Sessions</span>
            <h2 style="color: #fff">Live Webinars with Industry Experts</h2>
            <p style="color: #c7d2fe">
              Join expert-led sessions to explore industry trends, learn practical
              skills and gain insights to move your career forward.
            </p>
          </div>
          <div class="webinar-stats">
            <div class="ws"><strong>250+</strong><span>Enterprise Clients</span></div>
            <div class="ws"><strong>25K+</strong><span>Professionals Upskilled</span></div>
            <div class="ws"><strong>500+</strong><span>Consulting Engagements</span></div>
            <div class="ws"><strong>100K+</strong><span>Training Hours Delivered</span></div>
            <div class="ws"><strong>200+</strong><span>Industry Experts</span></div>
            <div class="ws"><strong>10+ Yrs</strong><span>Industry Experience</span></div>
          </div>
          <router-link to="/contact-us" class="btn btn-white" style="margin-top: 28px">
            Book a Live Session
          </router-link>
        </div>
      </div>
    </section>

    <!-- ============ WORKFORCE ============ -->
    <section class="section section--soft" id="workforce">
      <div class="container workforce-grid">
        <div class="workforce-copy">
          <span class="eyebrow">🏢 For Enterprises</span>
          <h2>Build a Future-Ready Workforce with TKSR Learning</h2>
          <p>
            Upskill your teams with industry-focused training designed around your
            business, technology and workforce needs.
          </p>
          <ul class="feature-list">
            <li v-for="f in features" :key="f.title">
              <span class="fl-icon">{{ f.icon }}</span>
              <div>
                <strong>{{ f.title }}</strong>
                <p>{{ f.text }}</p>
              </div>
            </li>
          </ul>
          <router-link to="/contact-us" class="btn btn-accent">Request A Demo</router-link>
        </div>
        <div class="workforce-card">
          <div class="alumni-row">
            <span v-for="a in ['Google', 'Stanford', 'IBM', 'Infosys', 'Capgemini', 'Deloitte', 'TCS', 'Amazon']" :key="a" class="alumni-name">
              {{ a }}
            </span>
          </div>
          <p class="alumni-note">
            Our learners and trainers come from the world’s most-loved companies.
          </p>
        </div>
      </div>
    </section>

    <!-- ============ EXPERTS STATS ============ -->
    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">👩‍🏫 Faculty</span>
          <h2>Learn from Experienced Industry Experts</h2>
          <p>
            Bring real-world industry expertise into your workforce through trainers
            and consultants with hands-on experience across leading organizations.
          </p>
        </div>
        <div class="num-grid">
          <div class="num-card">
            <strong>200+</strong><span>Industry Experts</span>
          </div>
          <div class="num-card">
            <strong>50+</strong><span>Technology &amp; Business Skills</span>
          </div>
          <div class="num-card">
            <strong>500+</strong><span>Enterprise Engagements</span>
          </div>
          <div class="num-card">
            <strong>20+</strong><span>Industry Domains</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ WHY TKSR ============ -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">⚖️ The Difference</span>
          <h2>Why TKSR is the Preferred Choice for Professionals</h2>
          <p>
            We don't just teach skills; we build careers. Our ecosystem is designed
            to bridge the gap between classroom learning and board-room execution.
          </p>
        </div>

        <div class="compare">
          <div class="cmp-head">
            <div class="cmp-col cmp-col--feature">Features</div>
            <div class="cmp-col cmp-col--theirs">Others</div>
            <div class="cmp-col cmp-col--ours">
              <span class="cmp-logo">TKSR Learning</span>
            </div>
          </div>
          <div v-for="row in featureComparison" :key="row.label" class="cmp-row">
            <div class="cmp-col cmp-col--feature"><strong>{{ row.label }}</strong></div>
            <div class="cmp-col cmp-col--theirs">✗ {{ row.theirs }}</div>
            <div class="cmp-col cmp-col--ours">✓ {{ row.ours }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ LEAD CTA ============ -->
    <section class="section lead" id="lead">
      <div class="container lead-grid">
        <div class="lead-copy">
          <span class="eyebrow">🚀 Get Started</span>
          <h2>Build Skills Today to Unlock Your Career Edge</h2>
          <p>
            Practical, career-focused learning designed to help you build the right
            skills and move your career forward.
          </p>
          <div class="lead-stats">
            <div><strong>10,000+</strong><span>Total Learners Enrolled</span></div>
            <div><strong>400+</strong><span>Hiring Partners</span></div>
            <div><strong>5,000+</strong><span>Careers Transformed</span></div>
          </div>
        </div>

        <div class="lead-form card">
          <h3>Let’s Find the Right Course for You</h3>
          <form @submit.prevent="leadSubmitted = true">
            <div class="field">
              <label>Select Purpose</label>
              <select v-model="leadPurpose">
                <option>Career Growth</option>
                <option>Switch Roles</option>
                <option>Upskill My Team</option>
                <option>Other</option>
              </select>
            </div>
            <div class="field">
              <label>Your Name</label>
              <input type="text" placeholder="e.g. Asha Kumar" required />
            </div>
            <div class="field">
              <label>Mobile Number</label>
              <input type="tel" placeholder="+91 00000 00000" required />
            </div>
            <label class="consent">
              <input v-model="leadAgreed" type="checkbox" required />
              <span>
                I agree to TKSR Learning’s
                <a href="#">Terms &amp; Conditions</a> and
                <a href="#">Privacy Policy.</a>
              </span>
            </label>
            <button class="btn btn-primary" style="width: 100%" type="submit">
              Scale Your Career →
            </button>
            <p v-if="leadSubmitted" class="success-note">
              ✅ Thanks! An expert adviser will call you shortly.
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---- HERO ---- */
.hero {
  background:
    radial-gradient(1100px 500px at 85% -10%, rgba(124, 58, 237, 0.16), transparent 60%),
    radial-gradient(900px 480px at -10% 110%, rgba(37, 99, 235, 0.12), transparent 60%),
    var(--bg-soft);
  padding: 72px 0 90px;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}

.grad-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  margin: 20px 0 28px;
  color: var(--muted);
  font-size: 1.12rem;
  max-width: 560px;
}

.hero-cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  gap: 40px;
  margin-top: 40px;
}

.hs strong {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hs span {
  font-size: 13.5px;
  color: var(--muted);
  font-weight: 500;
}

.hero-visual {
  position: relative;
}

.hero-card {
  position: relative;
  background: var(--gradient);
  border-radius: 26px;
  padding: 48px 40px;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 34px 70px rgba(29, 78, 216, 0.4);
}

.hero-avatar {
  font-size: 120px;
  filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.3));
}

.hero-avatar-caption {
  position: absolute;
  bottom: 26px;
  left: 26px;
  color: #fff;
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.hero-avatar-caption span {
  font-size: 13px;
  opacity: 0.85;
}

.chip {
  position: absolute;
  background: #fff;
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink);
  box-shadow: var(--shadow-lg);
  animation: float 4.5s ease-in-out infinite;
}

.chip-a {
  top: 8%;
  right: -14px;
}

.chip-b {
  top: 38%;
  left: -18px;
  animation-delay: 1.2s;
}

.chip-c {
  bottom: 12%;
  right: -8px;
  animation-delay: 2.1s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* ---- partners ---- */
.partners {
  padding-bottom: 70px;
}

/* ---- courses ---- */
.cat-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 36px;
}

.cat-tab {
  border: 1.5px solid var(--border);
  background: #fff;
  color: var(--ink-2);
  font-weight: 700;
  font-size: 14px;
  padding: 10px 18px;
  border-radius: 999px;
  transition: all 0.2s;
}

.cat-tab:hover {
  border-color: var(--primary-600);
  color: var(--primary-600);
}

.cat-tab.active {
  background: var(--gradient);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 10px 24px rgba(29, 78, 216, 0.35);
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.center-cta {
  text-align: center;
  margin-top: 36px;
}

/* ---- success ---- */
.success-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 44px;
}

.value-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
  padding: 24px 18px;
  text-align: center;
  transition: background 0.25s, transform 0.25s;
}

.value-card:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-4px);
}

.vc-icon {
  font-size: 26px;
  margin-bottom: 8px;
}

.value-card strong {
  display: block;
  font-size: 1.7rem;
  color: #fff;
  letter-spacing: -0.02em;
}

.value-card span {
  color: #a5b4fc;
  font-size: 13.5px;
  font-weight: 500;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 44px;
}

.testimonial {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
  padding: 26px 22px;
  position: relative;
}

.quote-mark {
  position: absolute;
  top: 8px;
  right: 18px;
  font-size: 4.4rem;
  font-family: Georgia, serif;
  color: rgba(129, 140, 248, 0.35);
  line-height: 1;
}

.testimonial blockquote {
  color: #e0e7ff;
  font-size: 14.5px;
  line-height: 1.7;
  margin-bottom: 18px;
  position: relative;
}

.testimonial figcaption {
  display: flex;
  align-items: center;
  gap: 12px;
}

.t-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--gradient-soft);
  color: #fff;
  font-weight: 800;
  display: grid;
  place-items: center;
}

.testimonial figcaption strong,
.testimonial figcaption span {
  display: block;
}

.testimonial figcaption strong {
  color: #fff;
  font-size: 14px;
}

.testimonial figcaption span {
  color: #a5b4fc;
  font-size: 12.5px;
}

.review-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  text-align: center;
}

.review-chip {
  background: #fff;
  border-radius: var(--radius);
  padding: 16px 12px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.r-name {
  font-weight: 700;
  font-size: 13.5px;
  color: var(--ink);
}

.r-rating {
  font-weight: 800;
  color: #d97706;
  font-size: 1.05rem;
}

.r-count {
  color: var(--muted);
  font-size: 12.5px;
}

/* ---- awards ---- */
.award-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.award-card {
  text-align: center;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 34px 24px;
  transition: transform 0.2s, box-shadow 0.25s;
}

.award-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.award-icon {
  width: 66px;
  height: 66px;
  margin: 0 auto 16px;
  border-radius: 18px;
  background: var(--bg-soft);
  display: grid;
  place-items: center;
  font-size: 32px;
}

.award-card h3 {
  margin-bottom: 8px;
}

.award-card p {
  color: var(--muted);
  font-size: 14px;
}

/* ---- webinar ---- */
.webinar-panel {
  background:
    radial-gradient(700px 300px at 90% -20%, rgba(255, 255, 255, 0.14), transparent 60%),
    var(--bg-dark);
  border-radius: var(--radius-lg);
  padding: 52px 56px;
  position: relative;
  overflow: hidden;
}

.webinar-stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.ws {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 16px 10px;
  text-align: center;
}

.ws strong {
  display: block;
  font-size: 1.4rem;
  color: #fff;
}

.ws span {
  font-size: 12px;
  color: #a5b4fc;
  font-weight: 500;
}

/* ---- workforce ---- */
.workforce-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
}

.workforce-copy p {
  color: var(--muted);
  margin: 14px 0 24px;
  max-width: 560px;
}

.feature-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 28px;
}

.feature-list li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.fl-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--bg-soft);
  display: grid;
  place-items: center;
  font-size: 20px;
}

.feature-list strong {
  display: block;
  font-size: 14.5px;
  margin-bottom: 2px;
}

.feature-list p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}

.workforce-card {
  background: var(--gradient);
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  text-align: center;
  color: #fff;
  box-shadow: 0 24px 50px rgba(29, 78, 216, 0.35);
}

.alumni-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 22px 0;
}

.alumni-name {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13.5px;
}

.alumni-note {
  font-size: 13.5px;
  opacity: 0.9;
  margin-top: 10px;
}

/* ---- numbers ---- */
.num-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.num-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 30px 20px;
  text-align: center;
}

.num-card strong {
  font-size: 2.1rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.03em;
}

.num-card span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-weight: 600;
  font-size: 14px;
}

/* ---- comparison ---- */
.compare {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  background: #fff;
}

.cmp-head,
.cmp-row {
  display: grid;
  grid-template-columns: 1fr 1.1fr 1.1fr;
}

.cmp-col {
  padding: 18px 20px;
  font-size: 14px;
  line-height: 1.6;
}

.cmp-col--feature {
  background: var(--bg-soft);
  font-weight: 700;
  color: var(--ink);
}

.cmp-col--theirs {
  color: var(--muted);
}

.cmp-col--ours {
  color: var(--primary-dark);
}

.cmp-head .cmp-col {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 12.5px;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
}

.cmp-head .cmp-col--feature {
  background: var(--ink);
  color: #fff;
}

.cmp-head .cmp-col--theirs {
  background: #f1f5f9;
  color: var(--muted);
}

.cmp-head .cmp-col--ours {
  background: var(--gradient);
  color: #fff;
}

.cmp-logo {
  font-weight: 900;
}

.cmp-row:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

.cmp-col--ours {
  background: rgba(37, 99, 235, 0.06);
}

/* ---- lead ---- */
.lead {
  background:
    radial-gradient(900px 420px at 5% 0%, rgba(37, 99, 235, 0.12), transparent 60%),
    var(--bg-soft);
}

.lead-grid {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 56px;
  align-items: center;
}

.lead-copy p {
  color: var(--muted);
  margin: 16px 0 28px;
  max-width: 520px;
}

.lead-stats {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lead-stats > div {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.lead-stats strong {
  font-size: 1.4rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lead-stats span {
  color: var(--muted);
  font-weight: 600;
}

.lead-form {
  padding: 34px 32px;
}

.lead-form h3 {
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.consent {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13px;
  color: var(--muted);
  margin: 8px 0 18px;
  cursor: pointer;
}

.consent input {
  margin-top: 3px;
  accent-color: var(--primary-600);
}

.consent a {
  color: var(--primary-600);
  font-weight: 600;
  text-decoration: underline;
}

.success-note {
  margin-top: 14px;
  color: var(--success);
  font-weight: 700;
  font-size: 14px;
}

/* ---- responsive ---- */
@media (max-width: 1024px) {
  .hero-grid,
  .workforce-grid,
  .lead-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    min-height: 340px;
  }

  .course-grid,
  .testimonial-grid,
  .award-grid,
  .success-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .webinar-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .review-strip {
    grid-template-columns: repeat(2, 1fr);
  }

  .num-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cmp-head,
  .cmp-row {
    grid-template-columns: 1fr;
  }

  .cmp-col--feature {
    border-bottom: 1px solid var(--border);
  }
}

@media (max-width: 560px) {
  .hero {
    padding: 44px 0 60px;
  }

  .hero-stats {
    gap: 20px;
    flex-wrap: wrap;
  }

  .chip {
    font-size: 12px;
    padding: 8px 12px;
  }

  .chip-a {
    right: -6px;
  }

  .chip-b {
    left: -6px;
  }

  .course-grid,
  .testimonial-grid,
  .award-grid,
  .success-grid,
  .feature-list {
    grid-template-columns: 1fr;
  }

  .webinar-panel {
    padding: 32px 20px;
    border-radius: 18px;
  }

  .webinar-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .cmp-col {
    padding: 14px 16px;
  }
}
</style>