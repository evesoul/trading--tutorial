# Visual Agent HANDOFF — Sprint 007 / TASK-026

Owner: Visual Agent  
Status: completed

## 完成内容

为 Sprint 007 / 阶段 3 后半补了两张教学示意图。没有重画 vis-008，没有伪造真实行情或权益曲线，没有比较「优化前后更赚钱」，没有改 `content/`。

- vis-019：左卡只报胜率（其余空着）对照右卡检查清单。右卡同时看见交易次数、盈亏比、回撤、成本（手续费 / 资金费 / 滑点）。胜率只是其中一格。回测不是成绩单。
- vis-020：填好的作业纸五格——环境 → 方向 → 进出场 → 仓位 → 复盘。页内徽章与底部写明「教学样本 · 不证明有效 · 不是跟单对象」。
- 两张 SVG 均有橙底「示意图」徽章，页脚为「教学抽象几何 · 非真实行情 · 不构成交易建议」。
- 已更新 `docs/visual/README.md` 索引。

课文继续引用 vis-008 讲整条系统流程。本批只补回测卡片与案例作业纸。

本批不证明任何方法能赚钱，也不鼓励高杠杆。

## 修改文件

```
docs/visual/README.md
docs/visual/HANDOFF-SPRINT-007.md
docs/visual/specs/vis-019-backtest.md
docs/visual/specs/vis-020-case-study.md
public/images/concept/vis-019-backtest.svg
public/images/concept/vis-020-case-study.svg
docs/tasks/TASK-026-visual-system-back.md
```

未修改 `content/`。未改 vis-008。未采集 vis-101–107。未改 `docs/strategy/`。

## Content 引用句

```md
![回测不能只看胜率示意图](/images/concept/vis-019-backtest.svg)
![交易系统案例是作业纸示意图](/images/concept/vis-020-case-study.svg)
```

系统流程课继续用：

```md
![交易系统流程示意图](/images/flow/vis-008-trading-system-flow.svg)
```

Front Matter 写 `visual.charts: [vis-019]` / `[vis-020]`。不要插假行情图或权益曲线。

## 测试结果

- 两份 spec 含 id / title / type=schematic / purpose / teaching_question / symbol / timeframe / source / period / annotations / status=delivered。
- 两张 SVG 为 UTF-8；均含「示意图」与「非真实行情」。
- vis-019 含交易次数、盈亏比、回撤、手续费 / 资金费 / 滑点；否定只看胜率；无权益曲线。
- vis-020 含五格已填链路与「教学样本 · 不证明有效 · 不是跟单对象」。
- 已将两张 SVG 光栅化目视检查：徽章与页脚在；对照卡与作业纸格子均可读。
- 本任务无应用代码改动，未跑 lint / typecheck / build。

## 已知问题

- vis-019 未单独画出 Profit Factor、连亏、样本内外分段。需要完整 8 项卡片时另开 Visual Task。
- vis-020 不展开模板 12 节每一栏，格子句子是写法占位，不是可执行规则。
- 未画「对齐后仍失败」或真实回测窗。需要时另开 Visual Task。

## 下一步建议

1. Content Agent：回测课引用 vis-019；案例课引用 vis-020；系统流程继续引用 vis-008。不要改图、不要手绘假行情或权益曲线。
2. UI Agent：`<img>` 的 `alt` 必须带「示意图」。
3. QA：核对 vis-019 已否定只看胜率且无虚假权益曲线、vis-020 已否定跟单 / 证明盈利、无违禁用语、README 可检索、断链、未重画 vis-008。
4. 真实行情仍待 Binance USDT-M 接入后再采 vis-101–107。
