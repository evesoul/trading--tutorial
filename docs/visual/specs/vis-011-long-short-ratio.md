---
id: vis-011
title: 多空比必须先标口径
type: schematic
purpose: 用四种口径卡片，加同一抽象时刻的账户数比与持仓量比对照，说明多空比是「某一统计口径下的倾斜」，不是「市场多空」。
teaching_question: 用户看完应理解：没有口径的多空比无法解释；账户数比和持仓量比可以反向；它只覆盖该交易所该接口样本，不是买卖指令。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 口径
    meaning: 统计对象是账户数还是仓位、全员还是大户；先读口径再读数字
  - label: 账户数比
    meaning: 持多账户数 ÷ 持空账户数；一个大户和一个散户各算 1
  - label: 持仓量比
    meaning: 多头仓位总量 ÷ 空头仓位总量；可与账户数比反向
  - label: 大户账户比 / 大户持仓比
    meaning: 只统计交易所定义的排名靠前账户；仍不是全市场
  - label: 比值 1
    meaning: 该口径相对均衡的参考，不是超买超卖线，也不是买卖开关
status: delivered
asset: /images/concept/vis-011-long-short-ratio.svg
---

# vis-011 多空比必须先标口径

## 教学说明

与 `docs/knowledge/indicators/long-short-ratio.md` 对齐：

> 多空比 = 多头侧统计量 / 空头侧统计量

图内第一屏就是四种口径，禁止先丢一个数字再解释。左右两格是**同一抽象时刻**的对照：账户数比可以大于 1，持仓量比可以小于 1。这是几何示意，不是某品种、某交易所的真实持仓。

不要写成「市场多空」「全球情绪」「散户偏多就该空」。比值 1 只是该口径是否均衡的参考，不要画成 RSI 风格的 0–100 / 70/30。

OI（vis-006）讲未平仓存量，资金费（vis-007）讲谁付钱。本图只讲结构倾斜的口径，不要重画那两张。

## Content / UI 引用

```md
![多空比必须先标口径示意图](/images/concept/vis-011-long-short-ratio.svg)
```

## 局限

示意图用圆点表示「一个账户」、用色块长度表示「相对仓位」，便于对比人数与规模。实盘接口的对冲规则、更新频率、单位（张 / 币 / USDT）因所而异，课文必须抄接口说明。本批不伪造真实行情窗。
