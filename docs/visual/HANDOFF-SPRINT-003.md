# Visual Agent HANDOFF — Sprint 003 / TASK-010

Owner: Visual Agent  
Status: review

## 完成内容

为 Sprint 003 的 KDJ、布林带两课补了教学示意图。没有伪造真实行情，没有改 `content/`。

- vis-009：K 值 / D 值 / J 值 + 80 / 20 观察区；图内写「K 值」不写「K 线」；J 值可高于 100、低于 0；交叉与极端区都标成观察工具，不是买卖信号。
- vis-010：中轨 SMA(20) + 上下轨；三格对照收口、开口向上走轨道、开口向下走轨道；强调开口方向事先未知，碰上轨不是卖点。
- 两张 SVG 均有橙底「示意图」徽章，页脚为「教学抽象几何 · 非真实行情 · 不构成交易建议」。
- 已更新 `docs/visual/README.md` 索引与视觉语言（K/D/J、布林带中轨与上下轨颜色）。

本批不证明任何方法能赚钱。

## 修改文件

```
docs/visual/README.md
docs/visual/HANDOFF-SPRINT-003.md
docs/visual/specs/vis-009-kdj.md
docs/visual/specs/vis-010-bollinger-bands.md
public/images/concept/vis-009-kdj.svg
public/images/concept/vis-010-bollinger-bands.svg
docs/tasks/TASK-010-visual-kdj-bb.md
```

未修改 `content/`。未采集 vis-101–107。

## 测试结果

- 两份 spec 含 id / title / type=schematic / purpose / teaching_question / symbol / timeframe / source / period / annotations / status=delivered。
- 两张 SVG 为 UTF-8，无空字节；均含「示意图」与「非真实行情」。
- vis-009 全文检索无「K 线」。
- 已在浏览器打开两张 SVG：标注可读，徽章与页脚在，K/D/J 三线与 J 值越界、布林带三格对照均在。
- 本任务无应用代码改动，未跑 lint / typecheck / build。

## 已知问题

- 未为 KDJ / 布林带单独立真实行情 spec（vis-108+）。需要实盘窗时另开 Visual Task，不要用本批 SVG 冒充实盘。
- vis-010 三格是对照，不是一段连续 K 线（蜡烛）；Content 配文需写明，避免读成「收口之后向上」。
- 颜色仍按常见加密交易所绿阳红阴；A 股读者需看图内「阳线 / 阴线」习惯说明（本图用碰轨文字，不单靠颜色讲方向）。

## 下一步建议

1. Content Agent：KDJ / 布林带课文用  
   `![KDJ：K 值 / D 值 / J 值示意图](/images/concept/vis-009-kdj.svg)`  
   `![布林带中轨与开口收口示意图](/images/concept/vis-010-bollinger-bands.svg)`  
   Front Matter 写 `visual.charts: [vis-009]` / `[vis-010]`。不要插假行情图。
2. UI Agent：`<img>` 的 `alt` 必须带「示意图」。
3. QA：核对 vis-009 未出现「K 线」、无违禁用语、README 可检索、断链。
4. 真实行情仍待 Binance USDT-M 接入后再采 vis-101–107。
