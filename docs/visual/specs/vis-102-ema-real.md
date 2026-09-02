---
id: vis-102
title: EMA 真实行情教学窗
type: real-chart
purpose: 在真实 4h 图上叠加 EMA(20) 或 EMA(21)，截取含上行、走平、下行各一段的窗口。
teaching_question: 用户看完应理解：实盘里价格相对 EMA 的位置会切换，均线也会滞后，不能只靠「站上均线」做决定。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: pending-capture | intended-window: 2024-09-01T00:00:00Z/2024-11-30T23:59:59Z
annotations:
  - label: EMA(20)
    meaning: 先用单一周期，避免多均线干扰入门
  - label: 价格在均线上方
    meaning: 对照 vis-002 上升段
  - label: 均线走平穿越
    meaning: 对照 vis-002 震荡段
  - label: 价格在均线下方
    meaning: 对照 vis-002 下降段
status: spec
asset: null
---

# vis-102 EMA 真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续。
- 品种 / 周期：BTCUSDT · 4h。
- 指标：EMA 20（若平台默认 21，在图注写明参数）。
- 意图窗口：2024-09-01 至 2024-11-30 UTC，裁切出「先上行、再横盘、再下行」或等价的三段对照。
- 图上必须写 symbol / timeframe / source / 实际 period / EMA 参数。

## 禁止

不要手绘平滑均线冒充实盘。未采集前不插假图。
