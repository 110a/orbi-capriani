<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'light' | 'dark'
  }>(),
  {
    variant: 'light',
  },
)

const logoSrc = computed(() => {
  if (props.variant === 'dark') {
    return '/images/logo-capriani-full-dark.svg'
  }
  return '/images/logo-capriani-full-light.svg'
})
</script>

<template>
  <div class="inline-flex items-center" aria-label="Capriani" role="img">
    <NuxtImg :src="logoSrc" alt="Capriani" class="h-auto w-full" loading="eager" decoding="async" />
  </div>
</template>
