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
  candles: ChartCandle[]
  overlays?: {
    ema20?: Array<number | null>
    sma20?: Array<number | null>
    bbUpper?: Array<number | null>
    bbMid?: Array<number | null>
    bbLower?: Array<number | null>
  }
  atr?: Array<number | null>
  markers?: ChartSwingMarker[]
  macd?: ChartMacd
  rsi?: Array<number | null>
  oi?: Array<number | null>
  oiContracts?: Array<number | null>
  funding?: Array<number | null>
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
