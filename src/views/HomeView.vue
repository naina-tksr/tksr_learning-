<script setup lang="ts">
import { ref, computed } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import CareerAdvantagesSection from '../components/CareerAdvantagesSection.vue'
import CareerConversionSection from '../components/CareerConversionSection.vue'
import CareerNavigationSection from '../components/CareerNavigationSection.vue'
import EnrollmentUrgencyBanner from '../components/EnrollmentUrgencyBanner.vue'
import LogoMarquee from '../components/LogoMarquee.vue'
import CareerUSPSection from '../components/CareerUSPSection.vue'
import IndustryExpertsSection from '../components/IndustryExpertsSection.vue'
import LiveProjectsSection from '../components/LiveProjectsSection.vue'
import CareerProgramsSection from '../components/CareerProgramsSection.vue'
import TrustProofSection from '../components/TrustProofSection.vue'
import { courses, CATEGORIES, SITE } from '../data/site'
import { vacancies, vacancySection } from '../data/liveVacancies'

const activeCategory = ref<string>(CATEGORIES[0])
const leadPurpose = ref('Career Growth')
const leadAgreed = ref(false)
const leadSubmitted = ref(false)

// LIVE VACANCIES section — data-driven from `src/data/liveVacancies.ts` (all
// records are sample/demo: no verified live feed exists in this project yet).
// Cards keep the existing `/jobs/:id` routing via each record's `jobId`.

const filtered = computed(() =>
  activeCategory.value === CATEGORIES[0]
    ? courses
    : courses.filter((c) => c.category === activeCategory.value),
)

// Phase 8: the comparison describes TKSR's own learning approach — it is not a
// claim about what other providers do, and makes no unsupported outcome claims.
const approachComparison = [
  {
    label: 'Learning Focus',
    traditional: 'Theory-heavy learning',
    tksr: 'Industry-relevant skill development',
  },
  {
    label: 'Practical Work',
    traditional: 'Course completion is the end goal',
    tksr: 'Practical project implementation',
  },
  {
    label: 'Curriculum',
    traditional: 'Generic curriculum',
    tksr: 'Career-focused skill mapping',
  },
  {
    label: 'Context',
    traditional: 'Learning without career context',
    tksr: 'Career opportunity + required skill awareness',
  },
  {
    label: 'Outcome Orientation',
    traditional: 'Certificate-focused',
    tksr: 'Portfolio-oriented project work',
  },
]

const features = [
  { icon: '🎯', title: 'Customized Training', text: 'Programs shaped around your business, technology and workforce needs.' },
  { icon: '👩‍🏫', title: 'Expert-Led Learning', text: 'Masterclasses and workshops led by practitioners with hands-on industry experience.' },
  { icon: '🛠️', title: 'Hands-On Learning', text: 'Hands-on time with real tools, real environments and real projects.' },
  { icon: '🗓️', title: 'Flexible Delivery', text: 'Online, onsite or hybrid — scheduled around your team’s rhythm.' },
]

const leadPoints = [
  { num: '01', label: 'Industry-relevant skill development' },
  { num: '02', label: 'Practical, portfolio-oriented projects' },
  { num: '03', label: 'Expert-led, career-focused guidance' },
  { num: '04', label: 'Awareness of what career roles require' },
]

