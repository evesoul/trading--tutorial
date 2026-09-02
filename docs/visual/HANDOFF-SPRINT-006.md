# Visual Agent HANDOFF — Sprint 006 / TASK-022

Owner: Visual Agent  
Status: completed

## 完成内容

为 Sprint 006 / 阶段 3 前半补了两张教学示意图。没有重画 vis-008，没有伪造真实行情或权益曲线，没有改 `content/`。

- vis-017：同一套抽象价格几何，三格对照——趋势 / 震荡 / 看不清。环境未定时默认不交易。图内写明不是突破必涨。
- vis-018：计划止损、账户强平、目标止盈三条线分开。止损先于止盈。止损不是强平线。无累计收益 / 权益曲线。
- 两张 SVG 均有橙底「示意图」徽章，页脚为「教学抽象几何 · 非真实行情 · 不构成交易建议」。
- 已更新 `docs/visual/README.md` 索引。

课文继续引用 vis-008 讲整条系统流程。本批只补环境对照与止损 / 强平区分。

本批不证明任何方法能赚钱，也不鼓励高杠杆。

## 修改文件

```
docs/visual/README.md
docs/visual/HANDOFF-SPRINT-006.md
docs/visual/specs/vis-017-market-regime.md
docs/visual/specs/vis-018-stop-loss.md
public/images/concept/vis-017-market-regime.svg
public/images/concept/vis-018-stop-loss.svg
docs/tasks/TASK-022-visual-system-front.md
```

未修改 `content/`。未改 vis-008。未采集 vis-101–107。未改 `docs/strategy/`。

## Content 引用句

```md
![市场环境三态示意图](/images/concept/vis-017-market-regime.svg)
![止损与强平区分示意图](/images/concept/vis-018-stop-loss.svg)
```

系统流程课继续用：

```md
![交易系统流程示意图](/images/flow/vis-008-trading-system-flow.svg)
```

Front Matter 写 `visual.charts: [vis-017]` / `[vis-018]`。不要插假行情图或权益曲线。

## 测试结果

- 两份 spec 含 id / title / type=schematic / purpose / teaching_question / symbol / timeframe / source / period / annotations / status=delivered。
- 两张 SVG 为 UTF-8；均含「示意图」与「非真实行情」。
- vis-017 含趋势 / 震荡 / 看不清、默认不交易、不是突破必涨。
- vis-018 含计划止损 / 账户强平 / 目标止盈三条线；止损先于止盈；止损不是强平线；无收益曲线。
- 已将两张 SVG 光栅化目视检查：徽章与页脚在；三格环境与三条线均可读。
- 本任务无应用代码改动，未跑 lint / typecheck / build。

## 已知问题

- vis-017 未单独画出高波动 / 低波动；周期不同则趋势与震荡分界会变。不要用本图冒充 vis-002 的均线位置课。
- vis-018 以多头为例，不展开维持保证金公式、标记价、逐仓 / 全仓与滑点。强平价是估算值。
- 未画「对齐后仍失败」或「有止损仍被扫 / 强平」的真实行情。需要时另开 Visual Task。

## 下一步建议

1. Content Agent：市场环境课引用 vis-017；止损课引用 vis-018；系统流程继续引用 vis-008。不要改图、不要手绘假行情或权益曲线。
2. UI Agent：`<img>` 的 `alt` 必须带「示意图」。
3. QA：核对 vis-017 已否定突破必涨、vis-018 已区分止损与强平、无违禁用语、README 可检索、断链、未重画 vis-008。
4. 真实行情仍待 Binance USDT-M 接入后再采 vis-101–107。
