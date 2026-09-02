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

禁止把上述观察用语写成「买入信号」或「卖出信号」。

## 完整索引

### 基础概念

| 文件 | 主题 | 适合谁先读 |
|---|---|---|
| [glossary.md](./glossary.md) | 术语总表与统一决策 | 所有 Agent；写任何教程前 |
| [perpetual-futures.md](./perpetual-futures.md) | U 本位永续合约、保证金、杠杆、强平、资金费概念 | Content 写引言与风险说明前 |

### 第一部分：常用指标

下表是知识文件索引。发布课序以 `docs/product/learning-path.md` 为准（主路径：K 线 → MA → EMA → RSI → Volume → MACD）。每个文件按 10 问写全：是什么、测量什么、如何计算、如何观察、常见参数、典型形态、何时有用、何时失效、常见误区、可组合对象。

| 顺序 | 文件 | 中文 | 英文 | 类型 |
|---|---|---|---|---|
| 1 | [indicators/kline.md](./indicators/kline.md) | K 线 | Candlestick | 价格表达 |
| 2 | [indicators/ma.md](./indicators/ma.md) | 均线 | Moving Average (SMA) | 趋势 / 均线 |
| 3 | [indicators/ema.md](./indicators/ema.md) | 指数均线 | Exponential Moving Average | 趋势 / 均线 |
| 4 | [indicators/macd.md](./indicators/macd.md) | 平滑异同移动平均线 | MACD | 趋势 + 动量 |
| 5 | [indicators/rsi.md](./indicators/rsi.md) | 相对强弱指标 | RSI | 动量 |
| 6 | [indicators/kdj.md](./indicators/kdj.md) | 随机指标（KDJ） | Stochastic / KDJ | 动量 |
| 7 | [indicators/bollinger-bands.md](./indicators/bollinger-bands.md) | 布林带 | Bollinger Bands | 波动率 / 通道 |
| 8 | [indicators/volume.md](./indicators/volume.md) | 成交量 | Volume | 市场活跃度 |
| 9 | [indicators/open-interest.md](./indicators/open-interest.md) | 持仓量 | Open Interest | 合约存量 |
| 10 | [indicators/funding-rate.md](./indicators/funding-rate.md) | 资金费率 | Funding Rate | 永续机制 / 拥挤度 |
| 11 | [indicators/long-short-ratio.md](./indicators/long-short-ratio.md) | 多空比 | Long/Short Ratio | 持仓结构 |
| 12 | [indicators/cvd.md](./indicators/cvd.md) | 累计成交量差 | CVD | 主动买卖压力 |

历史草稿文件名 `RSI.md` 已合并进 [indicators/rsi.md](./indicators/rsi.md)。macOS 等大小写不敏感文件系统上二者为同一路径，因此**不再另留指针文件**，以免覆盖规范正文。引用一律用 `rsi.md`。

### 指标类型速查

| 类型 | 指标 | 主要观察 |
|---|---|---|
| 价格表达 | K 线 | 开高低收、实体与影线 |
| 趋势 / 均线 | MA、EMA | 方向、斜率、交叉、距离 |
| 趋势 + 动量 | MACD | 快慢均线差、柱状图、交叉 |
| 动量 | RSI、KDJ | 涨跌力度、极端区、背离 |
| 波动率 / 通道 | 布林带 | 带宽、贴轨、收口 |
| 活跃度 | 成交量 | 量价配合、放量缩量 |
| 合约存量 | 持仓量 | 新开仓 / 平仓、价格与 OI 组合 |
| 永续机制 | 资金费率 | 多空费用方向、费率极端 |
| 持仓结构 | 多空比 | 账户或仓位倾斜（需注明口径） |
| 主动成交 | CVD | 主动买与主动卖的累计差 |

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

第一批教程建议优先转写：

1. K 线
2. MA
3. EMA
4. RSI

理由：先建立读图能力，再学最常用的趋势工具，再学一个动量工具；EMA 紧接 MA，便于对比「更跟新价」与「更平滑」。永续合约基础应作为引言或先修篇同步写，否则后文无法讲清杠杆、强平与资金费。

## 交接

本轮交付说明见 [HANDOFF.md](./HANDOFF.md)。
