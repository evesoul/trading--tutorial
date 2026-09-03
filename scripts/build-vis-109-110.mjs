/**
 * Build vis-109 / vis-110 from the frozen vis-101 window.
 * Does not call Binance. Not a live feed.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function wilderAtr(candles, length = 14) {
  const tr = candles.map((bar, index) => {
    if (index === 0) {
      return bar.high - bar.low
    }
    const prev = candles[index - 1].close
    return Math.max(
      bar.high - bar.low,
      Math.abs(bar.high - prev),
      Math.abs(bar.low - prev),
    )
  })
  const atr = Array.from({ length: candles.length }, () => null)
  if (candles.length < length) {
    return { tr, atr }
  }
  let seed = 0
  for (let i = 0; i < length; i += 1) {
    seed += tr[i]
  }
  atr[length - 1] = seed / length
  for (let i = length; i < candles.length; i += 1) {
    atr[i] = (atr[i - 1] * (length - 1) + tr[i]) / length
  }
  return { tr, atr }
}

function svgEsc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function candleBodies(candles, x, yPrice, barW, highlightIndex = -1) {
  let bodies = ''
  candles.forEach((bar, i) => {
    const color = bar.close >= bar.open ? '#16a34a' : '#dc2626'
    const top = yPrice(Math.max(bar.open, bar.close))
    const bottom = yPrice(Math.min(bar.open, bar.close))
    if (i === highlightIndex) {
      bodies += `<rect x="${x(i) - barW}" y="${yPrice(bar.high) - 4}" width="${barW * 2}" height="${yPrice(bar.low) - yPrice(bar.high) + 8}" fill="none" stroke="#c2410c" stroke-width="1.6"/>`
    }
    bodies += `<line x1="${x(i)}" y1="${yPrice(bar.high)}" x2="${x(i)}" y2="${yPrice(bar.low)}" stroke="${color}" stroke-width="1"/>`
    bodies += `<rect x="${x(i) - barW / 2}" y="${top}" width="${barW}" height="${Math.max(1, bottom - top)}" fill="${color}"/>`
  })
  return bodies
}

function header(chart, period) {
  return `
  <rect width="960" height="560" fill="#fffdf8"/>
  <text x="28" y="36" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="20" font-weight="700" fill="#0f172a">${svgEsc(chart.title)}</text>
  <rect x="792" y="16" width="140" height="28" rx="6" fill="#1a4d56"/>
  <text x="862" y="35" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" font-weight="600" fill="#fffdf8">真实行情</text>
  <text x="28" y="58" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#475569">${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)}</text>`
}

function footer(chart, period) {
  return `
  <text x="480" y="510" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" fill="#334155">${svgEsc(chart.teachingQuestion)}</text>
  <text x="480" y="538" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#64748b">真实行情 · ${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)} · 不构成交易建议</text>`
}

function renderStructureSvg(chart) {
  const width = 960
  const height = 560
  const pad = { l: 64, r: 24, t: 72, b: 86 }
  const candles = chart.candles
  const min = Math.min(...candles.map(bar => bar.low))
  const max = Math.max(...candles.map(bar => bar.high))
  const plotW = width - pad.l - pad.r
  const plotH = height - pad.t - pad.b
  const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
  const y = price => pad.t + (1 - (price - min) / (max - min || 1)) * plotH
  const barW = Math.max(2, plotW / candles.length * 0.62)
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  const bodies = candleBodies(candles, x, y, barW)
  const level = chart.guides?.find(guide => guide.type === 'level')
  let extras = ''
  if (level) {
    extras += `<line x1="${pad.l}" y1="${y(level.price)}" x2="${pad.l + plotW}" y2="${y(level.price)}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="6 4"/>`
    extras += `<text x="${pad.l + plotW - 8}" y="${y(level.price) - 6}" text-anchor="end" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#c2410c">${svgEsc(level.label)}</text>`
  }
  for (const marker of chart.markers ?? []) {
    const index = candles.findIndex(bar => bar.time === marker.time)
    if (index < 0) {
      continue
    }
    const above = marker.position === 'aboveBar'
    extras += `<text x="${x(index)}" y="${above ? y(marker.price) - 8 : y(marker.price) + 16}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" font-weight="700" fill="${above ? '#b91c1c' : '#15803d'}">${svgEsc(marker.label)}</text>`
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc">
  <title id="title">${svgEsc(chart.title)}</title>
  <desc id="desc">${svgEsc(chart.teachingQuestion)} ${svgEsc(chart.disclaimer)}</desc>
  ${header(chart, period)}
  <rect x="${pad.l}" y="${pad.t}" width="${plotW}" height="${plotH}" fill="#fff" stroke="#d9d0c0"/>
  ${bodies}
  ${extras}
  ${footer(chart, period)}
</svg>
`
}

function renderAtrSvg(chart, highlightIndex) {
  const width = 960
  const height = 560
  const pad = { l: 64, r: 24, t: 72, b: 86 }
  const candles = chart.candles
  const atr = chart.atr
  const min = Math.min(...candles.map(bar => bar.low))
  const max = Math.max(...candles.map(bar => bar.high))
  const atrValues = atr.filter(value => value != null)
  const atrMin = Math.min(...atrValues)
  const atrMax = Math.max(...atrValues)
  const plotW = width - pad.l - pad.r
  const priceH = 250
  const atrH = 108
  const priceTop = pad.t
  const atrTop = pad.t + priceH + 16
  const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
  const yPrice = price => priceTop + (1 - (price - min) / (max - min || 1)) * priceH
  const yAtr = value => atrTop + (1 - (value - atrMin) / (atrMax - atrMin || 1)) * atrH
  const barW = Math.max(2, plotW / candles.length * 0.62)
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  const bodies = candleBodies(candles, x, yPrice, barW, highlightIndex)
  const pts = atr
    .map((value, i) => (value == null ? '' : `${x(i)},${yAtr(value)}`))
    .filter(Boolean)
    .join(' ')
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc">
  <title id="title">${svgEsc(chart.title)}</title>
  <desc id="desc">${svgEsc(chart.teachingQuestion)} ${svgEsc(chart.disclaimer)}</desc>
  ${header(chart, period)}
  <rect x="${pad.l}" y="${priceTop}" width="${plotW}" height="${priceH}" fill="#fff" stroke="#d9d0c0"/>
  ${bodies}
  <text x="${pad.l + 8}" y="${priceTop + 16}" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#c2410c">橙框：TR 明显大于当时 ATR，记异常噪声</text>
  <rect x="${pad.l}" y="${atrTop}" width="${plotW}" height="${atrH}" fill="#fff" stroke="#d9d0c0"/>
  <polyline fill="none" stroke="#0f766e" stroke-width="1.8" points="${pts}"/>
  <text x="${pad.l + 8}" y="${atrTop + 16}" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#0f766e">ATR(14) Wilder · 相对自己由窄变宽</text>
  ${footer(chart, period)}
</svg>
`
}

const source = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const candles = source.candles
const { tr, atr } = wilderAtr(candles, 14)
const highlightIndex = atr.reduce((best, value, i) => {
  if (value == null) {
    return best
  }
  const ratio = tr[i] / value
  return ratio > best.ratio ? { i, ratio } : best
}, { i: -1, ratio: 0 }).i
const capturedAt = new Date().toISOString()

const vis109 = {
  capturedAt,
  symbol: source.symbol,
  source: source.source,
  market: source.market,
  disclaimer: source.disclaimer,
  period: source.period,
  id: 'vis-109',
  title: '摆动结构真实行情教学窗',
  timeframe: '4h',
  teachingQuestion: '先标已收盘高低点。回撤常见。影线扫过前高不等于收盘离开。',
  volumeUnit: source.volumeUnit,
  candles,
  panels: ['ohlc'],
  markers: [
    { time: candles.find(bar => bar.low === 62020).time, price: 62020, label: 'L', position: 'belowBar' },
    { time: candles.find(bar => bar.low === 66600).time, price: 66600, label: 'HL', position: 'belowBar' },
    { time: candles.find(bar => bar.high === 69000).time, price: 69000, label: 'HH', position: 'aboveBar' },
    { time: candles.find(bar => bar.high === 69566).time, price: 69566, label: '扫过', position: 'aboveBar' },
    { time: candles.find(bar => bar.low === 66536.5).time, price: 66536.5, label: '回撤', position: 'belowBar' },
  ],
  guides: [
    {
      id: 'prior-high-69k',
      type: 'level',
      role: 'teaching',
      label: '前高区约 69000',
      price: 69000,
    },
  ],
}

const vis110 = {
  capturedAt,
  symbol: source.symbol,
  source: source.source,
  market: source.market,
  disclaimer: source.disclaimer,
  period: source.period,
  id: 'vis-110',
  title: 'ATR 真实行情教学窗',
  timeframe: '4h',
  teachingQuestion: 'ATR 是近期波幅的尺子，不给方向。波动变宽时数值变大；单根远大于 ATR 只说明超出普通宽度。',
  volumeUnit: source.volumeUnit,
  atrUnit: 'USDT · Wilder ATR(14)',
  candles,
  atr,
  panels: ['ohlc', 'atr'],
  parameters: {
    atrPeriod: 14,
    atrMethod: 'Wilder',
  },
}

if (vis109.markers.some(marker => marker.time == null)) {
  throw new Error('vis-109 marker times missing; vis-101 window may have changed')
}

await writeFile(join(root, 'public/data/charts/vis-109.json'), `${JSON.stringify(vis109, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-110.json'), `${JSON.stringify(vis110, null, 2)}\n`)
await writeFile(join(root, 'public/images/indicator/vis-109-market-structure-real.svg'), renderStructureSvg(vis109))
await writeFile(join(root, 'public/images/indicator/vis-110-atr-real.svg'), renderAtrSvg(vis110, highlightIndex))

const valid = atr.map((value, i) => value == null ? null : { i, atr: value, tr: tr[i], ratio: tr[i] / value })
  .filter(Boolean)
console.log('vis-109 / vis-110 written from vis-101', {
  bars: candles.length,
  atrMin: Math.min(...valid.map(item => item.atr)).toFixed(1),
  atrMax: Math.max(...valid.map(item => item.atr)).toFixed(1),
  outlier: {
    time: new Date(candles[highlightIndex].time * 1000).toISOString(),
    tr: tr[highlightIndex].toFixed(1),
    atr: atr[highlightIndex].toFixed(1),
    ratio: (tr[highlightIndex] / atr[highlightIndex]).toFixed(2),
  },
})
