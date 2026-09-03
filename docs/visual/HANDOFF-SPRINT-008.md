# Visual Agent HANDOFF — Sprint 008

Owner: Visual Agent（与 Nuxt / Content 同批落地）  
Status: completed

## 完成内容

采集 vis-101–107 的 Binance USDT-M 冻结窗，并提供静态 SVG 快照。没有做交易终端，没有 vis-108+，没有用假 K 线证明盈利。

- 数据源：`data.binance.vision` 历史归档（直连 `fapi.binance.com` 超时）。
- K 线：月度 `futures/um/monthly/klines/BTCUSDT/{4h|8h}`。
- 资金费：月度 `monthly/fundingRate/BTCUSDT`。
- OI：日度 `daily/metrics/BTCUSDT`（5 分钟）对齐到 4h 桶内最后快照。
- 成交量口径：USDT quote volume。
- 费率单位：小数，`0.0001 = 0.01%`。
- JSON：`public/data/charts/vis-101.json` … `vis-107.json`
- SVG 快照徽章为「真实行情」，不走课文示意图 `::after`。

## 实际窗口

| id | timeframe | period (UTC) | bars |
|---|---|---|---|
| vis-101 | 4h | 2024-10-12 → 2024-10-30 | 110 |
| vis-102 | 4h | 2024-09-15 → 2024-10-03 | 110 |
| vis-103 | 4h | 2024-08-19 → 2024-09-06 | 110 |
| vis-104 | 4h | 2024-07-01 → 2024-07-19 | 110 |
| vis-105 | 4h | 2024-10-01 → 2024-10-19 | 110 |
| vis-106 | 4h | 2024-10-11 → 2024-10-29 | 110 |
| vis-107 | 8h | 2024-08-07 → 2024-09-05 | 90 |

复采：`npm run capture:charts`（需 `curl` + `unzip`）。

## 修改文件

```
scripts/capture-real-charts.mjs
public/data/charts/vis-101.json … vis-107.json
public/images/indicator/vis-101-kline-real.svg …
docs/visual/specs/vis-101-kline-real.md … vis-107-funding-real.md
docs/visual/README.md
docs/visual/HANDOFF-SPRINT-008.md
```

未改 vis-001–020 示意图。未开组合实盘窗。

## 已知问题

- 静态 SVG 只画价格（及 EMA 覆盖），副图交互只在网页组件里。
- OI 不是交易所 4h 原生序列，而是 5 分钟 metrics 对齐。
- 直连 Binance 行情 REST 在本机超时，以后若要复采请继续走 Vision 归档。

## 下一步建议

1. 组合课实盘窗另开任务，不要自动扩 vis-108+。
2. QA：核对四字段、真实行情徽章、无下单按钮、无违禁用语。
