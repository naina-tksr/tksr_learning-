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
            <span class="f-name">TKSR<em>Learning</em></span>
          </div>
          <p class="f-about">
            Expert-led, industry-aligned training in DevOps, Agile & Scrum,
            Software Testing, and Project Management. We don't just teach
            skills — we build careers.
          </p>
          <div class="f-contact">
            <a :href="SITE.phoneHref">📞 {{ SITE.phone }}</a>
            <a :href="'mailto:' + SITE.email">✉️ {{ SITE.email }}</a>
          </div>
          <div class="socials">
            <a href="#" aria-label="LinkedIn" title="LinkedIn">in</a>
            <a href="#" aria-label="X / Twitter" title="Twitter">𝕏</a>
            <a href="#" aria-label="Facebook" title="Facebook">f</a>
            <a href="#" aria-label="Instagram" title="Instagram">◎</a>
            <a href="#" aria-label="YouTube" title="YouTube">▶</a>
          </div>
        </div>

        <div class="f-col">
          <h4>Company</h4>
          <router-link to="/about-us">About us</router-link>
          <router-link to="/courses">Reviews</router-link>
          <router-link to="/about-us">Trainers</router-link>
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
          <router-link to="/courses">Blogs</router-link>
          <router-link to="/courses">All Courses</router-link>
          <router-link to="/about-us">Free Webinars</router-link>
          <router-link to="/courses">Interview Prep</router-link>
        </div>

        <div class="f-col">
          <h4>Quick Links</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms and Conditions</a>
          <a href="#">Refund Policy</a>
          <a href="#">Sitemap</a>
        </div>
      </div>

      <div class="footer-cats">
        <p>TKSR Learning is the preferred choice for professionals, with globally
        accredited programs, direct mentorship from industry architects, and
        placement support that scales with your career.</p>
      </div>

      <div class="footer-bottom">
        <span>© 2016–2026 TKSR Learning. All Rights Reserved.</span>
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
  gap: 6px;
  margin: 18px 0;
}

.f-contact a {
  color: #e0e7ff;
  font-weight: 600;
}

.f-contact a:hover {
  color: #fff;
}

.socials {
  display: flex;
  gap: 10px;
}

.socials a {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #e0e7ff;
  display: grid;
  place-items: center;
  font-weight: 700;
  transition: background 0.2s, transform 0.2s;
}

.socials a:hover {
  background: var(--gradient-soft);
  color: #fff;
  transform: translateY(-3px);
}

.f-col h4 {
  color: #fff;
  font-size: 15px;
  margin-bottom: 16px;
  letter-spacing: 0.02em;
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
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .site-footer {
    padding-top: 48px;
  }
}
</style>