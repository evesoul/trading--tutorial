# Sprint 006 — 阶段 3 前半：把观察写成规则

## 目标
写完阶段 3 前八篇：从「什么是交易系统」到仓位管理。后七篇（风险、频率、日志、回测、统计、优化、案例）放到下一轮。

读者应能走通：

```text
multi-indicator → what-is-a-trading-system → market-regime → direction → entry-rules → exit-rules → stop-loss → take-profit → position-sizing
```

仓位之后风险管理未写：文末回 `/course`，不链空系统页。

## Owner

| Task | Owner | 目录 | 状态 |
|---|---|---|---|
| TASK-021 | Content Agent | `content/` | completed |
| TASK-022 | Visual Agent | `docs/visual/` `public/images/` | completed |
| TASK-023 | UI Agent | `components/ui/` `pages/course.vue` `components/LessonIndexPage.vue` | completed |

## 依赖
- 策略模板：`docs/strategy/system-template.md`、`position-sizing.md`、`risk-management.md`（只引用边界，本轮不写风险全文）
- 发布课序以 `docs/product/learning-path.md` 为准
- vis-008 已有系统流程；Visual 补环境 / 止损对照
- UI 加阶段 3 路径，未发布显示编写中
- QA（TASK-024，completed，APPROVE）

## 明确不做
- 阶段 3 后七篇正文
- 真实行情采集
- 可跟单策略或虚构权益曲线
- 推送远程
