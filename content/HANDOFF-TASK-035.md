# Content HANDOFF — TASK-035

Owner: Content Agent  
Status: completed

## 完成内容

发布阶段 1 两篇新课，并把主路径接到新学习路径。

- 新建 `market-structure`：摆动点标法、HH/HL vs LH/LL、推进 vs 回撤、收盘离开 vs 影线扫过、破后角色可能互换或扫回、读图顺序先结构再均线再副图。不教订单块 / Smart Money / 庄家诱多。
- 新建 `atr`：ATR 测波幅不给方向；True Range 三项取最大；跨品种 / 跨周期不能直接比；用途是噪声尺子、止损距离、高波动时名义仓位变小；与布林带对照为尺子 vs 通道。不教 ATR 突破开仓，不颁布倍数。
- 阶段 1 Front Matter 的 `order` / `prerequisites` / `next` 已与 `docs/product/learning-path.md` 对齐。
- 导学地图改为：趋势线 → 摆动结构 → … → Volume → ATR → 布林带；KDJ 标对照层。下一篇仍是 K 线，未链未发布的屏幕课。
- CVD 下一篇仍是已发布的 `trend-momentum`，未链未写的清算瀑布。

## 修改文件

```
content/01-indicators/market-structure/index.md   # 新建
content/01-indicators/atr/index.md                # 新建
content/00-introduction/index.md                  # 阶段 1 地图与篇数
content/01-indicators/kline/index.md              # OHLC 路径一句；删「量能课还没写」
content/01-indicators/trendlines/index.md         # next → market-structure
content/01-indicators/ma/index.md                 # order 4；先修加结构；先结构再均线
content/01-indicators/ema/index.md                # order 5；先结构再均线一句
content/01-indicators/rsi/index.md                # order 6；prereq = ema
content/01-indicators/volume/index.md             # order 7；next → atr
content/01-indicators/bollinger-bands/index.md    # 先修加 atr；next → macd
content/01-indicators/macd/index.md               # order 10；上一篇改为布林带
content/01-indicators/kdj/index.md                # order 11；对照层；next → open-interest
content/01-indicators/open-interest/index.md      # order 12；上一篇不再写布林带
content/01-indicators/funding-rate/index.md       # order 13
content/01-indicators/long-short-ratio/index.md   # order 14
content/01-indicators/cvd/index.md                # order 15
docs/tasks/TASK-035-content-structure-atr.md      # status → completed
```

未改：`docs/knowledge/`、`docs/strategy/`、`docs/visual/`、`pages/`、`components/ui/courseMeta.ts`。

## 测试结果

- 自检：阶段 1 十五篇 Front Matter 与学习路径表一致。
- 自检：导学与阶段 1 正文站内链均指向已发布 slug；无 `perp-screen`、`liquidation-cascade`、`multi-timeframe`、`order-types` 等未发布死链。
- 自检：两篇新课无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」。
- 示意图引用已按已交付文件撰写：`vis-022-market-structure.svg`、`vis-023-atr.svg` 均存在。未加 `::real-chart`（vis-109 / vis-110 未采集）。
- 未跑 lint / typecheck / build（本任务只改 Markdown）。
- 未跑历史 Sprint 链接脚本。Sprint 003 / 004 仍按旧课序抽查（例如布林带下一步是 OI），留给 TASK-039。

## 已知问题

- `courseMeta.ts` 由 UI TASK-038 改。读者在 `/course`、`/indicators` 目录上暂时仍可能看到旧主路径（无摆动结构 / ATR，或布林带直接跳 OI）。
- vis-022 源文件里部分中文在部分环境下显示为乱码，图本身已交付；正文按三格（上升结构 / 推进回撤 / 假突破）引用。
- 真实行航窗 vis-109 / vis-110 未采集，两篇新课只有示意图。
- 历史 Sprint 链接测试与新课序不一致，QA 需更新。

## 下一步

- TASK-038：把 `MAIN_PATH_SLUGS` 等与学习路径对齐，目录才能看见新主路径。
- Visual：若需实盘窗，另采 vis-109 / vis-110，再补 `::real-chart`。
- TASK-039：按新课序重写链接抽查；走通导学 → 趋势线 → 结构 → … → Volume → ATR → 布林带。
- 不 git commit（本任务要求）。
