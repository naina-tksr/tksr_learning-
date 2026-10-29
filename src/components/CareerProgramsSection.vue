<script setup lang="ts">
import { careerPrograms } from '../data/careerPrograms'

// Compact career-oriented preview — keeps the full coursework on the Courses page.
const featuredPrograms = careerPrograms.slice(0, 3)
</script>

<template>
  <!-- Phase 12: compact dark "Career Programs" band — white trust above,
       soft courses below. Copy kept verbatim from the approved source. -->
  <section class="section section--dark cp-section" aria-labelledby="programs-heading">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">Career Programs</span>
        <h2 id="programs-heading">Build the Skills the Market Is Looking For</h2>
        <p class="cp-lead">
          Explore TKSR programs by the practical skills they teach and the career
          roles they unlock. Each program lists the skills it covers so you can
          compare them against what opportunities ask for.
        </p>
      </div>

      <div class="cp-grid">
        <article v-for="p in featuredPrograms" :key="p.id" class="cp-card">
          <div class="cp-top">
            <span class="cp-cat">{{ p.category }}</span>
            <span class="cp-sample">Sample Mapping</span>
          </div>

          <h3>
            <router-link :to="`/courses/${p.courseId}`">{{ p.title }}</router-link>
          </h3>

          <p class="cp-meta">
            {{ p.duration }} · {{ p.level }}
          </p>

          <p class="cp-desc">{{ p.description }}</p>

          <ul class="cp-pills" aria-label="Skills">
            <li v-for="s in p.skills" :key="s">{{ s }}</li>
          </ul>

          <ul class="cp-roles" v-if="p.careerRoles.length">
            <li v-for="r in p.careerRoles" :key="r">{{ r }}</li>
          </ul>

          <router-link :to="`/courses/${p.courseId}`" class="btn btn-primary cp-view">
            Explore Program →
          </router-link>
        </article>
      </div>

      <div class="center-cta">
        <router-link to="/courses" class="btn btn-primary">Explore All Programs</router-link>
      </div>

      <p class="cp-note">
        Program-to-skill maps are sample/demo data derived from course content for
        career guidance — they are not placement or outcome claims.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Dark band between the white trust section (above) and the soft courses
   section (below) — rhythm: white → dark → soft. */
.cp-section {
  padding: 52px 0 56px;
}

.cp-section .section-head {
  margin-bottom: 28px;
}

/* Lavender pill eyebrow — same family as the phase 4–12 section pills,
   solid light pill on the dark surface for consistent contrast. */
.cp-section .eyebrow {
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

.cp-section h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  line-height: 1.12;
  color: #fff;
}

.cp-section .section-head p {
  color: #c7d2fe;
}

.cp-lead {
  margin: 8px auto 0;
  max-width: 720px;
  font-size: 13.5px;
  line-height: 1.6;
  color: #c7d2fe;
}

.cp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* White compact program cards on the dark surface — static, no hover transforms. */
.cp-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(13, 31, 78, 0.25);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.cp-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.cp-cat {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #4f46e5;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.18);
  padding: 4px 10px;
  border-radius: 999px;
}

/* Honest demo-state chip — same subdued treatment as other sample badges. */
.cp-sample {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #4f46e5;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.18);
  padding: 4px 9px;
  border-radius: 999px;
}

.cp-card h3 {
  font-size: 16.5px;
  line-height: 1.3;
}

.cp-card h3 a {
  color: var(--ink);
  text-decoration: none;
}

.cp-card h3 a:hover {
  color: var(--primary-600);
}

.cp-card h3 a:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.5);
  outline-offset: 2px;
  border-radius: 4px;
}

.cp-meta {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--primary-600);
  letter-spacing: 0.3px;
}

.cp-desc {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.cp-pills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.cp-pills li {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 3px 9px;
  border-radius: 999px;
}

.cp-roles {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
}

.cp-roles li {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
  padding-left: 16px;
  position: relative;
}

.cp-roles li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #4f46e5;
  font-weight: 800;
}

.cp-view {
  margin-top: 10px;
  align-self: flex-start;
}

.center-cta {
  text-align: center;
  margin-top: 28px;
}

.cp-note {
  margin-top: 22px;
  text-align: center;
  font-size: 12.5px;
  color: #a5b4fc;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .cp-section {
    padding: 40px 0 46px;
  }

  .cp-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .cp-section {
    padding: 36px 0 40px;
  }

  .cp-grid {
    grid-template-columns: 1fr;
  }
}
</style>