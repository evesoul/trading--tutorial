# Knowledge Agent HANDOFF — TASK-032

## 完成内容

按 `docs/product/curriculum-upgrade.md` 第 7.1 节补齐教程升级所需知识定义。未写 `content/`、未写策略规则、未改页面或组件。

新建 5 个知识文件：

- **摆动结构**（10 问）：HH/HL vs LH/LL、推进 vs 回撤、收盘离开 vs 影线扫过；默认读图顺序先结构再均线再副图。与趋势线篇分工：本文件管序列与假突破，趋势线管斜线 / 水平区域。未写订单块、Smart Money、庄家诱多。
- **ATR**（10 问）：True Range 三项取最大；教学级平滑；用途是噪声尺子、止损距离、高波动时同等风险下仓位变小。与布林带：尺子 vs 通道。未写 ATR 突破开仓，未颁布倍数。
- **清算瀑布**（10 问）：强平单多为被动市价打进薄盘 → 插针 → 连锁。瀑布中 volume / OI / CVD / 多空比默认暂时不可解释方向。禁止条件：连续强平、盘口一跳数个点。未教抄底或预测结束。
- **订单类型**（是什么 / 解决什么 / 常见误读）：市价、限价、止损市价、止损限价、只减仓、只做 maker、GTC / IOC / FOK；最新价止损 vs 标记价强平；部分成交与触发后未成交；薄盘止损 ≈ 市价扫货。
- **永续屏幕字段**（是什么 / 解决什么 / 常见误读）：钱包余额 / 未实现盈亏 / 权益；三价；预估强平、维持保证金、逐仓全仓、杠杆是展示；资金费倒计时；风险限额 / 仓位档位。未教开户，未推荐交易所或杠杆。

修订只补钩子与边界，未重写旧篇主旨。术语首次中英对照。全文检索无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」。观察工具未写成买卖指令。不鼓励高杠杆。

## 修改文件

| 路径 | 动作 |
|---|---|
| `docs/knowledge/indicators/market-structure.md` | 新建 |
| `docs/knowledge/indicators/atr.md` | 新建 |
| `docs/knowledge/indicators/liquidation-cascade.md` | 新建 |
| `docs/knowledge/order-types.md` | 新建 |
| `docs/knowledge/perp-screen.md` | 新建 |
| `docs/knowledge/glossary.md` | 补 ATR、True Range、摆动结构、假突破、热度、只减仓、只做 maker、风险限额 / 仓位档位、决策 / 执行周期；顺带保险基金 / ADL、清算瀑布指针 |
| `docs/knowledge/perpetual-futures.md` | 补风险限额与仓位档位、强平单进簿、保险基金 / ADL（机制，不写时机） |
| `docs/knowledge/indicators/kline.md` | 同一 OHLC 不同盘中路径；盘中止损可扫到收盘看不到的价 |
| `docs/knowledge/indicators/trendlines.md` | 假突破细节指向 market-structure；下一篇改为结构 |
| `docs/knowledge/indicators/funding-rate.md` | 费率 × 名义 × 周期数 ≈ 持有成本；多空不对称一句 |
| `docs/knowledge/indicators/volume.md` | 新闻 / 强平时段巨量可能是连锁平仓，链到 liquidation-cascade |
| `docs/knowledge/indicators/cvd.md` | 瀑布中失真，链到 liquidation-cascade |
| `docs/knowledge/indicators/bollinger-bands.md` | 对照 ATR：尺子 vs 通道 |
| `docs/knowledge/README.md` | 索引挂上新文件；主路径含结构与 ATR；合约层含清算瀑布 |
| `docs/knowledge/HANDOFF.md` | 本文件（文首 TASK-032；下文保留 TASK-002） |
| `docs/tasks/TASK-032-knowledge-upgrade.md` | Status → completed，勾选验收项 |

## 测试结果

本任务无代码。知识自检：

- [x] 三个新指标文件均含 10 问标题；屏幕字段、订单用「是什么 / 解决什么 / 常见误读」
- [x] 术语首次出现有中英对照；README 与 glossary 已挂上
- [x] 全文检索无 AGENTS.md 第 6 节所列违禁表述
- [x] 未把观察写成买卖指令；未颁布推荐杠杆或 ATR 倍数
- [x] 未改 `content/`、`docs/strategy/`、`docs/product/`、`pages/`、`components/`、`public/`

未跑 lint / typecheck / build（范围外）。

## 已知问题

1. **交易所口径仍因所而异**：风险限额档位、止损触发价源、ADL 排序、强平热力图不能写成全市场标准。课文须标注 source，并用行为描述代替按钮名。
2. **ATR 平滑（Wilder vs SMA）、摆动窗口主观性**会导致跨软件 / 跨人标点对不上。课文须声明算法与窗口。
3. **`open-interest.md` 已补瀑布失真钩子**（编排器收口：失效条件 + 误区第 5 条链到 liquidation-cascade）。
4. **成本对照 R、多周期、热度规则**只立知识定义与钩子，正文归 Strategy / Content，本目录未写可执行规则。
5. **未配示意图**。Visual 预留 vis-022 / 023 / 024 / 027 / 030；未采集前课文只用示意图，真实行情须写 symbol、timeframe、source、period。
6. 历史案例与教学演算不能代表未来结果。

## 下一步（Content 可转写）

知识文件已齐，Content 可开写对应新课（仍须等 Visual 示意图规格，未采集前不插假行情）：

1. `perp-screen` — 导学第二篇
2. `market-structure` — 趋势线之后、MA 之前
3. `atr` — Volume 之后、布林带之前
4. `order-types` — 入场规则之前
5. `liquidation-cascade` — 合约数据层收尾

旧课按 `curriculum-upgrade.md` 第 4 节补钩子即可，不重写主旨：`kline`、`trendlines`、`funding-rate`、`volume`、`bollinger-bands` 的知识侧钩子已在本目录就绪，课文侧仍待 Content。

### 其他 Agent

- **Strategy Agent（TASK-033）**：execution / multi-timeframe / cost-vs-r 可引用本目录订单、屏幕、ATR、热度、决策周期定义。
- **Visual Agent**：优先 vis-022 结构、vis-023 ATR、vis-030 屏幕、vis-024 订单、vis-027 瀑布。
- **QA Agent**：按内容清单核对术语、禁止信号化、禁止条件是否写进瀑布与订单局限。

---

# 历史：TASK-002

以下为 Sprint 001 知识底座交接，供对照；以文首 TASK-032 为当前状态。

## 完成内容

已建立第一部分指标与永续合约基础术语的知识底座，供 Content / Strategy / QA 引用。未写 `content/` 教程，未写策略规则，未改代码。

交付：

- 知识库完整索引
- 术语表与统一决策
- U 本位永续合约机制说明（保证金、杠杆、强平、标记价、资金费概念）
- 12 个指标文件，均按 10 问写全
- 原 `RSI.md` 草稿已合并进 `rsi.md`

知识原则：准确、中性、可解释、面向教学。超买 / 超卖 / 背离 / 金叉 / 死叉均写明**不是确定性信号**。未使用收益承诺或绝对化预测用语。

## 术语统一决策

见 `README.md` 与 `glossary.md`。单独说均线 / MA 默认 SMA；教学正文用强平；标记价用于盈亏与强平，K 线看最新价。

## 当时已知问题（部分仍有效）

1. 资金费率、多空比、OI、CVD 的精确公式因交易所而异。
2. 布林带标准差、EMA 种子、KDJ 种子会导致跨软件数值对不上。
3. macOS 大小写不敏感：规范名是 `rsi.md`。
