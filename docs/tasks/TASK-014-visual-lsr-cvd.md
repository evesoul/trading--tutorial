# Agent Task

## Task ID
TASK-014

## Title
多空比与 CVD 示意图

## Owner
Visual Agent

## Goal
为多空比、CVD 补示意图。OI / Funding 已有 vis-006 / vis-007，不要重画。禁止伪造行情。

## Scope
- `docs/visual/`
- `public/images/concept/`

## Output
- vis-011 多空比：必须标口径（例如账户数比），不是「市场多空」
- vis-012 CVD：累计主动买卖差，与成交量柱区分
- 更新 README
- `docs/visual/HANDOFF-SPRINT-004.md`

图内「示意图」徽章 + 非真实行情页脚。不是买卖信号。

## Acceptance Criteria
- [x] 两张 SVG 图内有「示意图」与「非真实行情」
- [x] vis-011 标出口径，并写明不是「市场多空」
- [x] vis-012 区分成交量柱与 CVD
- [x] spec 字段齐全，README 可检索
- [x] 未重画 vis-006 / vis-007，无虚假盈利图

## Status
completed
