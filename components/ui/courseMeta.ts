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

export const MAIN_PATH_SLUGS = ['kline', 'ma', 'ema', 'rsi'] as const

export const UPCOMING_INDICATOR_TITLES = [
  'Volume',
  'MACD',
  'KDJ',
  'Bollinger Bands',
  'Open Interest',
  'Funding Rate',
  'Long/Short Ratio',
  'CVD',
] as const

const PLANNED_TITLES: Record<string, string> = {
  introduction: '怎么学这门课',
  kline: 'K 线',
  ma: 'MA 移动平均线',
  ema: 'EMA 指数移动平均线',
  rsi: 'RSI 相对强弱指标',
  volume: 'Volume',
  macd: 'MACD',
  kdj: 'KDJ',
  'bollinger-bands': 'Bollinger Bands',
  'open-interest': 'Open Interest',
  'funding-rate': 'Funding Rate',
  'long-short-ratio': 'Long/Short Ratio',
  cvd: 'CVD',
}

const NEXT_REASONS: Record<string, string> = {
  kline: '先认清一根 K 线的开高低收，后面的指标都从这里来。',
  ma: '先用均线看价格的平滑方向。',
  ema: '对比加权后的均线，看它为何更贴近期价格。',
  rsi: '有了趋势参照之后，再用尺子看涨跌动能。',
  volume: '下一课会看成交量是否支持价格变化；该课仍在编写。',
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
