---
id: TASK-036
title: 屏幕、订单、瀑布、成本四课
status: completed
---

# TASK-036 屏幕、订单、瀑布、成本四课

Sprint 011：机制与成交。

## Owner
Content Agent（课文）+ Visual Agent（vis-024、026、027、030）+ Nuxt/UI（`/course/[...slug]` 须已可用）

课文与图可同一 Sprint 内分 commit：先 spec/示意图，再课文。

## 范围
- `content/00-introduction/perp-screen/index.md`
- `content/01-indicators/liquidation-cascade/index.md`
- `content/03-trading-system/order-types/index.md`
- `content/03-trading-system/cost-vs-r/index.md`
- 修订：`funding-rate`、`volume`、`open-interest`、`cvd`、`introduction` 接线
- `docs/visual/specs/` vis-024、026、027、030 及对应 SVG

## 纲要
见总纲第 3.1、3.4、3.6、3.7 节。

## 不在范围
- 下单面板、交易所开户教程
- 资金费套利
- 抄瀑布底

## 依赖
TASK-032、TASK-033；TASK-038 至少先合并 `/course/[...slug]` 骨架

## 验收
- [x] 四篇 published，路径与 learning-path 一致
- [x] 成本课有同一笔教学算术，标明不能对账
- [x] 订单课区分最新价止损与标记价强平
- [x] 瀑布课默认「数据暂时不可解释方向」
- [x] 示意图有徽章；无买卖按钮

HANDOFF：`content/HANDOFF-TASK-036.md`、`docs/visual/HANDOFF-TASK-036.md`。

遗留：`/course/perp-screen` 路由依赖 TASK-038。未改 courseMeta.ts、pages/。
