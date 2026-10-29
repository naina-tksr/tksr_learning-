<script setup lang="ts">
import { ref } from 'vue'
import EnrollmentModal from './EnrollmentModal.vue'

/**
 * Primary program conversion CTA. Opens the enrollment intent modal — it never
 * redirects to a payment gateway or fakes a checkout. A real checkout/payment
 * flow can be swapped in later behind this same trigger point.
 */
const props = defineProps<{
  courseId: string
  courseTitle: string
  /** Existing verified price from course data — optional, never invented. */
  coursePrice?: string
}>()

const open = ref(false)
</script>

<template>
  <div class="buy-now">
    <button type="button" class="btn btn-buy" @click="open = true">
      Buy Now
    </button>
    <EnrollmentModal
      :open="open"
      :course-id="props.courseId"
      :course-title="props.courseTitle"
      :course-price="props.coursePrice"
      @close="open = false"
    />
  </div>
</template>