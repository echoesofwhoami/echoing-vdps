import { getCollection } from 'astro:content'
import type { BlogPost, Heading, LabLink } from '../types/post'
import { sitePath } from './site'

export function getPostSlug(id: string): string {
  return id.replace(/\.mdx?$/, '')
}

function postLink(post: BlogPost | undefined): LabLink | undefined {
  if (!post) return

  return {
    href: sitePath(getPostSlug(post.id)),
    title: post.data.title,
  }
}

export function postNavLinks(older: BlogPost | undefined, newer: BlogPost | undefined) {
  return {
    olderLink: postLink(older),
    newerLink: postLink(newer),
  }
}

function byNewestFirst(a: BlogPost, b: BlogPost) {
  const dateDifference = new Date(b.data.date).getTime() - new Date(a.data.date).getTime()

  return dateDifference || a.id.localeCompare(b.id)
}

export async function getPosts() {
  const posts = await getCollection('blog')

  return posts.map((post) => ({
    params: { slug: getPostSlug(post.id) },
    props: { post },
  }))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function getAdjacentPosts(slug: string) {
  const posts = await getCollection('blog')

  const currentPost = posts.find((post) => getPostSlug(post.id) === slug)

  if (!currentPost) {
    return { older: undefined, newer: undefined }
  }

  const ordered = [...posts].sort((a, b) => {
    const dateDifference = new Date(a.data.date).getTime() - new Date(b.data.date).getTime()

    return dateDifference || a.id.localeCompare(b.id)
  })

  const currentIndex = ordered.findIndex((post) => post.id === currentPost.id)

  return {
    older: ordered[currentIndex - 1],
    newer: ordered[currentIndex + 1],
  }
}

export async function postPage(post: BlogPost) {
  const slug = getPostSlug(post.id)
  const adjacent = await getAdjacentPosts(slug)

  return {
    slug,
    older: adjacent.older,
    newer: adjacent.newer,
  }
}

export function headingsOnPage(headings: Heading[]): Heading[] {
  const visible: Heading[] = []

  for (const heading of headings) {
    if (heading.depth !== 2 && heading.depth !== 3) continue

    visible.push(heading)
  }

  return visible
}

export async function postsByDate() {
  const posts = await getCollection('blog')

  return [...posts].sort(byNewestFirst)
}
