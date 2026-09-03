# Visual System

通过图表降低交易知识的理解难度。本目录是 Visual Agent 的规格与索引；示意图文件在 `public/images/`。

本项目是交易教育网站。图表只用于解释概念，不用于荐股、喊单或证明某套方法能赚钱。

## 原则（对照 AGENTS.md 第 7 节）

1. 每张图必须有明确教学目的，并能回答：「用户看完以后应该理解什么？」
2. 真实行情图必须记录 `symbol`、`timeframe`、`source`、`period`。
3. 示意图必须在图内标题或徽章中写明「示意图」。
4. 禁止用虚构 K 线、虚构指标值证明盈利能力。
5. 禁止把示意图、流程图伪装成真实行情。
6. 禁止无意义装饰图。
7. 指标交叉、超买超卖、量价配合都是观察工具，图注不得写成确定性买卖信号。
8. 永续合约有爆仓风险；图中涉及杠杆、仓位时只讲风险约束，不鼓励高杠杆。

优先级：**真实数据图表 > 教学示意图 > 流程图 > 装饰图**。vis-101–107 已从 Binance Vision 历史归档采集冻结窗；vis-108–130 复用 vis-101 同一段 K 线（OI / LSR / CVD / 费率 / 已收盘日线 EMA 在其上对齐）。阶段 2 七篇组合、阶段 3 读图格各有单磁带教学窗，不是交易终端。

## 图表分类

| 目录 | type | 用途 | 文件位置 |
|---|---|---|---|
| `concept/` | `schematic` | 用抽象几何讲清一个结构或关系 | `public/images/concept/` |
| `flow/` | `flow` | 步骤、判断、循环 | `public/images/flow/` |
| `indicator/` | `real-chart` | 单指标真实行情教学窗 | JSON 在 `public/data/charts/`，快照在 `public/images/indicator/` |
| `combination/` | `real-chart` | 多指标对照的真实行情 | vis-113 / vis-114 / vis-119–123 已交付；不是交易终端 |
| `system/` | `real-chart` / `flow` | 交易系统读图与流程 | vis-008 流程 + vis-118 / vis-124–130 冻结窗；不填成绩 |

`indicator/` 现有 vis-101–117 的 SVG 快照（缺 vis-113 / vis-114，它们在 `combination/`），徽章写「真实行情」。课文用 `::real-chart{id="vis-101"}`，不要用 markdown 图片，以免被标成示意图。

## 视觉语言

| 元素 | 约定 |
|---|---|
| 示意图徽章 | 橙底「示意图」，每张抽象图必须出现 |
| 阳线 / 上涨柱 | `#16a34a`（常见加密交易所习惯：绿涨红跌） |
| 阴线 / 下跌柱 | `#dc2626` |
| 教学趋势线 | `#2563eb` |
| 教学水平位 | `#d97706` |
| 练习划线 | `#0f766e` |
| EMA | `#7c3aed` |
| MACD DIF / KDJ K 值 | `#2563eb` |
| MACD DEA / KDJ D 值 | `#d97706` |
| KDJ J 值 | `#7c3aed` |
| 布林带中轨 SMA | `#0f172a` |
| 布林带上轨 / 下轨 | `#2563eb` |
| 零轴 / 中线 | `#94a3b8` |
| 超买观察带 | `#fef3c7` |
| 超卖观察带 | `#dbeafe` |
| 正费率区 | `#dcfce7` |
| 负费率区 | `#fee2e2` |
| 多头侧（账户 / 仓位） | `#16a34a` |
| 空头侧（账户 / 仓位） | `#dc2626` |
| 多空比 1 参考 | `#94a3b8` |
| 成交量总量柱 | `#94a3b8`（中性灰，避免和有方向的 Delta 混淆） |
| CVD 曲线 | `#2563eb` |
| Delta 正 / 负 | `#16a34a` / `#dc2626` |
| 页脚免责 | 「教学抽象 · 非真实行情 · 不构成交易建议」 |

A 股习惯是红涨绿跌。图内同时写「阳线 / 阴线」，避免只靠颜色理解。

## Spec 字段

每张图一份 spec，放在 `docs/visual/specs/`：

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

- `schematic` / `flow`：`symbol` / `timeframe` / `source` / `period` 填 `not-applicable` 或 `teaching-schematic`，并在正文说明「非真实行情」。
- `real-chart`：四个字段必须可采集；未接入数据时 `status: spec`，不要画假 K 线。
- `status: delivered` 表示对应 SVG 或实盘截图已落地且与 spec 一致。

## Content / UI 引用方式

