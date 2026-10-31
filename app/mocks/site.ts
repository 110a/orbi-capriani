import type { ApiSiteResponse } from '~/types/content'

export const siteMock: ApiSiteResponse = {
  data: {
    settings: {
      whatsapp_url: 'https://wa.me/995000000000',
      analytics_id: null,
    },
    scripts: {
      head_scripts: [
        `<script>
window.__cmsMockHeadScriptLoaded = true
console.log('CMS head script loaded edit')
</script>`,
      ],
      body_end_scripts: [
        `<script>
window.__cmsMockBodyEndScriptLoaded = true
console.log('CMS body-end script loaded edit')
</script>`,
      ],
    },
    contact: {
      image: {
        type: 'image',
        versions: [
          { url: '/images/8-480.webp', width: 480 },
          { url: '/images/8-800.webp', width: 800 },
          { url: '/images/8-1200.webp', width: 1200 },
          { url: '/images/8-1600.webp', width: 1600 },
        ],
        translations: {
          en: { alt: 'Contact', caption: 'Cipriani Residences Batumi' },
          ru: { alt: '[RU] Contact', caption: '[RU] Cipriani Residences Batumi' },
          ka: { alt: '[KA] Contact', caption: '[KA] Cipriani Residences Batumi' },
        },
      },
    },
  },
}
