export const useAnalytics = () => {
  const config = useRuntimeConfig()
  const { settings } = useSiteData()

  const initAnalytics = () => {
    if (!config.public.indexable || !settings.value.analyticsId) {
      return
    }

    // Placeholder only: plug in your analytics provider script here.
  }

  return {
    analyticsId: computed(() => (config.public.indexable ? settings.value.analyticsId : '')),
    initAnalytics,
  }
}
