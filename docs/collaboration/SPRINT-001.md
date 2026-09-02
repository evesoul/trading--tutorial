# Sprint 001 — 项目奠基

## 目标
建立可协作的产品、知识、策略、视觉与工程底座，使后续 Content / UI / QA 能按目录边界并行推进。

## 本轮 Owner

| Task | Owner | 目录 | 状态 |
|---|---|---|---|
| TASK-001 | Product Agent | `docs/product/` | completed |
| TASK-002 | Knowledge Agent | `docs/knowledge/` | completed |
| TASK-003 | Nuxt Agent | `pages/` `components/` `composables/` `server/` 及工程根配置 | completed |
| TASK-004 | Strategy Agent | `docs/strategy/` | completed |
| TASK-005 | Visual Agent | `docs/visual/` `public/images/` | completed |

## 依赖
- Product / Knowledge / Strategy / Visual / Nuxt 可并行（目录不重叠）
- Content Agent 等待 TASK-002 完成后启动
- UI Agent 等待 TASK-003 完成后启动
- QA Agent 等待第一波交付后启动

## 下一波
- TASK-006 Content：引言完善 + K 线 / MA / EMA / RSI 教程（completed）
- TASK-007 UI：首页、学习路径、课程壳、文章页（completed）
- TASK-008 QA：代码 / 内容 / 链接审核（completed，APPROVE）
