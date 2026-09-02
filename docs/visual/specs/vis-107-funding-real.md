---
id: vis-107
title: Funding Rate 真实行情教学窗
type: real-chart
purpose: 用真实资金费率时间序列展示正费率、负费率以及一次相对偏高的正费率或偏低的负费率。
teaching_question: 用户看完应理解：实盘费率大多在零轴附近小幅摆动；出现偏高或偏低时，价格仍可能沿原方向走一段时间。
symbol: BTCUSDT
timeframe: 8h
source: binance-usdm-perp
period: pending-capture | intended-window: 2024-08-01T00:00:00Z/2024-11-30T23:59:59Z
annotations:
  - label: 结算间隔
    meaning: Binance BTCUSDT 永续常见 8h，若窗口内出现特殊间隔需注明
  - label: 正费率段
    meaning: 多头支付空头
  - label: 负费率段
    meaning: 空头支付多头
  - label: 相对极值
    meaning: 相对该窗口的高/低，不标成「反转信号」
status: spec
asset: null
---

# vis-107 Funding Rate 真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续。
- 品种：BTCUSDT。
- 周期：资金费率序列按结算点（常见 8h），可另附同期 4h 价格小窗作对照。
- 意图窗口：2024-08-01 至 2024-11-30 UTC，需同时出现正、负费率。
- 图注写清费率单位（例如 0.01% = 0.0001）。

## 禁止

不要手绘平滑费率曲线冒充实盘。不要把「费率转负」标成做空建议。
