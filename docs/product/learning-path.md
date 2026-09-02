# 学习路径

面向零基础用户：先看懂单张图上的信息，再学多个指标对照，最后把观察写成可重复执行的规则。

本站只提供交易教育，不提供买卖信号、荐股、喊单或自动交易。学完任一阶段，都不意味着已经具备稳定交易的能力。

## 三阶段总览

```text
阶段 0  导学：认识本站、永续合约与风险
    ↓
阶段 1  指标：每一个指标在回答什么问题
    ↓
阶段 2  组合：多个维度何时互相支持、何时互相打架
    ↓
阶段 3  交易系统：环境 → 方向 → 进出场 → 仓位 → 复盘
```

建议顺序是产品约束，不是考试路线。用户可以跳读，但文章页必须标明先修；未完成先修时，用提示而不是拦截。

## 全局先修规则

1. **阶段 0 建议先于任何指标。** 至少读完风险说明，再进入 K 线。
2. **阶段 1 按「价格语言 → 均线 → 动能 → 量能 → 波动 → 合约持仓/资金」递进。** 先会读 K 线，再叠加计算指标。
3. **阶段 2 的每一篇，先修是该组合用到的全部指标。** 组合课不补讲指标公式。
4. **阶段 3 建议至少读完阶段 1 的 K 线、MA、EMA、RSI，以及阶段 2 的「趋势 + 动量」。** 系统课假设读者已经能看图，不再从零讲指标。
5. **术语页不占用主路径。** 需要查词时从正文链到 `/glossary`，查完回到原文。

`learning.prerequisites` 填写 slug；`learning.next` 填写建议下一篇 slug。顺序号 `order` 在同一 `part` 内递增，从 1 起。

---

## 阶段 0 — 导学

对应内容：`content/00-introduction/`  
对应页面：`/course`（无独立 `/introduction` 路由，见 [page-map.md](./page-map.md)）

| 顺序 | slug | 标题（产品名） | 先修 | 为什么这样排 |
|---|---|---|---|---|
| 0 | `introduction` | 怎么学这门课 | 无 | 先讲清三阶段、本站边界和「一篇只解决一个问题」，避免用户把目录当成指标清单去背。 |

导学正文必须包含、且靠前出现：

- 本站是教育站，不是信号或自动交易工具
- 永续合约风险较高；杠杆会放大亏损；存在爆仓可能
- 历史案例不能代表未来结果

Sprint 001 / 002 不把导学拆成多篇。若以后拆分「什么是 U 本位永续合约」「杠杆与爆仓」，再评估是否增加 `/course/[...slug]`。

---

## 阶段 1 — 常用指标

对应内容：`content/01-indicators/{slug}/`  
对应页面：`/indicators`、`/indicators/{slug}`  
`part: 1`，`category: indicators`

目标：理解每个指标在观察什么、常见误区、在什么市场环境里容易失效。  
不是：背参数、把金叉/超买写成买卖指令。

| order | slug | 标题 | 先修 | 建议下一篇 | 为什么这样排 |
|---|---|---|---|---|---|
| 1 | `kline` | K 线 | `introduction` | `ma` | 后面所有图都建立在 OHLC 上。不会读 K 线，指标只是另一组数字。 |
| 2 | `ma` | MA 移动平均线 | `kline` | `ema` | 均线是最直观的「价格平滑」。先建立「趋势过滤」直觉，再学更快的 EMA。 |
| 3 | `ema` | EMA 指数移动平均线 | `ma` | `rsi` | MACD、多数趋势组合都以 EMA 为构件。放在 MA 之后，只多讲「为什么对近价更敏感」。 |
| 4 | `rsi` | RSI 相对强弱指标 | `ema` | `volume` | 第一条振荡指标。0–100 刻度对零基础更友好。Sprint 002 的第一条动能课放在这里，而不是更复杂的 MACD。 |
| 5 | `volume` | Volume 成交量 | `kline` | `macd` | 量能是价格之外的第二个原始维度。放在第一条振荡指标之后，避免用户以为「指标=副图振荡器」。后续组合大量用到量。 |
| 6 | `macd` | MACD | `ema` | `kdj` | 由 EMA 派生，概念重（DIF / DEA / 柱）。放在 RSI 之后，降低一次学两套振荡器的负担。 |
| 7 | `kdj` | KDJ | `rsi` | `bollinger-bands` | 与 RSI 同属摆动类，适合对照「都在看动能，刻度和用法不同」。先修 RSI，避免和 MACD 挤在一起。 |
| 8 | `bollinger-bands` | 布林带 | `ma` | `open-interest` | 引入波动率。计算依赖均线，应在 MA 之后；放到振荡指标之后，作为「价格通道」新维度。 |
| 9 | `open-interest` | OI 持仓量 | `volume` | `funding-rate` | 从此进入合约特有数据。先有量能对照，再谈「仓位增减」，否则 OI 容易被读成成交量。 |
| 10 | `funding-rate` | 资金费率 | `open-interest` | `long-short-ratio` | 永续合约特有。和 OI 一起看拥挤与持仓成本，单独看费率容易过度解读。 |
| 11 | `long-short-ratio` | 多空比 | `open-interest` | `cvd` | 情绪/持仓结构。需要先理解「合约里有多空两边」，再看比值。 |
| 12 | `cvd` | CVD | `volume` | （阶段 2 第一篇） | 主动买卖累积，抽象度最高，放在量能与合约指标之后，作为阶段 1 收尾。 |

