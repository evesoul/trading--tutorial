# QA RESULT — Sprint 003

终审日期：2026-09-02  
Owner：QA Agent  
范围：TASK-012；主路径续四篇 Volume / MACD / KDJ / 布林带，术语表六组，示意图 vis-003 / vis-005 / vis-009 / vis-010，`/course` 八步。

## QA RESULT

Code: PASS  
Content: PASS  
Visual: PASS

Issues:

- low / Nuxt / `npm run build` 仍有 Nitro 上游 `H3Error` unused import 警告，不影响通过。
- info / Visual / 真实行情图 vis-101–107 仅有 spec，课文未插假图。属已知缺口，不构成 FAIL。
- info / Content / 导学正文仍写四篇主路径（K 线 → MA → EMA → RSI）。`/course` 的 PathSteps 已是八步且可点。不据此 FAIL。
- info / Content / `content/HANDOFF-SPRINT-003.md` 仍写 vis-009 / vis-010 不存在；课文已挂图。`content.config.ts` 已 `exclude: ['HANDOFF.md', 'HANDOFF-*.md']`，`/glossary` 不列出 HANDOFF。

无 high 级问题。

Recommendation:  
APPROVE

## 验证方法

### 代码

| 命令 | 结果 |
|---|---|
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过。Content 解析 **15** 个文件（导学 + 8 篇指标 + 6 组术语）。2 份 HANDOFF 已 exclude。 |

预览：`npm run preview -- --port 3000`，`http://127.0.0.1:3000`。  
`node tests/check-sprint003-links.mjs` 通过。

未发布 slug `open-interest` 走 `resolvePublishedPath` → `path: null`。布林带页脚与 LessonPager 均不生成 `href="/indicators/open-interest"`，只显示「Open Interest 编写中」+「回怎么学」。

### 内容

四篇结构均为：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。术语六组为短释义，未发布课只解释不链。

术语与 Knowledge 对齐：

- MA 默认 SMA（布林带中轨、术语「价格图与均线」）
- KDJ 称 **K 值 / D 值 / J 值**，不把指标 K 写成 K 线
- 正式名用**强平**；口语「爆仓」括号注明
- 金叉 / 超买 / 背离 / 开口收口均为观察用语，不是开仓指令

`content/` 课文检索无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利。

链接：

- RSI 文末与导航可点 `[Volume](/indicators/volume)`
- 布林带正文无 `href="/indicators/open-interest"`，文末「OI 编写中，可先回怎么学」
- `/glossary` 列出六组：市场与合约；保证金、杠杆与强平；价格图与均线；动量、成交与合约数据；观察用语；教学与风险用语。无 HANDOFF、无「术语表建设中」

### 链接脚本

`tests/check-sprint003-links.mjs`：14 个页面 HTTP 200；全站无 `href="/indicators/open-interest"`、无 HANDOFF 字面量；四张示意图 200 且含「示意图」；vis-009 无「K 线」。

### 视觉

Cursor 浏览器 MCP 本轮不可用。**未**仅用 curl/SSR 给 Visual 过关。

本机 Chrome headless + CDP（`tests/check-sprint003-visual.mjs`）：

- Desktop 1280：走 `/course` 八步，每步 `href` 可点并打开对应课文
- `/indicators/kdj`：vis-009 `alt="KDJ：K 值 / D 值 / J 值示意图"`，图宽 680
- `/indicators/bollinger-bands`：vis-010 `alt="布林带中轨与开口收口示意图"`，图宽 680；无 OI 死链
- `/glossary`：六组词条在，无 HANDOFF
- Mobile 390×844，`deviceScaleFactor: 1`。`Input.dispatchMouseEvent` 点「菜单」中心，**不用** `Runtime.evaluate` 的 `click()`

| 状态 | `/course` Mobile 390 |
|---|---|
| 打开前 | 「菜单」，`aria-expanded=false`，面板 `vis: hidden`；页头 `backdrop-filter: none` |
| 鼠标点开 | 「关闭菜单」，`aria-expanded=true`，面板 `left: 0`、`h: 798`、`z-index: 45`，截图为全屏米色滑出，正文不露在菜单上 |
| 鼠标点关 | 回到「菜单」，面板再次 `hidden` |

上轮 51px 锁死未复发。本次面板高 798（视口 844 减页头），仍是全屏滑出。

因此 Visual **PASS**，三项均 PASS，可以 APPROVE。

## HANDOFF

### 完成内容

Sprint 003 终审：Code / Content / Visual 三项 PASS，建议 APPROVE。

### 修改文件

- `docs/qa/QA-RESULT-SPRINT-003.md`（本文件）
- `docs/qa/HANDOFF-SPRINT-003.md`
- `docs/qa/content-checklist.md`
- `docs/qa/code-checklist.md`
- `docs/tasks/TASK-012-qa-sprint003.md`（Status → review）
- `tests/check-sprint003-links.mjs`
- `tests/check-sprint003-visual.mjs`

未改 `content/`、`pages/`、`components/`、`public/`。未做 git commit / push。

### 测试结果

lint / typecheck / build 通过。链接脚本与 Chrome CDP 视觉脚本通过。

### 已知问题

见上方 Issues（均为 low / info）。

### 下一步

- Content：导学正文主路径可补到布林带（非阻断）
- Visual：真实行情 vis-101–107 仍待采集
- 下一课：OI → 资金费率 → 多空比 → CVD，勿提前链未发布课
