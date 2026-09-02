---
id: vis-004
title: RSI 超买超卖
type: schematic
purpose: 画出 0–100 的 RSI，标出 70 / 50 / 30，并标明强趋势中 RSI 可以在高位或低位停留。
teaching_question: 用户看完应理解：70 附近是常见超买观察区，30 附近是常见超卖观察区；超买不等于马上跌，超卖不等于马上涨。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 超买观察区
    meaning: 传统分析常看 70 附近；只表示上涨动能相对偏强
  - label: 超卖观察区
    meaning: 传统分析常看 30 附近；只表示下跌动能相对偏强
  - label: 50 中线
    meaning: 多空动能相对平衡的参考，不是翻转开关
  - label: 高位停留
    meaning: 强上升段里 RSI 可以长时间留在高位
  - label: 低位停留
    meaning: 强下降段里 RSI 可以长时间留在低位
status: delivered
asset: /images/concept/vis-004-rsi-zones.svg
---

# vis-004 RSI 超买超卖

## 教学说明

与 `docs/knowledge/indicators/RSI.md` 对齐：默认常见参数 14，但不是固定规则；背离另文处理，本图不画背离，以免一次塞两个概念。

## Content / UI 引用

```md
![RSI 超买超卖示意图](/images/concept/vis-004-rsi-zones.svg)
```

## 局限

30 / 70 是常见习惯，不是物理边界。不同品种、不同周期阈值会变。真实行情窗见 vis-104。
