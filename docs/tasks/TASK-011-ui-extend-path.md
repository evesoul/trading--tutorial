# Agent Task

## Task ID
TASK-011

## Title
课程页主路径扩到布林带

## Owner
UI Agent

## Goal
`MAIN_PATH_SLUGS` 扩到 Volume → MACD → KDJ → 布林带。未发布显示「编写中」；发布后 `resolvePublishedPath` 自动点亮。指标目录的「即将推出」列表去掉已纳入主路径的四项。

## Scope
- `components/ui/courseMeta.ts`
- `pages/course.vue`（若写死四步）
- `components/LessonIndexPage.vue`（UPCOMING 列表）
- 必要时 `docs/tasks/HANDOFF-TASK-011.md`

## Out of Scope
- 改 composable 过滤逻辑
- 改课文正文
- git commit / push

## Acceptance Criteria
- [x] 主路径 slug：kline ma ema rsi volume macd kdj bollinger-bands
- [x] 未发布不生成 404 链接
- [x] UPCOMING 只剩合约层：OI / Funding / LSR / CVD
- [x] lint / typecheck 通过
- [x] NEXT_REASONS 补 volume / macd / kdj / bollinger-bands

## Status
completed
