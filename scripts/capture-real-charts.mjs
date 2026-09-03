/**
 * Capture vis-101–107 from Binance Vision historical archives (USDT-M).
 * Writes frozen JSON + static SVG. Not a live trading feed.
 */
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = join(root, 'public/data/charts')
const imageDir = join(root, 'public/images/indicator')
const VISION = 'https://data.binance.vision/data/futures/um'

function iso(ms) {
  return new Date(ms).toISOString()
}

function monthsBetween(start, end) {
  const out = []
  const cursor = new Date(`${start.slice(0, 7)}-01T00:00:00Z`)
  const last = new Date(`${end.slice(0, 7)}-01T00:00:00Z`)
  while (cursor <= last) {
    out.push(cursor.toISOString().slice(0, 7))
    cursor.setUTCMonth(cursor.getUTCMonth() + 1)
  }
  return out
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
  execFileSync('curl', ['-fsSL', '--max-time', '40', '-o', zipPath, url], { stdio: 'pipe' })
  const listing = execFileSync('unzip', ['-Z', '-1', zipPath], { encoding: 'utf8' })
  const name = listing.trim().split('\n')[0]
  const csv = execFileSync('unzip', ['-p', zipPath, name], { encoding: 'utf8' })
  return csv
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

async function loadKlines(work, interval, startMonth, endMonth) {
  const rows = []
  for (const month of monthsBetween(startMonth, endMonth)) {
    const url = `${VISION}/monthly/klines/BTCUSDT/${interval}/BTCUSDT-${interval}-${month}.zip`
    const csv = await downloadZipCsv(url, work)
    for (const row of parseCsv(csv)) {
      rows.push({
        time: Math.floor(Number(row.open_time) / 1000),
        open: Number(row.open),
        high: Number(row.high),
        low: Number(row.low),
        close: Number(row.close),
        volume: Number(row.quote_volume),
        baseVolume: Number(row.volume),
      })
    }
  }
  rows.sort((a, b) => a.time - b.time)
  return rows
}

async function loadFunding(work, startMonth, endMonth) {
  const rows = []
  for (const month of monthsBetween(startMonth, endMonth)) {
    const url = `${VISION}/monthly/fundingRate/BTCUSDT/BTCUSDT-fundingRate-${month}.zip`
    const csv = await downloadZipCsv(url, work)
    for (const row of parseCsv(csv)) {
      rows.push({
        time: Math.floor(Number(row.calc_time) / 1000),
        rate: Number(row.last_funding_rate),
        intervalHours: Number(row.funding_interval_hours),
      })
    }
  }
  rows.sort((a, b) => a.time - b.time)
  return rows
}

async function loadOi4h(work, startDay, endDay) {
  const points = []
  for (const day of daysBetween(startDay, endDay)) {
    const url = `${VISION}/daily/metrics/BTCUSDT/BTCUSDT-metrics-${day}.zip`
    try {
      const csv = await downloadZipCsv(url, work)
      for (const row of parseCsv(csv)) {
        const time = Math.floor(Date.parse(`${row.create_time.replace(' ', 'T')}Z`) / 1000)
        points.push({
          time,
          oiContracts: Number(row.sum_open_interest),
          oiUsdt: Number(row.sum_open_interest_value),
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

function alignOiToCandles(candles, points) {
  const oi = []
  const oiContracts = []
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
    oi.push(last ? last.oiUsdt : null)
    oiContracts.push(last ? last.oiContracts : null)
  }
  return { oi, oiContracts }
}

function ema(values, length) {
  const k = 2 / (length + 1)
  const out = Array.from({ length: values.length }, () => null)
  if (values.length < length) {
    return out
  }
  let sum = 0
  for (let i = 0; i < length; i += 1) {
    sum += values[i]
  }
  let prev = sum / length
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
    const up = change > 0 ? change : 0
    const down = change < 0 ? -change : 0
    avgGain = (avgGain * (length - 1) + up) / length
    avgLoss = (avgLoss * (length - 1) + down) / length
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

function findWindow(bars, predicate, size = 110) {
  let best = { score: -1, start: 0 }
  const step = Math.max(1, Math.floor(size / 5))
  for (let i = 0; i + size <= bars.length; i += step) {
    const window = bars.slice(i, i + size)
    const score = predicate(window, i)
    if (score > best.score) {
      best = { score, start: i }
    }
  }
  return bars.slice(best.start, best.start + size)
}

function alignByTime(candles, series, pick) {
  const byTime = new Map(series.map(item => [item.time, item]))
  return candles.map((bar) => {
    const hit = byTime.get(bar.time)
    return hit ? pick(hit) : null
  })
}

function packChart(partial) {
  const times = partial.candles.map(bar => bar.time)
  return {
    capturedAt: new Date().toISOString(),
    symbol: 'BTCUSDT',
    source: 'Binance USDT-M · data.binance.vision',
    market: 'usdm-perp',
    disclaimer: '真实行情教学窗。历史观察不能代表未来结果。不构成交易建议。不是买卖信号。',
    period: {
      start: iso(times[0] * 1000),
      end: iso(times[times.length - 1] * 1000),
    },
    ...partial,
  }
}

function svgEsc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderSvg(chart) {
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
  let bodies = ''
  candles.forEach((bar, i) => {
    const color = bar.close >= bar.open ? '#16a34a' : '#dc2626'
    const top = y(Math.max(bar.open, bar.close))
    const bottom = y(Math.min(bar.open, bar.close))
    bodies += `<line x1="${x(i)}" y1="${y(bar.high)}" x2="${x(i)}" y2="${y(bar.low)}" stroke="${color}" stroke-width="1"/>`
    bodies += `<rect x="${x(i) - barW / 2}" y="${top}" width="${barW}" height="${Math.max(1, bottom - top)}" fill="${color}"/>`
  })
  let overlay = ''
  if (chart.overlays?.ema20) {
    const pts = chart.overlays.ema20
      .map((value, i) => (value == null ? '' : `${x(i)},${y(value)}`))
      .filter(Boolean)
      .join(' ')
    overlay = `<polyline fill="none" stroke="#7c3aed" stroke-width="1.6" points="${pts}"/>`
  }
  const period = `${chart.period.start.slice(0, 10)} → ${chart.period.end.slice(0, 10)} UTC`
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc">
  <title id="title">${svgEsc(chart.title)}</title>
  <desc id="desc">${svgEsc(chart.teachingQuestion)} ${svgEsc(chart.disclaimer)}</desc>
  <rect width="${width}" height="${height}" fill="#fffdf8"/>
  <text x="28" y="36" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="20" font-weight="700" fill="#0f172a">${svgEsc(chart.title)}</text>
  <rect x="792" y="16" width="140" height="28" rx="6" fill="#1a4d56"/>
  <text x="862" y="35" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" font-weight="600" fill="#fffdf8">真实行情</text>
  <text x="28" y="58" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#475569">${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)}</text>
  <rect x="${pad.l}" y="${pad.t}" width="${plotW}" height="${plotH}" fill="#fff" stroke="#d9d0c0"/>
  ${bodies}
  ${overlay}
  <text x="480" y="510" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="13" fill="#334155">${svgEsc(chart.teachingQuestion)}</text>
  <text x="480" y="538" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, sans-serif" font-size="12" fill="#64748b">真实行情 · ${svgEsc(chart.symbol)} · ${svgEsc(chart.timeframe)} · ${svgEsc(chart.source)} · ${svgEsc(period)} · 不构成交易建议</text>
</svg>
`
}

const FILE_NAMES = {
  'vis-101': 'vis-101-kline-real.svg',
  'vis-102': 'vis-102-ema-real.svg',
  'vis-103': 'vis-103-macd-real.svg',
  'vis-104': 'vis-104-rsi-real.svg',
  'vis-105': 'vis-105-volume-real.svg',
  'vis-106': 'vis-106-oi-real.svg',
  'vis-107': 'vis-107-funding-real.svg',
}

async function main() {
  await mkdir(dataDir, { recursive: true })
  await mkdir(imageDir, { recursive: true })
  const work = await mkdtemp(join(tmpdir(), 'exw-charts-'))

  try {
    console.log('klines 4h...')
    const k4h = await loadKlines(work, '4h', '2024-07', '2024-11')
    console.log('klines 8h...')
    const k8h = await loadKlines(work, '8h', '2024-08', '2024-11')
    console.log('funding...')
    const funding = await loadFunding(work, '2024-08', '2024-11')
    console.log('oi metrics Sep–Oct...')
    const oi = await loadOi4h(work, '2024-09-01', '2024-10-31')
    console.log({ k4h: k4h.length, k8h: k8h.length, funding: funding.length, oi: oi.length })

    const kOct = k4h.filter(bar => bar.time >= Date.parse('2024-10-01T00:00:00Z') / 1000 && bar.time <= Date.parse('2024-10-31T23:59:59Z') / 1000)
    const kSepNov = k4h.filter(bar => bar.time >= Date.parse('2024-09-01T00:00:00Z') / 1000)
    const kAugOct = k4h.filter(bar => bar.time >= Date.parse('2024-08-01T00:00:00Z') / 1000 && bar.time <= Date.parse('2024-10-31T23:59:59Z') / 1000)
    const kJulSep = k4h.filter(bar => bar.time <= Date.parse('2024-09-30T23:59:59Z') / 1000)
    const kSepOct = k4h.filter(bar => bar.time >= Date.parse('2024-09-01T00:00:00Z') / 1000 && bar.time <= Date.parse('2024-10-31T23:59:59Z') / 1000)

    const vis101 = packChart({
      id: 'vis-101',
      title: 'K 线真实行情教学窗',
      timeframe: '4h',
      teachingQuestion: '实盘 K 线大小不一、影线不规则，但每一根仍然只有开高低收四个价格。',
      volumeUnit: 'USDT quote volume',
      candles: findWindow(kOct, (window) => {
        let score = 0
        let yangRun = 0
        for (const bar of window) {
          const body = Math.abs(bar.close - bar.open)
          const range = bar.high - bar.low || 1
          if (bar.close > bar.open) {
            yangRun += 1
            if ((bar.open - bar.low) / range > 0.45) {
              score += 2
            }
          }
          else {
            if (yangRun >= 3) {
              score += 3
            }
            yangRun = 0
            if ((bar.high - Math.max(bar.open, bar.close)) / range > 0.45) {
              score += 2
            }
          }
          if (body / range < 0.35) {
            score += 0.3
          }
        }
        return score
      }),
      panels: ['ohlc'],
    })

    const ema20All = ema(kSepNov.map(bar => bar.close), 20)
    const vis102bars = findWindow(kSepNov, (window, start) => {
      const values = ema20All.slice(start, start + window.length)
      let above = 0
      let below = 0
      let flat = 0
      for (let i = 1; i < window.length; i += 1) {
        const line = values[i]
        const prev = values[i - 1]
        if (line == null) {
          continue
        }
        if (window[i].close > line) {
          above += 1
        }
        if (window[i].close < line) {
          below += 1
        }
        if (prev != null && Math.abs(line - prev) / line < 0.0012) {
          flat += 1
        }
      }
      return Math.min(above, 40) + Math.min(below, 40) + Math.min(flat, 25)
    })
    const vis102 = packChart({
      id: 'vis-102',
      title: 'EMA 真实行情教学窗',
      timeframe: '4h',
      teachingQuestion: '价格相对 EMA 的位置会切换，均线也会滞后，不能只靠「站上均线」做决定。',
      volumeUnit: 'USDT quote volume',
      candles: vis102bars,
      overlays: { ema20: ema(vis102bars.map(bar => bar.close), 20) },
      panels: ['ohlc', 'ema'],
      parameters: { ema: 20 },
    })

    const macdAll = macd(kAugOct.map(bar => bar.close))
    const vis103bars = findWindow(kAugOct, (window, start) => {
      let crosses = 0
      for (let i = 1; i < window.length; i += 1) {
        const a = macdAll.dif[start + i - 1]
        const b = macdAll.dea[start + i - 1]
        const c = macdAll.dif[start + i]
        const d = macdAll.dea[start + i]
        if (a != null && b != null && c != null && d != null && (a - b) * (c - d) < 0) {
          crosses += 1
        }
      }
      return crosses
    })
    const vis103 = packChart({
      id: 'vis-103',
      title: 'MACD 真实行情教学窗',
      timeframe: '4h',
      teachingQuestion: '实盘交叉会滞后，也可能连续来回；交叉出现后价格仍可能继续原方向。',
      volumeUnit: 'USDT quote volume',
      candles: vis103bars,
      macd: macd(vis103bars.map(bar => bar.close)),
      panels: ['ohlc', 'macd'],
      parameters: { macd: '12/26/9' },
    })

    const rsiAll = wilderRsi(kJulSep.map(bar => bar.close), 14)
    const vis104bars = findWindow(kJulSep, (window, start) => {
      let stay = 0
      for (let i = 1; i < window.length; i += 1) {
        const rsi = rsiAll[start + i]
        if (rsi != null && rsi > 70 && window[i].close >= window[i - 1].close) {
          stay += 1
        }
        if (rsi != null && rsi < 30 && window[i].close <= window[i - 1].close) {
          stay += 1
        }
      }
      return stay
    })
    const vis104 = packChart({
      id: 'vis-104',
      title: 'RSI 真实行情教学窗',
      timeframe: '4h',
      teachingQuestion: 'RSI 进入 70 / 30 观察区之后，价格常常不会立刻反向。',
      volumeUnit: 'USDT quote volume',
      candles: vis104bars,
      rsi: wilderRsi(vis104bars.map(bar => bar.close), 14),
      panels: ['ohlc', 'rsi'],
      parameters: { rsi: 14 },
    })

    const vis105 = packChart({
      id: 'vis-105',
      title: '成交量真实行情教学窗',
      timeframe: '4h',
      teachingQuestion: '成交量高低差很大，量增或量缩要先相对附近柱子比较，不能看成绝对多空结论。',
      volumeUnit: 'USDT quote volume',
      candles: findWindow(kOct, (window) => {
        const mean = window.reduce((sum, bar) => sum + bar.volume, 0) / window.length
        let pairs = 0
        for (let i = 1; i < window.length; i += 1) {
          const up = window[i].close > window[i - 1].close
          if (up && window[i].volume > mean * 1.3) {
            pairs += 1
          }
          if (up && window[i].volume < mean * 0.7) {
            pairs += 1
          }
        }
        return pairs
      }),
      panels: ['ohlc', 'volume'],
    })

    const vis106bars = findWindow(kSepOct, (window) => {
      const aligned = alignOiToCandles(window, oi).oi
      let score = 0
      for (let i = 1; i < window.length; i += 1) {
        if (aligned[i] == null || aligned[i - 1] == null) {
          continue
        }
        const priceUp = window[i].close > window[i - 1].close
        const oiUp = aligned[i] > aligned[i - 1]
        if (priceUp && oiUp) {
          score += 1
        }
        if (!oiUp) {
          score += 0.6
        }
      }
      return score
    })
    const vis106aligned = alignOiToCandles(vis106bars, oi)
    const vis106 = packChart({
      id: 'vis-106',
      title: '持仓量真实行情教学窗',
      timeframe: '4h',
      teachingQuestion: 'OI 与价格可以同向也可以反向，读图时要同时看两条线，不能只看 OI 升降。',
      volumeUnit: 'USDT quote volume',
      oiUnit: 'USDT notional；由 5 分钟 metrics 取该 4h 桶内最后快照',
      candles: vis106bars,
      oi: vis106aligned.oi,
      oiContracts: vis106aligned.oiContracts,
      panels: ['ohlc', 'oi'],
    })

    const vis107bars = findWindow(k8h, (window) => {
      const aligned = alignByTime(window, funding, item => item.rate)
      let pos = 0
      let neg = 0
      let ext = 0
      for (const rate of aligned) {
        if (rate == null) {
          continue
        }
        if (rate > 0) {
          pos += 1
        }
        if (rate < 0) {
          neg += 1
        }
        if (Math.abs(rate) > 0.0002) {
          ext += 1
        }
      }
      return Math.min(pos, 40) + Math.min(neg, 40) + ext
    }, 90)
    const vis107 = packChart({
      id: 'vis-107',
      title: '资金费率真实行情教学窗',
      timeframe: '8h',
      teachingQuestion: '实盘费率大多在零轴附近小幅摆动；偏高或偏低时，价格仍可能沿原方向走一段时间。',
      volumeUnit: 'USDT quote volume',
      fundingUnit: 'decimal rate, 0.0001 = 0.01%',
      candles: vis107bars,
      funding: alignByTime(vis107bars, funding, item => item.rate),
      panels: ['ohlc', 'funding'],
      parameters: { settlement: '8h typical on BTCUSDT' },
    })

    for (const chart of [vis101, vis102, vis103, vis104, vis105, vis106, vis107]) {
      await writeFile(join(dataDir, `${chart.id}.json`), `${JSON.stringify(chart, null, 2)}\n`)
      await writeFile(join(imageDir, FILE_NAMES[chart.id]), renderSvg(chart))
      console.log('wrote', chart.id, chart.period.start, '→', chart.period.end, chart.candles.length)
    }
  }
  finally {
    await rm(work, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
