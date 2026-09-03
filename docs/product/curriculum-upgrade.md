# 教程全量升级方案（TASK-031）

把已发布的三阶段课，从「会想」补到「能做」：波动尺子、结构读法、下单与成交、持有成本、组合风险、执行偏差。

本文件是升级总纲。课序、slug、先修以 [learning-path.md](./learning-path.md) 为准。路由以 [page-map.md](./page-map.md) 为准。

本站仍是教育站，不是信号、荐股、喊单、自动交易或交易终端。禁止：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利。

## 1. 为什么升级

已发布课文在思维框架上已经接近专业交易：观察不是指令、环境先于方向、止损先于仓位、止损不是强平、资金费是成本。

缺口在实盘决策链的中后段。读者学完仍可能：

- 说不清这根影线算不算普通噪声
- 不会把摆动结构当成默认读图顺序
- 不知道止损单挂在最新价还是标记价
- 不会把手续费、资金费、滑点换算成 R
- 把清算瀑布里的巨量、CVD 急变读成「主力方向」
- 多开几个山寨以为已经分散
- 连亏时改规则，而不是走事先写好的刹车

升级原则：

1. **不再加第四个振荡器。** 不新开 KDJ+RSI。KDJ 降为对照层，不扩写。
2. **一篇一个问题。** 新课不把订单、ATR、结构、心理塞进同一篇。
3. **旧课以修订为主，能不改 slug 就不改。** 已发布 URL 保持稳定。
4. **先知识与策略，再课文与图，再 UI，再 QA。** 见第 6 节 Sprint。
5. **案例可以给执行时间线，不可以给可跟单策略或成绩单。**

## 2. 课表增减总览

### 2.1 新建（9 篇）

| slug | 阶段 | 路径 | 回答的问题 |
|---|---|---|---|
| `perp-screen` | 0 | `/course/perp-screen` | 交易所屏幕上哪些数字决定你还活着 |
| `market-structure` | 1 | `/indicators/market-structure` | 这段是推进还是回撤，结构还在不在 |
| `atr` | 1 | `/indicators/atr` | 普通波动有多宽，这根算不算噪声 |
| `liquidation-cascade` | 1 | `/indicators/liquidation-cascade` | 强平连锁时图上哪些数暂时不可信 |
| `multi-timeframe` | 3 | `/trading-system/multi-timeframe` | 高周期定场、低周期触发，打架怎么办 |
| `order-types` | 3 | `/trading-system/order-types` | 规则如何变成一笔可能成交的单 |
| `cost-vs-r` | 3 | `/trading-system/cost-vs-r` | 来回成本吃掉几个 R |
| `account-heat` | 3 | `/trading-system/account-heat` | 同时开着的风险怎么加总 |
| `execution-bias` | 3 | `/trading-system/execution-bias` | 盘中手会怎样改规则，事先写什么动作 |

### 2.2 不新建、并入旧课的主题

| 主题 | 并入 |
|---|---|
| 多空不对称（费率偏正、空头挤兑、下行滑点更脏） | `funding-rate`、`direction`、`risk-management` |
| 事件 / 时段 / 周末薄盘 | `perp-screen`、`volume`（已有时段）、`risk-management` 禁止条件 |
| 风险限额 / 仓位档位 | `perp-screen`、`position-sizing`、`order-types` |
| 杠杆选法：强平仍远于止损若干 ATR | `position-sizing`、`stop-loss` |
| 盈利后加仓（金字塔）与剩余仓热度 | `position-sizing`、`take-profit` |
| 时间止损为什么必要 | `exit-rules` |
| 样本外 / 滚动前进 | `backtesting`、`system-optimization` |
| 收盘成交 vs 盘中止损高估 | `backtesting`、`statistics` |
| 回撤恢复算术 | `statistics`、`risk-management` |
| 一笔交易的执行时间线 | `case-study` |
| 影线路径不同、盘中止损会被扫 | `kline` |

### 2.3 明确不做

- 不新开 KDJ+RSI、StochRSI、威廉指标等第四套振荡器
- 不把 KDJ 扩成主路径长文；只改接线与「对照层」说明
- 不把 RSI+MACD 删掉：它示范「两把尺问同一问题」
- 不做下单面板、盘口终端、信号、跟单、回测引擎
- 不颁布推荐杠杆、标准仓位、可复制策略
- 本期不采集组合课实盘窗；新课真实行情窗另立 Visual Task，未采集前只用示意图

