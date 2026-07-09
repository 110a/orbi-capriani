<script setup lang="ts">
import LogoFull from '~/components/ui/logo/LogoFull.vue'
import BrandLogo from '../components/ui/logo/Logo.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-30 bg-gray-900 text-gray-300">
    <div class="max-w-6xl mx-auto px-4 py-12 flex justify-between items-center">
      <!-- Logo  -->
      <div class="flex items-center gap-10">
        <LogoFull variant="light" class="mb-3 w-16 h-auto" />
        <NuxtImg src="/images/logo/logo-orbi.svg" alt="Logo" class="mb-3 w-6" />
        <NuxtImg src="/images/logo/logo-block.svg" alt="Logo" class="mb-3 w-12" />
      </div>

      <!-- Nav -->
      <div>
        <div class="flex gap-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-100 hover:text-white transition-colors"
          >
            {{ t('footer.credits') }}
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-100 hover:text-white transition-colors"
          >
            {{ t('footer.enquire') }}
          </a>
          <NuxtLink
            :to="localePath('/privacy')"
            class="text-sm text-gray-100 hover:text-white transition-colors"
          >
            {{ t('footer.privacy') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-500 text-center">
        © {{ currentYear }} Cipriani USA, Inc. {{ t('footer.copyright', { year: currentYear }) }}
      </div>
    </div>
  </footer>
</template>
