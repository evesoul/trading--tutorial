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

优先级：**真实数据图表 > 教学示意图 > 流程图 > 装饰图**。第一批尚未接入行情源，因此实盘图只写 spec，不生成假 K 线。

## 图表分类

| 目录 | type | 用途 | 文件位置 |
|---|---|---|---|
| `concept/` | `schematic` | 用抽象几何讲清一个结构或关系 | `public/images/concept/` |
| `flow/` | `flow` | 步骤、判断、循环 | `public/images/flow/` |
| `indicator/` | `real-chart` | 单指标真实行情教学窗 | 待采集后放入 `public/images/indicator/` |
| `combination/` | `real-chart` | 多指标对照的真实行情 | 待采集后放入 `public/images/combination/` |
| `system/` | `real-chart` / `flow` | 交易系统案例配图 | 流程已交付；实盘案例待采集 |

第一批不创建 `indicator/`、`combination/` 占位图，避免被误当成实盘。

## 视觉语言

| 元素 | 约定 |
|---|---|
| 示意图徽章 | 橙底「示意图」，每张抽象图必须出现 |
| 阳线 / 上涨柱 | `#16a34a`（常见加密交易所习惯：绿涨红跌） |
| 阴线 / 下跌柱 | `#dc2626` |
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

### 真实行情图（仅 spec，待采集）

| id | title | type | status | 计划采集 |
|---|---|---|---|---|
| [vis-101](specs/vis-101-kline-real.md) | K 线真实行情教学窗 | real-chart | spec | BTCUSDT 4h · Binance USDT-M |
| [vis-102](specs/vis-102-ema-real.md) | EMA 真实行情教学窗 | real-chart | spec | BTCUSDT 4h · Binance USDT-M |
| [vis-103](specs/vis-103-macd-real.md) | MACD 真实行情教学窗 | real-chart | spec | BTCUSDT 4h · Binance USDT-M |
| [vis-104](specs/vis-104-rsi-real.md) | RSI 真实行情教学窗 | real-chart | spec | BTCUSDT 4h · Binance USDT-M |
| [vis-105](specs/vis-105-volume-real.md) | Volume 真实行情教学窗 | real-chart | spec | BTCUSDT 4h · Binance USDT-M |
| [vis-106](specs/vis-106-oi-real.md) | Open Interest 真实行情教学窗 | real-chart | spec | BTCUSDT 4h · Binance USDT-M |
| [vis-107](specs/vis-107-funding-real.md) | Funding Rate 真实行情教学窗 | real-chart | spec | BTCUSDT 8h funding · Binance USDT-M |

## 目录

```
docs/visual/
  README.md
  HANDOFF.md
  HANDOFF-SPRINT-003.md
  HANDOFF-SPRINT-004.md
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
    vis-101-kline-real.md
    vis-102-ema-real.md
    vis-103-macd-real.md
    vis-104-rsi-real.md
    vis-105-volume-real.md
    vis-106-oi-real.md
    vis-107-funding-real.md

public/images/
  concept/          # 示意图 SVG
  flow/             # 流程图 SVG
  indicator/        # 预留：真实行情截图（本批不放假图）
  combination/      # 预留
  system/           # 预留
```