## 3. 新课写作纲要

每篇仍走 Content 规范：学习目标 → 概念 → 原理 → 怎么看 / 怎么写规则 → 怎么使用 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。  
阶段 3 新课可与现有系统课一样，用「怎么写规则」代替「原理 / 怎么看」。

数字例子必须写明「教学演算，忽略部分费用时要标明，不能拿去对账，不能代表未来结果」。

### 3.1 `perp-screen` 交易所屏幕上有什么

**先修：** `introduction`  
**下一篇：** `kline`  
**Owner：** Knowledge 先补屏幕字段定义；Content 转写；Visual 一张标注示意图。

必须教：

- 钱包余额、未实现盈亏、权益，三者不是同一个数
- 最新价 / 指数价 / 标记价在界面上各出现在哪
- 预估强平价、维持保证金率、逐仓 / 全仓、杠杆档位是展示不是风险
- 资金费倒计时与下一笔费率
- 可用、冻结、下单占用
- 风险限额 / 仓位档位：名义做大，维持保证金率可能升高，强平线靠近

不教：推荐交易所、推荐杠杆、怎么开户。

正例：先读标记价、强平价、保证金模式，再读 K 线。  
反例：只看最新价浮动盈亏的颜色，用很高的杠杆。

### 3.2 `market-structure` 摆动结构与假突破

**先修：** `kline`、`trendlines`  
**下一篇：** `ma`  
**Owner：** Knowledge 新文件；Content 新课；Visual vis-022，实盘窗 vis-109 可后补。

必须教：

- 摆动高点 / 低点的标法（与趋势线篇同一套约定）
- 更高高点 / 更高低点（上升结构），更低低点 / 更低高点（下降结构）
- 推进与回撤：回撤不是自动反转
- 收盘离开区间 vs 影线扫过（假突破 / 扫流动性）
- 破结构之后，原区域角色可能互换，也可能立刻扫回
- 默认读图顺序：先结构，再均线，再副图

不教：订单块、Smart Money 术语堆砌、把扫荡写成庄家确定诱多。

正例：影线刺破前高后收回，记「到过，未收盘离开」，继续等结构。  
反例：刺破瞬间写成突破开仓；或用 5 分钟结构否决 4 小时结构（为多周期课留钩子）。

### 3.3 `atr` ATR 与波动

**先修：** `kline`、`volume`  
**下一篇：** `bollinger-bands`  
**Owner：** Knowledge 新文件（含 True Range 教学公式）；Content 新课；Visual vis-023，实盘 vis-110 可后补。

必须教：

- ATR 测量近期高低波幅的典型宽度，不给方向
- True Range 取：高低差、高与前收、低与前收，三者最大
- 同一 ATR 在不同品种、不同周期上不能直接比
- 用途：判断这根是否超出普通噪声；止损放在若干倍 ATR 外；高波动时同等风险下仓位变小
- 与布林带分工：ATR 是尺子，布林带是通道

不教：ATR 突破开仓系统、推荐倍数。

正例：波动变宽，同一结构止损变远，名义仓位按公式变小。  
反例：ATR 变大却仍按旧仓位开；或把 ATR 上升读成「该追」。

### 3.4 `liquidation-cascade` 清算瀑布怎么读图

**先修：** `volume`、`open-interest`、`cvd`  
**下一篇：** 阶段 2 第一篇 `trend-momentum`  
**Owner：** Knowledge 新文件；Content 新课；Visual vis-027。

必须教：

- 强平单通常是被动市价，打进薄盘会插针
- 一波强平打穿下一波保证金，形成连锁
- 此时成交量、OI、CVD、多空比都可能同时失真
- 教学默认：瀑布进行中，这些数暂时不可解释方向
- 禁止条件：连续强平、盘口一跳数个点 → 空仓或只平不开

不教：如何「抄瀑布底」、如何预测瀑布结束。

正例：量、OI、CVD 同时剧烈抖动，先记「数据不可用」，不写方向句。  
反例：把瀑布长下影写成底部形态，或把 CVD 急跌写成主力出货。

### 3.5 `multi-timeframe` 多周期

