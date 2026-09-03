import {
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  HistogramSeries,
  LineSeries,
  LineStyle,
  type IChartApi,
  type ISeriesApi,
  type MouseEventParams,
  type SeriesType,
  type UTCTimestamp,
} from 'lightweight-charts'
import type { ChartPayload } from '../../types/chart'
import { compactNumber } from '../../types/chart'

const YANG = '#15803d'
const YIN = '#b91c1c'
const EMA = '#7c3aed'
const DIF = '#2563eb'
const DEA = '#d97706'
const RSI = '#1a4d56'
const OI = '#0f172a'
const ZERO = '#94a3b8'

export interface TeachingChartHandle {
  destroy: () => void
  resize: (width: number) => void
}

type SeriesMap = Map<string, ISeriesApi<SeriesType>>

function asTime(value: number): UTCTimestamp {
  return value as UTCTimestamp
}

function linePoints(times: number[], values: Array<number | null>) {
  return times.flatMap((time, index) => {
    const value = values[index]
    return value == null ? [] : [{ time: asTime(time), value }]
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCandlePoint(value: unknown): value is { open: number, high: number, low: number, close: number } {
  return isRecord(value)
    && typeof value.open === 'number'
    && typeof value.high === 'number'
    && typeof value.low === 'number'
    && typeof value.close === 'number'
}

function isValuePoint(value: unknown): value is { value: number } {
  return isRecord(value) && typeof value.value === 'number'
}

function formatPrice(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

function formatFunding(value: number): string {
  return `${(value * 100).toFixed(4)}%`
}

function compactAxis(value: number): string {
  return compactNumber(value)
}

export function formatChartReadout(param: MouseEventParams, series: SeriesMap): string {
  if (!param.time || !param.seriesData.size) {
    return '悬停看读数 · 滚轮缩放 · 拖动平移。冻结历史窗，不是直播行情。'
  }

  const parts: string[] = []
  const candleSeries = series.get('ohlc')
  const candle = candleSeries ? param.seriesData.get(candleSeries) : undefined
  if (isCandlePoint(candle)) {
    parts.push(`开 ${formatPrice(candle.open)}`)
    parts.push(`高 ${formatPrice(candle.high)}`)
    parts.push(`低 ${formatPrice(candle.low)}`)
    parts.push(`收 ${formatPrice(candle.close)}`)
  }

  const emaSeries = series.get('ema20')
  const emaPoint = emaSeries ? param.seriesData.get(emaSeries) : undefined
  if (isValuePoint(emaPoint)) {
    parts.push(`EMA20 ${formatPrice(emaPoint.value)}`)
  }

  const volumeSeries = series.get('volume')
  const volumePoint = volumeSeries ? param.seriesData.get(volumeSeries) : undefined
  if (isValuePoint(volumePoint)) {
    parts.push(`成交额 ${compactNumber(volumePoint.value)} USDT`)
  }

  const difSeries = series.get('dif')
  const deaSeries = series.get('dea')
  const histSeries = series.get('hist')
  const difPoint = difSeries ? param.seriesData.get(difSeries) : undefined
  const deaPoint = deaSeries ? param.seriesData.get(deaSeries) : undefined
  const histPoint = histSeries ? param.seriesData.get(histSeries) : undefined
  if (isValuePoint(difPoint)) {
    parts.push(`DIF ${formatPrice(difPoint.value)}`)
  }
  if (isValuePoint(deaPoint)) {
    parts.push(`DEA ${formatPrice(deaPoint.value)}`)
  }
  if (isValuePoint(histPoint)) {
    parts.push(`柱 ${formatPrice(histPoint.value)}`)
  }

  const rsiSeries = series.get('rsi')
  const rsiPoint = rsiSeries ? param.seriesData.get(rsiSeries) : undefined
  if (isValuePoint(rsiPoint)) {
    parts.push(`RSI ${rsiPoint.value.toFixed(1)}`)
  }

  const oiSeries = series.get('oi')
  const oiPoint = oiSeries ? param.seriesData.get(oiSeries) : undefined
  if (isValuePoint(oiPoint)) {
    parts.push(`OI ${compactNumber(oiPoint.value)} USDT`)
  }

  const fundingSeries = series.get('funding')
  const fundingPoint = fundingSeries ? param.seriesData.get(fundingSeries) : undefined
  if (isValuePoint(fundingPoint)) {
    parts.push(`费率 ${formatFunding(fundingPoint.value)}`)
  }

  return parts.join(' · ')
}

export function mountTeachingChart(
  host: HTMLElement,
  payload: ChartPayload,
  onReadout: (text: string) => void,
): TeachingChartHandle {
  const hasSubpane = payload.panels.some(panel => panel !== 'ohlc' && panel !== 'ema')
  const height = hasSubpane ? 500 : 360
  const times = payload.candles.map(bar => bar.time)

  const chart: IChartApi = createChart(host, {
    width: host.clientWidth || host.parentElement?.clientWidth || 640,
    height,
    layout: {
      background: { type: ColorType.Solid, color: '#fffdf8' },
      textColor: '#4f4a41',
      attributionLogo: true,
      fontFamily: 'PingFang SC, Hiragino Sans GB, Noto Sans SC, ui-sans-serif, system-ui, sans-serif',
    },
    grid: {
      vertLines: { color: '#eee6d8' },
      horzLines: { color: '#eee6d8' },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: '#d9d0c0',
    },
    timeScale: {
      borderColor: '#d9d0c0',
      timeVisible: true,
      secondsVisible: false,
    },
    handleScroll: {
      mouseWheel: true,
      pressedMouseMove: true,
      horzTouchDrag: true,
      vertTouchDrag: false,
    },
    handleScale: {
      mouseWheel: true,
      pinch: true,
      axisPressedMouseMove: true,
    },
  })

  const series: SeriesMap = new Map()

  const candles = chart.addSeries(CandlestickSeries, {
    upColor: YANG,
    downColor: YIN,
    borderVisible: false,
    wickUpColor: YANG,
    wickDownColor: YIN,
    lastValueVisible: true,
    priceLineVisible: false,
  }, 0)

  candles.setData(payload.candles.map(bar => ({
    time: asTime(bar.time),
    open: bar.open,
    high: bar.high,
    low: bar.low,
    close: bar.close,
  })))
  series.set('ohlc', candles)

  if (payload.overlays?.ema20) {
    const ema = chart.addSeries(LineSeries, {
      color: EMA,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'EMA20',
    }, 0)
    ema.setData(linePoints(times, payload.overlays.ema20))
    series.set('ema20', ema)
  }

  if (payload.panels.includes('volume')) {
    const volume = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'custom', formatter: compactAxis, minMove: 1 },
      lastValueVisible: false,
      priceLineVisible: false,
      title: '成交额 USDT',
    }, 1)
    volume.setData(payload.candles.map(bar => ({
      time: asTime(bar.time),
      value: bar.volume,
      color: bar.close >= bar.open ? 'rgba(21, 128, 61, 0.45)' : 'rgba(185, 28, 28, 0.45)',
    })))
    series.set('volume', volume)
  }

  if (payload.panels.includes('macd') && payload.macd) {
    const dif = chart.addSeries(LineSeries, {
      color: DIF,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'DIF',
    }, 1)
    const dea = chart.addSeries(LineSeries, {
      color: DEA,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'DEA',
    }, 1)
    const hist = chart.addSeries(HistogramSeries, {
      lastValueVisible: false,
      priceLineVisible: false,
      title: '柱',
    }, 1)
    dif.setData(linePoints(times, payload.macd.dif))
    dea.setData(linePoints(times, payload.macd.dea))
    hist.setData(times.flatMap((time, index) => {
      const value = payload.macd?.hist[index]
      return value == null
        ? []
        : [{
            time: asTime(time),
            value,
            color: value >= 0 ? 'rgba(21, 128, 61, 0.55)' : 'rgba(185, 28, 28, 0.55)',
          }]
    }))
    dif.createPriceLine({
      price: 0,
      color: ZERO,
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: false,
      title: '零轴',
    })
    series.set('dif', dif)
    series.set('dea', dea)
    series.set('hist', hist)
  }

  if (payload.panels.includes('rsi') && payload.rsi) {
    const rsi = chart.addSeries(LineSeries, {
      color: RSI,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'RSI14',
      autoscaleInfoProvider: () => ({
        priceRange: { minValue: 15, maxValue: 85 },
      }),
    }, 1)
    rsi.setData(linePoints(times, payload.rsi))
    rsi.createPriceLine({
      price: 70,
      color: '#d97706',
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: '70',
    })
    rsi.createPriceLine({
      price: 30,
      color: '#2563eb',
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: '30',
    })
    series.set('rsi', rsi)
  }

  if (payload.panels.includes('oi') && payload.oi) {
    const oi = chart.addSeries(LineSeries, {
      color: OI,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'OI USDT',
      priceFormat: { type: 'custom', formatter: compactAxis, minMove: 1 },
    }, 1)
    oi.setData(linePoints(times, payload.oi))
    series.set('oi', oi)
  }

  if (payload.panels.includes('funding') && payload.funding) {
    const funding = chart.addSeries(HistogramSeries, {
      lastValueVisible: true,
      priceLineVisible: false,
      title: '费率',
      priceFormat: {
        type: 'custom',
        formatter: (value: number) => formatFunding(value),
        minMove: 0.000001,
      },
    }, 1)
    funding.setData(times.flatMap((time, index) => {
      const value = payload.funding?.[index]
      return value == null
        ? []
        : [{
            time: asTime(time),
            value,
            color: value >= 0 ? 'rgba(21, 128, 61, 0.55)' : 'rgba(185, 28, 28, 0.55)',
          }]
    }))
    funding.createPriceLine({
      price: 0,
      color: ZERO,
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: '零轴',
    })
    series.set('funding', funding)
  }

  const panes = chart.panes()
  if (panes[0]) {
    panes[0].setStretchFactor(hasSubpane ? 3 : 1)
  }
  if (panes[1]) {
    panes[1].setStretchFactor(1)
  }

  chart.timeScale().fitContent()

  const handleMove = (param: MouseEventParams) => {
    onReadout(formatChartReadout(param, series))
  }
  chart.subscribeCrosshairMove(handleMove)
  onReadout('悬停看读数 · 滚轮缩放 · 拖动平移。冻结历史窗，不是直播行情。')

  return {
    resize(width: number) {
      chart.applyOptions({ width, height })
    },
    destroy() {
      chart.unsubscribeCrosshairMove(handleMove)
      chart.remove()
    },
  }
}