// Technologies drawn from actual course tags on this site — factual, not invented.
const ecosystemTech = Array.from(new Set(courses.flatMap((c) => c.tags))).slice(0, 10)
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy fade-up">
          <span class="eyebrow">🚀 Build Skills. Build Projects. Build Your Career.</span>
          <h1>
            <span class="hero-line">Build Skills That Move Your</span>
            <span class="grad-text hero-line">Career Forward</span>
          </h1>
          <p class="hero-sub">
            TKSR Career combines industry-relevant skills, practical real-world
            projects, expert guidance and exposure to current career opportunities —
            so you can understand what employers need today and build for it.
          </p>
          <div class="hero-cta">
            <router-link to="/jobs" class="btn btn-primary">Explore Career Opportunities →</router-link>
            <router-link to="/contact-us" class="btn btn-outline hero-cta-alt">Talk to a Career Expert</router-link>
          </div>
          <div class="hero-stats">
            <div class="hs">
              <span class="hs-icon" aria-hidden="true">01</span>
              <div class="hs-body">
                <strong>Industry-Ready</strong>
                <span>AI Engineering Skills</span>
              </div>
            </div>
            <div class="hs">
              <span class="hs-icon" aria-hidden="true">02</span>
              <div class="hs-body">
                <strong>Real Products</strong>
                <span>Build &amp; Deploy Projects</span>
              </div>
            </div>
            <div class="hs">
              <span class="hs-icon" aria-hidden="true">03</span>
              <div class="hs-body">
                <strong>Career-Focused</strong>
                <span>Skills for All Roles</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-visual fade-up">
          <div class="hero-card">
            <div class="hero-avatar">🧑‍💻</div>
            <div class="hero-avatar-caption">
              <strong>TKSR Learner</strong>
              <span>Career growth programs</span>
            </div>
            <div class="chip chip-a"><span class="chip-ico" aria-hidden="true">🎯</span> Industry-Relevant Skills</div>
            <div class="chip chip-b"><span class="chip-ico" aria-hidden="true">🛠️</span> Real-World Projects</div>
            <div class="chip chip-c"><span class="chip-ico" aria-hidden="true">💬</span> Expert Guidance</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ BATCH ENROLLMENT URGENCY ============ -->
    <EnrollmentUrgencyBanner />

    <!-- ============ WHY TKSR CAREER? CONVERSION CARDS ============ -->
    <CareerConversionSection />

    <!-- ============ 4 REASONS TO BUILD YOUR CAREER DIFFERENTLY ============ -->
    <CareerAdvantagesSection />

    <!-- ============ PROJECTS & JOBS CAREER NAVIGATION ============ -->
    <CareerNavigationSection />

    <!-- ============ THREE CORE CAREER USPs ============ -->
    <CareerUSPSection />

    <!-- ============ INDUSTRY & CAREER ECOSYSTEM ============ -->
    <section class="section partners" aria-labelledby="ecosystem-heading">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Industry &amp; Career Ecosystem</span>
          <h2 id="ecosystem-heading">Companies, Tools and Roles Shaping Today's Careers</h2>
          <p class="partners-lead">
            Familiar names and ecosystems that appear across our sample
            career-opportunity data — shown here for context.
          </p>
        </div>
        <LogoMarquee />
        <p class="partners-note">
          Demo note: the company names above are <strong>sample/illustrative
          data</strong> used for demonstration — they are not a confirmed TKSR
          hiring-partner network. Verified partner listings will be published here
          when confirmed.
        </p>
      </div>
    </section>

    <!-- ============ LIVE VACANCIES. APPLY NOW. ============ -->
    <section class="section section--soft vac-preview" aria-labelledby="vacancies-heading">
      <div class="container">
        <div class="vac-shell">
          <div class="vac-head">
            <span class="vac-head-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="13" rx="2.5"/><path d="M16 7V5.5A2.5 2.5 0 0 0 13.5 3h-3A2.5 2.5 0 0 0 8 5.5V7"/><path d="M2.5 12.5h19"/></svg>
            </span>
            <div class="vac-head-copy">
              <h2 id="vacancies-heading">{{ vacancySection.heading }}</h2>
              <p class="vac-head-sub">{{ vacancySection.subline }}</p>
            </div>
            <span class="vac-live-pill">{{ vacancySection.liveBadge }}</span>
          </div>

          <div class="vac-rows">
            <article v-for="v in vacancies" :key="v.id" class="vac-row">
              <span class="vac-logo" aria-hidden="true">{{ v.initials }}</span>
              <div class="vac-row-main">
                <h3 class="vac-role">{{ v.role }}</h3>
                <p class="vac-company-row">
                  <span class="vac-company">{{ v.company }}</span>
                  <span class="vac-sample-pill">{{ vacancySection.sampleBadge }}</span>
                </p>
                <ul class="vac-tags">
                  <li v-for="t in v.technologies" :key="t">{{ t }}</li>
                </ul>
              </div>
              <div class="vac-row-side">
                <span class="vac-comp">{{ v.compensationDisplay }}</span>
                <router-link :to="`/jobs/${v.jobId}`" class="vac-apply">
                  {{ vacancySection.applyLabel }}
                  <span aria-hidden="true">→</span>
                </router-link>
              </div>
            </article>
          </div>

          <p class="vac-bottom">{{ vacancySection.bottomCopy }}</p>

          <router-link :to="vacancySection.ctaTo" class="vac-cta">
            {{ vacancySection.ctaLabel }}
            <span aria-hidden="true">→</span>
          </router-link>

          <p class="vac-demo-note" role="note">{{ vacancySection.demoNote }}</p>
        </div>
      </div>
    </section>

    <!-- ============ INDUSTRY EXPERTS ============ -->
    <IndustryExpertsSection />

    <!-- ============ LIVE / REAL-WORLD PROJECTS ============ -->
    <LiveProjectsSection />

    <!-- ============ TRUST & PROOF ============ -->
    <TrustProofSection />

    <!-- ============ CAREER-FOCUSED LEARNING ============ -->
    <CareerProgramsSection />

    <!-- ============ COURSES ============ -->
    <section class="section section--soft cts-section" id="courses" aria-labelledby="courses-heading">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Courses</span>
          <h2 id="courses-heading">Build the Right Skills for Your Career</h2>
          <p class="cts-lead">
            Explore courses designed to help you learn, grow and move forward.
          </p>
        </div>
        <div class="cat-tabs" role="group" aria-label="Filter courses by category">
          <button
            v-for="c in CATEGORIES"
            :key="c"
            class="cat-tab"
            :class="{ active: activeCategory === c }"
            :aria-pressed="activeCategory === c"
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

    <!-- ============ LEARNER STORIES (HONEST PENDING-VERIFICATION STATE) ============ -->
    <section class="section section--dark ls-section" id="success-stories" aria-labelledby="stories-heading">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Learner Stories</span>
          <h2 id="stories-heading">Outcomes Are Reported Only When Verified</h2>
          <p class="ls-lead">
            TKSR does not publish fake testimonials, placement percentages, hike
            claims or salary statistics. Real learner stories will be published
            here as verified outcomes become available.
          </p>
        </div>

        <div class="stories-panel">
          <span class="ls-badge">Verification Pending</span>
          <h3>No fabricated success stories</h3>
          <p>
            Trust through transparency beats fake social proof. If you are a TKSR
            learner with a story to share, we would love to verify and feature it
            in the future.
          </p>
          <router-link to="/contact-us" class="btn btn-white ls-cta">
            Talk to a Career Expert
          </router-link>
        </div>
      </div>
    </section>

    <!-- ============ PRACTITIONER SESSIONS ============ -->
    <section class="section webinar" aria-labelledby="practitioner-heading">
      <div class="container">
        <div class="webinar-panel">
          <div class="section-head webinar-head">
            <span class="eyebrow">Practitioner Sessions</span>
            <h2 id="practitioner-heading">Learn from Industry Practitioners</h2>
            <p>
              Expert-led sessions explore industry trends, practical skills and
              insights to help you move your career forward — join in and bring
              your questions.
            </p>
          </div>
          <div class="webinar-stats">
            <div class="ws"><strong>Expert-Led</strong><span>Practitioners with industry experience</span></div>
            <div class="ws"><strong>Practical</strong><span>Skills you can apply</span></div>
            <div class="ws"><strong>Current</strong><span>Industry-relevant topics</span></div>
            <div class="ws"><strong>Career-Focused</strong><span>Guidance toward opportunities</span></div>
            <div class="ws"><strong>Open Q&amp;A</strong><span>Bring your questions</span></div>
            <div class="ws"><strong>Free Access</strong><span>Join via our public channels</span></div>
          </div>
          <div class="webinar-cta">
            <router-link to="/contact-us" class="btn btn-white">
              Talk to a Career Expert
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ ENTERPRISE SOLUTIONS / WORKFORCE ============ -->
    <section class="section section--soft workforce-section" id="workforce" aria-labelledby="workforce-heading">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Enterprise Solutions</span>
          <h2 id="workforce-heading">Build a Future-Ready Workforce with TKSR Career</h2>
          <p>
            Upskill your teams with industry-focused training designed around your
            business, technology and workforce needs.
          </p>
        </div>

        <div class="workforce-features">
          <div v-for="f in features" :key="f.title" class="wf-card">
            <strong>{{ f.title }}</strong>
            <p>{{ f.text }}</p>
          </div>
        </div>

        <div class="workforce-card">
          <h3 class="wc-title">Technologies Explored</h3>
          <div class="alumni-row">
            <span v-for="t in ecosystemTech" :key="t" class="alumni-name">
              {{ t }}
            </span>
          </div>
          <p class="alumni-note">
            Tools and practices represented across our learning programs — drawn
            from the actual course content shown on this site.
          </p>
        </div>

        <div class="workforce-cta">
          <router-link to="/contact-us" class="btn btn-primary">
            Request A Demo
          </router-link>
        </div>
      </div>
    </section>

    <!-- ============ WHY THE TKSR APPROACH ============ -->
    <section class="section approach-section" aria-labelledby="approach-heading">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">The TKSR Approach</span>
          <h2 id="approach-heading">How Career-Focused Learning Looks at TKSR</h2>
          <p>
            This comparison describes TKSR's own learning approach — it is not a
            claim about what other providers do.
          </p>
        </div>

        <div class="compare">
          <div class="cmp-head">
            <div class="cmp-col cmp-col--feature">Aspect</div>
            <div class="cmp-col cmp-col--theirs">Traditional Learning</div>
            <div class="cmp-col cmp-col--ours">
              <span class="cmp-logo">TKSR Career Approach</span>
            </div>
          </div>
          <div v-for="row in approachComparison" :key="row.label" class="cmp-row">
            <div class="cmp-col cmp-col--feature"><strong>{{ row.label }}</strong></div>
            <div class="cmp-col cmp-col--theirs">{{ row.traditional }}</div>
            <div class="cmp-col cmp-col--ours">{{ row.tksr }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ LEAD CTA ============ -->
    <section class="section lead" id="lead" aria-labelledby="lead-heading">
      <div class="container lead-grid">
        <div class="lead-copy">
          <span class="eyebrow">Start Your Career Journey</span>
          <h2 id="lead-heading">Build Skills Today to Unlock Your Career Edge</h2>
          <p>
            Practical, career-focused learning designed to help you build the right
            skills and move your career forward.
          </p>
          <div class="lead-stats">
            <div v-for="lp in leadPoints" :key="lp.num">
              <strong>{{ lp.num }}</strong>
              <span>{{ lp.label }}</span>
            </div>
          </div>
          <p class="lead-contact">
            Prefer to talk? Reach TKSR Career directly at
            <a :href="SITE.phoneHref">{{ SITE.phone }}</a> or
            <a :href="'mailto:' + SITE.email">{{ SITE.email }}</a>.
          </p>
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
                I agree to TKSR Career's Terms &amp; Conditions and Privacy Policy.
              </span>
            </label>
            <button class="btn btn-primary lead-submit" type="submit">
              Send My Request →
            </button>
            <p v-if="leadSubmitted" class="success-note">
              Thanks! This demo form records your request locally — no data is
              sent anywhere. For a real response, contact TKSR at
              {{ SITE.phone }} or {{ SITE.email }}.
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
    radial-gradient(880px 420px at 86% -12%, rgba(124, 58, 237, 0.14), transparent 62%),
    radial-gradient(760px 400px at -8% 108%, rgba(37, 99, 235, 0.1), transparent 60%),
    linear-gradient(180deg, #fbfcff 0%, var(--bg-soft) 100%);
  padding: 54px 0 26px;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}

.hero-copy .eyebrow {
  margin-bottom: 18px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.35px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

.hero-copy h1 {
  font-size: clamp(2.3rem, 4.1vw, 3rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.028em;
  color: var(--ink);
}

/* Each heading line is a block-level span — the reference breaks are always
   controlled ("Build Skills That Move Your" / "Career Forward"). */
.hero-line {
  display: block;
}

.grad-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  margin: 18px 0 28px;
  color: var(--muted);
  font-size: 15.5px;
  line-height: 1.55;
  max-width: 540px;
}

.hero-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-cta .btn {
  min-height: 48px;
  padding: 0 26px;
  border-radius: 10px;
  font-size: 15px;
}

.hero-cta-alt {
  color: var(--primary-600);
  border-color: #d7e0f2;
  background: #fff;
  box-shadow: var(--shadow);
}

.hero-cta-alt:hover {
  border-color: var(--primary-600);
  color: var(--primary-600);
}

.hero-stats {
  display: flex;
  align-items: center;
  margin-top: 32px;
}

.hs {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 24px;
}

.hs:first-child {
  padding-left: 0;
}

.hs + .hs {
  border-left: 1px solid rgba(37, 99, 235, 0.16);
}

.hs-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(120deg, #2563eb, #7c3aed);
  color: #fff;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 18px rgba(29, 78, 216, 0.28);
}

.hs-body strong {
  display: block;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--ink);
}

.hs-body span {
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
}

.hero-visual {
  position: relative;
}

/* A8/A9 — large gradient card with a ~1.08 aspect ratio and static premium
   composition (learner centered, caption bottom-left, floating chips). */
.hero-card {
  position: relative;
  overflow: hidden;
  background: var(--gradient);
  border-radius: 20px;
  padding: 40px 32px 72px;
  min-height: 380px;
  aspect-ratio: 1.08;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 30px 60px rgba(29, 78, 216, 0.35);
}

/* Decorative soft glows (A11) — pure CSS, static, no animation. */
.hero-card::before {
  content: '';
  position: absolute;
  width: 260px;
  height: 260px;
  top: -90px;
  right: -70px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.22), transparent 65%);
  pointer-events: none;
}