**先修：** `market-regime`  
**下一篇：** `direction`  
**Owner：** Strategy 框架；Content 新课；Visual vis-025。

必须教：

- 决策周期与执行周期必须事先写死
- 高周期定环境与方向，低周期只找触发
- 两周期打架：默认不交易，或等对齐；不要切到「更能讲通」的周期
- 4H 趋势 + 15m 震荡可以同时成立，讨论的不是同一段路
- 未收盘的低周期不能推翻已收盘的高周期

不教：三层以上周期共振交易系统。

正例：4H 偏空仍在，15m 金叉只记「低周期回撤」，不开多。  
反例：下午有空就把图切到 5 分钟，用密交叉代替规则。

### 3.6 `order-types` 订单与成交

**先修：** `direction`、`perp-screen`  
**下一篇：** `entry-rules`  
**Owner：** Knowledge `order-types.md`；Strategy `execution.md`；Content 新课；Visual vis-024。

必须教：

- 市价：立刻吃对手价，滑点由盘口决定
- 限价：你出的价，可能不成交
- 止损市价 / 止损限价：触发后变成市价或限价；限价止损可能穿价不成交
- 只减仓（reduce-only）：避免平仓单在错方向上开出新仓
- 只做 maker（post-only）：不成交则撤，不当 taker
- 有效期：GTC / IOC / FOK 用白话解释即可
- 永续要点：最新价止损单 vs 标记价触发；止损未成交也可能先强平
- 部分成交、追价、触发后没成交：系统要写「视为未入场」还是「按已成交部分重算」
- 薄盘里，止损单 ≈ 市价扫货

不教：具体交易所按钮位置教程（可说「名称因所而异」）、API 下单、刷量。

正例：开仓前先能说出「认错后用只减仓的止损市价，触发价看标记价还是最新价」。  
反例：只在最新价挂很近的限价止损，杠杆很高。

### 3.7 `cost-vs-r` 成本对照 R

**先修：** `position-sizing`、`funding-rate`  
**下一篇：** `risk-management`  
**Owner：** Strategy 新文件；Content 新课；Visual vis-026（一张算术表示意图）。

必须教（用同一笔教学数字贯穿）：

- 1R = 入场到计划止损的亏损金额
- 来回 taker 手续费
- 持有 N 个资金费周期的资金费
- 点差 + 入场滑点 + 止损滑点（止损滑点不优于入场）
- 总成本 ÷ 1R = 这笔还没看对错就先垫的 R
- 期望公式必须减这一项；小赢规则最容易被吃穿

例题口径（可改数字，不可删字段）：权益 10,000；单笔 1R = 100；名义 5,000；费率 0.05%/8h；拿 3 天；taker 开平各 0.05%。算出资金费与手续费大约是多少 USDT、多少 R。写明忽略部分费用。

不教：哪家所手续费更低、如何套利资金费。

正例：算完发现来回成本已接近 0.3R，于是提高决策周期或放弃这条过密触发。  
反例：回测只报未计成本的胜率。

### 3.8 `account-heat` 账户热度与相关

**先修：** `risk-management`  
**下一篇：** `trade-frequency`  
**Owner：** 扩写 `docs/strategy/risk-management.md`；Content 新课；可用 vis-008 加一格或 vis-029。

必须教：

- 热度 = 当前所有未平仓计划风险之和（按 R 或权益百分比）
- 三笔各 1%、同一方向或都跟 BTC，账户风险按相关后不是 1%
- BTC 是多数 U 本位山寨的共同风险因子；换交易对不是自动分散
- 热度上限碰到时：先平、先减、或禁止开新仓，动作事先写死
- 检查方法：列出每笔的方向、与 BTC 是否同向、单笔 R，再加总

不教：组合对冲公式、期权、推荐品种篮子。

正例：已有一笔 BTC 偏多 1R，ETH 同向只允许再加到热度上限以内，否则不做。  
反例：同时开 5 个山寨多头，每笔「只亏 1%」。

### 3.9 `execution-bias` 执行偏差

**先修：** `trade-frequency`、`risk-management`  
**下一篇：** `trading-journal`  
**Owner：** Strategy 短文或风险文档增补；Content 新课；Visual vis-028。

必须教（每条对应日志字段 + 触发后动作）：

