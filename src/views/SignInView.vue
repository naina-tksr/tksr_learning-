<script setup lang="ts">
import { ref } from 'vue'
import { SITE } from '../data/site'

const email = ref('')
const password = ref('')
const submitted = ref(false)
</script>

<template>
  <div>
    <section class="signin-section">
      <div class="signin-card">
        <div class="brand">
          <span class="brand-mark">TK</span>
          <span class="brand-text">TKSR<em>Career</em></span>
        </div>
        <h1>Welcome back 👋</h1>
        <p class="sub">
          Sign in to continue your learning journey, track progress and access
          your live classroom sessions.
        </p>
        <p class="demo-tag">Demo experience — real sign-in is not enabled yet</p>

        <form @submit.prevent="submitted = true">
          <div class="field">
            <label>Email Address</label>
            <input v-model="email" type="email" placeholder="you@example.com" required />
          </div>
          <div class="field">
            <div class="label-row">
              <label>Password</label>
              <router-link to="/contact-us" class="forgot">Forgot password? Contact support</router-link>
            </div>
            <input v-model="password" type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%">Sign In</button>
          <p v-if="submitted" class="note">
            ⚠️ Demo site — signing in is not enabled yet. Contact {{ SITE.email }} to get
            portal access.
          </p>
        </form>

        <div class="divider"><span>or</span></div>

        <div class="alt-row">
          <button class="btn btn-outline alt-btn" type="button" @click="submitted = true">
            🔑 Access with Google
          </button>
          <button class="btn btn-outline alt-btn" type="button" @click="submitted = true">
            💼 Access with LinkedIn
          </button>
        </div>

        <p class="signup-link">
          New to TKSR Career?
          <router-link to="/contact-us">Contact us to request access</router-link>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.signin-section {
  min-height: calc(100vh - 110px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 18px;
  background:
    radial-gradient(800px 380px at 90% 0%, rgba(124, 58, 237, 0.14), transparent 60%),
    radial-gradient(700px 380px at 0% 100%, rgba(37, 99, 235, 0.12), transparent 60%),
    var(--bg-soft);
}

.signin-card {
  width: 100%;
  max-width: 460px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 40px 38px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--gradient);
  color: #fff;
  font-weight: 900;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 20px rgba(29, 78, 216, 0.35);
}

.brand-text {
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.02em;
}

.brand-text em {
  font-style: normal;
  color: var(--primary-600);
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 8px;
}

.sub {
  color: var(--muted);
  font-size: 14.5px;
  margin-bottom: 24px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot {
  font-size: 12.5px;
  color: var(--primary-600);
  font-weight: 600;
}

.forgot:hover {
  text-decoration: underline;
}

.note {
  margin-top: 14px;
  font-size: 13px;
  color: var(--muted);
  background: var(--bg-soft);
  border: 1px dashed var(--border);
  padding: 10px 12px;
  border-radius: 8px;
}

.demo-tag {
  font-size: 12.5px;
  font-weight: 700;
  color: #9a3412;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 999px;
  padding: 7px 14px;
  display: inline-block;
  margin-bottom: 18px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 22px 0;
  color: var(--muted);
  font-size: 12.5px;
  font-weight: 600;
  text-transform: uppercase;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.alt-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.alt-btn {
  font-size: 13.5px;
  padding: 11px 10px;
}

.signup-link {
  text-align: center;
  margin-top: 22px;
  font-size: 14px;
  color: var(--muted);
}

.signup-link a {
  color: var(--primary-600);
  font-weight: 700;
}

.signup-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .signin-card {
    padding: 28px 20px;
  }
  .alt-row {
    grid-template-columns: 1fr;
  }
}
</style>