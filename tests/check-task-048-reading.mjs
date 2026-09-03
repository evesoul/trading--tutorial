import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { extractLessonHeadings } from '../components/ui/lessonHeadings.ts'

const root = join(import.meta.dirname, '..')
let failed = 0

function fail(message) {
  failed += 1
  console.error(`FAIL ${message}`)
}

function ok(message) {
  console.log(`ok  ${message}`)
}

const minimark = {
  type: 'minimark',
  value: [
    ['h1', {}, 'K 线'],
    ['h2', { id: '学习目标' }, '学习目标'],
    ['p', {}, '读完本篇'],
    ['h2', { id: '概念' }, '概念'],
    ['h2', { id: '原理' }, '原理'],
  ],
}

const fromMinimark = extractLessonHeadings(minimark, 'K 线')
if (fromMinimark.map(item => item.text).join(',') !== '学习目标,概念,原理') {
  fail(`minimark 标题解析不对：${JSON.stringify(fromMinimark)}`)
}
else {
  ok('minimark 抽出 h2，并跳过篇名')
}

const mdast = {
  type: 'root',
  children: [
    { type: 'heading', depth: 1, children: [{ type: 'text', value: 'K 线' }] },
    { type: 'heading', depth: 2, props: { id: '总结' }, children: [{ type: 'text', value: '总结' }] },
    { type: 'heading', depth: 2, props: { id: '下一步' }, children: [{ type: 'text', value: '下一步' }] },
    { type: 'heading', depth: 3, children: [{ type: 'text', value: '正例' }] },
  ],
}

const fromMdast = extractLessonHeadings(mdast, 'K 线')
if (fromMdast.map(item => item.id).join(',') !== '总结,下一步') {
  fail(`mdast 标题解析不对：${JSON.stringify(fromMdast)}`)
}
else {
  ok('mdast 只取 h2')
}

const detail = await readFile(join(root, 'components/LessonDetailPage.vue'), 'utf8')
const course = await readFile(join(root, 'pages/course/index.vue'), 'utf8')
const css = await readFile(join(root, 'assets/css/main.css'), 'utf8')

if (!detail.includes('UiLessonToc') || !detail.includes('read-progress')) {
  fail('课文页未接本篇目录或阅读进度')
}
else {
  ok('课文页接本篇目录与阅读进度')
}

if (!course.includes('UiCourseJump')) {
  fail('怎么学未接本页跳转')
}
else {
  ok('怎么学接本页跳转')
}

if (!css.includes('.lesson-toc') || !css.includes('.course-jump') || !css.includes('.read-progress')) {
  fail('目录 / 跳转 / 进度样式缺失')
}
else {
  ok('目录、跳转、进度有样式')
}

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}

console.log('\nTASK-048 reading checks passed')
