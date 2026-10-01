import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getPostSlug, postsByDate } from '@utils'

export async function GET(context: APIContext) {
  const sorted = await postsByDate()

  const site = context.site

  if (site === undefined) {
    throw new Error('site is not configured')
  }

  return rss({
    title: 'EchoingVdps',
    description: 'Educational writeups of vulnerability disclosure and bug bounty reports.',
    site,
    trailingSlash: false,
    items: sorted.map((post) => {
      const slug = getPostSlug(post.id)

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.date),
        link: `/${slug}`,
      }
    }),
    customData: '<language>en-us</language>',
  })
}
