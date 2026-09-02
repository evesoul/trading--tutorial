# QA RESULT — Sprint 001/002

终审日期：2026-09-02  
复测日期：2026-09-02  
Owner：QA Agent  
范围：TASK-008；主路径 `/` → `/course` → kline → ma → ema → rsi，以及 `/combinations` 空状态。

## QA RESULT

Code: PASS  
Content: PASS  
Visual: PASS

Issues:

- resolved / UI / Mobile 390 菜单面板曾被 `.site-header` 的 `backdrop-filter` 锁在页头里（高约 51px）。复测：已去掉 `backdrop-filter`，面板 `z-index: 45`。CDP 鼠标点「菜单」后高度 776px（844 − `--header-h` 68），`vis: visible`，截图为全屏滑出，正文徽章不再露在菜单上。再点「关闭菜单」恢复。
- resolved / Content / RSI 文末已改为「可先回 [怎么学](/course)」。预览 HTML 链接字面量是「怎么学」，无 `/course` 字面链、无 `/indicators/volume`。
- resolved / UI / `.lesson-prose h1:first-of-type` 现为 `display: none`。CDP 在 K 线 / RSI 测得 `proseH1Display: none`。
- low / Nuxt / `npm run build` 仍有 Nitro 上游 `H3Error` unused import 警告，不影响通过。
- info / Visual / 真实行情图 vis-101–107 仅有 spec，课文未插假图。属已知缺口，不构成 FAIL。
- info / Content / `/glossary` 无词条正文，空状态回 `/course`。导学可链，属已知缺口。

无新的 high 级问题。

Recommendation:  
APPROVE

## 验证方法

### 代码

初审已通过；复测未重跑 lint / typecheck。编排器声明已 `npm run build`，预览在 `http://127.0.0.1:3000`（复测 HTTP 200）。

源码 `*.ts` / `*.vue` 无 `any`。课文未写死在 Vue。未发布 slug 走 `resolvePublishedPath`，RSI 的 `learning.next: volume` 不生成 `href="/indicators/volume"`。

### 内容

初审五篇主路径 + 知识库抽检结论不变。复测只核已修的 low：RSI 文末「怎么学」链。

术语与 Knowledge 对齐：MA 默认 SMA；正文用强平；Timeframe 与 Period 分开写；金叉 / 超买 / 背离均为观察用语。  
`content/` 课文检索无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利。  
未插入 vis-101–107。示意图 alt 含「示意图」。

### 链接

初审 SSR 抽查与 `node tests/check-sprint001-links.mjs` 已通过。复测 RSI HTML：无 `href="/indicators/volume"`，文末为「怎么学」。

### 视觉

Cursor 浏览器 MCP 仍不可用。**未**仅用 curl/SSR 给 Visual 过关。

复测：本机 Chrome headless + CDP，`Emulation.setDeviceMetricsOverride` 390×844，`deviceScaleFactor: 1`。  
开/关使用 `Input.dispatchMouseEvent`（mouseMoved → mousePressed → mouseReleased）点「菜单」中心，**不用** `Runtime.evaluate` 的 `click()`。

| 状态 | 首页 / K 线 / RSI |
|---|---|
| 打开前 | 「菜单」，`aria-expanded=false`，面板 `vis: hidden`，高 776，在视口右侧 |
| 鼠标点开 | 「关闭菜单」，`aria-expanded=true`，面板 `left: 0`、`h: 776`、`z-index: 45` |
| 鼠标点关 | 回到「菜单」，面板再次移出视口 |

几何上菜单第一项与正文徽章的 `getBoundingClientRect` 在打开时仍相交（徽章还在文档流里），但面板不透明且盖住徽章以下整屏。截图确认看不见「首页」叠在「教育站」上——这与初审 FAIL（面板只有 51px、徽章露在外面）不是同一问题，不升为 high。

Desktop 1280 初审已过：页中风险块、横排导航、示意图宽 680px、侧栏 sticky。本次 CSS 未改这些规则。

因此 Visual **PASS**，三项均 PASS，可以 APPROVE。
