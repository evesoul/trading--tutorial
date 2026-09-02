---
id: vis-101
title: K 线真实行情教学窗
type: real-chart
purpose: 用真实 BTCUSDT K 线展示连续阳线、阴线与影线，对照 vis-001 的结构讲解。
teaching_question: 用户看完应理解：实盘 K 线大小不一、影线不规则，但每一根仍然只有 OHLC 四个价格。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: pending-capture | intended-window: 2024-10-01T00:00:00Z/2024-10-31T23:59:59Z
annotations:
  - label: 连续阳线
    meaning: 收盘高于开盘的若干根，用于对照结构，不解释为趋势信号
  - label: 带长上影的阴线
    meaning: 说明最高价可以远离实体
  - label: 带长下影的阳线
    meaning: 说明最低价可以远离实体
status: spec
asset: null
---

# vis-101 K 线真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续（USDT-M）。
- 品种 / 周期：BTCUSDT · 4h。
- 意图窗口：2024-10-01 至 2024-10-31 UTC，采集后可裁切到约 80–120 根、同时含阳线与阴线、长短影线的一段。
- 图上必须写：`BTCUSDT` `4h` `Binance USDT-M` 以及实际起止时间。

## 禁止

不要用 vis-001 的几何蜡烛冒充本图。未采集前 Content 只引用本 spec，不插假图。

## 采集后

截图放入 `public/images/indicator/vis-101-kline-real.png`（或后续图表组件出图），把本文件 `status` 改为 `delivered`，并改写 `period` 为实际起止。
