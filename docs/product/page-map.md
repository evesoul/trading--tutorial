# 页面路由清单

路由与 `docs/architecture/project.md` 对齐。Sprint 001 / 002 **不新增、不删除、不改名**下列路径。

## 静态路由

| 路径 | 页面名称 | 主要内容来源 | 主 CTA | 空 / 未就绪 |
|---|---|---|---|---|
| `/` | 首页 | 页面模板 + 查询已发布课程卡 | 去 `/course` | 无指标文时 CTA 改为「查看怎么学」 |
| `/course` | 怎么学（学习路径） | `content/00-introduction/` + 三阶段配置 | 去 `/indicators/kline` 或 `/indicators` | 导学缺失时仍展示三阶段地图 |
| `/indicators` | 指标目录 | `part: 1` 文章列表 | 推荐卡 → `/indicators/kline` | 无 published 时说明「第一批教程准备中」 |
| `/combinations` | 组合目录 | `part: 2` 文章列表 | 有文则进第一篇；否则回 `/indicators` | MVP 默认空状态 |
| `/trading-system` | 交易系统目录 | `part: 3` 文章列表 | 有文则进第一篇；否则回 `/course` | MVP 默认空状态 |
| `/glossary` | 术语 | `content/glossary/` | 返回上一页或 `/course` | 无词条时展示「术语表建设中」+ 链到导学 |

## 动态路由

| 路径 | 匹配内容 | URL 示例 | 404 行为 |
|---|---|---|---|
| `/indicators/[...slug]` | `content/01-indicators/**` | `/indicators/kline`、`/indicators/rsi` | 未知 slug → 404，提供回 `/indicators` |
| `/combinations/[...slug]` | `content/02-combinations/**` | `/combinations/trend-momentum` | 同上，回 `/combinations` |
| `/trading-system/[...slug]` | `content/03-trading-system/**` | `/trading-system/what-is-a-trading-system` | 同上，回 `/trading-system` |

`[...slug]` 预留给以后的嵌套（例如 `trend-momentum/ema-rsi`）。MVP 只用单段 slug。

没有这些路由（有意不建）：

- `/introduction`、`/intro`
- `/course/[...slug]`
- `/glossary/[slug]`
- `/search`、`/account`、`/signals`、`/trade`

## 阶段 1 文章路由

| 顺序 | 路径 | slug | Sprint 002 正文 |
|---|---|---|---|
| 1 | `/indicators/kline` | `kline` | 是 |
| 2 | `/indicators/ma` | `ma` | 是 |
| 3 | `/indicators/ema` | `ema` | 是 |
| 4 | `/indicators/rsi` | `rsi` | 是（已有草稿） |
| 5 | `/indicators/volume` | `volume` | 否 |
| 6 | `/indicators/macd` | `macd` | 否 |
| 7 | `/indicators/kdj` | `kdj` | 否 |
| 8 | `/indicators/bollinger-bands` | `bollinger-bands` | 否 |
| 9 | `/indicators/open-interest` | `open-interest` | 否 |
| 10 | `/indicators/funding-rate` | `funding-rate` | 否 |
| 11 | `/indicators/long-short-ratio` | `long-short-ratio` | 否 |
| 12 | `/indicators/cvd` | `cvd` | 否 |

Nuxt 在文件存在前不应注册死链。目录页对未发布项显示「编写中」，不要输出 404 链接。

## 阶段 2 文章路由（框架，非 MVP 正文）

| 顺序 | 路径 | slug |
|---|---|---|
| 1 | `/combinations/trend-momentum` | `trend-momentum` |
| 2 | `/combinations/trend-volume` | `trend-volume` |
| 3 | `/combinations/rsi-macd` | `rsi-macd` |
| 4 | `/combinations/price-oi` | `price-oi` |
| 5 | `/combinations/oi-volume` | `oi-volume` |
| 6 | `/combinations/funding-oi` | `funding-oi` |
| 7 | `/combinations/multi-indicator` | `multi-indicator` |

## 阶段 3 文章路由（框架，非 MVP 正文）

| 顺序 | 路径 | slug |
|---|---|---|
| 1 | `/trading-system/what-is-a-trading-system` | `what-is-a-trading-system` |
| 2 | `/trading-system/market-regime` | `market-regime` |
| 3 | `/trading-system/direction` | `direction` |
| 4 | `/trading-system/entry-rules` | `entry-rules` |
| 5 | `/trading-system/exit-rules` | `exit-rules` |
| 6 | `/trading-system/stop-loss` | `stop-loss` |
| 7 | `/trading-system/take-profit` | `take-profit` |
| 8 | `/trading-system/position-sizing` | `position-sizing` |
| 9 | `/trading-system/risk-management` | `risk-management` |
| 10 | `/trading-system/trade-frequency` | `trade-frequency` |
| 11 | `/trading-system/trading-journal` | `trading-journal` |
| 12 | `/trading-system/backtesting` | `backtesting` |
| 13 | `/trading-system/statistics` | `statistics` |
| 14 | `/trading-system/system-optimization` | `system-optimization` |
| 15 | `/trading-system/case-study` | `case-study` |

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
category: introduction    → /course
category: glossary        → /glossary#{slug}
```

## 修订备案（不对齐本期实现）

若未来导学拆多篇，再增加 `/course/[...slug]`，并改 `introduction → /course` 的映射。  
本期明确：**不修订** `docs/architecture/project.md` 的路由表。
