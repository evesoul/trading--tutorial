# QA RESULT — Sprint 006

终审日期：2026-09-03  
Owner：QA Agent  
范围：TASK-024；阶段 3 前八篇系统课，示意图 vis-008 / 017 / 018，`/course` 主路径 8 + 合约层 4 + 组合 7 + 系统 15。

## QA RESULT

Code: PASS  
Content: PASS  
Visual: PASS

Issues:

- low / Nuxt / `npm run build` 仍有 Nitro 上游 `H3Error` unused import 警告，不影响通过。
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
| `npm run build` | 通过。Content 解析 **34** 个文件（导学 + 12 篇指标 + 7 篇组合 + 8 篇系统 + 6 组术语）。HANDOFF 已 exclude。 |

预览：`npm run preview -- --port 3000`，`http://127.0.0.1:3000`。  
`node tests/check-sprint006-links.mjs` 通过。  
`node tests/check-sprint006-visual.mjs` 通过。

未发布 slug `risk-management` 走 `resolvePublishedPath` → `path: null`。`position-sizing` 正文与 LessonPager 均不生成 `href="/trading-system/risk-management"`，只显示「风险管理 编写中」。

### 内容

八篇结构均为：学习目标 → 概念 → 怎么写规则 / 教学示例 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。面向零基础，术语首次出现有解释。

口径核对：

- `what-is-a-trading-system`：系统是事先写好的规则加记录，不是找一个准指标。
- `market-regime`：环境先于方向；看不清是合法状态，默认不交易。
- `direction`：方向是偏多 / 偏空 / 不交易，不是下单。
- `entry-rules`：入场 = 前提 + 触发；只满足一部分时不做。
- `exit-rules`：先写出场框架，再拆止损止盈；离开含时间与规则失效。
- `stop-loss`：止损 ≠ 强平；止损必须早于止盈和加仓。
- `take-profit`：止盈是规则，不是拿到最多；没有止损就没有 1R。
- `position-sizing`：仓位由单笔亏损上限和止损距离反推，不是先想赚多少。
- 八篇均写明教学示例 / 教学数字不是推荐策略。
- 课文检索无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利

链接：

- `multi-indicator` 文末可点 `[什么是交易系统](/trading-system/what-is-a-trading-system)`
- `position-sizing` 正文回 `[怎么学这门课](/course)`；正文与页脚无 `href="/trading-system/risk-management"`
- Front Matter `learning.next: risk-management` 仅作下一课 slug；`resolvePublishedPath` 为 null
- `/course` 主路径 8 + 合约数据层 4 + 指标组合 7 + 系统前 8 均可点；后 7 步（risk-management 起）只标编写中
- `/trading-system` 列出八篇已发布课文

### 链接脚本

`tests/check-sprint006-links.mjs`：33 个已发布页面 HTTP 200；后 7 个未发布 slug 为空状态 200，不是 404；三张示意图 200 且含「示意图」；共振有 `href="/trading-system/what-is-a-trading-system"`；仓位页与全站无 `href="/trading-system/risk-management"`；未插 vis-101–107。

### 视觉

本机 Chrome headless + CDP（`tests/check-sprint006-visual.mjs`）：

- Desktop 1280：走 `/course` 三十四步（主路径 1–8、合约数据层 1–4、指标组合 1–7、交易系统 1–15）。前 27 步 `href` 可点并打开对应课文；后 7 步只标编写中，无死链
- vis-008 / 017 / 018：`alt` 均含「示意图」；图宽 680；课文标明示意图
- 共振页可点 `/trading-system/what-is-a-trading-system`
- `position-sizing` 页脚只显示编写中，无 risk-management href
- Mobile 390×844，`deviceScaleFactor: 1`。`Input.dispatchMouseEvent` 点「菜单」中心，**不用** `Runtime.evaluate` 的 `click()`

| 状态 | `/course` Mobile 390 |
|---|---|
| 打开前 | 「菜单」，`aria-expanded=false`，面板 `vis: hidden`；页头 `backdrop-filter: none` |
| 鼠标点开 | 「关闭菜单」，`aria-expanded=true`，面板 `left: 0`、`h: 798`、`z-index: 45`，截图为全屏米色滑出，正文不露在菜单上 |
| 鼠标点关 | 回到「菜单」，面板再次 `hidden` |

因此 Visual **PASS**，三项均 PASS，可以 APPROVE。

## HANDOFF

### 完成内容

Sprint 006 终审：Code / Content / Visual 三项 PASS，建议 APPROVE。

### 修改文件

- `docs/qa/QA-RESULT-SPRINT-006.md`（本文件）
- `docs/qa/HANDOFF-SPRINT-006.md`
- `docs/qa/content-checklist.md`
- `docs/qa/code-checklist.md`
- `docs/tasks/TASK-024-qa-sprint006.md`（Status → review）
- `tests/check-sprint006-links.mjs`
- `tests/check-sprint006-visual.mjs`

未改 `content/`、`pages/`、`components/`、`public/`。未做 git commit / push。

### 测试结果

lint / typecheck / build 通过。链接脚本与 Chrome CDP 视觉脚本通过。

### 已知问题

见上方 Issues（均为 low / info）。

### 下一步

- Visual：真实行情 vis-101–107 仍待采集
- 下一课：阶段 3 后七篇发布前，继续不要链 `/trading-system/{未发布 slug}`
