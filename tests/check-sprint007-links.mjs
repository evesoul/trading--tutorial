/**
 * Sprint 007 链接与内容抽查。需要预览服务已启动。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint007-links.mjs
 */
const base = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')

const systemFifteen = [
  'what-is-a-trading-system',
  'market-regime',
  'direction',
  'entry-rules',
  'exit-rules',
  'stop-loss',
  'take-profit',
  'position-sizing',
  'risk-management',
  'trade-frequency',
  'trading-journal',
  'backtesting',
  'statistics',
  'system-optimization',
  'case-study',
]

const backHalf = [
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
  ...systemFifteen.map(slug => `/trading-system/${slug}`),
  '/glossary',
]

const forbiddenEverywhere = [
  'HANDOFF-SPRINT-007',
  'HANDOFF —',
  'Content Agent HANDOFF',
  '后半仍在编写',
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
    ...systemFifteen.map(slug => `href="/trading-system/${slug}"`),
    '案例是教学作业纸',
  ],
  '/trading-system': [
    ...systemFifteen.map(slug => `href="/trading-system/${slug}"`),
    '什么是交易系统',
    '仓位管理',
    '风险管理',
    '完整交易系统案例',
  ],
  '/combinations/multi-indicator': [
    'href="/trading-system/what-is-a-trading-system"',
    '什么是交易系统',
  ],
  '/trading-system/position-sizing': [
    'href="/trading-system/risk-management"',
    '风险管理',
    '错了能否活下来',
  ],
  '/trading-system/risk-management': [
    '错了能否活下来',
    '对了能赚多少',
    '高杠杆不是效率',
    '不鼓励高杠杆',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    'href="/trading-system/trade-frequency"',
    '不是推荐策略',
  ],
  '/trading-system/trade-frequency': [
    '手续费',
    '资金费',
    '滑点',
    '有规则不等于该高频',
    '不鼓励高杠杆',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    'href="/trading-system/trading-journal"',
    '不是推荐策略',
  ],
  '/trading-system/trading-journal': [
    '没有记录就无法谈优化',
    '不是成绩单',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    'href="/trading-system/backtesting"',
  ],
  '/trading-system/backtesting': [
    '手续费',
    '资金费',
    '滑点',
    '只报胜率',
    '回测不能只看胜率示意图',
    '/images/concept/vis-019-backtest.svg',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    'href="/trading-system/statistics"',
    '不是推荐策略',
  ],
  '/trading-system/statistics': [
    '胜率只是其中一个数字',
    '手续费',
    '资金费',
    '滑点',
    '不鼓励高杠杆',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    'href="/trading-system/system-optimization"',
  ],
  '/trading-system/system-optimization': [
    '过拟合',
    '不鼓励高杠杆',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    'href="/trading-system/case-study"',
    '不是跟单',
  ],
  '/trading-system/case-study': [
    '作业纸',
    '不证明该系统有效',
    '不是跟单对象',
    'href="/course"',
    '交易系统案例是作业纸示意图',
    '/images/concept/vis-020-case-study.svg',
    '交易系统流程示意图',
    '/images/flow/vis-008-trading-system-flow.svg',
    '手续费',
    '资金费',
    '滑点',
    '不鼓励高杠杆',
  ],
}

const mustNotContain = {
  '/course': [
    '后半仍在编写',
    '风险管理 编写中',
    '交易频率 编写中',
    '交易日志 编写中',
    '回测 编写中',
    '数据统计 编写中',
    '系统优化 编写中',
    '完整交易系统案例 编写中',
    '什么是交易系统 编写中',
    '仓位管理 编写中',
  ],
  '/trading-system/position-sizing': [
    '风险管理 编写中',
  ],
  '/trading-system/case-study': [
    '编写中',
    'href="/trading-system/signals"',
    'href="/trading-system/live-strategy"',
  ],
  '/glossary': [
    'HANDOFF',
    '术语表建设中',
  ],
}

const forbiddenWords = ['一定', '必然', '100%准确', '稳赚', '必赚', '无风险', '保证盈利']

const lessonPages = [
  '/combinations/multi-indicator',
  ...systemFifteen.map(slug => `/trading-system/${slug}`),
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
  if (backHalf.includes(path.slice('/trading-system/'.length))) {
    if (html.includes('这篇系统课还没发布')) {
      console.error(`FAIL ${path} 仍显示未发布空状态`)
      failed += 1
    }
  }
  console.log(`OK   ${path}`)
}

const imageChecks = [
  {
    path: '/images/flow/vis-008-trading-system-flow.svg',
    must: ['示意图'],
  },
  {
    path: '/images/concept/vis-019-backtest.svg',
    must: ['示意图', '胜率'],
  },
  {
    path: '/images/concept/vis-020-case-study.svg',
    must: ['示意图', '作业纸'],
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

console.log('\nAll Sprint 007 link checks passed')
