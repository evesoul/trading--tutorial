# Visual HANDOFF — TASK-037

Owner: Visual Agent（本任务与 Content 同 Sprint）  
Status: completed

## 完成内容

为 Sprint 012 三课交付示意图，并轻修 vis-008 流程格。三张新图都是教学抽象几何，图内有橙底「示意图」徽章，页脚为「教学抽象 · 非真实行情 · 不构成交易建议」。字号 ≥ 14px，中文。无买卖按钮，无「风控后收益更高」。

- vis-025：三格。4H 已收盘偏空环境仍在；15m 金叉只标「回撤，不是改方向」；打架则空仓或等对齐。禁止切周期、第三根当裁判、未收盘推翻已收盘。
- vis-028：表格式三列（偏差 / 日志字段 / 事先动作），七行对齐风险文档执行偏差表。不是鸡汤海报。
- vis-029：三笔各 1R、同向或都跟 BTC，满额加总 3R，对照教学上限 2R。热度是计划风险之和，不是保证金占用。
- vis-008：仓位格之后插入「订单 / 成本 / 热度」三格，标注「开仓前检查，不是收益终点」。文件名未改。

## 修改文件

```
public/images/concept/vis-025-multi-timeframe.svg
public/images/concept/vis-028-execution-bias.svg
public/images/concept/vis-029-account-heat.svg
public/images/flow/vis-008-trading-system-flow.svg
docs/visual/specs/vis-025-multi-timeframe.md
docs/visual/specs/vis-028-execution-bias.md
docs/visual/specs/vis-029-account-heat.md
docs/visual/specs/vis-008-trading-system-flow.md
docs/visual/README.md
docs/visual/HANDOFF.md
docs/visual/HANDOFF-TASK-037.md
```

## 测试结果

- 四张图均可 UTF-8 读出「示意图」与「教学抽象 · 非真实行情 · 不构成交易建议」
- 图内无 font-size 小于 14 的字
- 无「买入 / 卖出 / 现在开多」按钮文案
- 无「风控后收益更高」
- spec 与 README 索引：vis-025 / 028 / 029 已从 planned 改为 delivered

## 已知问题

- vis-025 用抽象阴线 / 阳线示意 4H 与 15m，不是某品种真实行情；交叉只标观察。
- vis-029 的 2R 上限是教学演算，不是标准仓位。
- 课文引用由 Content Agent 在 TASK-037 正文里插入；本批不改 `content/`。

## 下一步

- Content 引用 vis-025 / 028 / 029，并把 vis-008 换成修订后的流程。
- 不 git commit（本任务要求）。
