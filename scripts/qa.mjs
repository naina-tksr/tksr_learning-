/**
 * TKSR Career — CDP/headless-Chrome QA harness.
 *
 * Plain Node (built-ins only). Spawns a headless Chrome via the DevTools
 * Protocol and validates the running Vite app: page load, console
 * errors/warnings, uncaught exceptions, horizontal overflow, key routes,
 * mobile navigation, the Buy Now / enrollment-intent flow, representative
 * CTA navigation and the two previously-fixed narrow-width pages.
 *
 * Exits non-zero if ANY assertion fails.
 *
 * Usage:  node scripts/qa.mjs
 * Env:    CHROME_BIN (optional) — path to a Chrome/Chromium/Edge executable.
 *         The Vite dev server at http://localhost:5174 is reused if already
 *         running; otherwise this script starts it using the project's Vite
 *         binary and cleans it up on exit.
 */
import { spawn } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.QA_BASE_URL || 'http://localhost:5174'
const VITE_PORT = 5174
const HEIGHT = 900

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Poll a page expression until it returns a truthy value or we time out. */
async function waitFor(expression, what, timeout = 5000) {
  const t0 = Date.now()
  while (Date.now() - t0 < timeout) {
    const v = await ev(expression).catch(() => null)
    if (v) return v
    await sleep(120)
  }
  throw new Error('timed out waiting for ' + what)
}

/* ------------------------------------------------------------------ */
/* Output helpers                                                       */
/* ------------------------------------------------------------------ */
let passed = 0
let failed = 0
let warnings = 0
const failures = []
const warns = []

function pass(msg) { passed++; console.log(`[PASS] ${msg}`) }
function fail(msg, detail) { failed++; failures.push(detail ? `${msg} — ${detail}` : msg); console.log(`[FAIL] ${msg}${detail ? ` — ${detail}` : ''}`) }
function warn(msg) { warnings++; warns.push(msg); console.log(`[WARN] ${msg}`) }

/* ------------------------------------------------------------------ */
/* Chrome discovery                                                     */
/* ------------------------------------------------------------------ */
function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    // Windows
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe') : null,
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ].filter(Boolean)
  for (const c of candidates) if (existsSync(c)) return c
  return null
}
const CHROME = findChrome()
if (!CHROME) {
  console.error('TKSR CAREER QA\n===============')
  console.error('ERROR: No Chrome/Chromium executable found.')
  console.error('Set the CHROME_BIN environment variable to a Chrome/Chromium/Edge binary')
  console.error('(e.g. Windows: C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe,')
  console.error('      Linux:   /usr/bin/google-chrome,   macOS: /Applications/…/Google Chrome).')
  process.exit(1)
}

/* ------------------------------------------------------------------ */
/* Dev server lifecycle                                                 */
/* ------------------------------------------------------------------ */
let viteProc = null
async function ensureDevServer() {
  try {
    const r = await fetch(BASE + '/', { headers: { accept: 'text/html' } })
    if (r.ok) return { reused: true }
  } catch { /* not running */ }
  const viteBin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js')
  if (!existsSync(viteBin)) throw new Error(`Vite binary missing at ${viteBin} — run npm ci first.`)
  viteProc = spawn(process.execPath, [viteBin, '--port', String(VITE_PORT), '--host'], {
    cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'],
  })
  viteProc.on('exit', (code) => { if (code && code !== 0) console.error(`[QA] vite exited with code ${code}`) })
  const t0 = Date.now()
  while (Date.now() - t0 < 30000) {
    await sleep(300)
    try { const r = await fetch(BASE + '/'); if (r.ok) return { reused: false } } catch { /* wait */ }
  }
  throw new Error('Vite dev server did not become ready on ' + BASE)
}

/* ------------------------------------------------------------------ */
/* Chrome + CDP session                                                 */
/* ------------------------------------------------------------------ */
const PROFILE = join(tmpdir(), 'tksr-qa-' + Date.now())
let chromeProc = null
let ws = null
let seq = 1
const pend = new Map()
let consoleIssues = []

