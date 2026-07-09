<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue'
</script>

<template>
  <section
    id="services"
    class="mx-auto max-w-6xl px-6 py-16 lg:px-8"
    aria-labelledby="services-title"
  >
    <h2 id="services-title" class="text-2xl font-semibold text-slate-900">Services</h2>
    <div class="mt-6 grid gap-6 md:grid-cols-3">
      <BaseCard>
        <h3 class="font-semibold text-slate-900">Strategy</h3>
        <p class="mt-2 text-sm text-slate-600">Discovery, messaging, and conversion planning.</p>
      </BaseCard>
      <BaseCard>
        <h3 class="font-semibold text-slate-900">Design</h3>
        <p class="mt-2 text-sm text-slate-600">Modern, performant one-page experiences.</p>
      </BaseCard>
      <BaseCard>
        <h3 class="font-semibold text-slate-900">Delivery</h3>
        <p class="mt-2 text-sm text-slate-600">Nuxt SSG handoff ready for deployment.</p>
      </BaseCard>
    </div>
  </section>
</template>
