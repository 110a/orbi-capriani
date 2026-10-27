<script setup lang="ts">
import LogoIcon from '../ui/logo/LogoIcon.vue'

const props = withDefaults(
  defineProps<{
    sectionId?: string
    title: string
    body: string
    image: string
    alt?: string
    imageCaption?: string
    imagePosition?: 'left' | 'right' | 'auto'
    index?: number
    eyebrow?: string
    logoVariant?: 'light' | 'dark'
  }>(),
  {
    sectionId: 'about',
    imageCaption: ' ',
    imagePosition: 'auto',
    index: 0,
    eyebrow: 'About',
    logoVariant: 'dark',
  },
)

const isReversed = computed(() => {
  if (props.imagePosition === 'left') {
    return true
  }

  if (props.imagePosition === 'right') {
    return false
  }

  return props.index % 2 === 1
})
</script>

<template>
  <section
    class="border-t border-[#14315c]"
    :aria-labelledby="`${props.sectionId}-title`"
    :id="props.sectionId"
  >
    <div
      class="mx-auto grid w-full items-center justify-items-center gap-6 px-6 py-16 2xl:max-w-[1800px] lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-20 lg:px-20"
    >
      <div
        class="relative min-w-0 w-full max-w-md overflow-hidden lg:max-w-none"
        :class="isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-3 lg:row-start-1'"
      >
        <figure class="w-full min-w-0">
          <NuxtImg
            :src="image"
            :alt="title"
            class="h-full aspect-[4/5] w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <figcaption
            v-if="props.imageCaption"
            class="mt-3 text-sm text-white absolute left-2 bottom-1 z-10 font-medium text-shadow-sm"
          >
            {{ props.imageCaption }}
          </figcaption>
        </figure>
      </div>

      <div
        class="hidden lg:block h-px w-full bg-[#14315c] lg:col-start-2 lg:row-start-1 lg:h-auto lg:w-px lg:self-stretch"
        aria-hidden="true"
      />

      <div
        class="flex h-full min-w-0 w-full flex-col justify-center items-center px-1 py-2"
        :class="
          isReversed
            ? 'lg:col-start-3 lg:row-start-1 lg:items-end lg:text-right'
            : 'lg:col-start-1 lg:row-start-1'
        "
      >
        <div class="w-full max-w-xl text-center">
          <!-- <p class="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            {{ eyebrow }}
          </p> -->
          <h2
            :id="`${props.sectionId}-title`"
            class="[overflow-wrap:anywhere] text-4xl uppercase tracking-[0.02em] text-white sm:text-5xl sm:tracking-[0.02em] [-webkit-text-stroke:1px_black]"
          >
            {{ title }}
          </h2>
          <p class="mt-4 text-xl [overflow-wrap:anywhere] sm:text-2xl lg:text-3xl text-slate-600">
            {{ body }}
          </p>

          <div class="mt-8 flex justify-center">
            <LogoIcon :variant="logoVariant" class="h-auto w-full max-w-[20rem]" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
