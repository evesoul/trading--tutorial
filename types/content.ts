export type LessonCategory =
  | 'introduction'
  | 'indicators'
  | 'combinations'
  | 'trading-system'
  | 'wyckoff'
  | 'glossary'

export type LessonLevel = 'beginner' | 'intermediate' | 'advanced'

export type LessonStatus = 'draft' | 'review' | 'published' | 'archived'

export interface LessonIndicator {
  type: string
  difficulty: string
}

export interface LessonLearning {
  prerequisites?: string[]
  next?: string[]
}

export interface LessonVisual {
  cover?: string
  charts?: string[]
}

export interface LessonSummary {
  id: string
  title: string
  description: string
  part: number
  category: LessonCategory
  level: LessonLevel
  order: number
  slug: string
  status?: LessonStatus
}

export function isLessonCategory(value: string): value is LessonCategory {
  return [
    'introduction',
    'indicators',
    'combinations',
    'trading-system',
    'wyckoff',
    'glossary',
  ].includes(value)
}
