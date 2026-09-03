# HANDOFF — TASK-033 升级所需策略框架

Owner：Strategy Agent  
日期：2026-09-03  
状态：交付 Content / QA 阅读，任务 status = completed

## 完成内容

按 `docs/product/curriculum-upgrade.md` 第 3.5–3.9、第 4 节系统课修订、第 6.3 节、第 7.2 节，补齐教程升级所需的策略框架。未写 `content/`，未新开组合一级主题，未提供可跟单规则，未颁布推荐杠杆或标准仓位百分比。

已落实：

- 新建 `execution.md`：规则如何变成可能成交的单；市价 / 限价 / 止损市价 / 止损限价；只减仓；部分成交；未成交必须事先选定「视为未入场」或「按已成交重算」；最新价止损 vs 标记价强平。对应模板第 6、7 节。
- 新建 `multi-timeframe.md`：决策周期与执行周期事先写死；高周期定场，低周期只找触发；打架默认不交易或等对齐；未收盘低周期不能推翻已收盘高周期。不是三层周期共振系统。对应模板第 3、4、5 节。
- 新建 `cost-vs-r.md`：1R = 入场到计划止损的亏损金额。同一笔教学数字贯穿：权益 10,000；1R = 100；名义 5,000；费率 0.05%/8h；持有 3 天（9 个周期）；taker 开平各 0.05%。演算：资金费 22.5 USDT = 0.225 R，手续费 5.0 USDT = 0.05 R，合计 27.5 USDT = 0.275 R。标明教学演算、忽略部分费用、不能对账、不能代表未来。止损滑点不优于入场。期望必须减成本。对应模板第 9、11 节。
- `system-template.md` 仍为第 1–12 节。仅在填写说明与文末补充写入多周期、订单、止损价格口径、热度、事件 / 周末 / 连续强平 / 执行偏差、样本外与滚动前进、复盘字段。
- `risk-management.md`：账户热度、BTC 共同风险因子、换交易对不是分散、事件 / 周末 / 连续强平、回撤恢复算术（亏 20% 需 +25%）、执行偏差表。
- `position-sizing.md`：强平远于止损若干 ATR（不颁布标准倍数）、风险限额升高 MM、盈利加仓重算总热度、摊平仍是反模式。
- `backtest.md`：样本外 / 滚动前进（A 段调、B 段只验证、不许再调）；收盘成交 vs 盘中止损；止损滑点不优于入场。
- `combinations/rsi-macd.md`：硬约束——冲突时回结构 / 环境，不要再叠 KDJ 或第三把动量尺。未扩写成新课。
- `README.md`：三份新文件已挂索引；链路已含多周期 / 订单 / 成本 / 热度；目录树已补文件名。

无收益保证用语（已避开：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利）。

## 修改文件

```
docs/strategy/README.md
docs/strategy/HANDOFF.md
docs/strategy/execution.md              （新建）
docs/strategy/multi-timeframe.md        （新建）
docs/strategy/cost-vs-r.md              （新建）
docs/strategy/system-template.md        （填写说明与文末补充，未改 1–12 编号）
docs/strategy/risk-management.md
docs/strategy/position-sizing.md
docs/strategy/backtest.md
docs/strategy/combinations/rsi-macd.md
docs/tasks/TASK-033-strategy-upgrade.md （status → completed，勾选验收）
```

未修改：`content/`、`docs/knowledge/`、`docs/product/`、`pages/`、`components/`、`public/`。

## 测试结果

本任务无代码。已做文档自检：

- 三份新文件均含：教学目的、先分清概念、误区、给 Content Agent、在 12 节模板中的位置
- `system-template.md` 仍为第 1–12 节（`## 1` … `## 12`）
- 成本例题字段齐全，算术：22.5 + 5.0 = 27.5 USDT = 0.275 R
- 回撤恢复：亏 20% 后剩余 80%，回到原点需 +25%
- 全文检索违禁词：除禁止清单与 HANDOFF 自检句外，无当作承诺使用
- 未新开组合一级主题；rsi-macd 只加硬约束，未扩课
- 未进行 lint / typecheck / build（无工程改动）
- 未做浏览器验证（无 UI）

## 已知问题

1. Knowledge 的 `order-types.md`、`perp-screen.md`、ATR / 结构等条目由 TASK-032 交付。本框架按教学职责引用，不重写定义。Content 转写前需核对 Knowledge，避免两套术语。
2. 成本例题按「持有期间持续支付资金费」单向假设，并写明忽略点差变动、强平罚金、多空不对称、返佣等。QA 若发现未标注「教学演算」的数字，按内容事故处理。
3. 热度与执行偏差写在 `risk-management.md`，不另开策略文件。Content `account-heat` / `execution-bias` 转写本文件，不要另编公式。
4. 无真实图表。新文件末尾列出 Visual 需求（vis-024 / 025 / 026 / 028 / 029）。示意图未交付前课文不插假行情。
5. 未更新 `docs/CHANGELOG.md` 与 Sprint 文档（超出本任务目录）。
6. 按用户要求未 git commit。

## 下一步（Content 可转写）

| Content 任务 | 转写本目录 |
|---|---|
| TASK-035 | 结构 / ATR 接线时可引用模板第 7 节（ATR 或结构并列）及仓位里的强平–ATR 检查；不在本任务写课文 |
| TASK-036 | `order-types` ← `execution.md`；`cost-vs-r` ← `cost-vs-r.md`；瀑布 / 屏幕课不在本目录 |
| TASK-037 | `multi-timeframe` ← `multi-timeframe.md`；`account-heat`、`execution-bias` ← `risk-management.md`；系统旧课修订对照模板填写说明与 `backtest.md` |

转写时：

1. 先读本 README 的原则和禁止表述，再读对应框架文件。
2. 不要把教学规则示例抄成下单步骤。
3. 成本课必须用同一笔数字贯穿，并标明教学演算、不能对账、不能代表未来。
4. 多周期课不要写成三层共振系统。
5. 继续禁用：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利。

| 对象 | 建议 |
|---|---|
| QA Agent | 按内容清单审交易表述、违禁词、12 节编号、是否写成信号 |
| Visual Agent | vis-024 订单、vis-025 多周期、vis-026 成本占 R、vis-028 执行偏差、vis-029 热度 |
| Knowledge Agent | TASK-032 完成后与本框架交叉引用订单、ATR、屏幕字段 |
| 协调人 | 更新 Sprint / CHANGELOG；不要 git commit（本任务按用户要求未提交） |
