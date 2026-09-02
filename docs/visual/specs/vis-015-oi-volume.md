---
id: vis-015
title: 持仓量与成交量区分
type: schematic
purpose: 在同一抽象时段并排放量柱与 OI 曲线，对照放量加仓、放量减仓、放量但 OI 平坦。说明流量不等于存量。
teaching_question: 用户看完应理解：成交量是流量，OI 是存量；三格都是放量，OI 不同则过程不同。不预测下一步方向，单元格不能写成开多 / 开空。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 成交量（流量）
    meaning: 这一段转手多少；三格都偏高，表示放量
  - label: OI 曲线（存量）
    meaning: 现在还挂着多少未平仓合约
  - label: 放量加仓
    meaning: 活跃成交伴随仓位扩张，更像开仓占主导；推不出会按现价方向走下去
  - label: 放量减仓
    meaning: 活跃成交伴随仓位收缩，更像平仓或回补；推不出见顶见底
  - label: 放量但 OI 平坦
    meaning: 换手高、净仓位变化小；推不出主力吸筹或即将突破
status: delivered
asset: /images/concept/vis-015-oi-volume.svg
---

# vis-015 持仓量与成交量区分

## 教学说明

与 `docs/strategy/combinations/oi-volume.md` 对齐：流量 ≠ 存量。本图三格并排放量柱与 OI 曲线，只讲三种过程，不画假 K 线。

价格必须作为上下文带回课文，但本图不假装某品种走势，避免被读成连续剧本。高成交、高 OI 同时出现时，教学落到减小仓位或暂停，不是「机会更大」。

与 vis-006（价格 × OI 四象限）、vis-005 / vis-014（价量）分工：本图只加「流量 vs 存量」。不要重画那几张。

本任务不出平仓推动突破的假行情窗。需要实盘对照时另开 Visual Task。

## Content / UI 引用

```md
![持仓量与成交量区分示意图](/images/concept/vis-015-oi-volume.svg)
```

## 局限

示意图把 OI 更新画成已经对齐的曲线，没有展开交易所更新频率、单位（张 / 币 / USDT）和数据延迟。全网成交量配单交易所 OI 口径已经错了。本批不伪造真实行情窗。
