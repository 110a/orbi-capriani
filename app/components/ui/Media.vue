<script setup lang="ts">
import type { SectionMedia, VideoVersion } from '~/types/content'

const isLoaded = ref(false)
const isPosterLoaded = ref(false)
const isVideoReady = ref(false)
const isImageFailed = ref(false)
const isPosterFailed = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
const posterRef = ref<{ $el?: HTMLImageElement } | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const selectedVideoSource = ref<VideoVersion | null>(null)
let preloadObserver: IntersectionObserver | undefined
let playObserver: IntersectionObserver | undefined

async function handleImageLoad() {
  const image = imgRef.value
  if (!image || image.naturalWidth === 0) return

  try {
    await image.decode()
  } catch {
    // The browser can reject decoding for already-renderable images.
  }

  if (image.naturalWidth > 0) {
    isLoaded.value = true
  }
}

async function handlePosterLoad() {
  const image = posterRef.value?.$el
  if (!image || image.naturalWidth === 0) return

  try {
    await image.decode()
  } catch {
    // The browser can reject decoding for already-renderable images.
  }

  if (image.naturalWidth > 0) {
    isPosterLoaded.value = true
  }
}

function isElement25PercentInView(element: HTMLElement): boolean {
  const { top, bottom, height } = element.getBoundingClientRect()
  if (!height) return false

  const visibleHeight = Math.min(bottom, window.innerHeight) - Math.max(top, 0)
  return visibleHeight / height >= 0.25
}

async function playVideo() {
  const element = video.value
  if (!element) return

  try {
    await element.play()
    isVideoReady.value = true
  } catch {
    isPosterLoaded.value = true
  }
}

function handleVideoCanPlay() {
  const element = video.value
  if (element && isElement25PercentInView(element)) {
    void playVideo()
  }
}

const props = withDefaults(
  defineProps<{
    media: SectionMedia
    sizes?: string // how wide the image is on screen, set by the layout
  }>(),
  { sizes: '100vw' },
)

function selectVideoSource() {
  if (props.media.kind !== 'video') return

  const requiredWidth = window.innerWidth * window.devicePixelRatio
  const sources = [...props.media.sources].sort((first, second) => first.width - second.width)
  selectedVideoSource.value =
    sources.find((source) => source.width >= requiredWidth) ?? sources.at(-1) ?? null
}

onMounted(async () => {
  if (imgRef.value?.complete && imgRef.value.naturalWidth > 0) {
    void handleImageLoad()
  }

  await nextTick()

  const poster = posterRef.value?.$el
  if (poster?.complete && poster.naturalWidth > 0) {
    void handlePosterLoad()
  }

  selectVideoSource()
  await nextTick()

  const element = video.value
  const container = containerRef.value
  if (!element || !container) return

  element.muted = true
  element.defaultMuted = true
  element.playsInline = true

  preloadObserver = new IntersectionObserver(
    () => {
      element.preload = 'auto'
      preloadObserver?.disconnect()
    },
    { rootMargin: '800px 0px' },
  )

  preloadObserver.observe(container)

  playObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      const observedVideo = video.value

      if (!entry || !observedVideo) return

      if (entry.intersectionRatio >= 0.25) {
        void playVideo()
      } else {
        observedVideo.pause()
      }
    },
    { threshold: 0.25 },
  )

  playObserver.observe(element)

  if (isElement25PercentInView(element)) {
    void playVideo()
  }
})

onBeforeUnmount(() => {
  preloadObserver?.disconnect()
  playObserver?.disconnect()
})
</script>

<template>
  <div ref="containerRef" class="relative overflow-hidden bg-[#f2efe3]">
    <img
      v-if="media.kind === 'image' && !isImageFailed"
      ref="imgRef"
      :src="media.src"
      :srcset="media.srcset"
      :sizes="sizes"
      :alt="media.alt"
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover object-center transition-opacity duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      @load="handleImageLoad"
      @error="isImageFailed = true"
    />

    <template v-if="media.kind === 'video'">
      <NuxtImg
        v-if="media.poster && !isPosterFailed"
        ref="posterRef"
        :src="media.poster"
        sizes="100vw sm:100vw md:50vw lg:50vw xl:40vw"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]"
        :class="isPosterLoaded ? 'opacity-100' : 'opacity-0'"
        @load="handlePosterLoad"
        @error="isPosterFailed = true"
      />

      <ClientOnly>
        <video
          ref="video"
          :loop="media.loop"
          muted
          autoplay
          playsinline
          webkit-playsinline
          preload="auto"
          aria-hidden="true"
          class="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :class="isVideoReady ? 'opacity-100' : 'opacity-0'"
          @canplay="handleVideoCanPlay"
          @playing="isVideoReady = true"
        >
          <source
            v-if="selectedVideoSource"
            :src="`${selectedVideoSource.url}#t=0.001`"
            :type="selectedVideoSource.mime"
          />
        </video>
      </ClientOnly>
    </template>
  </div>
</template>
