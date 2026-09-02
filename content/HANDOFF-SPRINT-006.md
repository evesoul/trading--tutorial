---
title: Content Agent HANDOFF Sprint 006
description: Sprint 006 / TASK-021 交付说明，不是术语或教程。Nuxt 查询默认不取 draft。
part: 0
category: glossary
level: beginner
order: 99
slug: handoff-sprint-006
status: draft
---

# Content Agent HANDOFF — TASK-021 / Sprint 006

## 完成内容

已按 `docs/product/learning-path.md` 阶段 3 前八行写完系统课：从「什么是交易系统」到仓位管理。修订多指标共振文末，第一篇系统课可点。导学改为阶段 3 前半可学、后七篇仍未写。未写 risk-management / trade-frequency / trading-journal / backtesting / statistics / system-optimization / case-study。未改 `docs/knowledge/`、`docs/strategy/`、`pages/`、`components/`。未做 git commit / push。

交付：

- 什么是交易系统：系统 = 事先写好的规则 + 记录，不是找准指标；链路示意图 vis-008
- 市场环境：环境先于方向；看不清默认不交易；复用 vis-002 讲位置
- 方向判断：偏多 / 偏空 / 不交易，不是下单
- 入场规则：前提 + 触发；只满足一部分时不做
- 出场规则：先有框架，再拆止损止盈；含时间离场与规则失效
- 止损：必须早于止盈和加仓；止损 ≠ 强平
- 止盈：目标是规则，不是拿到最多；1R 只作记账
- 仓位管理：由单笔亏损上限反推；文末回 `/course`，不链风险管理
- 多指标共振文末：可点 [什么是交易系统](/trading-system/what-is-a-trading-system)
- 导学：阶段 3 前八篇可学并互链；后七篇仍未写

教学示例只说明如何写规则，不是推荐策略，不能代表未来结果。本站不是信号、荐股、喊单或自动交易。

## 修改文件

| 路径 | 动作 |
|---|---|
| `content/03-trading-system/what-is-a-trading-system/index.md` | 新建 |
| `content/03-trading-system/market-regime/index.md` | 新建 |
| `content/03-trading-system/direction/index.md` | 新建 |
| `content/03-trading-system/entry-rules/index.md` | 新建 |
| `content/03-trading-system/exit-rules/index.md` | 新建 |
| `content/03-trading-system/stop-loss/index.md` | 新建 |
| `content/03-trading-system/take-profit/index.md` | 新建 |
| `content/03-trading-system/position-sizing/index.md` | 新建 |
| `content/02-combinations/multi-indicator/index.md` | 只改局限性一句与下一步 |
| `content/00-introduction/index.md` | 阶段 3 前半可学；后七篇仍未写 |
| `content/HANDOFF-SPRINT-006.md` | 本文件 |
| `docs/tasks/TASK-021-content-system-front.md` | Status → review，勾选验收项 |

未改 `content/HANDOFF.md`、`HANDOFF-SPRINT-003.md`、`HANDOFF-SPRINT-004.md`、`HANDOFF-SPRINT-005.md`（历史记录）。

## Front Matter 摘要

| 路径 | slug | part | category | order | status | prerequisites | next |
|---|---|---|---|---|---|---|---|
| `what-is-a-trading-system/index.md` | `what-is-a-trading-system` | 3 | trading-system | 1 | published | `kline` `ma` `ema` `rsi` `trend-momentum` | `market-regime` |
| `market-regime/index.md` | `market-regime` | 3 | trading-system | 2 | published | `what-is-a-trading-system` | `direction` |
| `direction/index.md` | `direction` | 3 | trading-system | 3 | published | `market-regime` | `entry-rules` |
| `entry-rules/index.md` | `entry-rules` | 3 | trading-system | 4 | published | `direction` | `exit-rules` |
| `exit-rules/index.md` | `exit-rules` | 3 | trading-system | 5 | published | `entry-rules` | `stop-loss` |
| `stop-loss/index.md` | `stop-loss` | 3 | trading-system | 6 | published | `exit-rules` | `take-profit` |
| `take-profit/index.md` | `take-profit` | 3 | trading-system | 7 | published | `stop-loss` | `position-sizing` |
| `position-sizing/index.md` | `position-sizing` | 3 | trading-system | 8 | published | `stop-loss` | `risk-management`（仅 Front Matter） |

