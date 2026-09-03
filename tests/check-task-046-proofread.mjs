/**
 * Whole-site proofread for real-chart wiring, reuse, and lesson numbers.
 */
import { readFile, readdir, access } from 'node:fs/promises'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const banned = ['稳赚', '必赚', '无风险', '保证盈利', '100%准确']
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

async function walkMarkdown(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...await walkMarkdown(path))
    }
    else if (entry.name.endsWith('.md') && !entry.name.startsWith('HANDOFF')) {
      out.push(path)
    }
  }
  return out
}

const types = await readFile(join(root, 'types/chart.ts'), 'utf8')
const idMatch = types.match(/export const REAL_CHART_IDS = \[([\s\S]*?)\] as const/)
const ids = [...idMatch[1].matchAll(/'(vis-\d+)'/g)].map(match => match[1])
if (ids.length !== 30 || ids[0] !== 'vis-101' || ids.at(-1) !== 'vis-130') {
  fail(`REAL_CHART_IDS 应为 vis-101–130，实际 ${ids[0]}–${ids.at(-1)} ×${ids.length}`)
}
else {
  ok(`类型登记 ${ids.length} 张 vis-101–130`)
}

const lessons = await walkMarkdown(join(root, 'content'))
const hook = new Map()
for (const file of lessons) {
  const md = await readFile(file, 'utf8')
  for (const match of md.matchAll(/::real-chart\{id="(vis-\d+)"\}/g)) {
    const id = match[1]
    const after = md.slice(match.index + match[0].length, match.index + match[0].length + 80)
    if (!after.includes('\n::')) {
      fail(`${file} ${id} 未闭合`)
    }
    if (!ids.includes(id)) {
      fail(`${file} 挂了未登记的 ${id}`)
    }
    if (hook.has(id)) {
      fail(`${id} 挂了两次：${hook.get(id)} 与 ${file}`)
    }
    hook.set(id, file)
    if (!md.includes(`- ${id}`)) {
      fail(`${file} frontmatter 未列入 ${id}`)
    }
  }
  if (file.includes('/glossary/')) {
    continue
  }
  for (const word of banned) {
    if (md.includes(word) && !md.includes(`「${word}`) && !file.includes('backtesting') && !file.includes('statistics')) {
      fail(`${file} 含违禁词 ${word}`)
    }
  }
}

for (const id of ids) {
  if (!hook.has(id)) {
    fail(`${id} 未挂到课文`)
  }
  const jsonPath = join(root, 'public/data/charts', `${id}.json`)
  if (!(await exists(jsonPath))) {
    fail(`缺少 ${jsonPath}`)
    continue
  }
  const chart = JSON.parse(await readFile(jsonPath, 'utf8'))
  if (chart.id !== id) {
    fail(`${id} JSON id 为 ${chart.id}`)
  }
  if (!chart.symbol || !chart.timeframe || !chart.source || !chart.period?.start) {
    fail(`${id} 缺四字段`)
  }
  const snap = types.match(new RegExp(`'${id}': '([^']+)'`))
  if (!snap || !(await exists(join(root, 'public', snap[1])))) {
    fail(`${id} 快照缺失 ${snap?.[1] ?? ''}`)
  }
  else {
    const svg = await readFile(join(root, 'public', snap[1]), 'utf8')
    if (!svg.includes('真实行情') || svg.includes('示意图 · 教学抽象')) {
      fail(`${id} 快照徽章不对`)
    }
  }
  const spec = await readdir(join(root, 'docs/visual/specs'))
  if (!spec.some(name => name.startsWith(id))) {
    fail(`${id} 无规格文件`)
  }
}

ok(`课文钩子 ${hook.size} 张，一一对应`)

const vis101 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const reuse = ids.filter(id => Number(id.slice(4)) >= 108)
for (const id of reuse) {
  const chart = JSON.parse(await readFile(join(root, 'public/data/charts', `${id}.json`), 'utf8'))
  if (chart.candles.length !== vis101.candles.length || chart.candles[0].time !== vis101.candles[0].time) {
    fail(`${id} 应复用 vis-101`)
  }
}
ok('vis-108–130 复用 vis-101 K 线')

function bar(chart, iso) {
  const time = Date.parse(iso) / 1000
  return chart.candles.find(item => item.time === time)
}

