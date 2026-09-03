# 交易知识库

这里是整个网站的交易知识基础来源。

Content Agent 写教程前必须先读本目录，再转写成面向零基础用户的课文。  
Strategy Agent 写组合与系统规则时，指标定义以本目录为准。  
QA Agent 审核内容时，以本目录核对术语与原理。

知识库解决：

> 这个概念到底是什么？

Content 解决：

> 如何把这个概念教给小白？

本项目是交易教育网站，不是交易信号、荐股、喊单或自动交易系统。  
指标、形态、交叉、背离、超买超卖都是**观察工具**，不是买卖指令。

## 使用规则

修改核心知识时：

1. 修改对应 Knowledge 文件
2. 检查相关文件是否引用旧定义
3. 交 QA Agent 审核
4. 再更新 `content/` 教程

文件名规范：

- 指标文件使用小写短横线：`rsi.md`、`bollinger-bands.md`
- 历史草稿 `RSI.md` 已合并进 `rsi.md`；因大小写不敏感文件系统会冲突，不另留指针文件

## 术语统一（速查）

完整释义见 [glossary.md](./glossary.md)。下列名称为本知识库**规范用语**：

| 规范中文 | 英文 | 缩写 | 使用约定 |
|---|---|---|---|
| K 线 | Candlestick / K-line | — | 标题用「K 线」；正文可并列「蜡烛图」 |
| 趋势线 | Trendline | — | 至少两点；手连结构，不是算法指标 |
| 支撑 / 阻力 | Support / Resistance | S/R | 区域，不是一根精确价 |
| 均线 | Moving Average | MA | 单独说「均线 / MA」时默认指简单移动平均（SMA） |
| 指数均线 | Exponential Moving Average | EMA | 不与 MA 混称为同一种算法 |
| 动量 | Momentum | — | 指标类别，不是单一线条 |
| 持仓量 | Open Interest | OI | 不与成交量混用；可并列「未平仓合约」 |
| 资金费率 | Funding Rate | — | 「资金费」专指实际收付的 Funding Payment |
| 多空比 | Long/Short Ratio | LSR | 必须写明口径（账户数 / 持仓量 / 大户） |
| 累计成交量差 | Cumulative Volume Delta | CVD | 中文全称与 CVD 并用 |
| 保证金 | Margin | — | 区分起始保证金与维持保证金 |
| 杠杆 | Leverage | — | 同时放大盈利与亏损 |
| 强平 | Liquidation | — | 教学正文用「强平」；「爆仓」仅作口语指向 |
| U 本位 | USDT-margined / Quote-margined | — | 以稳定币（常见为 USDT）作保证金与盈亏结算 |
| 永续合约 | Perpetual Futures | Perp | 可并列 Perpetual Swap；不用「无限期期货」作正式名 |
| 超买 / 超卖 | Overbought / Oversold | — | 区域描述，不是反转指令 |
| 背离 | Divergence | — | 价格与指标不同步的观察现象 |
| 金叉 / 死叉 | Golden Cross / Death Cross | — | 快线上穿 / 下穿慢线的观察用语 |
| 标记价格 | Mark Price | — | 用于未实现盈亏与强平估算，区别于最新价 |
| 图表周期 | Timeframe | — | 如 15m、1H、4H |
| 回看参数 | Period / Length | — | 指标计算用的根数，如 RSI 14 |
| 摆动结构 | Market / Swing Structure | — | 管 HH/HL 序列与假突破；斜线与水平区归趋势线篇 |
| 平均真实波幅 | Average True Range | ATR | 波动尺子，不给方向；与布林带（通道）分工 |
| 假突破 | False Breakout | — | 影线到过、收盘未离开；不是诱多鉴定 |
| 只减仓 | Reduce-Only | — | 最多减已有仓，不开反向新仓 |
| 只做 maker | Post-Only | — | 不当 taker；不成交则撤或不接受 |
| 风险限额 | Risk Limit | — | 名义做大，维持保证金率可能升高 |
| 热度 | Account Heat | — | 未平仓计划风险之和，相关后不是简单相加 |
| 决策 / 执行周期 | Decision / Execution Timeframe | — | 事先写死；低周期不能推翻已收盘高周期 |

