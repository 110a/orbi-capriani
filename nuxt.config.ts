// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

// Must end with a trailing slash.
const base = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/fonts.css', '~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: 'static',
  },
  app: {
    baseURL: base,
    head: {
      titleTemplate: '%s | Capriani Batumi',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: `${base}images/favicon/favicon-96x96.png`,
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `${base}images/favicon/favicon.svg`,
        },
        {
          rel: 'shortcut icon',
          href: `${base}images/favicon/favicon.ico`,
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: `${base}images/favicon/apple-touch-icon.png`,
        },
        {
          rel: 'manifest',
          href: `${base}images/favicon/site.webmanifest`,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      analyticsId: process.env.NUXT_PUBLIC_ANALYTICS_ID || '',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      contactEndpoint: process.env.NUXT_PUBLIC_CONTACT_ENDPOINT || '/api/contact',
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    },
  },
  site: {
    url: 'https://example.com',
    name: 'Capriani Batumi',
  },
  sitemap: {
    autoLastmod: true,
  },
  fonts: {
    families: [
      {
        name: 'Noto Sans Georgian',
        provider: 'google',
      },
    ],
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'ka', language: 'ka-GE', name: 'ქართული', file: 'ka.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
  },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
  ],
})
