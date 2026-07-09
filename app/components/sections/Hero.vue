<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import Header from '../../layouts/Header.vue'
import LogoFull from '../ui/logo/LogoFull.vue'

interface Slide {
  images: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}

const slides: Slide[] = [
  {
    images: {
      mobile: '/images/1.png',
      tablet: '/images/1.png',
      desktop: '/images/1.png',
    },
  },
  {
    images: {
      mobile: '/images/2.png',
      tablet: '/images/2.png',
      desktop: '/images/2.png',
    },
  },
  {
    images: {
      mobile: '/images/3.png',
      tablet: '/images/3.png',
      desktop: '/images/3.png',
    },
  },
  {
    images: {
      mobile: '/images/4.png',
      tablet: '/images/4.png',
      desktop: '/images/4.png',
    },
  },
]

const resolveImage = (slide: Slide, size: 'mobile' | 'tablet' | 'desktop') => {
  const fallback =
    slide.images.desktop || slide.images.tablet || slide.images.mobile || '/images/1.png'
  return slide.images[size] || fallback
}

const activeIndex = ref(0)
const autoplayMs = 4000
let autoplayTimer: ReturnType<typeof setInterval> | null = null
const touchStartX = ref<number | null>(null)
const touchStartY = ref<number | null>(null)
const swipeThreshold = 50

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, autoplayMs)
}

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  activeIndex.value = index
  startAutoplay()
}

const handleTouchStart = (event: TouchEvent) => {
  const touch = event.changedTouches[0]
  if (!touch) {
    return
  }

  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
  stopAutoplay()
}

const handleTouchEnd = (event: TouchEvent) => {
  if (touchStartX.value === null || touchStartY.value === null) {
    startAutoplay()
    return
  }

  const touch = event.changedTouches[0]
  if (!touch) {
    startAutoplay()
    return
  }

  const deltaX = touch.clientX - touchStartX.value
  const deltaY = touch.clientY - touchStartY.value

  touchStartX.value = null
  touchStartY.value = null

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
    if (deltaX < 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }

  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <header
    class="relative isolate min-h-[100dvh] overflow-hidden text-white"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
    @touchcancel.passive="startAutoplay"
  >
    <div class="fixed inset-0 z-0">
      <div
        v-for="(slide, index) in slides"
        :key="`slide-${index}`"
        class="absolute inset-0 transition-opacity duration-700"
        :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
      >
        <picture class="block h-full w-full">
          <source media="(min-width: 1024px)" :srcset="resolveImage(slide, 'desktop')" />
          <source media="(min-width: 640px)" :srcset="resolveImage(slide, 'tablet')" />
          <img
            :src="resolveImage(slide, 'mobile')"
            alt=""
            aria-hidden="true"
            class="h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
      <div class="absolute inset-0 bg-black/30" />
    </div>

    <div class="relative z-10 flex min-h-[100dvh] flex-col">
      <Header :floating="false" as="div" :show-logo="false" />

      <div
        class="mx-auto flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center px-6 py-20 lg:px-8"
      >
        <div class="flex w-full max-w-2xl flex-col items-center text-center">
          <LogoFull variant="light" class="w-1/2 h-full" />
        </div>
      </div>
    </div>

    <div
      class="pointer-events-none absolute inset-x-0 bottom-8 z-20 mx-auto flex items-center justify-between px-6 lg:px-8"
    >
      <div class="pointer-events-auto flex items-center gap-2">
        <button
          v-for="(_, index) in slides"
          :key="`dot-${index}`"
          type="button"
          class="h-2.5 rounded-full transition-all"
          :class="index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'"
          :aria-label="`Go to slide ${index + 1}`"
          @click="goToSlide(index)"
        />
      </div>

      <div class="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Previous slide"
          @click="prevSlide"
        >
          ‹
        </button>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Next slide"
          @click="nextSlide"
        >
          ›
        </button>
      </div>
    </div>
  </header>
</template>
