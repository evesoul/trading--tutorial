# Agent Task

## Task ID
TASK-013

## Title
合约数据层：OI / 资金费率 / 多空比 / CVD

## Owner
Content Agent

## Goal
按学习路径写完阶段 1 最后四篇。修订布林带文末，使 OI 可点。

## Scope
- `content/01-indicators/open-interest/`
- `content/01-indicators/funding-rate/`
- `content/01-indicators/long-short-ratio/`
- `content/01-indicators/cvd/`
- `content/01-indicators/bollinger-bands/index.md`（只改下一步）
- `content/00-introduction/index.md`（合约层从「编写中」改为可学）
- `content/HANDOFF-SPRINT-004.md`

## Out of Scope
- 阶段 2 / 3 正文
- 改 `docs/knowledge/`
- 伪造真实行情
- git commit / push

## Input
- `docs/product/learning-path.md`
- `docs/knowledge/indicators/open-interest.md` `funding-rate.md` `long-short-ratio.md` `cvd.md`
- `docs/knowledge/perpetual-futures.md`
- 图：vis-006 OI、vis-007 Funding；LSR/CVD 若有 vis-011 / vis-012 则引用

## Front Matter

| slug | order | prereq | next |
|---|---|---|---|
| open-interest | 9 | volume | funding-rate |
| funding-rate | 10 | open-interest | long-short-ratio |
| long-short-ratio | 11 | open-interest | cvd |
| cvd | 12 | volume | 可写 `trend-momentum` 但不链 404 |

全部 `status: published`，`part: 1`，`category: indicators`。

CVD 文末：阶段 2 编写中，回 [怎么学](/course)，不要 `/combinations/trend-momentum`。
多空比必须写口径（账户数 / 持仓量 / 大户），无口径不引用「市场多空」。
OI 与 Volume / CVD 三分开。资金费率 vs 资金费。
禁止违禁措辞；费率极端、四象限不是反向喊单。

## Acceptance Criteria
- [x] 四篇 published，结构完整
- [x] 布林带文末可点 OI
- [x] 无未发布 404 链接
- [x] 示意图标明示意图
- [x] HANDOFF

## Status
completed
