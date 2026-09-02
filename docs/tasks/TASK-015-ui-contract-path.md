# Agent Task

## Task ID
TASK-015

## Title
课程页增加合约数据层四步

## Owner
UI Agent

## Goal
在 `/course` 主路径八步之后增加合约数据层：open-interest → funding-rate → long-short-ratio → cvd。未发布「编写中」；发布后 `resolvePublishedPath` 点亮。`UPCOMING_INDICATOR_TITLES` 在四篇都纳入路径后可清空或删掉「即将推出」块。

## Scope
- `components/ui/courseMeta.ts`
- `pages/course.vue`
- `components/LessonIndexPage.vue`（即将推出）
- 中文标题：持仓量、资金费率、多空比、累计成交量差（CVD）
- `docs/tasks/HANDOFF-TASK-015.md`

不要手写未发布死链。不要 git commit / push。lint + typecheck 通过。

## Status
completed
