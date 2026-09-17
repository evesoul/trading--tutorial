import { readFile, readdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import { getLessonPath } from '../composables/useCourse.ts'
import { WYCKOFF_PATH_SLUGS, categoryPart, catalogGroups } from '../components/ui/courseMeta.ts'

const root = join(import.meta.dirname, '..')
let failed = 0

function fail(message) {
  failed += 1
  console.error(`FAIL ${message}`)
}

function ok(message) {
  console.log(`ok  ${message}`)
}

const SLUGS = [...WYCKOFF_PATH_SLUGS]
const FORBIDDEN = ['一定', '必然', '100%准确', '稳赚', '必赚', '无风险', '保证盈利']

if (getLessonPath('wyckoff', 'wyckoff-on-perps') !== '/wyckoff/wyckoff-on-perps') {
  fail(`路径不对：${getLessonPath('wyckoff', 'wyckoff-on-perps')}`)
}
else {
  ok('wyckoff 路径拼接')
}

if (categoryPart('wyckoff') !== 4) {
  fail('categoryPart(wyckoff) 应为 4')
}
else {
  ok('part 4')
}

const groups = catalogGroups('wyckoff')
const grouped = groups?.flatMap(group => [...group.slugs]) ?? []
if (grouped.join(',') !== SLUGS.join(',')) {
  fail(`目录分组漏课：${grouped.join(',')}`)
}
else {
  ok('十三篇都在目录分组里')
}

async function exists(path) {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

for (const [index, slug] of SLUGS.entries()) {
  const file = join(root, 'content/04-wyckoff', slug, 'index.md')
  if (!(await exists(file))) {
    fail(`缺课文 ${slug}`)
    continue
  }
  const md = await readFile(file, 'utf8')
  if (!md.includes('part: 4') || !md.includes('category: wyckoff') || !md.includes(`slug: ${slug}`)) {
    fail(`${slug} front matter 不对`)
  }
  if (!md.includes(`order: ${index + 1}`)) {
    fail(`${slug} order 应为 ${index + 1}`)
  }
  if (!md.includes('status: published')) {
    fail(`${slug} 未 published`)
  }
  for (const word of FORBIDDEN) {
    if (md.includes(word)) {
      fail(`${slug} 含违禁词 ${word}`)
    }
  }
  const images = [...md.matchAll(/!\[.*?\]\((\/images\/wyckoff\/[^)]+)\)/g)].map(match => match[1])
  for (const src of images) {
    if (!(await exists(join(root, 'public', src)))) {
      fail(`${slug} 缺图 ${src}`)
    }
  }
}

ok(`课文 ${SLUGS.length} 篇 front matter / 违禁词 / 配图`)

const dirs = await readdir(join(root, 'content/04-wyckoff'))
const extra = dirs.filter(name => !SLUGS.includes(name) && name !== '.gitkeep')
if (extra.length) {
  fail(`未登记目录：${extra.join(', ')}`)
}

const pages = [
  'pages/wyckoff/index.vue',
  'pages/wyckoff/[...slug].vue',
]
for (const file of pages) {
  if (!(await exists(join(root, file)))) {
    fail(`缺页面 ${file}`)
  }
}

const nav = await readFile(join(root, 'components/ui/courseMeta.ts'), 'utf8')
if (!nav.includes("label: '威科夫'") || !nav.includes("to: '/wyckoff'")) {
  fail('主导航未加威科夫')
}
else {
  ok('主导航含威科夫')
}

const course = await readFile(join(root, 'pages/course/index.vue'), 'utf8')
if (!course.includes('wyckoff-path-heading') || !course.includes('WYCKOFF_PATH_SLUGS')) {
  fail('怎么学未接威科夫课表')
}
else {
  ok('怎么学含威科夫课表')
}

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}

console.log('\nwyckoff module checks passed')
