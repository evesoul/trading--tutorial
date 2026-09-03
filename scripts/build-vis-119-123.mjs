/**
 * Build vis-119–123 combination teaching windows.
 * Reuses vis-101 candles and vis-117 OI. Funding from Vision 2024-10 archive.
 * Not a live feed. Not a trading terminal.
 */
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const VISION = 'https://data.binance.vision/data/futures/um'

function isoFull(time) {
  return new Date(time * 1000).toISOString()
}

function at(candles, iso) {
  const time = Date.parse(iso) / 1000
  const index = candles.findIndex(bar => bar.time === time)
  return index >= 0 ? { index, bar: candles[index] } : null
}

async function downloadZipCsv(url, work) {
  const zipPath = join(work, `${Date.now()}-${Math.random().toString(16).slice(2)}.zip`)
  execFileSync('curl', ['-fsSL', '--noproxy', '*', '--max-time', '60', '-o', zipPath, url], { stdio: 'pipe' })
  const listing = execFileSync('unzip', ['-Z', '-1', zipPath], { encoding: 'utf8' })
  const name = listing.trim().split('\n')[0]
  return execFileSync('unzip', ['-p', zipPath, name], { encoding: 'utf8' })
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/)
  const header = lines[0].split(',')
  return lines.slice(1).filter(Boolean).map((line) => {
    const cols = line.split(',')
    const row = {}
    header.forEach((key, i) => {
      row[key] = cols[i]
    })
    return row
  })
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