.hero-card::after {
  content: '';
  position: absolute;
  width: 240px;
  height: 240px;
  bottom: -100px;
  left: -60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.14), transparent 65%);
  pointer-events: none;
}

.hero-avatar {
  position: relative;
  z-index: 1;
  font-size: 118px;
  filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.28));
}

.hero-avatar-caption {
  position: absolute;
  bottom: 20px;
  left: 22px;
  z-index: 1;
  color: #fff;
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.hero-avatar-caption strong {
  font-size: 15.5px;
  font-weight: 600;
}

.hero-avatar-caption span {
  font-size: 11.5px;
  opacity: 0.85;
}

/* Floating chips (A9/A10) — positioned UI elements inside the card. */
.chip {
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #fff;
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #1e2a52;
  box-shadow: 0 14px 30px rgba(13, 31, 78, 0.28);
  white-space: nowrap;
}

.chip-ico {
  font-size: 13px;
  line-height: 1;
}

.chip-a {
  top: 22px;
  right: 20px;
}

.chip-b {
  top: 30%;
  left: -14px;
}

.chip-c {
  bottom: 24%;
  right: 12px;
}

/* ---- industry & career ecosystem : compact white credibility band.
        Rhythm: USP (soft) → ecosystem (white) → live vacancies (soft). */
.partners {
  background: var(--bg);
  padding: 24px 0 36px;
}

.partners .section-head {
  margin-bottom: 16px;
}

/* Lavender pill eyebrow — same family as the phase 4/5/6 section pills. */
.partners .eyebrow {
  margin-bottom: 10px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

/* Compact supporting heading — intentionally smaller than the major section
   headlines (phases 4/5/6 use clamp up to 2.25rem); 20–24px desktop. */
.partners h2 {
  margin: 0;
  font-size: clamp(1.2rem, 2.6vw, 1.45rem);
  line-height: 1.2;
  color: var(--ink);
}

.partners-lead {
  margin: 8px auto 0;
  max-width: 720px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.partners-lead,
.partners-note {
  text-align: center;
}

/* Honest demo note — kept verbatim, slightly tightened margins. */
.partners-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--muted);
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 10px;
  padding: 9px 14px;
  line-height: 1.55;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

/* ---- courses ---- */
.cts-section {
  padding: 48px 0 52px;
}

.cts-section .section-head {
  margin-bottom: 24px;
}

/* Lavender pill eyebrow — same family as the phase 6–12 section pills. */
.cts-section .eyebrow {
  margin-bottom: 12px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

/* Compact heading on the soft surface. */
.cts-section h2 {
  margin: 0;
  font-size: clamp(1.45rem, 2.6vw, 2.05rem);
  line-height: 1.15;
  color: var(--ink);
}

.cts-lead {
  margin: 8px auto 0;
  max-width: 720px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
  text-align: center;
}

.cat-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 28px;
}

.cat-tab {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--ink-2);
  font-family: inherit;
  font-weight: 800;
  font-size: 12.5px;
  padding: 8px 15px;
  border-radius: 999px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.cat-tab:hover {
  border-color: var(--primary-600);
  color: var(--primary-600);
}

.cat-tab:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.5);
  outline-offset: 2px;
}

