# 页面路由清单

路由与 `docs/architecture/project.md` 对齐。Sprint 009 起新增 `/course/[...slug]`，其余一级路径不改名。  
课序以 [learning-path.md](./learning-path.md) 为准。升级总纲见 [curriculum-upgrade.md](./curriculum-upgrade.md)。

## 静态路由

| 路径 | 页面名称 | 主要内容来源 | 主 CTA | 空 / 未就绪 |
|---|---|---|---|---|
| `/` | 首页 | 页面模板 + 查询已发布课程卡 | 去 `/course` | 无指标文时 CTA 改为「查看怎么学」 |
| `/course` | 怎么学（学习路径） | `content/00-introduction/index.md` + 三阶段配置 | 去 `/course/perp-screen` 或 `/indicators/kline` | 导学缺失时仍展示三阶段地图 |
| `/indicators` | 指标目录 | `part: 1` 文章列表 | 推荐卡 → `/indicators/kline` | 无 published 时说明「第一批教程准备中」 |
| `/combinations` | 组合目录 | `part: 2` 文章列表 | 有文则进第一篇；否则回 `/indicators` | MVP 默认空状态 |
| `/trading-system` | 交易系统目录 | `part: 3` 文章列表 | 有文则进第一篇；否则回 `/course` | MVP 默认空状态 |
| `/wyckoff` | 威科夫与量价目录 | `part: 4` 文章列表 | 有文则进第一篇；否则回 `/course` | 空状态说明先读指标与系统 |
| `/glossary` | 术语 | `content/glossary/` | 返回上一页或 `/course` | 无词条时展示「术语表建设中」+ 链到导学 |

## 动态路由

| 路径 | 匹配内容 | URL 示例 | 404 行为 |
|---|---|---|---|
| `/course/[...slug]` | `content/00-introduction/**` 且 slug ≠ `introduction` | `/course/perp-screen` | 未知 slug → 404，回 `/course` |
| `/indicators/[...slug]` | `content/01-indicators/**` | `/indicators/kline`、`/indicators/atr` | 未知 slug → 404，提供回 `/indicators` |
| `/combinations/[...slug]` | `content/02-combinations/**` | `/combinations/trend-momentum` | 同上，回 `/combinations` |
| `/trading-system/[...slug]` | `content/03-trading-system/**` | `/trading-system/what-is-a-trading-system` | 同上，回 `/trading-system` |
| `/wyckoff/[...slug]` | `content/04-wyckoff/**` | `/wyckoff/wyckoff-on-perps` | 同上，回 `/wyckoff` |

`[...slug]` 预留给以后的嵌套（例如 `trend-momentum/ema-rsi`）。MVP 只用单段 slug。

没有这些路由（有意不建）：

- `/introduction`、`/intro`
- `/glossary/[slug]`
- `/search`、`/account`、`/signals`、`/trade`

## 阶段 0 文章路由

| 顺序 | 路径 | slug | 说明 |
|---|---|---|---|
| 0 | `/course` | `introduction` | 枢纽；不建 `/introduction` |
| 1 | `/course/perp-screen` | `perp-screen` | Sprint 011 正文 |

## 阶段 1 文章路由

| 顺序 | 路径 | slug | 层 |
|---|---|---|---|
| 1 | `/indicators/kline` | `kline` | 主路径 |
| 2 | `/indicators/trendlines` | `trendlines` | 主路径 |
| 3 | `/indicators/market-structure` | `market-structure` | 主路径（Sprint 010） |
| 4 | `/indicators/ma` | `ma` | 主路径 |
| 5 | `/indicators/ema` | `ema` | 主路径 |
| 6 | `/indicators/rsi` | `rsi` | 主路径 |
| 7 | `/indicators/volume` | `volume` | 主路径 |
| 8 | `/indicators/atr` | `atr` | 主路径（Sprint 010） |
| 9 | `/indicators/bollinger-bands` | `bollinger-bands` | 主路径 |
| 10 | `/indicators/macd` | `macd` | 主路径续 |
| 11 | `/indicators/kdj` | `kdj` | 对照层 |
| 12 | `/indicators/open-interest` | `open-interest` | 合约层 |
| 13 | `/indicators/funding-rate` | `funding-rate` | 合约层 |
| 14 | `/indicators/long-short-ratio` | `long-short-ratio` | 合约层 |
| 15 | `/indicators/cvd` | `cvd` | 合约层 |
| 16 | `/indicators/liquidation-cascade` | `liquidation-cascade` | 合约层（Sprint 011） |

Nuxt 在文件存在前不应注册死链。目录页对未发布项显示「编写中」，不要输出 404 链接。

## 阶段 2 文章路由

