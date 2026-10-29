import type { ApiPrivacyPolicyResponse, Locale, PrivacyPolicyView } from '~/types/content'

const FALLBACK_LOCALE: Locale = 'en'

export function mapPrivacyPolicy(
  response: ApiPrivacyPolicyResponse,
  locale: Locale,
): PrivacyPolicyView {
  const policy = response.data.privacy_policy
  const translation = policy.translations[locale] ?? policy.translations[FALLBACK_LOCALE]

  return {
    title: translation?.title ?? '',
    updatedAt: policy.updated_at,
    content: translation?.content ?? '',
  }
}
