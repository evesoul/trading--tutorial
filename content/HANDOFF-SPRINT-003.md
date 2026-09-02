---
title: Content Agent HANDOFF Sprint 003
description: Sprint 003 交付说明，不是术语或教程。Nuxt 查询默认不取 draft。
part: 0
category: glossary
level: beginner
order: 99
slug: handoff-sprint-003
status: draft
---

# Content Agent HANDOFF — TASK-009 / Sprint 003

## 完成内容

已把 Knowledge 转写成阶段 1 主路径续四篇，并把术语表写成 `/glossary` 可列出的六组词条。修订 RSI 文末，Volume 已可点。未写 OI / Funding / LSR / CVD 正文，未写阶段 2 / 3，未改 `docs/knowledge/`。未做 git commit / push。

交付：

- Volume：单位、Volume / OI / CVD 对照、绿柱红柱来自涨跌、放量不是确认；图 vis-005（示意图）
- MACD：MACD 线 / 信号线 / 柱状图（DIF / DEA）、零轴、金叉死叉与背离均为观察；震荡频繁交叉 + 背离后续走反例；图 vis-003（示意图）
- KDJ：K 值 / D 值 / J 值（不称 K 线）、RSV、(9, 3, 3)、趋势钝化反例；`vis-009` 不存在，无图
- 布林带：目录 `bollinger-bands`，中轨默认 SMA，走轨道 + 收口不预告方向；文末 OI 编写中回 `/course`，不链未发布 OI
- 术语表：知识库六组转成零基础短释义；未发布课只解释不链
- RSI：文末改为可点 `[Volume](/indicators/volume)`；`learning.next` 仍为 `volume`

术语对齐 Knowledge：MA = SMA、KDJ 称 K 值、强平作正式名、超买 / 背离 / 金叉 / 开口收口均为观察用语。

## 修改文件

| 路径 | 动作 |
|---|---|
| `content/01-indicators/volume/index.md` | 新建 |
| `content/01-indicators/macd/index.md` | 新建 |
| `content/01-indicators/kdj/index.md` | 新建 |
| `content/01-indicators/bollinger-bands/index.md` | 新建（目录跟 slug，不是 `bollinger/`） |
| `content/01-indicators/rsi/index.md` | 只改下一步链接 |
| `content/glossary/market-contracts.md` | 新建 |
| `content/glossary/margin-leverage.md` | 新建 |
| `content/glossary/price-chart.md` | 新建 |
| `content/glossary/momentum-data.md` | 新建 |
| `content/glossary/observation-terms.md` | 新建 |
| `content/glossary/teaching-risk.md` | 新建 |
| `content/HANDOFF-SPRINT-003.md` | 本文件 |
| `docs/tasks/TASK-009-content-path-continue.md` | Status → review，勾选验收项 |

未改 `content/HANDOFF.md`（仍是 TASK-006 记录）。

## Front Matter 摘要

| 路径 | slug | part | category | order | status | prerequisites | next |
|---|---|---|---|---|---|---|---|
| `volume/index.md` | `volume` | 1 | indicators | 5 | published | `kline` | `macd` |
| `macd/index.md` | `macd` | 1 | indicators | 6 | published | `ema` | `kdj` |
| `kdj/index.md` | `kdj` | 1 | indicators | 7 | published | `rsi` | `bollinger-bands` |
| `bollinger-bands/index.md` | `bollinger-bands` | 1 | indicators | 8 | published | `ma` | `open-interest` |
| `glossary/market-contracts.md` | `market-contracts` | 0 | glossary | 1 | published | — | — |
| `glossary/margin-leverage.md` | `margin-leverage` | 0 | glossary | 2 | published | — | — |
| `glossary/price-chart.md` | `price-chart` | 0 | glossary | 3 | published | — | — |
| `glossary/momentum-data.md` | `momentum-data` | 0 | glossary | 4 | published | — | — |
| `glossary/observation-terms.md` | `observation-terms` | 0 | glossary | 5 | published | — | — |
| `glossary/teaching-risk.md` | `teaching-risk` | 0 | glossary | 6 | published | — | — |