| 偏差 | 事先动作 |
|---|---|
| 错过触发后市价追 | 视为条件不成立，记日志，当天不再用同一触发 |
| 浮盈怕还回去，提前平 | 走止盈句；未到句则留下，复盘再改句 |
| 浮亏把止损往远处拖 | 视为改规则，记违规笔，不进规则成绩 |
| 赢了加频率、输了加仓位 | 走频率 / 热度刹车 |
| 为回本加仓、因共振加杠杆 | 禁止条件，空仓 |
| 把「看对」当成身份，不肯止损 | 触及即走；否决止损的副图理由无效 |

不写成鸡汤。不教冥想、成功学。

正例：错过一笔后按句子空仓，行情继续走，记下「漏掉和守规则可以同时发生」。  
反例：刚错过就市价追，再把止损收到「亏一点没关系」。

## 4. 旧课修订清单

修订不得改 slug、不得改「一篇一个问题」的主旨。只补钩子、算术、禁止条件和下一篇接线。

| slug | 必须补的要点 |
|---|---|
| `introduction` | 新三阶段地图；导学后先 `perp-screen` 再 K 线；点出「规则还要能下单」 |
| `kline` | 同一 OHLC 可来自不同盘中路径；盘中止损可能扫到收盘看不到的价；量能课已发布则删「量能课还没写」 |
| `trendlines` | 文末下一篇改为 `market-structure`；假突破只留短句，细节交给结构课 |
| `ma` / `ema` | 先修加上 `market-structure`；强调先结构再均线 |
| `rsi` / `macd` | 冲突时回到结构，不是再加振荡器 |
| `kdj` | 标明对照层，不进主路径；不扩写；下一篇仍接布林带或按新 order 接 OI |
| `volume` | 新闻 / 强平时段的巨量可能是连锁平仓；链到 `liquidation-cascade` |
| `bollinger-bands` | 先修加上 `atr`；对照「尺子 vs 通道」 |
| `funding-rate` | 加一小节「费率 × 名义 × 周期数 ≈ 持有成本」；多空不对称一句；链到 `cost-vs-r` |
| `open-interest` / `cvd` | 瀑布中失真，链到 `liquidation-cascade` |
| `trend-momentum` / `rsi-macd` | 明确不建议再叠 KDJ；周期冲突链到 `multi-timeframe` |
| `funding-oi` | 成本反例链到 `cost-vs-r` |
| `multi-indicator` | 结构可单独占方向槽；对齐不能加杠杆 |
| `what-is-a-trading-system` | 链路补上：多周期、订单、成本、热度、执行偏差 |
| `market-regime` | 决策周期写死；消息长影线 → 看不清；下一篇改为 `multi-timeframe` |
| `direction` | 用结构句（HH/HL）作偏向条件；空头与多头成本不对称只点一句 |
| `entry-rules` | 先修加上 `order-types`；触发后的成交假设；未成交视为未入场 |
| `exit-rules` | 时间止损：资金费和保证金占用都在烧；持仓中 RSI 不能否决止损，环境失效可以离场 |
| `stop-loss` | ATR 从括号升为与结构并列的写法；止损单类型链到 `order-types`；强平距离用 ATR 检查 |
| `take-profit` | 分批后剩余仓的热度；移动止盈与时间出口 |
| `position-sizing` | 杠杆检查：预估强平须远于止损若干 ATR；风险限额升高 MM；盈利加仓须重算总热度；删「回测专篇尚未写」 |
| `risk-management` | 事件 / 周末 / 连续强平写入禁止条件；回撤恢复算术；链到 `account-heat` |
| `trade-frequency` | 下一篇改为 `execution-bias` |
| `trading-journal` | 增加字段：订单类型、计划价 / 成交价、资金费、热度、是否违规、想改规则的冲动 |
| `backtesting` | 样本外 / 滚动前进作业；收盘成交 vs 盘中止损；止损滑点不优于入场 |
| `statistics` | 恢复算术（亏 20% 需 +25%）；相关品种加总会低估回撤；按环境切开报 |
| `system-optimization` | 先改可执行性与成本假设，再改参数；滚动前进后只许验证段看一次 |
| `case-study` | 补一节「匿名执行时间线」：看到什么、挂了什么单、滑了多少、收过一次资金费、日志怎么记。仍不填胜率与收益 |

`position-sizing` 里「回测专篇尚未写」是过期句，修订时删除。

