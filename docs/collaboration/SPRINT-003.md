# Sprint 003 — 主路径续 + 术语表

## 目标
把阶段 1 从 RSI 续到布林带，并让 `/glossary` 有可读词条。合约数据层（OI / 资金费率 / 多空比 / CVD）放到 Sprint 004。

读者应能走通：

```text
/course → kline → ma → ema → rsi → volume → macd → kdj → bollinger-bands
```

## Owner

| Task | Owner | 目录 | 状态 |
|---|---|---|---|
| TASK-009 | Content Agent | `content/` | completed |
| TASK-010 | Visual Agent | `docs/visual/` `public/images/` | completed |
| TASK-011 | UI Agent | `components/ui/` `pages/course.vue` `components/LessonIndexPage.vue` | completed |

## 依赖
- Knowledge / Strategy 已齐，本轮不重写定义
- Visual 的 KDJ / 布林带示意图与 Content 并行；Volume / MACD 已有 vis-005 / vis-003
- UI 先扩主路径 slug，未发布时显示「编写中」，Content 发布后自动点亮
- QA（TASK-012，completed，APPROVE）

## 明确不做
- 真实行情采集（仍只保留 spec）
- 阶段 2 / 3 正文
- 推送远程
