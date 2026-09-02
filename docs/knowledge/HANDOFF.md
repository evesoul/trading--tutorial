# Knowledge Agent HANDOFF — TASK-002

## 完成内容

已建立第一部分指标与永续合约基础术语的知识底座，供 Content / Strategy / QA 引用。未写 `content/` 教程，未写策略规则，未改代码。

交付：

- 知识库完整索引
- 术语表与统一决策
- U 本位永续合约机制说明（保证金、杠杆、强平、标记价、资金费概念）
- 12 个指标文件，均按 10 问写全
- 原 `RSI.md` 草稿已合并进 `rsi.md`（计算、观察、局限均更完整；70/30 与背离保留为观察工具）

知识原则：准确、中性、可解释、面向教学。超买 / 超卖 / 背离 / 金叉 / 死叉均写明**不是确定性信号**。未使用收益承诺或绝对化预测用语。

## 修改文件

| 路径 | 动作 |
|---|---|
| `docs/knowledge/README.md` | 更新为完整索引 + 术语速查 |
| `docs/knowledge/glossary.md` | 新建 |
| `docs/knowledge/perpetual-futures.md` | 新建 |
| `docs/knowledge/indicators/kline.md` | 新建 |
| `docs/knowledge/indicators/ma.md` | 新建 |
| `docs/knowledge/indicators/ema.md` | 新建 |
| `docs/knowledge/indicators/macd.md` | 新建 |
| `docs/knowledge/indicators/rsi.md` | 新建（合并原草稿） |
| `docs/knowledge/indicators/kdj.md` | 新建 |
| `docs/knowledge/indicators/bollinger-bands.md` | 新建 |
| `docs/knowledge/indicators/volume.md` | 新建 |
| `docs/knowledge/indicators/open-interest.md` | 新建 |
| `docs/knowledge/indicators/funding-rate.md` | 新建 |
| `docs/knowledge/indicators/long-short-ratio.md` | 新建 |
| `docs/knowledge/indicators/cvd.md` | 新建 |
| `docs/knowledge/HANDOFF.md` | 本文件 |
| `docs/knowledge/indicators/RSI.md` | 已删除独立指针；内容并入 `rsi.md`（大小写不敏感文件系统上二者为同一路径） |
| `docs/tasks/TASK-002-knowledge-indicators.md` | Status → review，勾选验收项 |

## 术语统一决策

| 决策 | 规范 | 不要写成 |
|---|---|---|
| 单独说均线 / MA | 默认 **SMA** | 把 EMA 也叫 MA |
| U 本位 | USDT-margined / Quote-margined，教学默认 USDT | 「USDT 本位」为唯一正式名（可并列，不单用） |
| 永续合约 | Perpetual Futures，可并列 Perpetual Swap | 「无限期期货」作正式名 |
| 持仓量 | Open Interest (OI)，可并列未平仓合约 | 与成交量混用 |
| 资金费率 vs 资金费 | Rate = 比率；Payment = 实际划转 | 二者互换 |
| 多空比 | 必须标注口径（账户 / 持仓 / 大户） | 无来源的「市场多空」 |
| CVD | 中文「累计成交量差」与 CVD 并用 | 当成普通成交量或 OI |
| 强平 | 教学正文用强平 | 只用「爆仓」当正式名 |
| 标记价格 vs 最新价 | 盈亏与强平看标记价；K 线看最新价 | 混为一谈 |
| 图表周期 vs 回看参数 | Timeframe vs Period/Length | 都叫「周期」不加说明 |
| KDJ 的 K | 称「K 值」 | 称「K 线」（与蜡烛图冲突） |
| 超买超卖 / 背离 / 金叉死叉 | 观察用语 | 买入卖出信号 |
| 布林带中轨 | 默认 SMA(20) | 未声明就改成 EMA |
| RSI 算法 | 默认 Wilder 平滑，N=14 | 与 SMA-RSI 混用而不声明 |

完整表见 `README.md` 与 `glossary.md`。

## 测试结果

本任务无代码。知识自检：

- [x] 12 个指标均有独立文件，且均含 10 问标题
- [x] 术语首次出现有中英对照
- [x] 全文检索无 AGENTS.md 第 6 节所列违禁表述
- [x] RSI 覆盖原草稿的定义、70/30、背离警告、趋势中可停留、EMA/MACD/Volume/OI 组合，并补全 Wilder 计算
- [x] README 可检索全部条目
- [x] 本 HANDOFF 已留下

未跑 lint / typecheck / build（范围外）。

## 已知问题

1. **资金费率、多空比、OI、CVD 的精确公式因交易所而异**。知识库只给教学结构与口径要求，不把单一交易所公式写成全市场标准。Content 写案例时必须标注 source。
2. **布林带标准差（除以 N 或 N−1）、EMA 种子、KDJ 种子**会导致跨软件数值对不上。课文需声明「以所用图表软件为准」。
3. **macOS 大小写不敏感**：不能同时存在 `RSI.md` 与 `rsi.md`。规范名是 `rsi.md`。
4. **第二部分组合**只在各指标第 10 问给知识边界，未写可执行规则（属 Strategy Agent）。
5. 未配图表；真实行情图由 Visual / Content 后续补，且须记录 symbol、timeframe、source、period。

## 下一步建议

### Content Agent 应优先转写的 4 篇

与 Sprint 001 的 TASK-006 对齐：

1. **K 线** — `indicators/kline.md`（读图地基；必须教未收盘会变）
2. **均线 MA** — `indicators/ma.md`（先建立滞后与金叉死叉的反例）
3. **指数均线 EMA** — `indicators/ema.md`（紧接 MA，对比权重，为 MACD 铺路）
4. **RSI** — `indicators/rsi.md`（第一个动量工具；必须对照趋势粘滞与震荡摆动）

**同步先修（不占 4 篇名额，但引言必须写）**：`perpetual-futures.md` + `glossary.md` 中的保证金、杠杆、强平、标记价。否则后文无法落地永续风险。

建议暂缓独立成篇：KDJ（放在 RSI 之后作对比）、多空比与 CVD（先有 Volume / OI / Funding）。

### 其他 Agent

- **Strategy Agent**：可按 README 中的组合预习写框架，指标定义以本目录为准。
- **Visual Agent**：优先 K 线 OHLC、SMA 滑出跳变、RSI 70 粘滞反例、OI 四象限示意图。
- **QA Agent**：按 `docs/qa/content-checklist.md` 审本目录术语与禁止信号化表述。
- **Product Agent**：学习路径第一站应包含永续机制，再进入 K 线。
