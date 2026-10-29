import type { ApiHomeResponse } from '~/types/content'

export const sectionsMock: ApiHomeResponse = {
  data: {
    sections: [
      {
        id: 1,
        order: 1,
        image_position: 'auto',
        media: [
          {
            type: 'image',
            versions: [
              { url: '/images/5-480.webp', width: 480 },
              { url: '/images/5-800.webp', width: 800 },
              { url: '/images/5-1200.webp', width: 1200 },
              { url: '/images/5-1600.webp', width: 1600 },
            ],
            translations: {
              en: { alt: 'Cipriani Residences Batumi', caption: '' },
              ru: { alt: '[RU] Cipriani Residences Batumi', caption: '' },
              ka: { alt: '[KA] Cipriani Residences Batumi', caption: '' },
            },
          },
        ],
        translations: {
          en: {
            title: 'Cipriani Residences Batumi',
            body: "Rising on the sunlit shores of the Black Sea, Cipriani Resort, Residences and Casino, Batumi marks a new chapter in the storied Cipriani legacy — the brand's first resort and residential offering in Europe. Set in the heart of Georgia's most dynamic coastal city, Cipriani Residences Batumi will offer residents a life of effortless elegance, where every moment is touched by timeless sophistication.",
          },
          ru: {
            title: '[RU] Cipriani Residences Batumi',
            body: '[RU] Test text for the first section.',
          },
          ka: {
            title: '[KA] Cipriani Residences Batumi',
            body: '[KA] Test text for the first section.',
          },
        },
      },
      {
        id: 2,
        order: 2,
        image_position: 'auto',
        media: [
          {
            type: 'video',
            versions: [
              { url: '/video/belini-960.mp4', width: 960, mime: 'video/mp4' },
              { url: '/video/belini-1280.mp4', width: 1280, mime: 'video/mp4' },
              { url: '/video/belini-1920.mp4', width: 1920, mime: 'video/mp4' },
            ],
            loop: false,
            poster: {
              type: 'image',
              versions: [
                { url: '/images/8-480.webp', width: 480 },
                { url: '/images/8-800.webp', width: 800 },
                { url: '/images/8-1200.webp', width: 1200 },
                { url: '/images/8-1600.webp', width: 1600 },
              ],
              translations: {
                en: {
                  alt: 'Harry’s Bar in Venice',
                  caption:
                    'Cipriani dining services ensure the Bellini cocktail is never out of reach',
                },
              },
            },
            translations: {
              en: {
                alt: 'Harry’s Bar in Venice',
                caption:
                  'Cipriani dining services ensure the Bellini cocktail is never out of reach',
              },
            },
          },
        ],
        translations: {
          en: {
            title: 'The Story',
            body: 'The Cipriani legacy began when Giuseppe Cipriani Sr. opened Harry’s Bar in Venice in 1931. Warm and inviting, the small room was soon crowded with artists, aristocrats, and writers who came for the martinis and stayed for the conversation. Attracting everyone from Ernest Hemingway to Katharine Hepburn, it became famous for its charming atmosphere and discreet, anticipatory service.',
          },
          ru: null,
          ka: { title: '[KA] The Story', body: '[KA] Test text for the second section.' },
        },
      },
      {
        id: 3,
        order: 3,
        image_position: 'auto',
        media: [
          {
            type: 'image',
            versions: [
              { url: '/images/7-480.webp', width: 480 },
              { url: '/images/7-800.webp', width: 800 },
              { url: '/images/7-1200.webp', width: 1200 },
              { url: '/images/7-1600.webp', width: 1600 },
            ],

            translations: {
              en: { alt: 'Batumi coast', caption: 'Cipriani Residences Batumi' },
            },
          },
        ],
        translations: {
          en: {
            title: 'The Location',
            body: 'Batumi is situated 300km west of Tbilisi, within the subtropical foothills of the Caucasus Mountains on the southwestern coast of Georgia. Nestled within a site that boasts a rich and diverse 2,000-year-old history as the maritime gate of Georgia, Batumi promises a distinctive experience that celebrates both metropolitan living and natural landscapes.',
          },
          ru: { title: '[RU] The Location', body: '[RU] Test text for the third section.' },
          ka: { title: '[KA] The Location', body: '[KA] Test text for the third section.' },
        },
      },
    ],
  },
}
