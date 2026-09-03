# Visual HANDOFF — TASK-036

Owner: Visual Agent（本任务与 Content 同 Sprint）  
Status: completed

## 完成内容

为 Sprint 011 四课交付示意图：vis-030 交易所屏幕、vis-024 订单类型、vis-027 清算瀑布失真、vis-026 成本对照 R。四张都是教学抽象几何，图内有橙底「示意图」徽章，页脚为「教学抽象 · 非真实行情 · 不构成交易建议」。字号 ≥ 14px，中文。无买卖按钮。

- vis-030：权益 / 未实现盈亏 / 钱包余额、三价、预估强平、资金费倒计时、风险限额。阅读顺序：先标记价和强平，再读 K 线。
- vis-024：市价 / 限价 / 止损单 / 只减仓四格；同一轴上最新价止损与标记价强平可以不同步。
- vis-027：价格插针 + 量 / OI / CVD 同时失真。中心命题：暂时不可解释方向。
- vis-026：同一笔教学数字拆成资金费 22.5（0.225 R）、手续费 5（0.05 R）、合计 27.5（0.275 R）。标明教学演算，不能对账。

## 修改文件

```
public/images/concept/vis-024-order-types.svg
public/images/concept/vis-026-cost-vs-r.svg
public/images/concept/vis-027-liquidation-cascade.svg
public/images/concept/vis-030-perp-screen.svg
docs/visual/specs/vis-024-order-types.md
docs/visual/specs/vis-026-cost-vs-r.md
docs/visual/specs/vis-027-liquidation-cascade.md
docs/visual/specs/vis-030-perp-screen.md
docs/visual/README.md
docs/visual/HANDOFF.md
docs/visual/HANDOFF-TASK-036.md
```

## 测试结果

- 四张图均可 UTF-8 读出「示意图」「教学抽象」
- 无「买入 / 卖出 / 现在开多」按钮文案
- spec 与 README 索引已更新为 delivered
- vis-025 / 028 / 029 仍为 planned

## 已知问题

- 示意图把屏幕画成抽象字段板，不是某家交易所截图。`/course/perp-screen` 路由依赖 TASK-038 的 `/course/[...slug]`，图本身不依赖路由。
- vis-026 的 0.275 R 与滑点 0.03 R 分开画，避免被读成精确账单。

## 下一步

- Content 已引用上述四张 SVG。
- vis-025 / 028 / 029 留给 TASK-037。
- 不 git commit（本任务要求）。
