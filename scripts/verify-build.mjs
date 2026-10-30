import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

const expectedDomain = process.argv[2]?.replace(/\/+$/, '')
const indexable = process.env.SITE_INDEXABLE !== 'false'
const siteKey = process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY
const apiBaseUrl = process.env.NUXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '')
const outputDirectory = '.output/public'
const failures = []

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name)
      return entry.isDirectory() ? filesIn(path) : [path]
    }),
  )
  return files.flat()
}

function fail(message) {
  failures.push(message)
}

function readAttribute(tag, name) {
  return new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1]
}

function htmlAlternates(html) {
  return [...html.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => ({
      rel: readAttribute(tag, 'rel'),
      hreflang: readAttribute(tag, 'hreflang'),
      href: readAttribute(tag, 'href'),
    }))
    .filter((link) => link.rel === 'alternate' && link.hreflang && link.href)
}

function expectedAlternates(canonicalUrl) {
  const url = new URL(canonicalUrl)
  const path = url.pathname.replace(/^\/(?:ru|ka)(?=\/|$)/, '') || '/'
  const suffix = path === '/' ? '' : path
  const origin = url.origin

  return new Map([
    ['en', `${origin}${suffix || '/'}`],
    ['ru', `${origin}/ru${suffix}`],
    ['ka', `${origin}/ka${suffix}`],
    ['x-default', `${origin}${suffix || '/'}`],
  ])
}

function sameAlternates(actual, expected) {
  return (
    actual.size === expected.size &&
    [...expected].every(([language, href]) => actual.get(language) === href)
  )
}

if (!expectedDomain) fail('Usage: npm run verify:build -- https://expected-domain.example')
if (!apiBaseUrl) fail('NUXT_PUBLIC_API_BASE_URL must be set')
if (apiBaseUrl?.includes('REPLACE-WITH')) fail('NUXT_PUBLIC_API_BASE_URL must not be a placeholder')

const files = await filesIn(outputDirectory)
const contents = await Promise.all(files.map(async (path) => [path, await readFile(path, 'utf8')]))
const contentByPath = new Map(contents)
const generatedOutput = contents
  .map(([path, content]) => `${relative(outputDirectory, path)}\n${content}`)
  .join('\n')
const relativeFiles = files.map((path) => relative(outputDirectory, path))
const deployableContent = contents
  .filter(([path]) => !relative(outputDirectory, path).startsWith('_nuxt/'))
  .map(([path, content]) => `${relative(outputDirectory, path)}\n${content}`)
  .join('\n')
const htmlFiles = relativeFiles.filter((path) => path.endsWith('.html'))
const indexHtml = contentByPath.get(join(outputDirectory, 'index.html')) ?? ''
const robots = contentByPath.get(join(outputDirectory, 'robots.txt')) ?? ''
const sitemapFiles = relativeFiles.filter((path) => path.includes('sitemap'))

if (!indexHtml) fail('index.html is missing')
if (!robots) fail('robots.txt is missing')

for (const attribute of ['rel="canonical"', 'property="og:url"', 'hreflang=']) {
  if (!indexHtml.includes(attribute)) fail(`index.html is missing ${attribute}`)
}

