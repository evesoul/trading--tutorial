---
title: 动量、成交与合约数据
description: RSI、MACD、KDJ、布林带、成交量，以及已发布的 OI、资金费、多空比、CVD。
part: 0
category: glossary
level: beginner
order: 4
slug: momentum-data
status: published
---

# 动量、成交与合约数据

动量工具回答力度和位置；成交量回答转手；合约数据回答仓、费和主动方向。已发布的课可以点进去。阶段 2 组合课从 [趋势 + 动量](/combinations/trend-momentum) 开始。

### 动量（Momentum）

价格在一段时间内上涨或下跌的力度与速度。RSI、MACD、KDJ 都属于动量观察工具。动量强不保证趋势延续，动量弱也不保证立即反转。

### 相对强弱指标（Relative Strength Index，RSI）

用一段时间内平均涨幅与平均跌幅的关系，把动量映射到约 0–100。详见[RSI](/indicators/rsi)。

### 平滑异同移动平均线（MACD）

用两条 EMA 的差值及其信号线，观察趋势力度变化与交叉。正文称 MACD 线 / 信号线（DIF / DEA）。详见[MACD](/indicators/macd)。

### 随机指标 / KDJ（Stochastic Oscillator / KDJ）

看收盘价在最近 N 根高低区间中的相对位置，再平滑得到 K 值、D 值，并衍生 J 值。请写 **K 值**，不要把指标的 K 叫成 K 线。详见[KDJ](/indicators/kdj)。

### 平均真实波幅（Average True Range，ATR）

对最近 N 根真实波幅做平滑后的宽度尺子，单位与价格相同。不给方向，也不是开仓指令。与布林带对照：ATR 是尺子，布林带是通道。详见[ATR 与波动](/indicators/atr)。

### 布林带（Bollinger Bands，BB）

中轨为均线（本站默认 SMA），上下轨为均线加减若干倍标准差，用来观察波动率与价格相对位置。详见[布林带](/indicators/bollinger-bands)。

### 成交量（Volume）

一段时间内成交的数量。U 本位合约上要分清：标的数量、张数，还是报价货币成交额（如 USDT）。详见[成交量](/indicators/volume)。

### 持仓量（Open Interest，OI）

当前尚未平仓的合约总量。成交量是「这段时间转手多少」，持仓量是「此刻还挂着多少仓」。详见[持仓量](/indicators/open-interest)。价与仓的对照见[价格 + OI](/combinations/price-oi)。

### 资金费率（Funding Rate）

永续合约按周期在多空之间收费的比率。费率为正时，多头支付空头；为负时，空头支付多头。资金费（Funding Payment）是实际划转的金额。详见[资金费率](/indicators/funding-rate)。与持仓量对照见[Funding + OI](/combinations/funding-oi)。

### 多空比（Long/Short Ratio，LSR）

多头相对空头的比值。不同交易所、不同接口的口径不同：账户数比、持仓量比、大户账户比、大户持仓比。没有口径的多空比无法解释。详见[多空比](/indicators/long-short-ratio)。

### 累计成交量差（Cumulative Volume Delta，CVD）

把主动买成交量减主动卖成交量后累加。反映的是主动成交方向的累积，不是普通成交量，也不是持仓量。详见[CVD](/indicators/cvd)。

### 清算瀑布（Liquidation Cascade）

强平单多为被动市价打进薄盘，价格插针并可能连锁。瀑布进行中，成交量、持仓量、CVD、多空比默认暂时不可解释方向。详见[清算瀑布怎么读图](/indicators/liquidation-cascade)。

### 主动买 / 主动卖（Taker Buy / Taker Sell）

吃掉对方挂单的成交。主动买通常是市价买或抬价吃卖单；主动卖通常是市价卖或砸价吃买单。分类依赖交易所字段或重建规则，数据会有误差。普通成交量柱里，两边都在。