Content Agent 在 Markdown 中引用已交付示意图：

```md
![K 线结构示意图](/images/concept/vis-001-kline-ohlc.svg)
```

文章 Front Matter：

```yaml
visual:
  cover: /images/concept/vis-001-kline-ohlc.svg
  charts:
    - vis-001
    - vis-101
```

UI Agent 在 Vue 中：

```vue
<img
  src="/images/concept/vis-001-kline-ohlc.svg"
  alt="K 线结构示意图：一根 K 线包含开盘、最高、最低、收盘"
/>
```

引用规则：

- `alt` / 图题必须带「示意图」或实盘四字段，二者不可混用。
- 用 `id`（如 `vis-001`）检索本 README 与 `specs/`。
- `status: spec` 的真实行情图：正文只描述将要看什么，不要插入假图。
- 已交付实盘窗用 `::real-chart{id="vis-10x"}`，组件页脚必须出现 symbol / timeframe / source / period。
- 需要新图时创建 Visual Task，不要在 `content/` 里手绘假行情。

## Spec 索引

### 已交付示意图 / 流程图

| id | title | type | status | 资产 |
|---|---|---|---|---|
| [vis-001](specs/vis-001-kline-ohlc.md) | K 线 OHLC 结构 | schematic | delivered | `/images/concept/vis-001-kline-ohlc.svg` |
| [vis-002](specs/vis-002-ema-trend.md) | EMA 与趋势位置 | schematic | delivered | `/images/concept/vis-002-ema-trend.svg` |
| [vis-003](specs/vis-003-macd-cross.md) | MACD 柱与交叉 | schematic | delivered | `/images/concept/vis-003-macd-cross.svg` |
| [vis-004](specs/vis-004-rsi-zones.md) | RSI 超买超卖 | schematic | delivered | `/images/concept/vis-004-rsi-zones.svg` |
| [vis-005](specs/vis-005-volume.md) | 成交量与价格 | schematic | delivered | `/images/concept/vis-005-volume.svg` |
| [vis-006](specs/vis-006-open-interest.md) | 持仓量与价格 | schematic | delivered | `/images/concept/vis-006-open-interest.svg` |
| [vis-007](specs/vis-007-funding-rate.md) | 资金费率正负 | schematic | delivered | `/images/concept/vis-007-funding-rate.svg` |
| [vis-008](specs/vis-008-trading-system-flow.md) | 交易系统流程 | flow | delivered | `/images/flow/vis-008-trading-system-flow.svg` |
| [vis-009](specs/vis-009-kdj.md) | KDJ：K 值 / D 值 / J 值 | schematic | delivered | `/images/concept/vis-009-kdj.svg` |
| [vis-010](specs/vis-010-bollinger-bands.md) | 布林带中轨与开口收口 | schematic | delivered | `/images/concept/vis-010-bollinger-bands.svg` |
| [vis-011](specs/vis-011-long-short-ratio.md) | 多空比必须先标口径 | schematic | delivered | `/images/concept/vis-011-long-short-ratio.svg` |
| [vis-012](specs/vis-012-cvd.md) | CVD 与成交量区分 | schematic | delivered | `/images/concept/vis-012-cvd.svg` |
| [vis-013](specs/vis-013-trend-momentum.md) | 趋势与动量对照 | schematic | delivered | `/images/concept/vis-013-trend-momentum.svg` |
| [vis-014](specs/vis-014-trend-volume.md) | 价量是否同步 | schematic | delivered | `/images/concept/vis-014-trend-volume.svg` |
| [vis-015](specs/vis-015-oi-volume.md) | 持仓量与成交量区分 | schematic | delivered | `/images/concept/vis-015-oi-volume.svg` |
| [vis-016](specs/vis-016-multi-indicator.md) | 问题槽不是指标堆叠 | schematic | delivered | `/images/concept/vis-016-multi-indicator.svg` |
| [vis-017](specs/vis-017-market-regime.md) | 市场环境三态 | schematic | delivered | `/images/concept/vis-017-market-regime.svg` |
| [vis-018](specs/vis-018-stop-loss.md) | 止损与强平区分 | schematic | delivered | `/images/concept/vis-018-stop-loss.svg` |
| [vis-019](specs/vis-019-backtest.md) | 回测不能只看胜率 | schematic | delivered | `/images/concept/vis-019-backtest.svg` |
| [vis-020](specs/vis-020-case-study.md) | 交易系统案例是作业纸 | schematic | delivered | `/images/concept/vis-020-case-study.svg` |
| [vis-021](specs/vis-021-trendlines.md) | 趋势线与支撑阻力 | schematic | delivered | `/images/concept/vis-021-trendlines.svg` |
| [vis-022](specs/vis-022-market-structure.md) | 摆动结构与假突破 | schematic | delivered | `/images/concept/vis-022-market-structure.svg` |
| [vis-023](specs/vis-023-atr.md) | ATR 与波动尺子 | schematic | delivered | `/images/concept/vis-023-atr.svg` |
| [vis-024](specs/vis-024-order-types.md) | 订单类型与成交 | schematic | delivered | `/images/concept/vis-024-order-types.svg` |
| [vis-025](specs/vis-025-multi-timeframe.md) | 多周期：高周期定场 | schematic | delivered | `/images/concept/vis-025-multi-timeframe.svg` |
| [vis-026](specs/vis-026-cost-vs-r.md) | 成本对照 R | schematic | delivered | `/images/concept/vis-026-cost-vs-r.svg` |
| [vis-027](specs/vis-027-liquidation-cascade.md) | 清算瀑布失真 | schematic | delivered | `/images/concept/vis-027-liquidation-cascade.svg` |
| [vis-028](specs/vis-028-execution-bias.md) | 执行偏差：偏差 → 日志 → 动作 | schematic | delivered | `/images/concept/vis-028-execution-bias.svg` |
| [vis-029](specs/vis-029-account-heat.md) | 账户热度：同向风险加总 | schematic | delivered | `/images/concept/vis-029-account-heat.svg` |
| [vis-030](specs/vis-030-perp-screen.md) | 交易所屏幕字段 | schematic | delivered | `/images/concept/vis-030-perp-screen.svg` |

