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

function pushHeading(acc: LessonHeading[], id: unknown, text: string, skipTitle?: string) {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (!trimmed || trimmed === skipTitle) {
    return
  }
  acc.push({
    id: String(id ?? trimmed),
    text: trimmed,
  })
}

function walk(node: unknown, acc: LessonHeading[], skipTitle?: string) {
  if (!node) {
    return
  }

  if (Array.isArray(node)) {
    const name = node[0]
    const props = isRecord(node[1]) ? node[1] : {}

    if (name === 'h2') {
      pushHeading(acc, props.id, flattenText(node), skipTitle)
      return
    }

    if (name === 'heading' && Number(props.depth) === 2) {
      pushHeading(acc, props.id, flattenText(node), skipTitle)
      return
    }

    for (const child of node) {
      walk(child, acc, skipTitle)
    }
    return
  }

  if (isRecord(node)) {
    if (node.type === 'heading' && Number(node.depth) === 2) {
      const props = isRecord(node.props) ? node.props : {}
      pushHeading(acc, props.id ?? node.id, flattenText(node), skipTitle)
      return
    }

    if (node.value !== undefined) {
      walk(node.value, acc, skipTitle)
    }
    if (Array.isArray(node.children)) {
      walk(node.children, acc, skipTitle)
    }
  }
}

export function extractLessonHeadings(body: unknown, skipTitle?: string): LessonHeading[] {
  const headings: LessonHeading[] = []
  walk(body, headings, skipTitle)
  return headings
}
