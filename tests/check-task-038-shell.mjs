import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
let failed = 0

function fail(message) {
  failed += 1
  console.error(`FAIL ${message}`)
}

function ok(message) {
  console.log(`ok  ${message}`)
}

const meta = await readFile(join(root, 'components/ui/courseMeta.ts'), 'utf8')
const course = await readFile(join(root, 'composables/useCourse.ts'), 'utf8')
const hub = await readFile(join(root, 'pages/course/index.vue'), 'utf8')
const detail = await readFile(join(root, 'pages/course/[...slug].vue'), 'utf8')
const architecture = await readFile(join(root, 'docs/architecture/project.md'), 'utf8')

if (!course.includes("slug === 'introduction' || slug === '' ? '/course' : `/course/${slug}`")) {
  fail('getLessonPath 未按 introduction slug 分流')
}
else {
  ok('getLessonPath：introduction → /course，其余 → /course/{slug}')
}

if (!hub.includes("item.slug === 'introduction'")) {
  fail('course 枢纽仍按 category === introduction 取值')
}
else {
  ok('course 枢纽按 slug === introduction 取值')
}

for (const slug of ['market-structure', 'atr']) {
  if (!meta.includes(`'${slug}'`)) {
    fail(`MAIN_PATH 未纳入 ${slug}`)
  }
}
if (meta.match(/export const MAIN_PATH_SLUGS = \[[^\]]*'kdj'/s)) {
  fail('MAIN_PATH 仍含 kdj')
}
else {
  ok('MAIN_PATH 含结构 / ATR，不含 KDJ')
}

if (!meta.includes("'liquidation-cascade'")) {
  fail('CONTRACT_PATH 未纳入 liquidation-cascade')
}
else {
  ok('CONTRACT_PATH 含清算瀑布')
}

for (const slug of ['multi-timeframe', 'order-types', 'cost-vs-r', 'account-heat', 'execution-bias']) {
  if (!meta.includes(`'${slug}'`)) {
    fail(`SYSTEM_PATH 未纳入 ${slug}`)
  }
}
if (!hub.includes('二十步')) {
  fail('course 未改成二十步')
}
else {
  ok('SYSTEM_PATH 与 course 文案为二十步')
}

if (!meta.includes("to: '/course', label: '怎么学', match: 'prefix'")) {
  fail('怎么学导航仍是 exact，/course/perp-screen 不会高亮')
}
else {
  ok('怎么学导航 match=prefix')
}

if (!detail.includes('category="introduction"') || !detail.includes("navigateTo('/course'")) {
  fail('course/[...slug] 未接 LessonDetailPage 或未知 slug 未回 /course')
}
else {
  ok('course/[...slug] 渲染导学并回 /course')
}

if (!architecture.includes('/course/[...slug]')) {
  fail('architecture/project.md 未补 /course/[...slug]')
}
else {
  ok('architecture 已列 /course/[...slug]')
}

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-038 shell checks passed')
