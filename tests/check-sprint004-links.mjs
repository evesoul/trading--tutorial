/**
 * Sprint 004 链接与内容抽查。需要预览服务已启动。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint004-links.mjs
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
  '/indicators/open-interest',
  '/indicators/funding-rate',
  '/indicators/long-short-ratio',
  '/indicators/cvd',
  '/combinations',
  '/trading-system',
  '/glossary',
]

const forbiddenEverywhere = [
  'href="/combinations/trend-momentum"',
  'href="/combinations/trend-volume"',
  'HANDOFF-SPRINT-004',
  'HANDOFF —',
  'Content Agent HANDOFF',
]

const required = {
  '/course': [
    '主路径 1',
    '主路径 8',
    '合约数据层 1',
    '合约数据层 4',
    'href="/indicators/kline"',
    'href="/indicators/bollinger-bands"',
    'href="/indicators/open-interest"',
    'href="/indicators/funding-rate"',
    'href="/indicators/long-short-ratio"',
    'href="/indicators/cvd"',
  ],
  '/indicators': [
    '合约数据层',
  ],
  '/indicators/bollinger-bands': [
    'href="/indicators/open-interest"',
    '持仓量',
  ],
  '/indicators/open-interest': [
    '持仓量与价格示意图',
    '/images/concept/vis-006-open-interest.svg',
    'href="/indicators/funding-rate"',
    '成交量',
    '累计成交量差',
  ],
  '/indicators/funding-rate': [
    '资金费率示意图',
    '/images/concept/vis-007-funding-rate.svg',
    '资金费（Funding Payment）',
    'href="/indicators/long-short-ratio"',
  ],
  '/indicators/long-short-ratio': [
    '多空比必须先标口径示意图',
    '/images/concept/vis-011-long-short-ratio.svg',
    '账户数比',
    '持仓量比',
    'href="/indicators/cvd"',
  ],
  '/indicators/cvd': [
    'CVD 与成交量区分示意图',
    '/images/concept/vis-012-cvd.svg',
    'href="/course"',
    '阶段 2',
  ],
}

const mustNotContain = {
  '/indicators': [
    '即将推出',
  ],
  '/indicators/cvd': [
    'href="/combinations/',
    '/combinations/trend-momentum',
  ],
  '/course': [
    'Open Interest 编写中',
    '持仓量 编写中',
    '资金费率 编写中',
    '多空比 编写中',
    '累计成交量差 编写中',
  ],
  '/glossary': [
    'HANDOFF',
    '术语表建设中',
  ],
}

const forbiddenWords = ['一定', '必然', '100%准确', '稳赚', '必赚', '无风险', '保证盈利']

const lessonPages = [
  '/indicators/open-interest',
  '/indicators/funding-rate',
  '/indicators/long-short-ratio',
  '/indicators/cvd',
]

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
  if (lessonPages.includes(path)) {
    for (const word of forbiddenWords) {
      if (html.includes(word)) {
        console.error(`FAIL ${path} contains forbidden word "${word}"`)
        failed += 1
      }
    }
  }
  console.log(`OK   ${path}`)
}

const imageChecks = [
  {
    path: '/images/concept/vis-006-open-interest.svg',
    must: ['示意图'],
  },
  {
    path: '/images/concept/vis-007-funding-rate.svg',
    must: ['示意图'],
  },
  {
    path: '/images/concept/vis-011-long-short-ratio.svg',
    must: ['示意图', '口径'],
  },
  {
    path: '/images/concept/vis-012-cvd.svg',
    must: ['示意图'],
  },
]

for (const item of imageChecks) {
  const res = await fetch(`${base}${item.path}`)
  if (res.status !== 200) {
    console.error(`FAIL image ${item.path} HTTP ${res.status}`)
    failed += 1
    continue
  }
  const svg = await res.text()
  const missing = item.must.filter(text => !svg.includes(text))
  if (missing.length) {
    console.error(`FAIL image ${item.path} missing ${missing.join(', ')}`)
    failed += 1
    continue
  }
  console.log(`OK   ${item.path}`)
}

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log('\nAll Sprint 004 link checks passed')
