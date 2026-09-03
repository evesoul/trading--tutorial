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

const lessons = [
  ['content/03-trading-system/market-regime/index.md', 'vis-124', 'vis-017-market-regime.svg'],
  ['content/03-trading-system/direction/index.md', 'vis-125', 'vis-008-trading-system-flow.svg'],
  ['content/03-trading-system/multi-timeframe/index.md', 'vis-126', 'vis-025-multi-timeframe.svg'],
  ['content/03-trading-system/entry-rules/index.md', 'vis-127', 'vis-008-trading-system-flow.svg'],
  ['content/03-trading-system/stop-loss/index.md', 'vis-128', 'vis-018-stop-loss.svg'],
]

for (const [file, id, schematic] of lessons) {
  const md = await readFile(join(root, file), 'utf8')
  if (!md.includes(`::real-chart{id="${id}"}`) || !md.split(`::real-chart{id="${id}"}`)[1]?.includes('\n::')) {
    fail(`${file} 未挂或未闭合 ${id}`)
  }
  else {
    ok(`${file} 已挂 ${id}`)
  }
  if (!md.includes(schematic)) {
    fail(`${file} 未保留示意图 ${schematic}`)
  }
  assertNoBanned(md, file)
}

const vis101 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const vis110 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-110.json'), 'utf8'))
const charts = {}
for (const id of ['vis-124', 'vis-125', 'vis-126', 'vis-127', 'vis-128']) {
  charts[id] = JSON.parse(await readFile(join(root, 'public/data/charts', `${id}.json`), 'utf8'))
  const chart = charts[id]
  if (chart.candles.length !== vis101.candles.length || chart.candles[0].time !== vis101.candles[0].time) {
    fail(`${id} 未复用 vis-101`)
  }
  if (chart.symbol !== 'BTCUSDT' || chart.timeframe !== '4h' || !chart.source || !chart.period?.start) {
    fail(`${id} 缺四字段`)
  }
  if (JSON.stringify(chart).includes('"scorecard": "filled"')) {
    fail(`${id} 填了成绩`)
  }
  assertNoBanned(JSON.stringify(chart), `${id} JSON`)
}

if ((charts['vis-124'].markers?.length || 0) < 3) {
  fail('vis-124 环境标签不足')
}
if (!charts['vis-125'].markers?.some(marker => marker.label.includes('不交易'))) {
  fail('vis-125 未标不交易')
}
if (!charts['vis-126'].overlays?.emaHigher || charts['vis-126'].parameters?.higherEmaAlign !== 'last-closed-daily') {
  fail('vis-126 日线 EMA 未按已收盘对齐')
}
if (charts['vis-127'].parameters?.fillStatus !== 'none') {
  fail('vis-127 写成了成交')
}
if (charts['vis-128'].atr?.[20] !== vis110.atr[20] || charts['vis-128'].parameters?.liquidation !== 'not-drawn') {
  fail('vis-128 未复用 ATR 或画了强平')
}
ok('五张 JSON 教学叠加齐全')

for (const file of [
  'public/images/system/vis-124-regime-real.svg',
  'public/images/system/vis-125-direction-real.svg',
  'public/images/system/vis-126-mtf-real.svg',
  'public/images/system/vis-127-entry-real.svg',
  'public/images/system/vis-128-stop-real.svg',
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

const types = await readFile(join(root, 'types/chart.ts'), 'utf8')
if (!types.includes("'vis-128'") || !types.includes('emaHigher') || !types.includes('vis-128-stop-real.svg')) {
  fail('types 未登记 vis-124–128 或 emaHigher')
}
const mount = await readFile(join(root, 'components/ui/mountTeachingChart.ts'), 'utf8')
if (!mount.includes('emaHigher') || !mount.includes('日线 EMA20')) {
  fail('TeachingChart 未画日线 EMA')
}
ok('类型与组件已登记')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-044 system-chart checks passed')
