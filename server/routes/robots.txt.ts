export default defineEventHandler((event) => {
  const indexable = process.env.SITE_INDEXABLE !== 'false'
  const siteUrl = (process.env.SITE_URL || 'https://example.com').replace(/\/+$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=UTF-8')
  return indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap_index.xml\n`
    : 'User-agent: *\nDisallow: /\n'
})
