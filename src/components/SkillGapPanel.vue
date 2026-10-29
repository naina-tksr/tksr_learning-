<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProgramMatch } from '../data/careerPrograms'
import { normalizeSkill } from '../utils/skills'

const props = defineProps<{
  /** Skills the opportunity requires (from the Job record). */
  requiredSkills: string[]
  /** Resolved TKSR program matches (explicit mapping + deterministic skill overlap). */
  programs: ProgramMatch[]
}>()

/* ---------- learner skill input (Mode B) ---------- */

const skillInput = ref('')
const learnerSkills = ref<string[]>([])

function addSkills() {
  // Accept comma-separated (and space-separated) input, normalized for matching.
  const parts = skillInput.value
    .split(/[,]+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(normalizeSkill)

  const existing = new Set(learnerSkills.value)
  const additions = parts.filter((p) => !existing.has(p))
  if (additions.length) learnerSkills.value = [...learnerSkills.value, ...additions]
  skillInput.value = ''
}

function removeSkill(skill: string) {
  learnerSkills.value = learnerSkills.value.filter((s) => s !== skill)
}

function clearSkills() {
  learnerSkills.value = []
  skillInput.value = ''
}

/* ---------- deterministic comparison ---------- */

function isMatched(required: string): boolean {
  const rn = normalizeSkill(required)
  return learnerSkills.value.some((ls) => ls === rn)
}

const skillsToDevelop = computed(() => props.requiredSkills.filter((s) => !isMatched(s)))

const hasLearnerSkills = computed(() => learnerSkills.value.length > 0)
</script>

<template>
  <section class="sg-panel" aria-labelledby="sg-heading">
    <h2 id="sg-heading">Skills This Opportunity Looks For</h2>
    <ul class="sg-required">
      <li v-for="s in requiredSkills" :key="s">{{ s }}</li>
    </ul>

    <!-- MODE B: optional learner skill check -->
    <div class="sg-input card">
      <h3>Optional Skill Check</h3>
      <p class="sg-hint">
        Have some of these skills already? Enter what you know (comma-separated) and
        we’ll compare — nothing is sent anywhere, the comparison happens right here in
        your browser.
      </p>
      <div class="sg-input-row">
        <label for="sg-skill-input">Your current skills</label>
        <div class="sg-field-row">
          <input
            id="sg-skill-input"
            v-model="skillInput"
            type="text"
            placeholder="e.g. Python, SQL, Excel"
            @keydown.enter.prevent="addSkills"
          />
          <button type="button" class="btn btn-primary sg-add" @click="addSkills">
            Add Skills
          </button>
        </div>
      </div>

      <div v-if="hasLearnerSkills" class="sg-chips">
        <span v-for="s in learnerSkills" :key="s" class="sg-chip">
          {{ s }}
          <button
            type="button"
            class="sg-chip-remove"
            :aria-label="`Remove ${s}`"
            @click="removeSkill(s)"
          >
            ✕
          </button>
        </span>
        <button type="button" class="sg-clear" @click="clearSkills">Clear all</button>
      </div>
    </div>

    <!-- Comparison result — only when the learner provided skills -->
    <template v-if="hasLearnerSkills">
      <h3>Your Skill Comparison</h3>
      <div class="sg-compare card">
        <div class="sg-compare-col">
          <h4>Required Skills</h4>
          <ul class="sg-compare-list">
            <li v-for="s in requiredSkills" :key="s" class="sg-item" :class="{ 'sg-item--match': isMatched(s) }">
              <span class="sg-glyph" aria-hidden="true">{{ isMatched(s) ? '✓' : '○' }}</span>
              <span>{{ s }}</span>
              <em v-if="isMatched(s)" class="sg-status-tag">already indicated</em>
            </li>
          </ul>
        </div>
        <div class="sg-compare-col">
          <h4>Skills To Develop</h4>
          <ul v-if="skillsToDevelop.length" class="sg-compare-list">
            <li v-for="s in skillsToDevelop" :key="s" class="sg-item">
              <span class="sg-glyph" aria-hidden="true">○</span>
              <span>{{ s }}</span>
            </li>
          </ul>
          <p v-else class="sg-all-matched">
            🎉 All required skills are covered by the skills you indicated.
          </p>
          <p class="sg-note">
            Based only on the skills you entered — this is not an assessment of your
            actual experience or level.
          </p>
        </div>
      </div>
    </template>

    <!-- Develop these skills with TKSR -->
    <h3>Develop These Skills With TKSR</h3>
    <p v-if="programs.length === 0" class="sg-no-program">
      No matching TKSR program is currently mapped to these skills.
    </p>
    <div v-else class="sg-program-list">
      <div v-for="m in programs" :key="m.program.id" class="sg-program card">
        <div class="sg-program-head">
          <h4>{{ m.program.title }}</h4>
          <span class="sg-program-cat">{{ m.program.category }}</span>
        </div>
        <p class="sg-program-reason">
          <template v-if="m.reason === 'mapped'">
            Mapped to this opportunity
          </template>
          <template v-else>
            Shares {{ m.overlap }} required skill{{ m.overlap > 1 ? 's' : '' }}
          </template>
          <span class="sg-sample-label">(sample mapping)</span>
        </p>
        <ul v-if="m.program.skills.length" class="sg-program-skills">
          <li v-for="s in m.program.skills" :key="s">{{ s }}</li>
        </ul>
        <router-link :to="`/courses/${m.program.courseId}`" class="btn btn-outline">
          View Program →
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sg-panel {
  margin: 40px 0 8px;
  padding-top: 36px;
  border-top: 1px solid var(--border);
}

.sg-panel > h2 {
  font-size: 1.45rem;
  margin-bottom: 14px;
}

.sg-required {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
}

.sg-required li {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 999px;
}

.sg-input {
  padding: 22px;
  margin-bottom: 26px;
}

.sg-input h3 {
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.sg-hint {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 16px;
  max-width: 620px;
  line-height: 1.6;
}

.sg-input label {
  display: block;
  font-weight: 700;
  font-size: 13.5px;
  margin-bottom: 8px;
}

.sg-field-row {
  display: flex;
  gap: 10px;
}

.sg-field-row input {
  flex: 1;
  min-width: 0;
}

.sg-add {
  white-space: nowrap;
}

.sg-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
  align-items: center;
}

.sg-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  background: rgba(37, 99, 235, 0.09);
  color: var(--primary-700, #1d4ed8);
  border: 1px solid rgba(37, 99, 235, 0.25);
  padding: 5px 8px 5px 12px;
  border-radius: 999px;
}

.sg-chip-remove {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 50%;
}

.sg-chip-remove:hover {
  background: rgba(37, 99, 235, 0.15);
}

.sg-clear {
  border: none;
  background: transparent;
  color: var(--primary-600);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
}

.sg-panel > h3 {
  font-size: 1.15rem;
  margin: 26px 0 12px;
}

.sg-compare {
  padding: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.sg-compare-col h4 {
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  margin-bottom: 12px;
}

.sg-compare-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sg-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-2);
}

