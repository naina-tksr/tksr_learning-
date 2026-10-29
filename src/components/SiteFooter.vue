<script setup lang="ts">
import { SITE } from '../data/site'
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="f-logo">
            <span class="f-mark">TK</span>
            <span class="f-name">TKSR<em>Career</em></span>
          </div>
          <p class="f-about">
            Expert-led, industry-aligned training in DevOps, Agile & Scrum,
            Software Testing, and Project Management. We don't just teach
            skills — we build careers.
          </p>
          <div class="f-contact">
            <a :href="SITE.phoneHref"><span>Phone</span>{{ SITE.phone }}</a>
            <a :href="'mailto:' + SITE.email"><span>Email</span>{{ SITE.email }}</a>
          </div>
          <p class="f-address">{{ SITE.address }}</p>
          <p class="f-socials-note">
            Official social channels will be linked here once TKSR's verified profiles
            are available.
          </p>
        </div>

        <div class="f-col">
          <h4>Company</h4>
          <router-link to="/about-us">About us</router-link>
          <router-link to="/jobs">Career Opportunities</router-link>
          <router-link to="/about-us">Corporate training</router-link>
        </div>

        <div class="f-col">
          <h4>Support</h4>
          <router-link to="/contact-us">Contact us</router-link>
          <router-link to="/contact-us">Become an Instructor</router-link>
          <router-link to="/contact-us">Become a Training Partner</router-link>
          <router-link to="/courses">Course Info</router-link>
        </div>

        <div class="f-col">
          <h4>Resources</h4>
          <router-link to="/courses">All Courses</router-link>
          <router-link to="/courses?category=Interview%20Preparation%20Bootcamp">Interview Prep</router-link>
          <router-link to="/projects">Projects</router-link>
        </div>

        <div class="f-col">
          <h4>Quick Links</h4>
          <span class="soon">Privacy Policy <em>(coming soon)</em></span>
          <span class="soon">Terms and Conditions <em>(coming soon)</em></span>
          <span class="soon">Refund Policy <em>(coming soon)</em></span>
          <span class="soon">Sitemap <em>(coming soon)</em></span>
        </div>
      </div>

      <div class="footer-cats">
        <p>
          TKSR Career offers career-focused programs across DevOps, Agile &amp; Scrum,
          Software Testing and Project Management — built around practical projects,
          honest sample-labelled learning experiences and expert guidance.
        </p>
      </div>

      <div class="footer-bottom">
        <span>© 2026 TKSR Career. All Rights Reserved.</span>
        <span class="cert-note">
          Certification names are trademarks of their respective owners.
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--bg-dark);
  color: #c7d2fe;
  padding: 64px 0 0;
  font-size: 14.5px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr repeat(4, 1fr);
  gap: 36px;
  padding-bottom: 44px;
}

.f-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.f-mark {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--gradient);
  color: #fff;
  font-weight: 900;
  display: grid;
  place-items: center;
}

.f-name {
  font-weight: 900;
  font-size: 19px;
  letter-spacing: -0.02em;
  color: #fff;
}

.f-name em {
  font-style: normal;
  color: #818cf8;
}

.f-about {
  color: #9fb0ce;
  max-width: 320px;
  line-height: 1.65;
}

.f-contact {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 18px 0 0;
}

.f-contact a {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  color: #e0e7ff;
  font-weight: 600;
}

.f-contact a span {
  min-width: 52px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8193b5;
}

.f-contact a:hover {
  color: #fff;
}

.f-contact a:hover span {
  color: #a5b4fc;
}

.f-address {
  margin: 10px 0 0;
  font-size: 13.5px;
  color: #8193b5;
}

.f-socials-note {
  margin-top: 16px;
  font-size: 12.5px;
  color: #6b7fa3;
  line-height: 1.6;
  max-width: 300px;
}

.f-col h4 {
  color: #a5b4fc;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.f-col a {
  display: block;
  padding: 6px 0;
  color: #9fb0ce;
  transition: color 0.2s, padding-left 0.2s;
}

.f-col a:hover {
  color: #fff;
  padding-left: 4px;
}

.f-col .soon {
  display: block;
  padding: 6px 0;
  color: #5f7399;
  font-size: 13.5px;
}

.f-col .soon em {
  font-style: normal;
  font-size: 11.5px;
  color: #47608a;
}

.footer-cats {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 34px 0;
  display: flex;
  justify-content: space-between;
  gap: 34px;
  flex-wrap: wrap;
}

.footer-cats p {
  color: #9fb0ce;
  max-width: 860px;
  font-size: 13.5px;
  line-height: 1.7;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 22px 0;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  color: #8193b5;
  font-size: 13px;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 28px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-brand {
    grid-column: auto;
  }

  .site-footer {
    padding-top: 48px;
  }
}
</style>