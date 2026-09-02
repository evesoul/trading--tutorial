# Sprint 005 — 阶段 2 指标组合

## 目标
按产品 7 个主题写完阶段 2。一篇课对应一个观察主题，主题内用 1–2 个配对作正反案例。不要为每个配对各建一级路由。

读者应能走通：

```text
cvd → trend-momentum → trend-volume → rsi-macd → price-oi → oi-volume → funding-oi → multi-indicator
```

多指标共振之后阶段 3 未写：文末回 `/course`，不链空系统页。

## Owner

| Task | Owner | 目录 | 状态 |
|---|---|---|---|
| TASK-017 | Content Agent | `content/` | in-progress |
| TASK-018 | Visual Agent | `docs/visual/` `public/images/` | in-progress |
| TASK-019 | UI Agent | `components/ui/` `pages/course.vue` `components/LessonIndexPage.vue` | completed |

## 依赖
- Knowledge / Strategy 已齐，本轮不重写定义
- 发布课序以 `docs/product/learning-path.md` 为准（`rsi-macd` 是第 3 篇）
- Visual 并行出组合示意图；课文可先复用 vis-002–007
- UI 加「指标组合」七步，未发布显示编写中
- QA 三篇齐后再开 TASK-020

## 明确不做
- 阶段 3 正文
- 真实行情采集
- 推送远程
