# Content HANDOFF — TASK-037

Owner: Content Agent  
Status: completed（课文与 vis-025 / 028 / 029 / vis-008 修订均已落地）

## 完成内容

阶段 3 收束到二十篇。三篇新课 published，旧课按总纲第 4 节轻修钩子，Front Matter 与 `docs/product/learning-path.md` 二十篇表对齐。

### 新建三篇

- `multi-timeframe`（order 3）：决策 / 执行周期事先写死；高周期定场，低周期只找触发；打架默认不交易；未收盘低周期不能推翻已收盘高周期。不教三层共振。正例：4H 偏空仍在，15m 金叉只记回撤。反例：下午切 5 分钟用密交叉代替规则。图：`/images/concept/vis-025-multi-timeframe.svg`（路径先写上）。
- `account-heat`（order 13）：热度 = 未平仓计划风险之和；三笔各 1% 同向或都跟 BTC ≠ 分散；碰到上限先平 / 先减 / 禁止开新；列出方向、是否跟 BTC、单笔 R 再加总。不教对冲公式。图：`/images/concept/vis-029-account-heat.svg`。
- `execution-bias`（order 15）：总纲偏差表写成课文，每条对应日志字段 + 事先动作。正例：错过之后空仓。反例：市价追再收止损。不写鸡汤。图：`/images/concept/vis-028-execution-bias.svg`。

vis-008 仍引用 `/images/flow/vis-008-trading-system-flow.svg`。

### Front Matter 接线

二十篇 `order` / `prerequisites` / `next` 已按学习路径表填写。`kline` 先修加上 `perp-screen`。`case-study` 先修含三篇新课 + `order-types` + `cost-vs-r`，`next: []`。`execution-bias` 额外加了 `risk-management`（总纲 3.9 允许）。`risk-management` 仍保留 `position-sizing` 为先修（原有），`next` 改为 `account-heat`。

### 旧课轻修（不重写主旨）

链路 / 钩子：`what-is-a-trading-system`、`market-regime`、`direction`、`entry-rules`、`exit-rules`、`stop-loss`、`take-profit`、`position-sizing`、`risk-management`、`trade-frequency`、`trading-journal`、`backtesting`、`statistics`、`system-optimization`、`case-study`。

组合钩子：`trend-momentum`、`rsi-macd` 不叠 KDJ，周期冲突链 `multi-timeframe`；`funding-oi` 成本反例链 `cost-vs-r`；`multi-indicator` 结构可占方向槽，对齐不能加杠杆。

`position-sizing` 无「回测专篇尚未写」。`case-study` 新增「匿名执行时间线」：看到什么、挂了什么单、滑点、收过一次资金费、日志怎么记。**不填胜率、收益率、曲线。**

## 修改文件

```
content/03-trading-system/multi-timeframe/index.md      # 新建
content/03-trading-system/account-heat/index.md         # 新建
content/03-trading-system/execution-bias/index.md       # 新建
content/01-indicators/kline/index.md                    # 先修加 perp-screen
content/03-trading-system/what-is-a-trading-system/index.md
content/03-trading-system/market-regime/index.md
content/03-trading-system/direction/index.md
content/03-trading-system/entry-rules/index.md
content/03-trading-system/exit-rules/index.md
content/03-trading-system/stop-loss/index.md
content/03-trading-system/take-profit/index.md
content/03-trading-system/position-sizing/index.md
content/03-trading-system/risk-management/index.md
content/03-trading-system/trade-frequency/index.md
content/03-trading-system/trading-journal/index.md
content/03-trading-system/backtesting/index.md
content/03-trading-system/statistics/index.md
content/03-trading-system/system-optimization/index.md
content/03-trading-system/case-study/index.md
content/02-combinations/trend-momentum/index.md
content/02-combinations/rsi-macd/index.md
content/02-combinations/funding-oi/index.md
content/02-combinations/multi-indicator/index.md
content/HANDOFF-TASK-037.md
```

未改：`courseMeta.ts`、`pages/`、`docs/strategy/`、`docs/knowledge/`、`docs/tasks/TASK-037`（保持 in-progress，避免抢标 completed）。未 git commit。

## 测试结果

- 三篇新课 published；结构为学习目标 → 概念 → 怎么写规则 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。
- 二十篇 Front Matter 与学习路径 order / 先修 / next 一致（目视 + 脚本抽查）。
- 自检无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」。
- 案例时间线无胜率、收益率、曲线数字。无推荐杠杆。无 KDJ+RSI 新课。
- `position-sizing` 无「回测专篇尚未写」。
- 未跑 lint / typecheck / build（本任务只改 Markdown）。
- 未改 UI 目录；二十篇能否在 `/trading-system` 按新序出现，依赖 TASK-038。

## 已知问题

- Visual 已齐：`docs/visual/HANDOFF-TASK-037.md`。课文路径与 SVG 文件名一致。
- 真实行情窗未采。新课只用示意图。
- 导学枢纽是否仍写「阶段 3 十五篇」，由 TASK-039 核对。

## 下一步

- TASK-039 终审。
