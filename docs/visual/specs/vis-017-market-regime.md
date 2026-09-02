---
id: vis-017
title: 市场环境三态
type: schematic
purpose: 用同一套抽象价格几何，三格对照趋势、震荡、看不清。环境未定时默认不交易。写明不是突破必涨。
teaching_question: 用户看完应理解：先判断环境，再谈方向。高低点抬升才较像趋势，来回穿越较像震荡；结构互相否定时默认空仓。突破不是下一步必涨。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 趋势
    meaning: 高低点抬升，方向相对清楚；只表示可以讨论有没有交易前提，不是开多
  - label: 震荡
    meaning: 价格在上下沿之间来回穿越，没有持续方向；趋势规则在这里容易失效，不是逢高做空
  - label: 看不清
    meaning: 结构互相否定，或戳出区间后又回来；环境未定，默认不交易
  - label: 突破 ≠ 必涨
    meaning: 价格离开整理区只是观察，推不出下一步方向
  - label: 默认不交易
    meaning: 环境识别失败时的默认动作是空仓，不是再找一个指标投票
status: delivered
asset: /images/concept/vis-017-market-regime.svg
---

# vis-017 市场环境三态

## 教学说明

与 `docs/strategy/system-template.md` 第 4 节对齐：市场环境是链路第一步。至少能区分趋势、震荡，以及「识别失败」。环境未定时默认空仓。

本图是三格对照，不是连续剧本，也不是 vis-002 的均线位置课。价格只用抽象折线，不画假 K 线。突破只标成观察，图内写明**不是突破必涨**。

趋势格「方向相对清楚」只表示可以讨论前提，不是开多指令。震荡格说明趋势规则容易失效，不是反手指令。看不清格的默认动作是不交易。

课文继续引用 vis-008 讲整条系统流程。本图只回答「环境这一步看什么」。

## Content / UI 引用

```md
![市场环境三态示意图](/images/concept/vis-017-market-regime.svg)
```

## 局限

示意图把环境收成三态，高波动 / 低波动没有单独成格。实盘里周期不同，趋势与震荡的分界会变。本批不伪造真实行情窗。
