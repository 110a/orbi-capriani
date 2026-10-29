import { sectionsMock } from '~/mocks/sections'
import type { Locale } from '~/types/content'
import { mapSections } from '~/utils/sections'

const supportedLocales: Locale[] = ['en', 'ru', 'ka']

export const useSections = () => {
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const activeLocale = computed<Locale>(() => {
    const currentLocale = locale.value as Locale
    return supportedLocales.includes(currentLocale) ? currentLocale : 'en'
  })

  const sections = computed(() => mapSections(sectionsMock, activeLocale.value, config.app.baseURL))

  return {
    sections,
  }
}
