# HANDOFF — TASK-001 产品信息架构与学习路径

## 完成内容

Product Agent 已定义零基础用户从导学到交易系统的产品约束，供 Knowledge / Strategy / Visual / Nuxt / Content / UI 对齐。

- 三阶段学习路径（指标 → 组合 → 交易系统），含每篇 slug、先修、建议下一篇、排序理由
- 导航、页面职责、`content/` 到路由的映射
- 路由清单，与 `docs/architecture/project.md` 九条路径对齐，本期不改路由
- 首次访问旅程：落地 → 认识风险 → 选课 → 知道下一步
- Sprint 001 / 002 做与不做；明确教育站边界，排除信号 / 荐股 / 自动交易

未写：教程正文、指标定义、UI / Nuxt 代码、TASK 新文件、git commit。

## 修改文件

| 文件 | 说明 |
|---|---|
| `docs/product/learning-path.md` | 学习路径与 Front Matter 约定 |
| `docs/product/information-architecture.md` | 导航与页面职责 |
| `docs/product/page-map.md` | 路由与 slug 清单 |
| `docs/product/user-journey.md` | 首次访问旅程 |
| `docs/product/mvp-scope.md` | Sprint 001 / 002 范围 |
| `docs/product/HANDOFF.md` | 本交接 |
| `docs/tasks/TASK-001-product-ia.md` | Status → review，勾选验收项 |

## 测试结果

纯文档任务：无 lint / typecheck / build。  
自检：未使用违禁措辞；路由表与 architecture 一致；未改 `docs/knowledge/`、`content/`、`pages/`。

## 已知问题

1. **`part: 0` 已由编排器写入** `docs/architecture/content-model.md`。Nuxt schema 必须兼容 0。
2. **`TODO.md` 组合列表按配对展开**（EMA+RSI 等），本产品将其收束为 7 个主题页，与 Strategy TASK-004 文件名对齐。Content 不要为每个配对各建一级路由，除非以后单独立 TASK。
3. **现有 RSI 草稿** `order: 5`、先修仅 `kline`、next 为 `macd`，与本路径不一致。以 `learning-path.md` 为准，Content 在 TASK-006 修订。
4. **阶段 2 / 3 在 MVP 无正文。** 路由仍要能开，依赖 Nuxt / UI 做空状态，否则「组合」「交易系统」会变成死胡同。
5. **术语页 Content 尚未存在。** `/glossary` 在 Sprint 001 可以是空骨架。
6. **首页文案不在 Content 树里。** UI 需自备短文案，并遵守教育站边界。

## 关键产品决策（请勿在实现时静默改掉）

1. 导学映射到 `/course`，不新建 `/introduction`。
2. 阶段 1 教学序：K 线 → 趋势线与支撑阻力 → MA → EMA → RSI → Volume → MACD → KDJ → 布林带 → OI → 资金费率 → 多空比 → CVD。
3. Sprint 002 只保证主路径四篇指标 + 导学可学完。
4. 组合按主题 7 篇，不按配对 9 篇做一级导航。
5. 阶段 3 以「什么是交易系统」开篇，止损先于止盈与仓位。
6. 只展示 `published` 为可导航；编写中的课不链到 404。
7. 本站不做信号、荐股、自动交易、交易终端。

## 给下一波 Agent 的依赖

### Content（TASK-006，等 TASK-002）

- 按 `learning-path.md` 写导学修订 + `kline` / `ma` / `ema` / `rsi`
- 目录：`content/01-indicators/{slug}/index.md`
- 修正 RSI front matter：`order: 4`，先修 kline/ma/ema，next `volume`（Volume 未发布时 next 可暂空，文末说明回 `/course`）
- 导学保留并加强风险与「不是信号站」
- 不要写阶段 2 / 3 正文

### Nuxt（TASK-003，可与 Product 并行，但实现应对齐本文）

- 实现 page-map 九条路由，`[...slug]` 单段即可
- schema 允许 `part: 0`；introduction 查询到 `/course`
- `useCourse`：按 part/order 排序；prerequisites/next → 站内路径
- 未发布 slug 不要出现在上一篇/下一篇
- 教程正文只来自 Content

### UI（TASK-007，等 TASK-003）

- 走通 `user-journey.md`：首页风险 → `/course` 选推荐起点 → 文章页下一步
- 课程壳：阶段徽章、侧栏、先修芯片、上一篇/下一篇
- `/combinations` 与 `/trading-system` 空状态回指标或怎么学
- 避免交易终端外观；桌面 + 移动
- 首页短文案禁止收益承诺

### Knowledge / Strategy / Visual（Sprint 001 并行）

- Knowledge：定义与术语即可，不必按教学序重排文件；文件名建议与 slug 对齐（`rsi.md` 等）
- Strategy：组合文件名已与本路径 7 个 slug 对齐，请保持
- Visual：优先 K 线 / EMA / RSI（主路径）；MACD / Volume / OI / Funding / 系统流程可出 Spec，供后续课使用

### QA（TASK-008）

- 主路径无死链
- 抽查无违禁措辞、无信号产品描述
- 空状态页仍可回到 `/course`

## 下一步建议（编排器）

- TASK-001 → review → QA 或编排器确认后 completed
- 更新 `docs/tasks/TODO.md` 中「产品信息架构」勾选
- 不要在未开 TASK 时改 `docs/architecture/content-model.md` 的 part 枚举以外的产品决策
