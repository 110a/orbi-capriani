<script setup lang="ts">
const { localeProperties } = useI18n()

useHead(() => ({
  htmlAttrs: {
    lang: localeProperties.value.language ?? 'en-US',
  },
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
