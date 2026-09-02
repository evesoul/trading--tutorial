---
id: vis-012
title: CVD 与成交量区分
type: schematic
purpose: 用同一组时间桶并排画出成交量柱、Delta 柱和 CVD 曲线，只讲加法关系：总量、净主动、净主动的累加。
teaching_question: 用户看完应理解：成交量是转手总量；Delta 是主动买减主动卖；CVD 把各桶 Delta 累加。量大但 Delta 接近 0，说明主动买卖接近打平。看斜率，不看绝对值。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 成交量 Volume
    meaning: 该时间桶的转手总量，不分主动买还是主动卖
  - label: Delta
    meaning: 主动买成交量 − 主动卖成交量；可正可负
  - label: CVD
    meaning: CVD_t = CVD_{t-1} + Delta_t；本图从左端为 0，只保留形状
  - label: 量大且 Delta 接近 0
    meaning: 换手多，但主动买卖接近打平，总量大不等于净方向强
  - label: 斜率
    meaning: 向上表示这段累积主动买更多，向下表示主动卖更多；不是买卖指令
status: delivered
asset: /images/concept/vis-012-cvd.svg
---

# vis-012 CVD 与成交量区分

## 教学说明

与 `docs/knowledge/indicators/cvd.md` 对齐：

> Delta = 主动买成交量 − 主动卖成交量
>
> CVD_t = CVD_{t-1} + Delta_t

三层面板共用六个抽象时间桶，只讲加法关系，不画假 K 线，也不用虚构数值证明盈亏。成交量柱用中性灰色，Delta 用绿正红负，避免把「量大」读成「主动买多」。

「主动」指吃单的一方（Taker），不是「看多的人更多」。CVD 不是持仓量（见 vis-006），也不是成交量（见 vis-005）。本图从可见左端重置为 0，重置处跳回 0 不是市场事件。

## Content / UI 引用

```md
![CVD 与成交量区分示意图](/images/concept/vis-012-cvd.svg)
```

## 局限

示意图把方向分类画成已经分好的 Delta，没有展开交易所 side / tick rule / quote rule 的误差。实盘 CVD 的绝对值依赖起点、单位和重置规则，不同网站的曲线不必重合。本批不伪造真实行情窗。
