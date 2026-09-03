# Visual HANDOFF — TASK-042

K 线复用 vis-101。LSR / CVD / OI 从 Binance Vision 历史归档对齐到同一 4 小时窗。无买卖按钮，无成绩，无强平逐笔冒充热力图。

## 交付

| id | 教学点 |
|---|---|
| vis-115 | 全员账户比 vs 大户持仓比；10-30 04:00 约 0.59 / 1.46 |
| vis-116 | taker quote Delta；窗左端 CVD = 0；10-26 00:00 放量净额小 |
| vis-117 | 10-15 12:00 插针 + 巨量 + OI 降 + CVD 仍印主动买；先记失真 |
| vis-118 | 10-21 触发 / 10-22 止损触及；不填成绩 |

## 修改文件

- `scripts/build-vis-115-118.mjs`
- `public/data/charts/vis-115.json` … `vis-118.json`
- `public/images/indicator/vis-115-lsr-real.svg`、`vis-116-cvd-real.svg`、`vis-117-cascade-real.svg`
- `public/images/system/vis-118-case-timeline-real.svg`
- `docs/visual/specs/vis-115-lsr-real.md` … `vis-118-case-timeline-real.md`
- `types/chart.ts`、`components/ui/mountTeachingChart.ts`
