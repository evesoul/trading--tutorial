# QA RESULT — Sprint 004

终审日期：2026-09-02  
Owner：QA Agent  
范围：TASK-016；合约数据层四篇 OI / Funding / LSR / CVD，示意图 vis-006 / vis-007 / vis-011 / vis-012，`/course` 主路径 8 + 合约层 4。

## QA RESULT

Code: PASS  
Content: PASS  
Visual: PASS

Issues:

- low / Nuxt / `npm run build` 仍有 Nitro 上游 `H3Error` unused import 警告，不影响通过。
- info / UI / CVD 页脚下一篇因 `trend-momentum` 未发布，显示「trend-momentum 编写中」+「回怎么学」。无 `href="/combinations/"`。`PLANNED_TITLES` 尚未给组合课中文名，不据此 FAIL。
- info / Visual / 真实行情图 vis-101–107 仅有 spec，课文未插假图。属已知缺口，不构成 FAIL。

无 high 级问题。

Recommendation:  
APPROVE

## 验证方法

### 代码

| 命令 | 结果 |
|---|---|
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过。Content 解析 **19** 个文件（导学 + 12 篇指标 + 6 组术语）。HANDOFF 已 exclude。 |

预览：`npm run preview -- --port 3000`，`http://127.0.0.1:3000`。  
`node tests/check-sprint004-links.mjs` 通过。  
`node tests/check-sprint004-visual.mjs` 通过。

未发布 slug `trend-momentum` 走 `resolvePublishedPath` → `path: null`。CVD 页脚与 LessonPager 均不生成 `href="/combinations/trend-momentum"`。

### 内容

四篇结构均为：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。与 Knowledge 对齐。

口径核对：

- OI ≠ Volume ≠ CVD：存量 / 转手 / 主动净额三分开
- 资金费率 ≠ 资金费：比率 vs 划走的钱；正费率多头付空头
- 多空比必须先标口径（账户数 / 持仓量 / 大户账户 / 大户持仓）；无口径不引用「市场多空」
- 四象限、极端费率、Funding + OI、背离均写成观察框架，不是反向喊单
- 课文检索无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利

链接：

- 布林带文末与导航可点 `[持仓量](/indicators/open-interest)`
- CVD 正文回 `[怎么学](/course)`，全站课文无 `href="/combinations/"`
- `/course` 主路径 8 + 合约数据层 4 均可点
- `/indicators` 导语含合约数据层顺序，无「即将推出」块

### 链接脚本

`tests/check-sprint004-links.mjs`：18 个页面 HTTP 200；四张示意图 200 且含「示意图」；vis-011 含「口径」；无 `href="/combinations/trend-momentum"`。

### 视觉

本机 Chrome headless + CDP（`tests/check-sprint004-visual.mjs`）：

- Desktop 1280：走 `/course` 十二步（主路径 1–8、合约数据层 1–4），每步 `href` 可点并打开对应课文
- OI / Funding / LSR / CVD：vis-006 / 007 / 011 / 012，`alt` 均含「示意图」；011 alt 为「多空比必须先标口径示意图」；图宽 680
- 布林带页可点 OI
- CVD 页无 `href="/combinations/"`
- Mobile 390×844，`deviceScaleFactor: 1`。`Input.dispatchMouseEvent` 点「菜单」中心，**不用** `Runtime.evaluate` 的 `click()`

| 状态 | `/course` Mobile 390 |
|---|---|
| 打开前 | 「菜单」，`aria-expanded=false`，面板 `vis: hidden`；页头 `backdrop-filter: none` |
| 鼠标点开 | 「关闭菜单」，`aria-expanded=true`，面板 `left: 0`、`h: 798`、`z-index: 45`，截图为全屏米色滑出，正文不露在菜单上 |
| 鼠标点关 | 回到「菜单」，面板再次 `hidden` |

因此 Visual **PASS**，三项均 PASS，可以 APPROVE。

## HANDOFF

### 完成内容

Sprint 004 终审：Code / Content / Visual 三项 PASS，建议 APPROVE。

### 修改文件

- `docs/qa/QA-RESULT-SPRINT-004.md`（本文件）
- `docs/qa/HANDOFF-SPRINT-004.md`
- `docs/qa/content-checklist.md`
- `docs/qa/code-checklist.md`
- `docs/tasks/TASK-016-qa-sprint004.md`（Status → review）
- `tests/check-sprint004-links.mjs`
- `tests/check-sprint004-visual.mjs`

未改 `content/`、`pages/`、`components/`、`public/`。未做 git commit / push。

### 测试结果

lint / typecheck / build 通过。链接脚本与 Chrome CDP 视觉脚本通过。

### 已知问题

见上方 Issues（均为 low / info）。

### 下一步

- UI：`PLANNED_TITLES` 可补组合课中文名，避免 CVD 页脚露出 `trend-momentum`
- Visual：真实行情 vis-101–107 仍待采集
- 下一课：阶段 2 组合课发布前，继续不要链 `/combinations/{slug}`
