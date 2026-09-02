# Agent Task

## Task ID
TASK-019

## Title
课程页增加阶段 2 组合七步

## Owner
UI Agent

## Goal
在 `/course` 合约数据层之后增加指标组合路径。未发布「编写中」；发布后 `resolvePublishedPath` 点亮。组合目录有正文后不再只显示空状态。

## Scope
- `components/ui/courseMeta.ts`
- `pages/course.vue`
- `components/LessonIndexPage.vue`
- `pages/combinations/index.vue`（SEO / 导语）
- 如需：`components/ui/README.md`

## Out of Scope
- 改 `content/`
- 阶段 3 路径
- git commit / push

## 要求
`COMBINATION_PATH_SLUGS`：

```text
trend-momentum → trend-volume → rsi-macd → price-oi → oi-volume → funding-oi → multi-indicator
```

- 标题已在 `PLANNED_TITLES`。补 `NEXT_REASONS`。
- `toSteps` 取标题时不要只查 `category: indicators`，组合课要用 `combinations` 或全量 published。
- `/course` 三阶段地图不要再说「阶段 2 正文还没写」。阶段 3 仍未写。
- `/combinations` 有 published 时走 `LessonList`；空状态文案保留给零篇时。
- 导语：组合用来对照，不构成交易信号。
- 未发布仍走 `resolvePublishedPath`，不生成 `/combinations/{slug}` 死链。
- 不改路由。

## Acceptance Criteria
- [x] `/course` 可见组合七步
- [x] 未发布只标编写中
- [x] 发布后可点 `/combinations/{slug}`
- [x] 阶段 3 仍引导回怎么学

## Status
completed
