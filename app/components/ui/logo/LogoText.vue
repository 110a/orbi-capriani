<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'light' | 'dark'
    class?: string
  }>(),
  {
    variant: 'dark',
  },
)

const logoSrc = computed(() => {
  if (props.variant === 'light') {
    return '/images/logo/logo-capriani-light.svg'
  }

  return '/images/logo/logo-capriani-dark.svg'
})
</script>

<template>
  <span class="inline-flex shrink-0 items-center aspect-[485/77]" :class="$props.class">
    <NuxtImg
      :src="logoSrc"
      alt="Capriani"
      class="block h-full w-full"
      loading="eager"
      decoding="async"
    />
  </span>
</template>
