/**
 * Sprint 006 链接与内容抽查。需要预览服务已启动。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint006-links.mjs
 */
const base = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')

const unpublishedSystem = [
  'risk-management',
  'trade-frequency',
  'trading-journal',
  'backtesting',
  'statistics',
  'system-optimization',
  'case-study',
]

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
  '/trading-system/what-is-a-trading-system',
  '/trading-system/market-regime',
  '/trading-system/direction',
  '/trading-system/entry-rules',
  '/trading-system/exit-rules',
  '/trading-system/stop-loss',
  '/trading-system/take-profit',
  '/trading-system/position-sizing',
  '/glossary',
]

const forbiddenEverywhere = [
  'href="/trading-system/risk-management"',
  'HANDOFF-SPRINT-006',
  'HANDOFF —',
  'Content Agent HANDOFF',
  '/images/charts/vis-101',
  '/images/charts/vis-102',
  '/images/charts/vis-103',
  '/images/charts/vis-104',
  '/images/charts/vis-105',
  '/images/charts/vis-106',
  '/images/charts/vis-107',
  ...unpublishedSystem.map(slug => `href="/trading-system/${slug}"`),
]

const required = {
  '/course': [
    '主路径 1',
    '主路径 8',
    '合约数据层 1',
    '合约数据层 4',
    '指标组合 1',
    '指标组合 7',
    '交易系统 1',
    '交易系统 8',
    '交易系统 9',
    '交易系统 15',
    'href="/indicators/kline"',
    'href="/indicators/bollinger-bands"',
    'href="/indicators/open-interest"',
    'href="/indicators/cvd"',
    'href="/combinations/trend-momentum"',
    'href="/combinations/multi-indicator"',
    'href="/trading-system/what-is-a-trading-system"',
    'href="/trading-system/market-regime"',
    'href="/trading-system/direction"',
    'href="/trading-system/entry-rules"',
    'href="/trading-system/exit-rules"',
    'href="/trading-system/stop-loss"',
    'href="/trading-system/take-profit"',
    'href="/trading-system/position-sizing"',
    '风险管理 编写中',
    '交易频率 编写中',
    '交易日志 编写中',
    '回测 编写中',
    '数据统计 编写中',
    '系统优化 编写中',
    '完整交易系统案例 编写中',
  ],
  '/trading-system': [
    'href="/trading-system/what-is-a-trading-system"',
    'href="/trading-system/position-sizing"',
    '什么是交易系统',
    '仓位管理',
  ],
  '/combinations/multi-indicator': [
    'href="/trading-system/what-is-a-trading-system"',
    '什么是交易系统',
    '不是指标越多越准确',
  ],
  '/trading-system/what-is-a-trading-system': [
    '事先写好的规则',
    '不是找一个',
    '不是推荐策略',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    'href="/trading-system/market-regime"',
  ],
  '/trading-system/market-regime': [
    '环境先于方向',
    '看不清',
    '不是推荐策略',
    '市场环境三态示意图',
    '/images/concept/vis-017-market-regime.svg',
    'href="/trading-system/direction"',
  ],
  '/trading-system/direction': [
    '偏多',
    '偏空',
    '不交易',
    '环境先于方向',
    '不是下单',
    '不是推荐策略',
    'href="/trading-system/entry-rules"',
  ],
  '/trading-system/entry-rules': [
    '入场 = 前提 + 触发',
    '只满足一部分',
    '不是推荐策略',
    'href="/trading-system/exit-rules"',
  ],
  '/trading-system/exit-rules': [
    '出场先有框架',
    '止损',
    '止盈',
    '时间',
    '规则失效',
    '不是推荐策略',
    'href="/trading-system/stop-loss"',
  ],
  '/trading-system/stop-loss': [
    '止损 ≠ 强平',
    '不是强平',
    '不是推荐策略',
    '止损与强平区分示意图',
    '/images/concept/vis-018-stop-loss.svg',
    'href="/trading-system/take-profit"',
  ],
  '/trading-system/take-profit': [
    '不是拿到最多',
    '1R',
    '不是推荐策略',
    'href="/trading-system/position-sizing"',
  ],
  '/trading-system/position-sizing': [
    '亏损上限',
    '反推',
    'href="/course"',
    '编写中',
  ],
}

const mustNotContain = {
  '/trading-system/position-sizing': [
    'href="/trading-system/risk-management"',
  ],
  '/course': [
    '风险管理</strong>',
    'href="/trading-system/risk-management"',
    '什么是交易系统 编写中',
    '仓位管理 编写中',
    '多指标共振 编写中',
  ],
  '/glossary': [
    'HANDOFF',
    '术语表建设中',
  ],
}

const forbiddenWords = ['一定', '必然', '100%准确', '稳赚', '必赚', '无风险', '保证盈利']

const lessonPages = [
  '/combinations/multi-indicator',
  '/trading-system/what-is-a-trading-system',
  '/trading-system/market-regime',
  '/trading-system/direction',
  '/trading-system/entry-rules',
  '/trading-system/exit-rules',
  '/trading-system/stop-loss',
  '/trading-system/take-profit',
  '/trading-system/position-sizing',
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

for (const slug of unpublishedSystem) {
  const path = `/trading-system/${slug}`
  const res = await fetch(`${base}${path}`)
  const html = await res.text()
  if (res.status !== 200) {
    console.error(`FAIL unpublished ${path} HTTP ${res.status}（应为空状态 200，不是死链 404）`)
    failed += 1
    continue
  }
  if (html.includes(`href="${path}"`) && html.includes('path-steps')) {
    console.error(`FAIL unpublished ${path} 课程路径出现死链`)
    failed += 1
  }
  if (!html.includes('这篇系统课还没发布') && !html.includes('编写中')) {
    console.error(`FAIL unpublished ${path} 未显示空状态`)
    failed += 1
    continue
  }
  console.log(`OK   unpublished ${path} empty-state`)
}

const imageChecks = [
  {
    path: '/images/flow/vis-008-trading-system-flow.svg',
    must: ['示意图'],
  },
  {
    path: '/images/concept/vis-017-market-regime.svg',
    must: ['示意图', '先判断环境'],
  },
  {
    path: '/images/concept/vis-018-stop-loss.svg',
    must: ['示意图', '止损不是强平'],
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

console.log('\nAll Sprint 006 link checks passed')
