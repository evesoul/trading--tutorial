---
id: vis-104
title: RSI 真实行情教学窗
type: real-chart
purpose: 用真实 RSI(14) 展示进入 70 / 30 观察区，以及至少一段「高位停留仍继续涨」或「低位停留仍继续跌」。
teaching_question: 用户看完应理解：实盘里 RSI 进入超买或超卖区之后，价格常常不会立刻反向。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: pending-capture | intended-window: 2024-07-01T00:00:00Z/2024-09-30T23:59:59Z
annotations:
  - label: RSI(14)
    meaning: 与知识库默认常见参数一致
  - label: 70 线
    meaning: 超买观察区下沿
  - label: 30 线
    meaning: 超卖观察区上沿
  - label: 高位停留
    meaning: RSI 留在高位而价格未立刻转跌的一段
status: spec
asset: null
---

# vis-104 RSI 真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续。
- 品种 / 周期：BTCUSDT · 4h。
- 指标：RSI 14，图上画 70 / 50 / 30。
- 意图窗口：2024-07-01 至 2024-09-30 UTC。优先截「RSI > 70 后价格仍上行」的一段，用来对照 vis-004 的高位停留说明。
- 本窗不强制找背离；背离另开 spec。

## 禁止

不要用示意图的平滑 RSI 曲线代替实盘。
