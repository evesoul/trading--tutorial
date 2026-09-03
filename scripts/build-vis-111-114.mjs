/**
 * Build vis-111–114 from the frozen vis-101 window.
 * Does not call Binance. Combination windows are single-tape teaching, not a terminal.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function sma(values, length) {
  const out = Array.from({ length: values.length }, () => null)
  let sum = 0
  for (let i = 0; i < values.length; i += 1) {
    sum += values[i]
    if (i >= length) {
      sum -= values[i - length]
    }
    if (i >= length - 1) {
      out[i] = sum / length
    }
  }
  return out
}

function ema(values, length) {
  const k = 2 / (length + 1)
  const out = Array.from({ length: values.length }, () => null)
  if (values.length < length) {
    return out
  }
  let prev = values.slice(0, length).reduce((sum, value) => sum + value, 0) / length
  out[length - 1] = prev
  for (let i = length; i < values.length; i += 1) {
    prev = values[i] * k + prev * (1 - k)
    out[i] = prev
  }
  return out
}

function wilderRsi(closes, length = 14) {
  const out = Array.from({ length: closes.length }, () => null)
  if (closes.length <= length) {
    return out
  }
  let gain = 0
  let loss = 0
  for (let i = 1; i <= length; i += 1) {
    const change = closes[i] - closes[i - 1]
    if (change >= 0) {
      gain += change
    }
    else {
      loss -= change
    }
  }
  let avgGain = gain / length
  let avgLoss = loss / length
  out[length] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss)
  for (let i = length + 1; i < closes.length; i += 1) {
    const change = closes[i] - closes[i - 1]
    avgGain = (avgGain * (length - 1) + (change > 0 ? change : 0)) / length
    avgLoss = (avgLoss * (length - 1) + (change < 0 ? -change : 0)) / length
    out[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss)
  }
  return out
}

function bollinger(closes, length = 20, k = 2) {
  const mid = sma(closes, length)
  const upper = []
  const lower = []
  for (let i = 0; i < closes.length; i += 1) {
    if (mid[i] == null) {
      upper.push(null)
      lower.push(null)
      continue
    }
    let sum = 0
    for (let j = i - length + 1; j <= i; j += 1) {
      sum += (closes[j] - mid[i]) ** 2
    }
    const sd = Math.sqrt(sum / length)
    upper.push(mid[i] + k * sd)
    lower.push(mid[i] - k * sd)
  }
  return { mid, upper, lower }
}

function svgEsc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function candleBodies(candles, x, yPrice, barW) {
  let bodies = ''
  candles.forEach((bar, i) => {
    const color = bar.close >= bar.open ? '#16a34a' : '#dc2626'
    const top = yPrice(Math.max(bar.open, bar.close))
    const bottom = yPrice(Math.min(bar.open, bar.close))
    bodies += `<line x1="${x(i)}" y1="${yPrice(bar.high)}" x2="${x(i)}" y2="${yPrice(bar.low)}" stroke="${color}" stroke-width="1"/>`
    bodies += `<rect x="${x(i) - barW / 2}" y="${top}" width="${barW}" height="${Math.max(1, bottom - top)}" fill="${color}"/>`
  })
  return bodies
}

function polyline(values, x, y, color, width = 1.6, dash = '') {
  const pts = values
    .map((value, i) => (value == null ? '' : `${x(i)},${y(value)}`))
    .filter(Boolean)
    .join(' ')
  const dashAttr = dash ? ` stroke-dasharray="${dash}"` : ''
  return `<polyline fill="none" stroke="${color}" stroke-width="${width}"${dashAttr} points="${pts}"/>`
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

function renderPriceOverlaySvg(chart, overlays) {
  const pad = { l: 64, r: 24, t: 72, b: 86 }
  const candles = chart.candles
  const min = Math.min(...candles.map(bar => bar.low))
  const max = Math.max(...candles.map(bar => bar.high))
  const plotW = 960 - pad.l - pad.r
  const plotH = 560 - pad.t - pad.b
  const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
  const y = price => pad.t + (1 - (price - min) / (max - min || 1)) * plotH
  const barW = Math.max(2, plotW / candles.length * 0.62)
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 560" width="960" height="560" role="img" aria-labelledby="title desc">
  <title id="title">${svgEsc(chart.title)}</title>
  <desc id="desc">${svgEsc(chart.teachingQuestion)} ${svgEsc(chart.disclaimer)}</desc>
  ${header(chart, period)}
  <rect x="${pad.l}" y="${pad.t}" width="${plotW}" height="${plotH}" fill="#fff" stroke="#d9d0c0"/>
  ${candleBodies(candles, x, y, barW)}
  ${overlays}
  ${footer(chart, period)}
</svg>
`
}

function renderStackedSvg(chart, emaLine, rsi, markers = []) {
  const pad = { l: 64, r: 24, t: 72, b: 86 }
  const candles = chart.candles
  const min = Math.min(...candles.map(bar => bar.low))
  const max = Math.max(...candles.map(bar => bar.high))
  const rsiVals = rsi.filter(value => value != null)
  const rsiMin = Math.min(20, ...rsiVals)
  const rsiMax = Math.max(80, ...rsiVals)
  const plotW = 960 - pad.l - pad.r
  const priceH = 250
  const rsiH = 108
  const priceTop = pad.t
  const rsiTop = pad.t + priceH + 16
  const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
  const yPrice = price => priceTop + (1 - (price - min) / (max - min || 1)) * priceH
  const yRsi = value => rsiTop + (1 - (value - rsiMin) / (rsiMax - rsiMin || 1)) * rsiH
  const barW = Math.max(2, plotW / candles.length * 0.62)
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  let extras = polyline(emaLine, x, yPrice, '#7c3aed', 1.8)
  for (const marker of markers) {
    const index = candles.findIndex(bar => bar.time === marker.time)
    if (index < 0) {
      continue
    }
    extras += `<text x="${x(index)}" y="${marker.position === 'aboveBar' ? yPrice(marker.price) - 8 : yPrice(marker.price) + 16}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" font-weight="700" fill="${marker.position === 'aboveBar' ? '#b91c1c' : '#15803d'}">${svgEsc(marker.label)}</text>`
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 560" width="960" height="560" role="img" aria-labelledby="title desc">
  <title id="title">${svgEsc(chart.title)}</title>
  <desc id="desc">${svgEsc(chart.teachingQuestion)} ${svgEsc(chart.disclaimer)}</desc>
  ${header(chart, period)}
  <rect x="${pad.l}" y="${priceTop}" width="${plotW}" height="${priceH}" fill="#fff" stroke="#d9d0c0"/>
  ${candleBodies(candles, x, yPrice, barW)}
  ${extras}
  <rect x="${pad.l}" y="${rsiTop}" width="${plotW}" height="${rsiH}" fill="#fff" stroke="#d9d0c0"/>
  ${polyline(rsi, x, yRsi, '#1a4d56', 1.8)}
  <text x="${pad.l + 8}" y="${rsiTop + 16}" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#1a4d56">RSI14 · 力度槽，不是开仓指令</text>
  ${footer(chart, period)}
</svg>
`
}

const source = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const candles = source.candles
const closes = candles.map(bar => bar.close)
const sma20 = sma(closes, 20)
const ema20 = ema(closes, 20)
const rsi = wilderRsi(closes, 14)
const bands = bollinger(closes, 20, 2)
const capturedAt = new Date().toISOString()
const shared = {
  capturedAt,
  symbol: source.symbol,
  source: source.source,
  market: source.market,
  disclaimer: source.disclaimer,
  period: source.period,
  timeframe: '4h',
  volumeUnit: source.volumeUnit,
  candles,
}

const vis111 = {
  ...shared,
  id: 'vis-111',
  title: 'MA 真实行情教学窗',
  teachingQuestion: '先看均线斜率与价格在哪一侧。金叉死叉是滞后观察，走平缠绕时交叉会反复。',
  overlays: { sma20 },
  panels: ['ohlc'],
  parameters: { maPeriod: 20, maMethod: 'SMA' },
}

const vis112 = {
  ...shared,
  id: 'vis-112',
  title: '布林带真实行情教学窗',
  teachingQuestion: '中轨是 SMA。带宽收口只说明最近波动小；碰上轨不是卖点，碰下轨不是买点。',
  overlays: { bbMid: bands.mid, bbUpper: bands.upper, bbLower: bands.lower },
  panels: ['ohlc'],
  parameters: { bbPeriod: 20, bbK: 2, bbMid: 'SMA' },
}

const lift = candles.find(bar => bar.time === Date.parse('2024-10-27T00:00:00Z') / 1000)
  || candles.find((_, i) => rsi[i] != null && rsi[i] < 51 && rsi[i + 3] != null && rsi[i + 3] > rsi[i] + 5)
const failAlign = candles.find(bar => bar.high === 69566)
const failDump = candles.find(bar => bar.low === 66536.5)

const vis113 = {
  ...shared,
  id: 'vis-113',
  title: '趋势 + 动量真实行情教学窗',
  teachingQuestion: 'EMA 管方向，RSI 管力度。回落后再抬头，只说明力度喘息，不是开多指令。',
  overlays: { ema20 },
  rsi,
  panels: ['ohlc', 'rsi'],
  parameters: { emaPeriod: 20, rsiPeriod: 14, rsiMethod: 'Wilder' },
  markers: lift
    ? [{ time: lift.time, price: lift.low, label: '力度回落', position: 'belowBar' }]
    : [],
}

const vis114 = {
  ...shared,
  id: 'vis-114',
  title: '对齐后仍失败教学窗',
  teachingQuestion: '方向、力度、流量可以暂时同向，随后价格仍折返。对齐不是胜率放大器。',
  overlays: { ema20 },
  rsi,
  panels: ['ohlc', 'volume', 'rsi'],
  parameters: { emaPeriod: 20, rsiPeriod: 14, rsiMethod: 'Wilder' },
  markers: [
    failAlign && { time: failAlign.time, price: failAlign.high, label: '三槽对齐', position: 'aboveBar' },
    failDump && { time: failDump.time, price: failDump.low, label: '随后折返', position: 'belowBar' },
  ].filter(Boolean),
}

if (!failAlign || !failDump) {
  throw new Error('vis-114 markers missing on vis-101 window')
}

const pad = { l: 64, r: 24, t: 72, b: 86 }
const min = Math.min(...candles.map(bar => bar.low))
const max = Math.max(...candles.map(bar => bar.high))
const plotW = 960 - pad.l - pad.r
const plotH = 560 - pad.t - pad.b
const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
const y = price => pad.t + (1 - (price - min) / (max - min || 1)) * plotH

await mkdir(join(root, 'public/images/combination'), { recursive: true })
await writeFile(join(root, 'public/data/charts/vis-111.json'), `${JSON.stringify(vis111, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-112.json'), `${JSON.stringify(vis112, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-113.json'), `${JSON.stringify(vis113, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-114.json'), `${JSON.stringify(vis114, null, 2)}\n`)
await writeFile(join(root, 'public/images/indicator/vis-111-ma-real.svg'), renderPriceOverlaySvg(vis111, polyline(sma20, x, y, '#1d4ed8', 1.8)))
await writeFile(join(root, 'public/images/indicator/vis-112-bollinger-real.svg'), renderPriceOverlaySvg(vis112, [
  polyline(bands.upper, x, y, '#64748b', 1.2, '6 4'),
  polyline(bands.mid, x, y, '#0f766e', 1.8),
  polyline(bands.lower, x, y, '#64748b', 1.2, '6 4'),
].join('\n  ')))
await writeFile(join(root, 'public/images/combination/vis-113-trend-momentum-real.svg'), renderStackedSvg(vis113, ema20, rsi, vis113.markers))
await writeFile(join(root, 'public/images/combination/vis-114-alignment-fail-real.svg'), renderStackedSvg(vis114, ema20, rsi, vis114.markers))

console.log('vis-111–114 written from vis-101', {
  lift: lift && new Date(lift.time * 1000).toISOString(),
  align: new Date(failAlign.time * 1000).toISOString(),
  dump: new Date(failDump.time * 1000).toISOString(),
})