function macd(closes, fast = 12, slow = 26, signal = 9) {
  const fastEma = ema(closes, fast)
  const slowEma = ema(closes, slow)
  const dif = closes.map((_, i) => {
    if (fastEma[i] == null || slowEma[i] == null) {
      return null
    }
    return fastEma[i] - slowEma[i]
  })
  const first = dif.findIndex(value => value != null)
  const tail = dif.slice(first).map(value => value ?? 0)
  const deaTail = ema(tail, signal)
  const dea = Array.from({ length: closes.length }, () => null)
  const hist = Array.from({ length: closes.length }, () => null)
  for (let i = 0; i < deaTail.length; i += 1) {
    const index = first + i
    dea[index] = deaTail[i]
    if (dif[index] != null && deaTail[i] != null) {
      hist[index] = dif[index] - deaTail[i]
    }
  }
  return { dif, dea, hist }
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

function header(chart, period, height) {
  return `
  <rect width="960" height="${height}" fill="#fffdf8"/>
  <text x="28" y="36" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="20" font-weight="700" fill="#0f172a">${svgEsc(chart.title)}</text>
  <rect x="792" y="16" width="140" height="28" rx="6" fill="#1a4d56"/>
  <text x="862" y="35" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" font-weight="600" fill="#fffdf8">真实行情</text>
  <text x="28" y="58" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#475569">${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)}</text>`
}

function footer(chart, period, yQuestion, yMeta) {
  return `
  <text x="480" y="${yQuestion}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" fill="#334155">${svgEsc(chart.teachingQuestion)}</text>
  <text x="480" y="${yMeta}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#64748b">真实行情 · ${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)} · 不构成交易建议</text>`
}

function yScale(values, top, height) {
  const nums = values.filter(value => value != null)
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  const pad = (max - min) * 0.08 || 1
  const lo = min - pad
  const hi = max + pad
  return value => top + (1 - (value - lo) / (hi - lo || 1)) * height
}

function renderStackedSvg(chart, panes, markers = []) {
  const height = panes.length >= 2 ? 640 : 560
  const pad = { l: 64, r: 24, t: 72, b: 86 }
  const candles = chart.candles
  const min = Math.min(...candles.map(bar => bar.low))
  const max = Math.max(...candles.map(bar => bar.high))
  const plotW = 960 - pad.l - pad.r
  const gap = 14
  const usable = height - pad.t - pad.b - gap * panes.length
  const priceH = Math.round(usable * (panes.length >= 2 ? 0.48 : 0.62))
  const paneH = Math.floor((usable - priceH) / Math.max(1, panes.length))
  const priceTop = pad.t
  const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
  const yPrice = price => priceTop + (1 - (price - min) / (max - min || 1)) * priceH
  const barW = Math.max(2, plotW / candles.length * 0.62)
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  let extras = ''
  if (chart.overlays?.ema20) {
    extras += polyline(chart.overlays.ema20, x, yPrice, '#7c3aed', 1.8)
  }
  for (const marker of markers) {
    const index = candles.findIndex(bar => bar.time === marker.time)
    if (index < 0) {
      continue
    }
    extras += `<text x="${x(index)}" y="${marker.position === 'aboveBar' ? yPrice(marker.price) - 8 : yPrice(marker.price) + 16}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="11" font-weight="700" fill="${marker.position === 'aboveBar' ? '#b91c1c' : '#15803d'}">${svgEsc(marker.label)}</text>`
  }
  let paneSvg = ''
  panes.forEach((pane, paneIndex) => {
    const top = priceTop + priceH + gap + paneIndex * (paneH + gap)
    paneSvg += `<rect x="${pad.l}" y="${top}" width="${plotW}" height="${paneH}" fill="#fff" stroke="#d9d0c0"/>`
    if (pane.volume) {
      const maxV = Math.max(...candles.map(bar => bar.volume))
      candles.forEach((bar, i) => {
        const h = (bar.volume / (maxV || 1)) * (paneH - 8)
        const color = bar.close >= bar.open ? 'rgba(21, 128, 61, 0.45)' : 'rgba(185, 28, 28, 0.45)'
        paneSvg += `<rect x="${x(i) - barW / 2}" y="${top + paneH - 4 - h}" width="${barW}" height="${Math.max(1, h)}" fill="${color}"/>`
      })
    }
    else {
      const y = yScale(pane.lines.flatMap(line => line.values), top, paneH)
      if (pane.zero != null) {
        paneSvg += `<line x1="${pad.l}" y1="${y(pane.zero)}" x2="${pad.l + plotW}" y2="${y(pane.zero)}" stroke="#94a3b8" stroke-dasharray="4 4"/>`
      }
      for (const line of pane.lines) {
        paneSvg += polyline(line.values, x, y, line.color, line.width || 1.6)
      }
    }
    paneSvg += `<text x="${pad.l + 8}" y="${top + 16}" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#334155">${svgEsc(pane.label)}</text>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" width="960" height="${height}" role="img" aria-labelledby="title desc">
  <title id="title">${svgEsc(chart.title)}</title>
  <desc id="desc">${svgEsc(chart.teachingQuestion)} ${svgEsc(chart.disclaimer)}</desc>
  ${header(chart, period, height)}
  <rect x="${pad.l}" y="${priceTop}" width="${plotW}" height="${priceH}" fill="#fff" stroke="#d9d0c0"/>
  ${candleBodies(candles, x, yPrice, barW)}
  ${extras}
  ${paneSvg}
  ${footer(chart, period, height - 50, height - 22)}
</svg>
`
}

async function loadFunding(work) {
  const url = `${VISION}/monthly/fundingRate/BTCUSDT/BTCUSDT-fundingRate-2024-10.zip`
  const csv = await downloadZipCsv(url, work)
  return parseCsv(csv).map(row => ({
    time: Math.floor(Number(row.calc_time) / 1000),
    rate: Number(row.last_funding_rate),
  })).sort((a, b) => a.time - b.time)
}

function alignFunding(candles, rows) {
  const byTime = new Map(rows.map(row => [row.time, row.rate]))
  let last = null
  return candles.map((bar) => {
    if (byTime.has(bar.time)) {
      last = byTime.get(bar.time)
    }
    return last
  })
}

const source = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const vis117 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-117.json'), 'utf8'))
const candles = source.candles
const oi = vis117.oi
if (oi.length !== candles.length) {
  throw new Error('vis-117 OI not aligned to vis-101')
}

const work = await mkdtemp(join(tmpdir(), 'exw-119-'))
let fundingRows
try {
  console.log('download funding 2024-10...')
  fundingRows = await loadFunding(work)
}
finally {
  await rm(work, { recursive: true, force: true })
}

const funding = alignFunding(candles, fundingRows)
const closes = candles.map(bar => bar.close)
const ema20 = ema(closes, 20)
const rsi = wilderRsi(closes, 14)
const macdSeries = macd(closes, 12, 26, 9)

const pull = at(candles, '2024-10-28T00:00:00.000Z')
const push = at(candles, '2024-10-28T16:00:00.000Z')
const oiUp = at(candles, '2024-10-18T12:00:00.000Z')
const oiDown = at(candles, '2024-10-14T04:00:00.000Z')
const volCut = at(candles, '2024-10-25T16:00:00.000Z')
const volFlat = at(candles, '2024-10-23T16:00:00.000Z')
const bothRulers = at(candles, '2024-10-29T00:00:00.000Z')
if (!pull || !push || !oiUp || !oiDown || !volCut || !volFlat || !bothRulers) {
  throw new Error('combination markers missing on vis-101 window')
}

let crowded = { score: -1, index: -1 }
funding.forEach((rate, i) => {
  if (rate == null || oi[i] == null || i === 0 || oi[i - 1] == null) {
    return
  }
  const score = rate * 1e4 + (oi[i] - oi[i - 1]) / 1e8
  if (rate > 0 && oi[i] > oi[i - 1] && score > crowded.score) {
    crowded = { score, index: i, rate, oi: oi[i] }
  }
})
if (crowded.index < 0) {
  throw new Error('no positive-funding + rising OI bar on vis-101 window')
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
}

const vis119 = {
  ...shared,
  id: 'vis-119',
  title: '趋势 + 成交量教学窗',
  teachingQuestion: '先看价格在 EMA 哪一侧，再比成交额相对近期是放大还是缩小。放量没有方向，不是开仓指令。',
  overlays: { ema20 },
  panels: ['ohlc', 'volume'],
  parameters: { emaPeriod: 20, volumeRef: 'visual-recent' },
  markers: [
    { time: pull.bar.time, price: pull.bar.low, label: '回踩缩量', position: 'belowBar' },
    { time: push.bar.time, price: push.bar.high, label: '推进放量', position: 'aboveBar' },
  ],
}

const vis120 = {
  ...shared,
  id: 'vis-120',
  title: '价格 + OI 教学窗',
  teachingQuestion: '四象限只解释「涨跌 × 存量加减」。OI 分不清谁开的仓，不是涨跌规则。',
  oi,
  oiUnit: vis117.oiUnit,
  panels: ['ohlc', 'oi'],
  parameters: { oiAlign: 'metrics-4h-last-snapshot' },
  markers: [
    { time: oiUp.bar.time, price: oiUp.bar.high, label: '涨 + OI 升', position: 'aboveBar' },
    { time: oiDown.bar.time, price: oiDown.bar.low, label: '涨 + OI 降', position: 'belowBar' },
  ],
}

const vis121 = {
  ...shared,
  id: 'vis-121',
  title: 'OI + Volume 教学窗',
  teachingQuestion: '成交额是流量，OI 是存量。放量加仓、放量减仓、放量换手是三种过程，不是开仓口诀。',
  oi,
  oiUnit: vis117.oiUnit,
  panels: ['ohlc', 'volume', 'oi'],
  parameters: { oiAlign: 'metrics-4h-last-snapshot' },
  markers: [
    { time: oiUp.bar.time, price: oiUp.bar.high, label: '放量加仓', position: 'aboveBar' },
    { time: volCut.bar.time, price: volCut.bar.low, label: '放量减仓', position: 'belowBar' },
    { time: volFlat.bar.time, price: volFlat.bar.close, label: '放量换手', position: 'aboveBar' },
  ],
}

const vis122 = {
  ...shared,
  id: 'vis-122',
  title: 'Funding + OI 教学窗',
  teachingQuestion: '费率看谁在付费，OI 看付费发生在多大存量上。拥挤不是倒计时反转器，也不是反向喊单。',
  oi,
  funding,
  oiUnit: vis117.oiUnit,
  fundingUnit: 'decimal rate, 0.0001 = 0.01%；8h 结算对齐到 4h，未结算桶沿用上一笔',
  panels: ['ohlc', 'funding', 'oi'],
  parameters: {
    fundingAlign: 'last-settlement-carried-forward',
    oiAlign: 'metrics-4h-last-snapshot',
  },
  markers: [{
    time: candles[crowded.index].time,
    price: candles[crowded.index].high,
    label: '费率偏正且 OI 升',
    position: 'aboveBar',
  }],
}

const vis123 = {
  ...shared,
  id: 'vis-123',
  title: 'RSI + MACD 教学窗',
  teachingQuestion: '两把动量尺来自同一段价格。一致常常只是算了两次，不是双重确认。',
  rsi,
  macd: macdSeries,
  panels: ['ohlc', 'rsi', 'macd'],
  parameters: { rsiPeriod: 14, rsiMethod: 'Wilder', macd: '12-26-9' },
  markers: [{
    time: bothRulers.bar.time,
    price: bothRulers.bar.high,
    label: '两把尺同向',
    position: 'aboveBar',
  }],
}

await mkdir(join(root, 'public/images/combination'), { recursive: true })
await writeFile(join(root, 'public/data/charts/vis-119.json'), `${JSON.stringify(vis119, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-120.json'), `${JSON.stringify(vis120, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-121.json'), `${JSON.stringify(vis121, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-122.json'), `${JSON.stringify(vis122, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-123.json'), `${JSON.stringify(vis123, null, 2)}\n`)

await writeFile(join(root, 'public/images/combination/vis-119-trend-volume-real.svg'), renderStackedSvg(vis119, [{
  label: '成交额 USDT · 柱高只说明转手多',
  volume: true,
}], vis119.markers))

await writeFile(join(root, 'public/images/combination/vis-120-price-oi-real.svg'), renderStackedSvg(vis120, [{
  label: 'OI USDT 名义 · 升只说明多空各多了一份',
  lines: [{ values: oi, color: '#0f172a' }],
}], vis120.markers))

await writeFile(join(root, 'public/images/combination/vis-121-oi-volume-real.svg'), renderStackedSvg(vis121, [
  { label: '成交额 USDT（流量）', volume: true },
  { label: 'OI USDT 名义（存量）', lines: [{ values: oi, color: '#0f172a' }] },
], vis121.markers))

await writeFile(join(root, 'public/images/combination/vis-122-funding-oi-real.svg'), renderStackedSvg(vis122, [
  { label: '资金费率 · 沿用上一结算 · 不是超买超卖尺', lines: [{ values: funding, color: '#0f766e' }], zero: 0 },
  { label: 'OI USDT 名义', lines: [{ values: oi, color: '#0f172a' }] },
], vis122.markers))

await writeFile(join(root, 'public/images/combination/vis-123-rsi-macd-real.svg'), renderStackedSvg(vis123, [
  { label: 'RSI14 · 有界力度', lines: [{ values: rsi, color: '#1a4d56' }] },
  { label: 'MACD 柱 · 无界扩张收缩 · 同一段价格', lines: [{ values: macdSeries.hist, color: '#2563eb' }], zero: 0 },
], vis123.markers))

const oiUpI = oiUp.index
const oiDownI = oiDown.index
console.log(JSON.stringify({
  pull: isoFull(pull.bar.time),
  push: isoFull(push.bar.time),
  oiUp: { t: isoFull(oiUp.bar.time), dOi: oi[oiUpI] - oi[oiUpI - 1], px: oiUp.bar.close - candles[oiUpI - 1].close },
  oiDown: { t: isoFull(oiDown.bar.time), dOi: oi[oiDownI] - oi[oiDownI - 1], px: oiDown.bar.close - candles[oiDownI - 1].close },
  volCut: isoFull(volCut.bar.time),
  volFlat: isoFull(volFlat.bar.time),
  crowded: {
    t: isoFull(candles[crowded.index].time),
    rate: crowded.rate,
    ratePct: `${(crowded.rate * 100).toFixed(4)}%`,
  },
  bothRulers: {
    t: isoFull(bothRulers.bar.time),
    rsi: rsi[bothRulers.index],
    macdHist: macdSeries.hist[bothRulers.index],
  },
  fundingRange: {
    min: Math.min(...funding.filter(value => value != null)),
    max: Math.max(...funding.filter(value => value != null)),
  },
}, null, 2))
