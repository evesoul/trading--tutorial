# HANDOFF — TASK-019

Owner: UI Agent  
Status: completed

## 完成内容

在 `/course` 合约数据层之后增加独立一节「指标组合」。没有做成交易信号或喊单入口，没有改 `content/` 或路由。

- `COMBINATION_PATH_SLUGS`：`trend-momentum` → `trend-volume` → `rsi-macd` → `price-oi` → `oi-volume` → `funding-oi` → `multi-indicator`
- 每一步仍走 `resolvePublishedPath`；`path` 为 `null` 时 `PathSteps` 只显示「编写中」，不生成 `/combinations/{slug}` 死链
- `PLANNED_TITLES` 已有中文名；`NEXT_REASONS` 补七条排序理由
- `toSteps` 取标题改为全量 published，不再只查 `category: indicators`
- `/course` 三阶段地图不再写「阶段 2 正文还没写」；阶段 3 仍未写
- `/combinations` 导语：阶段 2 用来对照多个指标，不构成交易信号；有 published 时走现有 `LessonList`，空状态只留给零篇
- SEO：`/course` 提到组合路径；`/combinations` 不再写「正文尚未开放」

## 修改文件

- `components/ui/courseMeta.ts`
- `pages/course.vue`
- `components/LessonIndexPage.vue`
- `pages/combinations/index.vue`
- `components/ui/README.md`
- `docs/tasks/TASK-019-ui-combination-path.md`（Status → review）
- `docs/tasks/HANDOFF-TASK-019.md`（本文件）

未改：`content/`、`composables/`、`docs/knowledge/`、`docs/product/`、`docs/strategy/`。未做 git commit / push。未改路由。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `/course` HTML | 三段路径齐全；组合 1–4 已发布可点，5–7 只标「编写中」且无 `/combinations/{slug}` 死链 |
| `/combinations` HTML | 有 published 时出列表，SEO / 导语不再写「正文尚未开放」 |

Content 已先发布部分组合课（验证时看到 trend-momentum / trend-volume / rsi-macd / price-oi）。其余三步仍只标「编写中」。发布后 `resolvePublishedPath` 会自动点亮，无需再改 UI slug。

## 已知问题

1. `/combinations` 零篇时仍走空状态（回指标目录），有 published 后才出列表。
2. 阶段 3 路径本任务未做。
3. 课文正文里的「下一篇组合编写中」仍由 Content 维护，本任务未改。

## 下一步建议

- QA：核对 `/course` 三段路径、未发布无死链、`/combinations` 有文时不被空状态挡住
- Content：组合七篇发布后，指标组合路径应自动可点
