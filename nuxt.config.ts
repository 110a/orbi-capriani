// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/fonts.css', '~/assets/css/tailwind.css'],
  nitro: {
    preset: 'static',
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      titleTemplate: '%s | Capriani Batumi',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}/images/favicon/favicon-96x96.png`,
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}/images/favicon/favicon.svg`,
        },
        {
          rel: 'shortcut icon',
          href: '/images/favicon/favicon.ico',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}/images/favicon/favicon.ico`,
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}/images/favicon/apple-touch-icon.png`,
        },
        {
          rel: 'manifest',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}/
        images/favicon/site.webmanifest`,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      analyticsId: process.env.NUXT_PUBLIC_ANALYTICS_ID || '',
    },
  },
  site: {
    url: 'https://example.com',
    name: 'Capriani Batumi',
  },
  sitemap: {
    autoLastmod: true,
  },
  robots: {
    enabled: true,
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
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
  ],
})
