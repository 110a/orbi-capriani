interface SiteMetaInput {
  title?: string
  description?: string
  image?: string
}

const SITE_NAME = 'Nuxt Marketing Template'
const DEFAULT_DESCRIPTION =
  'Reusable Nuxt 4 one-page marketing template for freelance client projects.'
const DEFAULT_IMAGE = '/og-default.jpg'

export const useSiteMeta = (meta: SiteMetaInput = {}) => {
  useHead({
    titleTemplate: (titleChunk?: string) =>
      titleChunk ? `${titleChunk} | ${SITE_NAME}` : SITE_NAME,
  })

  useSeoMeta({
    title: meta.title ?? SITE_NAME,
    description: meta.description ?? DEFAULT_DESCRIPTION,
    ogTitle: meta.title ?? SITE_NAME,
    ogDescription: meta.description ?? DEFAULT_DESCRIPTION,
    ogImage: meta.image ?? DEFAULT_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: meta.title ?? SITE_NAME,
    twitterDescription: meta.description ?? DEFAULT_DESCRIPTION,
    twitterImage: meta.image ?? DEFAULT_IMAGE,
  })
}
