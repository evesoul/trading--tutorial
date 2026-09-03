import type { LessonCategory } from '../types/content'

export interface CourseQuery {
  part?: number
  category?: LessonCategory
  /** 默认只取 published，避免 draft / 未发布 slug 进入导航 */
  publishedOnly?: boolean
}

function compareLessons(
  left: { part: number, order: number },
  right: { part: number, order: number },
): number {
  if (left.part !== right.part) {
    return left.part - right.part
  }
  return left.order - right.order
}

export function getLessonPath(category: LessonCategory, slug: string): string {
  switch (category) {
    case 'indicators':
      return `/indicators/${slug}`
    case 'combinations':
      return `/combinations/${slug}`
    case 'trading-system':
      return `/trading-system/${slug}`
    case 'glossary':
      return `/glossary#${slug}`
    case 'introduction':
      return slug === 'introduction' || slug === '' ? '/course' : `/course/${slug}`
  }
}

export function useCourse() {
  async function fetchLessons(query: CourseQuery = {}) {
    let builder = queryCollection('lessons')

    if (query.part !== undefined) {
      builder = builder.where('part', '=', query.part)
    }

    if (query.category) {
      builder = builder.where('category', '=', query.category)
    }

    if (query.publishedOnly !== false) {
      builder = builder.where('status', '=', 'published')
    }

    const lessons = await builder.all()
    return [...lessons].sort(compareLessons)
  }

  async function resolvePublishedPath(slug: string): Promise<string | null> {
    const normalized = slug.trim()
    if (!normalized) {
      return null
    }

    const lesson = await queryCollection('lessons')
      .where('slug', '=', normalized)
      .where('status', '=', 'published')
      .first()

    if (!lesson) {
      return null
    }

    return getLessonPath(lesson.category, lesson.slug)
  }

  function groupLessonsByPart<T extends { part: number, order: number }>(lessons: T[]) {
    const groups = new Map<number, T[]>()

    for (const lesson of [...lessons].sort(compareLessons)) {
      const current = groups.get(lesson.part) ?? []
      current.push(lesson)
      groups.set(lesson.part, current)
    }

    return [...groups.entries()]
      .sort(([left], [right]) => left - right)
      .map(([part, items]) => ({ part, lessons: items }))
  }

  return {
    fetchLessons,
    groupLessonsByPart,
    getLessonPath,
    resolvePublishedPath,
  }
}
