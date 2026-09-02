---
id: vis-007
title: 资金费率正负
type: schematic
purpose: 在零轴上下画出资金费率，标明正费率由多头支付空头、负费率由空头支付多头。
teaching_question: 用户看完应理解：资金费率是永续合约让价格贴近现货的定期支付；正负表示谁付钱，极端费率也不等于价格立刻反向。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 零轴
    meaning: 费率为 0 的参考线
  - label: 正费率
    meaning: 多头向空头支付
  - label: 负费率
    meaning: 空头向多头支付
  - label: 偏高正费率
    meaning: 多头相对拥挤的一种近似，价格仍可能继续涨
  - label: 偏低负费率
    meaning: 空头相对拥挤的一种近似，价格仍可能继续跌
status: delivered
asset: /images/concept/vis-007-funding-rate.svg
---

# vis-007 资金费率正负

## 教学说明

先讲「谁付给谁」，再讲「拥挤程度只是近似」。不要把「费率转正」画成做多信号。

常见结算间隔是 8 小时，各所规则不同，示意图不绑定具体数值。

## Content / UI 引用

```md
![资金费率示意图](/images/concept/vis-007-funding-rate.svg)
```

## 局限

本图不计算资金费用对持仓成本的累积。真实行情窗见 vis-107。
