/**
 * Build vis-115–118.
 * Reuses vis-101 candles. Adds LSR / CVD from Binance Vision archives.
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

function daysBetween(start, end) {
  const out = []
  const cursor = new Date(`${start}T00:00:00Z`)
  const last = new Date(`${end}T00:00:00Z`)
  while (cursor <= last) {
    out.push(cursor.toISOString().slice(0, 10))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return out
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

function alignLastInBucket(candles, points, pick) {
  const out = []
  let cursor = 0
  for (const bar of candles) {
    const end = bar.time + 4 * 3600
    while (cursor < points.length && points[cursor].time < bar.time) {
      cursor += 1
    }
    let last = null
    let index = cursor
    while (index < points.length && points[index].time < end) {
      last = points[index]
      index += 1
    }
    out.push(last ? pick(last) : null)
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

function polyline(values, x, y, color, width = 1.6, dash = '') {
  const pts = values
    .map((value, i) => (value == null ? '' : `${x(i)},${y(value)}`))
    .filter(Boolean)
    .join(' ')
  const dashAttr = dash ? ` stroke-dasharray="${dash}"` : ''
  return `<polyline fill="none" stroke="${color}" stroke-width="${width}"${dashAttr} points="${pts}"/>`
}

function header(chart, period, height = 560) {
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
    extras += `<text x="${x(index)}" y="${marker.position === 'aboveBar' ? yPrice(marker.price) - 8 : yPrice(marker.price) + 16}" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" font-weight="700" fill="${marker.position === 'aboveBar' ? '#b91c1c' : '#15803d'}">${svgEsc(marker.label)}</text>`
  }
  let paneSvg = ''
  panes.forEach((pane, paneIndex) => {
    const top = priceTop + priceH + gap + paneIndex * (paneH + gap)
    const y = yScale(pane.lines.flatMap(line => line.values), top, paneH)
    paneSvg += `<rect x="${pad.l}" y="${top}" width="${plotW}" height="${paneH}" fill="#fff" stroke="#d9d0c0"/>`
    if (pane.zero != null) {
      paneSvg += `<line x1="${pad.l}" y1="${y(pane.zero)}" x2="${pad.l + plotW}" y2="${y(pane.zero)}" stroke="#94a3b8" stroke-dasharray="4 4"/>`
    }
    for (const line of pane.lines) {
      paneSvg += polyline(line.values, x, y, line.color, line.width || 1.6)
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

async function loadKlinesWithTaker(work) {
  const url = `${VISION}/monthly/klines/BTCUSDT/4h/BTCUSDT-4h-2024-10.zip`
  const csv = await downloadZipCsv(url, work)
  return parseCsv(csv).map((row) => {
    const time = Math.floor(Number(row.open_time) / 1000)
    return {
      time,
      quoteVolume: Number(row.quote_volume),
      takerBuyQuote: Number(row.taker_buy_quote_volume),
    }
  })
}

async function loadMetrics(work, startDay, endDay) {
  const points = []
  for (const day of daysBetween(startDay, endDay)) {
    const url = `${VISION}/daily/metrics/BTCUSDT/BTCUSDT-metrics-${day}.zip`
    try {
      const csv = await downloadZipCsv(url, work)
      for (const row of parseCsv(csv)) {
        points.push({
          time: Math.floor(Date.parse(`${row.create_time.replace(' ', 'T')}Z`) / 1000),
          oiUsdt: Number(row.sum_open_interest_value),
          lsrAccounts: Number(row.count_long_short_ratio),
          lsrTopPositions: Number(row.sum_toptrader_long_short_ratio),
        })
      }
    }
    catch {
      console.warn('skip metrics', day)
    }
  }
  points.sort((a, b) => a.time - b.time)
  return points
}

const source = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const candles = source.candles
const work = await mkdtemp(join(tmpdir(), 'exw-115-'))

let klines
let metrics
try {
  console.log('download 4h klines + metrics...')
  klines = await loadKlinesWithTaker(work)
  metrics = await loadMetrics(work, '2024-10-11', '2024-10-31')
}
finally {
  await rm(work, { recursive: true, force: true })
}

const klineByTime = new Map(klines.map(row => [row.time, row]))
const delta = candles.map((bar) => {
  const hit = klineByTime.get(bar.time)
  if (!hit || !Number.isFinite(hit.takerBuyQuote) || !Number.isFinite(hit.quoteVolume)) {
    return null
  }
  return 2 * hit.takerBuyQuote - hit.quoteVolume
})
if (delta.some(value => value == null)) {
  throw new Error('vis-101 candles missing taker fields in 2024-10 4h archive')
}

const rawCvd = []
delta.forEach((value, i) => {
  rawCvd[i] = (i === 0 ? 0 : rawCvd[i - 1]) + value
})
const cvd = rawCvd.map(value => value - rawCvd[0])

const lsrAccounts = alignLastInBucket(candles, metrics, row => row.lsrAccounts)
const lsrTopPositions = alignLastInBucket(candles, metrics, row => row.lsrTopPositions)
const oi = alignLastInBucket(candles, metrics, row => row.oiUsdt)

if (lsrAccounts.filter(value => value != null).length < 80) {
  throw new Error('LSR alignment too sparse')
}

let split = { score: -1, index: -1 }
for (let i = 0; i < candles.length; i += 1) {
  const acc = lsrAccounts[i]
  const pos = lsrTopPositions[i]
  if (acc == null || pos == null) {
    continue
  }
  const opposite = (acc - 1) * (pos - 1) < 0
  const score = (opposite ? 2 : 0) + Math.abs(acc - pos)
  if (score > split.score) {
    split = { score, index: i, acc, pos, opposite }
  }
}

let quietFlow = { score: -1, index: -1 }
delta.forEach((value, i) => {
  const volume = candles[i].volume
  if (value == null || volume < 1.2e9) {
    return
  }
  const score = volume / (Math.abs(value) + 1e6)
  if (score > quietFlow.score) {
    quietFlow = { score, index: i, volume, value }
  }
})

let shock = { score: -1, index: -1 }
candles.forEach((bar, i) => {
  const range = bar.high - bar.low
  const score = range * (bar.volume / 1e9)
  if (score > shock.score) {
    shock = { score, index: i, range, volume: bar.volume }
  }
})

const ema20 = ema(candles.map(bar => bar.close), 20)
const trigger = candles.find(bar => bar.time === 1729468800)
const stopBar = candles.find(bar => bar.time === 1729555200)
if (!trigger || !stopBar) {
  throw new Error('case-study markers missing on vis-101 window')
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

const vis115 = {
  ...shared,
  id: 'vis-115',
  title: '多空比真实行情教学窗',
  teachingQuestion: '先读口径。全员账户比和大户持仓比可以同向，也可以反向；没有口径就不能引用「市场多空」。',
  lsrAccounts,
  lsrTopPositions,
  lsrUnit: '账户比 = count_long_short_ratio；大户持仓比 = sum_toptrader_long_short_ratio；5 分钟 metrics 取 4h 桶内最后快照',
  panels: ['ohlc', 'lsr'],
  parameters: {
    lsrAccountsField: 'count_long_short_ratio',
    lsrTopPositionsField: 'sum_toptrader_long_short_ratio',
  },
  markers: split.index >= 0
    ? [{
        time: candles[split.index].time,
        price: candles[split.index].high,
        label: split.opposite ? '口径反向' : '口径差最大',
        position: 'aboveBar',
      }]
    : [],
}

const vis116 = {
  ...shared,
  id: 'vis-116',
  title: 'CVD 真实行情教学窗',
  teachingQuestion: 'CVD 是主动买减主动卖的累计。看斜率和与价格是否同步，不看绝对水平。背离不是反转指令。',
  cvd,
  delta,
  cvdUnit: 'USDT quote；Delta = 2×taker_buy_quote − quote_volume；从窗左端重置为 0',
  panels: ['ohlc', 'cvd'],
  parameters: {
    cvdReset: 'window-left-zero',
    cvdSource: 'binance-4h-taker-buy-quote',
  },
  markers: quietFlow.index >= 0
    ? [{
        time: candles[quietFlow.index].time,
        price: candles[quietFlow.index].low,
        label: '放量净额小',
        position: 'belowBar',
      }]
    : [],
}

const vis117 = {
  ...shared,
  id: 'vis-117',
  title: '清算瀑布读图教学窗',
  teachingQuestion: '插针加上巨量、OI 急变、CVD 直插时，先记数据暂时不可解释方向。本窗没有强平逐笔，不教抄底。',
  oi,
  cvd,
  oiUnit: 'USDT notional；由 5 分钟 metrics 取该 4h 桶内最后快照',
  cvdUnit: 'USDT quote；从窗左端重置为 0',
  panels: ['ohlc', 'volume', 'oi', 'cvd'],
  parameters: {
    traces: 'price-volume-oi-cvd',
    liquidationPrints: 'none',
  },
  markers: shock.index >= 0
    ? [{
        time: candles[shock.index].time,
        price: candles[shock.index].low,
        label: '公开痕迹失真',
        position: 'belowBar',
      }]
    : [],
}

const vis118 = {
  ...shared,
  id: 'vis-118',
  title: '案例执行时间线教学窗',
  teachingQuestion: '同一段冻结窗只练习看到什么、挂了什么、日志怎么记。不填成绩，不是跟单对象。',
  overlays: { ema20 },
  panels: ['ohlc'],
  parameters: {
    emaPeriod: 20,
    scorecard: 'none',
  },
  markers: [
    { time: trigger.time, price: trigger.high, label: '触发收盘', position: 'aboveBar' },
    { time: stopBar.time, price: stopBar.low, label: '计划止损触及', position: 'belowBar' },
  ],
}

await mkdir(join(root, 'public/data/charts'), { recursive: true })
await mkdir(join(root, 'public/images/indicator'), { recursive: true })
await mkdir(join(root, 'public/images/system'), { recursive: true })

await writeFile(join(root, 'public/data/charts/vis-115.json'), `${JSON.stringify(vis115, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-116.json'), `${JSON.stringify(vis116, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-117.json'), `${JSON.stringify(vis117, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-118.json'), `${JSON.stringify(vis118, null, 2)}\n`)

await writeFile(join(root, 'public/images/indicator/vis-115-lsr-real.svg'), renderStackedSvg(vis115, [{
  label: '蓝：全员账户比 · 橙：大户持仓比 · 虚线 = 1',
  lines: [
    { values: lsrAccounts, color: '#1d4ed8' },
    { values: lsrTopPositions, color: '#c2410c' },
  ],
  zero: 1,
}], vis115.markers))

await writeFile(join(root, 'public/images/indicator/vis-116-cvd-real.svg'), renderStackedSvg(vis116, [{
  label: 'CVD USDT · 窗左端 = 0 · 看斜率，不看绝对值',
  lines: [{ values: cvd, color: '#7c3aed' }],
  zero: 0,
}], vis116.markers))

await writeFile(join(root, 'public/images/indicator/vis-117-cascade-real.svg'), renderStackedSvg(vis117, [
  {
    label: 'OI USDT 名义',
    lines: [{ values: oi, color: '#0f172a' }],
  },
  {
    label: 'CVD · 强平 taker 会扭曲 Delta',
    lines: [{ values: cvd, color: '#7c3aed' }],
    zero: 0,
  },
], vis117.markers))

await writeFile(join(root, 'public/images/system/vis-118-case-timeline-real.svg'), renderStackedSvg(vis118, [], vis118.markers))

const oiChange = shock.index > 0 && oi[shock.index] != null && oi[shock.index - 1] != null
  ? oi[shock.index] - oi[shock.index - 1]
  : null

console.log(JSON.stringify({
  split: split.index >= 0
    ? {
        time: isoFull(candles[split.index].time),
        accounts: split.acc,
        topPositions: split.pos,
        opposite: split.opposite,
      }
    : null,
  quietFlow: quietFlow.index >= 0
    ? {
        time: isoFull(candles[quietFlow.index].time),
        volume: quietFlow.volume,
        delta: quietFlow.value,
      }
    : null,
  shock: shock.index >= 0
    ? {
        time: isoFull(candles[shock.index].time),
        range: shock.range,
        volume: shock.volume,
        oiChange,
        cvd: cvd[shock.index],
        delta: delta[shock.index],
        lsrAccounts: lsrAccounts[shock.index],
        lsrTopPositions: lsrTopPositions[shock.index],
      }
    : null,
  trigger: isoFull(trigger.time),
  stop: isoFull(stopBar.time),
  lsrRange: {
    accounts: [Math.min(...lsrAccounts.filter(Boolean)), Math.max(...lsrAccounts.filter(Boolean))],
    topPos: [Math.min(...lsrTopPositions.filter(Boolean)), Math.max(...lsrTopPositions.filter(Boolean))],
  },
}, null, 2))
