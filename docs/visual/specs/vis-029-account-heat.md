---
id: vis-029
title: 账户热度：同向计划风险加总
type: schematic
purpose: 用同一组教学数字对照「各 1R 好像分散」和「满额加总成 3R」；热度是计划风险之和，不是保证金占用。
teaching_question: 用户看完应理解：多笔同向或都跟 BTC 的计划风险要加总；三笔各 1% 不是账户只亏 1%；碰到上限则先平、先减或禁止开新仓。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 错误读法 1R
    meaning: 把三笔各 1R 看成已经分散
  - label: 满额加总 3R
    meaning: 与 BTC 同向时按满额计入同一风险篮子
  - label: 教学上限 2R
    meaning: 本图演算用的事先上限，不是标准仓位
  - label: 碰到上限
    meaning: 先平、先减、或禁止开新仓，动作事先写死
status: delivered
asset: /images/concept/vis-029-account-heat.svg
---

# vis-029 账户热度

## 教学说明

与 `docs/strategy/risk-management.md` 账户热度节、`docs/product/curriculum-upgrade.md` 第 3.8 节对齐。热度是未平仓计划风险之和。BTC 是多数 U 本位山寨的共同风险因子；换交易对不是自动分散。

正例：已有 BTC 偏多 1R，ETH 同向只允许加到上限以内，否则不做。反例：同时开 5 个山寨多头，每笔「只亏 1%」。图内 2R 上限只是教学演算。禁止画收益曲线或把热度检查画成赚钱终点。

## Content / UI 引用

```md
![账户热度：同向计划风险加总示意图](/images/concept/vis-029-account-heat.svg)
```

## 局限

本框架不教组合对冲公式、期权或推荐品种篮子。相关如何折算，由学习者在模板第 9 节自己写；写不出折算句时默认满额加总。保证金占用低只说明杠杆高、强平更近，不是热度低。