.sg-glyph {
  width: 18px;
  text-align: center;
  font-weight: 800;
  color: var(--muted);
}

.sg-item--match .sg-glyph {
  color: var(--success, #16a34a);
}

.sg-item--match {
  color: var(--ink);
}

.sg-status-tag {
  font-style: normal;
  font-size: 12px;
  color: var(--success, #16a34a);
  background: rgba(22, 163, 74, 0.1);
  padding: 2px 8px;
  border-radius: 999px;
}

.sg-all-matched {
  font-size: 14px;
  font-weight: 600;
  color: var(--success, #16a34a);
}

.sg-note {
  margin-top: 14px;
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}

.sg-no-program {
  color: var(--muted);
  font-size: 14.5px;
  padding: 18px;
  background: var(--bg-soft);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}

.sg-program-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.sg-program {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sg-program-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.sg-program-head h4 {
  font-size: 1.02rem;
  line-height: 1.35;
}

.sg-program-cat {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--primary-600);
  background: rgba(37, 99, 235, 0.09);
  padding: 4px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.sg-program-reason {
  font-size: 13px;
  color: var(--muted);
}

.sg-sample-label {
  font-size: 11.5px;
  font-weight: 600;
  color: #9a3412;
}

.sg-program-skills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sg-program-skills li {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 3px 9px;
  border-radius: 999px;
}

.sg-program .btn {
  margin-top: auto;
  align-self: flex-start;
}

@media (max-width: 1024px) {
  .sg-compare,
  .sg-program-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .sg-field-row {
    flex-direction: column;
  }

  .sg-add {
    width: 100%;
    justify-content: center;
  }

  .sg-program-head {
    flex-direction: column;
  }
}
</style>