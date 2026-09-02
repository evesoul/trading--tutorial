# Agent Task

## Task ID
TASK-002

## Title
第一部分指标知识库

## Owner
Knowledge Agent

## Goal
建立全部 Part 1 指标与永续合约基础术语的知识底座，供 Content Agent 转写成教程。

## Scope
- `docs/knowledge/`

## Out of Scope
- `content/` 教程正文
- `docs/strategy/` 组合与系统规则
- 代码与图表文件

## Input
- `AGENTS.md`
- `docs/prompts/knowledge-agent.md`
- `docs/knowledge/README.md`
- `docs/knowledge/indicators/RSI.md`（已有草稿，需按 10 问补全）

## Output
必须产出（中文为主，术语给出中英对照）：
- `docs/knowledge/README.md`（更新索引）
- `docs/knowledge/glossary.md`
- `docs/knowledge/perpetual-futures.md`（U 本位永续合约、保证金、杠杆、强平、资金费率概念）
- `docs/knowledge/indicators/kline.md`
- `docs/knowledge/indicators/ma.md`
- `docs/knowledge/indicators/ema.md`
- `docs/knowledge/indicators/macd.md`
- `docs/knowledge/indicators/rsi.md`（在现有 RSI.md 基础上补全；可保留或规范文件名为 rsi.md）
- `docs/knowledge/indicators/kdj.md`
- `docs/knowledge/indicators/bollinger-bands.md`
- `docs/knowledge/indicators/volume.md`
- `docs/knowledge/indicators/open-interest.md`
- `docs/knowledge/indicators/funding-rate.md`
- `docs/knowledge/indicators/long-short-ratio.md`
- `docs/knowledge/indicators/cvd.md`
- `docs/knowledge/HANDOFF.md`

每个指标文件必须回答：
1. 它是什么？
2. 它测量什么？
3. 如何计算？（教学级，不必写成代码）
4. 如何观察？
5. 常见参数
6. 典型形态
7. 什么情况下有用
8. 什么情况下容易失效
9. 常见误区
10. 可以与哪些指标组合

## Acceptance Criteria
- [x] 12 个指标均有独立知识文件
- [x] 术语首次出现有解释
- [x] 无「一定 / 必然 / 稳赚 / 无风险」等违禁表述
- [x] RSI 与现有草稿不冲突，且更完整
- [x] 知识库 README 可检索全部条目
- [x] 留下 HANDOFF

## Status
completed
