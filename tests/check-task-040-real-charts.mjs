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

function assertNoBanned(blob, label) {
  for (const word of banned) {
    if (blob.includes(word)) {
      fail(`${label} 含违禁词 ${word}`)
    }
  }
}

const structure = await readFile(join(root, 'content/01-indicators/market-structure/index.md'), 'utf8')
if (!structure.includes('::real-chart{id="vis-109"}') || !structure.split('::real-chart{id="vis-109"}')[1]?.includes('\n::')) {
  fail('结构课未挂或未闭合 vis-109')
}
if (!structure.includes('/images/concept/vis-022-market-structure.svg')) {
  fail('结构课未挂 vis-022 示意图')
}
if (!structure.includes('- vis-109')) {
  fail('结构课 Front Matter 未列入 vis-109')
}
assertNoBanned(structure, '结构课')
ok('结构课已挂 vis-022 / vis-109')

const atrLesson = await readFile(join(root, 'content/01-indicators/atr/index.md'), 'utf8')
if (!atrLesson.includes('::real-chart{id="vis-110"}') || !atrLesson.split('::real-chart{id="vis-110"}')[1]?.includes('\n::')) {
  fail('ATR 课未挂或未闭合 vis-110')
}
if (!atrLesson.includes('/images/concept/vis-023-atr.svg')) {
  fail('ATR 课未挂 vis-023 示意图')
}
if (!atrLesson.includes('- vis-110')) {
  fail('ATR 课 Front Matter 未列入 vis-110')
}
assertNoBanned(atrLesson, 'ATR 课')
ok('ATR 课已挂 vis-023 / vis-110')

const vis101 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const vis109 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-109.json'), 'utf8'))
const vis110 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-110.json'), 'utf8'))

for (const key of ['symbol', 'timeframe', 'source', 'period', 'candles', 'teachingQuestion', 'disclaimer', 'markers']) {
  if (!vis109[key]) {
    fail(`vis-109 缺 ${key}`)
  }
}
if (vis109.symbol !== 'BTCUSDT' || !String(vis109.source).includes('Binance')) {
  fail('vis-109 未写 BTCUSDT / Binance')
}
if (vis109.candles.length !== vis101.candles.length || vis109.candles[0].time !== vis101.candles[0].time) {
  fail('vis-109 未复用 vis-101 冻结窗')
}
if (!Array.isArray(vis109.markers) || vis109.markers.length < 4) {
  fail('vis-109 摆动点不足')
}
const labels = vis109.markers.map(marker => marker.label).join(' ')
if (!labels.includes('HH') || !labels.includes('HL') || !labels.includes('扫过')) {
  fail('vis-109 未同时标 HH / HL / 扫过')
}
assertNoBanned(JSON.stringify(vis109), 'vis-109 JSON')
ok(`vis-109 JSON ${vis109.candles.length} bars`)

for (const key of ['symbol', 'timeframe', 'source', 'period', 'candles', 'atr', 'parameters']) {
  if (!vis110[key]) {
    fail(`vis-110 缺 ${key}`)
  }
}
if (vis110.candles.length !== vis101.candles.length) {
  fail('vis-110 未复用 vis-101 冻结窗')
}
if (!vis110.panels?.includes('atr') || vis110.parameters?.atrMethod !== 'Wilder') {
  fail('vis-110 未声明 Wilder ATR 副图')
}
const atrValues = vis110.atr.filter(value => value != null)
if (Math.max(...atrValues) / Math.min(...atrValues) < 1.3) {
  fail('vis-110 ATR 宽窄对照不够')
}
let outlier = 0
vis110.candles.forEach((bar, i) => {
  const value = vis110.atr[i]
  if (value == null) {
    return
  }
  const prev = i === 0 ? bar.close : vis110.candles[i - 1].close
  const tr = Math.max(bar.high - bar.low, Math.abs(bar.high - prev), Math.abs(bar.low - prev))
  if (tr / value >= 2) {
    outlier += 1
  }
})
if (!outlier) {
  fail('vis-110 没有 TR 明显大于 ATR 的一根')
}
assertNoBanned(JSON.stringify(vis110), 'vis-110 JSON')
ok(`vis-110 JSON ATR ${atrValues.length} · 超出 ${outlier}`)

for (const [id, file] of [
  ['vis-109', 'vis-109-market-structure-real.svg'],
  ['vis-110', 'vis-110-atr-real.svg'],
]) {
  const path = join(root, 'public/images/indicator', file)
  if (!(await exists(path))) {
    fail(`缺少 ${id} 快照`)
    continue
  }
  const svg = await readFile(path, 'utf8')
  if (!svg.includes('真实行情')) {
    fail(`${id} SVG 无真实行情徽章`)
  }
  if (svg.includes('示意图 · 教学抽象')) {
    fail(`${id} SVG 被标成示意图`)
  }
  if (!svg.includes('BTCUSDT') || !svg.includes('4h')) {
    fail(`${id} SVG 缺四字段`)
  }
  ok(`${id} SVG 快照`)
}

const types = await readFile(join(root, 'types/chart.ts'), 'utf8')
if (!types.includes("'vis-109'") || !types.includes("'vis-110'")) {
  fail('types/chart.ts 未登记 vis-109 / vis-110')
}
const mount = await readFile(join(root, 'components/ui/mountTeachingChart.ts'), 'utf8')
if (!mount.includes('createSeriesMarkers') || !mount.includes('ATR14')) {
  fail('TeachingChart 未画摆动点或 ATR')
}
for (const word of ['下单', '买入', '卖出', '开多', '开空']) {
  if (mount.includes(word)) {
    fail(`TeachingChart 出现交易终端用语：${word}`)
  }
}
ok('组件已接 vis-109 / vis-110 且无交易终端用语')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-040 real-chart checks passed')
