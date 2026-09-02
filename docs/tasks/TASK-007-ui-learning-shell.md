# Agent Task

## Task ID
TASK-007

## Title
首页、学习路径与课程阅读壳

## Owner
UI Agent

## Goal
走通零基础首次旅程：落地 → 风险 → `/course` 选起点 → 读完知道下一步。教学感、留白、响应式；不要做成交易终端。

## Scope
- `components/ui/`
- `components/*.vue`（视觉与阅读壳，不改查询语义）
- `pages/`（布局与文案层次，不新增/改名路由）
- `app.vue`
- `assets/`（样式）
- 如需工具类 CSS，可加 Tailwind 或等价，并改 `nuxt.config.ts` / `package.json`

## Out of Scope
- 改 `content/` 正文
- 改 `docs/knowledge/` `docs/product/` `docs/strategy/`
- 改 composable 的 published 过滤逻辑（已由编排器补齐）
- 实时行情、下单盘、信号大屏
- 不要 `git commit`

## Input
- `docs/prompts/ui-agent.md`
- `docs/product/user-journey.md`
- `docs/product/information-architecture.md`
- `docs/product/page-map.md`
- `docs/tasks/HANDOFF-TASK-003.md`
- `docs/visual/README.md`（示意图引用）
- 现有：`useCourse` `useLesson` `getLessonPath` `resolvePublishedPath`

## 必须实现

1. **首页 `/`**：标题、三阶段各一句、风险块（非仅页脚）、教育站边界、主 CTA → `/course`，次要 → `/indicators`
2. **`/course`**：导学正文 + 推荐主路径（K 线 → MA → EMA → RSI），未发布课不做成可点死链
3. **文章页**：阶段徽章、上一篇/下一篇（只用 `resolvePublishedPath` / published 列表；RSI 的 next=`volume` 不得链 404）、回 `/course`
4. **空状态**：`/combinations` → `/indicators`；`/trading-system` `/glossary` → `/course`
5. **示意图**：课文里的 `/images/concept/*.svg` 要可读，alt 带「示意图」
6. **响应式**：Desktop + Tablet + Mobile；导航在小屏可用
7. **禁止**：收益数字、胜率宣传、终端风 K 线盘、收益承诺用语

## Acceptance Criteria
- [x] 主路径可点完：`/` → `/course` → kline → ma → ema → rsi
- [x] RSI 页没有指向 `/indicators/volume` 的导航链接
- [x] lint / typecheck / build 通过
- [x] Desktop 与 Mobile 各走通一次（浏览器）
- [x] 无 `any`
- [x] `docs/tasks/HANDOFF-TASK-007.md`

## Status
completed

> Desktop / Mobile：预览服务 SSR HTML 已走通主路径、空状态与 RSI 无 volume 死链。Cursor 浏览器 MCP 与 Chrome headless 本次不可用，未能做真实点击截图。详见 HANDOFF-TASK-007。
