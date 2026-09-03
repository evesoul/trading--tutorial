---
id: vis-027
title: 清算瀑布中量 / OI / CVD 失真
type: schematic
purpose: 同一时段抽象价格插针，底下成交量、持仓量、CVD 三条曲线同时剧烈抖动，标明数据暂时不可解释方向。
teaching_question: 用户看完应理解：强平单打进薄盘会插针并可能连锁；此时量 / OI / CVD 可能同时失真；默认不写方向句；禁止条件是空仓或只平不开。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 插针
    meaning: 市价扫过薄盘后的长影或跳价，收回不等于底部
  - label: 成交量失真
    meaning: 巨量可能主要是连锁平仓，不是新开仓共识
  - label: OI 失真
    meaning: 未平仓被关掉，口径可能滞后
  - label: CVD 失真
    meaning: 强平 taker 会扭曲主动净额，不是主力出货
  - label: 数据不可用
    meaning: 瀑布进行中这些数暂时不可解释方向
status: delivered
asset: /images/concept/vis-027-liquidation-cascade.svg
---

# vis-027 清算瀑布中量 / OI / CVD 失真

## 教学说明

与 `docs/knowledge/indicators/liquidation-cascade.md` 对齐。图的中心命题必须出现：**瀑布进行中，这些数暂时不可解释方向。**

禁止画「抄瀑布底」箭头、预测结束的价位、买卖按钮。长下影不要画成锤子线底部形态。多空比可在注记里提一句，不必再画第四条轴。

## Content / UI 引用

```md
![清算瀑布中量 / OI / CVD 失真示意图](/images/concept/vis-027-liquidation-cascade.svg)
```

## 局限

示意图把三条曲线画成同时失真，便于对照。真实行情里滞后、口径、跨所差异都会让它们对不齐。本图不伪造真实行情，也不教预测瀑布结束。
