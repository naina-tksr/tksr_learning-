<script setup lang="ts">
import { hiringPartners } from '../data/site'

const row = hiringPartners
const row2 = [...hiringPartners].reverse()
</script>

<template>
  <div class="marquee-wrap">
    <div class="marquee-row">
      <div class="marquee-track track-a">
        <span
          v-for="(p, i) in [...row, ...row]"
          :key="'a' + i"
          class="logo-item"
          :style="{ color: p.color }"
        >
          {{ p.name }}
        </span>
      </div>
    </div>
    <div class="marquee-row marquee-row--reverse">
      <div class="marquee-track track-b">
        <span
          v-for="(p, i) in [...row2, ...row2]"
          :key="'b' + i"
          class="logo-item"
          :style="{ color: p.color }"
        >
          {{ p.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrap {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.marquee-row {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee-track {
  display: flex;
  gap: 22px;
  width: max-content;
  animation: scroll 36s linear infinite;
}

.marquee-row--reverse .marquee-track {
  animation-duration: 42s;
}

.logo-item {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  padding: 14px 26px;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  background: #fff;
  white-space: nowrap;
  filter: grayscale(0.15);
  transition: box-shadow 0.2s;
}

.logo-item:hover {
  box-shadow: var(--shadow);
}

@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>