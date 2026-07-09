export const useAnalytics = () => {
  const config = useRuntimeConfig()
  const analyticsId = config.public.analyticsId

  const initAnalytics = () => {
    if (!analyticsId) {
      return
    }

    // Placeholder only: plug in your analytics provider script here.
  }

  return {
    analyticsId,
    initAnalytics,
  }
}