.cat-tab.active {
  background: var(--gradient);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 8px 20px rgba(29, 78, 216, 0.3);
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.center-cta {
  text-align: center;
  margin-top: 28px;
}

/* ---- LIVE VACANCIES. APPLY NOW. : compact white shell card (rhythm: ecosystem
        white → vacancies soft → experts) ---- */
.vac-preview {
  padding: 36px 0 48px;
}

.vac-shell {
  max-width: 980px;
  margin-inline: auto;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 18px 44px rgba(13, 31, 78, 0.1);
  padding: 22px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ---- header: gradient icon | heading + subline | LIVE pill ---- */
.vac-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.vac-head-ico {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 10px 22px rgba(79, 70, 229, 0.28);
}

.vac-head-ico svg {
  width: 22px;
  height: 22px;
}

.vac-head-copy {
  flex: 1 1 auto;
  min-width: 0;
}

.vac-head-copy h2 {
  margin: 0;
  font-size: clamp(1.12rem, 2.2vw, 1.5rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--ink);
}

.vac-head-sub {
  margin: 4px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
}

/* Red/pink status pill, top-right of the heading. */
.vac-live-pill {
  flex-shrink: 0;
  align-self: flex-start;
  margin: 2px 0 0 auto;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  padding: 5px 12px;
  border-radius: 999px;
  box-shadow: 0 6px 14px rgba(244, 63, 94, 0.32);
}

/* ---- three horizontal vacancy rows ---- */
.vac-rows {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}

.vac-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
}

.vac-row + .vac-row {
  border-top: 1px solid var(--border);
}

.vac-logo {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #fff;
  background: var(--gradient);
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.22);
}

