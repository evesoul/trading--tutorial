# Visual HANDOFF — TASK-040

Owner: Visual Agent（课文挂点由编排器同步）  
Status: completed

## 完成内容

评估 vis-101 冻结窗后复用，不再另打 Binance。两张都是单概念真实行情窗，徽章「真实行情」，四字段完整。无买卖按钮，无 ATR 通道开仓。

- vis-109：预标 L / HL / HH / 扫过 / 回撤。10-18 HH 约 69000；10-21 上影 69566 收盘回区。
- vis-110：副图 Wilder ATR(14)。窗内约 545 → 985；10-15 12:00 TR/ATR ≈ 3.47。

## 修改文件

```
scripts/build-vis-109-110.mjs
public/data/charts/vis-109.json
public/data/charts/vis-110.json
public/images/indicator/vis-109-market-structure-real.svg
public/images/indicator/vis-110-atr-real.svg
docs/visual/specs/vis-109-market-structure-real.md
docs/visual/specs/vis-110-atr-real.md
docs/visual/specs/vis-022-market-structure.md
docs/visual/specs/vis-023-atr.md
docs/visual/README.md
docs/visual/HANDOFF.md
types/chart.ts
components/ui/mountTeachingChart.ts
components/ui/TeachingChart.vue
content/01-indicators/market-structure/index.md
content/01-indicators/atr/index.md
tests/check-task-040-real-charts.mjs
```

## 已知问题

组合课实盘窗仍不做。
