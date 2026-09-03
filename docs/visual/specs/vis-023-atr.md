---
id: vis-023
title: ATR 与波动尺子
type: schematic
purpose: 用三格对照 True Range 的三项取最大、同一段抽象价格在窄波动与宽波动下的尺子长短，并标出超出尺子的影线更像异常噪声。
teaching_question: 用户看完应理解：ATR 是近期波幅的尺子、不给方向；同一段价格波动变宽时尺子变长；超出尺子才更像异常噪声，不是开仓指令。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: True Range
    meaning: 高−低、|高−前收|、|低−前收| 三者取最大
  - label: ATR 窄
    meaning: 近期真实波幅偏小，尺子较短
  - label: ATR 宽
    meaning: 近期真实波幅变大，尺子变长；仍没有方向
  - label: 超出尺子
    meaning: 这根波幅大于近期普通宽度，更像异常噪声，不是买入或卖出指令
status: delivered
asset: /images/concept/vis-023-atr.svg
---

# vis-023 ATR 与波动尺子

## 教学说明

与 `docs/knowledge/indicators/atr.md` 对齐：ATR 是尺子，不是通道，更不是突破开仓系统。左格用跳空说明「只看本根高低会漏掉缺口」；中右两格是同一段抽象价格形状，只有波幅变了。

配文应先写出 TR 三项，再讲 ATR 是对 TR 的平滑。不要把中右两格读成「收口之后该追」。与布林带的分工一句话即可：ATR 是尺子，布林带是通道。

## Content / UI 引用

```md
![ATR 与波动尺子示意图](/images/concept/vis-023-atr.svg)
```

## 局限

本图把 ATR 画成固定宽度的示意带，便于看「普通有多宽」。真实行情里每根都会重算，插针会把尺子随后抬高。本库不颁布止损或仓位的标准倍数。真实行情窗见 vis-110。
