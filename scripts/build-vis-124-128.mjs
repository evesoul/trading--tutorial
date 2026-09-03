/**
 * Build vis-124–128 system teaching windows.
 * Reuses vis-101 candles and vis-110 ATR. Daily EMA from Vision 1d archive.
 * Not a live feed. Not a trading terminal. No scorecard.
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

function monthsBetween(start, end) {
  const out = []
  const cursor = new Date(`${start}-01T00:00:00Z`)
  const last = new Date(`${end}-01T00:00:00Z`)
  while (cursor <= last) {
    out.push(cursor.toISOString().slice(0, 7))
    cursor.setUTCMonth(cursor.getUTCMonth() + 1)
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
  const height = panes.length >= 1 ? 560 : 480
  const pad = { l: 64, r: 24, t: 72, b: 86 }
  const candles = chart.candles
  const min = Math.min(...candles.map(bar => bar.low))
  const max = Math.max(...candles.map(bar => bar.high))
  const plotW = 960 - pad.l - pad.r
  const gap = 14
  const usable = height - pad.t - pad.b - gap * panes.length
  const priceH = panes.length ? Math.round(usable * 0.68) : usable
  const paneH = panes.length ? Math.floor((usable - priceH) / panes.length) : 0
  const priceTop = pad.t
  const x = i => pad.l + (i + 0.5) * (plotW / candles.length)
  const yPrice = price => priceTop + (1 - (price - min) / (max - min || 1)) * priceH
  const barW = Math.max(2, plotW / candles.length * 0.62)
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  let extras = ''
  if (chart.overlays?.ema20) {
    extras += polyline(chart.overlays.ema20, x, yPrice, '#7c3aed', 1.8)
  }
  if (chart.overlays?.emaHigher) {
    extras += polyline(chart.overlays.emaHigher, x, yPrice, '#0f766e', 1.8, '6 4')
  }
  if (chart.guides) {
    for (const guide of chart.guides) {
      if (guide.type === 'level') {
        extras += `<line x1="${pad.l}" y1="${yPrice(guide.price)}" x2="${pad.l + plotW}" y2="${yPrice(guide.price)}" stroke="#d97706" stroke-dasharray="5 4"/>`
        extras += `<text x="${pad.l + plotW - 8}" y="${yPrice(guide.price) - 6}" text-anchor="end" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="11" fill="#b45309">${svgEsc(guide.label)}</text>`
      }
    }
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
    const y = yScale(pane.lines.flatMap(line => line.values), top, paneH)
    paneSvg += `<rect x="${pad.l}" y="${top}" width="${plotW}" height="${paneH}" fill="#fff" stroke="#d9d0c0"/>`
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

async function loadDaily(work) {
  const rows = []
  for (const month of monthsBetween('2024-09', '2024-10')) {
    const url = `${VISION}/monthly/klines/BTCUSDT/1d/BTCUSDT-1d-${month}.zip`
    const csv = await downloadZipCsv(url, work)
    for (const row of parseCsv(csv)) {
      rows.push({
        time: Math.floor(Number(row.open_time) / 1000),
        close: Number(row.close),
      })
    }
  }
  rows.sort((a, b) => a.time - b.time)
  return rows
}

function alignClosedDailyEma(candles, daily, dailyEma) {
  return candles.map((bar) => {
    let last = null
    for (let i = 0; i < daily.length; i += 1) {
      if (daily[i].time + 86400 <= bar.time && dailyEma[i] != null) {
        last = dailyEma[i]
      }
    }
    return last
  })
}

function alignClosedDailyClose(candles, daily) {
  return candles.map((bar) => {
    let last = null
    for (const row of daily) {
      if (row.time + 86400 <= bar.time) {
        last = row.close
      }
    }
    return last
  })
}

const source = JSON.parse(await readFile(join(root, 'public/data/charts/vis-101.json'), 'utf8'))
const vis110 = JSON.parse(await readFile(join(root, 'public/data/charts/vis-110.json'), 'utf8'))
const candles = source.candles
const atr = vis110.atr
if (atr.length !== candles.length) {
  throw new Error('vis-110 ATR not aligned to vis-101')
}

const work = await mkdtemp(join(tmpdir(), 'exw-124-'))
let daily
try {
  console.log('download daily 2024-09/10...')
  daily = await loadDaily(work)
}
finally {
  await rm(work, { recursive: true, force: true })
}

const dailyEma = ema(daily.map(row => row.close), 20)
const ema20 = ema(candles.map(bar => bar.close), 20)
const emaHigher = alignClosedDailyEma(candles, daily, dailyEma)
const dailyClose = alignClosedDailyClose(candles, daily)

let fight = null
for (let i = 20; i < candles.length; i += 1) {
  if (ema20[i] == null || emaHigher[i] == null || dailyClose[i] == null) {
    continue
  }
  const execBelow = candles[i].close < ema20[i]
  const decisionAbove = dailyClose[i] >= emaHigher[i]
  if (execBelow && decisionAbove) {
    fight = { index: i, bar: candles[i] }
    break
  }
}
if (!fight) {
  throw new Error('no 4h-vs-daily fight bar on vis-101 window')
}

const shock = at(candles, '2024-10-15T12:00:00.000Z')
const trend = at(candles, '2024-10-18T12:00:00.000Z')
const chop = at(candles, '2024-10-25T16:00:00.000Z')
const bias = at(candles, '2024-10-18T12:00:00.000Z')
const noTrade = at(candles, '2024-10-21T12:00:00.000Z')
const setup = at(candles, '2024-10-27T00:00:00.000Z')
const noTrigger = at(candles, '2024-10-27T04:00:00.000Z')
const trigger = at(candles, '2024-10-28T16:00:00.000Z')
if (!shock || !trend || !chop || !bias || !noTrade || !setup || !noTrigger || !trigger) {
  throw new Error('system markers missing on vis-101 window')
}

const stopPrice = trigger.bar.close - 1.5 * atr[trigger.index]
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

const vis124 = {
  ...shared,
  id: 'vis-124',
  title: '市场环境教学窗',
  teachingQuestion: '先贴环境标签：一侧停留更像趋势，来回穿越更像震荡，波动突然放大先写成看不清。标签不是开仓。',
  overlays: { ema20 },
  panels: ['ohlc'],
  parameters: { emaPeriod: 20, scorecard: 'none' },
  markers: [
    { time: shock.bar.time, price: shock.bar.high, label: '波动放大', position: 'aboveBar' },
    { time: trend.bar.time, price: trend.bar.low, label: '更像趋势', position: 'belowBar' },
    { time: chop.bar.time, price: chop.bar.low, label: '来回穿越', position: 'belowBar' },
  ],
}

const vis125 = {
  ...shared,
  id: 'vis-125',
  title: '方向判断教学窗',
  teachingQuestion: '方向是偏多、偏空或不交易，不是下单。环境打断或收盘跌破均线时，先停，不要自动反手。',
  overlays: { ema20 },
  panels: ['ohlc'],
  parameters: { emaPeriod: 20, scorecard: 'none' },
  markers: [
    { time: bias.bar.time, price: bias.bar.low, label: '偏多标签', position: 'belowBar' },
    { time: noTrade.bar.time, price: noTrade.bar.high, label: '不交易', position: 'aboveBar' },
  ],
}

const vis126 = {
  ...shared,
  id: 'vis-126',
  title: '多周期教学窗',
  teachingQuestion: '日线已收盘仍在均线上方，4 小时已跌到均线下方：两周期打架，默认不交易。日线/4 小时只是填空，不是推荐周期。',
  overlays: { ema20, emaHigher },
  panels: ['ohlc'],
  parameters: {
    decisionTf: '1d',
    executionTf: '4h',
    higherEmaAlign: 'last-closed-daily',
    pairNote: '填空示范，不是推荐周期',
    scorecard: 'none',
  },
  markers: [{
    time: fight.bar.time,
    price: fight.bar.low,
    label: '打架则空仓',
    position: 'belowBar',
  }],
}

const vis127 = {
  ...shared,
  id: 'vis-127',
  title: '入场规则教学窗',
  teachingQuestion: '前提成立、触发没来，空仓等待。触发收盘只是教学占位，不是成交记录。未成交视为未入场。',
  overlays: { ema20 },
  panels: ['ohlc'],
  parameters: { emaPeriod: 20, fillStatus: 'none', scorecard: 'none' },
  markers: [
    { time: setup.bar.time, price: setup.bar.low, label: '前提成立', position: 'belowBar' },
    { time: noTrigger.bar.time, price: noTrigger.bar.high, label: '触发未到', position: 'aboveBar' },
    { time: trigger.bar.time, price: trigger.bar.high, label: '触发收盘（占位）', position: 'aboveBar' },
  ],
}

const vis128 = {
  ...shared,
  id: 'vis-128',
  title: '止损教学窗',
  teachingQuestion: '认错距离用 ATR 先写出来。止损是你画的线，不是交易所强平价。碰到与否都不证明该不该设。',
  overlays: { ema20 },
  atr,
  atrUnit: vis110.atrUnit,
  panels: ['ohlc', 'atr'],
  parameters: {
    emaPeriod: 20,
    atrPeriod: 14,
    atrMethod: 'Wilder',
    stopMultiple: 1.5,
    scorecard: 'none',
    liquidation: 'not-drawn',
  },
  guides: [{
    id: 'vis-128-stop',
    type: 'level',
    role: 'teaching',
    label: '计划止损（教学占位）',
    price: stopPrice,
  }],
  markers: [
    { time: shock.bar.time, price: shock.bar.high, label: 'ATR 变宽', position: 'aboveBar' },
    { time: trigger.bar.time, price: trigger.bar.close, label: '尺子示范', position: 'belowBar' },
  ],
}

await mkdir(join(root, 'public/images/system'), { recursive: true })
await writeFile(join(root, 'public/data/charts/vis-124.json'), `${JSON.stringify(vis124, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-125.json'), `${JSON.stringify(vis125, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-126.json'), `${JSON.stringify(vis126, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-127.json'), `${JSON.stringify(vis127, null, 2)}\n`)
await writeFile(join(root, 'public/data/charts/vis-128.json'), `${JSON.stringify(vis128, null, 2)}\n`)

await writeFile(join(root, 'public/images/system/vis-124-regime-real.svg'), renderStackedSvg(vis124, [], vis124.markers))
await writeFile(join(root, 'public/images/system/vis-125-direction-real.svg'), renderStackedSvg(vis125, [], vis125.markers))
await writeFile(join(root, 'public/images/system/vis-126-mtf-real.svg'), renderStackedSvg(vis126, [], vis126.markers))
await writeFile(join(root, 'public/images/system/vis-127-entry-real.svg'), renderStackedSvg(vis127, [], vis127.markers))
await writeFile(join(root, 'public/images/system/vis-128-stop-real.svg'), renderStackedSvg(vis128, [{
  label: 'Wilder ATR14 · 尺子，不给方向',
  lines: [{ values: atr, color: '#0f766e' }],
}], vis128.markers))

console.log(JSON.stringify({
  shock: isoFull(shock.bar.time),
  trend: isoFull(trend.bar.time),
  chop: isoFull(chop.bar.time),
  noTrade: isoFull(noTrade.bar.time),
  fight: {
    t: isoFull(fight.bar.time),
    close: fight.bar.close,
    ema4h: ema20[fight.index],
    emaDaily: emaHigher[fight.index],
    dailyClose: dailyClose[fight.index],
  },
  setup: isoFull(setup.bar.time),
  noTrigger: isoFull(noTrigger.bar.time),
  trigger: isoFull(trigger.bar.time),
  stopPrice,
  atrAtTrigger: atr[trigger.index],
  atrAtShock: atr[shock.index],
}, null, 2))
