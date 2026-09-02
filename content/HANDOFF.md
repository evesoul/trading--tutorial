# Content Agent HANDOFF — TASK-006

## 完成内容

已把 Knowledge 转写成主路径五篇零基础教程。未写阶段 2 / 3 正文，未写 Volume / MACD 及之后指标，未改 `docs/knowledge/`、`docs/strategy/`、`pages/`、`components/`。未做 git commit。

交付：

- 导学：三阶段地图、教育站边界、保证金 / 杠杆 / 强平 / 标记价、历史案例不能代表未来结果
- K 线：OHLC、未收盘会变、K 线用最新价、强平看标记价
- MA：默认 SMA、手算滑出跳变、金叉死叉是观察、震荡市反复交叉反例
- EMA：与 SMA 权重对照、起始日差异、震荡市交叉更多
- RSI：修订草稿；order 改为 4；先修 kline / ma / ema；next 仍为 volume；文末不链未发布页

术语对齐 Knowledge：MA = SMA、强平作正式名、Timeframe vs Period、超买 / 背离 / 金叉均为观察用语。

## 修改文件

| 路径 | 动作 |
|---|---|
| `content/00-introduction/index.md` | 重写导学 |
| `content/01-indicators/kline/index.md` | 新建 |
| `content/01-indicators/ma/index.md` | 新建 |
| `content/01-indicators/ema/index.md` | 新建 |
| `content/01-indicators/rsi/index.md` | 按学习路径修订草稿 |
| `content/HANDOFF.md` | 本文件 |
| `docs/tasks/TASK-006-content-main-path.md` | Status → review，勾选验收项 |

## Front Matter 摘要

| 路径 | slug | part | category | order | status | prerequisites | next |
|---|---|---|---|---|---|---|---|
| `content/00-introduction/index.md` | `introduction` | 0 | introduction | 0 | published | — | `kline` |
| `content/01-indicators/kline/index.md` | `kline` | 1 | indicators | 1 | published | `introduction` | `ma` |
| `content/01-indicators/ma/index.md` | `ma` | 1 | indicators | 2 | published | `kline` | `ema` |
| `content/01-indicators/ema/index.md` | `ema` | 1 | indicators | 3 | published | `ma` | `rsi` |
| `content/01-indicators/rsi/index.md` | `rsi` | 1 | indicators | 4 | published | `kline` `ma` `ema` | `volume` |

每篇均含 `title` `description` `part` `category` `level` `order` `slug` `status` `learning.prerequisites` `learning.next`。

## 引用的图

| 文章 | 图 | 说明 |
|---|---|---|
| K 线 | `/images/concept/vis-001-kline-ohlc.svg`（vis-001） | 示意图；OHLC / 实体 / 影线 |
| EMA | `/images/concept/vis-002-ema-trend.svg`（vis-002） | 示意图；上 / 震 / 下三段位置 |
| RSI | `/images/concept/vis-004-rsi-zones.svg`（vis-004） | 示意图；70 / 30 观察区与高低位停留 |
| 导学、MA | 无图 | MA 用手算表；无实盘则不开 real-chart |

正文均标明「示意图」「不是真实行情」。未插入 vis-101 及之后仅 spec 的真实行情图，未伪造 K 线。

## 已知断链处理

| 目标 | 处理 |
|---|---|
| Volume、MACD 等未发布课 | 正文不写 `/indicators/volume`、`/indicators/macd` 等链接 |
| RSI `learning.next: volume` | 仅写在 Front Matter，供课程壳识别；文末写「下一篇 Volume 编写中，可先回 [/course](/course)」 |
| 阶段 2 / 3 | 导学只提地图与「正文还没写」，不链到空文章 |
| `/glossary` | 导学可链；术语页允许空骨架 |
| 已发布主路径 | `/course`、`/indicators/kline`、`/indicators/ma`、`/indicators/ema`、`/indicators/rsi` |

旧 RSI 草稿中的 `[MACD](../macd/index.md)` 已删除。

## 测试结果

纯文档任务：无 lint / typecheck / build。

自检：

- [x] 五篇结构均为：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步
- [x] 术语首次出现有中英或定义
- [x] 检索无「一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利」
- [x] 金叉 / 超买 / 背离未写成开仓指令
- [x] 示意图路径存在且带「示意图」说明
- [x] 内部链接不指向未发布 404
- [x] Front Matter 完整

未跑站点构建。课程壳是否把未发布的 `volume` 渲染成下一篇链接，需 Nuxt / UI / QA 再核。

## 已知问题

1. **RSI Front Matter 的 next 仍是 `volume`。** 文末已改成回 `/course`。若 `useCourse` 把 next 直接渲成 `<a href="/indicators/volume">`，仍会 404。请 Nuxt 对未发布 slug 不输出下一篇链接。
2. **真实行情图 vis-101 / vis-102 / vis-104 尚未采集。** 课文写「稍后补上」，没有插假图。
3. **MA 无专用示意图。** 用手算表演示滑出跳变；若 Visual 后续补 SMA 滑出图，再挂 `visual.charts`。
4. **`/glossary` 仍无 Content 词条。** 导学链过去依赖空骨架页，不依赖词条正文。
5. **阶段 2 / 3 仍无正文。** 目录空状态不在本任务范围。

## 下一步建议

- QA：按 `docs/qa/content-checklist.md` 审术语、违禁措辞、示意图徽章、断链
- Nuxt / UI：`published` 才进上一篇 / 下一篇；`volume` 未发布时不要生成链接
- Visual：主路径真实行情图采集后，Content 再补四字段图注
- Content 后续 Sprint：Volume → MACD，勿提前把未发布课链进正文
