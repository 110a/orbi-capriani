<script setup lang="ts">
import { computed } from 'vue'
import BrandLogoText from '../components/ui/logo/LogoText.vue'

const props = withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
    floating?: boolean
    as?: 'div' | 'header'
    showLogo?: boolean
  }>(),
  {
    theme: 'light',
    floating: true,
    as: 'header',
    showLogo: true,
  },
)

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const isMenuOpen = ref(false)
const isLangOpen = ref(false)

const otherLocales = computed(() => locales.value.filter((l) => l.code !== locale.value))
const homeHref = computed(() => localePath('/'))

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleLang() {
  isLangOpen.value = !isLangOpen.value
}

function updateLocale(code: string) {
  isLangOpen.value = false
  isMenuOpen.value = false
  const path = switchLocalePath(code as 'en' | 'ru' | 'ka')
  if (path) navigateTo(path)
}

const rootClass = computed(() => [
  props.floating ? 'fixed inset-x-0 top-0 z-20' : 'relative z-40',

  props.theme === 'dark' ? 'text-slate-900' : 'text-white',
])

const logoVariant = computed(() => (props.theme === 'dark' ? 'dark' : 'light'))
const textClass = computed(() => (props.theme === 'dark' ? 'text-slate-900' : 'text-white'))
</script>

<template>
  <component :is="as" :class="rootClass">
    <div class="relative mx-auto px-4 flex items-center justify-end h-16">
      <!-- Logo -->
      <NuxtLink
        v-if="props.showLogo"
        :to="homeHref"
        class="flex items-center gap-2 shrink-0 md:mr-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:mr-0"
      >
        <BrandLogoText :variant="logoVariant" class="h-9 w-auto" />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8 mr-6" aria-label="Main navigation">
        <a
          href="tel:"
          :class="[textClass, 'text-sm font-medium transition-colors opacity-85 hover:opacity-100']"
          >{{ t('nav.whatsapp') }}</a
        >
        <a
          href="#contact"
          :class="[textClass, 'text-sm font-medium transition-colors opacity-85 hover:opacity-100']"
          >{{ t('nav.enquire') }}</a
        >
      </nav>

      <!-- Right side: language dropdown -->
      <div class="hidden md:flex items-center gap-4">
        <div class="relative">
          <button
            type="button"
            :class="[
              textClass,
              'w-[3rem] flex items-center gap-1 py-1 text-sm font-semibold transition-colors',
            ]"
            :aria-expanded="isLangOpen"
            aria-haspopup="listbox"
            @click="toggleLang"
          >
            {{ locale.toUpperCase() }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 transition-transform"
              :class="isLangOpen ? 'rotate-180' : ''"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <ul
              v-if="isLangOpen"
              role="listbox"
              class="absolute right-0 top-full mt-1 min-w-[3rem] py-1 bg-transparent"
            >
              <li
                v-for="loc in otherLocales"
                :key="loc.code"
                role="option"
                aria-selected="false"
                class="py-1.5 text-sm cursor-pointer transition-colors"
                @click="updateLocale(loc.code)"
              >
                {{ loc.code.toUpperCase() }}
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- Mobile menu toggle -->
      <button
        type="button"
        class="md:hidden p-2"
        :class="textClass"
        aria-label="Toggle menu"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden border-t border-white/20 bg-black/55 backdrop-blur px-4 py-4 space-y-4"
    >
      <nav class="flex flex-col gap-3" aria-label="Mobile navigation">
        <a href="tel:" class="text-sm font-medium text-white/90">{{ t('nav.whatsapp') }}</a>
        <a href="#contact" class="text-sm font-medium text-white/90" @click="isMenuOpen = false">{{
          t('nav.enquire')
        }}</a>
      </nav>

      <div class="relative inline-block">
        <button
          type="button"
          class="flex items-center gap-1 text-sm font-semibold text-white/90"
          @click="isLangOpen = !isLangOpen"
        >
          {{ locale.toUpperCase() }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 transition-transform"
            :class="isLangOpen ? 'rotate-180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <ul
          v-if="isLangOpen"
          class="mt-2 rounded-md border border-white/15 bg-black/70 backdrop-blur py-1"
        >
          <li
            v-for="loc in otherLocales"
            :key="loc.code"
            class="px-3 py-1.5 text-sm cursor-pointer"
            @click="updateLocale(loc.code)"
          >
            {{ loc.code.toUpperCase() }}
          </li>
        </ul>
      </div>
    </div>
  </component>
</template>