## 5. 权重与主路径

阶段 1 分层（产品约束，目录页必须看得见）：

| 层 | slugs | 目录呈现 |
|---|---|---|
| 主路径 | `kline` → `trendlines` → `market-structure` → `ma` → `ema` → `rsi` → `volume` → `atr` → `bollinger-bands` | 置顶 |
| 主路径续 | `macd` | 组合课先修，跟在主路径后 |
| 对照层 | `kdj` | 标明「和 RSI 对照，不是主路径」 |
| 合约数据层 | `open-interest` → `funding-rate` → `long-short-ratio` → `cvd` → `liquidation-cascade` | 第三组 |

阶段 0 建议先于任何指标：`introduction` → `perp-screen` → `kline`。

阶段 3 入口先修改为：`kline`、`market-structure`、`atr`、`ema`、`rsi`、`trend-momentum`。未读 `order-types` 时，入场篇用提示而不是拦截。

## 6. 路由与内容模型

### 6.1 阶段 0 第二篇

新增 `/course/[...slug]`。

| 路径 | 内容 | 说明 |
|---|---|---|
| `/course` | `content/00-introduction/index.md`（`slug: introduction`） | 枢纽 + 怎么学，不改 URL |
| `/course/perp-screen` | `content/00-introduction/perp-screen/index.md` | 新课 |
| `/introduction` | 不建 | 保持旧决策 |

`useCourse` 取导学枢纽时必须 `slug === 'introduction'`，不能 `find(category === 'introduction')`，否则会误拿 `perp-screen`。

`category: introduction` 的路径规则：

```text
slug: introduction → /course
其余 introduction slug → /course/{slug}
```

### 6.2 其余新课

沿用现有 `[...slug]`，不新增一级导航。导航仍是：首页 / 怎么学 / 指标 / 组合 / 交易系统 / 术语。

### 6.3 系统模板（不新增编号）

[system-template.md](../strategy/system-template.md) 保持 12 节。下列内容写进「填写说明」或文末补充，不改 1–12 编号：

- 第 3 节：决策周期与执行周期（多周期）
- 第 6 节：触发后的订单类型与未成交怎么算
- 第 7 节：止损单挂最新价还是标记价；ATR 或结构
- 第 9 节：热度上限、相关品种
- 第 10 节：事件 / 周末 / 连续强平 / 执行偏差
- 第 11 节：样本外、滚动前进、成本对照 R
- 第 12 节：订单、滑点、资金费、是否违规

## 7. 知识 / 策略 / 视觉清单

### 7.1 Knowledge（TASK-032）

新建：

- `docs/knowledge/indicators/market-structure.md`
- `docs/knowledge/indicators/atr.md`
- `docs/knowledge/indicators/liquidation-cascade.md`
- `docs/knowledge/order-types.md`
- `docs/knowledge/perp-screen.md`（屏幕字段，不是指标）

修订：

- `glossary.md`：ATR、True Range、摆动结构、假突破、热度、只减仓、只做 maker、风险限额、决策周期 / 执行周期
- `perpetual-futures.md`：风险限额、仓位档位、强平单进簿、保险基金 / ADL 各用一段（机制，不写交易时机）
- `indicators/kline.md`、`trendlines.md`、`funding-rate.md`、`volume.md`、`cvd.md`、`bollinger-bands.md`：按第 4 节补边界
- `README.md` 索引

### 7.2 Strategy（TASK-033）

新建：

- `docs/strategy/execution.md`（订单、成交、部分成交）
- `docs/strategy/multi-timeframe.md`
- `docs/strategy/cost-vs-r.md`

修订：`system-template.md`、`risk-management.md`（热度、BTC 因子、事件）、`position-sizing.md`、`backtest.md`（样本外、盘中止损）、`README.md`。  
不新开组合一级主题。`rsi-macd.md` 加一句：不要再叠第三把动量尺。

### 7.3 Visual（TASK-034 / 036 / 037）

示意图预留（未交付前 `status: spec`，课文不插假行情）：

