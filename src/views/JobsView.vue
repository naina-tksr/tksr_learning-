<script setup lang="ts">
import { jobs } from '../data/jobs'
import { getOpportunitySignals } from '../utils/urgency'
import LiveJobFeed from '../components/LiveJobFeed.vue'
import CareerSignalStrip from '../components/CareerSignalStrip.vue'
import RecentOpportunitiesSection from '../components/RecentOpportunitiesSection.vue'

// Data-backed signals derived from the current dataset (demo records today).
const signals = getOpportunitySignals(jobs)
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <router-link to="/">Home</router-link> <span>/</span> Career Opportunities
        </div>
        <h1>Explore Opportunities. Understand the Skills. Build Toward Your Next Role.</h1>
        <p>
          Browse example career opportunities and the skills connected to each role — so you
          can see where your learning can take you.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="demo-warning" role="note">
          <strong>⚠️ Demo data notice:</strong> These listings are currently sample/demo
          opportunities. Live job-feed integration will be connected in a future
          backend/API phase.
        </div>

        <CareerSignalStrip
          :signals="signals"
          note="Signals are derived from the sample/demo opportunity data shown below — not live market data."
        />

        <RecentOpportunitiesSection />

        <LiveJobFeed />

        <div class="center-cta">
          <router-link to="/contact-us" class="btn btn-accent">Talk to a Career Expert</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-warning {
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: var(--radius);
  color: #9a3412;
  font-size: 14.5px;
  padding: 16px 18px;
  line-height: 1.55;
  margin-bottom: 28px;
}

.demo-warning strong {
  font-weight: 800;
}

.center-cta {
  text-align: center;
  margin-top: 40px;
}
</style>