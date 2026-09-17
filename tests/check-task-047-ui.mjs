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

const home = await readFile(join(root, 'pages/index.vue'), 'utf8')
const detail = await readFile(join(root, 'components/LessonDetailPage.vue'), 'utf8')
const rail = await readFile(join(root, 'components/ui/LessonRail.vue'), 'utf8')
const crumb = await readFile(join(root, 'components/ui/LessonCrumb.vue'), 'utf8')
const css = await readFile(join(root, 'assets/css/main.css'), 'utf8')
const meta = await readFile(join(root, 'components/ui/courseMeta.ts'), 'utf8')
const course = await readFile(join(root, 'pages/course/index.vue'), 'utf8')
const steps = await readFile(join(root, 'components/ui/PathSteps.vue'), 'utf8')

if (!home.includes('class="btn-row"') || home.indexOf('开始学习') > home.indexOf('四条学习阶段')) {
  fail('首页主 CTA 未提到首屏')
}
else {
  ok('首页主 CTA 在阶段卡之前')
}

if (!home.includes('home-trust')) {
  fail('首页风险与边界未并排')
}
else {
  ok('首页风险与边界并排')
}

if (!detail.includes('UiLessonCrumb') || !detail.includes('UiLessonRail')) {
  fail('课文页未接面包屑或分组侧栏')
}
else {
  ok('课文页接面包屑与分组侧栏')
}

if (!rail.includes('catalogGroups') || !rail.includes('第 {{ position.current }}')) {
  fail('侧栏未按目录分组或未显示进度')
}
else {
  ok('侧栏按目录分组并显示进度')
}

if (!crumb.includes('怎么学') || !crumb.includes('categoryIndexPath')) {
  fail('面包屑未回到怎么学 / 阶段目录')
}
else {
  ok('面包屑回到怎么学与阶段目录')
}

if (!css.includes('.lesson-prose :is(h2, h3, h4) a') || !css.includes('grid-template-columns: minmax(0, 42rem) 16rem')) {
  fail('课文标题链或阅读栏宽未改')
}
else {
  ok('课文标题链继承正文色，阅读栏贴近正文')
}

if (!meta.includes("key: 'combo'") || !meta.includes('categoryIndexPath')) {
  fail('组合目录分组或 categoryIndexPath 缺失')
}
else {
  ok('组合目录有分组，categoryIndexPath 已导出')
}

if (!course.includes('path-band') || !course.includes('compact')) {
  fail('怎么学未分段或二十步未用紧凑列表')
}
else {
  ok('怎么学分段，二十步用紧凑列表')
}

if (!steps.includes('path-steps__kicker') || !steps.includes('path-steps__item')) {
  fail('PathSteps 类名被改掉，会坏历史视觉测试')
}
else {
  ok('PathSteps 保留历史测试类名')
}

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}

console.log('\nTASK-047 UI checks passed')
