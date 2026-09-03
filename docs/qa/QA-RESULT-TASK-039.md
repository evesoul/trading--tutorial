# QA RESULT — TASK-039 / Sprint 013

终审日期：2026-09-03  
Owner：QA Agent  
范围：教程全量升级终审。课序以 `docs/product/learning-path.md` 为准，未改产品课序。

## QA RESULT

Code: PASS  
Content: PASS  
Visual: PASS

Issues:

- low / Nuxt / `npm run build` 仍有 Nitro 上游 `H3Error` unused import 警告，不影响通过。
- info / Product / `docs/product/information-architecture.md` 编排器收口时已改为「阶段 3 已发布二十篇」。
- info / Visual / 真实行情窗 vis-109 / vis-110 可后补。九篇新课均用示意图，未插假行情。
- info / Content / RSI / MACD 单篇用结构对照，明确「不要再叠振荡器」写在组合课与 KDJ 对照层。不据此 FAIL。

无 high 级问题。本轮已直接修：导学过期「仍待后续」、旧测试「十五步 / 仓位下一篇风险管理」断言。

Recommendation:  
APPROVE

## 验证方法

### 代码

Node v24.18.0（>= 22.5）。

| 命令 | 结果 |
|---|---|
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过。Content 解析 **51** 个文件（导学 2 + 指标 16 + 组合 7 + 系统 20 + 术语 6）。HANDOFF 已 exclude。 |

预览：`npm run preview -- --port 3020`，`http://127.0.0.1:3020`。  
`node tests/check-task-038-shell.mjs` 通过。  
`node tests/check-task-039-content.mjs` 通过。  
`BASE_URL=http://127.0.0.1:3020 node tests/check-task-039-links.mjs` 通过。  
`BASE_URL=http://127.0.0.1:3020 node tests/check-sprint007-links.mjs` 通过。  
`BASE_URL=http://127.0.0.1:3020 node tests/check-sprint007-visual.mjs` 通过。

### 课序一致

学习路径、page-map、`courseMeta.ts`、导学地图 slug 一致：

- `STAGE0`：`introduction`、`perp-screen`
- `MAIN_PATH`：含 `market-structure`、`atr`，不含 `kdj`
- 对照层：`kdj`；无 KDJ+RSI 新课
- 合约层含 `liquidation-cascade`
- `SYSTEM` 二十篇

Front matter 的 `part` / `order` / `learning.next` 与学习路径表对齐，同 `part` 无 order 撞号。九篇新课均为 `published`。

### 内容

九篇新课结构均为：学习目标 → 概念 / 怎么写规则 → 示意图 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。

| slug | 路径 |
|---|---|
| `perp-screen` | `/course/perp-screen` |
| `market-structure` | `/indicators/market-structure` |
| `atr` | `/indicators/atr` |
| `liquidation-cascade` | `/indicators/liquidation-cascade` |
| `multi-timeframe` | `/trading-system/multi-timeframe` |
| `order-types` | `/trading-system/order-types` |
| `cost-vs-r` | `/trading-system/cost-vs-r` |
| `account-heat` | `/trading-system/account-heat` |
| `execution-bias` | `/trading-system/execution-bias` |

第 4 节旧课钩子已落地：K 线盘中路径、趋势线下一篇结构、MA 先结构、Volume / OI / CVD 链瀑布、Funding 链成本、组合课不叠 KDJ、系统课补多周期 / 订单 / 成本 / 热度 / 执行偏差。无「回测专篇尚未写」「量能课还没写」。

课文检索无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利。  
无推荐杠杆。案例不填胜率 / 收益率 / 权益曲线当成绩。订单课写明「图上没有买卖按钮」。

本轮修正：

- `content/00-introduction/index.md`：阶段 3 ASCII 地图补多周期 / 订单 / 成本 / 热度；删「多周期、热度、执行偏差仍待后续」；链路补上三篇已发布课；「怎么使用」不再写未写篇。

### 链接

`/course` 四十三步均可点，九篇新课不再标编写中。仓位页脚下一篇是 `/trading-system/cost-vs-r`。案例回 `/course`。未发布空状态未出现。

### 视觉

本机 Chrome headless + CDP（`tests/check-sprint007-visual.mjs`）：

- Desktop 1280：`/course` 四十三步（导学 2 + 主路径 9 + 合约层 5 + 组合 7 + 系统 20）均可点并打开对应课文
- vis-008 / 019 / 020：`alt` 含「示意图」；图宽 680
- 九篇新课示意图 vis-022–030 文件存在且含「示意图」
- Mobile 390×844：鼠标点开/关菜单，面板滑出，`z-index: 45`，页头无 `backdrop-filter`

未画交易终端，未用买卖按钮验收订单课。

## HANDOFF

见 `docs/qa/HANDOFF-TASK-039.md`。
