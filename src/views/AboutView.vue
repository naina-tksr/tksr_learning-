<script setup lang="ts">
/**
 * About TKSR Career — trust through transparency.
 *
 * Company history, learner counts, partner networks and outcome statistics are
 * NOT presented here because none are verified. This page describes TKSR's
 * learning philosophy and approach instead, and clearly separates what is
 * sample/demo content from what is real contact/positioning information.
 */

const approachSteps = [
  {
    step: '01',
    title: 'Learn Industry-Relevant Skills',
    text: 'Programs are built around modern technologies and the skills that career roles actually require today (as shown across the course content on this site).',
  },
  {
    step: '02',
    title: 'Build Real-World Projects',
    text: 'Move from theory to implementation with projects that follow Concept → Problem → Build → Deploy → Portfolio.',
  },
  {
    step: '03',
    title: 'Get Expert-Led Guidance',
    text: 'Learn with practitioner-style guidance based on hands-on industry experience. The profiles on this site are sample/demo demonstrations.',
  },
  {
    step: '04',
    title: 'Build Portfolio Evidence',
    text: 'Turn completed work into portfolio pieces you can present — concrete evidence of what you can do.',
  },
  {
    step: '05',
    title: 'Explore Career Opportunities',
    text: 'Understand what roles ask for and which skills to develop, using the sample opportunity data on this site.',
  },
]

const pillars = [
  { icon: '🎯', title: 'Our Mission', text: 'Help learners move closer to industry through relevant skills, practical projects, expert guidance and career opportunity awareness.' },
  { icon: '🔭', title: 'Our Vision', text: 'A learning experience where every professional can see the skills that matter, build evidence of them, and understand where they lead.' },
  { icon: '💎', title: 'Our Values', text: 'Learner first, honesty in outcomes, hands-on everything, and long-term career partnership — not short courses or inflated promises.' },
]

const highlights = [
  { strong: 'Skills First', span: 'Industry-relevant learning' },
  { strong: 'Projects', span: 'Practical implementation' },
  { strong: 'Experts', span: 'Practitioner-led guidance' },
  { strong: 'Careers', span: 'Opportunity awareness' },
]
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <router-link to="/">Home</router-link> <span>/</span> About Us
        </div>
        <h1>About TKSR Career</h1>
        <p>
          TKSR helps learners move closer to industry through skills, projects,
          experts and career opportunities — communicated honestly, without
          fabricated outcomes.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container about-intro">
        <div class="ai-copy">
          <span class="eyebrow">📖 Our Approach</span>
          <h2>Learning Designed to Move You Closer to Industry</h2>
          <p>
            TKSR programs are built on one belief: learning should mirror real
            work. That means modern, industry-relevant skills; practical projects
            you can complete and show; and guidance shaped by people who work with
            these technologies day to day.
          </p>
          <p>
            We also believe in honesty. Jobs, projects, expert profiles and career
            mapping on this site are clearly labeled sample/demo content, and we do
            not publish invented learner counts, success rates, salaries or partner
            claims.
          </p>
          <div class="about-stats">
            <div v-for="h in highlights" :key="h.strong">
              <strong>{{ h.strong }}</strong>
              <span>{{ h.span }}</span>
            </div>
          </div>
        </div>
        <div class="about-card">
          <span class="big-emoji" aria-hidden="true">🚀</span>
          <h3>Our Promise</h3>
          <p>
            Every TKSR program is designed to leave you with a skill you can apply,
            a project you can show, and a clearer picture of the roles your skills
            align with. We do not claim guaranteed jobs, placements or salaries.
          </p>
          <router-link to="/courses" class="btn btn-buy">Explore Programs</router-link>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="pillar-grid">
          <div v-for="p in pillars" :key="p.title" class="pillar card">
            <span class="p-icon" aria-hidden="true">{{ p.icon }}</span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">🧭 The TKSR Way</span>
          <h2>From Skills to Career Opportunities</h2>
          <p>
            The learning journey TKSR programs are designed around — a process, not
            a promise of placement or employment.
          </p>
        </div>
        <div class="timeline">
          <div
            v-for="(m, i) in approachSteps"
            :key="m.step"
            class="tl-item"
            :class="{ right: i % 2 === 1 }"
          >
            <div class="tl-dot"></div>
            <div class="tl-card">
              <strong>Step {{ m.step }}</strong>
              <p class="tl-title">{{ m.title }}</p>
              <p>{{ m.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container mentors-cta">
        <h2>Guidance from practitioners who understand the work</h2>
        <p>
          TKSR programs are shaped by people with hands-on technology and industry
          experience. The practitioner profiles currently shown on this website are
          sample/demo demonstrations — verified faculty details will be published
          when available.
        </p>
        <router-link to="/contact-us" class="btn btn-accent">
          Talk to a Career Expert →
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-intro {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
}

.ai-copy h2 {
  margin-bottom: 18px;
}

.ai-copy p {
  color: var(--muted);
  margin-bottom: 16px;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 28px;
}

.about-stats > div {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 10px;
  text-align: center;
}

.about-stats strong {
  display: block;
  font-size: 1.15rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about-stats span {
  font-size: 12.5px;
  color: var(--muted);
  font-weight: 600;
}

.about-card {
  background: var(--gradient);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 44px 36px;
  text-align: center;
  box-shadow: 0 24px 50px rgba(29, 78, 216, 0.35);
}

.big-emoji {
  font-size: 56px;
  display: block;
  margin-bottom: 14px;
}

.about-card h3 {
  color: #fff;
  margin-bottom: 12px;
}

.about-card p {
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 22px;
  font-size: 14.5px;
  line-height: 1.6;
}

.pillar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.pillar {
  padding: 30px 26px;
}

.p-icon {
  font-size: 32px;
}

.pillar h3 {
  margin: 14px 0 10px;
}

.pillar p {
  color: var(--muted);
  font-size: 14.5px;
}

.timeline {
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  padding: 10px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  transform: translateX(-50%);
  background: var(--gradient);
  border-radius: 3px;
}

.tl-item {
  position: relative;
  width: 50%;
  padding: 0 40px 34px;
}

.tl-item.right {
  left: 50%;
}

.tl-dot {
  position: absolute;
  top: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--gradient-soft);
  border: 4px solid #fff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
}

.tl-item:not(.right) .tl-dot {
  right: -8px;
}

.tl-item.right .tl-dot {
  left: -8px;
}

.tl-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 18px 20px;
}

.tl-card strong {
  color: var(--primary-600);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.tl-card .tl-title {
  margin-top: 4px;
  font-weight: 800;
  color: var(--ink);
}

.tl-card p {
  color: var(--muted);
  font-size: 14px;
  margin-top: 4px;
}

.mentors-cta {
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}

.mentors-cta p {
  color: var(--muted);
  margin: 14px 0 22px;
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .about-intro {
    grid-template-columns: 1fr;
  }

  .pillar-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .timeline::before {
    left: 12px;
  }

  .tl-item,
  .tl-item.right {
    width: 100%;
    left: 0;
    padding: 0 0 28px 44px;
  }

  .tl-item .tl-dot,
  .tl-item.right .tl-dot {
    left: 5px;
    right: auto;
  }
}
</style>