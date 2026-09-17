# 威科夫模块真实行情图

阶段 4 课文使用从 `trading-up/docs/images` 迁入的币安 USDT-M 永续静态图，目录：`public/images/wyckoff/`。

这些图带教学标注，不是 `vis-101–130` 那套可交互冻结窗。课文用 markdown 图片，并在图下写 **行情来源**（symbol / timeframe / period）。数据来自币安期货公开 K 线。图中「标记价」线若出现，是收盘平滑示意，不是官方历史标记价。

禁止用这些图证明盈利能力。示意图徽章不适用；它们是真实行情截图加标注。

| 文件 | 主要用于 |
|---|---|
| `00-read-kline.png` | 读 K 线与量柱 |
| `01-01-climax-wick.png` 至 `01-05-dual-price.png` | 永续与股票教材的差异 |
| `02-01-accumulation.png` 至 `02-05-eth-deep-spring.png` | 吸筹与 Spring |
| `03-01-sos.png` 至 `03-05-eth-jac.png` | SOS / BUEC |
| `04-01-distribution.png` 至 `04-05-eth-double-top.png` | 派发 / UTAD |
| `05-01-sow.png` 至 `05-05-alt-vs-btc.png` | SOW / 恐慌 |
| `06-01-compressed-spring.png` 至 `06-05-btc-lead.png` | 事件变形 |
| `07-01-breakout-matrix.png` 至 `07-05-no-demand.png` | 努力与结果 |
| `08-01-resonance.png` 至 `08-05-daily-close.png` | 多周期 |
| `09-01-find-structure.png`、`09-04-manage.png` | 读图流程 |
| `10-01-wick-mark.png` 至 `10-05-after-hunt.png` | 永续过滤器 |
| `11-a1-daily.png` 至 `11-c2-follow.png` | 综合案例 |

重绘原项目脚本在 `trading-up/scripts/`，本站本轮只迁入已出图，不把出图流水线并入 Nuxt。
