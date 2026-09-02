# Sprint 004 — 合约数据层

## 目标
写完阶段 1 剩余四篇：持仓量 → 资金费率 → 多空比 → CVD。之后阶段 1 目录齐，再开阶段 2。

读者应能走通：

```text
bollinger-bands → open-interest → funding-rate → long-short-ratio → cvd
```

CVD 之后阶段 2 未写：文末回 `/course`，不链空组合页。

## Owner

| Task | Owner | 目录 | 状态 |
|---|---|---|---|
| TASK-013 | Content Agent | `content/` | completed |
| TASK-014 | Visual Agent | `docs/visual/` `public/images/` | completed |
| TASK-015 | UI Agent | `components/ui/` `pages/course.vue` | completed |

## 依赖
- Knowledge 已有四篇定义
- OI / Funding 示意图已有 vis-006 / vis-007
- Visual 并行补多空比、CVD
- UI 加「合约数据层」四步，未发布显示编写中
- QA（TASK-016）等三份完成后派出

## 明确不做
- 阶段 2 / 3 正文
- 真实行情采集
- 推送远程
