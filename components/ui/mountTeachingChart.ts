import {
  CandlestickSeries,
  ColorType,
  createChart,
  createSeriesMarkers,
  CrosshairMode,
  HistogramSeries,
  LineSeries,
  LineStyle,
  type IChartApi,
  type IPriceLine,
  type ISeriesApi,
  type MouseEventParams,
  type SeriesType,
  type UTCTimestamp,
} from 'lightweight-charts'
import type {
  ChartGuide,
  ChartLevelGuide,
  ChartPayload,
  ChartTrendlineGuide,
  DrawMode,
} from '../../types/chart'
import { compactNumber } from '../../types/chart'

const YANG = '#15803d'
const YIN = '#b91c1c'
const EMA = '#7c3aed'
const SMA = '#1d4ed8'
const BB = '#0f766e'
const BB_BAND = '#64748b'
const DIF = '#2563eb'
const DEA = '#d97706'
const RSI = '#1a4d56'
const OI = '#0f172a'
const ATR = '#0f766e'
const ZERO = '#94a3b8'

export interface TeachingChartHandle {
  destroy: () => void
  resize: (width: number) => void
  setDrawMode: (mode: DrawMode) => void
  clearPractice: () => void
  setTeachingVisible: (visible: boolean) => void
}

const GUIDE_TREND = '#2563eb'
const GUIDE_LEVEL = '#d97706'
const PRACTICE = '#0f766e'

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

function trendlinePoints(
  times: number[],
  from: { time: number, price: number },
  to: { time: number, price: number },
) {
  const span = to.time - from.time
  return times.map((time) => ({
    time: asTime(time),
    value: span === 0
      ? from.price
      : from.price + (to.price - from.price) * ((time - from.time) / span),
  }))
}

function isTrendlineGuide(guide: ChartGuide): guide is ChartTrendlineGuide {
  return guide.type === 'trendline'
}

