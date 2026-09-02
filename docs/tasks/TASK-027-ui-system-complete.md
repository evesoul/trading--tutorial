# Agent Task

## Task ID
TASK-027

## Title
课程页去掉「阶段 3 后半仍在编写」

## Owner
UI Agent

## Goal
阶段 3 十五步已在 `/course`。本轮只改文案：后半发布后不再写「仍在编写」。未发布仍走 `resolvePublishedPath`。

## Scope
- `pages/course.vue`
- `components/LessonIndexPage.vue`（如仍写后半未开放）
- 如需：`docs/tasks/HANDOFF-TASK-027.md`

## Out of Scope
- 改 `content/`
- 改 slug 列表
- git commit / push

## 要求
- 三阶段地图与「交易系统」导语：不要再说后半（回测 / 案例）仍在编写。
- 可写：案例是教学作业纸，不是跟单策略。
- 未发布仍只标编写中。
- lint / typecheck。

## Acceptance Criteria
- [x] `/course` 不再写阶段 3 后半未写
- [x] 十五步仍在
- [x] 未发布无死链

## Status
completed