.vac-row-main {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.vac-role {
  margin: 0;
  font-size: 15.5px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: var(--ink);
}

.vac-company-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
}

.vac-company {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
}

/* Subtle sample marker — the claim-safety indicator for unverified listings. */
.vac-sample-pill {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.vac-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0;
  margin: 2px 0 0;
}

.vac-tags li {
  font-size: 11px;
  font-weight: 700;
  color: #4f46e5;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.16);
  padding: 3px 9px;
  border-radius: 999px;
}

.vac-row-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 134px;
}

.vac-comp {
  font-size: 14.5px;
  font-weight: 800;
  color: #4f46e5;
  white-space: nowrap;
}

.vac-apply {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  background: var(--gradient);
  color: #fff;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.3px;
  text-decoration: none;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.28);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.vac-apply:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(79, 70, 229, 0.36);
}

/* ---- bottom copy + full-width gradient CTA ---- */
.vac-bottom {
  margin: 2px auto 0;
  max-width: 560px;
  text-align: center;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--muted);
}

.vac-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 18px;
  border-radius: 12px;
  background: var(--gradient);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-decoration: none;
  box-shadow: 0 12px 26px rgba(79, 70, 229, 0.3);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.vac-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(79, 70, 229, 0.4);
}

.vac-demo-note {
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
  font-size: 11.5px;
  line-height: 1.55;
  color: var(--muted);
}

