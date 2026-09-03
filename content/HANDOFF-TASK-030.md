# Content HANDOFF — TASK-030

Owner: Content Agent（与 Knowledge / Visual / UI 同批落地）  
Status: completed

## 完成内容

在 K 线与 MA 之间发布「趋势线与支撑阻力」。先手连高低点，再学均线。没有把第三条触及写成未来保证，没有把支撑阻力写成必须停住的墙。

## 修改文件

```
content/01-indicators/trendlines/index.md
content/01-indicators/kline/index.md
content/01-indicators/ma/index.md
content/01-indicators/{ema,rsi,volume,macd,kdj,bollinger-bands,open-interest,funding-rate,long-short-ratio,cvd}/index.md  # order +1
content/00-introduction/index.md
content/glossary/price-chart.md
docs/knowledge/indicators/trendlines.md
docs/knowledge/indicators/kline.md
docs/knowledge/glossary.md
docs/knowledge/README.md
docs/product/learning-path.md
components/ui/courseMeta.ts
```

## 测试结果

- `node tests/check-task-030-trendlines.mjs` 通过
- `npm run lint` 通过
- `npm run typecheck` 通过
- 浏览器：`/indicators/trendlines` 教学线、练习水平位、四字段与「真实行情」徽章正常；`/course` 主路径已插入；`/indicators/kline` 下一步指向本课；`/indicators/ma` 上一篇为本课

## 已知问题

- vis-108 复用 vis-101 窗口，不是另采的新行情。
- 练习划线只存在于 vis-108；其他教学窗没有画线按钮。

## 下一步

- 组合课实盘窗另开任务，不要把 vis-108 当成组合窗继续扩。
- 不推送远程。
