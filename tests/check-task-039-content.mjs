/**
 * TASK-039 静态终审：front matter、课序、九篇新课结构、违禁词、过期句、死链。
 * 不需要预览服务。
 * 用法：node tests/check-task-039-content.mjs
 */
import { readFile, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
let failed = 0

function fail(message) {
  failed += 1
  console.error(`FAIL ${message}`)
}

function ok(message) {
  console.log(`ok  ${message}`)
}

const STAGE0 = [
  { order: 0, slug: 'introduction', next: 'perp-screen' },
  { order: 1, slug: 'perp-screen', next: 'kline' },
]

const STAGE1 = [
  { order: 1, slug: 'kline', next: 'trendlines' },
  { order: 2, slug: 'trendlines', next: 'market-structure' },
  { order: 3, slug: 'market-structure', next: 'ma' },
  { order: 4, slug: 'ma', next: 'ema' },
  { order: 5, slug: 'ema', next: 'rsi' },
  { order: 6, slug: 'rsi', next: 'volume' },
  { order: 7, slug: 'volume', next: 'atr' },
  { order: 8, slug: 'atr', next: 'bollinger-bands' },
  { order: 9, slug: 'bollinger-bands', next: 'macd' },
  { order: 10, slug: 'macd', next: 'kdj' },
  { order: 11, slug: 'kdj', next: 'open-interest' },
  { order: 12, slug: 'open-interest', next: 'funding-rate' },
  { order: 13, slug: 'funding-rate', next: 'long-short-ratio' },
  { order: 14, slug: 'long-short-ratio', next: 'cvd' },
  { order: 15, slug: 'cvd', next: 'liquidation-cascade' },
  { order: 16, slug: 'liquidation-cascade', next: 'trend-momentum' },
]

const STAGE2 = [
  { order: 1, slug: 'trend-momentum', next: 'trend-volume' },
  { order: 2, slug: 'trend-volume', next: 'rsi-macd' },
  { order: 3, slug: 'rsi-macd', next: 'price-oi' },
  { order: 4, slug: 'price-oi', next: 'oi-volume' },
  { order: 5, slug: 'oi-volume', next: 'funding-oi' },
  { order: 6, slug: 'funding-oi', next: 'multi-indicator' },
  { order: 7, slug: 'multi-indicator', next: 'what-is-a-trading-system' },
]

const STAGE3 = [
  { order: 1, slug: 'what-is-a-trading-system', next: 'market-regime' },
  { order: 2, slug: 'market-regime', next: 'multi-timeframe' },
  { order: 3, slug: 'multi-timeframe', next: 'direction' },
  { order: 4, slug: 'direction', next: 'order-types' },
  { order: 5, slug: 'order-types', next: 'entry-rules' },
  { order: 6, slug: 'entry-rules', next: 'exit-rules' },
  { order: 7, slug: 'exit-rules', next: 'stop-loss' },
  { order: 8, slug: 'stop-loss', next: 'take-profit' },
  { order: 9, slug: 'take-profit', next: 'position-sizing' },
  { order: 10, slug: 'position-sizing', next: 'cost-vs-r' },
  { order: 11, slug: 'cost-vs-r', next: 'risk-management' },
  { order: 12, slug: 'risk-management', next: 'account-heat' },
  { order: 13, slug: 'account-heat', next: 'trade-frequency' },
  { order: 14, slug: 'trade-frequency', next: 'execution-bias' },
  { order: 15, slug: 'execution-bias', next: 'trading-journal' },
  { order: 16, slug: 'trading-journal', next: 'backtesting' },
  { order: 17, slug: 'backtesting', next: 'statistics' },
  { order: 18, slug: 'statistics', next: 'system-optimization' },
  { order: 19, slug: 'system-optimization', next: 'case-study' },
  { order: 20, slug: 'case-study', next: null },
]

const NEW_LESSONS = [
  'perp-screen',
  'market-structure',
  'atr',
  'liquidation-cascade',
  'multi-timeframe',
  'order-types',
  'cost-vs-r',
  'account-heat',
  'execution-bias',
]

const MAIN_PATH = [
  'kline',
  'trendlines',
  'market-structure',
  'ma',
  'ema',
  'rsi',
  'volume',
  'atr',
  'bollinger-bands',
]

const FORBIDDEN = ['一定', '必然', '100%准确', '稳赚', '必赚', '无风险', '保证盈利']
const STALE = ['仍待后续', '回测专篇尚未写', '量能课还没写', '后半仍在编写', '十五篇都可学']

const ROUTE = {
  introduction: slug => (slug === 'introduction' ? '/course' : `/course/${slug}`),
  indicators: slug => `/indicators/${slug}`,
  combinations: slug => `/combinations/${slug}`,
  'trading-system': slug => `/trading-system/${slug}`,
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    return { fm: {}, body: raw }
  }
  const fm = {}
  let currentList = null
  let currentKey = null
  for (const line of match[1].split('\n')) {
    if (line === 'learning:') {
      fm.learning = {}
      currentKey = 'learning'
      currentList = null
      continue
    }
    if (currentKey === 'learning' && /^\s{2}(prerequisites|next):/.test(line)) {
      const field = line.trim().startsWith('prerequisites') ? 'prerequisites' : 'next'
      const inline = line.split(':').slice(1).join(':').trim()
      if (inline === '[]') {
        fm.learning[field] = []
        currentList = null
      }
      else if (inline) {
        fm.learning[field] = [inline]
        currentList = null
      }
      else {
        fm.learning[field] = []
        currentList = field
      }
      continue
    }
    if (currentList && /^\s+-\s+/.test(line)) {
      fm.learning[currentList].push(line.replace(/^\s+-\s+/, '').trim())
      continue
    }
    currentList = null
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (kv && currentKey !== 'learning') {
      const value = kv[2].trim()
      fm[kv[1]] = /^\d+$/.test(value) ? Number(value) : value
    }
  }
  return { fm, body: raw.slice(match[0].length) }
}

