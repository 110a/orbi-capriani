import { siteMock } from '~/mocks/site'
import type { ContactView, Locale, SiteSettings } from '~/types/content'
import { mapMedia } from '~/utils/sections'

const supportedLocales: Locale[] = ['en', 'ru', 'ka']

export const useSiteData = () => {
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const activeLocale = computed<Locale>(() => {
    const currentLocale = locale.value as Locale
    return supportedLocales.includes(currentLocale) ? currentLocale : 'en'
  })

  const settings = computed<SiteSettings>(() => ({
    whatsappUrl: siteMock.data.settings.whatsapp_url ?? '',
  }))

  const contact = computed<ContactView>(() => {
    const media = mapMedia(
      siteMock.data.contact.image ?? undefined,
      activeLocale.value,
      config.app.baseURL,
    )

    return {
      image: media?.kind === 'image' ? media : null,
    }
  })

  return { settings, contact }
}
