# Agent Task

## Task ID
TASK-003

## Title
初始化 Nuxt + Nuxt Content 工程底座

## Owner
Nuxt Agent

## Goal
在仓库根目录初始化可构建的 Nuxt 应用，接入 Nuxt Content，建立路由、Content 查询与基础页面骨架，不把教程正文写死在 Vue 里。

## Scope
允许创建 / 修改：
- `package.json` `package-lock.json` `nuxt.config.ts` `tsconfig.json` `app.vue`
- `app/`（若使用 Nuxt 4 app 目录）
- `pages/`
- `components/`（仅非 `components/ui/` 的布局/内容组件，或先建空壳）
- `composables/`
- `server/`
- `types/`
- `eslint.config.*` 或项目 lint 配置
- `public/`（仅 favicon / 占位，不画教学内容图）
- `.gitignore`（补充 Node / Nuxt 忽略项，保留现有 docs）
- `README.md`（项目启动说明）

## Out of Scope
- `docs/` 除本任务 HANDOFF 外不要改知识/产品文档
- `content/` 现有 Markdown 正文不要改写
- `components/ui/` 交给 UI Agent（可创建空目录）
- 不要 `git commit`

## Input
- `AGENTS.md`
- `docs/architecture/project.md`
- `docs/architecture/content-model.md`（已含 `part: 0`）
- `docs/prompts/nuxt-agent.md`
- `docs/product/page-map.md`（TASK-001 已完成，实现必须对齐）
- `docs/product/HANDOFF.md` 中 Nuxt 小节

## Product 对齐（TASK-001 completed）
- 导学映射 `/course`，不建 `/introduction`
- schema 允许 `part: 0`
- 只把 `status: published` 当可导航
- 组合 / 系统目录无正文时给空状态，回到 `/indicators` 或 `/course`
- `learning.next` 若指向未 `published` 的 slug（例如 RSI → volume），不要输出会 404 的下一篇链接；文末已回 `/course`

## Output
- 可运行的 Nuxt 应用（npm scripts：`dev` `build` `lint` `typecheck`）
- Nuxt Content 已配置，能读取 `content/`
- 路由至少包括：
  - `/`
  - `/course`
  - `/indicators`
  - `/indicators/[...slug]`
  - `/combinations`
  - `/combinations/[...slug]`
  - `/trading-system`
  - `/trading-system/[...slug]`
  - `/glossary`
- `composables/useCourse.ts` 或等价：按 part / category / order 查询课程
- Content collection / schema 与 `docs/architecture/content-model.md` 对齐
- TypeScript `strict: true`
- `docs/tasks/HANDOFF-TASK-003.md` 交接说明

## Acceptance Criteria
- [x] `npm run lint` 通过
- [x] `npm run typecheck` 通过
- [x] `npm run build` 通过
- [x] 教程正文来自 Content，不写死在 Vue
- [x] 不破坏现有 `content/` 与 `docs/`
- [x] 无 `any`
- [x] 留下 HANDOFF 与本地启动方式

## Status
completed
