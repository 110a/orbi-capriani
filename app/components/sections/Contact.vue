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
  <section
    class="border-t border-[#14315c]"
    :aria-labelledby="`${props.sectionId}-title`"
    id="contact"
  >
    <div
      class="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-center lg:gap-20 mx-auto px-6 py-16 lg:px-20"
    >
      <div>
        <figure class="relative">
          <img
            :src="props.image"
            alt="Contact"
            class="h-full aspect-[4/5] w-full object-cover object-center overflow-hidden"
            loading="lazy"
            decoding="async"
          />
          <figcaption
            v-if="props.imageCaption"
            class="text-sm text-slate-500 absolute bottom-1 left-2 z-10 font-medium text-shadow-sm text-white"
          >
            {{ props.imageCaption }}
          </figcaption>
        </figure>
      </div>

      <div
        class="hidden bg-[#14315c] lg:block lg:col-start-2 lg:row-start-1 lg:self-stretch"
        aria-hidden="true"
      />

      <div class="flex h-full flex-col justify-center px-1 py-2">
        <div class="mx-auto w-full max-w-xl text-center">
          <h2
            class="text-5xl uppercase tracking-[0.35em] text-white [-webkit-text-stroke:1px_black]"
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
                class="w-full border-b border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#14315c] uppercase"
                autocomplete="given-name"
                :placeholder="$t('contact.firstName')"
              />
            </div>

            <div>
              <input
                id="contact-surname"
                type="text"
                name="surname"
                class="w-full border-b border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition uppercase focus:border-[#14315c]"
                autocomplete="family-name"
                :placeholder="t('contact.surname')"
              />
            </div>

            <div>
              <input
                id="contact-phone"
                type="text"
                name="mail"
                class="w-full border-b border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition uppercase focus:border-[#14315c]"
                autocomplete="text"
                :placeholder="$t('contact.mail')"
              />
            </div>

            <div>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                class="w-full border-b border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition uppercase focus:border-[#14315c]"
                autocomplete="tel"
                :placeholder="$t('contact.phone')"
              />
            </div>

            <button
              type="submit"
              class="inline-flex w-full items-center justify-center border border-[#14315c] px-6 py-3 uppercase tracking-[0.1em] text-[#14315c] text-xl uppercase transition hover:bg-[#0f2748] hover:text-white sm:col-span-2 mt-6"
            >
              {{ t('contact.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
