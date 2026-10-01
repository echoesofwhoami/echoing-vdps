import { siteConfig } from '../site.config'
import type { FooterLink, NavbarModel } from '../types/layout'

export function siteBase(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '')
}

export function sitePath(page: string): string {
  const base = siteBase()

  if (page.length === 0) {
    if (base.length === 0) return '/'

    return base
  }

  return `${base}/${page}`
}

export function currentNavSlug(currentPath: string, base: string): string {
  let path = currentPath

  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/'
  }

  const parts: string[] = []

  for (const part of path.split('/')) {
    if (part.length === 0) continue

    parts.push(part)
  }

  return parts.join('/')
}

export function ariaCurrent(currentSlug: string, pageSlug: string): 'page' | undefined {
  if (currentSlug === pageSlug) return 'page'

  return
}

export function navbarModel(currentPath: string, wide?: boolean): NavbarModel {
  const base = siteBase()

  return {
    wide: wide ?? false,
    homePath: sitePath(''),
    aboutPath: sitePath('about'),
    tweakerPath: sitePath('i-dont-like-this-website'),
    currentSlug: currentNavSlug(currentPath, base),
    menuId: 'site-nav-menu',
  }
}

export function footerLinks() {
  const base = siteBase()

  const homeHref = base || '/'

  return {
    homeHref,
    links: footerNavLinks(base, homeHref),
  }
}

function footerNavLinks(base: string, homeHref: string): FooterLink[] {
  const links = [
    footerLink('Home', homeHref, false),
    footerLink('About', `${base}/about`, false),
    footerLink('I don\'t like this website', `${base}/i-dont-like-this-website`, false),
  ]

  const github = githubLink()

  if (!github) return links

  return [...links, github]
}

function githubLink(): FooterLink | undefined {
  const href = siteConfig.githubProfileUrl.trim()

  if (href.length === 0) return

  return footerLink('GitHub', href, true)
}

function footerLink(label: string, href: string, external: boolean): FooterLink {
  if (external) {
    return { label, href, external, target: '_blank', rel: 'noreferrer' }
  }

  return { label, href, external, target: undefined, rel: undefined }
}
