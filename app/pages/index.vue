<script setup lang="ts">
import Header from '../layouts/Header.vue'
import ContactSection from '../components/sections/Contact.vue'
import HeroVideo from '../components/sections/HeroVideo.vue'
import TwoColumnSection from '../components/sections/TwoColumn.vue'

useSiteMeta({
  title: 'Cipriani Residences Batumi | Coming Soon',
  description:
    'Cipriani Batumi, Cipriani Georgia, luxury hotel Batumi, Cipriani hospitality, Cipriani Residences Batumi, luxury residences Batumi.',
})

const { initAnalytics } = useAnalytics()
initAnalytics()

const { sections } = useSections()
</script>

<template>
  <Header :show-logo="false" theme="light" />
  <main>
    <HeroVideo />

    <div class="relative z-30 bg-paper">
      <div class="py-2 2xl:py-4" id="header">
        <Header :floating="false" as="div" theme="dark" />
      </div>
      <TwoColumnSection
        v-for="(section, index) in sections"
        :key="section.id"
        :section-id="section.id"
        :title="section.title"
        :body="section.body"
        :media="section.media"
        :image-position="section.imagePosition"
        :index="index"
      />

      <ContactSection />
    </div>
  </main>
</template>
