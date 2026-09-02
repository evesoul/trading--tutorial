# Agent Task

## Task ID
TASK-006

## Title
主路径教程：导学 + K 线 / MA / EMA / RSI

## Owner
Content Agent

## Goal
把 Knowledge 转写成零基础可学完的第一条路径：`/course` → K 线 → MA → EMA → RSI。

## Scope
- `content/00-introduction/`
- `content/01-indicators/kline/`
- `content/01-indicators/ma/`
- `content/01-indicators/ema/`
- `content/01-indicators/rsi/`

## Out of Scope
- 阶段 2 / 3 正文
- Volume / MACD 及之后的指标教程
- `docs/knowledge/` 定义（只引用，不改）
- Nuxt / UI 代码
- 伪造真实行情图

## Input
- `AGENTS.md`、`.cursor/rules/content.mdc`、`.cursor/rules/trading.mdc`
- `docs/prompts/content-agent.md`
- `docs/product/learning-path.md`
- `docs/product/HANDOFF.md` 中 Content 小节
- `docs/knowledge/README.md`、`glossary.md`、`perpetual-futures.md`
- `docs/knowledge/indicators/kline.md` `ma.md` `ema.md` `rsi.md`
- Visual TASK-005 已完成，引用约定见 `docs/visual/README.md`：
  - `/images/concept/vis-001-kline-ohlc.svg`（kline）
  - `/images/concept/vis-002-ema-trend.svg`（ema；MA 课可只用文字或注明暂无独立 SMA 图）
  - `/images/concept/vis-004-rsi-zones.svg`（rsi）
  - Front Matter 写 `visual.charts: [vis-001]` 等；`vis-101`–`vis-107` 只在正文写「稍后对照实盘」，不要插假图
- 现有 `content/00-introduction/index.md`、`content/01-indicators/rsi/index.md`

## Output
五篇 Markdown，Front Matter 对齐 content-model 与 learning-path：

| 路径 | slug | part | category | order | status | prerequisites | next |
|---|---|---|---|---|---|---|---|
| `content/00-introduction/index.md` | `introduction` | 0 | introduction | 0 | published | — | `kline` |
| `content/01-indicators/kline/index.md` | `kline` | 1 | indicators | 1 | published | `introduction` | `ma` |
| `content/01-indicators/ma/index.md` | `ma` | 1 | indicators | 2 | published | `kline` | `ema` |
| `content/01-indicators/ema/index.md` | `ema` | 1 | indicators | 3 | published | `ma` | `rsi` |
| `content/01-indicators/rsi/index.md` | `rsi` | 1 | indicators | 4 | published | `kline` `ma` `ema` | `volume`（Volume 未发布：文末写「下一篇 Volume 编写中，先回 /course」；front matter 仍可写 `volume`） |

每篇结构：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 案例（正反）→ 常见错误 → 局限性 → 总结 → 下一步。

导学必须含：三阶段地图、教育站边界、杠杆/强平/历史≠未来。定义跟 `perpetual-futures.md`。

## Acceptance Criteria
- [x] 面向零基础，术语首次出现有解释
- [x] 无违禁措辞，金叉/超买/背离不是开仓指令
- [x] RSI 草稿 order/先修/next 已按学习路径修订
- [x] 内部链接不指向未发布 404（Volume 用文字说明）
- [x] 引用示意图须标明「示意图」；无真实行情则不开 real-chart
- [x] Front Matter 完整
- [x] `content/HANDOFF.md` 或本任务 HANDOFF

## Status
completed
