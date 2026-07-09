<script setup lang="ts">
defineProps<{
  href?: string
  variant?: 'primary' | 'secondary'
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
    :class="
      variant === 'secondary'
        ? 'border border-slate-300 text-slate-700 hover:bg-slate-100'
        : 'bg-slate-900 text-white hover:bg-slate-700'
    "
  >
    <slot />
  </component>
</template>
