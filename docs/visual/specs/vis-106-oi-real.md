---
id: vis-106
title: Open Interest 真实行情教学窗
type: real-chart
purpose: 用真实持仓量与价格对照，至少标出「价涨 OI 升」与「价涨或价跌时 OI 降」各一段。
teaching_question: 用户看完应理解：实盘 OI 与价格可以同向也可以反向，读图时要同时看两条线，不能只看 OI 升降。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: 2024-10-11T08:00:00Z/2024-10-29T12:00:00Z
annotations:
  - label: OI 曲线或柱
    meaning: 未平仓合约数量，单位写在图注
  - label: 价涨 OI 升
    meaning: 对照 vis-006 左上象限
  - label: OI 下降段
    meaning: 对照 vis-006 的「仓位减少」象限
status: delivered
asset: /images/indicator/vis-106-oi-real.svg
data: /data/charts/vis-106.json
---

# vis-106 Open Interest 真实行情教学窗

## 采集要求

- 交易所：Binance U 本位永续。
- 品种 / 周期：BTCUSDT · 4h 价格；OI 用同一交易所同期持仓量。
- 意图窗口：2024-09-01 至 2024-10-31 UTC。
- 图上同时有价格与 OI，缺一不可。

## 禁止

不要用四象限示意图拼接成「案例证明」。OI 口径（币、张、USDT）必须写明。

## 采集结果

- 来源：Binance Vision 日度 metrics（5 分钟 OI）对齐到 4h 桶内最后快照；价格为同期 4h K 线。
- 口径：`sum_open_interest_value`（USDT 名义价值）。
- 实际窗口：2024-10-11 08:00 → 2024-10-29 12:00 UTC，110 根。
- JSON：`public/data/charts/vis-106.json`
- 静态快照：`public/images/indicator/vis-106-oi-real.svg`
- 课文：`::real-chart{id="vis-106"}`
