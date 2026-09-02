# HANDOFF — TASK-015

Owner: UI Agent  
Status: review

## 完成内容

在 `/course` 主路径八步之后增加独立一节「合约数据层」。没有做成交易终端，没有改 `content/` 或 composable 的 `published` 过滤。

- `CONTRACT_PATH_SLUGS`：`open-interest` → `funding-rate` → `long-short-ratio` → `cvd`
- 每一步仍走 `resolvePublishedPath`；`path` 为 `null` 时 `PathSteps` 只显示「编写中」，不生成 `/indicators/open-interest` 等死链
- `PLANNED_TITLES` 中文：持仓量、资金费率、多空比、累计成交量差
- `NEXT_REASONS` 补 open-interest / funding-rate / long-short-ratio / cvd
- `/course` 单独一节说明：先有量，再看仓、费率、结构、主动净额
- 指标目录去掉「即将推出」块（四项已进路径）；导语补上合约数据层顺序
- `PathSteps` 增加 `label`，合约节显示「合约数据层 1–4」

## 修改文件

- `components/ui/courseMeta.ts`
- `pages/course.vue`
- `components/LessonIndexPage.vue`
- `components/ui/PathSteps.vue`
- `components/ui/README.md`
- `docs/tasks/TASK-015-ui-contract-path.md`（Status → review）
- `docs/tasks/HANDOFF-TASK-015.md`（本文件）

未改：`content/`、`composables/`、`docs/knowledge/`、`docs/product/`、`docs/strategy/`。未做 git commit / push。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |

现阶段合约数据层四篇尚未发布，`/course` 上只标「编写中」。Content 发布后 `resolvePublishedPath` 会自动点亮，无需再改 UI slug。

## 已知问题

1. 指标目录不再用「即将推出」列出持仓量 / 资金费率 / 多空比 / CVD；未发布时读者从 `/indicators` 看不到这四篇的「编写中」条目，只在导语和 `/course` 合约数据层看到顺序。
2. 课文正文里的「下一篇 OI 编写中」仍由 Content 维护，本任务未改。

## 下一步建议

- QA：核对 `/course` 两段路径、未发布无死链、`/indicators` 不再出现即将推出块
- Content：持仓量 → 资金费率 → 多空比 → CVD 发布后，合约数据层应自动可点