function isLevelGuide(guide: ChartGuide): guide is ChartLevelGuide {
  return guide.type === 'level'
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

  const smaSeries = series.get('sma20')
  const smaPoint = smaSeries ? param.seriesData.get(smaSeries) : undefined
  if (isValuePoint(smaPoint)) {
    parts.push(`SMA20 ${formatPrice(smaPoint.value)}`)
  }

  const bbMidSeries = series.get('bbMid')
  const bbMidPoint = bbMidSeries ? param.seriesData.get(bbMidSeries) : undefined
  if (isValuePoint(bbMidPoint)) {
    parts.push(`中轨 ${formatPrice(bbMidPoint.value)}`)
  }

  const atrSeries = series.get('atr')
  const atrPoint = atrSeries ? param.seriesData.get(atrSeries) : undefined
  if (isValuePoint(atrPoint)) {
    parts.push(`ATR14 ${formatPrice(atrPoint.value)}`)
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
  const extraPanes = payload.panels.filter(panel => panel !== 'ohlc' && panel !== 'ema').length
  const hasSubpane = extraPanes > 0
  const height = extraPanes >= 2 ? 620 : extraPanes === 1 ? 500 : 360
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

  if (payload.markers?.length) {
    createSeriesMarkers(candles, payload.markers.map(marker => ({
      time: asTime(marker.time),
      position: marker.position,
      color: marker.position === 'aboveBar' ? YIN : YANG,
      shape: marker.position === 'aboveBar' ? 'arrowDown' : 'arrowUp',
      text: marker.label,
    })))
  }

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

  if (payload.overlays?.sma20) {
    const sma = chart.addSeries(LineSeries, {
      color: SMA,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'SMA20',
    }, 0)
    sma.setData(linePoints(times, payload.overlays.sma20))
    series.set('sma20', sma)
  }

  if (payload.overlays?.bbMid && payload.overlays.bbUpper && payload.overlays.bbLower) {
    const upper = chart.addSeries(LineSeries, {
      color: BB_BAND,
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      lastValueVisible: false,
      priceLineVisible: false,
      title: '上轨',
    }, 0)
    const mid = chart.addSeries(LineSeries, {
      color: BB,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: '中轨',
    }, 0)
    const lower = chart.addSeries(LineSeries, {
      color: BB_BAND,
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      lastValueVisible: false,
      priceLineVisible: false,
      title: '下轨',
    }, 0)
    upper.setData(linePoints(times, payload.overlays.bbUpper))
    mid.setData(linePoints(times, payload.overlays.bbMid))
    lower.setData(linePoints(times, payload.overlays.bbLower))
    series.set('bbUpper', upper)
    series.set('bbMid', mid)
    series.set('bbLower', lower)
  }

  let nextPane = 1
  const takePane = () => {
    const pane = nextPane
    nextPane += 1
    return pane
  }

  if (payload.panels.includes('volume')) {
    const volume = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'custom', formatter: compactAxis, minMove: 1 },
      lastValueVisible: false,
      priceLineVisible: false,
      title: '成交额 USDT',
    }, takePane())
    volume.setData(payload.candles.map(bar => ({
      time: asTime(bar.time),
      value: bar.volume,
      color: bar.close >= bar.open ? 'rgba(21, 128, 61, 0.45)' : 'rgba(185, 28, 28, 0.45)',
    })))
    series.set('volume', volume)
  }

  if (payload.panels.includes('macd') && payload.macd) {
    const pane = takePane()
    const dif = chart.addSeries(LineSeries, {
      color: DIF,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'DIF',
    }, pane)
    const dea = chart.addSeries(LineSeries, {
      color: DEA,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'DEA',
    }, pane)
    const hist = chart.addSeries(HistogramSeries, {
      lastValueVisible: false,
      priceLineVisible: false,
      title: '柱',
    }, pane)
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
    }, takePane())
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
    }, takePane())
    oi.setData(linePoints(times, payload.oi))
    series.set('oi', oi)
  }

  if (payload.panels.includes('atr') && payload.atr) {
    const atr = chart.addSeries(LineSeries, {
      color: ATR,
      lineWidth: 2,
      lastValueVisible: true,
      priceLineVisible: false,
      title: 'ATR14',
    }, takePane())
    atr.setData(linePoints(times, payload.atr))
    series.set('atr', atr)
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
    }, takePane())
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
  if (panes[2]) {
    panes[2].setStretchFactor(1)
  }

  chart.timeScale().fitContent()

  const teachingLines: ISeriesApi<'Line'>[] = []
  const teachingPriceLines: IPriceLine[] = []
  const practiceLines: ISeriesApi<'Line'>[] = []
  const practicePriceLines: IPriceLine[] = []
  let teachingVisible = true
  let drawMode: DrawMode = 'idle'
  let pendingTrend: { time: number, price: number } | null = null
  let practiceCount = 0

  function idleHint() {
    if (payload.drawTools) {
      return '悬停看读数 · 滚轮缩放 · 拖动平移。可用下方按钮练习划线。冻结历史窗，不是直播行情。'
    }
    return '悬停看读数 · 滚轮缩放 · 拖动平移。冻结历史窗，不是直播行情。'
  }

  function addTrendline(guide: ChartTrendlineGuide, color: string, dashed: boolean) {
    const line = chart.addSeries(LineSeries, {
      color,
      lineWidth: 2,
      lineStyle: dashed ? LineStyle.Dashed : LineStyle.Solid,
      lastValueVisible: false,
      priceLineVisible: false,
      crosshairMarkerVisible: false,
      title: guide.label,
    }, 0)
    line.setData(trendlinePoints(times, guide.from, guide.to))
    return line
  }

  function addLevel(guide: ChartLevelGuide, color: string) {
    return candles.createPriceLine({
      price: guide.price,
      color,
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: guide.label,
    })
  }

  function renderTeachingGuides() {
    for (const line of teachingLines) {
      chart.removeSeries(line)
    }
    teachingLines.length = 0
    for (const line of teachingPriceLines) {
      candles.removePriceLine(line)
    }
    teachingPriceLines.length = 0
    if (!teachingVisible || !payload.guides) {
      return
    }
    for (const guide of payload.guides) {
      if (guide.role !== 'teaching') {
        continue
      }
      if (isTrendlineGuide(guide)) {
        teachingLines.push(addTrendline(guide, GUIDE_TREND, false))
      }
      if (isLevelGuide(guide)) {
        teachingPriceLines.push(addLevel(guide, GUIDE_LEVEL))
      }
    }
  }

  function clearPractice() {
    for (const line of practiceLines) {
      chart.removeSeries(line)
    }
    practiceLines.length = 0
    for (const line of practicePriceLines) {
      candles.removePriceLine(line)
    }
    practicePriceLines.length = 0
    pendingTrend = null
    practiceCount = 0
  }

  function readClick(param: MouseEventParams): { time: number, price: number } | null {
    if (!param.point) {
      return null
    }
    const price = candles.coordinateToPrice(param.point.y)
    if (price == null || !Number.isFinite(price)) {
      return null
    }
    const timeValue = param.time == null
      ? chart.timeScale().coordinateToTime(param.point.x)
      : param.time
    if (typeof timeValue !== 'number') {
      return null
    }
    return { time: timeValue, price }
  }

  const handleMove = (param: MouseEventParams) => {
    if (drawMode === 'idle') {
      onReadout(formatChartReadout(param, series))
      return
    }
    const clicked = readClick(param)
    if (!clicked) {
      onReadout(drawMode === 'level'
        ? '练习水平位：点图上某处取价。'
        : pendingTrend
          ? '练习趋势线：再点第二个点。'
          : '练习趋势线：先点第一个点。')
      return
    }
    onReadout(`取价 ${formatPrice(clicked.price)}`)
  }

  const handleClick = (param: MouseEventParams) => {
    if (drawMode === 'idle') {
      return
    }
    const clicked = readClick(param)
    if (!clicked) {
      return
    }
    practiceCount += 1
    if (drawMode === 'level') {
      practicePriceLines.push(addLevel({
        id: `practice-level-${practiceCount}`,
        type: 'level',
        role: 'practice',
        label: `练习位 ${practiceCount}`,
        price: clicked.price,
      }, PRACTICE))
      onReadout(`已画水平位 ${formatPrice(clicked.price)}。可继续点，或清除练习线。`)
      return
    }
    if (!pendingTrend) {
      pendingTrend = clicked
      onReadout(`已记下第一点 ${formatPrice(clicked.price)}。再点第二个点连成趋势线。`)
      return
    }
    practiceLines.push(addTrendline({
      id: `practice-trend-${practiceCount}`,
      type: 'trendline',
      role: 'practice',
      label: `练习线 ${practiceCount}`,
      from: pendingTrend,
      to: clicked,
    }, PRACTICE, true))
    pendingTrend = null
    onReadout(`已连趋势线到 ${formatPrice(clicked.price)}。可继续点两点，或清除练习线。`)
  }

  renderTeachingGuides()
  chart.subscribeCrosshairMove(handleMove)
  chart.subscribeClick(handleClick)
  onReadout(idleHint())

  return {
    resize(width: number) {
      chart.applyOptions({ width, height })
    },
    setDrawMode(mode: DrawMode) {
      drawMode = mode
      pendingTrend = null
      host.style.cursor = mode === 'idle' ? '' : 'crosshair'
      if (mode === 'level') {
        onReadout('练习水平位：点图上某处取价。')
        return
      }
      if (mode === 'trendline') {
        onReadout('练习趋势线：先点第一个点，再点第二个点。')
        return
      }
      onReadout(idleHint())
    },
    clearPractice() {
      clearPractice()
      onReadout('已清除你画的练习线。教学线还在。')
    },
    setTeachingVisible(visible: boolean) {
      teachingVisible = visible
      renderTeachingGuides()
    },
    destroy() {
      chart.unsubscribeCrosshairMove(handleMove)
      chart.unsubscribeClick(handleClick)
      host.style.cursor = ''
      chart.remove()
    },
  }
}
