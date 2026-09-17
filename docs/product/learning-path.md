# 学习路径

面向零基础用户：先看懂单张图上的信息，再学多个指标对照，最后把观察写成可重复执行的规则，并补上成交、成本与执行。

本站只提供交易教育，不提供买卖信号、荐股、喊单或自动交易。学完任一阶段，都不意味着已经具备稳定交易的能力。

升级总纲见 [curriculum-upgrade.md](./curriculum-upgrade.md)。本文件是课序、slug、先修的唯一来源。

## 四阶段总览

```text
阶段 0  导学：认识本站、永续合约、屏幕字段与风险
    ↓
阶段 1  指标：价格语言 → 手画结构 → 均线 → 动能 → 量能 → 波动尺子 → 合约数据
    ↓
阶段 2  组合：多个维度何时互相支持、何时互相打架
    ↓
阶段 3  交易系统：环境 → 多周期 → 方向 → 订单 → 进出场 → 成本 → 热度 → 复盘
    ↓
阶段 4  威科夫与量价（选修）：四阶段 → 事件 → 量价 → 永续过滤器
```

建议顺序是产品约束，不是考试路线。用户可以跳读，但文章页必须标明先修；未完成先修时，用提示而不是拦截。

## 全局先修规则

1. **阶段 0 建议先于任何指标。** 至少读完风险说明和「交易所屏幕」，再进入 K 线。
2. **阶段 1 按「价格语言 → 手画区域 → 摆动结构 → 均线 → 动能一把尺 → 量能 → 波动尺子 → 通道 → 合约持仓/资金」递进。** 先会读 K 线，再连高低点，再读结构，再叠加计算指标。
3. **KDJ 是对照层，不进主路径。** 不新开第四个振荡器，不新开 KDJ+RSI。
4. **阶段 2 的每一篇，先修是该组合用到的全部指标。** 组合课不补讲指标公式。
5. **阶段 3 建议至少读完** `kline`、`market-structure`、`atr`、`ema`、`rsi`、`trend-momentum`。系统课假设读者已经能看图。入场篇建议先读 `order-types`。
6. **术语页不占用主路径。** 需要查词时从正文链到 `/glossary`，查完回到原文。
7. **阶段 4 是选修读图模块。** 建议至少读完 `kline`、`market-structure`、`volume`、`funding-rate`、`liquidation-cascade`、`multi-timeframe`、`position-sizing`。不替代阶段 3，不新开第四个振荡器，不把 Spring / SOS / UTAD / SOW 写成买卖指令。

`learning.prerequisites` 填写 slug；`learning.next` 填写建议下一篇 slug。顺序号 `order` 在同一 `part` 内递增。阶段 0 的 `introduction` 为 `order: 0`。

---

## 阶段 0 — 导学

对应内容：`content/00-introduction/`  
对应页面：`/course`（枢纽）、`/course/{slug}`（其余导学篇）

| 顺序 | slug | 标题（产品名） | 先修 | 建议下一篇 | 为什么这样排 |
|---|---|---|---|---|---|
| 0 | `introduction` | 怎么学这门课 | 无 | `perp-screen` | 先讲清四阶段、本站边界和「一篇只解决一个问题」。 |
| 1 | `perp-screen` | 交易所屏幕上有什么 | `introduction` | `kline` | 会认权益、标记价、强平、资金费倒计时，再去读 K 线。 |

`introduction` 映射到 `/course`，不建 `/introduction`。  
`perp-screen` 映射到 `/course/perp-screen`。

导学枢纽正文必须包含、且靠前出现：

- 本站是教育站，不是信号或自动交易工具
- 永续合约风险较高；杠杆会放大亏损；存在爆仓可能
- 历史案例不能代表未来结果
- 学完规则仍要过成交、成本与执行；学完不等于会交易

---

## 阶段 1 — 常用指标

对应内容：`content/01-indicators/{slug}/`  
对应页面：`/indicators`、`/indicators/{slug}`  
`part: 1`，`category: indicators`

目标：理解每个工具在观察什么、常见误区、在什么市场环境里容易失效。  
不是：背参数、把金叉/超买写成买卖指令。

