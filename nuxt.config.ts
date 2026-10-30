// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

// Must end with a trailing slash.
const base = process.env.NUXT_APP_BASE_URL || '/'
const normalizeUrl = (url: string) => url.replace(/\/+$/, '')
const siteUrl = normalizeUrl(process.env.SITE_URL || 'https://example.com')
const apiBaseUrl = normalizeUrl(process.env.NUXT_PUBLIC_API_BASE_URL || '')
const indexable = process.env.SITE_INDEXABLE !== 'false'
const shortLocaleRuntime = {
  name: 'short-locale-runtime',
  renderChunk(code: string) {
    const transformed = code
      .replaceAll('en-US', 'en')
      .replaceAll('ru-RU', 'ru')
      .replaceAll('ka-GE', 'ka')

    return transformed === code ? null : { code: transformed, map: null }
  },
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/fonts.css', '~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss(), shortLocaleRuntime],
  },
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/robots.txt'],
      // The sitemap module exposes sitemap_index.xml; do not prerender i18n page stubs.
      ignore: ['/sitemap.xml', '/ka/sitemap.xml', '/ru/sitemap.xml'],
    },
  },
  app: {
    baseURL: base,
    head: {
      titleTemplate: '%s | Capriani Batumi',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...(indexable ? [] : [{ name: 'robots', content: 'noindex, nofollow' }]),
      ],
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
      apiBaseUrl,
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
      indexable,
    },
  },
  site: {
    url: siteUrl,
    name: 'Capriani Batumi',
  },
  ...(indexable
    ? {
        sitemap: {
          autoLastmod: true,
        },
      }
    : {}),
  fonts: {
    families: [
      {
        name: 'Noto Sans Georgian',
        provider: 'google',
      },
    ],
  },
  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'ka', language: 'ka', name: 'ქართული', file: 'ka.json' },
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
    ...(indexable ? ['@nuxtjs/sitemap'] : []),
    '@nuxt/eslint',
    '@nuxtjs/i18n',
  ],
})
