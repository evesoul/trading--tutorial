---
id: vis-110
title: ATR 真实行情教学窗
type: real-chart
purpose: 用真实 BTCUSDT K 线叠加 ATR(14) 宽度，对照 vis-023：尺子不给方向，波动变宽尺子变长，超出尺子更像异常噪声。
teaching_question: 用户看完应理解：ATR 是近期波幅的尺子；同一段行情里波动变宽时数值变大；单根远大于 ATR 只说明超出普通宽度，不是开仓指令。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: 2024-10-12T00:00:00Z/2024-10-30T04:00:00Z
annotations:
  - label: ATR(14)
    meaning: Wilder 平滑，N = 14，单位 USDT
  - label: 窄段 / 宽段
    meaning: 窗内 ATR 约从 545 抬到 985，相对自己变宽
  - label: 超出尺子的一根
    meaning: 2024-10-15 12:00 UTC，TR ≈ 3182，当时 ATR ≈ 916（约 3.5 倍）
status: delivered
asset: /images/indicator/vis-110-atr-real.svg
data: /data/charts/vis-110.json
---

# vis-110 ATR 真实行情教学窗

## 采集要求

- 复用 vis-101 冻结窗，不再另打接口。该窗已能同时看出 ATR 相对自己由窄变宽，并有一根 TR 明显大于当时 ATR。
- 图上必须写：`BTCUSDT` `4h` `Binance USDT-M`、实际起止时间，以及 ATR 周期与平滑法（本库默认 Wilder N = 14）。
- 这是单概念波动尺子窗，不是组合课实盘窗。

## 禁止

不要用 vis-023 的几何蜡烛冒充本图。不要画 ATR 通道突破买入。不要颁布 2 倍 / 3 倍等标准倍数。

## 采集结果

- 来源：与 vis-101 相同，Binance Vision 月度 USDT-M 4h K 线。
- 实际窗口：2024-10-12 00:00 → 2024-10-30 04:00 UTC，4h，110 根。
- JSON：`public/data/charts/vis-110.json`（`panels` 含 `atr`，`parameters.atrMethod = Wilder`）
- 静态快照：`public/images/indicator/vis-110-atr-real.svg`（徽章为「真实行情」）
- 课文：`::real-chart{id="vis-110"}`
- 生成脚本：`scripts/build-vis-109-110.mjs`