| order | slug | 标题 | 先修 | 建议下一篇 | 层 | 为什么这样排 |
|---|---|---|---|---|---|---|
| 1 | `kline` | K 线 | `introduction`、`perp-screen` | `trendlines` | 主路径 | 后面所有图都建立在 OHLC 上。 |
| 2 | `trendlines` | 趋势线与支撑阻力 | `kline` | `market-structure` | 主路径 | 先手连区域，再读摆动结构。 |
| 3 | `market-structure` | 摆动结构与假突破 | `kline`、`trendlines` | `ma` | 主路径 | 默认读图顺序：结构先于均线。 |
| 4 | `ma` | MA 移动平均线 | `kline`、`trendlines`、`market-structure` | `ema` | 主路径 | 手画结构之后，再学算法平滑。 |
| 5 | `ema` | EMA 指数移动平均线 | `ma` | `rsi` | 主路径 | 只多讲「为什么对近价更敏感」。 |
| 6 | `rsi` | RSI 相对强弱指标 | `ema` | `volume` | 主路径 | 主路径只保留一把 0–100 动能尺。 |
| 7 | `volume` | Volume 成交量 | `kline` | `atr` | 主路径 | 价格之外的第二个原始维度。 |
| 8 | `atr` | ATR 与波动 | `kline`、`volume` | `bollinger-bands` | 主路径 | 先有尺子量噪声，再看通道。 |
| 9 | `bollinger-bands` | 布林带 | `ma`、`atr` | `macd` | 主路径 | 通道式波动，对照 ATR。 |
| 10 | `macd` | MACD | `ema` | `kdj` | 主路径续 | 组合课先修；放在 RSI 与 ATR 之后。 |
| 11 | `kdj` | KDJ | `rsi` | `open-interest` | 对照层 | 与 RSI 对照刻度，不进主路径，不扩写。 |
| 12 | `open-interest` | OI 持仓量 | `volume` | `funding-rate` | 合约层 | 先有量能对照，再谈仓位增减。 |
| 13 | `funding-rate` | 资金费率 | `open-interest` | `long-short-ratio` | 合约层 | 和 OI 一起看拥挤与持仓成本。 |
| 14 | `long-short-ratio` | 多空比 | `open-interest` | `cvd` | 合约层 | 先理解多空两边，再看比值。 |
| 15 | `cvd` | CVD | `volume` | `liquidation-cascade` | 合约层 | 主动买卖累积，抽象度高。 |
| 16 | `liquidation-cascade` | 清算瀑布怎么读图 | `volume`、`open-interest`、`cvd` | `trend-momentum` | 合约层 | 收束：瀑布里量 / OI / CVD 暂时不可信。 |

### 阶段 1 阅读分层

- **主路径：** 导学 → 屏幕 → K 线 → 趋势线 → 摆动结构 → MA → EMA → RSI → Volume → ATR → 布林带
- **主路径续：** MACD（阶段 2 先修）
- **对照层：** KDJ
- **合约数据层：** OI → 资金费率 → 多空比 → CVD → 清算瀑布

文章页「下一步」按上表。用户读完 RSI 后，主路径下一篇是 Volume，不是 MACD。

---

## 阶段 2 — 指标组合

对应内容：`content/02-combinations/{slug}/`  
对应页面：`/combinations`、`/combinations/{slug}`  
`part: 2`，`category: combinations`

目标：练习「一个指标回答一个问题，组合用来对照，不是叠加信号」。  
不新开振荡器配对课。`rsi-macd` 保留，用来示范「两把尺问同一问题」。

| order | slug | 标题（主题） | 文内配对案例 | 先修指标 | 建议下一篇 | 为什么这样排 |
|---|---|---|---|---|---|---|
| 1 | `trend-momentum` | 趋势 + 动量 | EMA + RSI；EMA + MACD | `ema`、`rsi`；讲第二个案例时加 `macd` | `trend-volume` | 零基础最先遇到的冲突：均线仍向上，但 RSI 已高位。 |
| 2 | `trend-volume` | 趋势 + 成交量 | 价格 + Volume；EMA + Volume | `kline`、`ema`、`volume` | `rsi-macd` | 先巩固「价和量是两个问题」。 |
| 3 | `rsi-macd` | RSI + MACD | RSI + MACD | `rsi`、`macd` | `price-oi` | 同属动能。冲突时回结构，不要再加 KDJ。 |
| 4 | `price-oi` | 价格 + OI | 价格 + OI | `kline`、`open-interest` | `oi-volume` | 先看价与仓。 |
| 5 | `oi-volume` | OI + Volume | OI + Volume | `open-interest`、`volume` | `funding-oi` | 仓和量经常被当成同一个东西。 |
| 6 | `funding-oi` | Funding + OI | 资金费率 + OI | `funding-rate`、`open-interest` | `multi-indicator` | 拥挤与持有成本。 |
| 7 | `multi-indicator` | 多指标共振 | 从已学组合中取 3 个维度 | 阶段 2 前 6 篇建议读完 | 阶段 3 第一篇 | 共振不是「条件越多越可靠」。 |

---

