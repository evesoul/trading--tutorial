/**
 * Sprint 005 链接与内容抽查。需要预览服务已启动。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint005-links.mjs
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
  '/combinations/trend-momentum',
  '/combinations/trend-volume',
  '/combinations/rsi-macd',
  '/combinations/price-oi',
  '/combinations/oi-volume',
  '/combinations/funding-oi',
  '/combinations/multi-indicator',
  '/trading-system',
  '/glossary',
]

const forbiddenEverywhere = [
  'href="/trading-system/what-is-a-trading-system"',
  'HANDOFF-SPRINT-005',
  'HANDOFF —',
  'Content Agent HANDOFF',
  '/images/charts/vis-101',
  '/images/charts/vis-102',
  '/images/charts/vis-103',
  '/images/charts/vis-104',
  '/images/charts/vis-105',
  '/images/charts/vis-106',
  '/images/charts/vis-107',
]

const required = {
  '/course': [
    '主路径 1',
    '主路径 8',
    '合约数据层 1',
    '合约数据层 4',
    '指标组合 1',
    '指标组合 7',
    'href="/indicators/kline"',
    'href="/indicators/bollinger-bands"',
    'href="/indicators/open-interest"',
    'href="/indicators/cvd"',
    'href="/combinations/trend-momentum"',
    'href="/combinations/trend-volume"',
    'href="/combinations/rsi-macd"',
    'href="/combinations/price-oi"',
    'href="/combinations/oi-volume"',
    'href="/combinations/funding-oi"',
    'href="/combinations/multi-indicator"',
  ],
  '/combinations': [
    'href="/combinations/trend-momentum"',
    'href="/combinations/multi-indicator"',
    '趋势 + 动量',
    '多指标共振',
  ],
  '/indicators/cvd': [
    'href="/combinations/trend-momentum"',
    '趋势 + 动量',
    'CVD 与成交量区分示意图',
  ],
  '/combinations/trend-momentum': [
    '组合用来对照',
    '不是叠加信号',
    '不是开仓指令',
    '趋势与动量对照示意图',
    '/images/concept/vis-013-trend-momentum.svg',
    'href="/combinations/trend-volume"',
  ],
  '/combinations/trend-volume': [
    '组合用来对照',
    '量价齐升',
    '不是开仓指令',
    '价量是否同步示意图',
    '/images/concept/vis-014-trend-volume.svg',
  ],
  '/combinations/rsi-macd': [
    '并排对照',
    '不是反转指令',
    '双重确认',
    'RSI 超买超卖示意图',
    'MACD 金叉死叉示意图',
  ],
  '/combinations/price-oi': [
    '组合用来对照',
    '四象限是解释框架',
    '持仓量示意图',
  ],
  '/combinations/oi-volume': [
    '流量',
    '存量',
    '持仓量与成交量区分示意图',
    '/images/concept/vis-015-oi-volume.svg',
    '不是反向喊单',
  ],
  '/combinations/funding-oi': [
    '不是反向喊单',
    '不是倒计时反转器',
    '资金费率示意图',
  ],
  '/combinations/multi-indicator': [
    '不是指标越多越准确',
    '问题槽不是指标堆叠示意图',
    '/images/concept/vis-016-multi-indicator.svg',
    'href="/course"',
    '编写中',
  ],
}

const mustNotContain = {
  '/combinations/multi-indicator': [
    'href="/trading-system/what-is-a-trading-system"',
    '/trading-system/what-is-a-trading-system',
  ],
  '/course': [
    '趋势 + 动量 编写中',
    '多指标共振 编写中',
    '累计成交量差 编写中',
  ],
  '/glossary': [
    'HANDOFF',
    '术语表建设中',
  ],
}

const forbiddenWords = ['一定', '必然', '100%准确', '稳赚', '必赚', '无风险', '保证盈利']

const lessonPages = [
  '/combinations/trend-momentum',
  '/combinations/trend-volume',
  '/combinations/rsi-macd',
  '/combinations/price-oi',
  '/combinations/oi-volume',
  '/combinations/funding-oi',
  '/combinations/multi-indicator',
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
    path: '/images/concept/vis-013-trend-momentum.svg',
    must: ['示意图'],
  },
  {
    path: '/images/concept/vis-014-trend-volume.svg',
    must: ['示意图'],
  },
  {
    path: '/images/concept/vis-015-oi-volume.svg',
    must: ['示意图'],
  },
  {
    path: '/images/concept/vis-016-multi-indicator.svg',
    must: ['示意图', '不是指标越多越准确'],
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

console.log('\nAll Sprint 005 link checks passed')
