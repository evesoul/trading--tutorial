# HANDOFF — TASK-023

Owner: UI Agent  
Status: completed

## 完成内容

在 `/course` 指标组合之后增加独立一节「交易系统」。没有做成跟单策略或喊单入口，没有改 `content/` 或路由。

- `SYSTEM_PATH_SLUGS`：`what-is-a-trading-system` → `market-regime` → `direction` → `entry-rules` → `exit-rules` → `stop-loss` → `take-profit` → `position-sizing` → `risk-management` → `trade-frequency` → `trading-journal` → `backtesting` → `statistics` → `system-optimization` → `case-study`
- 每一步仍走 `resolvePublishedPath`；`path` 为 `null` 时 `PathSteps` 只显示「编写中」，不生成 `/trading-system/{slug}` 死链
- `PLANNED_TITLES` 已有中文名；`NEXT_REASONS` 补十五条排序理由
- `toSteps` 继续用全量 published 取标题
- `/course` 三阶段地图不再写「阶段 3 正文还没写」；可写后半（回测 / 案例）仍在编写
- `/trading-system` 导语：把观察写成可检查的规则，不是跟单策略；有 published 时走现有 `LessonList`，空状态只留给零篇
- SEO：`/course` 提到系统路径；`/trading-system` 不再写「正文尚未开放」

## 修改文件

- `components/ui/courseMeta.ts`
- `pages/course.vue`
- `components/LessonIndexPage.vue`
- `pages/trading-system/index.vue`
- `components/ui/README.md`
- `docs/tasks/TASK-023-ui-system-path.md`（Status → review）
- `docs/tasks/HANDOFF-TASK-023.md`（本文件）

未改：`content/`、`composables/`、`docs/knowledge/`、`docs/product/`、`docs/strategy/`。未做 git commit / push。未改路由。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `/course` HTML | 四段路径齐全；三阶段地图写「后半（回测 / 案例）仍在编写」，不再写「阶段 3 的正文还没写」 |
| `/trading-system` HTML | 有 published 时出列表，SEO / 导语不再写「正文尚未开放」 |
| 未发布链接 | 后半与其余未发布步只标「编写中」，无 `href="/trading-system/{slug}"`；直接打开未发布 slug 走文章空状态，不 404 |

验证时 Content 已开始发布前半（当时看到 what-is-a-trading-system / market-regime / direction / entry-rules 可点）。其余步只标「编写中」。发布后 `resolvePublishedPath` 会自动点亮，无需再改 UI slug。

## 已知问题

1. `/trading-system` 零篇时仍走空状态（回怎么学），有 published 后才出列表。
2. 导学正文里若仍写「阶段 3 的正文还没写」，属 `content/`，本任务未改。
3. 未跑 `npm run build`。

## 下一步建议

- QA：核对 `/course` 四段路径、未发布无死链、`/trading-system` 有文时不被空状态挡住
- Content：阶段 3 前八篇发齐后，系统路径前半应全部可点；后七步继续只标编写中
