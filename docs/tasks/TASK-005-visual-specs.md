# Agent Task

## Task ID
TASK-005

## Title
第一批教学视觉规格与示意图

## Owner
Visual Agent

## Goal
为第一批教学图建立 Visual Spec，并产出可标记为「示意图」的 SVG / 说明图，降低后续 Content 配图成本。禁止用虚构行情证明盈利。

## Scope
- `docs/visual/`
- `public/images/`（仅示意图 / 流程图，必须标记为示意图）

## Out of Scope
- 伪造真实行情 K 线图并当作实盘
- 修改 `content/` 正文
- 实现 Vue 图表组件（属 UI / Nuxt）

## Input
- `AGENTS.md` 第 7 节图表原则
- `docs/prompts/visual-agent.md`
- `docs/visual/README.md`

## Output
- 更新 `docs/visual/README.md` 目录与分类
- Spec 文件（YAML 或 Markdown）至少覆盖：
  - K 线结构（OHLC）
  - EMA 趋势
  - MACD 柱与交叉
  - RSI 超买超卖
  - Volume
  - Open Interest
  - Funding Rate
  - 交易系统流程
- 对应示意图放入：
  - `public/images/concept/`
  - `public/images/flow/`
- `docs/visual/HANDOFF.md`

每张图的 Spec 必须包含：
```yaml
id:
title:
type: schematic | flow | real-chart
purpose:
teaching_question:
symbol:
timeframe:
source:
period:
annotations:
status: spec | delivered
```

真实行情图若暂无数据源：只写 Spec，`type: real-chart`，`status: spec`，不要伪造。

## Acceptance Criteria
- [x] 每张图能回答「用户看完应理解什么」
- [x] 示意图文件名或图内明确写「示意图」
- [x] 无虚假盈利图
- [x] README 可检索全部 spec
- [x] 留下 HANDOFF

## Status
completed