禁止把上述观察用语写成「买入信号」或「卖出信号」。

## 完整索引

### 基础概念

| 文件 | 主题 | 适合谁先读 |
|---|---|---|
| [glossary.md](./glossary.md) | 术语总表与统一决策 | 所有 Agent；写任何教程前 |
| [perpetual-futures.md](./perpetual-futures.md) | U 本位永续合约、保证金、杠杆、强平、资金费、风险限额、保险基金 / ADL | Content 写引言与风险说明前 |
| [perp-screen.md](./perp-screen.md) | 交易所屏幕字段：权益、三价、强平、资金费倒计时、仓位档位 | Content 写导学第二篇前 |
| [order-types.md](./order-types.md) | 市价 / 限价 / 止损单、只减仓、只做 maker、成交结果 | Content 写订单与入场课前 |

`perp-screen.md`、`order-types.md` 用「是什么 / 解决什么 / 常见误读」，不硬套指标 10 问。

### 第一部分：常用指标

下表是知识文件索引。发布课序以 `docs/product/learning-path.md` 为准。主路径：K 线 → 趋势线 → 摆动结构 → MA → EMA → RSI → Volume → ATR → 布林带。主路径续：MACD。对照层：KDJ。合约数据层：OI → 资金费率 → 多空比 → CVD → 清算瀑布。

指标文件按 10 问写全：是什么、测量什么、如何计算、如何观察、常见参数、典型形态、何时有用、何时失效、常见误区、可组合对象。

| 层 | 顺序 | 文件 | 中文 | 英文 | 类型 |
|---|---|---|---|---|---|
| 主路径 | 1 | [indicators/kline.md](./indicators/kline.md) | K 线 | Candlestick | 价格表达 |
| 主路径 | 2 | [indicators/trendlines.md](./indicators/trendlines.md) | 趋势线与支撑阻力 | Trendline / Support / Resistance | 价格结构（区域 / 连线） |
| 主路径 | 3 | [indicators/market-structure.md](./indicators/market-structure.md) | 摆动结构与假突破 | Market / Swing Structure | 价格结构（摆动序列） |
| 主路径 | 4 | [indicators/ma.md](./indicators/ma.md) | 均线 | Moving Average (SMA) | 趋势 / 均线 |
| 主路径 | 5 | [indicators/ema.md](./indicators/ema.md) | 指数均线 | Exponential Moving Average | 趋势 / 均线 |
| 主路径 | 6 | [indicators/rsi.md](./indicators/rsi.md) | 相对强弱指标 | RSI | 动量 |
| 主路径 | 7 | [indicators/volume.md](./indicators/volume.md) | 成交量 | Volume | 市场活跃度 |
| 主路径 | 8 | [indicators/atr.md](./indicators/atr.md) | 平均真实波幅 | ATR | 波动率 / 尺子 |
| 主路径 | 9 | [indicators/bollinger-bands.md](./indicators/bollinger-bands.md) | 布林带 | Bollinger Bands | 波动率 / 通道 |
| 主路径续 | 10 | [indicators/macd.md](./indicators/macd.md) | 平滑异同移动平均线 | MACD | 趋势 + 动量 |
| 对照层 | 11 | [indicators/kdj.md](./indicators/kdj.md) | 随机指标（KDJ） | Stochastic / KDJ | 动量（不进主路径） |
| 合约数据 | 12 | [indicators/open-interest.md](./indicators/open-interest.md) | 持仓量 | Open Interest | 合约存量 |
| 合约数据 | 13 | [indicators/funding-rate.md](./indicators/funding-rate.md) | 资金费率 | Funding Rate | 永续机制 / 拥挤度 |
| 合约数据 | 14 | [indicators/long-short-ratio.md](./indicators/long-short-ratio.md) | 多空比 | Long/Short Ratio | 持仓结构 |
| 合约数据 | 15 | [indicators/cvd.md](./indicators/cvd.md) | 累计成交量差 | CVD | 主动买卖压力 |
| 合约数据 | 16 | [indicators/liquidation-cascade.md](./indicators/liquidation-cascade.md) | 清算瀑布 | Liquidation Cascade | 强平连锁 / 数据失真 |