### 阶段 1 阅读分层

- **主路径（Sprint 002 必做教程）：** 导学 → K 线 → MA → EMA → RSI
- **主路径续（后续 Sprint）：** Volume → MACD → KDJ → 布林带
- **合约数据层：** OI → 资金费率 → 多空比 → CVD

用户学完 RSI 后，阶段 1 尚未结束。文章页「下一步」应写清：下一条主路径是 Volume；若只想先建立系统概念，可以预览阶段 3 目录，但先修仍指向未读指标。

现有 `content/01-indicators/rsi/index.md` 草稿：`order: 5`、`prerequisites: kline`、`next: macd`。以本文件为准，Content 修订时改为 `order: 4`，先修 `kline` + `ma` + `ema`，下一篇 `volume`。

---

## 阶段 2 — 指标组合

对应内容：`content/02-combinations/{slug}/`  
对应页面：`/combinations`、`/combinations/{slug}`  
`part: 2`，`category: combinations`

目标：练习「一个指标回答一个问题，组合用来对照，不是叠加信号」。  
一篇组合课对应一个**观察主题**，主题内可用 1–2 个具体配对作正反案例。不把每个配对都做成独立一级路由，以免目录比阶段 1 还长。

主题与策略文档对齐（`docs/strategy/combinations/`）：

| order | slug | 标题（主题） | 文内配对案例 | 先修指标 | 建议下一篇 | 为什么这样排 |
|---|---|---|---|---|---|---|
| 1 | `trend-momentum` | 趋势 + 动量 | EMA + RSI；EMA + MACD | `ema`、`rsi`；讲第二个案例时加 `macd` | `trend-volume` | 零基础最先遇到的冲突：均线仍向上，但 RSI 已高位。用已学的 EMA / RSI 开讲，MACD 案例可标「读完 MACD 再看本节」。 |
| 2 | `trend-volume` | 趋势 + 成交量 | 价格 + Volume；EMA + Volume | `kline`、`ema`、`volume` | `rsi-macd` | 先巩固「价和量是两个问题」，再进入两个振荡器对照。 |
| 3 | `rsi-macd` | RSI + MACD | RSI + MACD | `rsi`、`macd` | `price-oi` | 同属动能、算法不同。用来练习「两个副图一致或分歧时，只说明观察冲突，不自动给出方向」。 |
| 4 | `price-oi` | 价格 + OI | 价格 + OI | `kline`、`open-interest` | `oi-volume` | 进入合约持仓。先看价与仓，再加入量，降低三维一次教完的难度。 |
| 5 | `oi-volume` | OI + Volume | OI + Volume | `open-interest`、`volume` | `funding-oi` | 仓和量经常被当成同一个东西。单独成篇，专门拆开。 |
| 6 | `funding-oi` | Funding + OI | 资金费率 + OI | `funding-rate`、`open-interest` | `multi-indicator` | 讨论拥挤与持仓成本。放在 OI 两篇之后。 |
| 7 | `multi-indicator` | 多指标共振 | 从已学组合中取 3 个维度 | 阶段 2 前 6 篇建议读完 | 阶段 3 第一篇 | 收束：共振是「多个问题得到相近答案」，不是「条件越多越可靠」。必须写失效环境。 |

`docs/tasks/TODO.md` 里的「EMA + RSI」「Price + Volume」等是主题内案例，不是独立课程页。

Sprint 001 / 002 **不写**阶段 2 教程正文。列表页用「先学阶段 1」空状态。

---

## 阶段 3 — 建立交易系统

对应内容：`content/03-trading-system/{slug}/`  
对应页面：`/trading-system`、`/trading-system/{slug}`  
`part: 3`，`category: trading-system`

目标：把观察写成可重复的规则，并理解风险、仓位、日志和回测各自解决什么问题。  
不是：交付一套可跟单的策略，或证明某套规则能盈利。