let tab = null
async function connect() {
  // Find a free CDP port
  const http = await import('node:http')
  const cdpHolder = () => new Promise((res) => {
    const srv = http.createServer()
    srv.listen(0, '127.0.0.1', () => { const p = srv.address().port; srv.close(() => res(p)) })
  })
  const cdpPort = await cdpHolder()

  chromeProc = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-extensions',
    '--hide-scrollbars', '--disable-dev-shm-usage', '--disable-background-networking',
    '--remote-allow-origins=*', '--remote-debugging-port=' + cdpPort,
    '--user-data-dir=' + PROFILE, 'about:blank',
  ], { stdio: 'ignore' })

  let ok = false
  for (let i = 0; i < 60; i++) {
    await sleep(250)
    try {
      const r = await fetch(`http://127.0.0.1:${cdpPort}/json/version`)
      if (r.ok) { ok = true; break }
    } catch { /* retry */ }
  }
  if (!ok) throw new Error('Chrome did not expose the DevTools endpoint')

  tab = await fetch(`http://127.0.0.1:${cdpPort}/json/new?` + encodeURIComponent(BASE + '/'), { method: 'PUT' }).then((r) => r.json())

  ws = new WebSocket(tab.webSocketDebuggerUrl)
  ws.onmessage = (ev) => {
    let m
    try { m = JSON.parse(ev.data) } catch { return }
    if (m.id && pend.has(m.id)) {
      const { res, rej } = pend.get(m.id)
      pend.delete(m.id)
      m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)
      return
    }
    if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning')) {
      const text = (m.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 300)
      consoleIssues.push(`${m.params.type}: ${text}`)
    }
    if (m.method === 'Log.entryAdded' && (m.params.entry.level === 'error' || m.params.entry.level === 'warning')) {
      consoleIssues.push(`${m.params.entry.level}: ${String(m.params.entry.text).slice(0, 300)}`)
    }
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails
      consoleIssues.push(`exception: ${String((d.exception && d.exception.description) || d.text).slice(0, 300)}`)
    }
  }
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('CDP websocket failed')) })
}

const send = (method, params = {}) => new Promise((res, rej) => {
  const i = seq++
  pend.set(i, { res, rej })
  ws.send(JSON.stringify({ id: i, method, params }))
})
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.exceptionDetails) throw new Error('EVAL: ' + String((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text).slice(0, 300))
  return r.result ? r.result.value : undefined
}

/* ------------------------------------------------------------------ */
/* Interaction helpers (trusted CDP input events)                      */
/* ------------------------------------------------------------------ */
async function clickSelector(sel, label) {
  // Scroll the target near the viewport center using INSTANT behavior. The app
  // sets `scroll-behavior: smooth` globally; a smooth animated scroll would make
  // freshly-captured coordinates stale by the time input events are dispatched,
  // so we defeat it with an inline override on <html> before scrolling.
  const exists = await ev(`(() => {
    const el = document.querySelector(${JSON.stringify(sel)})
    if (!el) return false
    const prev = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    el.scrollIntoView({ block: 'center', behavior: 'instant' })
    document.documentElement.style.scrollBehavior = prev
    return true
  })()`)
  if (!exists) throw new Error(`selector not found: ${sel}`)
  await sleep(350) // let any remaining layout settle after scrolling
  const pt = await ev(`(() => {
    const el = document.querySelector(${JSON.stringify(sel)})
    if (!el) return null
    const b = el.getBoundingClientRect()
    if (b.width === 0 || b.height === 0) return null
    const x = Math.round(b.left + b.width / 2)
    const y = Math.round(b.top + b.height / 2)
    const top = document.elementFromPoint(x, y)
    const hit = top === el || (el.contains && el.contains(top))
    return { x, y, hit: hit || !!(top && top.closest && top.closest(${JSON.stringify(sel)})) }
  })()`)
  if (!pt) throw new Error(`element not visible: ${sel}`)
  if (!pt.hit) throw new Error(`element ${sel} not clickable — another element covers it at (${pt.x},${pt.y})`)
  await sleep(80)
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pt.x, y: pt.y })
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pt.x, y: pt.y, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pt.x, y: pt.y, button: 'left', clickCount: 1 })
  await sleep(450)
}

async function pressEscape() {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 })
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 })
  await sleep(300)
}

async function setFieldValue(sel, value) {
  await ev(`(() => {
    const el = document.querySelector(${JSON.stringify(sel)})
    if (!el) return false
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)})
    el.dispatchEvent(new Event('input', { bubbles: true }))
    return true
  })()`)
}

