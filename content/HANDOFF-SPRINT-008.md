# Content Agent HANDOFF — Sprint 008

Owner: Content Agent  
Status: completed

## 完成内容

七篇指标课在示意图后挂上冻结真实行情教学窗。没有插假图，没有把交互窗写成交易终端。

课文用 MDC：`::real-chart{id="vis-10x"}`。不要写成 `![](/images/indicator/...)`，否则会被 prose CSS 标成示意图。

已替换「真实行情对照图稍后补上」。

| 课文 | 新增 |
|---|---|
| K 线 | vis-101 |
| EMA | vis-102 |
| MACD | vis-103 |
| RSI | vis-104 |
| Volume | vis-105 |
| Open Interest | vis-106 |
| Funding Rate | vis-107 |

Front Matter `visual.charts` 同时保留原示意图 id。

未改组合课、系统课、未发布页。未自动开 vis-101 以外的新课类型。

## 修改文件

```
content/01-indicators/kline/index.md
content/01-indicators/ema/index.md
content/01-indicators/macd/index.md
content/01-indicators/rsi/index.md
content/01-indicators/volume/index.md
content/01-indicators/open-interest/index.md
content/01-indicators/funding-rate/index.md
content/HANDOFF-SPRINT-008.md
```

## 已知问题

- 历史 Sprint QA 脚本仍检查「未插 vis-101–107」，那是当时的约束；本批以 `tests/check-sprint008-charts.mjs` 为准。
