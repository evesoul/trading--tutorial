/**
 * Build vis-129–130 exit / take-profit teaching windows.
 * Reuses vis-101 candles and vis-110 ATR. Placeholder levels only.
 * Not a live feed. Not a trading terminal. No scorecard. No fills.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function at(candles, iso) {
  const time = Date.parse(iso) / 1000
  const index = candles.findIndex(bar => bar.time === time)
  return index >= 0 ? { index, bar: candles[index] } : null
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

function polyline(values, x, y, color, width = 1.6) {
  const pts = values
    .map((value, i) => (value == null ? '' : `${x(i)},${y(value)}`))
    .filter(Boolean)
    .join(' ')
  return `<polyline fill="none" stroke="${color}" stroke-width="${width}" points="${pts}"/>`
}

function renderSvg(chart, markers = []) {
  const height = 560
  const pad = { l: 64, r: 24, t: 72, b: 86 }
  const candles = chart.candles
  const min = Math.min(...candles.map(bar => bar.low))
  const max = Math.max(...candles.map(bar => bar.high))
  const plotW = 960 - pad.l - pad.r
  const priceH = height - pad.t - pad.b
  const priceTop = pad.t
  const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
  const yPrice = price => priceTop + (1 - (price - min) / (max - min || 1)) * priceH
  const barW = Math.max(2, plotW / candles.length * 0.62)
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  let extras = ''
  if (chart.overlays?.ema20) {
    extras += polyline(chart.overlays.ema20, x, yPrice, '#7c3aed', 1.8)
  }
  if (chart.guides) {
    for (const guide of chart.guides) {
      if (guide.type !== 'level') {
        continue
      }
      extras += `<line x1="${pad.l}" y1="${yPrice(guide.price)}" x2="${pad.l + plotW}" y2="${yPrice(guide.price)}" stroke="${guide.id.includes('target') ? '#15803d' : '#d97706'}" stroke-dasharray="5 4"/>`
      extras += `<text x="${pad.l + plotW - 8}" y="${yPrice(guide.price) - 6}" text-anchor="end" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="11" fill="${guide.id.includes('target') ? '#166534' : '#b45309'}">${svgEsc(guide.label)}</text>`
    }
  }
  for (const marker of markers) {
    const index = candles.findIndex(bar => bar.time === marker.time)
    if (index < 0) {
      continue
    }
    extras += `<text x="${x(index)}" y="${marker.position === 'aboveBar' ? yPrice(marker.price) - 8 : yPrice(marker.price) + 16}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="11" font-weight="700" fill="${marker.position === 'aboveBar' ? '#b91c1c' : '#15803d'}">${svgEsc(marker.label)}</text>`
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" width="960" height="${height}" role="img" aria-labelledby="title desc">
  <title id="title">${svgEsc(chart.title)}</title>
  <desc id="desc">${svgEsc(chart.teachingQuestion)} ${svgEsc(chart.disclaimer)}</desc>
  <rect width="960" height="${height}" fill="#fffdf8"/>
  <text x="28" y="36" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="20" font-weight="700" fill="#0f172a">${svgEsc(chart.title)}</text>
  <rect x="792" y="16" width="140" height="28" rx="6" fill="#1a4d56"/>
  <text x="862" y="35" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" font-weight="600" fill="#fffdf8">真实行情</text>
  <text x="28" y="58" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#475569">${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)}</text>
  <rect x="${pad.l}" y="${priceTop}" width="${plotW}" height="${priceH}" fill="#fff" stroke="#d9d0c0"/>
  ${candleBodies(candles, x, yPrice, barW)}
  ${extras}
  <text x="480" y="${height - 50}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" fill="#334155">${svgEsc(chart.teachingQuestion)}</text>
  <text x="480" y="${height - 22}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#64748b">真实行情 · ${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)} · 不构成交易建议</text>
</svg>
`
}

const source = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const vis110 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-110.json'), 'utf8'))
const candles = source.candles
const atr = vis110.atr
const ema20 = ema(candles.map(bar => bar.close), 20)

const invalid = at(candles, '2024-10-25T16:00:00.000Z')
const placeholder = at(candles, '2024-10-27T12:00:00.000Z')
const targetHit = at(candles, '2024-10-28T16:00:00.000Z')
const timeDoor = at(candles, '2024-10-28T20:00:00.000Z')
const afterTarget = at(candles, '2024-10-29T16:00:00.000Z')
if (!invalid || !placeholder || !targetHit || !timeDoor || !afterTarget) {
  throw new Error('exit markers missing on vis-101 window')
}

const stopPrice = placeholder.bar.close - 1.5 * atr[placeholder.index]
const oneR = placeholder.bar.close - stopPrice
const targetPrice = placeholder.bar.close + 2 * oneR
if (targetHit.bar.high < targetPrice || targetHit.bar.low <= stopPrice) {
  throw new Error('placeholder 2R / stop geometry changed')
}

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
  overlays: { ema20 },
  atr,
  atrUnit: vis110.atrUnit,
  panels: ['ohlc'],
}

const guides = [
  {
    id: 'vis-129-stop',
    type: 'level',
    role: 'teaching',
    label: '认错门（教学占位）',
    price: stopPrice,
  },
  {
    id: 'vis-129-target',
    type: 'level',
    role: 'teaching',
    label: '目标门 2R（教学占位）',
    price: targetPrice,
  },
]

const vis129 = {
  ...shared,
  id: 'vis-129',
  title: '出场规则教学窗',
  teachingQuestion: '四扇门事先写好：认错、目标、时间、失效。本窗目标线先被碰到，时间句没轮到。没有成交，不是成绩。',
  parameters: {
    placeholderEntry: '2024-10-27T12:00:00.000Z',
    stopMultiple: 1.5,
    targetR: 2,
    timeBars: 8,
    fillStatus: 'none',
    scorecard: 'none',
  },
  guides,
  markers: [
    { time: invalid.bar.time, price: invalid.bar.low, label: '失效离开', position: 'belowBar' },
    { time: placeholder.bar.time, price: placeholder.bar.low, label: '入场占位', position: 'belowBar' },
    { time: targetHit.bar.time, price: targetHit.bar.high, label: '目标门先到', position: 'aboveBar' },
    { time: timeDoor.bar.time, price: timeDoor.bar.close, label: '时间门未轮到', position: 'belowBar' },
  ],
}

const vis130 = {
  ...shared,
  id: 'vis-130',
  title: '止盈教学窗',
  teachingQuestion: '目标是规则，不是拿到最多。第一目标之后价格还走了一截，不证明该改成永不减仓。没有成交，不是成绩。',
  parameters: {
    placeholderEntry: '2024-10-27T12:00:00.000Z',
    stopMultiple: 1.5,
    targetR: 2,
    fillStatus: 'none',
    scorecard: 'none',
  },
  guides: [
    { ...guides[0], id: 'vis-130-stop', label: '1R 认错（教学占位）' },
    { ...guides[1], id: 'vis-130-target', label: '2R 第一目标（教学占位）' },
  ],
  markers: [
    { time: placeholder.bar.time, price: placeholder.bar.low, label: '尺子起点', position: 'belowBar' },
    { time: targetHit.bar.time, price: targetPrice, label: '到站减仓（占位）', position: 'aboveBar' },
    { time: afterTarget.bar.time, price: afterTarget.bar.high, label: '离场后仍继续走', position: 'aboveBar' },
  ],
}

await mkdir(join(root, 'public/images/system'), { recursive: true })
await writeFile(join(root, 'public/data/charts/vis-129.json'), `${JSON.stringify(vis129, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-130.json'), `${JSON.stringify(vis130, null, 2)}\n`)
await writeFile(join(root, 'public/images/system/vis-129-exit-real.svg'), renderSvg(vis129, vis129.markers))
await writeFile(join(root, 'public/images/system/vis-130-take-profit-real.svg'), renderSvg(vis130, vis130.markers))

console.log(JSON.stringify({
  placeholder: placeholder.bar.close,
  atr: atr[placeholder.index],
  stopPrice,
  oneR,
  targetPrice,
  targetHigh: targetHit.bar.high,
  afterHigh: afterTarget.bar.high,
}, null, 2))
