/**
 * Sprint 003 视觉抽查：本机 Chrome headless + CDP。
 * 需要预览已在 BASE_URL 运行。
 * 用法：BASE_URL=http://127.0.0.1:3000 node tests/check-sprint003-visual.mjs
 */
import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const base = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')
const chromeBin = process.env.CHROME_BIN
  ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const debugPort = Number(process.env.CDP_PORT ?? 9333)
const outDir = process.env.QA_SHOT_DIR ?? join(tmpdir(), 'qa-sprint003')

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

const chromeProfile = await mkdtemp(join(tmpdir(), 'chrome-qa-s003-'))
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
      }
    })
    const html = document.documentElement.outerHTML
    return {
      items,
      hasOpenInterestHref: html.includes('href="/indicators/open-interest"'),
      hasHandoff: html.includes('HANDOFF'),
      stepCount: items.length,
    }
  })()`)

  if (course.stepCount !== 8) {
    fail(`/course 八步数量是 ${course.stepCount}`)
  }
  else {
    ok('/course 八步数量 8')
  }
  if (course.hasOpenInterestHref) {
    fail('/course 含 href="/indicators/open-interest"')
  }
  if (course.hasHandoff) {
    fail('/course 列出 HANDOFF')
  }
  const expectedHrefs = [
    '/indicators/kline',
    '/indicators/ma',
    '/indicators/ema',
    '/indicators/rsi',
    '/indicators/volume',
    '/indicators/macd',
    '/indicators/kdj',
    '/indicators/bollinger-bands',
  ]
  for (const [i, href] of expectedHrefs.entries()) {
    const step = course.items[i]
    if (!step || step.href !== href || step.writing) {
      fail(`/course 第 ${i + 1} 步应为可点 ${href}，实际 ${JSON.stringify(step)}`)
    }
    else {
      ok(`/course 第 ${i + 1} 步 ${step.title} → ${href}`)
    }
  }
  await screenshot(cdp, 'desktop-course.png')

  for (const href of expectedHrefs) {
    await goto(cdp, href)
    const page = await cdp.evaluate(`(() => ({
      statusOk: document.body?.innerText?.length > 80,
      title: document.querySelector('h1')?.textContent?.trim() ?? '',
      empty: document.body.innerText.includes('这篇指标课还没发布'),
    }))()`)
    if (!page.statusOk || page.empty) {
      fail(`走八步 ${href} 未打开课文`)
    }
    else {
      ok(`走八步 ${href} → ${page.title}`)
    }
  }

  await goto(cdp, '/indicators/kdj')
  const kdj = await cdp.evaluate(`(() => {
    const img = document.querySelector('img[src*="vis-009"]')
    return {
      src: img?.getAttribute('src') ?? null,
      alt: img?.getAttribute('alt') ?? '',
      width: img ? Math.round(img.getBoundingClientRect().width) : 0,
      hasKLineAsLineName: /KDJ[^\\n]{0,40}K 线/.test(document.body.innerText),
    }
  })()`)
  if (!kdj.src || !kdj.alt.includes('示意图')) {
    fail(`KDJ 图 alt 缺示意图：${JSON.stringify(kdj)}`)
  }
  else {
    ok(`KDJ vis-009 alt="${kdj.alt}" 宽 ${kdj.width}`)
  }
  await screenshot(cdp, 'desktop-kdj.png')

  await goto(cdp, '/indicators/bollinger-bands')
  const bb = await cdp.evaluate(`(() => {
    const img = document.querySelector('img[src*="vis-010"]')
    const html = document.documentElement.outerHTML
    return {
      src: img?.getAttribute('src') ?? null,
      alt: img?.getAttribute('alt') ?? '',
      width: img ? Math.round(img.getBoundingClientRect().width) : 0,
      hasOpenInterestHref: html.includes('href="/indicators/open-interest"'),
      hasOiWriting: document.body.innerText.includes('OI 编写中'),
    }
  })()`)
  if (!bb.src || !bb.alt.includes('示意图')) {
    fail(`布林带图 alt 缺示意图：${JSON.stringify(bb)}`)
  }
  else {
    ok(`布林带 vis-010 alt="${bb.alt}" 宽 ${bb.width}`)
  }
  if (bb.hasOpenInterestHref) {
    fail('布林带页含 href="/indicators/open-interest"')
  }
  if (!bb.hasOiWriting) {
    fail('布林带页未见 OI 编写中')
  }
  await screenshot(cdp, 'desktop-bollinger.png')

  await goto(cdp, '/glossary')
  const glossary = await cdp.evaluate(`(() => {
    const text = document.body.innerText
    const titles = [
      '市场与合约',
      '保证金、杠杆与强平',
      '价格图与均线',
      '动量、成交与合约数据',
      '观察用语',
      '教学与风险用语',
    ]
    return {
      missing: titles.filter(t => !text.includes(t)),
      hasHandoff: text.includes('HANDOFF') || text.includes('术语表建设中'),
      hasSma: text.includes('简单移动平均'),
      hasKValue: text.includes('K 值'),
      hasLiq: text.includes('强平'),
    }
  })()`)
  if (glossary.missing.length || glossary.hasHandoff) {
    fail(`/glossary 词条或 HANDOFF：${JSON.stringify(glossary)}`)
  }
  else {
    ok('/glossary 六组词条在，无 HANDOFF')
  }
  await screenshot(cdp, 'desktop-glossary.png')

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

console.log('\nAll Sprint 003 visual checks passed')
for (const note of notes) {
  console.log(note)
}
