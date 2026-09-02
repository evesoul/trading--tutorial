# Agent Task

## Task ID
TASK-022

## Title
阶段 3 前半示意图

## Owner
Visual Agent

## Goal
补两张教学示意图。不要重画 vis-008，课文会继续引用它。禁止伪造真实行情或权益曲线。

## Scope
- `docs/visual/`
- `public/images/concept/`

## Out of Scope
- 改 `content/`
- 采集 vis-101–107
- git commit / push

## Output
- `docs/visual/specs/vis-017-market-regime.md` + `public/images/concept/vis-017-market-regime.svg`
- `docs/visual/specs/vis-018-stop-loss.md` + `public/images/concept/vis-018-stop-loss.svg`
- 更新 `docs/visual/README.md` 索引
- `docs/visual/HANDOFF-SPRINT-006.md`

每张图：示意图徽章 + 页脚「教学抽象几何 · 非真实行情 · 不构成交易建议」。

## 教学点
- vis-017：同一抽象价格，三格对照——趋势、震荡、看不清。环境未定时默认不交易。不是突破必涨。
- vis-018：计划止损、账户强平、目标止盈三条线分开。止损先于止盈；止损不是强平线。禁止画累计收益证明「有止损就能活」。

## Acceptance Criteria
- [x] 两张 SVG 图内有「示意图」与「非真实行情」
- [x] vis-018 区分止损与强平
- [x] spec 字段齐全，README 可检索
- [x] 未重画 vis-008，无虚假盈利图

## Status
review
