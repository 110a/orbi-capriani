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
    class="border-t border-ink"
    :aria-labelledby="`${props.sectionId}-title`"
    :id="props.sectionId"
  >
    <div
      class="mx-auto grid w-full items-center justify-items-center gap-6 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-10 xl:gap-20 2xl:gap-28 lg:px-10 xl:px-20 2xl:px-28"
    >
      <div
        class="relative min-w-0 w-full max-w-md mx-auto overflow-hidden lg:max-w-none lg:py-10"
        :class="isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-3 lg:row-start-1'"
      >
        <figure class="w-full min-w-0">
          <NuxtImg
            :src="image"
            :alt="title"
            class="h-full aspect-4/5 w-full object-cover object-center overflow-hidden"
            loading="lazy"
            decoding="async"
          />
          <figcaption
            v-if="props.imageCaption"
            class="text-lg text-white absolute bottom-2 left-3 z-10 font-medium"
          >
            {{ props.imageCaption }}
          </figcaption>
        </figure>
      </div>

      <div
        class="hidden lg:block h-px w-full bg-ink lg:col-start-2 lg:row-start-1 lg:h-auto lg:w-px lg:self-stretch"
        aria-hidden="true"
      />

      <div
        class="flex h-full min-w-0 w-full flex-col justify-center items-center px-1 py-2 lg:max-w-none max-w-xl mx-auto"
        :class="
          isReversed
            ? 'lg:col-start-3 lg:row-start-1 lg:items-end lg:text-right'
            : 'lg:col-start-1 lg:row-start-1'
        "
      >
        <div class="w-full text-center max-w-xl lg:max-w-none">
          <!-- <p class="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            {{ eyebrow }}
          </p> -->
          <h2
            :id="`${props.sectionId}-title`"
            class="wrap-anywhere text-4xl sm:text-5xl md:text-5xl lg:text-[40px] xl:text-[44px] uppercase tracking-[0.02em] text-paper sm:tracking-[0.03em] [-webkit-text-stroke:1px_var(--color-ink)] 2xl:text-[54px]/[1.25]"
          >
            {{ title }}
          </h2>
          <p
            class="mt-8 text-xl overflow-anywhere sm:text-2xl md:text-[28px]/[1.2] lg:text-[28px] xl:text-[32px]/[1.2] 2xl:text-[40px]/[52.5px] text-ink tracking-[0.03em]"
          >
            {{ body }}
          </p>

          <div class="mt-20 flex flex-col items-center">
            <LogoIcon :variant="logoVariant" class="h-auto max-w-23.75" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