## 阶段 3 — 建立交易系统

对应内容：`content/03-trading-system/{slug}/`  
对应页面：`/trading-system`、`/trading-system/{slug}`  
`part: 3`，`category: trading-system`

目标：把观察写成可重复的规则，并理解订单、成本、热度、日志和回测各自解决什么问题。  
不是：交付一套可跟单的策略，或证明某套规则能盈利。

建议先修（整阶段入口）：`kline`、`market-structure`、`atr`、`ema`、`rsi`、`trend-momentum`。单篇另有先修时以表内为准。

| order | slug | 标题 | 先修 | 建议下一篇 | 为什么这样排 |
|---|---|---|---|---|---|
| 1 | `what-is-a-trading-system` | 什么是交易系统 | 阶段 3 入口先修 | `market-regime` | 先建立「理念 + 规则 + 记录」。 |
| 2 | `market-regime` | 市场环境 | `what-is-a-trading-system` | `multi-timeframe` | 先定环境，再拆周期。 |
| 3 | `multi-timeframe` | 多周期 | `market-regime` | `direction` | 高周期定场，低周期触发；打架则空仓。 |
| 4 | `direction` | 方向判断 | `multi-timeframe` | `order-types` | 只回答多/空/不交易。 |
| 5 | `order-types` | 订单与成交 | `direction`、`perp-screen` | `entry-rules` | 规则必须能变成可能成交的单。 |
| 6 | `entry-rules` | 入场规则 | `direction`、`order-types` | `exit-rules` | 前提 + 触发；未成交视为未入场。 |
| 7 | `exit-rules` | 出场规则 | `entry-rules` | `stop-loss` | 止损、止盈、时间、失效四门。 |
| 8 | `stop-loss` | 止损 | `exit-rules` | `take-profit` | 认错位置；止损 ≠ 强平。 |
| 9 | `take-profit` | 止盈 | `stop-loss` | `position-sizing` | 目标是规则，不是拿到最多。 |
| 10 | `position-sizing` | 仓位管理 | `stop-loss`、`atr` | `cost-vs-r` | 由亏损上限和距离反推。 |
| 11 | `cost-vs-r` | 成本对照 R | `position-sizing`、`funding-rate` | `risk-management` | 手续费、资金费、滑点先垫掉几个 R。 |
| 12 | `risk-management` | 风险管理 | `cost-vs-r` | `account-heat` | 账户刹车与禁止条件。 |
| 13 | `account-heat` | 账户热度与相关 | `risk-management` | `trade-frequency` | 同向 / BTC 因子如何加总。 |
| 14 | `trade-frequency` | 交易频率 | `account-heat` | `execution-bias` | 频率影响手续费、滑点和情绪。 |
| 15 | `execution-bias` | 执行偏差 | `trade-frequency` | `trading-journal` | 盘中手会改规则，事先写动作。 |
| 16 | `trading-journal` | 交易日志 | `what-is-a-trading-system`、`execution-bias` | `backtesting` | 没有记录就无法谈优化。 |
| 17 | `backtesting` | 回测 | `trading-journal` | `statistics` | 检验规则，含样本外与成本。 |
| 18 | `statistics` | 数据统计 | `backtesting` | `system-optimization` | 胜率只是其中一个数字。 |
| 19 | `system-optimization` | 系统优化 | `statistics` | `case-study` | 优化放在统计之后，并写过拟合。 |
| 20 | `case-study` | 完整交易系统案例 | 本阶段 1–19 | （回 `/course` 复习；可进阶段 4） | 作业纸 + 执行时间线，不证明有效。`learning.next` 保持空，避免旧课测试把选修模块写成阶段 3 必经下一篇。 |

---

## 阶段 4 — 威科夫与量价（选修）

对应内容：`content/04-wyckoff/{slug}/`  
对应页面：`/wyckoff`、`/wyckoff/{slug}`  
`part: 4`，`category: wyckoff`

目标：把股票教材里的威科夫四阶段，改写成永续图上的观察顺序：先定阶段，再用事件和量价对照，最后用插针、费率、清算做过滤器。  
不是：交付可跟单的威科夫策略，或证明某次 Spring / SOS 之后价格会沿同一方向走。

来源：合并自独立文档库 `trading-up/docs`（第 0–12 章 + 附录）。第 0 章与本站已有的屏幕、仓位课重叠处，改为链回，不重开第二套公式。

建议先修（整阶段入口）：`kline`、`market-structure`、`volume`、`atr`、`open-interest`、`funding-rate`、`liquidation-cascade`、`multi-timeframe`、`position-sizing`。单篇另有先修时以表内为准。

