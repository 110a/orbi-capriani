<script setup lang="ts">
import LogoFull from '~/components/ui/logo/LogoFull.vue'
import BrandLogo from '../components/ui/logo/Logo.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-30 bg-main text-gray-300">
    <div
      class="flex flex-col items-center justify-between gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:px-10"
    >
      <!-- Logo  -->
      <div
        class="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 lg:justify-start"
      >
        <LogoFull variant="light" class="mb-3 w-28 sm:w-28 h-auto" />
        <NuxtImg src="/images/logo/logo-orbi.svg" alt="Logo" class="w-10" />
        <NuxtImg src="/images/logo/logo-block.svg" alt="Logo" class="w-17.5" />
      </div>

      <!-- Nav -->
      <div class="w-full lg:w-auto">
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-end text-lg">
          <NuxtLink
            to="#contact"
            class="text-white opacity-100 hover:opacity-70 transition-opacity"
          >
            {{ t('footer.enquire') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/privacy')"
            class="text-white opacity-100 hover:opacity-70 transition-opacity"
          >
            {{ t('footer.privacy') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="border-t border-paper/10">
      <div class="mx-auto max-w-6xl px-4 py-4 text-center text-sm text-paper sm:px-6 lg:px-10">
        {{ t('footer.copyright', { year: currentYear }) }}
      </div>
    </div>
  </footer>
</template>
