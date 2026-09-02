/**
 * Sprint 007 视觉抽查：本机 Chrome headless + CDP。
 * 需要预览已在 BASE_URL 运行。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint007-visual.mjs
 */
import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const base = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')
const chromeBin = process.env.CHROME_BIN
  ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const debugPort = Number(process.env.CDP_PORT ?? 9337)
const outDir = process.env.QA_SHOT_DIR ?? join(tmpdir(), 'qa-sprint007')

let failed = 0
const notes = []

function fail(message) {
  failed += 1
  console.error(`FAIL ${message}`)
}

function ok(message) {
  console.log(`OK   ${message}`)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class Cdp {
  constructor(ws) {
    this.ws = ws
    this.nextId = 1
    this.pending = new Map()
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(String(event.data))
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        if (msg.error) {
          reject(new Error(JSON.stringify(msg.error)))
        }
        else {
          resolve(msg.result)
        }
      }
    })
  }

  send(method, params = {}) {
    const id = this.nextId++
    this.ws.send(JSON.stringify({ id, method, params }))
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
    })
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text ?? 'evaluate failed')
    }
    return result.result?.value
  }
}

async function waitForJson(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url)
      if (res.ok) {
        return await res.json()
      }
    }
    catch {
      // chrome still starting
    }
    await sleep(150)
  }
  throw new Error(`Chrome DevTools not ready at ${url}`)
}

async function clickCenter(cdp, cx, cy) {
  const opts = { x: cx, y: cy, button: 'left', clickCount: 1 }
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: cx, y: cy })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...opts })
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...opts })
}

async function goto(cdp, path) {
  const url = `${base}${path}`
  await cdp.send('Page.navigate', { url })
  await sleep(700)
  await cdp.evaluate('document.readyState')
}

async function screenshot(cdp, name) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' })
  const file = join(outDir, name)
  await writeFile(file, Buffer.from(data, 'base64'))
  notes.push(`shot ${file}`)
  return file
}

async function setViewport(cdp, width, height) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  })
}

const chromeProfile = await mkdtemp(join(tmpdir(), 'chrome-qa-s007-'))
await mkdir(outDir, { recursive: true })

const chrome = spawn(chromeBin, [
  '--headless=new',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${chromeProfile}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  'about:blank',
], {
  stdio: 'ignore',
})

const expectedHrefs = [
  '/indicators/kline',
  '/indicators/ma',
  '/indicators/ema',
  '/indicators/rsi',
  '/indicators/volume',
  '/indicators/macd',
  '/indicators/kdj',
  '/indicators/bollinger-bands',
  '/indicators/open-interest',
  '/indicators/funding-rate',
  '/indicators/long-short-ratio',
  '/indicators/cvd',
  '/combinations/trend-momentum',
  '/combinations/trend-volume',
  '/combinations/rsi-macd',
  '/combinations/price-oi',
  '/combinations/oi-volume',
  '/combinations/funding-oi',
  '/combinations/multi-indicator',
  '/trading-system/what-is-a-trading-system',
  '/trading-system/market-regime',
  '/trading-system/direction',
  '/trading-system/entry-rules',
  '/trading-system/exit-rules',
  '/trading-system/stop-loss',
  '/trading-system/take-profit',
  '/trading-system/position-sizing',
  '/trading-system/risk-management',
  '/trading-system/trade-frequency',
  '/trading-system/trading-journal',
  '/trading-system/backtesting',
  '/trading-system/statistics',
  '/trading-system/system-optimization',
  '/trading-system/case-study',
]

