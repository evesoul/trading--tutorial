# Agent Task

## Task ID
TASK-025

## Title
阶段 3 后七篇：风险到案例

## Owner
Content Agent

## Goal
写完阶段 3 最后七篇。修订仓位文末，使风险管理可点。导学改为阶段 3 全部可学。

## Scope
- `content/03-trading-system/risk-management/`
- `content/03-trading-system/trade-frequency/`
- `content/03-trading-system/trading-journal/`
- `content/03-trading-system/backtesting/`
- `content/03-trading-system/statistics/`
- `content/03-trading-system/system-optimization/`
- `content/03-trading-system/case-study/`
- `content/03-trading-system/position-sizing/index.md`（只改下一步）
- `content/00-introduction/index.md`（阶段 3 全部可学）
- `content/HANDOFF-SPRINT-007.md`

## Out of Scope
- 改 `docs/knowledge/`、`docs/strategy/`
- 伪造真实行情、权益曲线或回测成绩
- git commit / push

## Input
- `docs/product/learning-path.md` 阶段 3 表 9–15
- `docs/strategy/risk-management.md`
- `docs/strategy/backtest.md`
- `docs/strategy/system-template.md`
- `docs/strategy/README.md`
- 样板：`content/03-trading-system/position-sizing/index.md`
- 图：可复用 vis-008。若已有 vis-019 / vis-020 则引用。

## Front Matter

| slug | order | prereq | next |
|---|---|---|---|
| risk-management | 9 | position-sizing | trade-frequency |
| trade-frequency | 10 | risk-management | trading-journal |
| trading-journal | 11 | what-is-a-trading-system | backtesting |
| backtesting | 12 | trading-journal | statistics |
| statistics | 13 | backtesting | system-optimization |
| system-optimization | 14 | statistics | case-study |
| case-study | 15 | 建议前 14 篇 | 不要链未发布页；文末回 `/course` |

全部 `status: published`，`part: 3`，`category: trading-system`，`level: intermediate`。

目录：`content/03-trading-system/{slug}/index.md`。

## 必须写清
- 禁止：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利
- 风险回答「错了能否活下来」，不回答「对了能赚多少」
- 高杠杆不是效率；本站不鼓励高杠杆
- 频率影响手续费、滑点、情绪；有规则不等于该高频
- 没有日志就无法谈优化
- 回测检验规则，不是寻找曲线最好的参数；必须提手续费 / 资金费 / 滑点
- 胜率只是其中一个数字
- 优化写过拟合
- `case-study` 是符合模板的教学作业纸，说明过程，**不证明该系统有效**，不是跟单对象
- `position-sizing` 文末可链 [风险管理](/trading-system/risk-management)
- `case-study` 文末回 `/course`

插图 alt 含「示意图」。不要插 vis-101–107。不要贴虚构绩效表。

## Acceptance Criteria
- [x] 七篇 published
- [x] 仓位文末可点 risk-management
- [x] 案例文末回 /course，无死链
- [x] 无违禁词，无虚假成绩
- [x] HANDOFF

## Status
completed
