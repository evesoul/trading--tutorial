---
id: vis-001
title: K 线 OHLC 结构
type: schematic
purpose: 用一根阳线和一根阴线拆开开盘、最高、最低、收盘，以及实体与上下影线。
teaching_question: 用户看完应理解：一根 K 线记录一段时间的四个价格，阳线是收盘高于开盘，阴线是收盘低于开盘。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 开盘价 Open
    meaning: 该时间段第一笔成交价
  - label: 最高价 High
    meaning: 该时间段最高成交价
  - label: 最低价 Low
    meaning: 该时间段最低成交价
  - label: 收盘价 Close
    meaning: 该时间段最后一笔成交价
  - label: 实体
    meaning: 开盘与收盘之间的矩形
  - label: 上影线
    meaning: 实体上方到最高价的细线
  - label: 下影线
    meaning: 实体下方到最低价的细线
  - label: 阳线
    meaning: 收盘价高于开盘价
  - label: 阴线
    meaning: 收盘价低于开盘价
status: delivered
asset: /images/concept/vis-001-kline-ohlc.svg
---

# vis-001 K 线 OHLC 结构

## 教学说明

这是结构图，不是某次 BTC 交易。颜色按常见加密交易所习惯：绿色阳线、红色阴线。图内同时写「阳线 / 阴线」，方便习惯 A 股红涨绿跌的读者。

## Content / UI 引用

```md
![K 线结构示意图](/images/concept/vis-001-kline-ohlc.svg)
```

建议配文：先讲四个价格，再讲实体和影线，最后提醒单根 K 线不能单独决定方向。

## 局限

影线长短、实体大小在不同周期含义不同。本图不解释形态（吞没、锤子等），那些需要真实行情窗（见 vis-101）。
