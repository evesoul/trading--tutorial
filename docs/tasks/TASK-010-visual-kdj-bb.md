# Agent Task

## Task ID
TASK-010

## Title
KDJ 与布林带示意图

## Owner
Visual Agent

## Goal
为 Sprint 003 两篇新课补教学示意图。禁止伪造真实行情。

## Scope
- `docs/visual/`
- `public/images/concept/`

## Out of Scope
- 改 `content/`
- 采集 vis-101–107
- git commit / push

## Output
- `docs/visual/specs/vis-009-kdj.md` + `public/images/concept/vis-009-kdj.svg`
- `docs/visual/specs/vis-010-bollinger-bands.md` + `public/images/concept/vis-010-bollinger-bands.svg`
- 更新 `docs/visual/README.md` 索引
- `docs/visual/HANDOFF-SPRINT-003.md`

每张图：id / title / type=schematic / purpose / teaching_question / 示意图徽章 / 页脚「教学抽象 · 非真实行情」。

KDJ：K 值 / D 值 / J 值（不要写成「K 线」）、超买超卖观察区，不是买卖信号。  
布林带：中轨 SMA(20) + 上下轨、开口 / 收口，不是突破必涨。

## Acceptance Criteria
- [x] 两张 SVG 图内有「示意图」
- [x] spec 字段齐全
- [x] README 可检索
- [x] 无虚假盈利图

## Status
completed
