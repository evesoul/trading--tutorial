---
id: vis-016
title: 问题槽不是指标堆叠
type: schematic
purpose: 用方向 / 力度 / 量或仓三张问题槽，对照「同一槽堆叠」与「不同槽分工」。写明不是指标越多越准确，三个槽对齐不等于更可靠。
teaching_question: 用户看完应理解：共振是不同问题指向同一上下文；一个槽只留一个代表。对齐后仍要止损，仍可能失败。不要用收益柱比较指标数量。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 方向
    meaning: 趋势还是震荡、偏向哪一侧；择一：价格结构或 EMA
  - label: 力度
    meaning: 涨跌是在加强还是减弱；择一：RSI 或 MACD
  - label: 量或仓
    meaning: 参与是否活跃，或未平仓增减；择一：Volume 或 OI
  - label: 同一槽堆叠
    meaning: RSI + MACD + KDJ 同时金叉是重复采样，不是三重证据
  - label: 不同槽分工
    meaning: 三个槽各留一个代表；这是分工示例，不是推荐参数
  - label: 三个槽对齐 ≠ 更可靠
    meaning: 清楚只表示可以讨论前提，不表示胜率更高或可以加大杠杆
status: delivered
asset: /images/concept/vis-016-multi-indicator.svg
---

# vis-016 问题槽不是指标堆叠

## 教学说明

与 `docs/strategy/combinations/multi-indicator.md` 对齐。核心命题必须出现在图内：**不是指标越多越准确。**

本图是问题槽信息图，不是行情窗。禁止收益柱比较「指标数量 vs 赚钱」。右边三个小卡（EMA / RSI / Volume）只是分工示例，不是推荐实盘组合。

风险槽（止损、仓位、禁止条件）写在图注里：任何指标都代替不了。永续有爆仓，不要因为对齐就提高杠杆。

本任务不出「对齐后仍失败」的真实行情，也不出第四象限假行情。rsi-macd / price-oi / funding-oi 复用 vis-003 / vis-004 / vis-006 / vis-007。

## Content / UI 引用

```md
![问题槽不是指标堆叠示意图](/images/concept/vis-016-multi-indicator.svg)
```

## 局限

示意图把问题槽收成三个，拥挤 / 资金费槽没有单独成卡，课文需指向 funding-oi 课。本图不能代替系统模板里的止损与仓位规则。本批不伪造真实行情窗。
