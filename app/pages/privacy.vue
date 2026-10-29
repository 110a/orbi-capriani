<script setup lang="ts">
import Contact from '~/components/sections/Contact.vue'
import { usePrivacyPolicy } from '~/composables/usePrivacyPolicy'

const { privacyPolicy } = usePrivacyPolicy()

const formattedUpdatedAt = computed(() => {
  if (!privacyPolicy.value.updatedAt) return ''

  const [year, month, day] = privacyPolicy.value.updatedAt.split('-')
  return year && month && day ? `${day}.${month}.${year}` : privacyPolicy.value.updatedAt
})

useSiteMeta({
  title: 'Privacy Policy',
  description: 'Privacy policy page descrition.',
})
</script>

<template>
  <main class="mx-auto py-16 border border-t border-ink">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <h1 class="text-3xl 2xl:text-4xl font-bold tracking-tight text-center text-black mb-10">
        {{ privacyPolicy.title }}
      </h1>
      <p class="text-black" v-if="formattedUpdatedAt">
        <strong>Last updated:</strong> {{ formattedUpdatedAt }}
      </p>
      <div
        class="mb-20 prose prose-neutral max-w-none focus:outline-none text-xl"
        v-if="privacyPolicy.content"
        v-html="privacyPolicy.content"
      />
    </div>
    <Contact />
  </main>
</template>
