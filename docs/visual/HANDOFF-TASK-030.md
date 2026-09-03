# Visual HANDOFF — TASK-030

Owner: Visual Agent（与 Content / UI 同批落地）  
Status: completed

## 完成内容

交付趋势线与支撑阻力的示意图和单概念真实行情窗。vis-108 复用 vis-101 的 BTCUSDT 4h 冻结 K 线，预画教学线，并允许练习划线。不是组合课实盘窗，不是交易终端。

## 修改文件

```
public/images/concept/vis-021-trendlines.svg
public/images/indicator/vis-108-trendlines-real.svg
public/data/charts/vis-108.json
docs/visual/specs/vis-021-trendlines.md
docs/visual/specs/vis-108-trendlines-real.md
docs/visual/README.md
types/chart.ts
components/ui/TeachingChart.vue
components/ui/mountTeachingChart.ts
assets/css/main.css
```

## 测试结果

- vis-021 图内有「示意图」
- vis-108 快照有「真实行情」，四字段完整
- TeachingChart 无下单 / 买入 / 卖出按钮

## 已知问题

- vis-108 的上升趋势线按 10-13 与 10-17 两个更高低点预画，后半段会被价格打穿；课文用它讲「线会被破」，不是画一条永远贴住的线。

## 下一步

- 组合课实盘窗另开任务。
- 不自动扩 vis-109+。
