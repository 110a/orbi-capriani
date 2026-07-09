<script setup lang="ts">
import Header from '../layouts/Header.vue'
import ContactSection from '../components/sections/Contact.vue'
import HeroSection from '../components/sections/Hero.vue'
import TwoColumnSection from '../components/sections/TwoColumn.vue'

const { t } = useI18n()

const { data: pageContent } = await useAsyncData('home-content', () =>
  queryCollection('content').path('/index').first(),
)

useSiteMeta({
  title: 'Home',
  description: 'One-page marketing template powered by Nuxt 4 and Tailwind CSS.',
})

const { initAnalytics } = useAnalytics()
initAnalytics()

type SectionKey = 'about' | 'location' | 'experience'

const sectionMeta = [
  { sectionId: 'about' as SectionKey, image: '/images/5.png', imagePosition: 'right' as const },
  { sectionId: 'location' as SectionKey, image: '/images/6.png', imagePosition: 'left' as const },
  {
    sectionId: 'experience' as SectionKey,
    image: '/images/7.png',
    imagePosition: 'right' as const,
  },
]

const sections = computed(() =>
  sectionMeta.map((meta) => ({
    ...meta,
    eyebrow: t(`sections.${meta.sectionId}.eyebrow`),
    title: t(`sections.${meta.sectionId}.title`),
    body: t(`sections.${meta.sectionId}.body`),
    imageCaption: t(`sections.${meta.sectionId}.imageCaption`),
  })),
)
</script>

<template>
  <main>
    <HeroSection />

    <div class="relative z-30 bg-white">
      <div class="mx-auto py-4 px-4">
        <Header :floating="false" as="div" :show-logo="true" />
      </div>
      <TwoColumnSection
        v-for="(section, index) in sections"
        :key="section.sectionId"
        :section-id="section.sectionId"
        :eyebrow="section.eyebrow"
        :title="section.title"
        :body="section.body"
        :image="section.image"
        :image-position="section.imagePosition"
        :index="index"
        :image-caption="section.imageCaption"
      />

      <ContactSection />
    </div>
  </main>
</template>
