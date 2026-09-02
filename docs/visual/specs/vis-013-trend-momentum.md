---
id: vis-013
title: 趋势与动量对照
type: schematic
purpose: 用同一条抽象走势对照：均线全程仍向上，动量先伸展后回落。左段同向观察更清楚，右段反向先等待。
teaching_question: 用户看完应理解：趋势回答方向，动量回答力度；同向时画面更清楚，反向时先等待，不要任选一边。不是金叉开多。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 价格（抽象）
    meaning: 教学几何线，不是某品种 K 线
  - label: EMA 仍向上
    meaning: 均线方向未掉头；价格多在上行均线之上
  - label: 动量伸展
    meaning: 左段力度柱变长，方向与力度暂时一致
  - label: 动量回落
    meaning: 右段力度柱缩短，均线并未掉头
  - label: 同向更清楚
    meaning: 可以讨论有没有交易前提，仍不是开仓指令
  - label: 反向先等待
    meaning: 两份观察互相否定时默认空仓或降低仓位，不要立刻反手
status: delivered
asset: /images/concept/vis-013-trend-momentum.svg
---

# vis-013 趋势与动量对照

## 教学说明

与 `docs/strategy/combinations/trend-momentum.md` 对齐：EMA 负责方向和位置，RSI / MACD 负责力度。本图只出一张冲突对照——同一条抽象走势上，均线仍向上、动量已回落。

左右是同一条线的两段，不是两套行情。左段「同向更清楚」只表示画面比较清楚；右段「反向先等待」不是「该空了」。金叉、超买、柱缩短都标成观察工具。

动量柱用蓝色表示伸展、琥珀色表示回落，避免读者把颜色读成多空指令。不画假 K 线，也不用这段几何证明盈亏。

本任务不出震荡失效图、不出 RSI 长时间停在高位的假行情。课文需要那些画面时另开 Visual Task，或复用 vis-002 / vis-003 / vis-004。

## Content / UI 引用

```md
![趋势与动量对照示意图](/images/concept/vis-013-trend-momentum.svg)
```

## 局限

示意图把动量画成已经分好的柱高变化，没有展开 RSI 与 MACD 的算法差异。实盘里均线周期不同，同向 / 反向的分界会变。本批不伪造真实行情窗。
