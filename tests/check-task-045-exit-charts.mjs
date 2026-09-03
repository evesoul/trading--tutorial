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
  ['content/03-trading-system/exit-rules/index.md', 'vis-129', 'vis-008-trading-system-flow.svg'],
  ['content/03-trading-system/take-profit/index.md', 'vis-130', 'vis-008-trading-system-flow.svg'],
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
for (const id of ['vis-129', 'vis-130']) {
  const chart = JSON.parse(await readFile(join(root, 'public/data/charts', `${id}.json`), 'utf8'))
  if (chart.candles.length !== vis101.candles.length || chart.candles[0].time !== vis101.candles[0].time) {
    fail(`${id} 未复用 vis-101`)
  }
  if (chart.parameters?.fillStatus !== 'none' || chart.parameters?.scorecard !== 'none') {
    fail(`${id} 写成了成交或成绩`)
  }
  if ((chart.guides?.length || 0) < 2) {
    fail(`${id} 未画认错/目标门`)
  }
  assertNoBanned(JSON.stringify(chart), `${id} JSON`)
}
ok('两张 JSON 占位齐全')

for (const file of [
  'public/images/system/vis-129-exit-real.svg',
  'public/images/system/vis-130-take-profit-real.svg',
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
if (!types.includes("'vis-130'") || !types.includes('vis-130-take-profit-real.svg')) {
  fail('types 未登记 vis-129–130')
}
ok('类型已登记')

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}
console.log('\nTASK-045 exit-chart checks passed')
