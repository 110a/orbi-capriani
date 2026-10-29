import type {
  ApiMedia,
  ApiHomeResponse,
  ImageVersion,
  Locale,
  SectionMedia,
  SectionView,
  VideoVersion,
} from '~/types/content'

const FALLBACK_LOCALE: Locale = 'en'

type Translations<K extends string> = Partial<
  Record<Locale, Partial<Record<K, string | null>> | null>
>

// Text of the current language, or English when it is missing or empty
function text<K extends string>(
  translations: Translations<K> | undefined,
  locale: Locale,
  field: K,
): string {
  return translations?.[locale]?.[field] || translations?.[FALLBACK_LOCALE]?.[field] || ''
}

// Local addresses (starting with "/") get the base path of the site
function withBase(url: string, baseURL: string): string {
  if (!url.startsWith('/')) return url
  return baseURL.replace(/\/$/, '') + url
}

const sortVersions = (versions: ImageVersion[]) => [...versions].sort((a, b) => a.width - b.width)
const sortVideoVersions = (versions: VideoVersion[]) =>
  [...versions].sort((a, b) => b.width - a.width)

// The file used when the browser can't choose: the first one at least 800 px wide
function pickVersion(versions: ImageVersion[]): ImageVersion | null {
  const sorted = sortVersions(versions)
  return sorted.find((v) => v.width >= 800) ?? sorted.at(-1) ?? null
}

export function mapMedia(
  media: ApiMedia | undefined,
  locale: Locale,
  baseURL: string,
): SectionMedia | null {
  if (!media) return null

  const alt = text(media.translations, locale, 'alt')
  const caption = text(media.translations, locale, 'caption')

  if (media.type === 'image') {
    const main = pickVersion(media.versions)
    if (!main) return null

    return {
      kind: 'image',
      src: withBase(main.url, baseURL),
      srcset: sortVersions(media.versions)
        .map((v) => `${withBase(v.url, baseURL)} ${v.width}w`)
        .join(', '),
      alt,
      caption,
    }
  }

  const poster = media.poster ? pickVersion(media.poster.versions) : null

  return {
    kind: 'video',
    sources: sortVideoVersions(media.versions).map((version) => ({
      ...version,
      url: withBase(version.url, baseURL),
    })),
    poster: poster ? withBase(poster.url, baseURL) : null,
    loop: media.loop,
    alt,
    caption,
  }
}

export function mapSections(
  response: ApiHomeResponse,
  locale: Locale,
  baseURL: string,
): SectionView[] {
  return [...response.data.sections]
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      id: `section-${section.id}`,
      title: text(section.translations, locale, 'title'),
      body: text(section.translations, locale, 'body'),
      imagePosition: section.image_position ?? 'auto',
      media: mapMedia(section.media[0], locale, baseURL),
    }))
}
