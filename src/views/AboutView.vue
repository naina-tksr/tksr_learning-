<script setup lang="ts">
const milestones = [
  { year: '2016', text: 'TKSR Learning founded in Bengaluru with a single DevOps batch of 12 learners.' },
  { year: '2019', text: 'Crossed 10,000 learners and launched our first enterprise training programs.' },
  { year: '2022', text: 'Built a global expert mentor network of 1,000+ industry architects.' },
  { year: '2026', text: 'Reached 100K+ active learners, 400+ hiring partners and 25K+ professionals upskilled.' },
]

const pillars = [
  { icon: '🎯', title: 'Our Mission', text: 'Bridge the gap between classroom learning and board-room execution with project-led, career-focused education.' },
  { icon: '🔭', title: 'Our Vision', text: 'A world where every professional has access to expert mentorship and skills that are genuinely job-ready.' },
  { icon: '💎', title: 'Our Values', text: 'Learner first, honesty in outcomes, hands-on everything, and long-term career partnership — not short courses.' },
]
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <router-link to="/">Home</router-link> <span>/</span> About Us
        </div>
        <h1>About TKSR Learning</h1>
        <p>
          We don't just teach skills; we build careers. A learning ecosystem where
          expert mentors, live enterprise projects and placement support work together.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container about-intro">
        <div class="ai-copy">
          <span class="eyebrow">📖 Our Story</span>
          <h2>From a 12-learner batch to a 100K+ learner community</h2>
          <p>
            TKSR Learning started in 2024 with one belief: professionals deserve
            training that mirrors real work, taught by people who actually do the work.
            Today we run live, project-led programs in DevOps, Agile & Scrum, Software
            Testing and Project Management — with mentorship from Fortune 500 experts.
          </p>
          <p>
            Our outcomes speak for themselves — 60% average hikes, 86 LPA highest
            salary, 10,000+ successful career transitions and a 400+ hiring network
            that opens doors long after graduation.
          </p>
          <div class="about-stats">
            <div><strong>10+</strong><span>Years of Experience</span></div>
            <div><strong>100K+</strong><span>Active Learners</span></div>
            <div><strong>1,000+</strong><span>Expert Mentors</span></div>
            <div><strong>400+</strong><span>Hiring Partners</span></div>
          </div>
        </div>
        <div class="about-card">
          <span class="big-emoji">🚀</span>
          <h3>Our Promise</h3>
          <p>
            Every TKSR program ends with a skill you can demo, a project you can show,
            a certification the industry respects — and a partner network that hires.
          </p>
          <router-link to="/courses" class="btn btn-primary">Explore Programs</router-link>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="pillar-grid">
          <div v-for="p in pillars" :key="p.title" class="pillar card">
            <span class="p-icon">{{ p.icon }}</span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">🗺️ Milestones</span>
          <h2>The Journey So Far</h2>
        </div>
        <div class="timeline">
          <div v-for="(m, i) in milestones" :key="m.year" class="tl-item" :class="{ right: i % 2 === 1 }">
            <div class="tl-dot"></div>
            <div class="tl-card">
              <strong>{{ m.year }}</strong>
              <p>{{ m.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container mentors-cta">
        <h2>Learn from mentors who build for the world’s biggest companies</h2>
        <p>
          Our 1,000+ faculty members are practicing architects, leads and consultants
          from Google, IBM, Infosys, Deloitte, TCS and startups across 20+ domains.
        </p>
        <div class="mentor-logos">
          <span v-for="m in ['Google', 'IBM', 'Infosys', 'Deloitte', 'TCS', 'Amazon', 'Capgemini', 'Accenture']" :key="m">
            {{ m }}
          </span>
        </div>
        <router-link to="/contact-us" class="btn btn-accent">Become a Trainer →</router-link>
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
  font-size: 1.4rem;
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
  font-size: 1.05rem;
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
}

.mentor-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 26px;
}

.mentor-logos span {
  background: #fff;
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 700;
  color: var(--ink-2);
  box-shadow: var(--shadow);
  font-size: 13.5px;
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