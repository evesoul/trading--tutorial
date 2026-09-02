# Visual Agent HANDOFF — Sprint 004 / TASK-014

Owner: Visual Agent  
Status: completed

## 完成内容

为 Sprint 004 的多空比、CVD 两课补了教学示意图。没有重画 vis-006 / vis-007，没有伪造真实行情，没有改 `content/`。

- vis-011：四种口径卡片（账户数比 / 持仓量比 / 大户账户比 / 大户持仓比）+ 同一抽象时刻对照。账户数比可以大于 1，持仓量比可以小于 1。图内写明不是「市场多空」，比值 1 只是该口径是否均衡的参考，不是超买超卖线，不是买卖开关。
- vis-012：同一组六个抽象时间桶并排成交量柱、Delta 柱、CVD 曲线。只讲加法关系：总量、净主动、净主动的累加。成交量用中性灰，避免把「量大」读成「主动买多」。从左端重置为 0，看斜率不看绝对值。
- 两张 SVG 均有橙底「示意图」徽章，页脚为「教学抽象几何 · 非真实行情 · 不构成交易建议」。
- 已更新 `docs/visual/README.md` 索引与视觉语言（多空两侧、比值 1、成交量总量柱、CVD / Delta 颜色）。

本批不证明任何方法能赚钱。

## 修改文件

```
docs/visual/README.md
docs/visual/HANDOFF-SPRINT-004.md
docs/visual/specs/vis-011-long-short-ratio.md
docs/visual/specs/vis-012-cvd.md
public/images/concept/vis-011-long-short-ratio.svg
public/images/concept/vis-012-cvd.svg
docs/tasks/TASK-014-visual-lsr-cvd.md
```

未修改 `content/`。未改 vis-006 / vis-007。未采集 vis-101–107。

## 测试结果

- 两份 spec 含 id / title / type=schematic / purpose / teaching_question / symbol / timeframe / source / period / annotations / status=delivered。
- 两张 SVG 为 UTF-8，无空字节；均含「示意图」与「非真实行情」。
- vis-011 含「口径」与「不是『市场多空』」；vis-012 含 Volume / Delta / CVD 三层对照。
- 已将 SVG 光栅化目视检查：徽章与页脚在，四种口径、账户 vs 持仓对照、三层面板与「量大但 Delta ≈ 0」均在。浏览器 MCP 本轮未连上，未能在页面里再点一次。
- 本任务无应用代码改动，未跑 lint / typecheck / build。

## 已知问题

- 未为多空比 / CVD 单独立真实行情 spec（vis-108+）。需要实盘窗时另开 Visual Task，不要用本批 SVG 冒充实盘。
- vis-011 左右两格是同一抽象时刻的对照，不是连续行情；圆点与色块是计数 / 相对规模，不是真实账户或张数。
- vis-012 六个桶是教学加法，不是某品种分时。方向分类（交易所 side / tick / quote）没有在图里展开。
- 颜色仍按常见加密交易所绿多红空；A 股读者需看图内「多头 / 空头」「主动买 / 主动卖」文字。

## 下一步建议

1. Content Agent：多空比 / CVD 课文用  
   `![多空比必须先标口径示意图](/images/concept/vis-011-long-short-ratio.svg)`  
   `![CVD 与成交量区分示意图](/images/concept/vis-012-cvd.svg)`  
   Front Matter 写 `visual.charts: [vis-011]` / `[vis-012]`。不要插假行情图。不要重引 vis-006 / vis-007 来讲这两个指标。
2. UI Agent：`<img>` 的 `alt` 必须带「示意图」。
3. QA：核对 vis-011 已标口径且否定「市场多空」、vis-012 已区分成交量与 CVD、无违禁用语、README 可检索、断链。
4. 真实行情仍待 Binance USDT-M 接入后再采 vis-101–107；LSR / CVD 实盘窗另开任务。