全部 `level: intermediate`。每篇含 `title` `description` `part` `category` `level` `order` `slug` `status` `learning.prerequisites` `learning.next` `visual.cover` `visual.charts`。

本文件带 `status: draft`，避免被 `/glossary` 列出。

## 引用的图

交卷时仓库尚无 vis-017 / vis-018，课文先引用 vis-008。编排器随后补挂：`market-regime` vis-017、`stop-loss` vis-018。八篇仍引用 vis-008。`market-regime` 与 `direction` 复用 vis-002 复习位置。

| 文章 | 图 | 说明 |
|---|---|---|
| 八篇共用 | vis-008 `/images/flow/vis-008-trading-system-flow.svg` | 示意图；环境 → 方向 → 进出场 → 仓位 → 复盘；含「不交易」出口 |
| 市场环境、方向判断 | vis-002 | 示意图；均线上方 / 穿越 / 下方 |

正文均标明「示意图」「不是真实行情」。未插入 vis-101–107，未伪造行情或权益曲线证明盈利。

## 已知断链处理

| 目标 | 处理 |
|---|---|
| 共振 → 什么是交易系统 | 文末可点 `/trading-system/what-is-a-trading-system` |
| 系统课互链 | `/trading-system/{slug}`，八篇均 published |
| 已发布组合课 | `/combinations/{slug}` |
| 已发布指标 | `/indicators/{slug}` |
| `position-sizing` 的 `learning.next: risk-management` | 仅写在 Front Matter；文末回 [/course](/course)，不链 `/trading-system/risk-management` |
| 阶段 3 后七篇 | 导学与仓位课写明正文未写，不链空文章 |

## 测试结果

纯文档任务：无 lint / typecheck / build。

自检：

- [x] 八篇结构均为：学习目标 → 概念 → 怎么写规则 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步
- [x] 全部 published；`part: 3`；`category: trading-system`；`level: intermediate`
- [x] 教学示例只说明如何写规则，不是推荐策略
- [x] 每篇至少一正一反
- [x] 检索无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」
- [x] 金叉 / 超买 / 回踩未写成开仓指令
- [x] 示意图路径存在且 alt / 正文含「示意图」
- [x] 内部链接不指向未发布 404（风险管理仅 Front Matter next）
- [x] Front Matter 完整
- [x] 共振文末可点 what-is-a-trading-system

未跑站点构建。课程壳是否把 `risk-management` 渲成下一篇链接，需 Nuxt / UI / QA 再核。

## 已知问题

1. **`position-sizing` Front Matter 的 next 是 `risk-management`。** 文末已回 `/course`。若 `useCourse` 把未发布 slug 渲成 `<a href="/trading-system/risk-management">`，仍会 404。请 Nuxt 对未发布 slug 不输出下一篇链接。
2. **没有 vis-017 / vis-018。** 环境与止损对照先用文字 + vis-008 / vis-002。Visual 补图后，Content 再挂 cover / 插图。
3. **真实行情图 vis-101–107 未采集、未插入。** 课文只用示意图，没有伪造 K 线或权益曲线。
4. **本 HANDOFF 带 draft Front Matter。** 避免误入 `/glossary`。建议 Nuxt 把 `HANDOFF*.md` 加入 exclude。
5. **阶段 3 后七篇仍无正文。** 不在本任务范围。

## 下一步建议

- QA：按 `docs/qa/content-checklist.md` 审术语、违禁措辞、示意图徽章、断链、阶段 3 前八课序
- Nuxt / UI：`published` 才进上一篇 / 下一篇；`risk-management` 未发布时不要生成链接；`/trading-system` 列出八篇
- Visual：若补 vis-017 / vis-018，通知 Content 插入环境三格与止损 / 强平对照
- Content 后续：风险管理写完后，再把仓位课文末从 `/course` 改成可点的风险课