建议先修（整阶段入口）：`kline`、`ma`、`ema`、`rsi`、`trend-momentum`。单篇另有先修时以表内为准。

| order | slug | 标题 | 先修 | 建议下一篇 | 为什么这样排 |
|---|---|---|---|---|---|
| 1 | `what-is-a-trading-system` | 什么是交易系统 | 阶段 3 入口先修 | `market-regime` | 先建立「理念 + 规则 + 记录」，打破「找一个准指标」的预期。覆盖 AGENTS.md 的「交易理念」。 |
| 2 | `market-regime` | 市场环境 | `what-is-a-trading-system` | `direction` | 同一指标在趋势和震荡里读法不同。先定环境，再谈方向。 |
| 3 | `direction` | 方向判断 | `market-regime` | `entry-rules` | 对应「趋势识别」。只回答多/空/不交易，不把入场细节混进来。 |
| 4 | `entry-rules` | 入场规则 | `direction` | `exit-rules` | 环境与方向之后，才写「满足哪些观察才允许开仓」。 |
| 5 | `exit-rules` | 出场规则 | `entry-rules` | `stop-loss` | 先有「何时离开」的框架，再拆止损和止盈两种出场。 |
| 6 | `stop-loss` | 止损 | `exit-rules` | `take-profit` | 永续合约有爆仓风险，止损必须早于止盈和加仓。 |
| 7 | `take-profit` | 止盈 | `stop-loss` | `position-sizing` | 与止损成对。强调目标是规则，不是「拿到最多」。 |
| 8 | `position-sizing` | 仓位管理 | `stop-loss` | `risk-management` | 仓位决定单笔亏损是否可承受。放在有止损定义之后。 |
| 9 | `risk-management` | 风险管理 | `position-sizing` | `trade-frequency` | 账户层：杠杆、保证金、连亏暂停、禁止交易条件。比单笔仓位更宽。 |
| 10 | `trade-frequency` | 交易频率 | `risk-management` | `trading-journal` | 频率影响手续费、滑点和情绪。放在风险规则之后，避免「有规则就高频」。 |
| 11 | `trading-journal` | 交易日志 | `what-is-a-trading-system` | `backtesting` | 没有记录就无法谈优化。可与回测并行阅读，建议先日志后回测。 |
| 12 | `backtesting` | 回测 | `trading-journal` | `statistics` | 回测是检验规则，不是寻找曲线最好的参数。 |
| 13 | `statistics` | 数据统计 | `backtesting` | `system-optimization` | 胜率只是其中一个数字；必须同时看回撤、盈亏比、样本数、成本。 |
| 14 | `system-optimization` | 系统优化 | `statistics` | `case-study` | 优化放在统计之后，并写过拟合风险。 |
| 15 | `case-study` | 完整交易系统案例 | 本阶段 1–14 | （回 `/course` 复习） | 用一份符合 `docs/strategy/system-template.md` 的教学案例收束。案例说明过程，不证明该系统有效。 |

Sprint 001 / 002 **不写**阶段 3 教程正文。列表页引导回阶段 1。

---

## 建议学习节奏（产品层）

零基础、每次 20–40 分钟：

1. 打开 `/`，读风险说明，进入 `/course`
2. 读导学，进入 K 线
3. 按阶段 1 主路径读完 RSI，再决定是继续 Volume，还是先复习已读四篇
4. 阶段 2、3 开放后，每次只选一篇组合或一篇系统规则，读完做「用自己的话复述本篇回答的问题」

不在产品层规定「几天学完」或「学完即可交易」。

## Front Matter 约定（给 Content / Nuxt）

与 `docs/architecture/content-model.md` 对齐，并补充：

| 字段 | 阶段 0 | 阶段 1 | 阶段 2 | 阶段 3 |
|---|---|---|---|---|
| `part` | `0`（建议写入 schema，见 IA） | `1` | `2` | `3` |
| `category` | `introduction` | `indicators` | `combinations` | `trading-system` |
| `level` | `beginner` | 默认 `beginner`；CVD 可用 `intermediate` | 默认 `intermediate` | 默认 `intermediate`；案例可用 `advanced` |
| `order` | `0` | 上表 1–12 | 上表 1–7 | 上表 1–15 |
| `slug` | 上表 | 上表 | 上表 | 上表 |
| `learning.prerequisites` | `[]` | slug 数组 | 指标 slug + 可选组合 slug | 系统篇 slug 和/或指标 slug |
| `learning.next` | `kline` | 上表 | 上表 | 上表 |

术语条目：`category: glossary`，不进入三阶段 `order` 主链。
