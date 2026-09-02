# Agent Task

## Task ID
TASK-020

## Title
Sprint 005 质量终审

## Owner
QA Agent

## Goal
审阶段 2 七篇组合课、vis-013–016、课程页三段路径。三项 PASS 才能 APPROVE。

## Scope
- `tests/`、`docs/qa/`、本任务文件

## 必查
- lint / typecheck / build
- 七篇：组合对照不是叠加信号；无违禁词；金叉 / 超买 / 背离 / 量价齐升不是开仓指令
- `funding-oi` 不是反向喊单；`multi-indicator` 写明不是指标越多越准确
- CVD 可点 `/combinations/trend-momentum`；`multi-indicator` 无 `/trading-system/what-is-a-trading-system`
- vis-013–016 存在，alt 含示意图；016 否定「越多越准确」
- `/course` 主路径 8 + 合约层 4 + 组合 7 可点
- Desktop + Mobile 390 菜单（CDP 可；浏览器 MCP 常不可用）

## Output
`docs/qa/QA-RESULT-SPRINT-005.md`；Status → review

## Status
in-progress