let cdp
try {
  await waitForJson(`http://127.0.0.1:${debugPort}/json/version`)
  const targets = await waitForJson(`http://127.0.0.1:${debugPort}/json/list`)
  const pageTarget = (Array.isArray(targets) ? targets : [])
    .find(item => item.type === 'page' && item.webSocketDebuggerUrl)
  if (!pageTarget) {
    throw new Error(`no page target: ${JSON.stringify(targets)}`)
  }
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve)
    ws.addEventListener('error', reject)
  })
  cdp = new Cdp(ws)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  await setViewport(cdp, 1280, 800)
  await goto(cdp, '/course')
  const course = await cdp.evaluate(`(() => {
    const items = [...document.querySelectorAll('.path-steps li')].map((li, i) => {
      const link = li.querySelector('a.path-steps__item')
      const staticItem = li.querySelector('.path-steps__item.is-static')
      return {
        index: i + 1,
        title: (link || staticItem)?.querySelector('strong')?.textContent?.trim() ?? '',
        href: link?.getAttribute('href') ?? null,
        writing: Boolean(staticItem),
        label: (link || staticItem)?.querySelector('.path-steps__kicker')?.textContent?.trim() ?? '',
      }
    })
    const html = document.documentElement.outerHTML
    return {
      items,
      hasHandoff: html.includes('HANDOFF'),
      hasUnfinishedCopy: html.includes('后半仍在编写'),
      writingTitles: items.filter(item => item.writing).map(item => item.title),
      stepCount: items.length,
    }
  })()`)

  if (course.stepCount !== 34) {
    fail(`/course 路径步数是 ${course.stepCount}，应为 8 + 4 + 7 + 15`)
  }
  else {
    ok('/course 路径步数 34（主路径 8 + 合约层 4 + 组合 7 + 系统 15）')
  }
  if (course.hasHandoff) {
    fail('/course 列出 HANDOFF')
  }
  if (course.hasUnfinishedCopy) {
    fail('/course 仍写「后半仍在编写」')
  }
  else {
    ok('/course 不再写「后半仍在编写」')
  }
  if (course.writingTitles.length) {
    fail(`/course 仍有编写中步骤：${course.writingTitles.join(', ')}`)
  }

  for (const [i, href] of expectedHrefs.entries()) {
    const step = course.items[i]
    let expectedLabel
    if (i < 8) {
      expectedLabel = `主路径 ${i + 1}`
    }
    else if (i < 12) {
      expectedLabel = `合约数据层 ${i - 7}`
    }
    else if (i < 19) {
      expectedLabel = `指标组合 ${i - 11}`
    }
    else {
      expectedLabel = `交易系统 ${i - 18}`
    }
    if (!step || step.href !== href || step.writing) {
      fail(`/course 第 ${i + 1} 步应为可点 ${href}，实际 ${JSON.stringify(step)}`)
    }
    else if (step.label !== expectedLabel) {
      fail(`/course 第 ${i + 1} 步标签异常：${JSON.stringify(step)} 期望 ${expectedLabel}`)
    }
    else {
      ok(`/course 第 ${i + 1} 步 ${step.label} ${step.title} → ${href}`)
    }
  }
  await screenshot(cdp, 'desktop-course.png')

  const walkHrefs = [
    ...expectedHrefs.slice(0, 8),
    ...expectedHrefs.slice(19),
  ]
  for (const href of walkHrefs) {
    await goto(cdp, href)
    const page = await cdp.evaluate(`(() => ({
      statusOk: document.body?.innerText?.length > 80,
      title: document.querySelector('h1')?.textContent?.trim() ?? '',
      empty: document.body.innerText.includes('这篇指标课还没发布')
        || document.body.innerText.includes('这篇组合课还没发布')
        || document.body.innerText.includes('这篇系统课还没发布'),
    }))()`)
    if (!page.statusOk || page.empty) {
      fail(`走路径 ${href} 未打开课文`)
    }
    else {
      ok(`走路径 ${href} → ${page.title}`)
    }
  }

  await goto(cdp, '/trading-system/position-sizing')
  const sizing = await cdp.evaluate(`(() => {
    const html = document.documentElement.outerHTML
    const link = document.querySelector('a[href="/trading-system/risk-management"]')
    const nextLinks = [...document.querySelectorAll('.lesson-pager a')].map(a => a.getAttribute('href'))
    return {
      hasHref: html.includes('href="/trading-system/risk-management"'),
      linkText: link?.textContent?.trim() ?? '',
      nextLinks,
    }
  })()`)
  if (!sizing.hasHref) {
    fail('仓位页不可点 /trading-system/risk-management')
  }
  else {
    ok(`仓位可点 risk-management（${sizing.linkText || '有 href'}）`)
  }
  if (!sizing.nextLinks.includes('/trading-system/risk-management')) {
    fail(`仓位页脚未链到 risk-management：${JSON.stringify(sizing.nextLinks)}`)
  }
  else {
    ok('仓位页脚下一篇是 risk-management')
  }
  await screenshot(cdp, 'desktop-position-sizing.png')

  await goto(cdp, '/trading-system/case-study')
  const caseStudy = await cdp.evaluate(`(() => {
    const html = document.documentElement.outerHTML
    const courseLink = document.querySelector('a[href="/course"]')
    const nextLinks = [...document.querySelectorAll('.lesson-pager a')].map(a => a.getAttribute('href'))
    const writing = [...document.querySelectorAll('.pager-card--muted')].map(el => el.textContent.trim())
    return {
      hasCourse: html.includes('href="/course"'),
      courseText: courseLink?.textContent?.trim() ?? '',
      nextLinks,
      writing,
      bodyHasWriting: document.body.innerText.includes('编写中'),
    }
  })()`)
  if (!caseStudy.hasCourse) {
    fail('案例页文末不可回 /course')
  }
  else {
    ok(`案例可回 /course（${caseStudy.courseText || '有 href'}）`)
  }
  if (caseStudy.writing.length || caseStudy.bodyHasWriting) {
    fail(`案例页出现未发布/编写中：${JSON.stringify(caseStudy)}`)
  }
  else {
    ok('案例页无未发布系统课死链或编写中')
  }
  await screenshot(cdp, 'desktop-case-study.png')

  const figurePages = [
    {
      path: '/trading-system/risk-management',
      vis: 'vis-008',
      altNeed: '示意图',
      shot: 'desktop-risk-management.png',
    },
    {
      path: '/trading-system/backtesting',
      vis: 'vis-019',
      altNeed: '示意图',
      extraAlt: '胜率',
      shot: 'desktop-backtesting.png',
    },
    {
      path: '/trading-system/case-study',
      vis: 'vis-020',
      altNeed: '示意图',
      extraAlt: '作业纸',
      shot: 'desktop-case-study-figure.png',
    },
  ]

  for (const item of figurePages) {
    await goto(cdp, item.path)
    const page = await cdp.evaluate(`(() => {
      const vis = ${JSON.stringify(item.vis)}
      const img = document.querySelector('img[src*="' + vis + '"]')
      const html = document.documentElement.outerHTML
      const rect = img ? img.getBoundingClientRect() : null
      return {
        src: img?.getAttribute('src') ?? null,
        alt: img?.getAttribute('alt') ?? '',
        width: rect ? Math.round(rect.width) : 0,
        writing: document.body.innerText.includes('这篇系统课还没发布'),
        fakeCharts: ['vis-101', 'vis-102', 'vis-103', 'vis-104', 'vis-105', 'vis-106', 'vis-107']
          .some(id => html.includes(id)),
      }
    })()`)
    if (!page.src || !page.alt.includes(item.altNeed) || page.writing) {
      fail(`${item.path} 图 alt 缺示意图：${JSON.stringify(page)}`)
    }
    else if (item.extraAlt && !page.alt.includes(item.extraAlt)) {
      fail(`${item.path} 图 alt 缺口：${JSON.stringify(page)}`)
    }
    else if (page.fakeCharts) {
      fail(`${item.path} 插入了 vis-101–107`)
    }
    else {
      ok(`${item.path} ${item.vis} alt="${page.alt}" 宽 ${page.width}`)
    }
    await screenshot(cdp, item.shot)
  }

  await setViewport(cdp, 390, 844)
  await goto(cdp, '/course')
  await sleep(200)
  const before = await cdp.evaluate(`(() => {
    const btn = document.querySelector('.site-nav__toggle')
    const panel = document.querySelector('.site-nav__panel')
    const header = document.querySelector('.site-header')
    const br = btn.getBoundingClientRect()
    const pr = panel.getBoundingClientRect()
    const hs = getComputedStyle(header)
    const ps = getComputedStyle(panel)
    return {
      btnText: btn.textContent.trim(),
      expanded: btn.getAttribute('aria-expanded'),
      headerFilter: hs.backdropFilter || hs.webkitBackdropFilter || 'none',
      panelVis: ps.visibility,
      panelH: Math.round(pr.height),
      panelLeft: Math.round(pr.left),
      zIndex: ps.zIndex,
      btn: { x: br.x + br.width / 2, y: br.y + br.height / 2 },
    }
  })()`)
  if (before.headerFilter !== 'none') {
    fail(`Mobile 页头仍有 backdrop-filter: ${before.headerFilter}`)
  }
  else {
    ok('Mobile 页头 backdrop-filter 为 none')
  }
  await clickCenter(cdp, before.btn.x, before.btn.y)
  await sleep(350)
  const opened = await cdp.evaluate(`(() => {
    const btn = document.querySelector('.site-nav__toggle')
    const panel = document.querySelector('.site-nav__panel')
    const pr = panel.getBoundingClientRect()
    const ps = getComputedStyle(panel)
    return {
      btnText: btn.textContent.trim(),
      expanded: btn.getAttribute('aria-expanded'),
      panelVis: ps.visibility,
      panelH: Math.round(pr.height),
      panelLeft: Math.round(pr.left),
      zIndex: ps.zIndex,
      classOpen: panel.classList.contains('is-open'),
    }
  })()`)
  await screenshot(cdp, 'mobile-390-menu-open.png')
  const expectedH = 844 - 68
  if (
    opened.btnText !== '关闭菜单'
    || opened.expanded !== 'true'
    || opened.panelVis !== 'visible'
    || opened.panelLeft !== 0
    || opened.panelH < expectedH - 8
    || Number(opened.zIndex) < 45
  ) {
    fail(`Mobile 菜单打开异常：${JSON.stringify({ before, opened })}`)
  }
  else {
    ok(`Mobile 390 点菜单：${opened.btnText} h=${opened.panelH} z=${opened.zIndex}`)
  }

  const closeBtn = await cdp.evaluate(`(() => {
    const btn = document.querySelector('.site-nav__toggle')
    const br = btn.getBoundingClientRect()
    return { x: br.x + br.width / 2, y: br.y + br.height / 2 }
  })()`)
  await clickCenter(cdp, closeBtn.x, closeBtn.y)
  await sleep(350)
  const closed = await cdp.evaluate(`(() => {
    const btn = document.querySelector('.site-nav__toggle')
    const panel = document.querySelector('.site-nav__panel')
    const ps = getComputedStyle(panel)
    return {
      btnText: btn.textContent.trim(),
      expanded: btn.getAttribute('aria-expanded'),
      panelVis: ps.visibility,
    }
  })()`)
  if (closed.btnText !== '菜单' || closed.expanded !== 'false' || closed.panelVis !== 'hidden') {
    fail(`Mobile 菜单关闭异常：${JSON.stringify(closed)}`)
  }
  else {
    ok('Mobile 390 关闭菜单恢复')
  }
}
catch (error) {
  fail(`CDP 脚本异常：${error instanceof Error ? error.message : String(error)}`)
}
finally {
  try {
    cdp?.ws.close()
  }
  catch {
    // ignore
  }
  chrome.kill('SIGTERM')
}

if (failed) {
  console.error(`\n${failed} visual check(s) failed`)
  process.exit(1)
}

console.log('\nAll Sprint 007 visual checks passed')
for (const note of notes) {
  console.log(note)
}
