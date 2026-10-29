<script setup lang="ts">
import LogoIcon from '../ui/logo/LogoIcon.vue'
import Media from '../ui/Media.vue'
import type { SectionMedia } from '~/types/content'

const props = withDefaults(
  defineProps<{
    sectionId?: string
    title: string
    body: string
    media: SectionMedia | null
    imagePosition?: 'left' | 'right' | 'auto'
    index?: number
    logoVariant?: 'light' | 'dark'
  }>(),
  {
    sectionId: 'about',
    imagePosition: 'auto',
    index: 0,
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
        class="relative min-w-0 w-full max-w-xl mx-auto overflow-hidden lg:max-w-none lg:py-10"
        :class="isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-3 lg:row-start-1'"
      >
        <figure v-if="props.media" class="relative w-full min-w-0">
          <Media
            :media="props.media"
            sizes="(min-width: 1024px) 40vw, 100vw"
            class="h-full aspect-4/5 w-full overflow-hidden"
          />
          <figcaption
            v-if="props.media.caption"
            class="text-lg text-white absolute bottom-2 left-3 z-10 font-medium"
          >
            {{ props.media.caption }}
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
          <h2
            :id="`${props.sectionId}-title`"
            class="wrap-anywhere text-4xl sm:text-5xl md:text-5xl lg:text-[40px] xl:text-[44px] uppercase tracking-[0.02em] text-paper sm:tracking-[0.03em] [-webkit-text-stroke:1px_var(--color-ink)] 2xl:text-[54px]/[1.25]"
          >
            {{ title }}
          </h2>
          <div
            class="mt-8 text-xl sm:text-2xl md:text-[28px]/[1.2] lg:text-[28px] xl:text-[32px]/[1.2] 2xl:text-[40px]/[52.5px] text-ink tracking-[0.03em] whitespace-pre-line"
          >
            {{ body }}
          </div>

          <div class="mt-20 flex flex-col items-center">
            <LogoIcon :variant="logoVariant" class="h-auto max-w-23.75" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
