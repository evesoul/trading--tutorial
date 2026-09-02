# Agent Task

## Task ID
TASK-017

## Title
阶段 2：七篇指标组合课

## Owner
Content Agent

## Goal
按学习路径写完阶段 2 七篇。修订 CVD 文末，使第一篇组合课可点。导学与术语里「阶段 2 尚未写」改为可学。

## Scope
- `content/02-combinations/trend-momentum/`
- `content/02-combinations/trend-volume/`
- `content/02-combinations/rsi-macd/`
- `content/02-combinations/price-oi/`
- `content/02-combinations/oi-volume/`
- `content/02-combinations/funding-oi/`
- `content/02-combinations/multi-indicator/`
- `content/01-indicators/cvd/index.md`（只改下一步）
- `content/00-introduction/index.md`（阶段 2 从「还没写」改为可学；阶段 3 仍未写）
- `content/glossary/`（合约数据词条若仍写「课文尚未发布」，改为可点已发布课）
- `content/HANDOFF-SPRINT-005.md`

## Out of Scope
- 阶段 3 正文
- 改 `docs/knowledge/`、`docs/strategy/`
- 伪造真实行情
- git commit / push

## Input
- `docs/product/learning-path.md` 阶段 2 表（课序以此为准）
- `docs/strategy/combinations/*.md`（先读框架，再读 Knowledge）
- `docs/knowledge/indicators/` 对应定义
- `docs/strategy/README.md`「给 Content Agent」
- 已有课文结构：`content/01-indicators/rsi/index.md`
- 图：可复用 vis-002 EMA、vis-003 MACD、vis-004 RSI、vis-005 Volume、vis-006 OI、vis-007 Funding。若已有 vis-013+ 组合示意图则引用。

## Front Matter

| slug | order | prereq | next |
|---|---|---|---|
| trend-momentum | 1 | ema, rsi | trend-volume |
| trend-volume | 2 | kline, ema, volume | rsi-macd |
| rsi-macd | 3 | rsi, macd | price-oi |
| price-oi | 4 | kline, open-interest | oi-volume |
| oi-volume | 5 | open-interest, volume | funding-oi |
| funding-oi | 6 | funding-rate, open-interest | multi-indicator |
| multi-indicator | 7 | trend-momentum（建议前 6 篇） | 可写 `what-is-a-trading-system` 但不链 404 |

全部 `status: published`，`part: 2`，`category: combinations`，`level: intermediate`。

目录必须是 `content/02-combinations/{slug}/index.md`。不要写成 `trend_momentum` 或独立配对路由。

## 结构（每篇）
学习目标 → 概念（各指标回答什么问题）→ 观察步骤 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。

不重讲公式。首次出现术语解释一句。至少一正一反。反例是机制失效，不是亏钱秀。

## 必须写清
- 组合用来对照，不是叠加信号
- 禁止：一定、必然、100%准确、稳赚、必赚、无风险、保证盈利
- 金叉 / 超买 / 背离 / 量价齐升都是观察，不是开仓指令
- `trend-momentum`：EMA 管方向，RSI/MACD 管力度；震荡里交叉反复是常见失效
- `trend-volume`：价和量是两个问题
- `rsi-macd`：两个副图一致或分歧只说明观察冲突，不自动给出方向
- `price-oi`：四象限观察；OI 分不清谁开的仓
- `oi-volume`：流量 vs 存量，专门拆开
- `funding-oi`：拥挤与持仓成本，不是反向喊单
- `multi-indicator`：共振是多个问题得到相近答案，**不是指标越多越准确**；文末回 `/course`，不要 `/trading-system/what-is-a-trading-system`

CVD 文末：阶段 2 已开，可链 [趋势 + 动量](/combinations/trend-momentum)。

插图：`![…示意图](/images/concept/….svg)`，alt 含「示意图」。不要插 vis-101–107。

## Acceptance Criteria
- [ ] 七篇 published，结构完整
- [ ] CVD 文末可点 trend-momentum
- [ ] 无未发布 404 链接
- [ ] 示意图标明示意图
- [ ] HANDOFF

## Status
in-progress
