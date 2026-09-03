---
id: TASK-038
title: 升级课序的路由与课程壳
status: completed
---

# TASK-038 升级课序的路由与课程壳

让目录、下一步、未发布状态跟上新学习路径。可与 Sprint 010 并行先做骨架。

## Owner
Nuxt Agent + UI Agent

## 范围
- `pages/course.vue`、`pages/course/[...slug].vue`（或等价）
- `composables/useCourse`（或等价路径解析）
- `components/ui/courseMeta.ts`
- `components/LessonIndexPage.vue` 等目录分层
- `docs/architecture/project.md` 补 `/course/[...slug]`
- 术语页如需新锚点

## 必须
- `introduction` → `/course`；其他 introduction slug → `/course/{slug}`
- 取枢纽用 `slug === 'introduction'`
- `MAIN_PATH_SLUGS` 含 `market-structure`、`atr`，不含 `kdj`
- `CONTRACT_PATH_SLUGS` 末尾加 `liquidation-cascade`
- `SYSTEM_PATH_SLUGS` 二十篇按 learning-path
- `PLANNED_TITLES` / `NEXT_REASONS` 齐
- 未发布显示编写中，不链 404
- 指标目录：主路径置顶，KDJ 标对照层
- 订单课页面无下单按钮

## 不在范围
- 写课文
- 交易终端外观

## 验收
- [x] lint / typecheck / build
- [x] `/course/perp-screen` 在文未发布时不 404 死链（编写中或 404 带回 `/course`，产品选编写中卡片）
- [x] 桌面 + 移动目录可读
