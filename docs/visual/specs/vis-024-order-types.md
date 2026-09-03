---
id: vis-024
title: 订单类型与成交
type: schematic
purpose: 用四格对照市价、限价、止损单、只减仓；并在同一根轴上标出最新价止损与标记价强平可以不同步。
teaching_question: 用户看完应理解：规则成立不是单已成交；市价要成交、限价要价格；止损触发不等于成交；只减仓避免平仓单开出新仓；止损未成交也可能先被强平。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 市价
    meaning: 立刻吃对手价，滑点由盘口决定
  - label: 限价
    meaning: 你出的价，可能不成交
  - label: 止损单
    meaning: 触发后变成市价或限价；限价止损可能穿价不成交
  - label: 只减仓
    meaning: 最多减小已有仓位，不开出反向新仓
  - label: 最新价 / 标记价
    meaning: 止损单常看最新价，强平看标记价，两套可以不同步
status: delivered
asset: /images/concept/vis-024-order-types.svg
---

# vis-024 订单类型与成交

## 教学说明

与 `docs/knowledge/order-types.md`、`docs/strategy/execution.md` 对齐。四格只讲机制取舍，不画下单面板，不写「买入 / 卖出」按钮，不写「现在开多」。

正例应能从止损格读出：认错后用只减仓的止损市价，并写明看最新价还是标记价。反例是只在最新价挂很近的限价止损、同时杠杆很高——图内用「不同步」标出，不鼓励高杠杆。

## Content / UI 引用

```md
![订单类型与成交示意图](/images/concept/vis-024-order-types.svg)
```

## 局限

名称因所而异。本图不展开 API、刷量、具体按钮路径。薄盘里止损更接近市价扫货，另见 vis-027。