| id | 课 | 教学问题 |
|---|---|---|
| vis-022 | market-structure | 上升结构 vs 假突破收回 |
| vis-023 | atr | 同一段价格，尺子宽度与噪声 |
| vis-024 | order-types | 市价 / 限价 / 止损单 / 只减仓 |
| vis-025 | multi-timeframe | 高周期环境 vs 低周期触发，打架则空仓 |
| vis-026 | cost-vs-r | 一笔成本拆成手续费、资金费、滑点、占 R |
| vis-027 | liquidation-cascade | 瀑布中量 / OI / CVD 同时失真 |
| vis-028 | execution-bias | 偏差 → 日志 → 事先动作 |
| vis-029 | account-heat | 多笔同向风险加总 |
| vis-030 | perp-screen | 屏幕字段：权益、标记价、强平、资金费 |

真实行情窗（可后于示意图）：vis-109 结构、vis-110 ATR。组合课实盘窗仍不做。  
修订 vis-008：流程格补「订单 / 成本 / 热度」，不要画成「风控后收益更高」。

## 8. Sprint 与任务

升级分四期落地，外加本期产品方案。不在同一 Sprint 写完全部正文。

| Sprint | 主题 | Tasks | 读者走通 |
|---|---|---|---|
| 009 | 产品方案（本期） | TASK-031 | 课序与任务可执行 |
| 010 | 读图主干 | TASK-032 知识、TASK-033 策略、TASK-034 结构/ATR 图、TASK-035 结构+ATR 课文与旧课接线 | 导学 → K 线 → 趋势线 → 结构 → MA → … → Volume → ATR → 布林带 |
| 011 | 机制与成交 | TASK-036 屏幕/订单/瀑布/成本 | `/course/perp-screen`、`order-types`、`liquidation-cascade`、`cost-vs-r` 可学 |
| 012 | 系统执行层 | TASK-037 多周期/热度/偏差 + 系统旧课修订 + 案例时间线 | 阶段 3 二十篇可学 |
| 013 | 壳与终审 | TASK-038 Nuxt/UI、TASK-039 QA | 目录分层、无死链、桌面+移动 |

TASK-038 可与 010 并行做路由骨架（未发布显示编写中），但 `/course/[...slug]` 必须在 `perp-screen` 发布前就绪。

依赖：010 的 Knowledge / Strategy 未完成前，Content 不得开写新课正文。

## 9. UI / Nuxt 要点（TASK-038）

- `courseMeta.ts`：`MAIN_PATH_SLUGS`、`CONTRACT_PATH_SLUGS`、`SYSTEM_PATH_SLUGS`、`PLANNED_TITLES`、`NEXT_REASONS` 与学习路径对齐
- 新增 `STAGE0_PATH_SLUGS` 或等价：`introduction`、`perp-screen`（introduction 的 path 仍是 `/course`）
- `pages/course/[...slug].vue`（或等价）渲染非枢纽导学
- `resolvePublishedPath('introduction')` → `/course`
- 指标目录：主路径置顶；KDJ 标对照层；合约层含清算瀑布
- 系统目录按新 order 二十篇
- 未发布只显示编写中，不链 404
- 不是交易终端：订单课只用示意图，不放买卖按钮

## 10. 验收（整次升级结束时）

- [x] 学习路径、page-map、courseMeta、导学地图四者 slug 一致
- [x] 9 篇新课 published，结构符合 Content 规范
- [x] 第 4 节旧课修订已合并，无「回测尚未写」一类过期句
- [x] KDJ 不在主路径；无 KDJ+RSI 新课
- [x] `/course/perp-screen` 可开；`/course` 仍是怎么学
- [x] 无死链；术语首次出现有解释
- [x] 无违禁措辞；无推荐杠杆；案例无成绩单
- [x] lint / typecheck / build 通过
- [x] 桌面 + 移动走通：导学 → 屏幕 → K 线 → 结构 → ATR → … → 案例 → 回 `/course`
- [x] 各 Sprint HANDOFF 已写

Sprint 013 / TASK-039：`docs/qa/QA-RESULT-TASK-039.md` APPROVE（2026-09-03）。

## 11. 给编排器

1. 先合并本期 TASK-031 文档，再开 Sprint 010。
2. Sprint 010 可并行：Knowledge、Strategy；Visual 等结构/ATR 知识文件有初稿再画。
3. 不要在聊天里改课序。改序只改 `learning-path.md`，再改 page-map 与 courseMeta。
4. 一个任务一个逻辑 commit。本期只提交方案文档，不写课文。
