<script setup lang="ts">
import { ref } from 'vue'
import { SITE } from '../data/site'

const sent = ref(false)

const contactCards = [
  { icon: '📞', title: 'Call Us', line1: SITE.phone, line2: 'Mon–Sat, 9 AM – 7 PM IST' },
  { icon: '✉️', title: 'Email Us', line1: SITE.email, line2: 'Replies within 4 business hours' },
  { icon: '📍', title: 'Visit Us', line1: SITE.address, line2: 'Map directions available below' },
  { icon: '💬', title: 'WhatsApp', line1: SITE.phone, line2: 'Chat with our career advisers' },
]
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <router-link to="/">Home</router-link> <span>/</span> Contact Us
        </div>
        <h1>Talk to Us to Scale Up</h1>
        <p>
          Questions about courses, corporate training, or joining as a trainer or
          partner? Our team is a message away.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-cards">
          <a v-for="c in contactCards" :key="c.title" class="c-card card" :href="c.title === 'Call Us' ? SITE.phoneHref : c.title === 'Email Us' ? 'mailto:' + SITE.email : c.title === 'WhatsApp' ? SITE.whatsapp : undefined">
            <span class="c-icon">{{ c.icon }}</span>
            <strong>{{ c.title }}</strong>
            <span class="c-line1">{{ c.line1 }}</span>
            <span class="c-line2">{{ c.line2 }}</span>
          </a>
        </div>

        <div class="contact-grid">
          <div class="contact-form card">
            <h3>Send us a message</h3>
            <p class="cf-sub">Fill in the form and our team will get back to you within one business day.</p>
            <form @submit.prevent="sent = true">
              <div class="row2">
                <div class="field">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div class="field">
                  <label>Mobile Number *</label>
                  <input type="tel" placeholder="+91 00000 00000" required />
                </div>
              </div>
              <div class="field">
                <label>Email Address *</label>
                <input type="email" placeholder="you@example.com" required />
              </div>
              <div class="field">
                <label>I’m interested in</label>
                <select>
                  <option>Individual Courses</option>
                  <option>Corporate / Team Training</option>
                  <option>Becoming an Instructor</option>
                  <option>Becoming a Training Partner</option>
                  <option>Something else</option>
                </select>
              </div>
              <div class="field">
                <label>Message</label>
                <textarea rows="4" placeholder="Tell us about your goal…"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%">
                Send Message →
              </button>
              <p v-if="sent" class="success">✅ Message sent! Our team will reach out shortly.</p>
            </form>
          </div>

          <div class="contact-side">
            <div class="side-info">
              <h3>Become an Instructor</h3>
              <p>
                Industry experts with 5+ years of hands-on experience — join a faculty
                of 1,000+ and mentor the next generation of professionals.
              </p>
              <a class="btn btn-outline" href="mailto:trainers@tksrlearning.com">
                trainers@tksrlearning.com
              </a>
            </div>
            <div class="side-info">
              <h3>Become a Training Partner</h3>
              <p>
                Colleges, bootcamps and institutions — partner with us to deliver
                certified, industry-aligned programs to your learners.
              </p>
              <a class="btn btn-outline" href="mailto:partners@tksrlearning.com">
                partners@tksrlearning.com
              </a>
            </div>
            <div class="map-card">
              <h3>📍 Find Us</h3>
              <p>{{ SITE.address }}</p>
              <div class="map-placeholder">
                <span>🗺️</span>
                <p>TKSR Learning, HSR Layout, Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 44px;
}

.c-card {
  padding: 26px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: transform 0.2s, box-shadow 0.25s;
}

.c-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.c-icon {
  font-size: 30px;
  margin-bottom: 8px;
}

.c-card strong {
  font-size: 15px;
}

.c-line1 {
  font-weight: 600;
  color: var(--primary-600);
  font-size: 14px;
}

.c-line2 {
  color: var(--muted);
  font-size: 12.5px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 28px;
  align-items: start;
}

.contact-form {
  padding: 32px 30px;
}

.contact-form h3 {
  margin-bottom: 6px;
}

.cf-sub {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 20px;
}

.row2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.success {
  margin-top: 14px;
  color: var(--success);
  font-weight: 700;
  font-size: 14px;
}

.contact-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.side-info {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 22px;
}

.side-info h3 {
  margin-bottom: 8px;
  font-size: 1.05rem;
}

.side-info p {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 14px;
}

.map-card h3 {
  margin-bottom: 6px;
}

.map-card p {
  color: var(--muted);
  font-size: 14px;
}

.map-placeholder {
  margin-top: 14px;
  border-radius: 12px;
  background: var(--gradient);
  color: #fff;
  padding: 40px 20px;
  text-align: center;
}

.map-placeholder span {
  font-size: 36px;
  display: block;
  margin-bottom: 6px;
}

.map-placeholder p {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin: 0;
}

@media (max-width: 1024px) {
  .contact-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .contact-cards,
  .row2 {
    grid-template-columns: 1fr;
  }
}
</style>