export interface LessonHeading {
  id: string
  text: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function flattenText(node: unknown): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    if (typeof node[0] === 'string') {
      const start = isRecord(node[1]) ? 2 : 1
      return node.slice(start).map(flattenText).join('')
    }
    return node.map(flattenText).join('')
  }

  if (isRecord(node)) {
    if (typeof node.value === 'string') {
      return node.value
    }
    if (Array.isArray(node.children)) {
      return node.children.map(flattenText).join('')
    }
  }

  return ''
}

export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[（(]/g, '')
    .replace(/[）)]/g, '')
    .replace(/[/／,，]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^\w\u3400-\u9fff-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function shortTermLabel(text: string): string {
  const beforeParen = text.split('（')[0]?.trim()
  return beforeParen || text
}

function pushHeading(acc: LessonHeading[], id: unknown, text: string, skipTitle?: string) {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (!trimmed || trimmed === skipTitle) {
    return
  }
  const raw = typeof id === 'string' && id && id !== trimmed ? id : headingSlug(trimmed)
  acc.push({
    id: raw,
    text: trimmed,
  })
}

function walk(node: unknown, acc: LessonHeading[], depth: number, skipTitle?: string) {
  if (!node) {
    return
  }

  if (Array.isArray(node)) {
    const name = node[0]
    const props = isRecord(node[1]) ? node[1] : {}

    if (name === `h${depth}`) {
      pushHeading(acc, props.id, flattenText(node), skipTitle)
      return
    }

    if (name === 'heading' && Number(props.depth) === depth) {
      pushHeading(acc, props.id, flattenText(node), skipTitle)
      return
    }

    for (const child of node) {
      walk(child, acc, depth, skipTitle)
    }
    return
  }

  if (isRecord(node)) {
    if (node.type === 'heading' && Number(node.depth) === depth) {
      const props = isRecord(node.props) ? node.props : {}
      pushHeading(acc, props.id ?? node.id, flattenText(node), skipTitle)
      return
    }

    if (node.value !== undefined) {
      walk(node.value, acc, depth, skipTitle)
    }
    if (Array.isArray(node.children)) {
      walk(node.children, acc, depth, skipTitle)
    }
  }
}

export function extractHeadings(
  body: unknown,
  options: { depth?: number, skipTitle?: string } = {},
): LessonHeading[] {
  const headings: LessonHeading[] = []
  walk(body, headings, options.depth ?? 2, options.skipTitle)
  return headings
}

export function extractLessonHeadings(body: unknown, skipTitle?: string): LessonHeading[] {
  return extractHeadings(body, { depth: 2, skipTitle })
}
