---
id: vis-109
title: 摆动结构真实行情教学窗
type: real-chart
purpose: 用真实 BTCUSDT K 线标出一组已收盘摆动点，对照 vis-022 的 HH/HL、回撤与假突破。
teaching_question: 用户看完应理解：实盘里上升结构仍是更高高点/更高低点；回撤常见；影线扫过前高不等于收盘离开。
symbol: BTCUSDT
timeframe: 4h
source: binance-usdm-perp
period: 2024-10-12T00:00:00Z/2024-10-30T04:00:00Z
annotations:
  - label: L / HL
    meaning: 10-13 低点 62020；10-17 更高低点 66600
  - label: HH
    meaning: 10-18 更高高点约 69000
  - label: 扫过
    meaning: 10-21 上影到 69566，收盘回到 69000 一带以内
  - label: 回撤
    meaning: 10-22 低点 66536.5，先记回撤，不自动写成反转
status: delivered
asset: /images/indicator/vis-109-market-structure-real.svg
data: /data/charts/vis-109.json
---

# vis-109 摆动结构真实行情教学窗

## 采集要求

- 复用 vis-101 / vis-108 的冻结 K 线（BTCUSDT · 4h · 2024-10-12 00:00 → 2024-10-30 04:00 UTC），不再另打接口。
- 图上必须写：`BTCUSDT` `4h` `Binance USDT-M` 以及实际起止时间。
- 只标已收盘摆动点。预标线是观察约定，不是未来保证。
- 这是单概念价格结构窗，不是组合课实盘窗。

## 禁止

不要用 vis-022 的几何蜡烛冒充本图。不要画订单块、庄家箭头、买卖按钮。

## 采集结果

- 来源：与 vis-101 相同，Binance Vision 月度 USDT-M 4h K 线。
- 实际窗口：2024-10-12 00:00 → 2024-10-30 04:00 UTC，4h，110 根。
- JSON：`public/data/charts/vis-109.json`（含 HH/HL/扫过/回撤 markers，以及 69000 观察位）
- 静态快照：`public/images/indicator/vis-109-market-structure-real.svg`（徽章为「真实行情」）
- 课文：`::real-chart{id="vis-109"}`
- 生成脚本：`scripts/build-vis-109-110.mjs`
