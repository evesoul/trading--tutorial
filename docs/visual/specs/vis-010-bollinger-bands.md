---
id: vis-010
title: 布林带中轨与开口收口
type: schematic
purpose: 用三格对照画出中轨 SMA(20)、上下轨，以及收口与两种开口方向，强调开口方向事先未知。
teaching_question: 用户看完应理解：中轨是 SMA(20)，上下轨是中轨加减倍数标准差；收口只说明波动变窄；开口只说明波动变宽，不是突破必涨；贴着轨道走不等于该反向做。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 中轨 SMA(20)
    meaning: 默认中轨是 20 期简单移动平均，不是另一套独立系统
  - label: 上轨
    meaning: 中轨 + k 倍标准差（本图按常见 k = 2 示意）
  - label: 下轨
    meaning: 中轨 − k 倍标准差
  - label: 收口
    meaning: 带宽变窄，只说明最近波动收缩，不预告方向
  - label: 开口
    meaning: 带宽变宽，只说明波动扩张；向上或向下都可能出现
  - label: 走轨道
    meaning: 价格可以连续贴近上轨或下轨运行，碰轨不是反向指令
status: delivered
asset: /images/concept/vis-010-bollinger-bands.svg
---

# vis-010 布林带中轨与开口收口

## 教学说明

与 `docs/knowledge/indicators/bollinger-bands.md` 对齐：中轨默认 SMA(20)，k = 2。三格是对照，不是一段连续行情，更不是「收口之后向上」的剧本。

配文应先复习 SMA，再叠加 ±2σ。必须保留「走轨道」反例，避免读者把碰上轨当成卖点、碰下轨当成买点。收口之后开口方向事先未知。

## Content / UI 引用

```md
![布林带中轨与开口收口示意图](/images/concept/vis-010-bollinger-bands.svg)
```

## 局限

轨道每根 K 线（蜡烛）都会重算，会跟着价格移动；本图把通道画得较平滑，便于看结构。真实行情里触轨并不稀有，插针会把带宽瞬间撑开。本批不伪造真实行情窗。