/* ---- responsive: rows stay horizontal on tablet, stack on mobile ---- */
@media (max-width: 760px) {
  .vac-row-side {
    min-width: 118px;
  }
}

@media (max-width: 640px) {
  .vac-preview {
    padding: 32px 0 40px;
  }

  .vac-shell {
    padding: 16px 14px;
    gap: 12px;
    border-radius: 16px;
  }

  .vac-head {
    gap: 10px;
  }

  .vac-head-ico {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  .vac-head-ico svg {
    width: 19px;
    height: 19px;
  }

  .vac-head-copy h2 {
    font-size: 1rem;
  }

  .vac-head-sub {
    font-size: 11.5px;
  }

  .vac-live-pill {
    padding: 4px 10px;
    font-size: 9.5px;
  }

  .vac-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 14px;
  }

  .vac-logo {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }

  .vac-row-side {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
    width: 100%;
  }

  .vac-comp {
    font-size: 13.5px;
  }

  .vac-apply {
    padding: 9px 16px;
  }

  .vac-bottom {
    font-size: 12px;
  }

  .vac-cta {
    font-size: 13.5px;
    padding: 12px 16px;
  }

  .vac-demo-note {
    font-size: 11px;
  }
}

/* ---- learner stories (honest pending-verification state) ---- */
.ls-section {
  padding: 48px 0 52px;
}

.ls-section .section-head {
  margin-bottom: 24px;
}

/* Lavender pill eyebrow — same family as the phase 6–13 section pills. */
.ls-section .eyebrow {
  margin-bottom: 12px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

.ls-section h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  line-height: 1.12;
  color: #fff;
}

.ls-lead {
  margin: 8px auto 0;
  max-width: 720px;
  font-size: 13.5px;
  line-height: 1.6;
  color: #c7d2fe;
  text-align: center;
}

/* Central transparency panel — intentional pending state, not an error box. */
.stories-panel {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  box-shadow: 0 20px 46px rgba(0, 0, 0, 0.28);
  padding: 28px;
}

