// The three languages of the site
export type Locale = 'en' | 'ru' | 'ka'

// One size of one image
export type ImageVersion = {
  url: string
  width: number
}

export type VideoVersion = {
  url: string
  width: number // encoded video width, for example 960, 1280, or 1920
  mime: string
}
// An image: several sizes of the same picture
export type ApiImage = {
  type: 'image'
  versions: ImageVersion[]
  translations: Partial<Record<Locale, { alt: string | null; caption: string | null } | null>>
}

// A video: one or more files, and a picture shown before it plays
export type ApiVideo = {
  type: 'video'
  versions: VideoVersion[]
  poster: ApiImage | null
  loop: boolean
  translations: Partial<Record<Locale, { alt: string | null; caption: string | null } | null>>
}

export type ApiMedia = ApiImage | ApiVideo

// One section of the page
export type ApiSection = {
  id: number
  order: number
  image_position: 'left' | 'right' | 'auto' | null
  media: ApiMedia[] // the first item is used
  translations: Partial<Record<Locale, { title: string | null; body: string | null } | null>>
}

// What the API returns for the page
export type ApiSectionsResponse = {
  data: {
    sections: ApiSection[]
  }
}

export type ApiPrivacyPolicy = {
  updated_at: string | null
  translations: Partial<Record<Locale, { title: string | null; content: string | null } | null>>
}

export type ApiPrivacyPolicyResponse = {
  data: {
    privacy_policy: ApiPrivacyPolicy
  }
}

// ---------- What the components receive ----------

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

export type SectionView = {
  id: string // for example "section-1"
  title: string
  body: string
  imagePosition: 'left' | 'right' | 'auto'
  media: SectionMedia | null // null when the section has no image or video
}

export type PrivacyPolicyView = {
  title: string
  updatedAt: string | null
  content: string
}
