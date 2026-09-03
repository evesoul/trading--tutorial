export interface NavItem {
  to: string
  label: string
  match: 'exact' | 'prefix'
}

export interface StageMeta {
  part: number
  label: string
  sentence: string
  to: string
}

export interface LessonNeighbor {
  slug: string
  title: string
  path: string | null
  reason: string
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: '首页', match: 'exact' },
  { to: '/course', label: '怎么学', match: 'exact' },
  { to: '/indicators', label: '指标', match: 'prefix' },
  { to: '/combinations', label: '组合', match: 'prefix' },
  { to: '/trading-system', label: '交易系统', match: 'prefix' },
  { to: '/glossary', label: '术语', match: 'exact' },
]

export const LEARNING_STAGES: StageMeta[] = [
  {
    part: 1,
    label: '指标',
    sentence: '每一个指标只回答一个观察问题，先学会看图。',
    to: '/indicators',
  },
  {
    part: 2,
    label: '组合',
    sentence: '多个指标何时互相支持、何时打架，对照着看。',
    to: '/combinations',
  },
  {
    part: 3,
    label: '交易系统',
    sentence: '把观察写成可重复的规则，并管住仓位和风险。',
    to: '/trading-system',
  },
]

export const MAIN_PATH_SLUGS = [
  'kline',
  'trendlines',
  'ma',
  'ema',
  'rsi',
  'volume',
  'macd',
  'kdj',
  'bollinger-bands',
] as const

export const CONTRACT_PATH_SLUGS = [
  'open-interest',
  'funding-rate',
  'long-short-ratio',
  'cvd',
] as const

export const COMBINATION_PATH_SLUGS = [
  'trend-momentum',
  'trend-volume',
  'rsi-macd',
  'price-oi',
  'oi-volume',
  'funding-oi',
  'multi-indicator',
] as const

export const SYSTEM_PATH_SLUGS = [
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
] as const

const PLANNED_TITLES: Record<string, string> = {
  introduction: '怎么学这门课',
  kline: 'K 线',
  trendlines: '趋势线与支撑阻力',
  ma: 'MA 移动平均线',
  ema: 'EMA 指数移动平均线',
  rsi: 'RSI 相对强弱指标',
  volume: '成交量',
  macd: 'MACD',
  kdj: 'KDJ',
  'bollinger-bands': '布林带',
  'open-interest': '持仓量',
  'funding-rate': '资金费率',
  'long-short-ratio': '多空比',
  cvd: '累计成交量差',
  'trend-momentum': '趋势 + 动量',
  'trend-volume': '趋势 + 成交量',
  'rsi-macd': 'RSI + MACD',
  'price-oi': '价格 + 持仓量',
  'oi-volume': '持仓量 + 成交量',
  'funding-oi': '资金费率 + 持仓量',
  'multi-indicator': '多指标共振',
  'what-is-a-trading-system': '什么是交易系统',
  'market-regime': '市场环境',
  direction: '方向判断',
  'entry-rules': '入场规则',
  'exit-rules': '出场规则',
  'stop-loss': '止损',
  'take-profit': '止盈',
  'position-sizing': '仓位管理',
  'risk-management': '风险管理',
  'trade-frequency': '交易频率',
  'trading-journal': '交易日志',
  backtesting: '回测',
  statistics: '数据统计',
  'system-optimization': '系统优化',
  'case-study': '完整交易系统案例',
}

const NEXT_REASONS: Record<string, string> = {
  kline: '先认清一根 K 线的开高低收，后面的指标都从这里来。',
  trendlines: '会读 OHLC 之后，先手连高低点，再学均线。',
  ma: '手画结构之后，再用均线看算法平滑。',
  ema: '对比加权后的均线，看它为何更贴近期价格。',
  rsi: '有了趋势参照之后，再用尺子看涨跌动能。',
  volume: '价格涨跌之后，再看成交量有没有跟上。',
  macd: '用均线派生出的 DIF、DEA 和柱状图，对照趋势和动能。',
  kdj: '和 RSI 对照另一把动能尺子，看刻度有何不同。',
  'bollinger-bands': '用价格通道看波动是收窄还是张开。',
  'open-interest': '先有成交量对照，再看此刻还挂着多少仓。',
  'funding-rate': '有了仓位规模，再看谁在为持仓付费、费率偏到哪边。',
  'long-short-ratio': '看完存量和费率，再看多空结构怎么倾斜，并先问口径。',
  cvd: '最后看主动买减主动卖的累计净额，和成交量、持仓量分开。',
  'trend-momentum': '先用已学的均线和动能对照，看方向还在时力度有没有跟上。',
  'trend-volume': '方向清楚之后，再对照成交量是不是另一个独立问题。',
  'rsi-macd': '两把动能尺子并列，一致或分歧只说明观察冲突，不自动给方向。',
  'price-oi': '进入合约持仓，先看价格和仓位规模怎么一起变。',
  'oi-volume': '仓和量常被当成一回事，这里专门拆开存量与流量。',
  'funding-oi': '有了仓位规模，再看谁在为持仓付费、市场是否拥挤。',
  'multi-indicator': '收束：多个问题得到相近答案，不是条件叠得越多越可靠。',
  'what-is-a-trading-system': '先建立理念、规则和记录，打破「找一个准指标」的预期。',
  'market-regime': '同一观察在趋势和震荡里读法不同，先定环境再谈方向。',
  direction: '只回答偏多、偏空或不交易，不把入场细节混进来。',
  'entry-rules': '环境和方向清楚之后，再写哪些观察同时满足才允许开仓。',
  'exit-rules': '先有「何时离开」的框架，再拆止损和止盈。',
  'stop-loss': '永续合约有爆仓风险，止损规则要早于止盈和加仓。',
  'take-profit': '和止损成对：目标是可检查的规则，不是尽量拿到最多。',
  'position-sizing': '有了止损定义，再谈单笔亏损是否可承受。',
  'risk-management': '从单笔仓位升到账户层：杠杆、保证金和禁止交易条件。',
  'trade-frequency': '有了风险边界，再看频率如何影响手续费、滑点和情绪。',
  'trading-journal': '没有记录就谈不上优化，先把执行过程写下来。',
  backtesting: '回测用来检验规则是否可执行，不是寻找曲线最好的参数。',
  statistics: '胜率只是其中一个数字，还要看回撤、盈亏比、样本和成本。',
  'system-optimization': '有了统计之后才谈调整，并单独写过拟合风险。',
  'case-study': '用一份教学案例把前面的规则串起来，说明过程，不证明有效。',
}

export function plannedLessonTitle(slug: string): string {
  return PLANNED_TITLES[slug] ?? slug
}

export function nextReason(slug: string): string {
  return NEXT_REASONS[slug] ?? ''
}

export function categoryPart(category: string): number {
  switch (category) {
    case 'introduction':
      return 0
    case 'indicators':
      return 1
    case 'combinations':
      return 2
    case 'trading-system':
      return 3
    default:
      return 0
  }
}

export function partLabel(part: number): string {
  if (part === 0) {
    return '导学'
  }
  const stage = LEARNING_STAGES.find(item => item.part === part)
  return stage?.label ?? `第 ${part} 部分`
}

export function levelLabel(level: string): string {
  switch (level) {
    case 'beginner':
      return '入门'
    case 'intermediate':
      return '进阶'
    case 'advanced':
      return '深入'
    default:
      return level
  }
}

export function isNavActive(path: string, item: NavItem): boolean {
  if (item.match === 'exact') {
    return path === item.to
  }
  return path === item.to || path.startsWith(`${item.to}/`)
}
