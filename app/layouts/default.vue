<script setup lang="ts">
import Footer from './Footer.vue'
import Header from './Header.vue'

const route = useRoute()
const normalizedPath = computed(() => {
  const path = route.path.replace(/^\/(ru|ka)(?=\/|$)/, '')
  return path || '/'
})
</script>

<template>
  <div class="min-h-screen bg-brand-ivory text-brand-ink">
    <Header v-if="normalizedPath !== '/'" :floating="false" />
    <slot />
    <div class="relative z-30">
      <Footer />
    </div>
  </div>
</template>
