# Project Tasks

## Foundation
- [x] 初始化 Nuxt 项目（TASK-003）
- [x] 配置 Nuxt Content（TASK-003）
- [x] 配置 TypeScript（TASK-003）
- [x] 建立目录结构（TASK-003）
- [x] 建立 Content Schema（TASK-003）
- [x] 建立基础 UI（TASK-007，completed）
- [x] 产品信息架构（TASK-001，completed）
- [x] 指标知识库（TASK-002，completed）
- [x] 策略框架（TASK-004，completed）
- [x] 视觉规格（TASK-005，completed）

## Part 1 — 指标
- [x] K线（TASK-006）
- [x] 趋势线与支撑阻力（TASK-030）
- [x] MA（TASK-006）
- [x] EMA（TASK-006）
- [x] MACD（TASK-009）
- [x] RSI（TASK-006）
- [x] KDJ（TASK-009）
- [x] Bollinger Bands（TASK-009）
- [x] Volume（TASK-009）
- [x] Open Interest（TASK-013）
- [x] Funding Rate（TASK-013）
- [x] Long/Short Ratio（TASK-013）
- [x] CVD（TASK-013）

## Part 2 — 指标组合
主题页（配对是文内案例，不是一级路由）：
- [x] 趋势 + 动量（TASK-017）
- [x] 趋势 + 成交量（TASK-017）
- [x] RSI + MACD（TASK-017）
- [x] 价格 + 持仓量（TASK-017）
- [x] 持仓量 + 成交量（TASK-017）
- [x] 资金费率 + 持仓量（TASK-017）
- [x] 多指标共振（TASK-017）

## Part 3 — Trading System
Sprint 006 前八篇：
- [x] 什么是交易系统（TASK-021）
- [x] 市场环境（TASK-021）
- [x] 方向判断（TASK-021）
- [x] 入场规则（TASK-021）
- [x] 出场规则（TASK-021）
- [x] 止损（TASK-021）
- [x] 止盈（TASK-021）
- [x] 仓位管理（TASK-021）

Sprint 007 后七篇：
- [x] 风险管理（TASK-025）
- [x] 交易频率（TASK-025）
- [x] 交易日志（TASK-025）
- [x] 回测（TASK-025）
- [x] 数据统计（TASK-025）
- [x] 系统优化（TASK-025）
- [x] 完整交易系统案例（TASK-025）

## Visual
- [x] K线基础图（示意图 vis-001；实盘 vis-101 已交付）
- [x] EMA 图（示意图 vis-002；实盘 vis-102 已交付）
- [x] MACD 图（示意图 vis-003；实盘 vis-103 已交付）
- [x] RSI 图（示意图 vis-004；实盘 vis-104 已交付）
- [x] Volume 图（示意图 vis-005；实盘 vis-105 已交付）
- [x] OI 图（示意图 vis-006；实盘 vis-106 已交付）
- [x] Funding 图（示意图 vis-007；实盘 vis-107 已交付）
- [x] 多指标组合图（vis-013–016）
- [x] 交易系统流程图（vis-008）

## UI
- [x] 首页（TASK-007）
- [x] 学习路径（TASK-007）
- [x] 课程侧边栏（TASK-007）
- [x] 文章页面（TASK-007）
- [x] 图表组件（示意图 + vis-101–108 教学窗；vis-108 可练习划线，不是交易终端）
- [x] 提示组件（RiskCallout）
- [x] 上下章导航（LessonPager，未发布不链 404）
- [x] Mobile（TASK-007 + 菜单修复；QA CDP 390 通过）
- [x] 阅读壳打磨（TASK-047：首屏 CTA、课文面包屑与分组侧栏、目录编号）

## 教程全量升级（Sprint 009–013）

总纲：`docs/product/curriculum-upgrade.md`。课序：`docs/product/learning-path.md`。

### Sprint 009 — 产品方案
- [x] 全量升级课序与任务拆分（TASK-031）

### Sprint 010 — 读图主干
- [x] 知识库：结构 / ATR / 瀑布 / 订单 / 屏幕（TASK-032）
- [x] 策略框架：成交 / 多周期 / 成本对照 R（TASK-033）
- [x] 示意图 vis-022 / vis-023（TASK-034）
- [x] 课文 `market-structure`、`atr` + 主路径接线（TASK-035）

### Sprint 011 — 机制与成交
- [x] `perp-screen`、`order-types`、`liquidation-cascade`、`cost-vs-r`（TASK-036）

### Sprint 012 — 系统执行层
- [x] `multi-timeframe`、`account-heat`、`execution-bias` + 旧课修订 + 案例时间线（TASK-037）

### Sprint 013 — 壳与终审
- [x] `/course/[...slug]`、courseMeta、目录分层（TASK-038，completed）
- [x] QA 终审（TASK-039，completed）

### 不挡升级（可选）
- [x] 真实行情 vis-109 / vis-110（结构 / ATR 练习窗）（TASK-040）
- [x] MA / 布林带 / 趋势+动量 / 对齐后仍失败 冻结窗（TASK-041）
- [x] 多空比 / CVD / 清算瀑布 / 案例执行时间线冻结窗（TASK-042）
- [x] 其余组合冻结窗（TASK-043）
- [x] 阶段 3 读图格冻结窗（TASK-044）
- [x] 出场与止盈冻结窗（TASK-045）
- [x] 整体校对 vis-101–130（TASK-046）
