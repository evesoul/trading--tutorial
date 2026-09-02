# QA RESULT — Sprint 007

终审日期：2026-09-03  
Owner：QA Agent  
范围：TASK-028；阶段 3 后七篇系统课，示意图 vis-008 / 019 / 020，`/course` 主路径 8 + 合约层 4 + 组合 7 + 系统 15 全亮。

## QA RESULT

Code: PASS  
Content: PASS  
Visual: PASS

Issues:

- low / Nuxt / `npm run build` 仍有 Nitro 上游 `H3Error` unused import 警告，不影响通过。
- info / Visual / 真实行情图 vis-101–107 仅有 spec，课文未插假图。属已知缺口，不构成 FAIL。
- info / Content / `what-is-a-trading-system` 仍写「风险管理、日志、回测在阶段 3 后半」，是课序说明，不是「仍在编写」。`/course` 已无「后半仍在编写」。

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
| `npm run build` | 通过。Content 解析 **41** 个文件（导学 + 12 篇指标 + 7 篇组合 + 15 篇系统 + 6 组术语）。HANDOFF 已 exclude。 |

预览：`npm run preview -- --port 3000`，`http://127.0.0.1:3000`。  
`node tests/check-sprint007-links.mjs` 通过。  
`node tests/check-sprint007-visual.mjs` 通过。

已发布 slug `risk-management` 走 `resolvePublishedPath` 得到路径。`position-sizing` 正文与 LessonPager 均生成 `href="/trading-system/risk-management"`。`case-study` 无下一课 slug，页脚回 `/course`。

### 内容

七篇结构均为：学习目标 → 概念 → 怎么写规则 / 教学示例 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。面向零基础，术语首次出现有解释。

口径核对：

- `risk-management`：风险管理回答错了能否活下来，不回答对了能赚多少。高杠杆不是效率；本站不鼓励高杠杆。
- `trade-frequency`：有规则不等于该高频；手续费、资金费、滑点随笔数变重；不鼓励高杠杆。
- `trading-journal`：没有记录就无法谈优化；先分执行质量与规则质量；日志不是成绩单。
- `backtesting`：回测检验已写清的规则，不是把参数调到曲线最好。必须计入手续费、资金费、滑点。只报胜率的卡片不合格。教学算术标明虚构，禁止用好看曲线证明有效。
- `statistics`：胜率只是其中一个数字；须同时看次数、盈亏比、回撤、连亏、成本、滑点。
- `system-optimization`：优化先改措辞和成本假设，最后才动参数；为一段历史加条件叫过拟合。不鼓励高杠杆。
- `case-study`：虚构教学作业纸，说明过程，不证明该系统有效，不是跟单对象。第 11 节故意不填成绩、不贴权益曲线。
- 七篇均写明教学示例 / 教学数字不是推荐策略。
- 课文检索无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利

链接：

- `position-sizing` 文末可点 `[风险管理](/trading-system/risk-management)`；页脚下一篇亦为该路径
- `case-study` 文末回 `[怎么学这门课](/course)`；页脚「返回怎么学」；无未发布系统课死链、无「编写中」
- `/course` 主路径 8 + 合约数据层 4 + 指标组合 7 + 系统 15 均可点；不再写「后半仍在编写」
- `/trading-system` 列出十五篇已发布课文

### 链接脚本

`tests/check-sprint007-links.mjs`：40 个已发布页面 HTTP 200；三张示意图 200 且含「示意图」；仓位有 `href="/trading-system/risk-management"`；案例有 `href="/course"` 且无未发布死链；`/course` 十五步均可点、无「后半仍在编写」、无「风险管理 编写中」等；未插 vis-101–107。

### 视觉

本机 Chrome headless + CDP（`tests/check-sprint007-visual.mjs`）：

- Desktop 1280：走 `/course` 三十四步（主路径 1–8、合约数据层 1–4、指标组合 1–7、交易系统 1–15）。三十四步 `href` 可点并打开对应课文
- vis-008 / 019 / 020：`alt` 均含「示意图」；图宽 680；课文标明示意图
- `position-sizing` 正文与页脚可点 `/trading-system/risk-management`
- `case-study` 可回 `/course`，无未发布系统课死链
- Mobile 390×844，`deviceScaleFactor: 1`。`Input.dispatchMouseEvent` 点「菜单」中心，**不用** `Runtime.evaluate` 的 `click()`

| 状态 | `/course` Mobile 390 |
|---|---|
| 打开前 | 「菜单」，`aria-expanded=false`，面板 `vis: hidden`；页头 `backdrop-filter: none` |
| 鼠标点开 | 「关闭菜单」，`aria-expanded=true`，面板 `left: 0`、`h: 798`、`z-index: 45`，截图为全屏米色滑出，正文不露在菜单上 |
| 鼠标点关 | 回到「菜单」，面板再次 `hidden` |

因此 Visual **PASS**，三项均 PASS，可以 APPROVE。

## HANDOFF

### 完成内容

Sprint 007 终审：Code / Content / Visual 三项 PASS，建议 APPROVE。

### 修改文件

- `docs/qa/QA-RESULT-SPRINT-007.md`（本文件）
- `docs/qa/HANDOFF-SPRINT-007.md`
- `docs/qa/content-checklist.md`
- `docs/qa/code-checklist.md`
- `docs/tasks/TASK-028-qa-sprint007.md`（Status → review）
- `tests/check-sprint007-links.mjs`
- `tests/check-sprint007-visual.mjs`

未改 `content/`、`pages/`、`components/`、`public/`。未做 git commit / push。

### 测试结果

lint / typecheck / build 通过。链接脚本与 Chrome CDP 视觉脚本通过。

### 已知问题

见上方 Issues（均为 low / info）。

### 下一步

- Visual：真实行情 vis-101–107 仍待采集
- 按 QA RESULT 建议合入