async function collectLessonFiles(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await collectLessonFiles(full, acc)
    }
    else if (entry.name === 'index.md') {
      acc.push(full)
    }
  }
  return acc
}

const lessonFiles = [
  ...await collectLessonFiles(join(root, 'content/00-introduction')),
  ...await collectLessonFiles(join(root, 'content/01-indicators')),
  ...await collectLessonFiles(join(root, 'content/02-combinations')),
  ...await collectLessonFiles(join(root, 'content/03-trading-system')),
]

const lessons = []
for (const file of lessonFiles) {
  const raw = await readFile(file, 'utf8')
  const { fm, body } = parseFrontMatter(raw)
  lessons.push({ file, fm, body, raw })
}

const bySlug = new Map(lessons.map(item => [item.fm.slug, item]))

const expected = [
  ...STAGE0.map(item => ({ ...item, part: 0 })),
  ...STAGE1.map(item => ({ ...item, part: 1 })),
  ...STAGE2.map(item => ({ ...item, part: 2 })),
  ...STAGE3.map(item => ({ ...item, part: 3 })),
]

for (const row of expected) {
  const lesson = bySlug.get(row.slug)
  if (!lesson) {
    fail(`缺课文 ${row.slug}`)
    continue
  }
  if (lesson.fm.status !== 'published') {
    fail(`${row.slug} status=${lesson.fm.status}，应为 published`)
  }
  if (lesson.fm.order !== row.order) {
    fail(`${row.slug} order=${lesson.fm.order}，应为 ${row.order}`)
  }
  if (lesson.fm.part !== row.part) {
    fail(`${row.slug} part=${lesson.fm.part}，应为 ${row.part}`)
  }
  const next = lesson.fm.learning?.next ?? []
  if (row.next === null) {
    if (next.length) {
      fail(`${row.slug} next 应为空，实际 ${next.join(',')}`)
    }
  }
  else if (!next.includes(row.next)) {
    fail(`${row.slug} next 缺 ${row.next}，实际 ${next.join(',') || '空'}`)
  }
}

ok(`front matter 对齐 learning-path：${expected.length} 篇`)

const ordersByPart = new Map()
for (const lesson of lessons) {
  const key = String(lesson.fm.part)
  const list = ordersByPart.get(key) ?? []
  list.push(lesson.fm.order)
  ordersByPart.set(key, list)
}
for (const [part, orders] of ordersByPart) {
  const dup = orders.filter((value, index) => orders.indexOf(value) !== index)
  if (dup.length) {
    fail(`part ${part} order 撞号：${[...new Set(dup)].join(', ')}`)
  }
  else {
    ok(`part ${part} order 无撞号`)
  }
}

for (const slug of NEW_LESSONS) {
  const lesson = bySlug.get(slug)
  if (!lesson) {
    fail(`新课缺失 ${slug}`)
    continue
  }
  const need = ['## 学习目标', '## 正反案例', '### 正例', '### 反例', '## 局限性']
  const missing = need.filter(heading => !lesson.body.includes(heading))
  if (missing.length) {
    fail(`${slug} 缺结构：${missing.join('、')}`)
  }
  else {
    ok(`${slug} published，有正反案例与局限性`)
  }
}

