---
title: Content Agent HANDOFF Sprint 005
description: Sprint 005 / TASK-017 交付说明，不是术语或教程。Nuxt 查询默认不取 draft。
part: 0
category: glossary
level: beginner
order: 99
slug: handoff-sprint-005
status: draft
---

# Content Agent HANDOFF — TASK-017 / Sprint 005

## 完成内容

已按 `docs/product/learning-path.md` 阶段 2 课序写完七篇组合课。修订 CVD 文末，第一篇组合课可点。导学改为阶段 2 已可学、阶段 3 仍未写。术语里 OI / 费率 / 多空比 / CVD 改为链到已发布课。未写阶段 3 正文，未改 `docs/knowledge/`、`docs/strategy/`、`pages/`、`components/`。未做 git commit / push。

交付：

- 趋势 + 动量：EMA 管方向，RSI / MACD 管力度；震荡交叉反复是失效；图 vis-002 / vis-004 / vis-003
- 趋势 + 成交量：价和量是两个问题；量价齐升是观察；图 vis-002 / vis-005
- RSI + MACD：两把动量尺来自同一段价格；一致或分歧只说明观察冲突；图 vis-004 / vis-003
- 价格 + OI：四象限；OI 分不清谁开的仓；图 vis-006
- OI + Volume：流量 vs 存量；放量加仓 / 减仓 / 换手三种过程；图 vis-006 / vis-005
- Funding + OI：拥挤与持有成本，不是反向喊单；图 vis-007 / vis-006
- 多指标共振：共振 ≠ 指标越多越准确；文末回 `/course`，不链阶段 3
- CVD 文末：可点 [趋势 + 动量](/combinations/trend-momentum)，去掉「阶段 2 还在编写」
- 导学：阶段 2 七篇可学并互链；阶段 3 仍未写
- 术语：OI / 费率 / 多空比 / CVD 链到已发布指标课，并补了相关组合课链接

组合用来对照，不是叠加信号。金叉 / 超买 / 背离 / 量价齐升均为观察，不是开仓指令。

## 修改文件

| 路径 | 动作 |
|---|---|
| `content/02-combinations/trend-momentum/index.md` | 新建 |
| `content/02-combinations/trend-volume/index.md` | 新建 |
| `content/02-combinations/rsi-macd/index.md` | 新建 |
| `content/02-combinations/price-oi/index.md` | 新建 |
| `content/02-combinations/oi-volume/index.md` | 新建 |
| `content/02-combinations/funding-oi/index.md` | 新建 |
| `content/02-combinations/multi-indicator/index.md` | 新建 |
| `content/01-indicators/cvd/index.md` | 只改下一步 |
| `content/00-introduction/index.md` | 阶段 2 可学；阶段 3 仍未写 |
| `content/glossary/momentum-data.md` | OI / 费率 / 多空比 / CVD 改为可点已发布课 |
| `content/glossary/observation-terms.md` | 拥挤词条链到已发布课 |
| `content/glossary/market-contracts.md` | 开平仓词条链到 OI / Volume |
| `content/HANDOFF-SPRINT-005.md` | 本文件 |
| `docs/tasks/TASK-017-content-combinations.md` | Status → review，勾选验收项 |

未改 `content/HANDOFF.md`、`HANDOFF-SPRINT-003.md`、`HANDOFF-SPRINT-004.md`（历史记录）。

## Front Matter 摘要

| 路径 | slug | part | category | order | status | prerequisites | next |
|---|---|---|---|---|---|---|---|
| `trend-momentum/index.md` | `trend-momentum` | 2 | combinations | 1 | published | `ema` `rsi` | `trend-volume` |
| `trend-volume/index.md` | `trend-volume` | 2 | combinations | 2 | published | `kline` `ema` `volume` | `rsi-macd` |
| `rsi-macd/index.md` | `rsi-macd` | 2 | combinations | 3 | published | `rsi` `macd` | `price-oi` |
| `price-oi/index.md` | `price-oi` | 2 | combinations | 4 | published | `kline` `open-interest` | `oi-volume` |
| `oi-volume/index.md` | `oi-volume` | 2 | combinations | 5 | published | `open-interest` `volume` | `funding-oi` |
| `funding-oi/index.md` | `funding-oi` | 2 | combinations | 6 | published | `funding-rate` `open-interest` | `multi-indicator` |
| `multi-indicator/index.md` | `multi-indicator` | 2 | combinations | 7 | published | `trend-momentum` | `what-is-a-trading-system` |

