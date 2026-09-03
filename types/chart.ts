export const REAL_CHART_IDS = [
  'vis-101',
  'vis-102',
  'vis-103',
  'vis-104',
  'vis-105',
  'vis-106',
  'vis-107',
  'vis-108',
  'vis-109',
  'vis-110',
  'vis-111',
  'vis-112',
  'vis-113',
  'vis-114',
  'vis-115',
  'vis-116',
  'vis-117',
  'vis-118',
  'vis-119',
  'vis-120',
  'vis-121',
  'vis-122',
  'vis-123',
  'vis-124',
  'vis-125',
  'vis-126',
  'vis-127',
  'vis-128',
  'vis-129',
  'vis-130',
] as const

export type RealChartId = (typeof REAL_CHART_IDS)[number]

export interface ChartCandle {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  baseVolume?: number
}

export interface ChartMacd {
  dif: Array<number | null>
  dea: Array<number | null>
  hist: Array<number | null>
}

export interface ChartPeriod {
  start: string
  end: string
}

export interface ChartGuidePoint {
  time: number
  price: number
}

export interface ChartTrendlineGuide {
  id: string
  type: 'trendline'
  role: 'teaching' | 'practice'
  label: string
  from: ChartGuidePoint
  to: ChartGuidePoint
}

export interface ChartLevelGuide {
  id: string
  type: 'level'
  role: 'teaching' | 'practice'
  label: string
  price: number
}

export type ChartGuide = ChartTrendlineGuide | ChartLevelGuide

export interface ChartSwingMarker {
  time: number
  price: number
  label: string
  position: 'aboveBar' | 'belowBar'
}

export type DrawMode = 'idle' | 'level' | 'trendline'

export interface ChartPayload {
  id: string
  title: string
  symbol: string
  source: string
  market: string
  timeframe: string
  disclaimer: string
  teachingQuestion: string
  capturedAt: string
  period: ChartPeriod
  volumeUnit?: string
  oiUnit?: string
  fundingUnit?: string
  atrUnit?: string
  lsrUnit?: string
  cvdUnit?: string
  candles: ChartCandle[]
  overlays?: {
    ema20?: Array<number | null>
    sma20?: Array<number | null>
    bbUpper?: Array<number | null>
    bbMid?: Array<number | null>
    bbLower?: Array<number | null>
    emaHigher?: Array<number | null>
  }
  atr?: Array<number | null>
  markers?: ChartSwingMarker[]
  macd?: ChartMacd
  rsi?: Array<number | null>
  oi?: Array<number | null>
  oiContracts?: Array<number | null>
  funding?: Array<number | null>
  lsrAccounts?: Array<number | null>
  lsrTopPositions?: Array<number | null>
  cvd?: Array<number | null>
  delta?: Array<number | null>
  panels: string[]
  parameters?: Record<string, string | number>
  drawTools?: boolean
  guides?: ChartGuide[]
}

export const REAL_CHART_SNAPSHOTS: Record<RealChartId, string> = {
  'vis-101': '/images/indicator/vis-101-kline-real.svg',
  'vis-102': '/images/indicator/vis-102-ema-real.svg',
  'vis-103': '/images/indicator/vis-103-macd-real.svg',
  'vis-104': '/images/indicator/vis-104-rsi-real.svg',
  'vis-105': '/images/indicator/vis-105-volume-real.svg',
  'vis-106': '/images/indicator/vis-106-oi-real.svg',
  'vis-107': '/images/indicator/vis-107-funding-real.svg',
  'vis-108': '/images/indicator/vis-108-trendlines-real.svg',
  'vis-109': '/images/indicator/vis-109-market-structure-real.svg',
  'vis-110': '/images/indicator/vis-110-atr-real.svg',
  'vis-111': '/images/indicator/vis-111-ma-real.svg',
  'vis-112': '/images/indicator/vis-112-bollinger-real.svg',
  'vis-113': '/images/combination/vis-113-trend-momentum-real.svg',
  'vis-114': '/images/combination/vis-114-alignment-fail-real.svg',
  'vis-115': '/images/indicator/vis-115-lsr-real.svg',
  'vis-116': '/images/indicator/vis-116-cvd-real.svg',
  'vis-117': '/images/indicator/vis-117-cascade-real.svg',
  'vis-118': '/images/system/vis-118-case-timeline-real.svg',
  'vis-119': '/images/combination/vis-119-trend-volume-real.svg',
  'vis-120': '/images/combination/vis-120-price-oi-real.svg',
  'vis-121': '/images/combination/vis-121-oi-volume-real.svg',
  'vis-122': '/images/combination/vis-122-funding-oi-real.svg',
  'vis-123': '/images/combination/vis-123-rsi-macd-real.svg',
  'vis-124': '/images/system/vis-124-regime-real.svg',
  'vis-125': '/images/system/vis-125-direction-real.svg',
  'vis-126': '/images/system/vis-126-mtf-real.svg',
  'vis-127': '/images/system/vis-127-entry-real.svg',
  'vis-128': '/images/system/vis-128-stop-real.svg',
  'vis-129': '/images/system/vis-129-exit-real.svg',
  'vis-130': '/images/system/vis-130-take-profit-real.svg',
}

export function isRealChartId(value: string): value is RealChartId {
  return (REAL_CHART_IDS as readonly string[]).includes(value)
}

export function formatChartPeriod(period: ChartPeriod): string {
  return `${period.start.slice(0, 10)} → ${period.end.slice(0, 10)} UTC`
}

export function compactNumber(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`
  }
  if (abs >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`
  }
  if (abs >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`
  }
  return value.toFixed(abs >= 1 ? 0 : 4)
}
