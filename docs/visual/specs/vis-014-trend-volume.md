---
id: vis-014
title: 价量是否同步
type: schematic
purpose: 用两格对照同一条抽象价动：左格成交量跟上，右格成交量没跟上。说明价和量是两个问题。
teaching_question: 用户看完应理解：价格回答「做了什么」，成交量回答「有没有人参与」。放量没有方向，量只改变观察权重，不是开仓指令。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 价动
    meaning: 价格离开整理区的抽象形状；左右两格相同
  - label: 对照段
    meaning: 价动之前的相对成交量参照，不是绝对标准
  - label: 价动且量跟上
    meaning: 离开整理区时成交量高于对照段；参与度与价动暂时一致
  - label: 价动且量没跟上
    meaning: 同一价动形状，成交量低于对照段；称为弱参与，不是假突破盖章
  - label: 成交量（总量）
    meaning: 中性灰柱，不分主动买还是主动卖，没有方向
status: delivered
asset: /images/concept/vis-014-trend-volume.svg
---

# vis-014 价量是否同步

## 教学说明

与 `docs/strategy/combinations/trend-volume.md` 对齐：价和量是两个问题。本图只出突破伴量 vs 突破缩量这一对对照——同一抽象价动，不同的量。

左边不是「该追」，右边不是「假突破、该反手」。量只改变观察权重。成交量回答不了加仓还是平仓，那是 OI 的问题（见 vis-015 / vis-006）。

成交量柱用中性灰，避免把「量大」读成看涨。不画假 K 线蜡烛，价格只用抽象折线。

本任务不出「放量滞涨」「价格新高但量递减」的单独假行情窗。需要时另开任务，或复用 vis-005。

## Content / UI 引用

```md
![价量是否同步示意图](/images/concept/vis-014-trend-volume.svg)
```

## 局限

示意图把「跟上 / 没跟上」画成对照段高低，没有展开时段差异、刷量、跨交易所口径。实盘必须先固定参照区间。本批不伪造真实行情窗。
