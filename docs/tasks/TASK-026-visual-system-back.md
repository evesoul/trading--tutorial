# Agent Task

## Task ID
TASK-026

## Title
阶段 3 后半示意图

## Owner
Visual Agent

## Goal
补两张教学示意图。禁止权益曲线比较「优化前后更赚钱」。不要重画 vis-008。

## Scope
- `docs/visual/`
- `public/images/concept/`

## Out of Scope
- 改 `content/`
- 采集 vis-101–107
- git commit / push

## Output
- `docs/visual/specs/vis-019-backtest.md` + `public/images/concept/vis-019-backtest.svg`
- `docs/visual/specs/vis-020-case-study.md` + `public/images/concept/vis-020-case-study.svg`
- 更新 `docs/visual/README.md`
- `docs/visual/HANDOFF-SPRINT-007.md`

## 教学点
- vis-019：回测要同时看见交易次数、盈亏比、回撤、成本（手续费 / 资金费 / 滑点）。单独一个胜率格子不够。不是成绩单。
- vis-020：案例是填好的作业纸（环境 → 方向 → 进出场 → 仓位 → 复盘），页脚写明「教学样本 · 不证明有效 · 不是跟单对象」。

每张：示意图徽章 + 「教学抽象几何 · 非真实行情 · 不构成交易建议」。

## Acceptance Criteria
- [ ] 两张 SVG 有「示意图」与「非真实行情」
- [ ] vis-019 否定只看胜率
- [ ] vis-020 否定跟单 / 证明盈利
- [ ] 无虚假权益曲线

## Status
in-progress
