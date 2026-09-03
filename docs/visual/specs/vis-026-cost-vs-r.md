---
id: vis-026
title: 成本对照 R
type: schematic
purpose: 用同一笔教学数字，把一笔来回拆成资金费、手续费、合计占 R；标明教学演算，不能对账。
teaching_question: 用户看完应理解：还没看对错，资金费 22.5 USDT（0.225 R）加手续费 5 USDT（0.05 R）已垫 27.5 USDT（0.275 R）；止损滑点不优于入场。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 1R = 100
    meaning: 入场到计划止损的亏损金额，本例 100 USDT
  - label: 资金费 22.5
    meaning: 5,000 × 0.05% × 9 个 8h 周期；教学单向支付
  - label: 手续费 5.0
    meaning: taker 开平各 0.05%，各 2.5 USDT
  - label: 合计 0.275 R
    meaning: 27.5 ÷ 100；还没看对错就先垫的 R
  - label: 止损滑点
    meaning: 假设不优于入场；本图与上式分开，不混成精确账单
status: delivered
asset: /images/concept/vis-026-cost-vs-r.svg
---

# vis-026 成本对照 R

## 教学说明

与 `docs/strategy/cost-vs-r.md` 对齐。字段必须齐全：权益 10,000、1R = 100、名义 5,000、费率 0.05%/8h、拿 3 天、taker 开平各 0.05%。算术必须写出 22.5 / 5.0 / 27.5 与对应 R。

图内必须标明「教学演算，忽略部分费用，不能对账，不能代表未来」。禁止未标注来源的费率截图、哪家更便宜、资金费套利流程。

## Content / UI 引用

```md
![成本对照 R 示意图](/images/concept/vis-026-cost-vs-r.svg)
```

## 局限

本例忽略点差变动、强平罚金、返佣、部分平仓、maker / taker 混用。滑点另加一行示意，不和 0.275 R 混成精确账单。资金费可正可负，本图只演示持续支付的一侧。
