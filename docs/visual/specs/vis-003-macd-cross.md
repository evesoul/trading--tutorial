---
id: vis-003
title: MACD 柱与交叉
type: schematic
purpose: 在零轴上下画出 DIF、DEA 与柱状图，并标出金叉、死叉各一次，强调交叉只是观察工具。
teaching_question: 用户看完应理解：MACD 柱表示 DIF 与 DEA 的距离；金叉是 DIF 上穿 DEA，死叉是 DIF 下穿 DEA；交叉不等于价格马上反转。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: DIF
    meaning: 快线，通常为短期 EMA 减长期 EMA
  - label: DEA
    meaning: 慢线，DIF 的移动平均
  - label: 柱状图 Histogram
    meaning: DIF 减 DEA，柱子变短表示两条线靠近
  - label: 零轴
    meaning: DIF / 柱子正负的分界，不是买卖线
  - label: 金叉
    meaning: DIF 从下方穿过 DEA，是动量观察点
  - label: 死叉
    meaning: DIF 从上方穿过 DEA，是动量观察点
status: delivered
asset: /images/concept/vis-003-macd-cross.svg
---

# vis-003 MACD 柱与交叉

## 教学说明

图注必须写「观察点」，不要写「买入 / 卖出」。零轴附近的交叉和远离零轴的交叉，教学上应分开讲，本图只先建立零件名称。

## Content / UI 引用

```md
![MACD 柱与交叉示意图](/images/concept/vis-003-macd-cross.svg)
```

## 局限

示意图把交叉画得很干净。实盘里交叉会反复、会滞后。真实行情窗见 vis-103。
