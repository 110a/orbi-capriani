<script setup lang="ts">
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    sectionId?: string
    image?: string
    imageCaption?: string
  }>(),
  {
    sectionId: 'contact',
    image: '/images/8.png',
    imageCaption: 'Cipriani Residences Batumi',
  },
)
</script>

<template>
  <section class="border-t border-ink" :aria-labelledby="`${props.sectionId}-title`" id="contact">
    <div
      class="mx-auto grid w-full items-center justify-items-center gap-6 px-6 py-16 2xl:max-w-[1840px] lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-20 lg:px-20"
    >
      <div class="relative w-full overflow-hidden lg:max-w-none lg:py-10">
        <figure class="relative">
          <NuxtImg
            :src="props.image"
            alt="Contact"
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

      <div class="flex h-full min-w-0 w-full flex-col justify-center px-1 py-2">
        <div class="mx-auto w-full max-w-xl text-center">
          <h2
            class="wrap-anywhere text-4xl sm:text-5xl md:text-5xl lg:text-[40px] xl:text-[44px] uppercase tracking-[0.02em] text-paper sm:tracking-[0.03em] [-webkit-text-stroke:1px_var(--color-ink)] 2xl:text-[54px]/[1.25]"
          >
            {{ t('contact.eyebrow') }}
          </h2>
          <!-- <h2
            :id="`${props.sectionId}-title`"
            class="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Enquire now
          </h2> -->
          <!-- <p class="mt-4 text-lg leading-7 text-slate-600">
            Leave your details and our team will contact you shortly.
          </p> -->

          <form class="mt-10 grid gap-6 text-left sm:grid-cols-2">
            <div>
              <input
                id="contact-first-name"
                type="text"
                name="firstName"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="given-name"
                :placeholder="`${t('contact.firstName')} *`"
              />
            </div>

            <div>
              <input
                id="contact-surname"
                type="text"
                name="surname"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="family-name"
                :placeholder="`${t('contact.surname')} *`"
              />
            </div>

            <div class="sm:col-span-2">
              <input
                id="contact-country"
                type="text"
                name="country"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="country-name"
                :placeholder="`${t('contact.country')} *`"
              />
            </div>

            <div class="sm:col-span-2">
              <input
                id="contact-email"
                type="email"
                name="email"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="email"
                :placeholder="`${t('contact.mail')} *`"
              />
            </div>

            <div class="sm:col-span-2">
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="tel"
                :placeholder="$t('contact.phone')"
              />
            </div>

            <button
              type="submit"
              class="inline-flex w-full items-center justify-center border border-ink px-6 py-3 tracking-[0.08em] text-ink text-lg uppercase transition hover:bg-ink hover:text-white sm:col-span-2 mt-6 cursor-pointer"
            >
              {{ t('contact.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