/* ------------------------------------------------------------------ */
/* Page navigation + measurement                                       */
/* ------------------------------------------------------------------ */
async function navigate(route, width) {
  consoleIssues = []
  await send('Emulation.setDeviceMetricsOverride', { width, height: HEIGHT, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: BASE + route })
  // Wait until the SPA has rendered real content.
  const t0 = Date.now()
  while (Date.now() - t0 < 6000) {
    const ok = await ev(`(() => {
      if (document.readyState !== 'complete') return false
      const root = document.querySelector('#app')
      if (!root || root.children.length === 0) return false
      return true
    })()`).catch(() => false)
    if (ok) break
    await sleep(150)
  }
  await sleep(350)
}

async function measure(route, width) {
  const out = await ev(`(() => {
    const vw = window.innerWidth
    const scrollW = document.documentElement.scrollWidth
    const bodyText = (document.body.innerText || '').trim().length
    const title = document.title
    return {
      path: location.pathname,
      vw, scrollW, delta: scrollW - vw,
      appChildren: (document.querySelector('#app') || { children: [] }).children.length,
      bodyText,
      title,
      detailMissing: !!document.querySelector('.detail-missing'),
      h1: (document.querySelector('h1') || {}).textContent || '',
      contactGrid: document.querySelector('.contact-grid') ? getComputedStyle(document.querySelector('.contact-grid')).gridTemplateColumns : null,
      courseGrid: document.querySelector('.course-detail') ? getComputedStyle(document.querySelector('.course-detail')).gridTemplateColumns : null,
      mailto: document.querySelectorAll('a[href^="mailto:"]').length,
      tel: document.querySelectorAll('a[href^="tel:"]').length,
    }
  })()`)
  return out
}

/* ------------------------------------------------------------------ */
/* Test definitions                                                     */
/* ------------------------------------------------------------------ */
const VALID_JOB = 'data-analyst-demo'
const VALID_PROJECT = 'analytics-sales-dashboard'
const COURSE = { id: 'devops-cert', title: 'DevOps Certification Training', price: '₹49,999' }
const AI_PROGRAM = 'AI Engineering Select Program'

const ROUTES = [
  { path: '/', kind: 'home' },
  { path: '/jobs', kind: 'list' },
  { path: `/jobs/${VALID_JOB}`, kind: 'valid' },
  { path: '/jobs/invalid-id', kind: 'missing' },
  { path: '/projects', kind: 'list' },
  { path: `/projects/${VALID_PROJECT}`, kind: 'valid' },
  { path: '/projects/invalid-id', kind: 'missing' },
  { path: '/courses', kind: 'list' },
  { path: `/courses/${COURSE.id}`, kind: 'valid', title: COURSE.title },
  { path: '/courses/invalid-id', kind: 'missing' },
  { path: '/about-us', kind: 'page' },
  { path: '/contact-us', kind: 'page' },
  { path: '/sign-in', kind: 'page' },
  { path: '/this-route-does-not-exist', kind: 'redirect' },
]

