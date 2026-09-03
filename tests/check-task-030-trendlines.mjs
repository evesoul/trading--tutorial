import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const banned = ['稳赚', '必赚', '无风险', '保证盈利', '一定', '必然', '100%准确']
let failed = 0

function fail(message) {
  failed += 1
  console.error(`FAIL ${message}`)
}

function ok(message) {
  console.log(`ok  ${message}`)
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

const lesson = await readFile(join(root, 'content/01-indicators/trendlines/index.md'), 'utf8')
if (!lesson.includes('::real-chart{id="vis-108"}') || !lesson.split('::real-chart{id="vis-108"}')[1]?.includes('\n::')) {
  fail('课文未挂或未闭合 vis-108')
}
if (!lesson.includes('/images/concept/vis-021-trendlines.svg')) {
  fail('课文未挂 vis-021 示意图')
}
if (!lesson.includes('- vis-021') || !lesson.includes('- vis-108')) {
  fail('Front Matter 未列入 vis-021 / vis-108')
}
for (const word of banned) {
  if (lesson.includes(word)) {
    fail(`课文含违禁词 ${word}`)
  }
}
ok('课文已挂 vis-021 / vis-108')

const schematic = await readFile(join(root, 'public/images/concept/vis-021-trendlines.svg'), 'utf8')
if (!schematic.includes('示意图')) {
  fail('vis-021 无示意图徽章')
}
else {
  ok('vis-021 示意图')
}

const chart = JSON.parse(await readFile(join(root, 'public/data/charts/vis-108.json'), 'utf8'))
for (const key of ['symbol', 'timeframe', 'source', 'period', 'candles', 'teachingQuestion', 'disclaimer', 'guides', 'drawTools']) {
  if (!chart[key]) {
    fail(`vis-108 缺 ${key}`)
  }
}
if (chart.symbol !== 'BTCUSDT' || !String(chart.source).includes('Binance')) {
  fail('vis-108 未写 BTCUSDT / Binance')
}
if (!chart.drawTools || !Array.isArray(chart.guides) || chart.guides.length < 2) {
  fail('vis-108 未开启划线练习或缺少教学线')
}
const blob = JSON.stringify(chart)
for (const word of banned) {
  if (blob.includes(word)) {
    fail(`vis-108 JSON 含违禁词 ${word}`)
  }
}
ok(`vis-108 JSON ${chart.candles.length} bars`)

const snapshot = join(root, 'public/images/indicator/vis-108-trendlines-real.svg')
if (!(await exists(snapshot))) {
  fail('缺少 vis-108 快照')
}
else {
  const svg = await readFile(snapshot, 'utf8')
  if (!svg.includes('真实行情')) {
    fail('vis-108 SVG 无真实行情徽章')
  }
  if (svg.includes('示意图 · 教学抽象')) {
    fail('vis-108 SVG 被标成示意图')
  }
  ok('vis-108 SVG 快照')
}

const kline = await readFile(join(root, 'content/01-indicators/kline/index.md'), 'utf8')
if (!kline.includes('/indicators/trendlines')) {
  fail('K 线下一步未指向趋势线课')
}
const intro = await readFile(join(root, 'content/00-introduction/index.md'), 'utf8')
if (!intro.includes('/indicators/trendlines')) {
  fail('导学主路径未插入趋势线课')
}
const meta = await readFile(join(root, 'components/ui/courseMeta.ts'), 'utf8')
if (!meta.includes("'trendlines'")) {
  fail('courseMeta 未纳入 trendlines')
}
ok('课程路径已接线')

const component = [
  await readFile(join(root, 'components/ui/TeachingChart.vue'), 'utf8'),
  await readFile(join(root, 'components/ui/mountTeachingChart.ts'), 'utf8'),
].join('\n')
for (const word of ['下单', '买入', '卖出', '开多', '开空']) {
  if (component.includes(word)) {
    fail(`TeachingChart 出现交易终端用语：${word}`)
  }
}
if (!component.includes('练习：水平位') || !component.includes('练习：趋势线')) {
  fail('TeachingChart 未提供划线练习按钮')
}
ok('TeachingChart 可练习划线且无交易终端用语')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-030 trendline checks passed')
