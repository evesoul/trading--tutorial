---
id: vis-105
title: Volume 真实行情教学窗
type: real-chart
purpose: 用真实成交量柱对照价格，标出量增与量缩各至少一段。
teaching_question: 用户看完应理解：实盘成交量高低差很大，量增或量缩要先相对附近柱子比较，不能看成绝对多空结论。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: pending-capture | intended-window: 2024-10-01T00:00:00Z/2024-10-31T23:59:59Z
annotations:
  - label: 成交量单位
    meaning: 图注写明是张还是 USDT
  - label: 价涨量增段
    meaning: 对照 vis-005
  - label: 价涨量缩段
    meaning: 对照 vis-005
  - label: 异常放量
    meaning: 若窗口内有，只标注「相对放量」，不解释为庄家
status: spec
asset: null
---

# vis-105 Volume 真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续。
- 品种 / 周期：BTCUSDT · 4h。
- 意图窗口：2024-10-01 至 2024-10-31 UTC，上方面板 K 线、下面板 Volume。
- 必须写清成交量口径。

## 禁止

不要按想要的故事去改柱子高度。
