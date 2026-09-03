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
  ['content/02-combinations/trend-volume/index.md', 'vis-119', 'vis-014-trend-volume.svg'],
  ['content/02-combinations/price-oi/index.md', 'vis-120', 'vis-006-open-interest.svg'],
  ['content/02-combinations/oi-volume/index.md', 'vis-121', 'vis-015-oi-volume.svg'],
  ['content/02-combinations/funding-oi/index.md', 'vis-122', 'vis-007-funding-rate.svg'],
  ['content/02-combinations/rsi-macd/index.md', 'vis-123', 'vis-004-rsi-zones.svg'],
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
  if (file.includes('rsi-macd') && md.includes('KDJ+RSI')) {
    fail('RSI+MACD 课新开了 KDJ+RSI')
  }
  assertNoBanned(md, file)
}

const vis101 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const vis117 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-117.json'), 'utf8'))
const charts = {}
for (const id of ['vis-119', 'vis-120', 'vis-121', 'vis-122', 'vis-123']) {
  charts[id] = JSON.parse(await readFile(join(root, 'public/data/charts', `${id}.json`), 'utf8'))
  const chart = charts[id]
  if (chart.candles.length !== vis101.candles.length || chart.candles[0].time !== vis101.candles[0].time) {
    fail(`${id} 未复用 vis-101`)
  }
  if (chart.symbol !== 'BTCUSDT' || chart.timeframe !== '4h' || !chart.source || !chart.period?.start) {
    fail(`${id} 缺四字段`)
  }
  assertNoBanned(JSON.stringify(chart), `${id} JSON`)
}

if (!charts['vis-119'].overlays?.ema20 || !charts['vis-119'].panels?.includes('volume')) {
  fail('vis-119 缺 EMA 或成交额')
}
if (charts['vis-120'].oi?.[0] !== vis117.oi[0] || !charts['vis-120'].panels?.includes('oi')) {
  fail('vis-120 未复用 vis-117 OI')
}
if (!charts['vis-121'].panels?.includes('volume') || !charts['vis-121'].panels?.includes('oi') || (charts['vis-121'].markers?.length || 0) < 3) {
  fail('vis-121 未标三种过程')
}
if (!charts['vis-122'].funding || !charts['vis-122'].oi || charts['vis-122'].parameters?.fundingAlign !== 'last-settlement-carried-forward') {
  fail('vis-122 缺费率沿用声明')
}
if (!charts['vis-123'].rsi || !charts['vis-123'].macd?.hist || charts['vis-123'].panels?.includes('kdj')) {
  fail('vis-123 缺 RSI/MACD 或叠了 KDJ')
}
ok('五张 JSON 教学叠加齐全')

for (const file of [
  'public/images/combination/vis-119-trend-volume-real.svg',
  'public/images/combination/vis-120-price-oi-real.svg',
  'public/images/combination/vis-121-oi-volume-real.svg',
  'public/images/combination/vis-122-funding-oi-real.svg',
  'public/images/combination/vis-123-rsi-macd-real.svg',
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
if (!types.includes("'vis-123'") || !types.includes('vis-123-rsi-macd-real.svg')) {
  fail('types 未登记 vis-119–123')
}
ok('类型已登记 vis-119–123')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-043 combination-chart checks passed')
