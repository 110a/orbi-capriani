<script setup lang="ts">
import LogoText from '../ui/logo/LogoText.vue'

const rows = [
  {
    title: 'Elegant Living',
    body: 'A calm residential experience shaped around comfort, privacy, and refined architectural details.',
    image: '/images/1.png',
    reverse: false,
  },
  {
    title: 'Connected Location',
    body: 'A destination designed for access, leisure, and a strong connection to the surrounding city.',
    image: '/images/2.png',
    reverse: true,
  },
]
</script>

<template>
  <section id="about" class="mx-auto max-w-6xl px-6 py-16 lg:px-8" aria-labelledby="about-title">
    <div class="mb-12 max-w-2xl">
      <p class="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">About</p>
      <h2
        id="about-title"
        class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
      >
        Two perspectives, one identity.
      </h2>
    </div>

    <div class="space-y-10">
      <template v-for="(row, index) in rows" :key="row.title">
        <article class="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div
            class="overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-slate-200"
            :class="row.reverse ? 'lg:order-1' : 'lg:order-2'"
          >
            <img
              :src="row.image"
              :alt="row.title"
              class="h-full min-h-[320px] w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            class="flex h-full flex-col justify-center px-1 py-2 lg:px-8"
            :class="row.reverse ? 'lg:order-2 lg:items-end lg:text-right' : 'lg:order-1'"
          >
            <div class="max-w-xl">
              <p class="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
                Section 0{{ index + 1 }}
              </p>
              <h3 class="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {{ row.title }}
              </h3>
              <p class="mt-4 text-base leading-7 text-slate-600">
                {{ row.body }}
              </p>

              <div class="mt-8" :class="row.reverse ? 'flex justify-end' : ''">
                <LogoText variant="dark" class="h-7 w-auto" />
              </div>
            </div>
          </div>
        </article>

        <div
          v-if="index === 0"
          class="mx-auto my-10 h-px w-full max-w-4xl bg-sky-500/70"
          aria-hidden="true"
        />
      </template>
    </div>
  </section>
</template>
