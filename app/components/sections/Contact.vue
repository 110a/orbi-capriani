<script setup lang="ts">
import { useSiteData } from '~/composables/useSiteData'

const { t } = useI18n()
const config = useRuntimeConfig()
const { contact } = useSiteData()
const isImageLoaded = ref(false)
const contactImageRef = ref<{ $el?: HTMLImageElement } | null>(null)
const form = reactive({
  firstName: '',
  surname: '',
  country: '',
  email: '',
  phone: '',
})
const honeypot = ref('')
const isSubmitting = ref(false)
type ContactField = keyof typeof form

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const errors = reactive<Partial<Record<ContactField, string>>>({})
const submission = reactive<{
  status: 'success' | 'error' | null
  message: string
}>({
  status: null,
  message: '',
})

useHead({
  script: config.public.recaptchaSiteKey
    ? [
        {
          src: `https://www.google.com/recaptcha/api.js?render=${config.public.recaptchaSiteKey}`,
          async: true,
          defer: true,
        },
      ]
    : [],
})

async function handleContactImageLoad() {
  const image = contactImageRef.value?.$el
  if (!image || image.naturalWidth === 0) return

  try {
    await image.decode()
  } catch {
    // The browser can reject decoding for already-renderable images.
  }

  if (image.naturalWidth > 0) {
    isImageLoaded.value = true
  }
}

onMounted(async () => {
  await nextTick()

  const image = contactImageRef.value?.$el
  if (image?.complete && image.naturalWidth > 0) {
    void handleContactImageLoad()
  }
})

function clearErrors() {
  Object.keys(errors).forEach((field) => delete errors[field as ContactField])
}

function clearFieldError(field: ContactField) {
  delete errors[field]
}

function fieldLabel(field: ContactField): string {
  const keys: Record<ContactField, string> = {
    firstName: 'contact.firstName',
    surname: 'contact.surname',
    country: 'contact.country',
    email: 'contact.mail',
    phone: 'contact.phone',
  }

  return t(keys[field])
}

function requiredError(field: ContactField) {
  errors[field] = t('contact.validation.required', { field: fieldLabel(field) })
}

function minLengthError(field: ContactField, min: number) {
  errors[field] = t('contact.validation.minLength', { field: fieldLabel(field), min })
}

function maxLengthError(field: ContactField, max: number) {
  errors[field] = t('contact.validation.maxLength', { field: fieldLabel(field), max })
}

function validateForm(): boolean {
  clearErrors()

  if (!form.firstName.trim()) {
    requiredError('firstName')
  } else if (form.firstName.trim().length < 2) {
    minLengthError('firstName', 2)
  } else if (form.firstName.trim().length > 50) {
    maxLengthError('firstName', 50)
  }

  if (!form.surname.trim()) {
    requiredError('surname')
  } else if (form.surname.trim().length < 2) {
    minLengthError('surname', 2)
  } else if (form.surname.trim().length > 50) {
    maxLengthError('surname', 50)
  }

  if (!form.country.trim()) {
    requiredError('country')
  } else if (form.country.trim().length < 2) {
    minLengthError('country', 2)
  } else if (form.country.trim().length > 60) {
    maxLengthError('country', 60)
  }

  if (!form.email.trim()) {
    requiredError('email')
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = t('contact.validation.email')
  } else if (form.email.trim().length > 100) {
    maxLengthError('email', 100)
  }

  const phone = form.phone.trim()
  if (phone && phone.length < 7) {
    minLengthError('phone', 7)
  } else if (phone && phone.length > 20) {
    maxLengthError('phone', 20)
  } else if (phone && !/^\+?[0-9][0-9\s().-]*$/.test(phone)) {
    errors.phone = t('contact.validation.phone')
  }

  return !Object.keys(errors).length
}

function waitForRecaptcha(): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('recaptcha unavailable')), 8000)
    const check = () => {
      if (!window.grecaptcha) {
        window.setTimeout(check, 100)
        return
      }

      window.grecaptcha.ready(() => {
        window.clearTimeout(timeout)
        resolve()
      })
    }

    check()
  })
}

async function recaptchaToken(): Promise<string> {
  const siteKey = config.public.recaptchaSiteKey
  if (!siteKey) throw new Error('recaptcha site key missing')

  await waitForRecaptcha()
  return window.grecaptcha!.execute(siteKey, { action: 'contact' })
}

function setSubmissionError(messageKey: string) {
  submission.status = 'error'
  submission.message = t(messageKey)
}

function mapServerErrors(serverErrors: Record<string, string[] | string>) {
  const fieldMap: Record<string, ContactField> = {
    first_name: 'firstName',
    firstName: 'firstName',
    surname: 'surname',
    country: 'country',
    email: 'email',
    phone: 'phone',
  }

  Object.keys(serverErrors).forEach((field) => {
    const mappedField = fieldMap[field]
    if (mappedField) {
      errors[mappedField] = t('contact.validation.invalid', { field: fieldLabel(mappedField) })
    }
  })
}

async function submitForm() {
  if (isSubmitting.value || honeypot.value) return

  submission.status = null
  submission.message = ''

  if (!validateForm()) {
    setSubmissionError('contact.feedback.invalid')
    return
  }

  isSubmitting.value = true

  let token: string
  try {
    token = await recaptchaToken()
  } catch {
    setSubmissionError('contact.feedback.recaptchaError')
    isSubmitting.value = false
    return
  }

  try {
    await $fetch(config.public.contactEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        first_name: form.firstName.trim(),
        surname: form.surname.trim(),
        country: form.country.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        recaptcha_token: token,
      },
    })

    Object.assign(form, { firstName: '', surname: '', country: '', email: '', phone: '' })
    submission.status = 'success'
    submission.message = t('contact.feedback.success')
  } catch (error: unknown) {
    const fetchError = error as {
      status?: number
      statusCode?: number
      data?: { errors?: Record<string, string[] | string> }
    }
    const status = fetchError.status ?? fetchError.statusCode

    if (status === 422 && fetchError.data?.errors) {
      mapServerErrors(fetchError.data.errors)
      setSubmissionError('contact.feedback.invalid')
    } else if (status === 429) {
      setSubmissionError('contact.feedback.rateLimited')
    } else if (status === 500) {
      setSubmissionError('contact.feedback.serverError')
    } else {
      setSubmissionError('contact.feedback.requestError')
    }
  } finally {
    isSubmitting.value = false
  }
}