### 真实行情图（已交付冻结窗）

| id | title | type | status | 实际窗口 |
|---|---|---|---|---|
| [vis-101](specs/vis-101-kline-real.md) | K 线真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-10-12 → 2024-10-30 UTC |
| [vis-102](specs/vis-102-ema-real.md) | EMA 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-09-15 → 2024-10-03 UTC |
| [vis-103](specs/vis-103-macd-real.md) | MACD 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-08-19 → 2024-09-06 UTC |
| [vis-104](specs/vis-104-rsi-real.md) | RSI 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-07-01 → 2024-07-19 UTC |
| [vis-105](specs/vis-105-volume-real.md) | Volume 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-10-01 → 2024-10-19 UTC |
| [vis-106](specs/vis-106-oi-real.md) | Open Interest 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-10-11 → 2024-10-29 UTC |
| [vis-107](specs/vis-107-funding-real.md) | Funding Rate 真实行情教学窗 | real-chart | delivered | BTCUSDT 8h · 2024-08-07 → 2024-09-05 UTC |
| [vis-108](specs/vis-108-trendlines-real.md) | 趋势线与支撑阻力教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-10-12 → 2024-10-30 UTC（复用 vis-101，单概念） |
| [vis-109](specs/vis-109-market-structure-real.md) | 摆动结构真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-10-12 → 2024-10-30 UTC（复用 vis-101，单概念） |
| [vis-110](specs/vis-110-atr-real.md) | ATR 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 2024-10-12 → 2024-10-30 UTC（复用 vis-101，Wilder 14） |
| [vis-111](specs/vis-111-ma-real.md) | MA 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，SMA20 |
| [vis-112](specs/vis-112-bollinger-real.md) | 布林带真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，SMA20 ± 2σ |
| [vis-113](specs/vis-113-trend-momentum-real.md) | 趋势 + 动量真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，EMA + RSI |
| [vis-114](specs/vis-114-alignment-fail-real.md) | 对齐后仍失败教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，三槽对齐后折返 |
| [vis-115](specs/vis-115-lsr-real.md) | 多空比真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，全员账户比 vs 大户持仓比 |
| [vis-116](specs/vis-116-cvd-real.md) | CVD 真实行情教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，taker quote Delta |
| [vis-117](specs/vis-117-cascade-real.md) | 清算瀑布读图教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，量 / OI / CVD，无强平逐笔 |
| [vis-118](specs/vis-118-case-timeline-real.md) | 案例执行时间线教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，不填成绩 |
| [vis-119](specs/vis-119-trend-volume-real.md) | 趋势 + 成交量教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101，EMA + 成交额 |
| [vis-120](specs/vis-120-price-oi-real.md) | 价格 + OI 教学窗 | real-chart | delivered | BTCUSDT 4h · 复用 vis-101 / vis-117 OI |
| [vis-121](specs/vis-121-oi-volume-real.md) | OI + Volume 教学窗 | real-chart | delivered | BTCUSDT 4h · 放量加仓 / 减仓 / 换手 |
| [vis-122](specs/vis-122-funding-oi-real.md) | Funding + OI 教学窗 | real-chart | delivered | BTCUSDT 4h · 8h 费率沿用，不是反向喊单 |
| [vis-123](specs/vis-123-rsi-macd-real.md) | RSI + MACD 教学窗 | real-chart | delivered | BTCUSDT 4h · 两把尺同向，不叠 KDJ |
| [vis-124](specs/vis-124-regime-real.md) | 市场环境教学窗 | real-chart | delivered | BTCUSDT 4h · 趋势 / 波动放大 / 来回穿越 |
| [vis-125](specs/vis-125-direction-real.md) | 方向判断教学窗 | real-chart | delivered | BTCUSDT 4h · 偏多标签与不交易 |
| [vis-126](specs/vis-126-mtf-real.md) | 多周期教学窗 | real-chart | delivered | BTCUSDT 4h · 已收盘日线 EMA，打架则空仓 |
| [vis-127](specs/vis-127-entry-real.md) | 入场规则教学窗 | real-chart | delivered | BTCUSDT 4h · 前提成立、触发未到，无成交 |
| [vis-128](specs/vis-128-stop-real.md) | 止损教学窗 | real-chart | delivered | BTCUSDT 4h · 1.5×ATR 占位，不画强平 |
| [vis-129](specs/vis-129-exit-real.md) | 出场规则教学窗 | real-chart | delivered | BTCUSDT 4h · 四扇门占位，目标先到 |
| [vis-130](specs/vis-130-take-profit-real.md) | 止盈教学窗 | real-chart | delivered | BTCUSDT 4h · 2R 到站后仍继续走 |