| order | slug | 标题 | 先修 | 建议下一篇 | 为什么这样排 |
|---|---|---|---|---|---|
| 1 | `wyckoff-on-perps` | 威科夫怎么用在永续 | 阶段 4 入口先修 | `accumulation-spring` | 先讲永续和股票教材差在哪，再谈四阶段。 |
| 2 | `accumulation-spring` | 吸筹与 Spring | `wyckoff-on-perps` | `markup-sos` | 四阶段从底部区间开始。 |
| 3 | `markup-sos` | 拉升：SOS 与 BUEC | `accumulation-spring` | `distribution-utad` | 离开区间之后，主观察回踩。 |
| 4 | `distribution-utad` | 派发：UTAD 与 LPSY | `markup-sos` | `markdown-sow` | 吸筹的镜像。 |
| 5 | `markdown-sow` | 下跌：SOW | `distribution-utad` | `event-variants` | 破位看收盘，恐慌量先停止。 |
| 6 | `event-variants` | 关键事件变形 | 本阶段 2–5 | `effort-result` | 标准件之后再谈残次品。 |
| 7 | `effort-result` | 努力与结果 | `event-variants`、`volume` | `wyckoff-mtf` | 事件告诉你在哪，量价问有没有人认真做。 |
| 8 | `wyckoff-mtf` | 多周期怎么对阶段 | `effort-result`、`multi-timeframe` | `wyckoff-process` | 日线定阶段，短周期不推翻。 |
| 9 | `wyckoff-process` | 完整读图流程 | `wyckoff-mtf`、`position-sizing` | `perp-filters` | 把零件装成一格可检查的计划。 |
| 10 | `perp-filters` | 永续特有过滤器 | `wyckoff-process`、`funding-rate`、`liquidation-cascade` | `wyckoff-cases` | 插针、费率、清算用来否决。 |
| 11 | `wyckoff-cases` | 综合案例复盘 | `perp-filters` | `wyckoff-system` | 用三段历史走完读图，不填成绩。 |
| 12 | `wyckoff-system` | 把阶段写成系统 | `wyckoff-cases`、`what-is-a-trading-system` | `wyckoff-checklist` | 只留少数规则，一次只改一件事。 |
| 13 | `wyckoff-checklist` | 检查清单与自评 | `wyckoff-system` | （回 `/course`） | 过程分，不是盈亏总分。 |

---

## 建议学习节奏（产品层）

零基础、每次 20–40 分钟：

1. 打开 `/`，读风险说明，进入 `/course`
2. 读导学，读交易所屏幕，进入 K 线
3. 按阶段 1 主路径读到布林带；需要组合先修时再读 MACD
4. 合约数据层读到清算瀑布，再进阶段 2
5. 阶段 2、3 每次只选一篇；读完用自己的话复述本篇回答的问题
6. 阶段 3 案例之后，若要学四阶段读图，再进 `/wyckoff`；跳读可以，但先修提示仍在

不在产品层规定「几天学完」或「学完即可交易」。

## Front Matter 约定（给 Content / Nuxt）

与 `docs/architecture/content-model.md` 对齐，并补充：

| 字段 | 阶段 0 | 阶段 1 | 阶段 2 | 阶段 3 | 阶段 4 |
|---|---|---|---|---|---|
| `part` | `0` | `1` | `2` | `3` | `4` |
| `category` | `introduction` | `indicators` | `combinations` | `trading-system` | `wyckoff` |
| `level` | `beginner` | 默认 `beginner`；CVD、清算瀑布、ATR 可用 `intermediate` | 默认 `intermediate` | 默认 `intermediate`；案例可用 `advanced` | 默认 `intermediate`；案例与清单可用 `advanced` |
| `order` | 上表 0–1 | 上表 1–16 | 上表 1–7 | 上表 1–20 | 上表 1–13 |
| `slug` | 上表 | 上表 | 上表 | 上表 | 上表 |
| `learning.prerequisites` | `[]` 或 `introduction` | slug 数组 | 指标 slug + 可选组合 slug | 系统篇 slug 和/或指标 slug | 威科夫 slug + 指标 / 系统 slug |
| `learning.next` | 上表 | 上表 | 上表 | 上表 | 上表 |

路径拼接：

```text
category: introduction + slug introduction → /course
category: introduction + 其他 slug         → /course/{slug}
category: indicators                       → /indicators/{slug}
category: combinations                     → /combinations/{slug}
category: trading-system                   → /trading-system/{slug}
category: wyckoff                          → /wyckoff/{slug}
category: glossary                         → /glossary#{slug}
```

术语条目：`category: glossary`，不进入四阶段 `order` 主链。