const VIEWPORTS = [1440, 1280, 1024, 900, 768, 640, 560, 430, 390, 375, 360, 345, 320]
const OVERFLOW_TOLERANCE = 1 // 1px browser rounding tolerance

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
async function main() {
  console.log('TKSR CAREER QA')
  console.log('===============')
  console.log(`Routes: ${ROUTES.length}  Viewports: ${VIEWPORTS.length}  Chrome: ${CHROME}`)

  const { reused } = await ensureDevServer()
  console.log(`Dev server: ${reused ? 'reused' : 'started'} at ${BASE}`)

  await connect()
  await send('Runtime.enable')
  await send('Log.enable')
  await send('Page.enable')

  const gridProbe = {}

  for (const route of ROUTES) {
    for (const width of VIEWPORTS) {
      const label = `${route.path} @${width}`
      try {
        await navigate(route.path, width)
        const m = await measure(route.path, width)
        await sleep(120)

        let ok = true
        const notes = []

        // Page actually rendered
        if (!(m.appChildren > 0) || m.bodyText < 20) { ok = false; notes.push('page appears blank (bodyText=' + m.bodyText + ')') }
        // No console errors/warnings/exceptions during this navigation
        if (consoleIssues.length) {
          ok = false
          notes.push('console: ' + consoleIssues.slice(0, 3).join(' | '))
        }
        // No horizontal overflow beyond rounding tolerance
        if (m.delta > OVERFLOW_TOLERANCE) {
          ok = false
          notes.push(`overflow scrollWidth=${m.scrollW} viewport=${m.vw} delta=${m.delta}px`)
        }
        // Route kind expectations
        if (route.kind === 'redirect' && m.path !== '/') { ok = false; notes.push('expected redirect to / , landed on ' + m.path) }
        if (route.kind === 'missing' && !m.detailMissing) { ok = false; notes.push('expected .detail-missing not-found state') }
        if (route.kind === 'valid' && m.detailMissing) { ok = false; notes.push('unexpected not-found state for valid id') }
        if (route.kind === 'valid' && !m.h1.trim()) { ok = false; notes.push('missing page heading') }
        if (route.title && !m.title.includes(route.title)) { ok = false; notes.push(`title "${m.title}" missing "${route.title}"`) }

        // Record grid layout for the two fixed narrow-width pages
        if (route.path === '/contact-us' || route.path === '/courses/devops-cert') {
          gridProbe[route.path] = gridProbe[route.path] || {}
          gridProbe[route.path][width] = route.path === '/contact-us' ? m.contactGrid : m.courseGrid
        }

        if (ok) pass(label)
        else fail(label, notes.join(' · '))
      } catch (e) {
        fail(label, 'exception: ' + String(e && e.message).slice(0, 200))
      }
    }
  }

  /* ---- Grid layout sanity for the two fixed pages ---- */
  for (const [path, byWidth] of Object.entries(gridProbe)) {
    const single = [320, 430, 768, 1024].map((w) => byWidth[w]).filter(Boolean)
    const wide = byWidth[1440]
    if (single.length && single.every((c) => c.split(' ').length === 1)) pass(`${path}: single-column grid ≤1024px (${single.join(' / ')})`)
    else fail(`${path}: expected single-column grid ≤1024px`, JSON.stringify(byWidth))
    if (wide && wide.split(' ').length === 2) pass(`${path}: two-column grid @1440 (${wide})`)
    else if (wide) fail(`${path}: expected two-column grid @1440`, wide)
  }

  /* ---- Contact form demo (valid + validation) @360 ---- */
  await runInteraction('Contact form @360', async () => {
    await navigate('/contact-us', 360)
    const formOk = await ev(`(() => {
      const form = document.querySelector('.contact-form form')
      if (!form) return null
      return { emptyValid: form.reportValidity(), hasDemoNote: !!document.querySelector('.cf-sub') }
    })()`)
    if (!formOk) throw new Error('contact form not found')
    if (formOk.emptyValid !== false) throw new Error('required-field validation not active (reportValidity true on empty form)')
    if (!formOk.hasDemoNote) throw new Error('demo disclaimer (.cf-sub) missing')
    await setFieldValue('.contact-form input[type="text"]', 'QA Tester')
    await setFieldValue('.contact-form input[type="tel"]', '9800000000')
    await setFieldValue('.contact-form input[type="email"]', 'qa@example.com')
    await setFieldValue('.contact-form textarea', 'Phase 8B sanity')
    await clickSelector('.contact-form .btn-primary', 'contact submit')
    await waitFor(`(() => !!document.querySelector('.contact-form .success'))()`, 'demo success note')
    const ok = await ev(`(() => ({ success: true, overflow: document.documentElement.scrollWidth - window.innerWidth }))()`)
    if (ok.overflow > OVERFLOW_TOLERANCE) throw new Error('horizontal overflow after submit: ' + ok.overflow + 'px')
    if (consoleIssues.length) throw new Error('console: ' + consoleIssues.join(' | '))
  })

  /* ---- Mobile menu open/close @430 ---- */
  await runInteraction('Mobile nav open/close @430', async () => {
    await navigate('/', 430)
    const ham = await ev(`(() => { const h = document.querySelector('.hamburger'); return h ? { visible: h.getBoundingClientRect().width > 0 } : null })()`)
    if (!ham || !ham.visible) throw new Error('hamburger button not visible at 430px')
    await clickSelector('.hamburger', 'hamburger open')
    const open = await ev(`(() => { const p = document.querySelector('.mobile-panel'); return p ? { h: p.getBoundingClientRect().height } : { h: 0 } })()`)
    if (!(open.h > 0)) throw new Error('mobile panel did not open')
    await pressEscape()
    const closed = await ev(`(() => document.querySelector('.mobile-panel') === null)()`)
    if (!closed) throw new Error('mobile panel did not close on Escape')
    if (consoleIssues.length) throw new Error('console: ' + consoleIssues.join(' | '))
  })

  /* ---- Buy Now (homepage sticky CTA) @390 ---- */
  await runInteraction('Buy Now from homepage @390', async () => {
    await navigate('/', 390)
    await clickSelector('.scta .btn-buy', 'home Buy Now')
    const modal = await ev(`(() => {
      const overlays = document.querySelectorAll('.enroll-overlay').length
      const boxes = document.querySelectorAll('.enroll-modal').length
      return {
        overlays, boxes,
        course: (document.querySelector('.enroll-course-name') || {}).textContent || '',
        hasPrice: !!document.querySelector('.enroll-price'),
      }
    })()`)
    if (modal.overlays !== 1 || modal.boxes !== 1) throw new Error(`expected exactly one modal, got overlay=${modal.overlays} modal=${modal.boxes}`)
    if (modal.course.trim() !== AI_PROGRAM) throw new Error(`unexpected course identity: "${modal.course}"`)
    if (modal.hasPrice) throw new Error('a price was shown on the AI select program (no price exists in data — would be fabricated)')
    // validation
    await clickSelector('.enroll-submit', 'enroll submit empty')
    const val = await ev(`(() => ({ nameErr: !!document.querySelector('#enroll-name-error'), emailErr: !!document.querySelector('#enroll-email-error'), nameTxt: (document.querySelector('#enroll-name-error') || {}).textContent || '' }))()`)
    if (!val.nameErr || !val.emailErr) throw new Error('validation errors not shown for empty submit')
    if (!val.nameTxt.includes('Please enter your name.')) throw new Error('unexpected validation copy: ' + val.nameTxt)
    // completed submit — the demo service simulates ~600ms latency
    await setFieldValue('#enroll-name', 'QA Tester')
    await setFieldValue('#enroll-email', 'qa@example.com')
    await setFieldValue('#enroll-phone', '9800000000')
    await clickSelector('.enroll-submit', 'enroll submit complete')
    await waitFor(`(() => !!document.querySelector('.enroll-success-copy'))()`, 'enrollment success state', 6000)
    const sent = await ev(`(() => ({ success: true, heading: (document.querySelector('.enroll-modal h2') || {}).textContent || '' }))()`)
    if (!sent.heading.includes('Enrollment Request Received')) throw new Error('success heading mismatch: ' + sent.heading)
    if (consoleIssues.length) throw new Error('console: ' + consoleIssues.join(' | '))
    // close via the modal's close button — after a successful submit the form
    // fields unmount, so keyboard focus leaves the modal and the Escape
    // keydown handler would never fire; the close button is always present.
    await clickSelector('.enroll-close', 'close modal')
    const gone = await ev(`(() => document.querySelectorAll('.enroll-overlay').length === 0)()`)
    if (!gone) throw new Error('modal did not close via the close button')
  })

  /* ---- Buy Now price passthrough on /courses/devops-cert @390 ---- */
  await runInteraction('Buy Now price on course detail @390', async () => {
    await navigate(`/courses/${COURSE.id}`, 390)
    await clickSelector('.cd-cta .btn-buy', 'course Buy Now')
    await waitFor(`(() => document.querySelectorAll('.enroll-modal').length === 1)()`, 'course enrollment modal')
    const modal = await ev(`(() => ({
      course: (document.querySelector('.enroll-course-name') || {}).textContent || '',
      price: (document.querySelector('.enroll-price') || {}).textContent || '',
    }))()`)
    if (modal.course.trim() !== COURSE.title) throw new Error(`course identity mismatch: "${modal.course}"`)
    if (modal.price.trim() !== 'Program Fee: ' + COURSE.price) throw new Error(`price mismatch: "${modal.price}" (expected "Program Fee: ${COURSE.price}")`)
    await pressEscape()
    const gone = await ev(`(() => document.querySelectorAll('.enroll-overlay').length === 0)()`)
    if (!gone) throw new Error('modal did not close on Escape')
    if (consoleIssues.length) throw new Error('console: ' + consoleIssues.join(' | '))
  })

  /* ---- Representative CTA navigation @1440 ---- */
  await runInteraction('Representative CTA navigation @1440', async () => {
    await navigate('/', 1440)
    await clickSelector('.nav-links a[href="/projects"]', 'nav → /projects')
    let p = await waitFor(`location.pathname === '/projects' ? location.pathname : null`, 'home→projects navigation')
    if (p !== '/projects') throw new Error(`Home→Projects landed on ${p}`)

    await navigate('/', 1440)
    await clickSelector('.nav-links a[href="/jobs"]', 'nav → /jobs')
    p = await waitFor(`location.pathname === '/jobs' ? location.pathname : null`, 'home→jobs navigation')
    if (p !== '/jobs') throw new Error(`Home→Jobs landed on ${p}`)

    await clickSelector('.job-view', 'first job card')
    p = await waitFor(`location.pathname.startsWith('/jobs/') ? location.pathname : null`, 'jobs→detail navigation')
    if (p !== `/jobs/${VALID_JOB}`) throw new Error(`Jobs→detail landed on ${p}`)

    // cloud-devops-demo carries an explicit programId, so its skill-gap panel
    // always lists a program link (data-analyst-demo has none mapped).
    await navigate('/jobs/cloud-devops-demo', 1440)
    await clickSelector('a[href^="/courses/"]', 'job detail → matched course')
    p = await waitFor(`location.pathname.startsWith('/courses/') ? location.pathname : null`, 'job detail→course navigation')
    if (!p.startsWith('/courses/')) throw new Error(`Job detail→course landed on ${p}`)
    await waitFor(`(() => document.querySelector('#app') && !document.querySelector('.detail-missing'))()`, 'matched course render')
    const courseOk = await ev(`(() => !document.querySelector('.detail-missing'))()`)
    if (!courseOk) throw new Error('matched course page shows not-found state')

    await navigate('/', 1440)
    const expl = await ev(`(() => { const a = document.querySelector('.center-cta a[href="/courses"]'); return a ? a.textContent.trim() : null })()`)
    if (!expl) throw new Error('"Explore All Programs" CTA not found on home')
    await clickSelector('.center-cta a[href="/courses"]', 'career section → /courses')
    p = await waitFor(`location.pathname === '/courses' ? location.pathname : null`, 'career→courses navigation')
    if (p !== '/courses') throw new Error(`Career→Courses landed on ${p}`)

    await navigate('/', 1440)
    await clickSelector('.topbar-links a[href="/contact-us"]', 'topbar Need Help?')
    p = await waitFor(`location.pathname === '/contact-us' ? location.pathname : null`, 'topbar→contact navigation')
    if (p !== '/contact-us') throw new Error(`topbar→contact landed on ${p}`)
    if (consoleIssues.length) throw new Error('console: ' + consoleIssues.join(' | '))
  })

  /* ---- Contact links presence ---- */
  await runInteraction('Contact mailto/tel links present', async () => {
    await navigate('/contact-us', 1024)
    const links = await ev(`(() => ({ mailto: document.querySelectorAll('a[href^="mailto:"]').length, tel: document.querySelectorAll('a[href^="tel:"]').length }))()`)
    if (links.mailto < 2) throw new Error(`expected ≥2 mailto links, got ${links.mailto}`)
    if (links.tel < 1) throw new Error(`expected ≥1 tel link, got ${links.tel}`)
  })

  /* ------------------------------------------------------------------ */
  /* Summary                                                             */
  /* ------------------------------------------------------------------ */
  console.log('')
  if (failures.length) {
    console.log('Failures:')
    for (const f of failures) console.log('- ' + f)
  } else {
    console.log('Failures: none')
  }
  console.log('')
  console.log(`Summary:`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)
  console.log(`Warnings: ${warnings}`)
  if (warns.length) for (const w of warns) console.log('WARN: ' + w)
}

async function runInteraction(label, fn) {
  try {
    await fn()
    pass(label)
  } catch (e) {
    fail(label, String(e && e.message).slice(0, 400))
  }
}

/* ------------------------------------------------------------------ */
/* Cleanup + exit                                                      */
/* ------------------------------------------------------------------ */
function cleanup() {
  try { if (viteProc && viteProc.exitCode === null) viteProc.kill() } catch { /* ignore */ }
  try { if (chromeProc && chromeProc.exitCode === null) chromeProc.kill() } catch { /* ignore */ }
  try { if (ws) ws.close() } catch { /* ignore */ }
  try { rmSync(PROFILE, { recursive: true, force: true }) } catch { /* ignore */ }
}

process.on('exit', cleanup)
process.on('SIGINT', () => process.exit(1))
process.on('SIGTERM', () => process.exit(1))

main()
  .catch((e) => {
    console.error('TKSR CAREER QA — FATAL: ' + String(e && e.message).slice(0, 500))
    process.exitCode = 1
    cleanup()
  })
  .then(() => {
    process.exitCode = failed > 0 ? 1 : 0
    cleanup()
  })