// =====================================================================
// Shared
// =====================================================================

// The three languages of the site
export type Locale = 'en' | 'ru' | 'ka'

// Text of one language. Any field can be null when it is not translated.
type Translations<T> = Partial<Record<Locale, T | null>>

// =====================================================================
// API: what the backend sends
// =====================================================================

// ---------- Media ----------

// One size of one image
export type ImageVersion = {
  url: string
  width: number
}

// One encoding of one video
export type VideoVersion = {
  url: string
  width: number // encoded video width, for example 960, 1280 or 1920
  mime: string // for example "video/mp4"
}

// An image: several sizes of the same picture
export type ApiImage = {
  type: 'image'
  versions: ImageVersion[]
  translations: Translations<{ alt: string | null; caption: string | null }>
}

// A video: several encodings, and a picture shown before it plays
export type ApiVideo = {
  type: 'video'
  versions: VideoVersion[]
  poster: ApiImage | null
  loop: boolean
  translations: Translations<{ alt: string | null; caption: string | null }>
}

export type ApiMedia = ApiImage | ApiVideo

// ---------- Sections ----------

// One section of the page
export type ApiSection = {
  id: number
  order: number
  image_position: 'left' | 'right' | 'auto' | null
  media: ApiMedia[] // the first item is used
  translations: Translations<{ title: string | null; body: string | null }>
}

// ---------- Settings and contact ----------

export type ApiSettings = {
  whatsapp_url: string | null
}

export type ApiContact = {
  image: ApiImage | null
}

// ---------- Privacy policy ----------

export type ApiPrivacyPolicy = {
  updated_at: string | null
  translations: Translations<{ title: string | null; content: string | null }>
}

// ---------- Responses ----------

// What the API returns for the home page
export type ApiHomeResponse = {
  data: {
    sections: ApiSection[]
  }
}

// What the API returns for shared site data used across pages
export type ApiSiteResponse = {
  data: {
    settings: ApiSettings
    contact: ApiContact
  }
}

// What the API returns for the privacy page
export type ApiPrivacyPolicyResponse = {
  data: {
    privacy_policy: ApiPrivacyPolicy
  }
}

// =====================================================================
// Components: what the components receive
// One language, no null values, ready to display.
// =====================================================================

// ---------- Media ----------

export type SectionImage = {
  kind: 'image'
  src: string // one file, used when the browser can't choose
  srcset: string // all sizes, for example "a-480.webp 480w, a-800.webp 800w"
  alt: string
  caption: string
}

export type SectionVideo = {
  kind: 'video'
  sources: VideoVersion[]
  poster: string | null // picture shown before the video plays
  loop: boolean
  alt: string
  caption: string
}

export type SectionMedia = SectionImage | SectionVideo

// ---------- Sections ----------

export type SectionView = {
  id: string // for example "section-1"
  title: string
  body: string
  imagePosition: 'left' | 'right' | 'auto'
  media: SectionMedia | null // null when the section has no image or video
}

// ---------- Settings and contact ----------

export type SiteSettings = {
  whatsappUrl: string // empty text when the CMS has none
}

export type ContactView = {
  image: SectionImage | null
}

// ---------- Privacy policy ----------

export type PrivacyPolicyView = {
  title: string
  updatedAt: string | null
  content: string
}
