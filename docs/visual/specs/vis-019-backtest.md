---
id: vis-019
title: 回测不能只看胜率
type: schematic
purpose: 对照「只报胜率」与「一组数字一起看」。合格回测卡片必须同时看见交易次数、盈亏比、回撤、成本（手续费 / 资金费 / 滑点）。单独一个胜率格子不够。回测不是成绩单。不画权益曲线。
teaching_question: 用户看完应理解：胜率只是其中一格。没有次数、盈亏比、回撤和成本，展示不合格。回测检查规则在这段样本里的样子，不证明以后会赚钱。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 只报胜率
    meaning: 不合格展示；一格填满、其余空着，不是回测卡片
  - label: 交易次数
    meaning: 有多少笔符合规则的交易，不是看了多少年 K 线
  - label: 盈亏比
    meaning: 赢的那笔平均有多大，相对亏的那笔；没有它无法谈期望
  - label: 回撤
    meaning: 从权益高点下来多少；描述生存体验，不是期末收益
  - label: 成本
    meaning: 永续至少分开写手续费、资金费、滑点；漏计会高估短周期规则
  - label: 胜率
    meaning: 只描述有多少笔结算为正；既不能单独夸规则，也不能单独否规则
  - label: 虚构算术
    meaning: 高胜率也可以粗算更差；数字用来打破「胜率高就是好规则」，不是策略成绩
status: delivered
asset: /images/concept/vis-019-backtest.svg
---

# vis-019 回测不能只看胜率

## 教学说明

与 `docs/strategy/backtest.md`、`docs/strategy/system-template.md` 第 11 节对齐。

核心命题必须出现在图内：**单独一个胜率格子不够。回测不是成绩单。**

左卡是反例：只点亮「胜率」，次数、盈亏比、回撤、成本空着。右卡是检查清单：四格并列，成本条写明手续费 / 资金费 / 滑点。胜率在右卡里降为其中一格，不是标题成绩。

下方对照 A / B 是虚构算术：胜率更高也可以因为小赢大亏而粗算更差。未计成本。加上成本后两边都可能变号。不能外推为哪套规则能赚钱。

本图不画权益曲线，也不比较「优化前后更赚钱」。课文继续引用 vis-008 讲整条系统流程。本图只回答「回测卡片要一起看哪些格子」。

## Content / UI 引用

```md
![回测不能只看胜率示意图](/images/concept/vis-019-backtest.svg)
```

## 局限

示意图不展开 Profit Factor、连亏长度、样本内外分段、未来函数。合格卡片在策略文档里还有更多字段；本图只强制看见次数、盈亏比、回撤、成本，并否定只看胜率。本批不伪造真实行情或回测成绩。
