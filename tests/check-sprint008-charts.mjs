import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const ids = ['vis-101', 'vis-102', 'vis-103', 'vis-104', 'vis-105', 'vis-106', 'vis-107']
const lessons = [
  ['kline', 'vis-101'],
  ['ema', 'vis-102'],
  ['macd', 'vis-103'],
  ['rsi', 'vis-104'],
  ['volume', 'vis-105'],
  ['open-interest', 'vis-106'],
  ['funding-rate', 'vis-107'],
]
const snapshots = {
  'vis-101': 'vis-101-kline-real.svg',
  'vis-102': 'vis-102-ema-real.svg',
  'vis-103': 'vis-103-macd-real.svg',
  'vis-104': 'vis-104-rsi-real.svg',
  'vis-105': 'vis-105-volume-real.svg',
  'vis-106': 'vis-106-oi-real.svg',
  'vis-107': 'vis-107-funding-real.svg',
}

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

const jsons = []
for (const id of ids) {
  const path = join(root, 'public/data/charts', `${id}.json`)
  if (!(await exists(path))) {
    fail(`缺少 ${path}`)
    continue
  }
  const chart = JSON.parse(await readFile(path, 'utf8'))
  jsons.push(chart)
  for (const key of ['symbol', 'timeframe', 'source', 'period', 'candles', 'teachingQuestion', 'disclaimer']) {
    if (!chart[key]) {
      fail(`${id} 缺 ${key}`)
    }
  }
  if (!chart.period?.start || !chart.period?.end) {
    fail(`${id} period 不完整`)
  }
  if (chart.symbol !== 'BTCUSDT') {
    fail(`${id} symbol 不是 BTCUSDT`)
  }
  if (!String(chart.source).includes('Binance')) {
    fail(`${id} source 未写 Binance`)
  }
  if (!Array.isArray(chart.candles) || chart.candles.length < 80) {
    fail(`${id} 蜡烛数量过少`)
  }
  const banned = ['稳赚', '必赚', '无风险', '保证盈利', '一定', '必然', '100%准确']
  const blob = JSON.stringify(chart)
  for (const word of banned) {
    if (blob.includes(word)) {
      fail(`${id} JSON 含违禁词 ${word}`)
    }
  }
  ok(`${id} JSON ${chart.candles.length} bars ${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)}`)
}

for (const id of ids) {
  const path = join(root, 'public/images/indicator', snapshots[id])
  if (!(await exists(path))) {
    fail(`缺少快照 ${path}`)
    continue
  }
  const svg = await readFile(path, 'utf8')
  if (!svg.includes('真实行情')) {
    fail(`${id} SVG 无真实行情徽章`)
  }
  if (svg.includes('示意图 · 教学抽象')) {
    fail(`${id} SVG 被标成示意图`)
  }
  ok(`${id} SVG 快照`)
}

for (const [slug, id] of lessons) {
  const path = join(root, 'content/01-indicators', slug, 'index.md')
  const md = await readFile(path, 'utf8')
  if (!md.includes(`::real-chart{id="${id}"}`) || !md.split(`::real-chart{id="${id}"}`)[1]?.includes('\n::')) {
    fail(`${slug} 未挂或未闭合 ${id}`)
  }
  if (md.includes('真实行情对照图稍后补上')) {
    fail(`${slug} 仍写稍后补上`)
  }
  if (md.includes(`](/images/indicator/${snapshots[id]}`)) {
    fail(`${slug} 用 markdown 图片挂实盘，会被标成示意图`)
  }
  if (!md.includes(`- ${id}`)) {
    fail(`${slug} Front Matter 未列入 ${id}`)
  }
  ok(`${slug} 已挂 ${id}`)
}

const component = [
  await readFile(join(root, 'components/ui/TeachingChart.vue'), 'utf8'),
  await readFile(join(root, 'components/ui/mountTeachingChart.ts'), 'utf8'),
].join('\n')
for (const word of ['下单', '买入', '卖出', '开多', '开空']) {
  if (component.includes(word)) {
    fail(`TeachingChart 出现交易终端用语：${word}`)
  }
}
ok('TeachingChart 无下单用语')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nSprint 008 chart checks passed')
