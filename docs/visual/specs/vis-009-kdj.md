---
id: vis-009
title: KDJ：K 值 / D 值 / J 值
type: schematic
purpose: 画出 KDJ 三条读数（K 值、D 值、J 值），标出 80 / 20 观察区，并标明 J 值可以高于 100 或低于 0。
teaching_question: 用户看完应理解：KDJ 用 K 值、D 值、J 值描述收盘在最近高低区间里的位置；80 / 20 是常见观察区；J 值更敏感、可越出 0 与 100；这些都不是买卖指令。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: K 值
    meaning: 对 RSV 平滑后的较快读数；本图称「K 值」，不要写成「K 线」
  - label: D 值
    meaning: 对 K 值再平滑后的较慢读数
  - label: J 值
    meaning: J = 3K − 2D，更敏感，可以高于 100 或低于 0
  - label: 超买观察区
    meaning: 传统分析常看 80 附近；只表示收盘相对窗口偏强，不是卖出指令
  - label: 超卖观察区
    meaning: 传统分析常看 20 附近；只表示收盘相对窗口偏弱，不是买入指令
  - label: 50 中线
    meaning: 窗口内收盘大致居中的参考，不是翻转开关
status: delivered
asset: /images/concept/vis-009-kdj.svg
---

# vis-009 KDJ：K 值 / D 值 / J 值

## 教学说明

与 `docs/knowledge/indicators/kdj.md` 对齐：默认常见参数 (9, 3, 3)，J = 3K − 2D。图内只写 **K 值 / D 值 / J 值**，禁止把指标的 K 写成「K 线」，以免和蜡烛图混淆。

80 / 20 是观察带，不是必须反向的开关。交叉在实盘里非常频繁，本图不把交叉画成买卖点。强趋势里读数可以在高位或低位停留（钝化），本图不另开背离专题。

## Content / UI 引用

```md
![KDJ：K 值 / D 值 / J 值示意图](/images/concept/vis-009-kdj.svg)
```

## 局限

示意图把三条线画得比较干净。实盘里 J 值会反复穿出 0 / 100，K 值与 D 值会连续交叉。本批不伪造真实行情窗；接入行情后再单独立 vis 采集。
