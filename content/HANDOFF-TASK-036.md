# Content HANDOFF — TASK-036

Owner: Content Agent（本任务内兼做 Visual）  
Status: completed

## 完成内容

发布 Sprint 011 四课，并把接线接到已发布或本任务将发布的 slug。

- `perp-screen`：钱包余额 / 未实现盈亏 / 权益；三价；强平价；逐仓全仓；杠杆是展示；资金费倒计时；风险限额。正例先读标记价和强平再读 K 线。不教开户，不推荐交易所 / 杠杆。
- `liquidation-cascade`：强平单进薄盘 → 插针 → 连锁；量 / OI / CVD / 多空比可能同时失真；默认暂时不可解释方向；禁止条件空仓或只平不开。不教抄底、不预测结束。
- `order-types`：市价 / 限价 / 止损市价 / 止损限价；只减仓；post-only 一句；GTC / IOC / FOK 白话；最新价止损 vs 标记价强平；部分成交 / 未成交须事先写怎么算。无买卖按钮。
- `cost-vs-r`：同一笔数字贯穿。权益 10,000，1R = 100，名义 5,000，0.05%/8h，3 天，taker 开平各 0.05% → 资金费 22.5 USDT（0.225 R），手续费 5（0.05 R），合计 27.5（0.275 R）。标明教学演算，不能对账，不能代表未来。止损滑点不优于入场。

接线：

- introduction next → perp-screen
- cvd next → liquidation-cascade
- direction next → order-types（先修仍是 market-regime，未写 multi-timeframe）
- entry-rules 先修加上 order-types
- position-sizing next → cost-vs-r；删「回测专篇尚未写」
- risk-management 先修加上 cost-vs-r（next 仍是已发布的 trade-frequency，未改成未写的 account-heat）
- funding-rate / volume / open-interest：钩子链到本任务四课或已发布页

未改：`courseMeta.ts`、`pages/`（TASK-038 并行）。未改 market-regime next、trade-frequency next。

## 修改文件

```
content/00-introduction/perp-screen/index.md          # 新建
content/01-indicators/liquidation-cascade/index.md    # 新建
content/03-trading-system/order-types/index.md        # 新建
content/03-trading-system/cost-vs-r/index.md          # 新建
content/00-introduction/index.md                      # next → perp-screen；地图钩子
content/01-indicators/cvd/index.md                    # next → liquidation-cascade
content/01-indicators/funding-rate/index.md           # 费率 × 名义 × 周期数；链 cost-vs-r
content/01-indicators/volume/index.md                 # 强平时段巨量链瀑布
content/01-indicators/open-interest/index.md          # 瀑布中 OI 失真
content/03-trading-system/direction/index.md          # next → order-types
content/03-trading-system/entry-rules/index.md        # 先修加 order-types
content/03-trading-system/position-sizing/index.md    # next → cost-vs-r
content/03-trading-system/risk-management/index.md    # 先修加 cost-vs-r
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
docs/tasks/TASK-036-content-execution-layer.md
docs/tasks/TODO.md
content/HANDOFF-TASK-036.md
```

## 测试结果

- 四篇 published，Front Matter 的 part / category / order / slug / next / prereq 与 `docs/product/learning-path.md` 一致。
- 成本课同一笔算术写明：22.5 / 5.0 / 27.5 USDT 与 0.225 / 0.05 / 0.275 R；文内与 vis-026 均标明教学演算、不能对账、不能代表未来。
- 订单课区分最新价止损与标记价强平。
- 瀑布课默认「数据暂时不可解释方向」。
- 自检无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」。
- 示意图有橙底徽章与免责页脚；无买卖按钮。
- 站内链只指向已发布或本任务四课；未链未写的 multi-timeframe / account-heat / execution-bias 作为 next。
- 未跑 lint / typecheck / build（本任务只改 Markdown 与 SVG）。
- 未改 courseMeta / pages。`/course/perp-screen` 能否打开，依赖 TASK-038 的 `/course/[...slug]` 是否已合并。

## 已知问题

- **`/course/perp-screen` 依赖 TASK-038。** 课文与示意图已按该路径引用。038 未合并前，导学枢纽可以读，但屏幕课路由可能 404 或仍显示编写中。
- 阶段 3 旧课的 `order` 数字仍是升级前编号（如 direction 仍为 3）。课序以 learning-path 为准，目录排序留给 038 的 courseMeta。
- 真实行情窗未采。四课只用示意图。
- kline 的 prerequisites 未在本任务改（接线清单不含 kline）；learning-path 写的先修是 introduction + perp-screen。

## 下一步

- TASK-038：`/course/[...slug]`、`STAGE0_PATH_SLUGS`、合约层含清算瀑布、系统目录插入 order-types 与 cost-vs-r。
- TASK-037：多周期 / 热度 / 执行偏差 + 系统旧课修订。不要把 market-regime next 提前改成未发布的 multi-timeframe。
- TASK-039：按新课序抽查链接；走通导学 → 屏幕 → K 线，以及合约层收到瀑布。
- 不 git commit（本任务要求）。
