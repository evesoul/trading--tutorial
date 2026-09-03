/**
 * TASK-039 链接终审。需要预览或 dev 已启动。
 * 用法：BASE_URL=http://127.0.0.1:3012 node tests/check-task-039-links.mjs
 */
const base = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')

const systemTwenty = [
  'what-is-a-trading-system',
  'market-regime',
  'multi-timeframe',
  'direction',
  'order-types',
  'entry-rules',
  'exit-rules',
  'stop-loss',
  'take-profit',
  'position-sizing',
  'cost-vs-r',
  'risk-management',
  'account-heat',
  'trade-frequency',
  'execution-bias',
  'trading-journal',
  'backtesting',
  'statistics',
  'system-optimization',
  'case-study',
]

const newNine = [
  '/course/perp-screen',
  '/indicators/market-structure',
  '/indicators/atr',
  '/indicators/liquidation-cascade',
  '/trading-system/order-types',
  '/trading-system/cost-vs-r',
  '/trading-system/multi-timeframe',
  '/trading-system/account-heat',
  '/trading-system/execution-bias',
]

const pages = [
  '/',
  '/course',
  '/course/perp-screen',
  '/indicators',
  '/indicators/kline',
  '/indicators/trendlines',
  '/indicators/market-structure',
  '/indicators/ma',
  '/indicators/ema',
  '/indicators/rsi',
  '/indicators/volume',
  '/indicators/atr',
  '/indicators/bollinger-bands',
  '/indicators/macd',
  '/indicators/kdj',
  '/indicators/open-interest',
  '/indicators/funding-rate',
  '/indicators/long-short-ratio',
  '/indicators/cvd',
  '/indicators/liquidation-cascade',
  '/combinations',
  '/combinations/trend-momentum',
  '/combinations/trend-volume',
  '/combinations/rsi-macd',
  '/combinations/price-oi',
  '/combinations/oi-volume',
  '/combinations/funding-oi',
  '/combinations/multi-indicator',
  '/trading-system',
  ...systemTwenty.map(slug => `/trading-system/${slug}`),
  '/glossary',
]

const forbiddenEverywhere = [
  'HANDOFF-TASK-039',
  'HANDOFF —',
  'Content Agent HANDOFF',
  '后半仍在编写',
  '仍待后续',
  '回测专篇尚未写',
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
    '导学 1',
    '导学 2',
    '主路径 1',
    '主路径 9',
    '合约数据层 1',
    '合约数据层 5',
    '指标组合 1',
    '指标组合 7',
    '交易系统 1',
    '交易系统 20',
    '二十步',
    '摆动结构',
    '清算瀑布',
    '从交易所屏幕开始',
    'href="/course/perp-screen"',
    'href="/indicators/kline"',
    'href="/indicators/market-structure"',
    'href="/indicators/atr"',
    'href="/indicators/liquidation-cascade"',
    'href="/combinations/trend-momentum"',
    ...systemTwenty.map(slug => `href="/trading-system/${slug}"`),
  ],
  '/course/perp-screen': [
    '交易所屏幕上有什么',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-030-perp-screen.svg',
    'href="/indicators/kline"',
  ],
  '/indicators': [
    '主路径',
    '对照层',
    '合约数据层',
    'href="/indicators/market-structure"',
    'href="/indicators/atr"',
    'href="/indicators/kdj"',
  ],
  '/indicators/market-structure': [
    '摆动结构',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-022-market-structure.svg',
    'href="/indicators/ma"',
  ],
  '/indicators/atr': [
    'ATR',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-023-atr.svg',
    'href="/indicators/bollinger-bands"',
  ],
  '/indicators/liquidation-cascade': [
    '清算瀑布',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-027-liquidation-cascade.svg',
    'href="/combinations/trend-momentum"',
  ],
  '/trading-system': [
    '二十步',
    ...systemTwenty.map(slug => `href="/trading-system/${slug}"`),
  ],
  '/trading-system/multi-timeframe': [
    '多周期',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-025-multi-timeframe.svg',
    'href="/trading-system/direction"',
  ],
  '/trading-system/order-types': [
    '订单与成交',
    '正例',
    '反例',
    '局限性',
    '图上没有买卖按钮',
    '/images/concept/vis-024-order-types.svg',
    'href="/trading-system/entry-rules"',
  ],
  '/trading-system/cost-vs-r': [
    '成本对照 R',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-026-cost-vs-r.svg',
    'href="/trading-system/risk-management"',
  ],
  '/trading-system/account-heat': [
    '账户热度',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-029-account-heat.svg',
    'href="/trading-system/trade-frequency"',
  ],
  '/trading-system/execution-bias': [
    '执行偏差',
    '正例',
    '反例',
    '局限性',
    '/images/concept/vis-028-execution-bias.svg',
    'href="/trading-system/trading-journal"',
  ],
  '/trading-system/position-sizing': [
    'href="/trading-system/cost-vs-r"',
    '成本对照 R',
  ],
  '/trading-system/risk-management': [
    '错了能否活下来',
    'href="/trading-system/account-heat"',
    '不鼓励高杠杆',
  ],
  '/trading-system/trade-frequency': [
    'href="/trading-system/execution-bias"',
    '不鼓励高杠杆',
  ],
  '/trading-system/case-study': [
    '作业纸',
    'href="/course"',
    '不填胜率',
  ],
}

