# Agent Task

## Task ID
TASK-012

## Title
Sprint 003 质量终审

## Owner
QA Agent

## Goal
审主路径续四篇、术语表、新示意图、课程八步导航。三项均 PASS 才能 APPROVE。

## Scope
- `tests/`（可扩展链接脚本）
- `docs/qa/`

## Out of Scope
- 大改课文或 UI；小断链记 Issues
- git commit / push

## 必查
- [x] `npm run lint` `typecheck` `build`
- [x] Volume / MACD / KDJ / 布林带：结构、术语、正反案例、无违禁词
- [x] 图：vis-003 / vis-005 / vis-009 / vis-010 存在，alt 含「示意图」；KDJ 图无「K 线」当线名
- [x] 链接：RSI → Volume 可点；布林带不链 `/indicators/open-interest`；HANDOFF 不进 `/glossary` 已发布列表
- [x] `/course` 八步：已发布可点，OI 等仍编写中
- [x] Desktop + Mobile 抽查（浏览器或 CDP）；MCP 不可用时 Visual 不得只靠 curl PASS

## Output
- [x] `docs/qa/QA-RESULT-SPRINT-003.md`
- [x] TASK-012 Status → review

Code / Content / Visual 三项 PASS。Recommendation: APPROVE。

## Status
completed
