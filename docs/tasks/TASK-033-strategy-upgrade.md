---
id: TASK-033
title: 升级所需策略框架
status: completed
---

# TASK-033 升级所需策略框架

按 [curriculum-upgrade.md](../product/curriculum-upgrade.md) 第 7.2 节补框架。模板保持 12 节编号。

## Owner
Strategy Agent

## 范围
`docs/strategy/`

## 必须新建
- `execution.md`
- `multi-timeframe.md`
- `cost-vs-r.md`

## 必须修订
- `system-template.md`（填写说明与文末补充）
- `risk-management.md`（热度、BTC 因子、事件）
- `position-sizing.md`（强平远于止损若干 ATR、风险限额）
- `backtest.md`（样本外、滚动前进、盘中止损）
- `combinations/rsi-macd.md`（不要再叠第三把动量尺）
- `README.md`

## 不在范围
- 新开组合一级主题
- 可跟单规则、推荐杠杆
- `content/`

## 验收
- [x] 新文件写清教学目的、误区、在 12 节模板中的位置
- [x] 12 节编号未改
- [x] 无收益承诺

HANDOFF：`docs/strategy/HANDOFF.md`
