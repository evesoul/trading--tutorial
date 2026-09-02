---
id: vis-006
title: 持仓量与价格
type: schematic
purpose: 用四象限对照价格涨跌与 OI 升降，建立永续合约持仓量的观察框架。
teaching_question: 用户看完应理解：OI 是未平仓合约数量；价格与 OI 同向或反向，只说明仓位在增加还是减少，不能直接读出谁在赚钱。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 持仓量 OI
    meaning: 尚未平仓的合约数量
  - label: 价涨 OI 升
    meaning: 上涨时未平仓增加，可能有新仓加入
  - label: 价涨 OI 降
    meaning: 上涨时未平仓减少，可能有旧仓离场（含空头回补）
  - label: 价跌 OI 升
    meaning: 下跌时未平仓增加，可能有新仓加入
  - label: 价跌 OI 降
    meaning: 下跌时未平仓减少，可能有旧仓离场（含多头减仓）
status: delivered
asset: /images/concept/vis-006-open-interest.svg
---

# vis-006 持仓量与价格

## 教学说明

四象限是教科书式观察框架，不是因果定律。同一组合在不同流动性、不同结算时刻含义会变。图中用「可能」而不是「就是」。

OI 不是成交量：成交量是这段时间转手多少，OI 是现在还挂着多少仓。

## Content / UI 引用

```md
![持仓量与价格示意图](/images/concept/vis-006-open-interest.svg)
```

## 局限

本图不画爆仓级 OI 骤降。真实行情窗见 vis-106。
