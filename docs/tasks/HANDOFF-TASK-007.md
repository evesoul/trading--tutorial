# HANDOFF — TASK-007

Owner: UI Agent  
Status: review

## 完成内容

把 Nuxt 骨架做成可学的教育站界面，走通首次旅程：落地 → 风险 → `/course` 选起点 → 读完知道下一步。没有做成交易终端，没有加 Tailwind，只用一份额外的教学向 CSS。

- 首页按旅程顺序：标题、三阶段各一句、风险块（页中，不只在页脚）、教育站边界、主按钮去 `/course`、次要去 `/indicators`
- `/course` 渲染导学正文 + `#risk` + 三阶段地图 + 推荐主路径四篇（K 线 → MA → EMA → RSI）；未发布课只标「编写中」，不生成空 URL
- 文章阅读壳：阶段徽章、先修、正文排版、示意图最大宽度、文末风险、上一篇/下一篇、回课程、桌面侧栏
- RSI 的 `learning.next = volume` 经 `resolvePublishedPath` 得到 `null`，只显示「Volume 编写中」并链回 `/course`，没有 `/indicators/volume` 导航链接
- 空状态：`/combinations` → `/indicators`；`/trading-system`、`/glossary` → `/course`
- 导航：Desktop 横排；小屏「菜单」按钮 + `aria-expanded` 滑出面板

## 修改文件

样式与配置：

- `assets/css/main.css`（新建）
- `nuxt.config.ts`（接入 CSS）
- `app.vue`

页面：

- `pages/index.vue`
- `pages/course.vue`
- `pages/glossary.vue`
- `pages/indicators/index.vue`
- `pages/combinations/index.vue`
- `pages/trading-system/index.vue`

组件：

- `components/SiteNav.vue`
- `components/LessonContent.vue`
- `components/LessonList.vue`
- `components/LessonIndexPage.vue`
- `components/LessonDetailPage.vue`
- `components/ui/courseMeta.ts`
- `components/ui/RiskCallout.vue`
- `components/ui/StageBadge.vue`
- `components/ui/StageMap.vue`
- `components/ui/PathSteps.vue`
- `components/ui/LessonPager.vue`
- `components/ui/PrerequisiteList.vue`
- `components/ui/EmptyState.vue`
- `components/ui/ButtonLink.vue`
- `components/ui/SiteFooter.vue`
- `components/ui/README.md`

任务文档：

- `docs/tasks/HANDOFF-TASK-007.md`（本文件）
- `docs/tasks/TASK-007-ui-learning-shell.md`（Status → review）

未改：`content/` 正文、`docs/knowledge/`、`docs/product/`、`docs/strategy/`、`composables/`（含 published 默认过滤）、`package.json`。未做 git commit。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过（Nuxt 4.5.2 / Nitro 2.13.4） |
| 无 `any` | 通过 |

预览服务 `npm run preview -- --port 3000`，SSR HTML 抽查：

| 路径 | HTTP | 结果 |
| --- | --- | --- |
| `/` | 200 | 标题、三阶段、风险、边界、开始学习 → `/course`、次要 → `/indicators` |
| `/course` | 200 | 导学 + `#risk` + 主路径四篇链接；无 `/indicators/volume` |
| `/indicators/kline` → `ma` → `ema` → `rsi` | 200 | 上一篇/下一篇、回课程、示意图 alt 含「示意图」 |
| `/indicators/rsi` | 200 | 可见「Volume 编写中」和「回怎么学」；**没有** `/indicators/volume` |
| `/combinations` | 200 | 空状态「组合课尚未开放」→ `/indicators` |
| `/trading-system` `/glossary` | 200 | 空状态 → `/course` |
| `/indicators/volume` 直打 | 200 | 空状态「这篇指标课还没发布」，不伪装成已开课 |

## 浏览器核对

Cursor 浏览器 MCP 本次无法连接（provider 未重新注册）。本机 Chrome `--headless=new` 也超时无输出。

因此桌面 / 手机的**真实点击和截图**没做成。替代验证是预览服务的 SSR HTML + 样式里已有的 Desktop / Mobile 导航规则（`max-width: 767px` 显示「菜单」）。

未能亲眼确认的点：

- 小屏点「菜单」后的滑出与关闭
- 示意图在窄屏上的实际宽度
- 桌面文章侧栏粘滞是否挡内容

## 已知问题

1. 预览模式下带 Content 查询的页面首次 SSR 较慢（约 15–20 秒），随后正常。
2. Nitro 上游仍有 `H3Error` unused import 警告，不影响通过。
3. 浏览器可视化核对受工具限制，见上一节。
4. 课文正文里的「下一步」仍由 Content 维护；导航层已不再生成 Volume 死链。

## 下一步建议

- QA：在真实 Desktop / Mobile 浏览器点完主路径，并专门点小屏菜单
- Content：阶段 1 其余指标与 Volume 发布后，`resolvePublishedPath('volume')` 会自动把 RSI 下一篇换成真链接
- Visual：真实行情图采集后，再接到 `visual.cover` / `visual.charts`