每篇指标均含 `title` `description` `part` `category` `level` `order` `slug` `status` `learning.prerequisites` `learning.next`。术语条 `category: glossary`，不进主路径 `order` 链。

本文件带 `status: draft`，避免被 `/glossary` 列出。`content.config.ts` 目前只 exclude `HANDOFF.md`；若要把 HANDOFF 完全移出 collection，请 Nuxt 补 exclude。

## 引用的图

| 文章 | 图 | 说明 |
|---|---|---|
| Volume | `/images/concept/vis-005-volume.svg`（vis-005） | 示意图；价涨量增 / 价涨量缩 / 价跌量增 |
| MACD | `/images/concept/vis-003-macd-cross.svg`（vis-003） | 示意图；MACD 线 / 信号线 / 柱 / 零轴 / 金叉死叉观察点 |
| KDJ | 无 | `public/images/concept/vis-009-kdj.svg` 不存在，未插断图 |
| 布林带 | 无 | 无 vis-010；未插 vis-101–107 |
| 术语表 | 无 | — |

正文均标明「示意图」「不是真实行情」。未插入 vis-101–107，未伪造 K 线。

## 已知断链处理

| 目标 | 处理 |
|---|---|
| RSI → Volume | 文末已改为可点 `[Volume](/indicators/volume)` |
| Volume → MACD、MACD → KDJ、KDJ → 布林带 | 四篇均 published，正文互链 |
| 布林带 `learning.next: open-interest` | 仅写在 Front Matter；文末写「OI 编写中，可先回 [/course](/course)」，不链 `/indicators/open-interest` |
| OI / Funding / LSR / CVD | 术语表只释义，不链未发布课 |
| 阶段 2 / 3 | 不链空文章 |

## 测试结果

纯文档任务：无 lint / typecheck / build。

自检：

- [x] 四篇结构均为：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步
- [x] 术语首次出现有中英或定义
- [x] 检索无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」
- [x] 金叉 / 超买 / 开口收口 / 背离未写成开仓指令
- [x] 示意图路径存在且带「示意图」说明；KDJ / 布林带无图
- [x] 内部链接不指向未发布 404
- [x] Front Matter 完整
- [x] MA = SMA、KDJ 称 K 值、强平作正式名

未跑站点构建。`/glossary` 是否列出六组词条、课程壳是否把 `open-interest` 渲成下一篇链接，需 Nuxt / UI / QA 再核。

## 已知问题

1. **布林带 Front Matter 的 next 仍是 `open-interest`。** 文末已改成回 `/course`。若 `useCourse` 把未发布 slug 渲成 `<a href="/indicators/open-interest">`，仍会 404。请 Nuxt 对未发布 slug 不输出下一篇链接。
2. **KDJ / 布林带无示意图。** `vis-009` / `vis-010` 未交付。Visual 补图后 Content 再挂 `visual.cover`。
3. **真实行情图 vis-103 / vis-105 等尚未采集。** 课文写「稍后补上」，没有插假图。
4. **本 HANDOFF 带 draft Front Matter。** 避免 schema 失败与误入 `/glossary`。建议 Nuxt 把 `HANDOFF*.md` 加入 exclude。
5. **阶段 2 / 3 与合约数据层仍无正文。** 不在本任务范围。

## 下一步建议

- QA：按 `docs/qa/content-checklist.md` 审术语、违禁措辞、示意图徽章、断链
- Nuxt / UI：`published` 才进上一篇 / 下一篇；`open-interest` 未发布时不要生成链接；`/glossary` 应列出六组 `category: glossary`
- Visual：KDJ / 布林带示意图、主路径真实行情图采集后，Content 再补图注
- Content 后续 Sprint：OI → 资金费率 → 多空比 → CVD，勿提前把未发布课链进正文
