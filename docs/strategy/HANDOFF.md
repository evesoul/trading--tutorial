# HANDOFF — TASK-004 策略框架

Owner：Strategy Agent  
日期：2026-09-02  
状态：交付 QA / Content 阅读，任务 Status = review

## 完成内容

为 Part 2 指标组合与 Part 3 交易系统建立了可教学的策略框架，未写 `content/` 教程，未写代码，未提供交易信号。

已落实：

- 交易系统逻辑顺序：Market Regime → Direction → Setup → Entry → Stop Loss → Take Profit → Position Size → Exit → Review
- 每个组合都说明：各指标回答什么问题、共振与冲突、适用/失效环境、常见误区、风险
- 多指标课明确：**不是指标越多越准确**
- 回测课覆盖：样本数量、胜率、盈亏比、Profit Factor、最大回撤、连续亏损、交易成本、滑点；并说明不能只报胜率
- 无收益保证用语（已避开：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利）
- `system-template.md` 保留原 12 节，仅增加逻辑对照、填写说明和两则不编号补充

## 修改文件

```
docs/strategy/README.md
docs/strategy/system-template.md          （扩展，未删 12 节）
docs/strategy/risk-management.md
docs/strategy/position-sizing.md
docs/strategy/backtest.md
docs/strategy/HANDOFF.md
docs/strategy/combinations/trend-momentum.md
docs/strategy/combinations/trend-volume.md
docs/strategy/combinations/price-oi.md
docs/strategy/combinations/oi-volume.md
docs/strategy/combinations/funding-oi.md
docs/strategy/combinations/rsi-macd.md
docs/strategy/combinations/multi-indicator.md
docs/tasks/TASK-004-strategy-framework.md （Status → review，勾选验收）
```

未修改：`content/`、`docs/knowledge/`、`docs/product/`、代码与图表。

## 测试结果

本任务无代码。已做文档自检：

- 所需产出文件均已落地
- 组合文件均含：问题分工、共振/冲突、适用/失效、误区、风险、系统链路位置
- `system-template.md` 仍为第 1–12 节
- 全文检索违禁词：除 README 中的禁止清单外，无使用
- 未进行 lint / typecheck / build（无工程改动）
- 未做浏览器验证（无 UI）

## 已知问题

1. Knowledge 侧除 RSI 草稿外，多数指标定义尚未完成（TASK-002 仍在进行）。本框架按教学职责引用指标，不重写公式；Content 转写前需核对 Knowledge，避免两套定义。
2. Product 信息架构（TASK-001）已完成。组合 slug 与本目录 7 个文件对齐；**发布课序以 `docs/product/learning-path.md` 为准**（rsi-macd 为阶段 2 第 3 篇，不是第 6 篇）。本 README 的「建议顺序」是策略教学理由，Content 转写时跟学习路径。
3. 无真实图表。各组合文件末尾列出了 Visual 需求，需 Visual Agent 另立任务出图。真实行情图必须带 symbol、timeframe、source、period。
4. 回测与仓位中的数字均为标注过的教学算术，不是历史统计。QA 若发现未标注的数字，按内容事故处理。
5. 未更新 `docs/CHANGELOG.md` 与 `docs/collaboration/SPRINT-001.md`（超出本任务目录；建议 Product / 协调人补一条）。

## 核心策略原则（给后续 Agent）

1. 一个指标只回答一类问题。
2. 组合是观察框架，不是买卖指令。
3. 指标数量增加，并不等于判断更准。
4. 先环境，后形态；冲突时等待或空仓。
5. 止损、仓位、离场属于系统，不属于指标。
6. 回测看一组数字，不能只报胜率。
7. 永续有爆仓；不鼓励高杠杆。
8. 历史观察不能代表未来结果。

## 给 Content Agent：写组合课时的注意点

1. 先读 `docs/strategy/README.md` 和对应 `combinations/*.md`，再读 Knowledge。不要把框架里的“教学规则示例”抄成下单步骤。
2. 课时结构仍用 Content 规范：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 案例 → 常见错误 → 局限性 → 总结 → 下一步。
3. “怎么使用”写成观察步骤，并标明它落在链路的哪一步（通常是环境 / 方向 / 前提）。止损和仓位点到位置即可，细节链到系统课。
4. 每个组合至少一正一反：共振画面、以及冲突或失效。反案例不是“亏钱案例秀”，是机制失效。
5. 金叉、死叉、超买、超卖、背离、量价齐升、四象限，一律当观察工具。不要写成“出现即开多/开空”。
6. RSI + MACD、多指标两课是纠错课：作业是“删掉重复的问题槽”，不是“写出七重共振条件”。
7. Funding + OI 只教拥挤与持有成本、风险过滤；不要写成反向喊单。
8. 需要图时开 Visual Task。禁止虚构权益曲线或用假数据证明组合能赚钱。
9. 继续禁用：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利。也不要用“战法”“必涨”“稳准”做标题。
10. Part 3 用 `system-template.md` 当作业纸。完整案例是“如何写系统”，不是推荐策略。

## 下一步建议

| 对象 | 建议 |
|---|---|
| QA Agent | 按 `docs/qa/content-checklist.md` 审策略文档的交易表述、违禁词、是否写成信号 |
| Content Agent | 等 TASK-002 指标定义就绪后，按本目录转写 Part 2；不要提前写可执行条件清单 |
| Visual Agent | 按各组合文件“给 Visual Agent”小节出示意图规格；组合图放 `combination/` |
| Knowledge Agent | 补齐 EMA、MACD、Volume、OI、Funding 等定义，便于与本框架交叉引用 |
| Product Agent | 把本 README 的组合顺序纳入学习路径；案例页需标明“非信号” |
| 协调人 | 更新 Sprint 状态与 CHANGELOG；不要 git commit（本任务按用户要求未提交） |

## 建议的组合课顺序

1. 趋势 + 动量（EMA+RSI，再 EMA+MACD）
2. 趋势 + 成交量（EMA+Volume，再 Price+Volume）
3. 价格 + OI
4. OI + Volume
5. Funding + OI
6. RSI + MACD（纠错：信息重复）
7. 多指标共振（收束：不是越多越准 → 进入系统模板）
