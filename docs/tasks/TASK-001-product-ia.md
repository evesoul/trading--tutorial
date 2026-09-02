# Agent Task

## Task ID
TASK-001

## Title
产品信息架构与学习路径

## Owner
Product Agent

## Goal
定义零基础用户从「认识永续合约」到「建立交易系统」的学习路径、页面信息架构和 MVP 范围，为后续 Agent 提供产品约束。

## Scope
- `docs/product/`

## Out of Scope
- 交易知识定义（`docs/knowledge/`）
- 教程正文（`content/`）
- UI / Nuxt 代码
- 直接实现页面

## Input
- `AGENTS.md`
- `docs/architecture/project.md`
- `docs/architecture/content-model.md`
- `docs/prompts/product-agent.md`
- `docs/tasks/TODO.md`

## Output
必须产出：
- `docs/product/learning-path.md` — 三阶段学习路径、先修关系、建议顺序
- `docs/product/information-architecture.md` — 站点导航、页面职责、内容到页面映射
- `docs/product/page-map.md` — 路由与页面清单
- `docs/product/user-journey.md` — 新用户首次访问路径
- `docs/product/mvp-scope.md` — 本阶段做 / 不做

## Acceptance Criteria
- [x] 学习路径覆盖指标 → 组合 → 交易系统
- [x] 每个核心页面有职责说明
- [x] 路由与 `docs/architecture/project.md` 对齐或明确修订建议
- [x] 不包含收益承诺或信号产品描述
- [x] 明确 Content / UI / Nuxt 的产品依赖
- [x] 在 `docs/product/HANDOFF.md` 留下交接说明

## Status
completed
