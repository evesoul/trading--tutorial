import { readFile, access } from 'node:fs/promises'
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

async function exists(path) {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

const lessons = [
  ['content/01-indicators/ma/index.md', 'vis-111'],
  ['content/01-indicators/bollinger-bands/index.md', 'vis-112'],
  ['content/02-combinations/trend-momentum/index.md', 'vis-113'],
  ['content/02-combinations/multi-indicator/index.md', 'vis-114'],
]

for (const [file, id] of lessons) {
  const md = await readFile(join(root, file), 'utf8')
  if (!md.includes(`::real-chart{id="${id}"}`) || !md.split(`::real-chart{id="${id}"}`)[1]?.includes('\n::')) {
    fail(`${file} 未挂或未闭合 ${id}`)
  }
  else {
    ok(`${file} 已挂 ${id}`)
  }
}

const vis101 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
for (const [id, extra] of [
  ['vis-111', chart => chart.overlays?.sma20],
  ['vis-112', chart => chart.overlays?.bbMid && chart.overlays?.bbUpper],
  ['vis-113', chart => chart.overlays?.ema20 && chart.rsi],
  ['vis-114', chart => chart.panels?.includes('volume') && chart.panels?.includes('rsi') && chart.markers?.length >= 2],
]) {
  const chart = JSON.parse(await readFile(join(root, 'public/data/charts', `${id}.json`), 'utf8'))
  if (chart.candles.length !== vis101.candles.length || chart.candles[0].time !== vis101.candles[0].time) {
    fail(`${id} 未复用 vis-101`)
  }
  if (!extra(chart)) {
    fail(`${id} 缺教学叠加`)
  }
  ok(`${id} JSON`)
}

for (const file of [
  'public/images/indicator/vis-111-ma-real.svg',
  'public/images/indicator/vis-112-bollinger-real.svg',
  'public/images/combination/vis-113-trend-momentum-real.svg',
  'public/images/combination/vis-114-alignment-fail-real.svg',
]) {
  if (!(await exists(join(root, file)))) {
    fail(`缺少 ${file}`)
    continue
  }
  const svg = await readFile(join(root, file), 'utf8')
  if (!svg.includes('真实行情') || svg.includes('示意图 · 教学抽象')) {
    fail(`${file} 徽章不对`)
  }
  else {
    ok(file)
  }
}

const glossary = [
  await readFile(join(root, 'content/glossary/price-chart.md'), 'utf8'),
  await readFile(join(root, 'content/glossary/momentum-data.md'), 'utf8'),
  await readFile(join(root, 'content/glossary/teaching-risk.md'), 'utf8'),
  await readFile(join(root, 'content/glossary/margin-leverage.md'), 'utf8'),
].join('\n')
for (const word of ['摆动结构', '平均真实波幅', '清算瀑布', '热度', '只减仓', '决策周期']) {
  if (!glossary.includes(word)) {
    fail(`术语页缺 ${word}`)
  }
}
if (glossary.includes('系统课正文尚未开放')) {
  fail('术语页仍写系统课未开放')
}
ok('术语页已补新词')

const journey = await readFile(join(root, 'docs/product/user-journey.md'), 'utf8')
if (journey.includes('perp-screen`（未发布时提示编写中')) {
  fail('旅程仍把屏幕课标编写中')
}
ok('旅程已更新')

const types = await readFile(join(root, 'types/chart.ts'), 'utf8')
if (!types.includes("'vis-114'")) {
  fail('types 未登记 vis-114')
}

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-041 gap-fill checks passed')
