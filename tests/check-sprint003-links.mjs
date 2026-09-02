/**
 * Sprint 003 链接与内容抽查。需要预览服务已启动。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint003-links.mjs
 */
const base = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')

const pages = [
  '/',
  '/course',
  '/indicators',
  '/indicators/kline',
  '/indicators/ma',
  '/indicators/ema',
  '/indicators/rsi',
  '/indicators/volume',
  '/indicators/macd',
  '/indicators/kdj',
  '/indicators/bollinger-bands',
  '/combinations',
  '/trading-system',
  '/glossary',
]

const forbiddenEverywhere = [
  'href="/indicators/open-interest"',
  'HANDOFF-SPRINT-003',
  'HANDOFF —',
  'Content Agent HANDOFF',
]

const required = {
  '/course': [
    '主路径 1',
    '主路径 8',
    'K 线',
    '成交量',
    'MACD',
    'KDJ',
    '布林带',
    'href="/indicators/kline"',
    'href="/indicators/volume"',
    'href="/indicators/macd"',
    'href="/indicators/kdj"',
    'href="/indicators/bollinger-bands"',
  ],
  '/indicators/rsi': [
    'href="/indicators/volume"',
    'Volume',
  ],
  '/indicators/volume': [
    '成交量与价格示意图',
    '/images/concept/vis-005-volume.svg',
  ],
  '/indicators/macd': [
    'MACD 柱与交叉示意图',
    '/images/concept/vis-003-macd-cross.svg',
  ],
  '/indicators/kdj': [
    'K 值 / D 值 / J 值示意图',
    '/images/concept/vis-009-kdj.svg',
  ],
  '/indicators/bollinger-bands': [
    '布林带中轨与开口收口示意图',
    '/images/concept/vis-010-bollinger-bands.svg',
    'OI 编写中',
  ],
  '/glossary': [
    '市场与合约',
    '保证金、杠杆与强平',
    '价格图与均线',
    '动量、成交与合约数据',
    '观察用语',
    '教学与风险用语',
    '简单移动平均（Simple Moving Average，SMA）',
    'K 值',
    '强平（Liquidation）',
    '金叉不代表此后只涨',
    '开口只说明波动在扩大，不是开仓指令',
  ],
}

const mustNotContain = {
  '/glossary': [
    '术语表建设中',
    'HANDOFF',
  ],
  '/indicators/bollinger-bands': [
    'href="/indicators/open-interest"',
  ],
  '/course': [
    'Open Interest 编写中',
  ],
}

let failed = 0

for (const path of pages) {
  const url = `${base}${path}`
  const res = await fetch(url)
  const html = await res.text()
  if (res.status !== 200) {
    console.error(`FAIL ${path} HTTP ${res.status}`)
    failed += 1
    continue
  }
  for (const needle of forbiddenEverywhere) {
    if (html.includes(needle)) {
      console.error(`FAIL ${path} contains ${needle}`)
      failed += 1
    }
  }
  for (const text of required[path] ?? []) {
    if (!html.includes(text)) {
      console.error(`FAIL ${path} missing "${text}"`)
      failed += 1
    }
  }
  for (const text of mustNotContain[path] ?? []) {
    if (html.includes(text)) {
      console.error(`FAIL ${path} should not contain "${text}"`)
      failed += 1
    }
  }
  console.log(`OK   ${path}`)
}

const imagePaths = [
  '/images/concept/vis-003-macd-cross.svg',
  '/images/concept/vis-005-volume.svg',
  '/images/concept/vis-009-kdj.svg',
  '/images/concept/vis-010-bollinger-bands.svg',
]

for (const path of imagePaths) {
  const res = await fetch(`${base}${path}`)
  if (res.status !== 200) {
    console.error(`FAIL image ${path} HTTP ${res.status}`)
    failed += 1
    continue
  }
  const svg = await res.text()
  if (!svg.includes('示意图')) {
    console.error(`FAIL image ${path} missing 示意图`)
    failed += 1
    continue
  }
  if (path.includes('vis-009') && svg.includes('K 线')) {
    console.error(`FAIL image ${path} uses K 线 as line name`)
    failed += 1
    continue
  }
  console.log(`OK   ${path}`)
}

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log('\nAll Sprint 003 link checks passed')