const vis115 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-115.json'), 'utf8'))
const vis120 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-120.json'), 'utf8'))
const vis123 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-123.json'), 'utf8'))
const vis128 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-128.json'), 'utf8'))
const vis129 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-129.json'), 'utf8'))
const vis110 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-110.json'), 'utf8'))

const oct18 = bar(vis120, '2024-10-18T12:00:00.000Z')
const oct14 = bar(vis120, '2024-10-14T04:00:00.000Z')
const i18 = vis120.candles.findIndex(item => item.time === oct18.time)
const i14 = vis120.candles.findIndex(item => item.time === oct14.time)
if (Math.abs(oct18.close - 68710) > 2 || Math.abs(oct18.close - vis120.candles[i18 - 1].close - 1017) > 2) {
  fail('vis-120 10-18 数字与课文对不上')
}
if (Math.abs((vis120.oi[i18] - vis120.oi[i18 - 1]) / 1e8 - 3.54) > 0.2) {
  fail('vis-120 10-18 OI 增量与课文 3.5 亿对不上')
}
if (Math.abs(oct14.close - 64600) > 2 || Math.abs((vis120.oi[i14] - vis120.oi[i14 - 1]) / 1e8 + 1.23) > 0.2) {
  fail('vis-120 10-14 数字与课文对不上')
}

const oct29 = bar(vis123, '2024-10-29T00:00:00.000Z')
const i29 = vis123.candles.findIndex(item => item.time === oct29.time)
if (Math.abs(oct29.close - 70928) > 2 || Math.abs(vis123.rsi[i29] - 77) > 1 || Math.abs(vis123.macd.hist[i29] - 344) > 2) {
  fail('vis-123 10-29 数字与课文对不上')
}

const oct28 = bar(vis128, '2024-10-28T16:00:00.000Z')
const i28 = vis128.candles.findIndex(item => item.time === oct28.time)
const stop128 = vis128.guides.find(guide => guide.type === 'level').price
if (Math.abs(oct28.close - 69566) > 2 || Math.abs(vis128.atr[i28] - 746) > 2 || Math.abs(stop128 - 68447) > 2) {
  fail('vis-128 尺子与课文对不上')
}
if (vis128.atr[20] !== vis110.atr[20]) {
  fail('vis-128 未复用 vis-110 ATR')
}

const start129 = bar(vis129, '2024-10-27T12:00:00.000Z')
const stop129 = vis129.guides.find(guide => guide.id.includes('stop')).price
const target129 = vis129.guides.find(guide => guide.id.includes('target')).price
if (Math.abs(start129.close - 67760) > 1 || Math.abs(stop129 - 66747) > 1 || Math.abs(target129 - 69785) > 1) {
  fail('vis-129 门位与课文对不上')
}
if (bar(vis101, '2024-10-28T16:00:00.000Z').high < target129) {
  fail('vis-129 目标门应被 10-28 16:00 高点碰到')
}
if (vis115.lsrAccounts.at(-1) == null || vis115.lsrTopPositions.at(-1) == null) {
  fail('vis-115 末根缺多空比')
}
ok('关键数字与课文一致')

const kdj = await readFile(join(root, 'content/01-indicators/kdj/index.md'), 'utf8')
if (kdj.includes('::real-chart') || !kdj.includes('不新开 KDJ+RSI')) {
  fail('KDJ 课约束漂移')
}
const caseStudy = await readFile(join(root, 'content/03-trading-system/case-study/index.md'), 'utf8')
if (!caseStudy.includes('不填胜率') || caseStudy.includes('胜率 8') || caseStudy.includes('收益率 2')) {
  fail('案例课成绩约束漂移')
}
ok('KDJ 对照层与案例不填成绩仍在')

for (const word of banned) {
  for (const file of lessons.filter(path => path.includes('/index.md'))) {
    const md = await readFile(file, 'utf8')
    if (md.includes(word)) {
      fail(`${file} 含 ${word}`)
    }
  }
}
ok('课文正文无收益保证词')

for (const file of lessons.filter(path => path.includes('/index.md'))) {
  const md = await readFile(file, 'utf8')
  for (const match of md.matchAll(/\]\((\/images\/[^)]+)\)/g)) {
    if (!(await exists(join(root, 'public', match[1])))) {
      fail(`${file} 示意图不存在 ${match[1]}`)
    }
  }
}
ok('课文 markdown 配图文件都在')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-046 proofread checks passed')