全部 `level: intermediate`。每篇含 `title` `description` `part` `category` `level` `order` `slug` `status` `learning.prerequisites` `learning.next` `visual.cover` `visual.charts`。

本文件带 `status: draft`，避免被 `/glossary` 列出。

## 引用的图

交卷时仓库尚无 vis-013–016，课文先复用 vis-002–007。编排器随后补挂：`trend-momentum` vis-013、`trend-volume` vis-014、`oi-volume` vis-015、`multi-indicator` vis-016。`rsi-macd` / `price-oi` / `funding-oi` 仍用 vis-003/004/006/007。

| 文章 | 图 | 说明 |
|---|---|---|
| 趋势 + 动量 | vis-002、vis-004、vis-003 | 示意图；方向 / RSI 分区 / MACD 交叉 |
| 趋势 + 成交量 | vis-002、vis-005 | 示意图；均线位置 / 成交量柱 |
| RSI + MACD | vis-004、vis-003 | 示意图；两把动量尺对照 |
| 价格 + OI | vis-006 | 示意图；未平仓存量 |
| OI + Volume | vis-006、vis-005 | 示意图；存量 vs 流量 |
| Funding + OI | vis-007、vis-006 | 示意图；费率 / 存量 |
| 多指标共振 | vis-002、vis-004、vis-005 | 示意图；方向 / 力度 / 流量三槽 |

正文均标明「示意图」「不是真实行情」。未插入 vis-101–107，未伪造行情证明盈利。

## 已知断链处理

| 目标 | 处理 |
|---|---|
| CVD → 趋势 + 动量 | 文末可点 `/combinations/trend-momentum` |
| 组合课互链 | `/combinations/{slug}`，七篇均 published |
| 已发布指标 | `/indicators/{slug}` |
| `multi-indicator` 的 `learning.next: what-is-a-trading-system` | 仅写在 Front Matter；文末回 [/course](/course)，不链 `/trading-system/what-is-a-trading-system` |
| 阶段 3 | 导学与多指标课写明正文未写，不链空文章 |

## 测试结果

纯文档任务：无 lint / typecheck / build。

自检：

- [x] 七篇结构均为：学习目标 → 概念 → 观察步骤 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步
- [x] 不重讲公式；首次术语有一句解释
- [x] 每篇至少一正一反
- [x] 检索无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」
- [x] 金叉 / 超买 / 背离 / 量价齐升未写成开仓指令
- [x] 示意图路径存在且 alt / 正文含「示意图」
- [x] 内部链接不指向未发布 404（阶段 3 仅 Front Matter next）
- [x] Front Matter 完整

未跑站点构建。课程壳是否把 `what-is-a-trading-system` 渲成下一篇链接，需 Nuxt / UI / QA 再核。

## 已知问题

1. **`multi-indicator` Front Matter 的 next 是 `what-is-a-trading-system`。** 文末已回 `/course`。若 `useCourse` 把未发布 slug 渲成 `<a href="/trading-system/what-is-a-trading-system">`，仍会 404。请 Nuxt 对未发布 slug 不输出下一篇链接。
2. **没有 vis-013–016 组合专用示意图。** 复用 vis-002–007。Visual 补组合图后，Content 再换 cover / 插图。
3. **真实行情图 vis-101–107 未采集、未插入。** 课文只用示意图，没有伪造 K 线。
4. **本 HANDOFF 带 draft Front Matter。** 避免误入 `/glossary`。建议 Nuxt 把 `HANDOFF*.md` 加入 exclude。
5. **阶段 3 仍无正文。** 不在本任务范围。

## 下一步建议

- QA：按 `docs/qa/content-checklist.md` 审术语、违禁措辞、示意图徽章、断链、阶段 2 课序
- Nuxt / UI：`published` 才进上一篇 / 下一篇；`what-is-a-trading-system` 未发布时不要生成链接；`/combinations` 列出七篇
- Visual：若补 vis-013–016，通知 Content 替换复用的单指标图
- Content 后续：阶段 3 第一篇写完后，再把多指标课文末从 `/course` 改成可点的系统课
