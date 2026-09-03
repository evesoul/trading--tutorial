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

const css = await readFile(join(root, 'assets/css/main.css'), 'utf8')
const nuxt = await readFile(join(root, 'nuxt.config.ts'), 'utf8')
const chart = await readFile(join(root, 'components/ui/mountTeachingChart.ts'), 'utf8')
const stages = await readFile(join(root, 'components/ui/StageMap.vue'), 'utf8')
const steps = await readFile(join(root, 'components/ui/PathSteps.vue'), 'utf8')

if (css.includes('#f3eee4') || css.includes('#1a4d56')) {
  fail('奶油纸或青绿 brand 还在全局 token 里')
}
else {
  ok('全局已离开奶油纸 / 青绿 brand')
}

if (!css.includes('--mark:') || !css.includes('Inter')) {
  fail('缺少淡黄标记或 Inter 字栈')
}
else {
  ok('有淡黄 hover 与 Inter 字栈')
}

if (!css.includes('.path-steps__kicker') || !css.includes('.lesson-card') || !css.includes('.lesson-toc')) {
  fail('历史阅读壳 class 被改掉')
}
else {
  ok('历史阅读壳 class 仍在')
}

if (!css.includes('border-left: 3px solid var(--risk-line)')) {
  fail('风险提示没有左边线')
}
else {
  ok('风险提示改成左边线')
}

if (!css.includes('.teaching-chart__canvas') || !css.includes('border: 1px solid var(--line)')) {
  fail('教学图画布细框丢了')
}
else {
  ok('教学图画布仍有细框')
}

if (css.includes('border-radius: 999px')) {
  fail('导航或按钮还在用胶囊圆角')
}
else {
  ok('去掉胶囊圆角')
}

if (!nuxt.includes('family=Inter')) {
  fail('nuxt.config 未加载 Inter')
}
else {
  ok('Inter 已挂到 head')
}

if (chart.includes('#fffdf8')) {
  fail('教学图画布还是奶油底')
}
else {
  ok('教学图画布改白底')
}

if (!stages.includes('data-n') || !steps.includes('path-steps__item')) {
  fail('阶段水印或 PathSteps 结构丢了')
}
else {
  ok('阶段水印数字与 PathSteps 结构仍在')
}

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}

console.log('\nTASK-049 quiet UI checks passed')