.ls-badge {
  display: inline-flex;
  align-items: center;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #4f46e5;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.18);
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.stories-panel h3 {
  color: #fff;
  margin: 0 0 10px;
  font-size: 18px;
  line-height: 1.3;
}

.stories-panel p {
  color: #c7d2fe;
  font-size: 13.5px;
  line-height: 1.65;
  margin: 0 0 20px;
}

.ls-cta {
  margin-top: 4px;
}

/* ---- webinar / practitioner sessions (phase 15) ---- */
.webinar {
  padding: 48px 0 56px;
}

.webinar-panel {
  background:
    radial-gradient(700px 300px at 90% -20%, rgba(255, 255, 255, 0.12), transparent 60%),
    var(--bg-dark);
  border-radius: 22px;
  padding: 40px 48px;
  position: relative;
  overflow: hidden;
}

/* Lavender pill eyebrow — same family as phases 6–14 section pills. */
.webinar-panel .eyebrow {
  margin-bottom: 14px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

/* Centered compact head on the dark panel. */
.webinar-head {
  text-align: center;
  margin-bottom: 4px;
}

.webinar-panel h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  line-height: 1.12;
  color: #fff;
}

.webinar-panel .section-head p {
  margin: 10px auto 0;
  max-width: 680px;
  font-size: 13.5px;
  line-height: 1.6;
  color: #c7d2fe;
}

.webinar-stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.ws {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 16px 10px 14px;
  text-align: center;
}

.ws strong {
  display: block;
  font-size: 14px;
  color: #fff;
}

.ws span {
  font-size: 12px;
  color: #a5b4fc;
  font-weight: 500;
}

.webinar-cta {
  text-align: center;
  margin-top: 26px;
}

/* ---- enterprise solutions / workforce (phase 16) ---- */
.workforce-section {
  padding: 48px 0 56px;
}

.workforce-section .eyebrow {
  margin-bottom: 14px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

.workforce-section .section-head {
  margin-bottom: 16px;
}

.workforce-section .section-head h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  line-height: 1.12;
}

.workforce-section .section-head p {
  margin: 10px auto 0;
  max-width: 680px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
}

.workforce-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.wf-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: var(--shadow);
}

.wf-card strong {
  display: block;
  font-size: 14.5px;
  margin-bottom: 4px;
}

.wf-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: var(--muted);
}

.workforce-card {
  max-width: 800px;
  margin: 20px auto 0;
  background: var(--gradient);
  border-radius: 18px;
  padding: 32px 28px;
  text-align: center;
  color: #fff;
  box-shadow: 0 12px 32px rgba(29, 78, 216, 0.22);
}

.wc-title {
  color: #fff;
  font-size: 1.15rem;
}

.alumni-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 18px 0;
}

.alumni-name {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 7px 13px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
}

.alumni-note {
  font-size: 13px;
  opacity: 0.9;
  margin-top: 10px;
}

.workforce-cta {
  text-align: center;
  margin-top: 26px;
}

/* ---- the tksr approach / comparison (phase 17) ---- */
.approach-section {
  padding: 48px 0 56px;
}

.approach-section .eyebrow {
  margin-bottom: 14px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

.approach-section .section-head {
  margin-bottom: 20px;
}

.approach-section .section-head h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  line-height: 1.12;
}

.approach-section .section-head p {
  margin: 10px auto 0;
  max-width: 680px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
}

