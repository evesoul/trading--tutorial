# QA RESULT — Sprint 005

终审日期：2026-09-03  
Owner：QA Agent  
范围：TASK-020；阶段 2 七篇组合课，示意图 vis-013 / 014 / 015 / 016，`/course` 主路径 8 + 合约层 4 + 组合 7。

## QA RESULT

Code: PASS  
Content: PASS  
Visual: PASS

Issues:

- low / Nuxt / `npm run build` 仍有 Nitro 上游 `H3Error` unused import 警告，不影响通过。
- info / UI / `multi-indicator` 页脚因 `what-is-a-trading-system` 未发布，显示「what-is-a-trading-system 编写中」+「回怎么学」。无 `href="/trading-system/what-is-a-trading-system"`。`PLANNED_TITLES` 尚未给阶段 3 中文名，不据此 FAIL。
- info / Visual / 真实行情图 vis-101–107 仅有 spec，课文未插假图。属已知缺口，不构成 FAIL。

无 high 级问题。

Recommendation:  
APPROVE

## 验证方法

### 代码

Node v24.18.0（>= 22.5）。

| 命令 | 结果 |
|---|---|
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过。Content 解析 **26** 个文件（导学 + 12 篇指标 + 7 篇组合 + 6 组术语）。HANDOFF 已 exclude。 |

预览：`npm run preview -- --port 3000`，`http://127.0.0.1:3000`。  
`node tests/check-sprint005-links.mjs` 通过。  
`node tests/check-sprint005-visual.mjs` 通过。

未发布 slug `what-is-a-trading-system` 走 `resolvePublishedPath` → `path: null`。`multi-indicator` 正文与 LessonPager 均不生成 `href="/trading-system/what-is-a-trading-system"`，只显示编写中。

### 内容

七篇结构均为：学习目标 → 概念 → 观察步骤 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。面向零基础，术语首次出现有解释。

口径核对：

- 组合用来对照，不是叠加信号。七篇均把两份观察分开问，不叠成一条开仓条件。
- 金叉 / 超买 / 背离 / 量价齐升写成观察，不是开仓指令。
- `funding-oi`：拥挤与成本过滤，不是反向喊单，也不是倒计时反转器。
- `multi-indicator`：共振是不同问题得到相近答案，**不是指标越多越准确**；冲突时等待，不加第 6 个指标投票。
- 课文检索无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利

链接：

- CVD 文末与导航可点 `[趋势 + 动量](/combinations/trend-momentum)`
- `multi-indicator` 正文回 `[怎么学这门课](/course)`；正文与页脚无 `href="/trading-system/what-is-a-trading-system"`
- Front Matter `learning.next: what-is-a-trading-system` 仅作下一课 slug；`resolvePublishedPath` 为 null
- `/course` 主路径 8 + 合约数据层 4 + 指标组合 7 均可点
- `/combinations` 列出七篇已发布课文

### 链接脚本

`tests/check-sprint005-links.mjs`：25 个页面 HTTP 200；四张示意图 200 且含「示意图」；vis-016 含「不是指标越多越准确」；CVD 有 `href="/combinations/trend-momentum"`；全站无 `href="/trading-system/what-is-a-trading-system"`；未插 vis-101–107。

### 视觉

本机 Chrome headless + CDP（`tests/check-sprint005-visual.mjs`）：

- Desktop 1280：走 `/course` 十九步（主路径 1–8、合约数据层 1–4、指标组合 1–7），每步 `href` 可点并打开对应课文
- vis-013 / 014 / 015 / 016：`alt` 均含「示意图」；016 alt 为「问题槽不是指标堆叠示意图」；图宽 680；正文写明不是指标越多越准确
- CVD 页可点 `/combinations/trend-momentum`
- `multi-indicator` 页脚只显示编写中，无交易系统 href
- Mobile 390×844，`deviceScaleFactor: 1`。`Input.dispatchMouseEvent` 点「菜单」中心，**不用** `Runtime.evaluate` 的 `click()`

| 状态 | `/course` Mobile 390 |
|---|---|
| 打开前 | 「菜单」，`aria-expanded=false`，面板 `vis: hidden`；页头 `backdrop-filter: none` |
| 鼠标点开 | 「关闭菜单」，`aria-expanded=true`，面板 `left: 0`、`h: 798`、`z-index: 45`，截图为全屏米色滑出，正文不露在菜单上 |
| 鼠标点关 | 回到「菜单」，面板再次 `hidden` |

因此 Visual **PASS**，三项均 PASS，可以 APPROVE。

## HANDOFF

### 完成内容

Sprint 005 终审：Code / Content / Visual 三项 PASS，建议 APPROVE。

### 修改文件

- `docs/qa/QA-RESULT-SPRINT-005.md`（本文件）
- `docs/qa/HANDOFF-SPRINT-005.md`
- `docs/qa/content-checklist.md`
- `docs/qa/code-checklist.md`
- `docs/tasks/TASK-020-qa-sprint005.md`（Status → review）
- `tests/check-sprint005-links.mjs`
- `tests/check-sprint005-visual.mjs`

未改 `content/`、`pages/`、`components/`、`public/`。未做 git commit / push。

### 测试结果

lint / typecheck / build 通过。链接脚本与 Chrome CDP 视觉脚本通过。

### 已知问题

见上方 Issues（均为 low / info）。

### 下一步

- UI：`PLANNED_TITLES` 可补阶段 3 中文名，避免 `multi-indicator` 页脚露出 `what-is-a-trading-system`
- Visual：真实行情 vis-101–107 仍待采集
- 下一课：阶段 3 发布前，继续不要链 `/trading-system/{slug}`
