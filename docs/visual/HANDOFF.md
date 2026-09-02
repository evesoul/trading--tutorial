# Visual Agent HANDOFF — TASK-005

## 完成内容

第一批教学视觉规格与示意图已落地。

- 更新 `docs/visual/README.md`：分类、视觉语言、spec 字段、全量索引、Content / UI 引用方式。
- 15 份 spec（均含 id / title / type / purpose / teaching_question / symbol / timeframe / source / period / annotations / status）。
- 8 张已交付 SVG，图内标题与橙标均写「示意图」，页脚写明教学抽象、非真实行情。
- 7 张真实行情图只写 spec（`type: real-chart`，`status: spec`），记录拟采集的 symbol / timeframe / source / period，没有用假 K 线冒充实盘。

本批不证明任何方法能赚钱。交叉、超买超卖、量价、OI 四象限均标为观察工具。

## 修改文件

```
docs/visual/README.md
docs/visual/HANDOFF.md
docs/visual/specs/vis-001-kline-ohlc.md
docs/visual/specs/vis-002-ema-trend.md
docs/visual/specs/vis-003-macd-cross.md
docs/visual/specs/vis-004-rsi-zones.md
docs/visual/specs/vis-005-volume.md
docs/visual/specs/vis-006-open-interest.md
docs/visual/specs/vis-007-funding-rate.md
docs/visual/specs/vis-008-trading-system-flow.md
docs/visual/specs/vis-101-kline-real.md
docs/visual/specs/vis-102-ema-real.md
docs/visual/specs/vis-103-macd-real.md
docs/visual/specs/vis-104-rsi-real.md
docs/visual/specs/vis-105-volume-real.md
docs/visual/specs/vis-106-oi-real.md
docs/visual/specs/vis-107-funding-real.md
public/images/concept/vis-001-kline-ohlc.svg
public/images/concept/vis-002-ema-trend.svg
public/images/concept/vis-003-macd-cross.svg
public/images/concept/vis-004-rsi-zones.svg
public/images/concept/vis-005-volume.svg
public/images/concept/vis-006-open-interest.svg
public/images/concept/vis-007-funding-rate.svg
public/images/flow/vis-008-trading-system-flow.svg
docs/tasks/TASK-005-visual-specs.md
```

未修改 `content/`。

## 测试结果

- 15 份 spec 必填字段齐全。
- 8 张 SVG 为 UTF-8，无空字节；均含「示意图」与「非真实行情」。
- 已将 SVG 光栅化目视检查：标注可读，阳线/阴线、EMA 三段、MACD 金叉死叉、RSI 高低位停留、量价三组、OI 四象限、费率正负、系统流程与「不交易」出口均在。
- 本任务无代码改动，未跑 lint / typecheck / build。

## 已知问题

- 真实行情图 vis-101–vis-107 尚未采集，`period` 为意图窗口，需接入 Binance USDT-M 后再改写实际起止并把 status 改为 delivered。
- 组合图（趋势+动量、OI+Volume 等）本批未做 spec。
- vis-006 在同一小图里叠价格线与 OI 线，便于对照方向，不是上下分窗实盘布局。
- 颜色按常见加密交易所绿阳红阴；A 股读者需看图内「阳线 / 阴线」文字。

## 下一步建议

1. Content Agent：教程用 `/images/concept/` 与 `/images/flow/` 的 SVG；`status: spec` 的实盘图只在正文说明「稍后对照实盘」，不要插假图。Front Matter 用 `visual.charts: [vis-001, …]`。
2. UI Agent：`<img src="..." alt="…示意图">`；alt 不要写成某品种实盘。
3. Nuxt / 数据：接入 Binance USDT-M 后按 vis-101–vis-107 采集，截图放入 `public/images/indicator/`。
4. QA：核对违禁用语、示意图徽章、实盘四字段、断链。
