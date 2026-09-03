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
  ['content/01-indicators/long-short-ratio/index.md', 'vis-115'],
  ['content/01-indicators/cvd/index.md', 'vis-116'],
  ['content/01-indicators/liquidation-cascade/index.md', 'vis-117'],
  ['content/03-trading-system/case-study/index.md', 'vis-118'],
]

for (const [file, id] of lessons) {
  const md = await readFile(join(root, file), 'utf8')
  if (!md.includes(`::real-chart{id="${id}"}`) || !md.split(`::real-chart{id="${id}"}`)[1]?.includes('\n::')) {
    fail(`${file} 未挂或未闭合 ${id}`)
  }
  else {
    ok(`${file} 已挂 ${id}`)
  }
  if (file.includes('long-short-ratio') && !md.includes('vis-011-long-short-ratio.svg')) {
    fail('多空比课未保留 vis-011 示意图')
  }
  if (file.includes('cvd') && !md.includes('vis-012-cvd.svg')) {
    fail('CVD 课未保留 vis-012 示意图')
  }
  if (file.includes('liquidation-cascade') && !md.includes('vis-027-liquidation-cascade.svg')) {
    fail('瀑布课未保留 vis-027 示意图')
  }
  if (file.includes('case-study') && (md.includes('胜率') && md.includes('本页胜率') || md.includes('权益曲线证明'))) {
    fail('案例课填了成绩')
  }
  assertNoBanned(md, file)
}

const vis101 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const vis115 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-115.json'), 'utf8'))
const vis116 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-116.json'), 'utf8'))
const vis117 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-117.json'), 'utf8'))
const vis118 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-118.json'), 'utf8'))

for (const [id, chart] of [['vis-115', vis115], ['vis-116', vis116], ['vis-117', vis117], ['vis-118', vis118]]) {
  if (chart.candles.length !== vis101.candles.length || chart.candles[0].time !== vis101.candles[0].time) {
    fail(`${id} 未复用 vis-101`)
  }
  if (chart.symbol !== 'BTCUSDT' || chart.timeframe !== '4h' || !chart.source || !chart.period?.start) {
    fail(`${id} 缺四字段`)
  }
  assertNoBanned(JSON.stringify(chart), `${id} JSON`)
}

const last = vis115.lsrAccounts.length - 1
if (!(vis115.lsrAccounts[last] < 1) || !(vis115.lsrTopPositions[last] > 1)) {
  fail('vis-115 末根未示范口径反向')
}
if (!vis115.panels?.includes('lsr')) {
  fail('vis-115 未声明 lsr 副图')
}
ok('vis-115 JSON 口径反向')

if (vis116.cvd?.[0] !== 0) {
  fail('vis-116 CVD 未从窗左端重置为 0')
}
const quiet = vis101.candles.findIndex(bar => bar.time === 1729900800)
if (quiet < 0 || Math.abs(vis116.delta[quiet]) > 5e6) {
  fail('vis-116 缺少放量净额小的教学点')
}
ok('vis-116 JSON CVD')

const shock = vis101.candles.findIndex(bar => bar.time === 1728993600)
if (shock < 0 || !vis117.panels?.includes('volume') || !vis117.panels?.includes('oi') || !vis117.panels?.includes('cvd')) {
  fail('vis-117 未叠量 / OI / CVD')
}
if (vis117.parameters?.liquidationPrints !== 'none') {
  fail('vis-117 未声明无强平逐笔')
}
if (!(vis101.candles[shock].volume > 1e10) || !(vis101.candles[shock].high - vis101.candles[shock].low > 2500)) {
  fail('vis-117 冲击根不对')
}
ok('vis-117 JSON 公开痕迹')

if (!vis118.overlays?.ema20 || vis118.markers?.length < 2) {
  fail('vis-118 缺 EMA 或执行标记')
}
if (JSON.stringify(vis118).includes('胜率') || JSON.stringify(vis118).includes('收益率')) {
  fail('vis-118 JSON 含成绩字段')
}
ok('vis-118 JSON 时间线')

for (const file of [
  'public/images/indicator/vis-115-lsr-real.svg',
  'public/images/indicator/vis-116-cvd-real.svg',
  'public/images/indicator/vis-117-cascade-real.svg',
  'public/images/system/vis-118-case-timeline-real.svg',
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
const mount = await readFile(join(root, 'components/ui/mountTeachingChart.ts'), 'utf8')
if (!types.includes("'vis-118'") || !types.includes('lsrAccounts') || !types.includes('cvd?:')) {
  fail('types 未登记 vis-115–118 或 LSR/CVD 字段')
}
if (!mount.includes('panels.includes(\'lsr\')') || !mount.includes('panels.includes(\'cvd\')')) {
  fail('组件未接 lsr / cvd 副图')
}
if (mount.includes('下单') || mount.includes('买入') || mount.includes('卖出')) {
  fail('组件含交易终端用语')
}
ok('类型与组件已接 vis-115–118')

const caseStudy = await readFile(join(root, 'content/03-trading-system/case-study/index.md'), 'utf8')
if (!caseStudy.includes('教学占位') || !caseStudy.includes('不填胜率')) {
  fail('案例课未标明占位或仍像跟单')
}
ok('案例课执行时间线约束仍在')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-042 contract-chart checks passed')