## 目录

```
docs/visual/
  README.md
  HANDOFF.md
  HANDOFF-TASK-034.md
  HANDOFF-TASK-036.md
  HANDOFF-TASK-037.md
  HANDOFF-SPRINT-003.md
  HANDOFF-SPRINT-004.md
  HANDOFF-SPRINT-005.md
  HANDOFF-SPRINT-006.md
  HANDOFF-SPRINT-007.md
  HANDOFF-SPRINT-008.md
  specs/
    vis-001-kline-ohlc.md
    vis-002-ema-trend.md
    vis-003-macd-cross.md
    vis-004-rsi-zones.md
    vis-005-volume.md
    vis-006-open-interest.md
    vis-007-funding-rate.md
    vis-008-trading-system-flow.md
    vis-009-kdj.md
    vis-010-bollinger-bands.md
    vis-011-long-short-ratio.md
    vis-012-cvd.md
    vis-013-trend-momentum.md
    vis-014-trend-volume.md
    vis-015-oi-volume.md
    vis-016-multi-indicator.md
    vis-017-market-regime.md
    vis-018-stop-loss.md
    vis-019-backtest.md
    vis-020-case-study.md
    vis-021-trendlines.md
    vis-022-market-structure.md
    vis-023-atr.md
    vis-024-order-types.md
    vis-025-multi-timeframe.md
    vis-026-cost-vs-r.md
    vis-027-liquidation-cascade.md
    vis-028-execution-bias.md
    vis-029-account-heat.md
    vis-030-perp-screen.md
    vis-101-kline-real.md
    vis-102-ema-real.md
    vis-103-macd-real.md
    vis-104-rsi-real.md
    vis-105-volume-real.md
    vis-106-oi-real.md
    vis-107-funding-real.md
    vis-108-trendlines-real.md
    vis-109-market-structure-real.md
    vis-110-atr-real.md
    vis-111-ma-real.md
    vis-112-bollinger-real.md
    vis-113-trend-momentum-real.md
    vis-114-alignment-fail-real.md
    vis-115-lsr-real.md
    vis-116-cvd-real.md
    vis-117-cascade-real.md
    vis-118-case-timeline-real.md
    vis-119-trend-volume-real.md
    vis-120-price-oi-real.md
    vis-121-oi-volume-real.md
    vis-122-funding-oi-real.md
    vis-123-rsi-macd-real.md
    vis-124-regime-real.md
    vis-125-direction-real.md
    vis-126-mtf-real.md
    vis-127-entry-real.md
    vis-128-stop-real.md
    vis-129-exit-real.md
    vis-130-take-profit-real.md

public/images/
  concept/          # 示意图 SVG
  flow/             # 流程图 SVG
  indicator/        # vis-101–112、vis-115–117 SVG 快照（真实行情徽章）
  combination/      # vis-113 / vis-114 / vis-119–123
  system/           # vis-118、vis-124–130
```
