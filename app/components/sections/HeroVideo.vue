<script setup lang="ts">
import LogoFull from '../ui/logo/LogoFull.vue'

const video = ref<HTMLVideoElement | null>(null)

function playHeroVideo() {
  const element = video.value
  if (!element) return

  element.muted = true
  element.defaultMuted = true
  element.playsInline = true
  void element.play().catch(() => {})
}

onMounted(() => {
  playHeroVideo()
})
</script>

<template>
  <div class="relative isolate h-[100svh] min-h-[640px] overflow-hidden text-white">
    <div class="fixed inset-0 z-0">
      <video
        ref="video"
        class="h-full w-full object-cover object-center"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        aria-hidden="true"
        @canplay="playHeroVideo"
      >
        <source src="/video/hero_video.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-black/30" />
    </div>

    <div class="relative z-10 flex h-full flex-col">
      <div class="mx-auto flex h-full w-full items-center justify-center px-6 py-20 lg:px-8">
        <div class="flex w-full max-w-2xl flex-col items-center text-center">
          <!-- <LogoFull variant="light" class="h-full w-1/2" /> -->
          <h1 class="sr-only">Cipriani Residences Batumi - Luxury Resort & Residences</h1>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-x-0 bottom-16 z-20 mx-auto px-6 lg:px-8">
      <a
        href="#header"
        class="pointer-events-auto absolute left-1/2 inline-flex h-11 w-11 -translate-x-1/2 items-center justify-center text-white transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label="Scroll to the first section"
      >
        <svg
          class="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="0.5"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </div>
  </div>
</template>
