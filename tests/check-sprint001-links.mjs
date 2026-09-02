/**
 * Sprint 001/002 链接抽查。需要预览服务已启动。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint001-links.mjs
 */
const base = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')

const pages = [
  '/',
  '/course',
  '/indicators',
  '/indicators/kline',
  '/indicators/ma',
  '/indicators/ema',
  '/indicators/rsi',
  '/combinations',
  '/trading-system',
  '/glossary',
  '/indicators/volume',
]

const forbidden = ['href="/indicators/volume"', 'href="/indicators/macd"', 'href="../macd"']
const required = {
  '/': ['开始学习', '先看风险'],
  '/course': ['从 K 线开始'],
  '/indicators/rsi': ['Volume 编写中', '回怎么学'],
  '/combinations': ['组合课尚未开放'],
  '/trading-system': ['交易系统课尚未开放'],
  '/glossary': ['术语表建设中'],
  '/indicators/volume': ['这篇指标课还没发布'],
}

let failed = 0

for (const path of pages) {
  const url = `${base}${path}`
  const res = await fetch(url)
  const html = await res.text()
  if (res.status !== 200) {
    console.error(`FAIL ${path} HTTP ${res.status}`)
    failed += 1
    continue
  }
  for (const needle of forbidden) {
    if (html.includes(needle)) {
      console.error(`FAIL ${path} contains ${needle}`)
      failed += 1
    }
  }
  for (const text of required[path] ?? []) {
    if (!html.includes(text)) {
      console.error(`FAIL ${path} missing "${text}"`)
      failed += 1
    }
  }
  console.log(`OK   ${path}`)
}

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log('\nAll Sprint 001/002 link checks passed')
