---
title: 价格图与均线
description: K 线、图表周期、回看参数、MA、EMA、趋势与震荡。查完回到课文。
part: 0
category: glossary
level: beginner
order: 3
slug: price-chart
status: published
---

# 价格图与均线

先把图上的时间单位和均线算法分清，后面的指标才对得上。

### K 线（Candlestick / K-line）

把一段时间的开盘价（Open）、最高价（High）、最低价（Low）、收盘价（Close）画成一根柱，简称 OHLC。实体表示开收差，影线表示最高最低超出实体的部分。详见[K 线](/indicators/kline)。

### 图表周期（Timeframe）

一根 K 线代表的时间长度，如 `5m`、`15m`、`1H`、`4H`、`1D`。同一指标在不同周期上的含义不能直接混用。

### 回看参数（Period / Length）

计算指标时向前取多少根已完成的 K 线，如 MA 20、RSI 14。不要把「图表周期」和「回看参数」都简称为「周期」而不加说明。

### 均线（Moving Average，MA）

对过去 N 根收盘价（或其他价格）做平均后连成的线。单独写 **MA** 时，本站默认指**简单移动平均（Simple Moving Average，SMA）**。详见[MA 移动平均线](/indicators/ma)。

### 指数均线（Exponential Moving Average，EMA）

对近期价格给予更高权重的均线，通常比同参数 SMA 更贴近新价格，但仍滞后于价格。本站不把 EMA 简称成「MA」。详见[EMA 指数移动平均线](/indicators/ema)。

### 趋势（Trend）与震荡（Range / Sideways）

趋势：价格在一段时间内更常沿某一方向推进，均线斜率常较明显。震荡：价格在区间内来回，均线走平，动量指标更容易在高低区来回摆动。市场环境会切换。一个指标在趋势里好用，在震荡里可能失效，反之亦然。

### 支撑与阻力（Support / Resistance）

价格曾经多次止跌或受阻的区域。它们是观察位置，不是价格会停住的墙。突破之后原区域角色可能互换，也可能假突破。

### 波动率（Volatility）

价格变动幅度的大小。波动率高不等于方向明确；波动率低也不等于即将突破。[布林带](/indicators/bollinger-bands)的带宽常用来观察波动率的扩张与收缩。

### 流动性（Liquidity）

以较小冲击成交较大数量的能力。流动性差时，滑点、价差、插针更常见，指标也更容易出现一次性极端值。
