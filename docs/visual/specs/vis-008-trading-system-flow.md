---
id: vis-008
title: 交易系统流程
type: flow
purpose: 把交易系统拆成可检查的步骤：环境、规则、仓位、止损止盈、日志、复盘，并给出「不交易」出口。
teaching_question: 用户看完应理解：交易系统是一组事先写好的规则与风险约束，而不是临时看图下单；不满足规则就应该不交易。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 矩形步骤
    meaning: 需要完成的动作
  - label: 菱形判断
    meaning: 是 / 否的规则检查
  - label: 不交易
    meaning: 规则不满足时的默认动作
  - label: 单笔风险
    meaning: 仓位由亏损上限反推，而不是先想赚多少
  - label: 复盘与回测
    meaning: 用记录改进规则，不保证下一笔更好
status: delivered
asset: /images/flow/vis-008-trading-system-flow.svg
---

# vis-008 交易系统流程

## 教学说明

流程对齐 `docs/strategy/system-template.md`：理念 → 环境 → 方向 → 入场 → 仓位 → 止损止盈 → 执行 → 出场 → 日志 → 复盘。图中没有「盈利」终点。

配文应强调：这是教育用的检查清单，不是可自动跟单的策略。

## Content / UI 引用

```md
![交易系统流程示意图](/images/flow/vis-008-trading-system-flow.svg)
```

## 局限

本图不包含具体入场公式。完整系统案例需要 Strategy + 真实行情，本批不画。
