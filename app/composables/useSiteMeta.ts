interface SiteMetaInput {
  title?: string
  description?: string
  image?: string
}

const SITE_NAME = 'Capriani Batumi'
const DEFAULT_DESCRIPTION = 'description.'
const DEFAULT_IMAGE = '/og-default.jpg'

export const useSiteMeta = (meta: SiteMetaInput = {}) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const switchLocalePath = useSwitchLocalePath()
  const siteUrl = config.public.i18n.baseUrl.replace(/\/+$/, '')
  const canonicalUrl = `${siteUrl}${route.path}`
  const englishUrl = `${siteUrl}${switchLocalePath('en')}`

  useHead({
    titleTemplate: (titleChunk?: string) =>
      titleChunk ? `${titleChunk} | ${SITE_NAME}` : SITE_NAME,
    link: [
      { rel: 'canonical', href: canonicalUrl },
      ...(['en', 'ru', 'ka'] as const).map((locale) => ({
        rel: 'alternate',
        hreflang: locale,
        href: `${siteUrl}${switchLocalePath(locale)}`,
      })),
      { rel: 'alternate', hreflang: 'x-default', href: englishUrl },
    ],
  })

  useSeoMeta({
    title: meta.title ?? SITE_NAME,
    description: meta.description ?? DEFAULT_DESCRIPTION,
    ogTitle: meta.title ?? SITE_NAME,
    ogDescription: meta.description ?? DEFAULT_DESCRIPTION,
    ogImage: meta.image ?? DEFAULT_IMAGE,
    ogType: 'website',
    ogUrl: canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: meta.title ?? SITE_NAME,
    twitterDescription: meta.description ?? DEFAULT_DESCRIPTION,
    twitterImage: meta.image ?? DEFAULT_IMAGE,
  })
}
