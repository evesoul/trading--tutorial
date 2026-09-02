# HANDOFF — TASK-011

Owner: UI Agent  
Status: review

## 完成内容

把课程页推荐主路径从四篇扩到八篇（到布林带）。没有做成交易终端，没有改 `content/` 或 composable 的 `published` 过滤。

- `MAIN_PATH_SLUGS`：`kline` → `ma` → `ema` → `rsi` → `volume` → `macd` → `kdj` → `bollinger-bands`
- 每一步仍走 `resolvePublishedPath`；`path` 为 `null` 时 `PathSteps` 只显示「编写中」，不生成 `/indicators/volume` 等死链
- `UPCOMING_INDICATOR_TITLES` 只留合约层：Open Interest、Funding Rate、Long/Short Ratio、CVD
- `PLANNED_TITLES` 补中文：成交量、MACD、KDJ、布林带
- `NEXT_REASONS` 补 volume / macd / kdj / bollinger-bands
- `/course` 与指标目录导语改为八篇路径文案

## 修改文件

- `components/ui/courseMeta.ts`
- `pages/course.vue`
- `components/LessonIndexPage.vue`
- `docs/tasks/TASK-011-ui-extend-path.md`（Status → review）
- `docs/tasks/HANDOFF-TASK-011.md`（本文件）

未改：`content/`、`composables/`、`docs/knowledge/`、`docs/product/`、`docs/strategy/`。未做 git commit / push。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |

现阶段已发布：K 线、MA、EMA、RSI。成交量、MACD、KDJ、布林带未发布，主路径上只标「编写中」。Content 发布后 `resolvePublishedPath` 会自动点亮，无需再改 UI slug。

## 已知问题

1. 指标目录的「后续指标」不再列出成交量 / MACD / KDJ / 布林带；这四篇只出现在 `/course` 主路径。未发布时读者从目录页看不到它们的「编写中」条目。
2. 课文正文里的「下一篇 Volume 编写中」仍由 Content 维护，本任务未改。

## 下一步建议

- QA（TASK-012）：核对 `/course` 八步、未发布无死链、`/indicators` 即将推出只剩四项合约层
- Content：Volume → MACD → KDJ → 布林带发布后，主路径应自动可点
