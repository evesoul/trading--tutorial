# 策略框架

本目录是 Strategy Agent 的工作区。

它回答的问题是：

> 几个指标各自解决什么问题？怎样放进一套可检查的交易流程？风险、仓位和回测该看什么？

它不回答：

- 这个概念的精确定义是什么？（见 `docs/knowledge/`）
- 怎样把概念教给零基础用户？（见 `content/`，由 Content Agent 转写）
- 现在该做多还是做空？（本项目不提供交易信号）

本项目是交易教育网站，不是信号、荐股、喊单或自动交易系统。任何组合、规则示例、回测数字都只用于教学，不能当作可执行策略，也不能当作未来结果的依据。

## 三层分工

| 层 | 目录 | 问题 |
|---|---|---|
| Knowledge | `docs/knowledge/` | 这个指标测量什么？ |
| Strategy | `docs/strategy/` | 几个指标如何分工，如何进入交易系统？ |
| Content | `content/` | 怎样用短句、案例、图表教给小白？ |

Strategy 可以引用 Knowledge 的术语，不重写指标定义。Content 写课时必须先读对应组合框架，再读 Knowledge。

## 交易系统逻辑顺序

所有组合和规则都按这一条链路理解，不要跳步：

```
Market Regime（市场环境）
→ Multi-Timeframe（多周期）
→ Direction（方向）
→ Order / Execution（订单与成交）
→ Setup（交易前提）
→ Entry（入场触发）
→ Stop Loss（止损）
→ Take Profit（止盈）
→ Position Size（仓位）
→ Cost vs R（成本对照 R）
→ Heat（账户热度）
→ Exit（离场）
→ Review（复盘）
```

填写完整系统时，仍使用 [system-template.md](./system-template.md) 的 **12 节编号**。多周期、订单、成本、热度写进填写说明，不新增编号。框架文件：[multi-timeframe.md](./multi-timeframe.md)、[execution.md](./execution.md)、[cost-vs-r.md](./cost-vs-r.md)；热度细则在 [risk-management.md](./risk-management.md)。总纲见 `docs/product/curriculum-upgrade.md`。

含义：

1. **市场环境**：先判断当前更像趋势、震荡、高波动还是低波动。
2. **多周期**：高周期定场，低周期触发；打架则空仓。
3. **方向**：只在已经选定的环境里，规则化地给出偏多、偏空或空仓。
4. **订单与成交**：规则如何变成可能成交的单；未成交怎么算。
5. **交易前提 / 入场触发**：前提不等于触发。
6. **止损 / 止盈 / 离场**：先认错，再谈目标；含时间与失效。
7. **仓位 / 成本 / 热度**：由止损距离反推；来回成本对照 R；同向风险加总。
8. **复盘**：先查执行，再谈改规则。

## 核心策略原则

1. **一个指标只回答一类问题。** 趋势、动量、参与度、拥挤程度不要混成一句“看多/看空”。
2. **组合是观察框架，不是买卖指令。** 金叉、死叉、超买、超卖、背离、量价齐升都只是观察工具。
3. **指标数量增加，并不等于判断更准。** 多个指标若回答同一问题，只是在重复同一份价格信息。见 [combinations/multi-indicator.md](./combinations/multi-indicator.md)。
4. **先环境，后形态。** 没有市场环境的交叉或背离，缺少上下文。
5. **共振可以提高观察清晰度，不能消除风险。** 冲突时默认等待或空仓，而不是“选一个自己喜欢的指标”。
6. **止损、仓位、离场属于系统，不属于指标。** 组合课可以点到它们在链路中的位置，但完整规则见风险管理与仓位文档。
7. **回测要看一组数字，不能只报胜率。** 见 [backtest.md](./backtest.md)。
8. **永续合约有爆仓风险。** 杠杆放大亏损。教学中不鼓励高杠杆。
9. **历史观察不能代表未来结果。** 案例用于解释机制，不用于证明某套组合有效。

## 禁止表述

全文不得出现：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利。

也不得把组合写成确定性信号，例如“EMA 金叉且 RSI 超卖就开多”。

## 指标组合索引

发布课序以 `docs/product/learning-path.md` 为准（`rsi-macd` 在 `trend-volume` 之后、`price-oi` 之前）。下表是策略职责索引，不是改路径。

