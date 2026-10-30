<script setup lang="ts">
const { localeProperties } = useI18n()
const { settings } = useSiteData()

const toInlineScriptContent = (snippet: string) =>
  snippet.replace(/^\s*<script\b[^>]*>/i, '').replace(/<\/script>\s*$/i, '')

useHead(() => ({
  htmlAttrs: {
    lang: localeProperties.value.language ?? 'en',
  },
  script: [
    ...settings.value.headScripts.map((content, index) => ({
      key: `cms-head-script-${index}`,
      innerHTML: toInlineScriptContent(content),
    })),
    ...settings.value.bodyEndScripts.map((content, index) => ({
      key: `cms-body-end-script-${index}`,
      innerHTML: toInlineScriptContent(content),
      tagPosition: 'bodyClose' as const,
    })),
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