const requiredMetadataUrls = [
  ...indexHtml.matchAll(/<link[^>]+(?:rel="canonical"|hreflang="[^"]+")[^>]+href="([^"]+)"/g),
  ...indexHtml.matchAll(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/g),
]

for (const [, url] of requiredMetadataUrls) {
  if (!url.startsWith(expectedDomain)) fail(`metadata URL does not use ${expectedDomain}: ${url}`)
}

if (generatedOutput.includes('github.io') || generatedOutput.includes('/orbi-capriani/')) {
  fail('generated output contains a GitHub Pages URL or base path')
}

for (const asset of indexHtml.matchAll(/(?:src|href)="(\/[^"\s]+)"/g)) {
  if (asset[1].startsWith('/_nuxt/') || !asset[1].startsWith('/orbi-capriani/')) continue
  fail(`asset uses a non-root base path: ${asset[1]}`)
}

if (!siteKey || siteKey.includes('REPLACE-WITH')) {
  fail('NUXT_PUBLIC_RECAPTCHA_SITE_KEY must be set to a non-placeholder public key')
}

if (!generatedOutput.includes(siteKey)) {
  fail('generated output is missing NUXT_PUBLIC_RECAPTCHA_SITE_KEY')
}

if (indexable) {
  const expectedRobots = `User-agent: *\nAllow: /\n\nSitemap: ${expectedDomain}/sitemap_index.xml\n`
  if (robots !== expectedRobots)
    fail(`robots.txt must exactly equal the production robots policy for ${expectedDomain}`)

  const sitemapIndexPath = join(outputDirectory, 'sitemap_index.xml')
  const sitemapIndex = contentByPath.get(sitemapIndexPath)
  if (!sitemapIndex) fail('indexable build is missing sitemap_index.xml')

  const childSitemaps = relativeFiles.filter((path) => /^__sitemap__\/.+\.xml$/.test(path))
  if (!childSitemaps.length) fail('indexable build is missing __sitemap__/*.xml files')

  for (const sitemapPath of ['sitemap_index.xml', ...childSitemaps]) {
    const sitemap = contentByPath.get(join(outputDirectory, sitemapPath)) ?? ''
    for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (!url.startsWith(expectedDomain))
        fail(`${sitemapPath} contains a URL outside ${expectedDomain}: ${url}`)
    }
  }

  const sitemapEntries = new Map()
  for (const sitemapPath of childSitemaps) {
    const sitemap = contentByPath.get(join(outputDirectory, sitemapPath)) ?? ''
    for (const [, entry] of sitemap.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/g)) {
      const location = /<loc>([^<]+)<\/loc>/.exec(entry)?.[1]
      if (!location) continue

      const alternates = new Map(
        [...entry.matchAll(/<(?:\w+:)?link\b[^>]*>/g)]
          .map(([tag]) => [readAttribute(tag, 'hreflang'), readAttribute(tag, 'href')])
          .filter(([language, href]) => language && href),
      )
      sitemapEntries.set(location, alternates)
    }
  }

  for (const path of htmlFiles) {
    const html = contentByPath.get(join(outputDirectory, path)) ?? ''
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)]
      .map(([tag]) => ({ rel: readAttribute(tag, 'rel'), href: readAttribute(tag, 'href') }))
      .find((link) => link.rel === 'canonical')?.href
    if (!canonical) continue

    const expectedAlternatesForPage = expectedAlternates(canonical)
    const htmlAlternateMap = new Map(htmlAlternates(html).map((link) => [link.hreflang, link.href]))
    const sitemapAlternateMap = sitemapEntries.get(canonical)

    if (!sameAlternates(htmlAlternateMap, expectedAlternatesForPage))
      fail(`${path} hreflang alternates do not exactly match the expected short-code URLs`)
    if (!sitemapAlternateMap)
      fail(`${path} canonical URL is missing from sitemap entries: ${canonical}`)
    else if (!sameAlternates(sitemapAlternateMap, expectedAlternatesForPage))
      fail(`${path} sitemap hreflang alternates do not exactly match the expected short-code URLs`)
    else if (!sameAlternates(htmlAlternateMap, sitemapAlternateMap))
      fail(`${path} HTML hreflang alternates do not exactly match its sitemap entry`)
  }

  for (const path of htmlFiles) {
    if ((contentByPath.get(join(outputDirectory, path)) ?? '').includes('noindex, nofollow'))
      fail(`indexable build contains noindex in ${path}`)
  }

  for (const host of [
    'dev.ciprianibatumi.com',
    'dev-api.ciprianibatumi.com',
    'dev-cms.ciprianibatumi.com',
  ]) {
    if (deployableContent.includes(host)) fail(`indexable build contains development host ${host}`)
  }
} else {
  if (robots !== 'User-agent: *\nDisallow: /\n')
    fail('non-indexable build robots.txt must exactly disallow all without a Sitemap line')
  if (sitemapFiles.length)
    fail(`non-indexable build contains sitemap artifacts: ${sitemapFiles.join(', ')}`)

  for (const path of htmlFiles) {
    if (
      !(contentByPath.get(join(outputDirectory, path)) ?? '').includes(
        'name="robots" content="noindex, nofollow"',
      )
    )
      fail(`non-indexable build is missing noindex in ${path}`)
  }

  for (const host of ['https://api.ciprianibatumi.com', 'cms.ciprianibatumi.com']) {
    if (deployableContent.includes(host))
      fail(`non-indexable build contains production host ${host}`)
  }
}

for (const path of [
  'sitemap.xml/index.html',
  'ka/sitemap.xml/index.html',
  'ru/sitemap.xml/index.html',
]) {
  if (relativeFiles.includes(path)) fail(`generated output contains sitemap stub ${path}`)
}

for (const value of ['REPLACE-WITH', 'localhost', '127.0.0.1']) {
  if (deployableContent.includes(value)) fail(`generated output contains forbidden value ${value}`)
}

for (const value of ['en-US', 'ru-RU', 'ka-GE']) {
  if (generatedOutput.includes(value))
    fail(`generated output contains legacy locale identifier ${value}`)
}

if (apiBaseUrl && !generatedOutput.includes(apiBaseUrl)) {
  fail(`generated output is missing NUXT_PUBLIC_API_BASE_URL: ${apiBaseUrl}`)
}

if (failures.length) {
  console.error(`Build verification failed for ${expectedDomain || 'an unspecified domain'}:`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`Build verification passed for ${expectedDomain}`)
}
