# Agent Task

## Task ID
TASK-023

## Title
课程页增加阶段 3 系统路径

## Owner
UI Agent

## Goal
在 `/course` 指标组合之后增加交易系统路径。未发布「编写中」；发布后 `resolvePublishedPath` 点亮。系统目录有正文后不再只显示空状态。

## Scope
- `components/ui/courseMeta.ts`
- `pages/course.vue`
- `components/LessonIndexPage.vue`
- `pages/trading-system/index.vue`
- 如需：`components/ui/README.md`

## Out of Scope
- 改 `content/`
- git commit / push
- 不改路由

## 要求
`SYSTEM_PATH_SLUGS` 写全 15 个（后七步本轮未发布，只标编写中）：

```text
what-is-a-trading-system → market-regime → direction → entry-rules → exit-rules → stop-loss → take-profit → position-sizing → risk-management → trade-frequency → trading-journal → backtesting → statistics → system-optimization → case-study
```

- 标题已在 `PLANNED_TITLES`。补 `NEXT_REASONS`。
- `/course` 三阶段地图不要再说「阶段 3 正文还没写」。可写「后半（回测 / 案例）仍在编写」。
- `/trading-system` 有 published 时走 `LessonList`；SEO 不再写「正文尚未开放」。
- 导语：把观察写成可检查的规则，不是跟单策略。
- 未发布仍走 `resolvePublishedPath`，不生成死链。

## Acceptance Criteria
- [x] `/course` 可见系统路径
- [x] 未发布只标编写中
- [x] 发布后可点 `/trading-system/{slug}`
- [x] 后七步未发布无死链

## Status
completed
