# Changelog

## 2026-09-17

- 合并 `trading-up/docs`，新开阶段 4「威科夫与量价」：`/wyckoff` 十三篇 + 术语组。形态是观察工具，不是信号。真实行情图迁入 `public/images/wyckoff/`。

## 2026-09-03

- TASK-050：术语页改成查词结构。六组跳转、词条目录、`/glossary#{slug}`。不再把术语组列成课卡。不改词条正文。
- TASK-049：教程壳换成安静编辑风。近白、灰阶、文字导航、课卡改成行。风险改左边线，教学图仍有细框。不改课序。
- TASK-048：课文「本篇」目录、阅读进度条、怎么学课表跳转。学习目标列表抬成一块。不改课序。
- TASK-047：阅读壳打磨。首页 CTA 提到首屏；课文加面包屑与分组侧栏；目录编号；正文标题不再整页发蓝。不改课序。
- TASK-046：整体校对 vis-101–130。课文钩子、复用、数字、违禁词与配图路径核对通过。产品 HANDOFF 不再写「组合课只开两窗」。
- TASK-045：出场与止盈冻结窗（vis-129–130）。四扇门与 2R 到站复用 vis-101。无成交，不填成绩，离场后继续走不写成该拿满。
- TASK-044：阶段 3 读图格冻结窗（vis-124–128）。环境、方向、多周期、入场、止损复用 vis-101。日线 EMA 只取已收盘。入场无成交，止损不画强平，不填成绩。
- TASK-043：补齐其余组合冻结窗（vis-119–123）。趋势+量、价格+OI、OI+量、Funding+OI、RSI+MACD 均复用 vis-101。不新开 KDJ+RSI，不填成绩。
- TASK-042：补多空比 / CVD / 清算瀑布读图 / 案例执行时间线冻结窗（vis-115–118）。K 线复用 vis-101；LSR 与 OI 来自 Vision metrics；CVD 来自 4h taker 字段。瀑布窗无强平逐笔。案例不填成绩。
- TASK-041：补 MA / 布林带 / 趋势+动量 / 对齐后仍失败 冻结窗（vis-111–114，复用 vis-101）。术语页补摆动结构、ATR、热度、只减仓、清算瀑布。组合课实盘窗只做这两张，不是交易终端。
- TASK-040：vis-109 / vis-110 复用 vis-101 冻结窗。结构课与 ATR 课已挂 `::real-chart`。未另打接口，不是组合课实盘窗。
- TASK-039 / Sprint 013：教程全量升级终审 APPROVE。九篇新课均可点；lint / typecheck / build 通过。真实行情 vis-109 / vis-110 可后补。
- TASK-037：阶段 3 二十篇齐。新增多周期、账户热度、执行偏差；案例补匿名执行时间线，不填成绩。vis-025 / 028 / 029；vis-008 补订单 / 成本 / 热度。
- TASK-036：发布交易所屏幕、清算瀑布、订单与成交、成本对照 R；vis-024 / 026 / 027 / 030。阶段 3 已发布篇的 `order` 已按学习路径重排，避免与新课撞号。
- TASK-038：`/course/[...slug]`；主路径含摆动结构与 ATR；KDJ 对照层；系统二十步；未发布编写中。lint / typecheck / build 通过。
- TASK-035：发布摆动结构、ATR 课文；阶段 1 先修 / 下一步与学习路径对齐。
- TASK-034：交付 vis-022 摆动结构、vis-023 ATR 示意图。
- TASK-032：知识库补齐摆动结构、ATR、清算瀑布、订单类型、永续屏幕；OI 专篇补瀑布钩子。课文未写。
- TASK-033：策略框架补齐成交、多周期、成本对照 R；模板 12 节编号未改。课文未写。
- TASK-031 / Sprint 009：教程全量升级产品方案。总纲 `docs/product/curriculum-upgrade.md`。主路径加入摆动结构与 ATR；KDJ 降为对照层；阶段 0 增加交易所屏幕；阶段 3 扩到二十篇（多周期、订单、成本对照 R、账户热度、执行偏差）。课文尚未写，见 Sprint 010–013。
- TASK-030：在 K 线与 MA 之间加入「趋势线与支撑阻力」。示意图 vis-021，真实行情 vis-108 可练习划线。vis-108 是单概念价格结构窗，不是组合课实盘窗。
- Sprint 008：从 Binance Vision 采集 vis-101–107 冻结窗，做成可悬停 / 缩放的教学图。不是交易终端。

## 2026-09-02