const mustNotContain = {
  '/course': [
    '仍待后续',
    '后半仍在编写',
    '交易所屏幕上有什么 编写中',
    '摆动结构与假突破 编写中',
    'ATR 与波动 编写中',
    '清算瀑布怎么读图 编写中',
    '多周期 编写中',
    '订单与成交 编写中',
    '成本对照 R 编写中',
    '账户热度与相关 编写中',
    '执行偏差 编写中',
    '风险管理 编写中',
    'href="/indicators/kdj-rsi"',
    'href="/combinations/kdj-rsi"',
  ],
  '/indicators': [
    '摆动结构与假突破 编写中',
    'ATR 与波动 编写中',
    '清算瀑布怎么读图 编写中',
  ],
  '/trading-system': [
    '多周期 编写中',
    '订单与成交 编写中',
    '成本对照 R 编写中',
    '账户热度与相关 编写中',
    '执行偏差 编写中',
  ],
  '/trading-system/case-study': [
    '编写中',
    'href="/trading-system/signals"',
  ],
}

const forbiddenWords = ['一定', '必然', '100%准确', '稳赚', '必赚', '无风险', '保证盈利']

let failed = 0

for (const path of pages) {
  const url = `${base}${path}`
  let res
  try {
    res = await fetch(url)
  }
  catch (error) {
    console.error(`FAIL ${path} fetch ${error.message}`)
    failed += 1
    continue
  }
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
  if (newNine.includes(path) || path.startsWith('/trading-system/')) {
    for (const word of forbiddenWords) {
      if (html.includes(word)) {
        console.error(`FAIL ${path} contains forbidden word "${word}"`)
        failed += 1
      }
    }
  }
  if (html.includes('这篇系统课还没发布') || html.includes('这篇指标课还没发布')) {
    console.error(`FAIL ${path} 仍显示未发布空状态`)
    failed += 1
  }
  console.log(`OK   ${path}`)
}

const images = [
  '/images/concept/vis-022-market-structure.svg',
  '/images/concept/vis-023-atr.svg',
  '/images/concept/vis-024-order-types.svg',
  '/images/concept/vis-025-multi-timeframe.svg',
  '/images/concept/vis-026-cost-vs-r.svg',
  '/images/concept/vis-027-liquidation-cascade.svg',
  '/images/concept/vis-028-execution-bias.svg',
  '/images/concept/vis-029-account-heat.svg',
  '/images/concept/vis-030-perp-screen.svg',
  '/images/flow/vis-008-trading-system-flow.svg',
]

for (const path of images) {
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
  console.log(`OK   ${path}`)
}

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log('\nAll TASK-039 link checks passed')
