---
id: vis-020
title: 交易系统案例是作业纸
type: schematic
purpose: 把完整案例画成填好的作业纸格子：环境 → 方向 → 进出场 → 仓位 → 复盘。页内徽章写明「教学样本 · 不证明有效 · 不是跟单对象」。填完格子不等于系统有效。
teaching_question: 用户看完应理解：案例是写法样本，用来练习怎么把规则写进格子。它不证明这套写法有效，也不是跟单对象。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 环境
    meaning: 先分趋势 / 震荡 / 看不清；看不清则空仓，不进入方向
  - label: 方向
    meaning: 偏多 / 偏空 / 空仓；未确立则不做；方向不是下单指令
  - label: 进出场
    meaning: 先写计划止损，再写止盈与其他离场；止损不是强平线
  - label: 仓位
    meaning: 由单笔风险上限和止损距离反推；杠杆只占保证金；不鼓励高杠杆
  - label: 复盘
    meaning: 先问有没有遵守规则，再问规则要不要改；一次盈亏不够改系统
  - label: 教学样本徽章
    meaning: 不证明有效，不是跟单对象
status: delivered
asset: /images/concept/vis-020-case-study.svg
---

# vis-020 交易系统案例是作业纸

## 教学说明

与 `docs/strategy/system-template.md` 对齐：模板是作业纸，不是已经验证过的策略，也不提供交易信号。

核心命题必须出现在图内：**案例是填好的作业纸。教学样本 · 不证明有效 · 不是跟单对象。**

五格按填写顺序排成一条链路，每格标记「已填」，内容只示范写法：

1. 环境未定则空仓
2. 方向未确立则不做
3. 止损先于止盈
4. 仓位由风险反推，不鼓励高杠杆
5. 复盘先查执行，再谈改规则

名称写成「过程写法样本」，避免被读成系统品牌或收益承诺。课文继续引用 vis-008 讲整条系统流程；环境细节见 vis-017，止损与强平见 vis-018。本图只回答「完整案例长什么样：一张填好的作业纸」。

## Content / UI 引用

```md
![交易系统案例是作业纸示意图](/images/concept/vis-020-case-study.svg)
```

## 局限

示意图不展开 12 节模板的每一栏，也不填具体品种、周期或参数。格子里的句子是教学占位，不是可执行规则。本批不伪造真实行情，不画权益曲线，不证明任何案例能赚钱。
