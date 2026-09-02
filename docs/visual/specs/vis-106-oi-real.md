---
id: vis-106
title: Open Interest 真实行情教学窗
type: real-chart
purpose: 用真实持仓量与价格对照，至少标出「价涨 OI 升」与「价涨或价跌时 OI 降」各一段。
teaching_question: 用户看完应理解：实盘 OI 与价格可以同向也可以反向，读图时要同时看两条线，不能只看 OI 升降。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: pending-capture | intended-window: 2024-09-01T00:00:00Z/2024-10-31T23:59:59Z
annotations:
  - label: OI 曲线或柱
    meaning: 未平仓合约数量，单位写在图注
  - label: 价涨 OI 升
    meaning: 对照 vis-006 左上象限
  - label: OI 下降段
    meaning: 对照 vis-006 的「仓位减少」象限
status: spec
asset: null
---

# vis-106 Open Interest 真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续。
- 品种 / 周期：BTCUSDT · 4h 价格；OI 用同一交易所同期持仓量。
- 意图窗口：2024-09-01 至 2024-10-31 UTC。
- 图上同时有价格与 OI，缺一不可。

## 禁止

不要用四象限示意图拼接成「案例证明」。OI 口径（币、张、USDT）必须写明。