if (bySlug.has('kdj-rsi') || bySlug.has('rsi-kdj')) {
  fail('出现 KDJ+RSI 新课 slug')
}
else {
  ok('无 KDJ+RSI 新课')
}

if (MAIN_PATH.includes('kdj')) {
  fail('主路径常量含 kdj')
}
else {
  ok('主路径九篇不含 KDJ')
}

const meta = await readFile(join(root, 'components/ui/courseMeta.ts'), 'utf8')
for (const slug of MAIN_PATH) {
  if (!meta.includes(`'${slug}'`)) {
    fail(`courseMeta MAIN_PATH 缺 ${slug}`)
  }
}
if (meta.match(/export const MAIN_PATH_SLUGS = \[[^\]]*'kdj'/s)) {
  fail('courseMeta MAIN_PATH 仍含 kdj')
}
else {
  ok('courseMeta MAIN_PATH 含结构 / ATR，不含 KDJ')
}
if (!meta.includes("'perp-screen'")) {
  fail('courseMeta STAGE0 缺 perp-screen')
}
for (const slug of ['multi-timeframe', 'order-types', 'cost-vs-r', 'account-heat', 'execution-bias']) {
  if (!meta.includes(`'${slug}'`)) {
    fail(`courseMeta SYSTEM 缺 ${slug}`)
  }
}
ok('courseMeta 含 STAGE0 / SYSTEM 新 slug')

const intro = bySlug.get('introduction')
if (intro) {
  for (const phrase of ['仍待后续', '未写的多周期', '十五篇']) {
    if (intro.body.includes(phrase)) {
      fail(`导学仍有过期句「${phrase}」`)
    }
  }
  for (const slug of ['multi-timeframe', 'account-heat', 'execution-bias', 'perp-screen']) {
    if (!intro.body.includes(slug)) {
      fail(`导学地图缺 slug ${slug}`)
    }
  }
  ok('导学地图已含屏幕课与阶段 3 二十篇')
}

for (const lesson of lessons) {
  for (const phrase of STALE) {
    if (lesson.body.includes(phrase)) {
      fail(`${lesson.fm.slug} 过期句「${phrase}」`)
    }
  }
  for (const word of FORBIDDEN) {
    if (lesson.body.includes(word)) {
      const lines = lesson.body.split('\n').filter(line => line.includes(word))
      const teachingOnly = lines.every(line =>
        line.includes('禁止') || line.includes('禁用') || line.includes('不要写'),
      )
      if (!teachingOnly) {
        fail(`${lesson.fm.slug} 违禁词「${word}」：${lines[0]}`)
      }
    }
  }
}
ok('课文无过期「编写中」句，无违禁词')

const knownFiles = new Set()
async function walkPublic(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const rel = `${prefix}/${entry.name}`
    if (entry.isDirectory()) {
      await walkPublic(join(dir, entry.name), rel)
    }
    else {
      knownFiles.add(rel)
    }
  }
}
await walkPublic(join(root, 'public'))

const slugToPath = new Map()
for (const lesson of lessons) {
  const toPath = ROUTE[lesson.fm.category]
  if (toPath) {
    slugToPath.set(lesson.fm.slug, toPath(lesson.fm.slug))
  }
}

const glossary = await collectLessonFiles(join(root, 'content/glossary'))
const extraPages = new Set([
  '/',
  '/course',
  '/indicators',
  '/combinations',
  '/trading-system',
  '/glossary',
  ...glossary.map(() => '/glossary'),
])

for (const lesson of lessons) {
  const links = [...lesson.body.matchAll(/\]\((\/[^)\s]+)\)/g)].map(match => match[1])
  for (const href of links) {
    const [path] = href.split(/[?#]/)
    if (path.startsWith('/images/')) {
      if (!knownFiles.has(path)) {
        fail(`${lesson.fm.slug} 死图 ${path}`)
      }
      continue
    }
    if (path.startsWith('/glossary')) {
      continue
    }
    const published = [...slugToPath.values()].includes(path) || extraPages.has(path)
    if (!published) {
      fail(`${lesson.fm.slug} 死链 ${path}`)
    }
  }
}
ok('课文站内链与示意图路径可解析')

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}
console.log('\nTASK-039 content checks passed')