- TASK-028 QA 终审 APPROVE：阶段 0–3 本地可学路径齐（导学 + 12 指标 + 7 组合 + 15 系统）。真实行情 vis-101–107 与远程仓库仍不做。
- 启动 TASK-028：Sprint 007 QA。
- TASK-025 阶段 3 后七篇发布；仓位文末可点风险管理。编排器补挂 vis-019 / vis-020。
- TASK-026 交付 vis-019 回测不能只看胜率、vis-020 案例是作业纸。
- TASK-027 `/course` 去掉「阶段 3 后半仍在编写」。
- 启动 Sprint 007：阶段 3 后七篇（风险到案例）。
- TASK-024 QA 终审 APPROVE：阶段 3 前八篇齐。
- 启动 TASK-024：Sprint 006 QA。
- TASK-021 阶段 3 前八篇发布；共振文末可点什么是交易系统。编排器补挂 vis-017 / vis-018。
- TASK-022 交付 vis-017 市场环境三态、vis-018 止损与强平。
- TASK-023 `/course` 增加交易系统十五步；未发布只标编写中。
- 启动 Sprint 006：阶段 3 前八篇（系统到仓位）。
- TASK-020 QA 终审 APPROVE：阶段 2 七篇齐。页脚补阶段 3 中文课名。
- 启动 TASK-020：Sprint 005 QA。
- TASK-017 阶段 2 七篇组合课发布；CVD 文末可点趋势 + 动量。编排器补挂 vis-013–016。
- TASK-018 交付 vis-013–016 组合示意图。
- TASK-019 `/course` 增加指标组合七步；未发布只标编写中。
- 启动 Sprint 005：阶段 2 七篇组合课 + 示意图 + 课程页七步。
- TASK-016 QA 终审 APPROVE：阶段 1 十二篇齐。
- TASK-013 / 014 / 015 合约数据层课文、示意图与课程页四步完成。
- TASK-015 `/course` 增加合约数据层四步；未发布只标编写中。
- 启动 Sprint 004：持仓量 / 资金费率 / 多空比 / CVD。
- 提交 Sprint 003（本地，不推送）。
- TASK-012 QA 终审 APPROVE：Code / Content / Visual 均 PASS。
- 导学主路径改为八篇（到布林带），与 `/course` 一致。
- TASK-009 主路径续四篇 + 术语表完成；编排器补挂 vis-009 / vis-010。
- 启动 TASK-012：Sprint 003 QA。
- TASK-010 交付 vis-009 KDJ、vis-010 布林带示意图。
- TASK-011 课程主路径扩到八篇；未发布仍走 `resolvePublishedPath`，不生成死链。
- 启动 Sprint 003：Volume / MACD / KDJ / 布林带教程 + 术语表 + 主路径 UI 扩展。不推送远程。
- 首次提交：Sprint 001/002 可学主路径（导学 → K 线 → MA → EMA → RSI），不推送远程。
- TASK-008 QA 终审 APPROVE：Code / Content / Visual 均 PASS。
- 修复 Mobile 菜单：去掉页头 `backdrop-filter`，避免 fixed 面板被锁在 header 里。
- RSI 文末链接改为「怎么学」；课文重复 H1 改为 `display: none`。
- TASK-007 学习壳完成：首次旅程、空状态、RSI 不链未发布 Volume。浏览器 MCP 不可用，SSR 已抽查主路径。
- 启动 TASK-008：QA 终审。
- TASK-003 Nuxt 4.5 + Content 3 底座完成；编排器补 `published` 过滤与 `resolvePublishedPath`。
- 启动 TASK-007：UI 学习壳与首次旅程。
- TASK-006 主路径教程完成：导学 + K 线 / MA / EMA / RSI；Volume 未发布，文末回 `/course`。
- TASK-005 第一批视觉完成：8 张示意图 SVG + 7 张 real-chart 仅 spec；引用见 `docs/visual/README.md`。
- TASK-002 指标知识库完成：12 个指标 + 术语 + 永续基础；规范文件名 `rsi.md`。
- 启动 TASK-006：Content 转写导学与 K 线 / MA / EMA / RSI。
- TASK-004 策略框架完成：7 个组合主题 + 风险 / 仓位 / 回测；发布课序跟 `docs/product/learning-path.md`。
- TASK-001 产品信息架构完成：学习路径、九条路由、首次旅程、MVP 范围见 `docs/product/`。
- Content Model 补充 `part: 0`（导学 → `/course`），与现有 `content/00-introduction/` 对齐。
- 启动 Sprint 001：按 AGENTS.md 派出 Product / Knowledge / Nuxt / Strategy / Visual 五名 Agent 并行奠基。
- 新增任务 TASK-001 ~ TASK-005，见 `docs/collaboration/SPRINT-001.md`。
- 新增 Cursor rules：`.cursor/rules/agents.mdc`、`content.mdc`、`trading.mdc`、`nuxt.mdc`。
