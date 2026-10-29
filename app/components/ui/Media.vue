<script setup lang="ts">
import type { SectionMedia } from '~/types/content'

const isLoaded = ref(false)
const video = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | undefined

// Prefer a higher-resolution file for larger or high-density screens.
// The smallest available version has no media query and is the fallback.
function videoSourceMedia(width: number, isFallback: boolean): string | undefined {
  if (isFallback) return undefined

  const standardScreenWidth = Math.ceil(width / 1.5)
  const retinaScreenWidth = Math.ceil(width / 2)

  return `(min-width: ${standardScreenWidth}px), (min-resolution: 2dppx) and (min-width: ${retinaScreenWidth}px)`
}

withDefaults(
  defineProps<{
    media: SectionMedia
    sizes?: string // how wide the image is on screen, set by the layout
  }>(),
  { sizes: '100vw' },
)

onMounted(() => {
  if (!video.value) return

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      const element = video.value

      if (!entry || !element) return

      if (entry.isIntersecting) {
        void element.play().catch(() => undefined)
      } else {
        element.pause()
      }
    },
    { threshold: 0.25 },
  )

  observer.observe(video.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="bg-[#f2efe3]">
    <img
      v-if="media.kind === 'image'"
      :src="media.src"
      :srcset="media.srcset"
      :sizes="sizes"
      :alt="media.alt"
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover object-center transition-opacity duration-500"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      @load="isLoaded = true"
    />

    <video
      v-else
      ref="video"
      :poster="media.poster ?? undefined"
      :loop="media.loop"
      muted
      playsinline
      preload="metadata"
      class="h-full w-full object-cover object-center"
    >
      <source
        v-for="(file, index) in media.sources"
        :key="file.url"
        :src="file.url"
        :type="file.mime"
        :media="videoSourceMedia(file.width, index === media.sources.length - 1)"
      />
    </video>
  </div>
</template>
