---
id: vis-018
title: 止损与强平区分
type: schematic
purpose: 在同一条抽象价格轴上分开计划止损、账户强平、目标止盈三条线。止损先于止盈。止损不是强平线。不画收益曲线。
teaching_question: 用户看完应理解：止损是事先写的认错价，强平是保证金耗尽后的强制离场。先写止损，再写止盈，再核对强平是否更远。有止损不能证明能活下来。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 入场价
    meaning: 教学示意位置，不是推荐开仓价
  - label: 目标止盈
    meaning: 对了如何减仓或全平；后于止损再写
  - label: 计划止损
    meaning: 判断错了在哪里退出；先写，用来反推仓位
  - label: 账户强平
    meaning: 保证金不足以维持仓位时，交易所强制减仓或平仓；口语「爆仓」即强平
  - label: 缓冲
    meaning: 计划止损应落在强平之前；没有这段距离，真实离场是强平
status: delivered
asset: /images/concept/vis-018-stop-loss.svg
---

# vis-018 止损与强平区分

## 教学说明

与 `docs/strategy/system-template.md` 第 7、8 节，以及 `docs/strategy/risk-management.md`、`docs/knowledge/perpetual-futures.md` 对齐。

核心命题必须出现在图内：**止损不是强平线。止损先于止盈。**

本图以多头为例画三条水平线，空头上下对调、关系不变。价格轴是教学几何，不是某品种行情。禁止画累计收益或权益曲线，也不用这段几何证明「有止损就能活」。

强平是机制结果，不是技术指标信号。杠杆越高，强平通常越近。本站不鼓励高杠杆。若预估强平比计划止损更近，纸上的止损没有定义真实风险。

课文继续引用 vis-008 讲整条系统流程。本图只回答「止损、强平、止盈为什么不能画成一条线」。

## Content / UI 引用

```md
![止损与强平区分示意图](/images/concept/vis-018-stop-loss.svg)
```

## 局限

示意图不展开维持保证金公式、标记价、逐仓 / 全仓差异、滑点与插针。强平价是估算值，会随仓位、模式、资金费变化。本批不伪造真实行情，也不画回测权益曲线。
