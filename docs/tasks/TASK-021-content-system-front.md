# Agent Task

## Task ID
TASK-021

## Title
阶段 3 前八篇：系统到仓位

## Owner
Content Agent

## Goal
按学习路径写完阶段 3 前八篇。修订多指标共振文末，使第一篇系统课可点。导学改为阶段 3 前半可学。

## Scope
- `content/03-trading-system/what-is-a-trading-system/`
- `content/03-trading-system/market-regime/`
- `content/03-trading-system/direction/`
- `content/03-trading-system/entry-rules/`
- `content/03-trading-system/exit-rules/`
- `content/03-trading-system/stop-loss/`
- `content/03-trading-system/take-profit/`
- `content/03-trading-system/position-sizing/`
- `content/02-combinations/multi-indicator/index.md`（只改下一步）
- `content/00-introduction/index.md`（阶段 3 前半可学；后七篇仍未写）
- `content/HANDOFF-SPRINT-006.md`

## Out of Scope
- risk-management / trade-frequency / trading-journal / backtesting / statistics / system-optimization / case-study
- 改 `docs/knowledge/`、`docs/strategy/`
- 伪造真实行情或权益曲线
- git commit / push

## Input
- `docs/product/learning-path.md` 阶段 3 表
- `docs/strategy/system-template.md`
- `docs/strategy/position-sizing.md`
- `docs/strategy/README.md` 原则与禁止表述
- 课文样板：`content/02-combinations/trend-momentum/index.md`
- 图：必须引用 vis-008。若已有 vis-017 / vis-018 则引用。

## Front Matter

| slug | order | prereq | next |
|---|---|---|---|
| what-is-a-trading-system | 1 | kline, ma, ema, rsi, trend-momentum | market-regime |
| market-regime | 2 | what-is-a-trading-system | direction |
| direction | 3 | market-regime | entry-rules |
| entry-rules | 4 | direction | exit-rules |
| exit-rules | 5 | entry-rules | stop-loss |
| stop-loss | 6 | exit-rules | take-profit |
| take-profit | 7 | stop-loss | position-sizing |
| position-sizing | 8 | stop-loss | 可写 `risk-management` 但不链 404 |

全部 `status: published`，`part: 3`，`category: trading-system`，`level: intermediate`。

目录必须是 `content/03-trading-system/{slug}/index.md`。

## 必须写清
- 本站不是信号、荐股、喊单或自动交易
- 禁止：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利
- 系统是事先写好的规则 + 记录，不是找一个准指标
- 环境先于方向；方向是偏多 / 偏空 / 不交易，不是下单
- 入场拆成前提 + 触发；出场先有框架再拆止损止盈
- 止损必须早于止盈和加仓；止损 ≠ 强平
- 仓位由单笔亏损上限反推，不是先想赚多少
- 教学示例只说明「如何写规则」，不是推荐策略
- `position-sizing` 文末回 `/course`，不要 `/trading-system/risk-management`
- `multi-indicator` 文末可链 [什么是交易系统](/trading-system/what-is-a-trading-system)

插图：`![…示意图](/images/concept/….svg)` 或 vis-008 的 `/images/flow/vis-008-trading-system-flow.svg`。alt 含「示意图」。不要插 vis-101–107。

## Acceptance Criteria
- [x] 八篇 published，结构完整
- [x] 共振文末可点 what-is-a-trading-system
- [x] 无未发布 404 链接
- [x] 示意图标明示意图
- [x] HANDOFF

## Status
completed
