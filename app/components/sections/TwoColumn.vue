<script setup lang="ts">
import LogoIcon from '../ui/logo/LogoIcon.vue'

const props = withDefaults(
  defineProps<{
    sectionId?: string
    title: string
    body: string
    image: string
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
  <section class="border-t border-[#14315c]" :aria-labelledby="`${props.sectionId}-title`">
    <div
      class="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-center lg:gap-20 mx-auto px-6 py-16 lg:px-20"
    >
      <div
        class="overflow-hidden relative"
        :class="isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-3 lg:row-start-1'"
      >
        <figure>
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
        class="hidden bg-[#14315c] lg:block lg:col-start-2 lg:row-start-1 lg:self-stretch"
        aria-hidden="true"
      />

      <div
        class="flex h-full flex-col justify-center px-1 py-2"
        :class="
          isReversed
            ? 'lg:col-start-3 lg:row-start-1 lg:items-end lg:text-right'
            : 'lg:col-start-1 lg:row-start-1'
        "
      >
        <div class="max-w-xl text-center">
          <!-- <p class="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            {{ eyebrow }}
          </p> -->
          <h2
            :id="`${props.sectionId}-title`"
            class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            {{ title }}
          </h2>
          <p class="mt-4 text-3xl text-slate-600">
            {{ body }}
          </p>

          <div class="mt-8 flex justify-center">
            <LogoIcon :variant="logoVariant" class="h-16 w-auto" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
