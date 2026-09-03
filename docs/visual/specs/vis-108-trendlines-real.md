---
id: vis-108
title: 趋势线与支撑阻力教学窗
type: real-chart
purpose: 用与 vis-101 同一段 BTCUSDT 4h 冻结窗，预画上升趋势线与水平观察位，并允许练习划线。
teaching_question: 用户看完应理解：先找两个更高的低点连线，再把 69000 附近看成区域；影线扫过不等于收盘站稳。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: 2024-10-12T00:00:00Z/2024-10-30T04:00:00Z
annotations:
  - label: 上升趋势线
    meaning: 连接 2024-10-13 12:00 UTC 低点 62020 与 2024-10-17 12:00 UTC 低点 66600
  - label: 阻力区约 69000
    meaning: 10-18 / 10-21 高点附近的观察区，不是必须停住的墙
  - label: 回踩区约 66500
    meaning: 10-22 低点附近的观察区
status: delivered
asset: /images/indicator/vis-108-trendlines-real.svg
data: /data/charts/vis-108.json
---

# vis-108 趋势线与支撑阻力教学窗

## 采集要求

- 复用 vis-101 的冻结 K 线，不再另打 Binance。
- 品种 / 周期：BTCUSDT · 4h。
- 实际窗口：2024-10-12 00:00 → 2024-10-30 04:00 UTC，110 根。
- 图上必须写：`BTCUSDT` `4h` `Binance USDT-M` 以及实际起止时间。
- 这是单概念价格结构窗，不是组合课实盘窗。

## 禁止

不要用 vis-021 的几何蜡烛冒充本图。不要加入下单或买卖按钮。不要把预画线写成未来保证。

## 采集结果

- 来源：与 vis-101 相同，Binance Vision 月度 USDT-M 4h K 线。
- JSON：`public/data/charts/vis-108.json`（`drawTools: true`，含三条教学 `guides`）
- 静态快照：`public/images/indicator/vis-108-trendlines-real.svg`（徽章为「真实行情」）
- 课文：`::real-chart{id="vis-108"}`