.compare {
  border: 1px solid var(--border);
  border-radius: 18px;
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
  padding: 14px 18px;
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
  font-size: 12px;
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

/* ---- lead cta / contact conversion (phase 18) ---- */
.lead {
  background:
    radial-gradient(900px 420px at 5% 0%, rgba(37, 99, 235, 0.12), transparent 60%),
    var(--bg-soft);
  padding: 48px 0 56px;
}

.lead-grid {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 56px;
  align-items: center;
}

.lead-copy .eyebrow {
  margin-bottom: 16px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

.lead-copy h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  line-height: 1.12;
}

.lead-copy p {
  color: var(--muted);
  margin: 10px 0 22px;
  max-width: 520px;
  font-size: 13.5px;
  line-height: 1.6;
}

.lead-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lead-stats > div {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.lead-stats strong {
  font-size: 1.25rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lead-stats span {
  color: var(--muted);
  font-weight: 600;
  font-size: 13.5px;
}

.lead-copy .lead-contact {
  margin: 24px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
}

.lead-contact a {
  color: var(--primary-600);
  font-weight: 600;
}

.lead-form {
  padding: 32px 30px;
  border-radius: 18px;
}

.lead-form h3 {
  margin-bottom: 18px;
  font-size: 1.25rem;
}

.lead-submit {
  width: 100%;
  height: 48px;
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
  font-weight: 600;
  font-size: 13.5px;
}

/* ---- responsive ---- */
@media (max-width: 1024px) {
  .lead-grid {
    grid-template-columns: 1fr;
  }

  /* Reduced two-column hero (1024–901px): tighter gap, card, avatar, chips. */
  .hero-grid {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 32px;
  }

  .hero-copy h1 {
    font-size: clamp(1.9rem, 3.8vw, 2.4rem);
  }

  .hero {
    padding-bottom: 24px;
  }

  .hero-card {
    min-height: 330px;
    aspect-ratio: 1.1;
    padding: 30px 24px 64px;
  }

  .hero-avatar {
    font-size: 92px;
  }

  .chip {
    font-size: 11px;
    padding: 7px 11px;
  }

  .hero-cta .btn {
    padding: 0 20px;
    font-size: 14.5px;
  }

  .webinar-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .cmp-head,
  .cmp-row {
    grid-template-columns: 1fr;
  }

  .cmp-col--feature {
    border-bottom: 1px solid var(--border);
  }
}

@media (max-width: 900px) {
  /* Hero stacks below 900px — clean single column (tablet/mobile). */
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .hero-copy h1 {
    font-size: clamp(2rem, 4.6vw, 2.6rem);
  }

  .hero {
    padding: 42px 0 26px;
  }

  .hero-card {
    min-height: 300px;
    aspect-ratio: auto;
    max-width: 520px;
    margin: 0 auto;
    padding: 36px 26px 64px;
  }

  .hero-avatar {
    font-size: 96px;
  }
}

@media (max-width: 560px) {
  .hero {
    padding: 36px 0 24px;
  }

  .hero-copy h1 {
    font-size: clamp(1.9rem, 8vw, 2.4rem);
  }

  .hero-cta {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-cta .btn {
    width: 100%;
    min-height: 46px;
  }

  .hero-stats {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    margin-top: 28px;
  }

  .hs {
    padding: 0;
  }

  .hs + .hs {
    border-left: none;
    border-top: 1px solid rgba(37, 99, 235, 0.16);
    padding-top: 14px;
  }

  .hero-card {
    min-height: 280px;
    padding: 30px 18px 60px;
  }

  .hero-avatar {
    font-size: 84px;
  }

  .chip {
    font-size: 11px;
    padding: 7px 11px;
    gap: 5px;
  }

  .chip-a {
    top: 14px;
    right: 8px;
  }

  .chip-b {
    top: 28%;
    left: -6px;
  }

  .chip-c {
    bottom: 22%;
    right: 6px;
  }

  .cmp-col {
    padding: 14px 16px;
  }
}

/* Courses grid — homepage family breakpoints (3 ≥ 901 · 2 641–900 · 1 ≤ 640) */
@media (min-width: 901px) {
  .course-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cts-section {
    padding: 40px 0 44px;
  }
}

@media (max-width: 640px) {
  .course-grid {
    grid-template-columns: 1fr;
  }

  .cts-section {
    padding: 34px 0 38px;
  }

  /* Constrain tab scrolling to the tab row only — never the page. */
  .cat-tabs {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
  }

  .cat-tabs::-webkit-scrollbar {
    display: none;
  }
}

/* Learner Stories — family breakpoints for spacing + panel padding */
@media (max-width: 900px) {
  .ls-section {
    padding: 40px 0 44px;
  }
}

@media (max-width: 640px) {
  .ls-section {
    padding: 34px 0 38px;
  }

  .stories-panel {
    padding: 24px 20px;
  }
}

/* Practitioner Sessions — family breakpoints */
@media (max-width: 900px) {
  .webinar {
    padding: 40px 0 44px;
  }

  .webinar-panel {
    padding: 36px 32px;
  }

  .webinar-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}

@media (max-width: 640px) {
  .webinar {
    padding: 34px 0 38px;
  }

  .webinar-panel {
    padding: 30px 20px;
    border-radius: 18px;
  }

  .webinar-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .ws {
    padding: 14px 8px 12px;
  }
}

/* Enterprise Solutions — family breakpoints */
@media (max-width: 900px) {
  .workforce-section {
    padding: 40px 0 44px;
  }

  .workforce-card {
    padding: 28px 20px;
  }
}

@media (max-width: 640px) {
  .workforce-section {
    padding: 34px 0 38px;
  }

  .workforce-features {
    grid-template-columns: 1fr;
  }

  .workforce-card {
    padding: 24px 16px;
    border-radius: 18px;
  }

  .alumni-name {
    padding: 6px 11px;
    font-size: 12.5px;
  }
}

/* The TKSR Approach — family breakpoints */
@media (max-width: 900px) {
  .approach-section {
    padding: 40px 0 44px;
  }
}

@media (max-width: 640px) {
  .approach-section {
    padding: 34px 0 38px;
  }
}

/* Lead CTA — family breakpoints */
@media (max-width: 1024px) {
  .lead-grid {
    gap: 44px;
  }
}

@media (max-width: 900px) {
  .lead {
    padding: 40px 0 44px;
  }

  .lead-form {
    padding: 30px 26px;
  }
}

@media (max-width: 640px) {
  .lead {
    padding: 34px 0 38px;
  }

  .lead-form {
    padding: 24px 18px;
  }

  .lead-stats {
    gap: 10px;
  }
}
</style>