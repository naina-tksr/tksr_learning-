<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { courses, type Course } from '../data/site'
import BuyNowButton from '../components/BuyNowButton.vue'

const route = useRoute()
const courseId = String(route.params.id)

const course = ref<Course | null>(courses.find((c) => c.id === courseId) ?? null)
const notFound = ref(!course.value)

// Course detail gets its own SEO title: "TKSR Career | [Course Name]".
onMounted(() => {
  if (course.value) {
    document.title = `TKSR Career | ${course.value.title}`
  }
})
</script>

<template>
  <div>
    <template v-if="notFound || !course">
      <section class="detail-missing">
        <span class="eyebrow">📚 Course</span>
        <h1>Course Not Found</h1>
        <p>
          The course you're looking for doesn't exist or may have been removed.
        </p>
        <router-link to="/courses" class="btn btn-outline">← Back to All Courses</router-link>
      </section>
    </template>

    <template v-else>
      <section class="page-banner">
        <div class="container">
          <div class="crumbs">
            <router-link to="/">Home</router-link> <span>/</span>
            <router-link to="/courses">Courses</router-link> <span>/</span>
            {{ course.title }}
          </div>
          <span class="eyebrow">{{ course.category }}</span>
          <h1>{{ course.title }}</h1>
          <p>{{ course.summary }}</p>
        </div>
      </section>

      <section class="section">
        <div class="container course-detail">
          <div class="cd-main">
            <h2>About This Program</h2>
            <p class="cd-desc">{{ course.summary }}</p>

            <p class="cd-facts-inline">
              <span>⏱ {{ course.duration }}</span>
              <span>🏷 {{ course.level }}</span>
              <span>★ {{ course.rating }}</span>
              <span>👥 {{ course.learners }} learners</span>
              <span>💳 {{ course.price }}</span>
            </p>

            <h2>What You'll Cover</h2>
            <ul class="cd-tags">
              <li v-for="t in course.tags" :key="t">{{ t }}</li>
            </ul>

            <template v-if="course.careerSkills?.length">
              <h2>Relevant Skills</h2>
              <p class="cd-sub">
                Skills represented by this program’s content, used for career mapping.
              </p>
              <ul class="cd-tags">
                <li v-for="s in course.careerSkills" :key="s">{{ s }}</li>
              </ul>
            </template>

            <template v-if="course.careerRoles?.length">
              <h2>Career Roles</h2>
              <p class="cd-sub">
                Sample roles this program can help you build toward.
              </p>
              <ul class="cd-roles">
                <li v-for="r in course.careerRoles" :key="r">▸ {{ r }}</li>
              </ul>
            </template>

            <p class="cd-demo-note">
              Skill and career-role mapping is <strong>sample/demo data</strong> derived
              from course content for career guidance — it is not a placement or
              outcome claim.
            </p>

            <div class="cd-trust card">
              <h2>Why This Program?</h2>
              <ul class="cd-trust-list">
                <li>
                  <span class="ct-icon" aria-hidden="true">🎯</span>
                  <span><strong>Industry-relevant skills</strong> — content mapped to the tools and practices career roles use today.</span>
                </li>
                <li>
                  <span class="ct-icon" aria-hidden="true">🛠️</span>
                  <span><strong>Practical project learning</strong> — build toward portfolio-ready work you can show.</span>
                </li>
                <li>
                  <span class="ct-icon" aria-hidden="true">🧭</span>
                  <span><strong>Career-role alignment</strong> — see the roles and skills this program connects to (sample mapping).</span>
                </li>
                <li>
                  <span class="ct-icon" aria-hidden="true">📁</span>
                  <span><strong>Portfolio-oriented outcomes</strong> — evidence of what you can do, not just a certificate.</span>
                </li>
              </ul>
              <p class="cd-trust-note">
                TKSR does not promise guaranteed jobs, placement, interviews or
                salaries. Course ratings and learner counts shown on this page are
                sample/demo figures, not verified statistics.
              </p>
            </div>

            <div class="cd-cta">
              <BuyNowButton
                :course-id="course.id"
                :course-title="course.title"
                :course-price="course.price"
              />
              <router-link to="/contact-us" class="btn btn-outline">
                Talk to a Career Expert
              </router-link>
              <router-link to="/jobs" class="cd-tertiary">
                Explore Career Opportunities →
              </router-link>
            </div>

            <p class="cd-payment-note">
              ℹ️ Demo experience: <strong>Buy Now</strong> records an enrollment
              request locally. No payment, account or checkout is processed on this
              website today.
            </p>
          </div>

          <aside class="cd-side card">
            <h2>Quick Facts</h2>
            <dl class="cd-facts">
              <div><dt>Duration</dt><dd>{{ course.duration }}</dd></div>
              <div><dt>Level</dt><dd>{{ course.level }}</dd></div>
              <div><dt>Rating</dt><dd>★ {{ course.rating }}</dd></div>
              <div><dt>Learners</dt><dd>{{ course.learners }}</dd></div>
              <div><dt>Program Fee</dt><dd>{{ course.price }}</dd></div>
            </dl>
            <router-link to="/contact-us" class="btn btn-primary cd-side-cta">
              Enquire About This Program
            </router-link>
          </aside>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.page-banner p {
  color: rgba(255, 255, 255, 0.88);
  max-width: 720px;
}

.detail-missing {
  text-align: center;
  padding: 100px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.detail-missing h1 {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
}

.detail-missing p {
  color: var(--muted);
  max-width: 460px;
}

.course-detail {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 40px;
  align-items: start;
}

.cd-main h2 {
  font-size: 1.35rem;
  margin: 30px 0 10px;
}

.cd-main h2:first-child {
  margin-top: 0;
}

.cd-desc {
  color: var(--muted);
  line-height: 1.7;
}

.cd-facts-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 16px;
}

.cd-sub {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 8px;
}

.cd-tags,
.cd-roles {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cd-tags li {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 5px 11px;
  border-radius: 999px;
}

.cd-roles {
  flex-direction: column;
  gap: 6px;
}

.cd-roles li {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.cd-demo-note {
  margin-top: 28px;
  font-size: 13px;
  color: #9a3412;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 10px;
  padding: 12px 14px;
  line-height: 1.6;
}

.cd-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  align-items: center;
}

.cd-tertiary {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-600);
  text-decoration: underline;
}

.cd-payment-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.55;
}

.cd-trust {
  margin-top: 28px;
  padding: 22px 24px;
}

.cd-trust h2 {
  font-size: 1.15rem;
  margin: 0 0 12px;
}

.cd-trust-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cd-trust-list li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.55;
}

.ct-icon {
  flex-shrink: 0;
  font-size: 16px;
}

.cd-trust-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: #9a3412;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 10px;
  padding: 10px 12px;
  line-height: 1.55;
}

.cd-side {
  padding: 26px 24px;
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cd-side h2 {
  font-size: 1.1rem;
}

.cd-facts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cd-facts > div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.cd-facts dt {
  color: var(--muted);
  font-weight: 500;
}

.cd-facts dd {
  font-weight: 700;
  text-align: right;
}

.cd-side-cta {
  justify-content: center;
}

@media (max-width: 1024px) {
  .course-detail {
    grid-template-columns: minmax(0, 1fr);
  }

  .cd-side {
    position: static;
  }
}

@media (max-width: 560px) {
  .cd-main h2 {
    font-size: 1.2rem;
  }

  .cd-cta {
    flex-direction: column;
  }

  .cd-cta .btn {
    justify-content: center;
  }
}
</style>