const props = withDefaults(
  defineProps<{
    sectionId?: string
    image?: string
    imageCaption?: string
  }>(),
  {
    sectionId: 'contact',
  },
)

const contactImage = computed(() => props.image ?? contact.value.image?.src ?? '')
const contactImageAlt = computed(() => contact.value.image?.alt ?? t('contact.title'))
const contactImageCaption = computed(() => props.imageCaption ?? contact.value.image?.caption ?? '')
</script>

<template>
  <section class="border-t border-ink" :aria-labelledby="`${props.sectionId}-title`" id="contact">
    <div
      class="mx-auto grid w-full items-center justify-items-center gap-6 px-6 py-16 2xl:max-w-[1840px] lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-20 lg:px-20"
    >
      <div class="relative w-full max-w-xl overflow-hidden lg:max-w-none lg:py-10">
        <figure class="relative aspect-4/5 bg-paper">
          <NuxtImg
            ref="contactImageRef"
            :src="contactImage"
            :alt="contactImageAlt"
            class="h-full w-full object-cover object-center opacity-0 transition-opacity duration-500"
            :class="{ 'opacity-100': isImageLoaded }"
            loading="lazy"
            decoding="async"
            @load="handleContactImageLoad"
          />
          <figcaption
            v-if="contactImageCaption"
            class="text-base sm:text-lg text-white absolute bottom-2 left-3 z-10 font-medium pr-4 leading-tight"
          >
            {{ contactImageCaption }}
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
            {{ t('contact.title') }}
          </h2>

          <!-- <p class="mt-4 text-lg leading-7 text-slate-600">
            Leave your details and our team will contact you shortly.
          </p> -->

          <form
            class="mt-10 grid gap-6 text-left sm:grid-cols-2"
            novalidate
            @submit.prevent="submitForm"
          >
            <input
              v-model="honeypot"
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="pointer-events-none absolute size-px overflow-hidden opacity-0"
            />
            <div class="relative">
              <input
                id="contact-first-name"
                type="text"
                name="firstName"
                v-model="form.firstName"
                @input="clearFieldError('firstName')"
                minlength="2"
                maxlength="50"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="given-name"
                :placeholder="`${t('contact.firstName')} *`"
              />
              <p v-if="errors.firstName" class="absolute top-full mt-1 text-sm text-red-800">
                {{ errors.firstName }}
              </p>
            </div>

            <div class="relative">
              <input
                id="contact-surname"
                type="text"
                name="surname"
                v-model="form.surname"
                @input="clearFieldError('surname')"
                minlength="2"
                maxlength="50"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="family-name"
                :placeholder="`${t('contact.surname')} *`"
              />
              <p v-if="errors.surname" class="absolute top-full mt-1 text-sm text-red-800">
                {{ errors.surname }}
              </p>
            </div>

            <div class="relative sm:col-span-2">
              <input
                id="contact-country"
                type="text"
                name="country"
                v-model="form.country"
                @input="clearFieldError('country')"
                minlength="2"
                maxlength="60"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="country-name"
                :placeholder="`${t('contact.country')} *`"
              />
              <p v-if="errors.country" class="absolute top-full mt-1 text-sm text-red-800">
                {{ errors.country }}
              </p>
            </div>

            <div class="relative sm:col-span-2">
              <input
                id="contact-email"
                type="email"
                name="email"
                v-model="form.email"
                @input="clearFieldError('email')"
                maxlength="100"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="email"
                :placeholder="`${t('contact.mail')} *`"
              />
              <p v-if="errors.email" class="absolute top-full mt-1 text-sm text-red-800">
                {{ errors.email }}
              </p>
            </div>

            <div class="relative sm:col-span-2">
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                v-model="form.phone"
                inputmode="tel"
                @input="clearFieldError('phone')"
                minlength="7"
                maxlength="20"
                class="outline-none w-full border-b focus:shadow-[0_1px_0_0_var(--color-ink)] border-ink px-4 py-3 text-lg transition uppercase"
                autocomplete="tel"
                :placeholder="$t('contact.phone')"
              />
              <p v-if="errors.phone" class="absolute top-full mt-1 text-sm text-red-800">
                {{ errors.phone }}
              </p>
            </div>

            <div class="relative mt-6 sm:col-span-2">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex w-full items-center justify-center gap-3 border border-ink px-6 py-3 tracking-[0.08em] text-ink text-lg uppercase transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-ink hover:bg-ink hover:text-white"
              >
                <!-- 1. The Animated SVG Spinner (Only shows when isSubmitting is true) -->
                <svg
                  v-if="isSubmitting"
                  class="size-5 animate-spin text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>

                <!-- 2. Button Label -->
                <span>
                  {{ isSubmitting ? t('contact.sending') : t('contact.submit') }}
                </span>
              </button>
              <p
                v-if="submission.message"
                class="absolute top-full mt-2 text-sm"
                :class="submission.status === 'success' ? 'text-green-800' : 'text-red-800'"
                aria-live="polite"
              >
                {{ submission.message }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
