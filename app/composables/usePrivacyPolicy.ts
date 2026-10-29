import { privacyPolicyMock } from '~/mocks/privacy-policy'
import type { Locale } from '~/types/content'
import { mapPrivacyPolicy } from '~/utils/privacy-policy'

const supportedLocales: Locale[] = ['en', 'ru', 'ka']

export const usePrivacyPolicy = () => {
  const { locale } = useI18n()

  const privacyPolicy = computed(() => {
    const activeLocale = supportedLocales.includes(locale.value as Locale)
      ? (locale.value as Locale)
      : 'en'

    return mapPrivacyPolicy(privacyPolicyMock, activeLocale)
  })

  return { privacyPolicy }
}
