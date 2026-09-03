---
id: vis-103
title: MACD 真实行情教学窗
type: real-chart
purpose: 用真实 MACD(12,26,9) 展示零轴上下的柱状变化，以及至少一次金叉与一次死叉。
teaching_question: 用户看完应理解：实盘交叉会滞后、也可能连续来回，交叉出现后价格仍可能继续原方向。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: 2024-08-19T08:00:00Z/2024-09-06T12:00:00Z
annotations:
  - label: 金叉
    meaning: 真实 DIF 上穿 DEA 的时刻，只作标注不写成买入
  - label: 死叉
    meaning: 真实 DIF 下穿 DEA 的时刻，只作标注不写成卖出
  - label: 柱子缩短
    meaning: 两条线靠近，动量变化的观察
  - label: 零轴
    meaning: 必须画出，便于对照柱子正负
status: delivered
asset: /images/indicator/vis-103-macd-real.svg
data: /data/charts/vis-103.json
---

# vis-103 MACD 真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续。
- 品种 / 周期：BTCUSDT · 4h。
- 指标：MACD 12 / 26 / 9（若不同，写明）。
- 意图窗口：2024-08-01 至 2024-10-31 UTC，裁切到同时能看到金叉、死叉、柱子由正转负或由负转正。
- 上方面板价格、下面板 MACD，避免只截副图。

## 禁止

不要把 vis-003 的平滑交叉图改个标题当真实行情。

## 采集结果

- 来源：Binance Vision 月度 USDT-M 4h K 线，窗口内计算 MACD 12/26/9。
- 实际窗口：2024-08-19 08:00 → 2024-09-06 12:00 UTC，110 根。
- JSON：`public/data/charts/vis-103.json`
- 静态快照：`public/images/indicator/vis-103-macd-real.svg`
- 课文：`::real-chart{id="vis-103"}`
