---
title: Content Agent HANDOFF Sprint 007
description: Sprint 007 / TASK-025 交付说明，不是术语或教程。Nuxt 查询默认不取 draft。
part: 0
category: glossary
level: beginner
order: 99
slug: handoff-sprint-007
status: draft
---

# Content Agent HANDOFF — TASK-025 / Sprint 007

## 完成内容

已按 `docs/product/learning-path.md` 阶段 3 第 9–15 行写完后七篇：从风险管理到完整案例。仓位文末改为可点风险管理。导学改为阶段 3 十五篇都可学，案例后回 `/course`。未改 `docs/knowledge/`、`docs/strategy/`、`pages/`、`components/`。未做 git commit / push。

交付：

- 风险管理：错了能否活下来；高杠杆不是效率；本站不鼓励高杠杆
- 交易频率：手续费 / 滑点 / 情绪；有规则不等于该高频
- 交易日志：没有记录无法优化；先分执行质量与规则质量
- 回测：检验规则，不是调到曲线最好；必须写手续费、资金费、滑点
- 数据统计：胜率只是其中一个数字
- 系统优化：过拟合；先措辞与成本，最后才动参数
- 完整案例：符合模板的虚构教学作业纸；说明过程，不证明有效，不是跟单对象；文末回 `/course`
- 仓位文末：可点 [风险管理](/trading-system/risk-management)
- 导学：阶段 3 十五篇可学并互链；案例后回本页

教学示例只说明如何写规则，不是推荐策略，不能代表未来结果。本站不是信号、荐股、喊单或自动交易。案例第 11 节故意不填成绩，未贴虚构绩效表。

## 修改文件

| 路径 | 动作 |
|---|---|
| `content/03-trading-system/risk-management/index.md` | 新建 |
| `content/03-trading-system/trade-frequency/index.md` | 新建 |
| `content/03-trading-system/trading-journal/index.md` | 新建 |
| `content/03-trading-system/backtesting/index.md` | 新建 |
| `content/03-trading-system/statistics/index.md` | 新建 |
| `content/03-trading-system/system-optimization/index.md` | 新建 |
| `content/03-trading-system/case-study/index.md` | 新建 |
| `content/03-trading-system/position-sizing/index.md` | 只改下一步，可点风险管理 |
| `content/00-introduction/index.md` | 阶段 3 十五篇可学；案例后回 `/course` |
| `content/HANDOFF-SPRINT-007.md` | 本文件 |
| `docs/tasks/TASK-025-content-system-back.md` | Status → review，勾选验收项 |

未改 `content/HANDOFF.md`、`HANDOFF-SPRINT-003.md` 至 `HANDOFF-SPRINT-006.md`（历史记录）。未改前八篇系统课里「后七篇仍未写」的旧句（不在本任务范围）。

## Front Matter 摘要

| 路径 | slug | part | category | order | status | prerequisites | next |
|---|---|---|---|---|---|---|---|
| `risk-management/index.md` | `risk-management` | 3 | trading-system | 9 | published | `position-sizing` | `trade-frequency` |
| `trade-frequency/index.md` | `trade-frequency` | 3 | trading-system | 10 | published | `risk-management` | `trading-journal` |
| `trading-journal/index.md` | `trading-journal` | 3 | trading-system | 11 | published | `what-is-a-trading-system` | `backtesting` |
| `backtesting/index.md` | `backtesting` | 3 | trading-system | 12 | published | `trading-journal` | `statistics` |
| `statistics/index.md` | `statistics` | 3 | trading-system | 13 | published | `backtesting` | `system-optimization` |
| `system-optimization/index.md` | `system-optimization` | 3 | trading-system | 14 | published | `statistics` | `case-study` |
| `case-study/index.md` | `case-study` | 3 | trading-system | 15 | published | 前 14 篇 slug | `[]`（文末回 `/course`） |

全部 `level: intermediate`。每篇含 `title` `description` `part` `category` `level` `order` `slug` `status` `learning.prerequisites` `learning.next` `visual.cover` `visual.charts`。

本文件带 `status: draft`，避免被 `/glossary` 列出。

## 引用的图

交卷时仓库尚无 vis-019 / vis-020，课文先引用 vis-008。编排器随后补挂：`backtesting` vis-019、`case-study` vis-020。七篇仍引用 vis-008。未插 vis-101–107。编排器同时清掉前八篇里「后七篇仍未写」的过时句。

| 文章 | 图 | 说明 |
|---|---|---|
| 七篇共用 | vis-008 `/images/flow/vis-008-trading-system-flow.svg` | 示意图；环境 → 方向 → 进出场 → 仓位 → 复盘；含「不交易」出口 |

正文均标明「示意图」「不是真实行情」。未伪造行情、权益曲线或回测成绩证明盈利。回测 / 统计课的对照表标注为虚构算术，不是策略成绩。

## 已知断链处理

| 目标 | 处理 |
|---|---|
| 仓位 → 风险管理 | 文末可点 `/trading-system/risk-management` |
| 系统课互链 | `/trading-system/{slug}`，十五篇均 published |
| 案例文末 | 回 [/course](/course)，`learning.next: []`，不链未发布 slug |
| 已发布组合课 / 指标 | `/combinations/{slug}`、`/indicators/{slug}` |
| vis-019 / vis-020 | 文件不存在，正文未引用 |

## 测试结果

纯文档任务：无 lint / typecheck / build。

自检：

- [x] 七篇结构均为：学习目标 → 概念 → 怎么写规则 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步
- [x] 全部 published；`part: 3`；`category: trading-system`；`level: intermediate`
- [x] 教学示例只说明如何写规则，不是推荐策略
- [x] 每篇至少一正一反
- [x] 检索无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」
- [x] 案例不填成绩、无虚构绩效表证明赚钱；回测课「胜率 80%」仅出现在反例
- [x] 示意图路径存在且 alt / 正文含「示意图」
- [x] 内部链接不指向未发布 404
- [x] Front Matter 完整
- [x] 仓位文末可点 risk-management；案例文末回 `/course`

未跑站点构建。课程壳是否列出后七篇，需 Nuxt / UI / QA 再核。

## 已知问题

1. **前八篇系统课文内仍有「后七篇仍未写」旧句。** 例如 `what-is-a-trading-system` 示意图段。本任务范围只改仓位文末与导学，未逐篇清理。
2. **没有 vis-019 / vis-020。** 回测卡片与案例作业纸先用文字 + vis-008。Visual 补图后，Content 再挂 cover / 插图。
3. **真实行情图 vis-101–107 未采集、未插入。** 课文只用示意图，没有伪造 K 线或权益曲线。
4. **本 HANDOFF 带 draft Front Matter。** 避免误入 `/glossary`。建议 Nuxt 把 `HANDOFF*.md` 加入 exclude。
5. **仓位课示意图 / 局限性里仍写「回测专篇尚未写」。** 只改了文末下一步，未改其余旧句。

## 下一步建议

- QA：按 `docs/qa/content-checklist.md` 审术语、违禁措辞、示意图徽章、断链、阶段 3 十五课序
- Nuxt / UI：`/trading-system` 列出十五篇；案例 `next: []` 时「下一篇」回 `/course` 或不渲染空链
- Visual：若补 vis-019 / vis-020，通知 Content 插入回测卡片示意与案例作业纸示意
- Content 可选清理：前八篇里「后七篇仍未写」的过时句
