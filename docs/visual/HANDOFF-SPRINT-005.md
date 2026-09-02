# Visual Agent HANDOFF — Sprint 005 / TASK-018

Owner: Visual Agent  
Status: completed

## 完成内容

为 Sprint 005 / 阶段 2 组合课补了四张教学示意图。没有重画 vis-001–012，没有伪造真实行情，没有改 `content/`。本任务只出四张，不是把 `docs/strategy/combinations/` 每个需求都画完。

- vis-013：同一条抽象走势。均线全程仍向上，动量先伸展后回落。左段「同向更清楚」，右段「反向先等待」。图内写明不是金叉开多。
- vis-014：两格对照同一条抽象价动——价动且量跟上 / 价动且量没跟上。价和量是两个问题。成交量用中性灰，不是开仓指令。
- vis-015：三格并排放量柱与 OI 曲线。放量加仓、放量减仓、放量但 OI 平坦。流量 ≠ 存量。不画假 K 线。
- vis-016：问题槽（方向 / 力度 / 量或仓）。对照「同一槽堆叠」与「不同槽分工」。图内写明「不是指标越多越准确」「三个槽对齐 ≠ 更可靠」。无收益柱比较指标数量。
- 四张 SVG 均有橙底「示意图」徽章，页脚为「教学抽象几何 · 非真实行情 · 不构成交易建议」。
- 已更新 `docs/visual/README.md` 索引。

`rsi-macd` / `price-oi` / `funding-oi` 复用 vis-003 / vis-004 / vis-006 / vis-007。本批不出第四象限假行情、不出费率反向喊单图。

本批不证明任何方法能赚钱。

## 修改文件

```
docs/visual/README.md
docs/visual/HANDOFF-SPRINT-005.md
docs/visual/specs/vis-013-trend-momentum.md
docs/visual/specs/vis-014-trend-volume.md
docs/visual/specs/vis-015-oi-volume.md
docs/visual/specs/vis-016-multi-indicator.md
public/images/concept/vis-013-trend-momentum.svg
public/images/concept/vis-014-trend-volume.svg
public/images/concept/vis-015-oi-volume.svg
public/images/concept/vis-016-multi-indicator.svg
docs/tasks/TASK-018-visual-combinations.md
```

未修改 `content/`。未改 vis-001–012。未采集 vis-101–107。未改 `docs/strategy/`。

## Content 引用句

```md
![趋势与动量对照示意图](/images/concept/vis-013-trend-momentum.svg)
![价量是否同步示意图](/images/concept/vis-014-trend-volume.svg)
![持仓量与成交量区分示意图](/images/concept/vis-015-oi-volume.svg)
![问题槽不是指标堆叠示意图](/images/concept/vis-016-multi-indicator.svg)
```

Front Matter 写 `visual.charts: [vis-013]` / `[vis-014]` / `[vis-015]` / `[vis-016]`。不要插假行情图。

## 测试结果

- 四份 spec 含 id / title / type=schematic / purpose / teaching_question / symbol / timeframe / source / period / annotations / status=delivered。
- 四张 SVG 为 UTF-8；均含「示意图」与「非真实行情」。
- vis-016 含「不是指标越多越准确」；无收益柱。
- 已将四张 SVG 光栅化目视检查：徽章与页脚在；vis-013 同向/反向两段、vis-014 两格价量、vis-015 三格流量存量、vis-016 问题槽与「不是指标越多越准确」均在。浏览器 MCP 本轮未连上，未能在页面里再点一次。
- 本任务无应用代码改动，未跑 lint / typecheck / build。

## 已知问题

- 策略文档里还有未出的图：震荡失效、RSI 停高位、放量滞涨、平仓推动突破、对齐后仍失败的真实行情。需要时另开 Visual Task，不要用本批 SVG 冒充实盘。
- vis-013 左右是同一条抽象走势的两段，不是两套行情。动量柱是力度示意，不是某参数的 RSI / MACD。
- vis-014 对照段是相对参照，不是绝对放量标准。未展开时段与刷量。
- vis-015 三格是对照过程，不是连续剧本。OI 更新频率与单位未在图里展开。
- vis-016 拥挤 / 资金费槽没有单独成卡；风险槽只在图注。右边 EMA / RSI / Volume 是分工示例，不是推荐组合。

## 下一步建议

1. Content Agent：组合课用上方四句引用。不要改图、不要手绘假行情。单指标课继续引用 vis-001–012。
2. UI Agent：`<img>` 的 `alt` 必须带「示意图」。
3. QA：核对 vis-013 已否定金叉开多、vis-016 已写「不是指标越多越准确」、无违禁用语、README 可检索、断链、未重画 vis-001–012。
4. 真实行情仍待 Binance USDT-M 接入后再采 vis-101–107；组合实盘窗另开任务。