历史草稿文件名 `RSI.md` 已合并进 [indicators/rsi.md](./indicators/rsi.md)。macOS 等大小写不敏感文件系统上二者为同一路径，因此**不再另留指针文件**，以免覆盖规范正文。引用一律用 `rsi.md`。

### 指标类型速查

| 类型 | 指标 | 主要观察 |
|---|---|---|
| 价格表达 | K 线 | 开高低收、实体与影线；同一 OHLC 可来自不同盘中路径 |
| 价格结构 | 趋势线与支撑阻力；摆动结构 | 斜线 / 水平区域 vs 摆动序列、假突破、HH/HL |
| 波动率 / 尺子 | ATR | 普通波动宽度，不给方向 |
| 趋势 / 均线 | MA、EMA | 方向、斜率、交叉、距离 |
| 趋势 + 动量 | MACD | 快慢均线差、柱状图、交叉 |
| 动量 | RSI、KDJ | 涨跌力度、极端区、背离 |
| 波动率 / 通道 | 布林带 | 带宽、贴轨、收口 |
| 活跃度 | 成交量 | 量价配合、放量缩量 |
| 合约存量 | 持仓量 | 新开仓 / 平仓、价格与 OI 组合 |
| 永续机制 | 资金费率 | 多空费用方向、费率极端 |
| 持仓结构 | 多空比 | 账户或仓位倾斜（需注明口径） |
| 主动成交 | CVD | 主动买与主动卖的累计差；瀑布中可能失真 |
| 强平连锁 | 清算瀑布 | 市价强平进薄盘；量 / OI / CVD / 多空比暂时不可解释方向 |

### 组合预习（只给知识边界，不写策略规则）

下列组合的**定义与局限**分散在各指标第 10 问；具体交易逻辑归 Strategy Agent（`docs/strategy/`），不在本目录展开。

- 趋势 + 动量：MA / EMA + RSI 或 MACD
- 趋势 + 成交量：MA / EMA + Volume
- 价格 + OI：K 线 / 价格 + Open Interest
- OI + Volume：持仓量 + 成交量
- Funding + OI：资金费率 + 持仓量
- RSI + MACD：两类动量互相核对
- EMA + Volume：均线方向 + 量能
- 多指标共振：同向观察增多，仍不是确定性结论

## Content Agent 阅读顺序建议

先修：

1. 本 README 的术语表
2. `glossary.md`
3. `perpetual-futures.md`
4. `perp-screen.md`（导学第二篇：屏幕上哪些数字决定你还活着）

TASK-032 之后，Content 可转写的新知识（须等本目录文件，不得提前开写）：

1. **交易所屏幕** — `perp-screen.md`
2. **摆动结构与假突破** — `indicators/market-structure.md`
3. **ATR** — `indicators/atr.md`
4. **订单与成交** — `order-types.md`
5. **清算瀑布** — `indicators/liquidation-cascade.md`

已发布旧课只需按 `curriculum-upgrade.md` 第 4 节补钩子，不重写主旨。第一批已有课文（K 线、MA、EMA、RSI）仍以对应指标文件为准。

理由：导学先认屏幕，再读 K 线与结构；ATR 接在 Volume 之后、布林带之前；订单课在入场规则之前；瀑布课给合约数据层收尾。永续机制与屏幕字段应作为引言或先修同步写，否则后文无法讲清杠杆、强平与资金费。

## 交接

本轮交付说明见 [HANDOFF.md](./HANDOFF.md)。
