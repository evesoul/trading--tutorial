---
id: vis-002
title: EMA 与趋势位置
type: schematic
purpose: 用三段抽象行情说明价格相对 EMA 的常见位置：均线上方、来回穿越、均线下方。
teaching_question: 用户看完应理解：EMA 是对近期价格的平滑，价格在均线上方或下方只是相对位置，不能单独当成买卖指令。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: EMA
    meaning: 指数移动平均线，对近期价格加权更高
  - label: 上升段
    meaning: 价格多在上行 EMA 上方，是观察趋势的一种方式
  - label: 震荡段
    meaning: EMA 走平，价格来回穿越
  - label: 下降段
    meaning: 价格多在下行 EMA 下方
  - label: 价格相对位置
    meaning: 只描述「现在在均线哪一侧」，不预测下一步
status: delivered
asset: /images/concept/vis-002-ema-trend.svg
---

# vis-002 EMA 与趋势位置

## 教学说明

三段是为了对照，不是一套连胜剧本。震荡段必须画出来，避免读者以为 EMA 只会「顺趋势」。

配文应说明：均线周期不同，位置结论会变；强趋势里价格可以长时间不回均线，弱趋势里频繁穿越。

## Content / UI 引用

```md
![EMA 与趋势位置示意图](/images/concept/vis-002-ema-trend.svg)
```

## 局限

本图不比较 MA 与 EMA，也不演示金叉死叉。真实行情对照见 vis-102。
