---
id: vis-104
title: RSI 真实行情教学窗
type: real-chart
purpose: 用真实 RSI(14) 展示进入 70 / 30 观察区，以及至少一段「高位停留仍继续涨」或「低位停留仍继续跌」。
teaching_question: 用户看完应理解：实盘里 RSI 进入超买或超卖区之后，价格常常不会立刻反向。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: 2024-07-01T00:00:00Z/2024-07-19T04:00:00Z
annotations:
  - label: RSI(14)
    meaning: 与知识库默认常见参数一致
  - label: 70 线
    meaning: 超买观察区下沿
  - label: 30 线
    meaning: 超卖观察区上沿
  - label: 高位停留
    meaning: RSI 留在高位而价格未立刻转跌的一段
status: delivered
asset: /images/indicator/vis-104-rsi-real.svg
data: /data/charts/vis-104.json
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

## 采集结果

- 来源：Binance Vision 月度 USDT-M 4h K 线，窗口内计算 RSI(14)。
- 实际窗口：2024-07-01 00:00 → 2024-07-19 04:00 UTC，110 根。
- JSON：`public/data/charts/vis-104.json`
- 静态快照：`public/images/indicator/vis-104-rsi-real.svg`
- 课文：`::real-chart{id="vis-104"}`
