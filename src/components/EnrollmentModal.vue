<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { EnrollmentIntent } from '../data/enrollment'
import { submitEnrollmentIntent } from '../services/enrollment'

const props = withDefaults(
  defineProps<{
    open: boolean
    courseId: string
    courseTitle: string
    /** Existing verified price from course data. Optional — never invented here. */
    coursePrice?: string
  }>(),
  { coursePrice: undefined },
)

const emit = defineEmits<{ (e: 'close'): void }>()

const name = ref('')
const email = ref('')
const phone = ref('')
const nameError = ref('')
const emailError = ref('')
const submitting = ref(false)
const submitted = ref(false)
const formError = ref('')

const nameInput = ref<HTMLInputElement | null>(null)
const modalRef = ref<HTMLElement | null>(null)

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return
    // Fresh form every time the modal opens (nothing is persisted).
    submitted.value = false
    submitting.value = false
    formError.value = ''
    nameError.value = ''
    emailError.value = ''
    await nextTick()
    nameInput.value?.focus()
  },
)

function closeModal() {
  if (!submitting.value) emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeModal()
    return
  }
  // Keep keyboard focus inside the modal (simple visible-focus trap).
  if (e.key !== 'Tab' || !modalRef.value) return
  const focusables = Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea',
    ),
  ).filter((el) => el.offsetParent !== null)
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

function validate(): boolean {
  nameError.value = name.value.trim() ? '' : 'Please enter your name.'
  emailError.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
    ? ''
    : 'Please enter a valid email address.'
  return !nameError.value && !emailError.value
}

async function submit() {
  if (submitting.value || submitted.value) return
  if (!validate()) return
  submitting.value = true
  formError.value = ''
  const intent: EnrollmentIntent = {
    courseId: props.courseId,
    courseTitle: props.courseTitle,
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim() || undefined,
    submittedAt: new Date().toISOString(),
    status: 'intent',
    isDemo: true,
  }
  try {
    const result = await submitEnrollmentIntent(intent)
    if (!result.success) {
      formError.value = result.message
      return
    }
    submitted.value = true
  } catch {
    // Never expose technical errors or stack traces.
    formError.value = 'Something went wrong. Please try again in a moment.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="enroll-overlay" @click.self="closeModal">
      <div
        ref="modalRef"
        class="enroll-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="submitted ? 'enroll-success-title' : 'enroll-title'"
        @keydown="onKeydown"
      >
        <button
          type="button"
          class="enroll-close"
          aria-label="Close enrollment panel"
          @click="closeModal"
        >
          ✕
        </button>

        <template v-if="!submitted">
          <h2 id="enroll-title">Enroll in This Program</h2>
          <p class="enroll-course-label">You are enquiring about:</p>
          <p class="enroll-course-name">{{ courseTitle }}</p>
          <p v-if="coursePrice" class="enroll-price">Program Fee: {{ coursePrice }}</p>

          <form novalidate @submit.prevent="submit">
            <div class="field">
              <label for="enroll-name">Full Name</label>
              <input
                id="enroll-name"
                ref="nameInput"
                v-model="name"
                type="text"
                autocomplete="name"
                :aria-invalid="nameError ? 'true' : 'false'"
                :aria-describedby="nameError ? 'enroll-name-error' : undefined"
              />
              <p v-if="nameError" id="enroll-name-error" class="field-error">{{ nameError }}</p>
            </div>

            <div class="field">
              <label for="enroll-email">Email</label>
              <input
                id="enroll-email"
                v-model="email"
                type="email"
                autocomplete="email"
                :aria-invalid="emailError ? 'true' : 'false'"
                :aria-describedby="emailError ? 'enroll-email-error' : undefined"
              />
              <p v-if="emailError" id="enroll-email-error" class="field-error">{{ emailError }}</p>
            </div>

            <div class="field">
              <label for="enroll-phone">Phone <span class="optional-note">(optional)</span></label>
              <input
                id="enroll-phone"
                v-model="phone"
                type="tel"
                autocomplete="tel"
                placeholder="+91 00000 00000"
              />
            </div>

            <p v-if="formError" class="form-error-msg" role="alert">{{ formError }}</p>

            <p class="enroll-privacy-note">
              We only ask for these details so we can follow up on your request. No payment
              details are collected on this website.
            </p>

            <button type="submit" class="btn btn-buy enroll-submit" :disabled="submitting">
              {{ submitting ? 'Submitting…' : 'Submit Enrollment Request' }}
            </button>
          </form>
        </template>

        <template v-else>
          <h2 id="enroll-success-title">Enrollment Request Received</h2>
          <p class="enroll-success-copy" role="status">
            Thanks{{ name ? `, ${name}` : '' }}. Your request has been recorded
            <strong>locally</strong> for this demo experience — this is an enrollment intent,
            not a payment or confirmed enrollment. A real enrollment/payment confirmation will
            require the backend and payment integration.
          </p>
          <div class="enroll-success-actions">
            <router-link to="/courses" class="btn btn-primary">Explore More Programs</router-link>
            <router-link to="/contact-us" class="btn btn-outline">Talk to a Career Expert</router-link>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.enroll-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(11, 22, 48, 0.6);
  display: grid;
  place-items: center;
  padding: 20px;
  overflow-y: auto;
}

.enroll-modal {
  position: relative;
  width: min(520px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: 0 40px 90px rgba(11, 22, 48, 0.45);
  padding: 30px 30px 28px;
}

.enroll-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: var(--bg-soft);
  color: var(--ink-2);
  font-size: 14px;
  cursor: pointer;
}

.enroll-close:hover {
  background: #e2e8f0;
}

.enroll-modal h2 {
  font-size: 1.35rem;
  margin: 0 24px 8px 0;
}

.enroll-course-label {
  color: var(--muted);
  font-size: 13.5px;
  margin-bottom: 2px;
}

.enroll-course-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--ink);
}

.enroll-price {
  margin: 10px 0 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
}

.enroll-modal form {
  margin-top: 18px;
}

.field-error {
  color: #b91c1c;
  font-size: 13px;
  font-weight: 600;
  margin-top: 6px;
}

.form-error-msg {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 13.5px;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 10px;
  margin: 6px 0 14px;
}

.enroll-privacy-note {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 16px;
}

.enroll-submit {
  width: 100%;
  justify-content: center;
  font-size: 15px;
  padding: 13px 18px;
}

.enroll-success-copy {
  color: var(--ink-2);
  line-height: 1.65;
  font-size: 14.5px;
  margin-bottom: 22px;
}

.enroll-success-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.enroll-success-actions .btn {
  justify-content: center;
}

.optional-note {
  font-weight: 500;
  color: var(--muted);
}

@media (max-width: 560px) {
  .enroll-overlay {
    padding: 12px;
    align-items: end;
  }

  .enroll-modal {
    padding: 24px 20px 22px;
    border-radius: 18px;
    max-height: 92vh;
  }
}
</style>