import type { LessonCategory } from '../types/content'

export function useLesson() {
  async function fetchBySlug(
    slug: string,
    category?: LessonCategory,
    options: { publishedOnly?: boolean } = {},
  ) {
    const normalized = slug.trim()
    if (!normalized) {
      return null
    }

    let builder = queryCollection('lessons').where('slug', '=', normalized)

    if (category) {
      builder = builder.where('category', '=', category)
    }

    if (options.publishedOnly !== false) {
      builder = builder.where('status', '=', 'published')
    }

    return builder.first()
  }

  function slugFromRoute(param: string | string[] | undefined): string {
    if (Array.isArray(param)) {
      return param.filter(Boolean).join('/')
    }
    return param ?? ''
  }

  return {
    fetchBySlug,
    slugFromRoute,
  }
}
