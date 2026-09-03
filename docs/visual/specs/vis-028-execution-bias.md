---
id: vis-028
title: 执行偏差：偏差 → 日志 → 事先动作
type: schematic
purpose: 用表格式三列列出常见执行偏差、对应日志字段、以及事先写死的动作。
teaching_question: 用户看完应理解：偏差要记进日志，并且触发后只能走预先写好的动作（空仓、只平不开、或复盘）；不要现场灵活处理。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 偏差
    meaning: 已经偏离事先规则的行为，不是性格标签
  - label: 日志字段
    meaning: 事后能检查的一格，例如是否追价、止损是否被改远
  - label: 事先动作
    meaning: 触发后只能走这句；不要写灵活处理
  - label: 切周期
    meaning: 盘中换更能讲通的周期，视为换系统、停机
status: delivered
asset: /images/concept/vis-028-execution-bias.svg
---

# vis-028 执行偏差

## 教学说明

与 `docs/strategy/risk-management.md` 执行偏差表、`docs/product/curriculum-upgrade.md` 第 3.9 节对齐。七行都是「偏差 → 日志字段 → 事先动作」，不是鸡汤海报。

正例：错过一笔后按句子空仓，漏掉和守规则可以同时发生。反例：刚错过就市价追，再把止损收到「亏一点没关系」。

## Content / UI 引用

```md
![执行偏差：偏差、日志、事先动作示意图](/images/concept/vis-028-execution-bias.svg)
```

## 局限

日志字段名是教学用检查格，学习者应写进自己的模板第 10 节，不要抄成标准问卷。本图不教冥想或成功学，也不承诺守规则后收益更高。
