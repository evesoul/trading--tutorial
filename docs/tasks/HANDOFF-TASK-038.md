# HANDOFF — TASK-038

Owner: Nuxt Agent + UI Agent  
Status: completed

## 完成内容

课程壳、路由和目录跟上 `docs/product/learning-path.md`。没有写课文，没有改 `content/` 正文，没有加买卖按钮或交易终端。

- `getLessonPath('introduction', 'introduction')` → `/course`；其余 introduction slug → `/course/{slug}`；`resolvePublishedPath` 走同一规则
- 新增 `pages/course/[...slug].vue`（枢纽改到 `pages/course/index.vue`，避免 `course.vue` 变成嵌套布局）；未知 slug 或 `/course/introduction` 回 `/course`
- `/course` 枢纽按 `slug === 'introduction'` 取值；增加阶段 0（introduction、perp-screen）；主路径含摆动结构与 ATR，不含 KDJ；合约层加清算瀑布；系统层二十步；未发布只标编写中
- 推荐起点：`perp-screen` 已发布则先它，否则仍从 K 线，按钮文案跟着变
- `courseMeta.ts` 补齐 `STAGE0_PATH_SLUGS`、`MAIN_PATH_CONTINUE_SLUGS`、`CONTRAST_PATH_SLUGS`、`PLANNED_TITLES`、`NEXT_REASONS`；怎么学导航 `match: 'prefix'`，`/course/perp-screen` 高亮「怎么学」
- 指标目录：主路径置顶，MACD 标主路径续，KDJ 标对照层，合约层含清算瀑布编写中
- `docs/architecture/project.md` 补 `/course/[...slug]`

## 修改文件

- `composables/useCourse.ts`
- `components/ui/courseMeta.ts`
- `components/ui/README.md`
- `components/LessonIndexPage.vue`
- `pages/course.vue`（改为 `pages/course/index.vue`）
- `pages/course/[...slug].vue`（新建）
- `pages/indicators/index.vue`
- `pages/trading-system/index.vue`
- `docs/architecture/project.md`
- `tests/check-sprint007-links.mjs`
- `tests/check-sprint007-visual.mjs`
- `tests/check-task-038-shell.mjs`（新建）
- `docs/tasks/TASK-038-ui-upgrade-shell.md`
- `docs/tasks/HANDOFF-TASK-038.md`（本文件）
- `docs/tasks/TODO.md`

未改：`content/` 正文、`docs/product/`、`docs/knowledge/`、`docs/strategy/`。未做 git commit / push。订单课未加买卖按钮。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过 |
| `node tests/check-task-038-shell.mjs` | 通过 |

## 已知问题

1. 预览时 `perp-screen`、`liquidation-cascade`、`order-types`、`cost-vs-r` 已 published，课程壳已点亮；`multi-timeframe`、`account-heat`、`execution-bias` 仍标编写中、无死链。
2. 旧 sprint 004–006 视觉脚本仍按当时课序抽查，不是本轮验收命令；007 的 `/course` 断言已改到新课序。
3. 导学正文若仍写「十五篇」，属 `content/`，本任务未改。

## 下一步建议

- QA（TASK-039）：桌面 + 移动走通导学 → 屏幕（或编写中）→ K 线 → 结构 → ATR → 合约层 → 系统二十步；核无死链、KDJ 不在主路径、订单课无买卖按钮