| 顺序 | 路径 | slug |
|---|---|---|
| 1 | `/combinations/trend-momentum` | `trend-momentum` |
| 2 | `/combinations/trend-volume` | `trend-volume` |
| 3 | `/combinations/rsi-macd` | `rsi-macd` |
| 4 | `/combinations/price-oi` | `price-oi` |
| 5 | `/combinations/oi-volume` | `oi-volume` |
| 6 | `/combinations/funding-oi` | `funding-oi` |
| 7 | `/combinations/multi-indicator` | `multi-indicator` |

## 阶段 3 文章路由

| 顺序 | 路径 | slug | 备注 |
|---|---|---|---|
| 1 | `/trading-system/what-is-a-trading-system` | `what-is-a-trading-system` | 已发布，Sprint 012 修订 |
| 2 | `/trading-system/market-regime` | `market-regime` | 已发布，Sprint 012 修订 |
| 3 | `/trading-system/multi-timeframe` | `multi-timeframe` | Sprint 012 新课 |
| 4 | `/trading-system/direction` | `direction` | 已发布，Sprint 012 修订 |
| 5 | `/trading-system/order-types` | `order-types` | Sprint 011 新课 |
| 6 | `/trading-system/entry-rules` | `entry-rules` | 已发布，Sprint 012 修订 |
| 7 | `/trading-system/exit-rules` | `exit-rules` | 已发布，Sprint 012 修订 |
| 8 | `/trading-system/stop-loss` | `stop-loss` | 已发布，Sprint 012 修订 |
| 9 | `/trading-system/take-profit` | `take-profit` | 已发布，Sprint 012 修订 |
| 10 | `/trading-system/position-sizing` | `position-sizing` | 已发布，Sprint 012 修订 |
| 11 | `/trading-system/cost-vs-r` | `cost-vs-r` | Sprint 011 新课 |
| 12 | `/trading-system/risk-management` | `risk-management` | 已发布，Sprint 012 修订 |
| 13 | `/trading-system/account-heat` | `account-heat` | Sprint 012 新课 |
| 14 | `/trading-system/trade-frequency` | `trade-frequency` | 已发布，Sprint 012 修订 |
| 15 | `/trading-system/execution-bias` | `execution-bias` | Sprint 012 新课 |
| 16 | `/trading-system/trading-journal` | `trading-journal` | 已发布，Sprint 012 修订 |
| 17 | `/trading-system/backtesting` | `backtesting` | 已发布，Sprint 012 修订 |
| 18 | `/trading-system/statistics` | `statistics` | 已发布，Sprint 012 修订 |
| 19 | `/trading-system/system-optimization` | `system-optimization` | 已发布，Sprint 012 修订 |
| 20 | `/trading-system/case-study` | `case-study` | 已发布，Sprint 012 补时间线 |

## 阶段 4 文章路由

| 顺序 | 路径 | slug |
|---|---|---|
| 1 | `/wyckoff/wyckoff-on-perps` | `wyckoff-on-perps` |
| 2 | `/wyckoff/accumulation-spring` | `accumulation-spring` |
| 3 | `/wyckoff/markup-sos` | `markup-sos` |
| 4 | `/wyckoff/distribution-utad` | `distribution-utad` |
| 5 | `/wyckoff/markdown-sow` | `markdown-sow` |
| 6 | `/wyckoff/event-variants` | `event-variants` |
| 7 | `/wyckoff/effort-result` | `effort-result` |
| 8 | `/wyckoff/wyckoff-mtf` | `wyckoff-mtf` |
| 9 | `/wyckoff/wyckoff-process` | `wyckoff-process` |
| 10 | `/wyckoff/perp-filters` | `perp-filters` |
| 11 | `/wyckoff/wyckoff-cases` | `wyckoff-cases` |
| 12 | `/wyckoff/wyckoff-system` | `wyckoff-system` |
| 13 | `/wyckoff/wyckoff-checklist` | `wyckoff-checklist` |

## 查询约定（给 Nuxt）

`composables/useCourse`（或等价）至少支持：

- 按 `part` / `category` / `order` 取列表
- 按 `slug` 取一篇
- 解析 `learning.prerequisites`、`learning.next` 为站内路径
- 只把 `status: published` 当作可导航（`draft` 不进上一篇/下一篇，除非本地预览模式）

路径拼接：

```text
category: indicators      → /indicators/{slug}
category: combinations    → /combinations/{slug}
category: trading-system  → /trading-system/{slug}
category: wyckoff         → /wyckoff/{slug}
category: introduction + slug introduction → /course
category: introduction + 其他 slug         → /course/{slug}
category: glossary        → /glossary#{slug}
```

取导学枢纽必须 `slug === 'introduction'`，不能只按 `category === 'introduction'`。

## 修订备案

Sprint 009 批准 `/course/[...slug]`。`docs/architecture/project.md` 由 Nuxt TASK-038 补一行，不改其余一级路径。
