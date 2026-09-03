# HANDOFF — 教程全量升级收口

## 完成内容

Sprint 009–013 已落地。TASK-039 终审 APPROVE（2026-09-03）。课序以 `docs/product/learning-path.md` 为准，与 page-map、`courseMeta`、导学地图 slug 一致。

- 阶段 0：怎么学 + 交易所屏幕
- 阶段 1：主路径含摆动结构与 ATR；KDJ 对照层；合约层含清算瀑布
- 阶段 2：七篇，不新开振荡器配对
- 阶段 3：二十篇（含多周期、订单、成本对照 R、账户热度、执行偏差）
- `/course` 枢纽；`/course/perp-screen` 独立页
- 产品 IA 阶段 3 已改为「二十篇已发布」

## 已知问题

1. **真实行情 vis-101–130 已挂到对应课文。** 阶段 2 七篇组合、阶段 3 读图格各有单磁带教学窗。KDJ 对照层仍只用示意图。仓位 / 成本 / 热度 / 回测等保持作业纸，不填成绩。
2. **Nitro 上游 `H3Error` unused import 警告**（原有，不挡通过）。
3. Sprint 001–006 历史测试脚本仍按当时课序，不是本轮验收命令。

## 关键产品决策（请勿静默改掉）

1. 不新开第四个振荡器，不新开 KDJ+RSI。KDJ 留在对照层。
2. 已发布 slug 不改名。新能力能并进旧课的，不另开篇。
3. `introduction` → `/course`；`perp-screen` → `/course/perp-screen`。不建 `/introduction`。
4. 系统模板保持 12 节编号。
5. 案例可写执行时间线，不可填成绩单或证明有效。
6. 本站不做信号、荐股、自动交易、交易终端。订单课只用示意图。
7. 改课序只改 `learning-path.md`，再改 page-map 与 courseMeta。

## 给下一波

升级与 vis-101–130 冻结窗已结束，不需要再改课序。合入前由人审再 commit。
