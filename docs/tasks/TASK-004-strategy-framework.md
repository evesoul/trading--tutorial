# Agent Task

## Task ID
TASK-004

## Title
指标组合与交易系统策略框架

## Owner
Strategy Agent

## Goal
为 Part 2 指标组合和 Part 3 交易系统建立可教学的策略框架，说明每个指标解决什么问题，以及风险/回测应看哪些数字。

## Scope
- `docs/strategy/`

## Out of Scope
- `content/` 教程正文
- `docs/knowledge/` 指标定义（可引用，不重写）
- 代码、回测实现、真实交易信号

## Input
- `AGENTS.md`
- `docs/prompts/strategy-agent.md`
- `docs/strategy/system-template.md`
- `docs/architecture/project.md`

## Output
- `docs/strategy/README.md`
- `docs/strategy/combinations/trend-momentum.md`（趋势 + 动量，含 EMA+RSI、EMA+MACD）
- `docs/strategy/combinations/trend-volume.md`（趋势 + 成交量，含 EMA+Volume、Price+Volume）
- `docs/strategy/combinations/price-oi.md`
- `docs/strategy/combinations/oi-volume.md`
- `docs/strategy/combinations/funding-oi.md`
- `docs/strategy/combinations/rsi-macd.md`
- `docs/strategy/combinations/multi-indicator.md`（多指标共振，强调不是越多越准）
- `docs/strategy/risk-management.md`
- `docs/strategy/position-sizing.md`
- `docs/strategy/backtest.md`
- `docs/strategy/HANDOFF.md`
- 如需补充，可扩展 `docs/strategy/system-template.md`，不要删掉原有结构

每个组合文件必须包含：
- 每个指标各自回答什么问题
- 共振 / 冲突时怎么处理
- 适用与失效的市场环境
- 常见误区
- 风险提示

## Acceptance Criteria
- [x] 不声称指标越多越准确
- [x] 回测文档不只看胜率
- [x] 无收益保证用语
- [x] 系统模板仍可用于后续完整案例
- [x] 留下 HANDOFF

## Status
completed