| 文件 | 组合 | 主要分工 |
|---|---|---|
| [combinations/trend-momentum.md](./combinations/trend-momentum.md) | 趋势 + 动量（EMA+RSI、EMA+MACD） | 方向 vs 涨跌力度 |
| [combinations/trend-volume.md](./combinations/trend-volume.md) | 趋势 + 成交量（EMA+Volume、Price+Volume） | 方向 vs 参与度 |
| [combinations/price-oi.md](./combinations/price-oi.md) | 价格 + 持仓量 | 价格变动 vs 仓位增减 |
| [combinations/oi-volume.md](./combinations/oi-volume.md) | 持仓量 + 成交量 | 仓位存量 vs 成交流量 |
| [combinations/funding-oi.md](./combinations/funding-oi.md) | 资金费率 + 持仓量 | 拥挤/持有成本 vs 仓位规模 |
| [combinations/rsi-macd.md](./combinations/rsi-macd.md) | RSI + MACD | 两种动量视角，容易信息重复 |
| [combinations/multi-indicator.md](./combinations/multi-indicator.md) | 多指标共振 | 如何少而清楚，而不是越多越好 |

每个组合文件都包含：各指标回答什么问题、共振与冲突、适用/失效环境、常见误区、风险、以及它在交易系统链路中的位置。

## 系统、风险与回测索引

| 文件 | 用途 |
|---|---|
| [system-template.md](./system-template.md) | 完整交易系统填写模板（保留 12 节） |
| [risk-management.md](./risk-management.md) | 账户风险、单笔风险、爆仓、禁止交易条件 |
| [position-sizing.md](./position-sizing.md) | 由止损距离反推仓位；杠杆不等于仓位 |
| [backtest.md](./backtest.md) | 样本、胜率、盈亏比、Profit Factor、回撤、连亏、成本、滑点；样本外与滚动前进 |
| [execution.md](./execution.md) | 订单类型、成交、部分成交、最新价止损 vs 标记价强平 |
| [multi-timeframe.md](./multi-timeframe.md) | 决策周期与执行周期；打架则空仓 |
| [cost-vs-r.md](./cost-vs-r.md) | 手续费 / 资金费 / 滑点对照 1R |
| [wyckoff.md](./wyckoff.md) | 四阶段读图在系统链路中的位置；不颁布信号 |

Part 3 发布课序以 `docs/product/learning-path.md` 为准（二十篇）。教学顺序：理念 → 环境 → 多周期 → 方向 → 订单 → 进出场 → 仓位 → 成本 → 风险 → 热度 → 频率 → 执行偏差 → 日志 → 回测 → 统计 → 优化 → 案例。

## 给 Content Agent 的使用方式

写组合课或系统课时：

1. 先读本 README 的原则和禁止表述。
2. 再读对应组合文件，不要自行发明“金叉即买入”一类规则。
3. 术语定义以 `docs/knowledge/` 为准；知识库尚未补全时，先写清“测量什么”，不要编造计算公式。
4. 课时结构仍按 Content Agent 规范：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 案例 → 常见错误 → 局限性 → 总结 → 下一步。
5. “怎么使用”应落到观察步骤和系统链路，而不是给出当下可下单的条件清单。
6. 每个组合至少准备一正一反案例：共振看起来清楚、以及冲突或失效。
7. 需要图表时创建 Visual Task，真实行情图必须记录 symbol、timeframe、source、period。示意图必须标明“示意图”。
8. 不要用虚构数据证明某组合能赚钱。

系统课转写：多周期读 [multi-timeframe.md](./multi-timeframe.md)，订单读 [execution.md](./execution.md)，成本读 [cost-vs-r.md](./cost-vs-r.md)，热度与执行偏差读 [risk-management.md](./risk-management.md)。对应 Content 任务为 TASK-035 / 036 / 037。

更细的转写注意写在各文件末尾，以及 [HANDOFF.md](./HANDOFF.md)。

## 目录文件

```
docs/strategy/
├── README.md
├── HANDOFF.md
├── system-template.md
├── risk-management.md
├── position-sizing.md
├── backtest.md
├── execution.md
├── multi-timeframe.md
├── cost-vs-r.md
└── combinations/
    ├── trend-momentum.md
    ├── trend-volume.md
    ├── price-oi.md
    ├── oi-volume.md
    ├── funding-oi.md
    ├── rsi-macd.md
    └── multi-indicator.md
```
