# HANDOFF — TASK-003

Owner: Nuxt Agent  
Status: review

## 完成内容

在已有仓库根目录初始化可构建的 Nuxt 4 + Nuxt Content 工程，未覆盖 `content/` / `docs/`，未把教程正文写死在 Vue 里。

- 使用 `srcDir: '.'`，目录对齐 `AGENTS.md`：`pages/` `components/` `composables/` `server/`
- 安装 `@nuxt/content`，`content.config.ts` 定义 `lessons` collection，字段对齐 `docs/architecture/content-model.md`
- TypeScript `strict: true`；`@nuxt/eslint` + `eslint.config.mjs`
- 路由：`/` `/course` `/indicators` `/indicators/[...slug]` `/combinations` `/combinations/[...slug]` `/trading-system` `/trading-system/[...slug]` `/glossary`
- 架构：Content → Composable → Component → Page
  - `useCourse()`：按 `part` / `category` / `order` 查询并排序
  - `useLesson()`：按 `slug`（及可选 `category`）查单篇
  - `getLessonPath(category, slug)`：生成站点路由
- 页面为最简骨架（标题 + 列表 + `ContentRenderer`）
- 首页说明本站是教育站，并链到 `/course`
- `components/ui/` 仅占位，留给 UI Agent
- `content/HANDOFF.md` 已从 collection 排除（不是课文）

## 修改文件

工程：

- `package.json`
- `package-lock.json`
- `nuxt.config.ts`
- `content.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `.gitignore`
- `app.vue`
- `README.md`
- `types/content.ts`
- `composables/useCourse.ts`
- `composables/useLesson.ts`
- `components/SiteNav.vue`
- `components/LessonList.vue`
- `components/LessonContent.vue`
- `components/LessonIndexPage.vue`
- `components/LessonDetailPage.vue`
- `components/ui/README.md`
- `pages/index.vue`
- `pages/course.vue`
- `pages/indicators/index.vue`
- `pages/indicators/[...slug].vue`
- `pages/combinations/index.vue`
- `pages/combinations/[...slug].vue`
- `pages/trading-system/index.vue`
- `pages/trading-system/[...slug].vue`
- `pages/glossary.vue`
- `server/tsconfig.json`
- `public/favicon.svg`

任务文档：

- `docs/tasks/HANDOFF-TASK-003.md`（本文件）
- `docs/tasks/TASK-003-nuxt-foundation.md`（Status → review）

未改：`content/*.md` 正文、`docs/knowledge/`、`docs/product/`、`docs/strategy/`、`docs/visual/`。未做 git commit。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `npm run build` | 通过（Nuxt 4.5.2 / Nitro 2.13.4） |

预览抽查（`npm run preview`，HTTP 200）：

- `/` 首页教育定位 + `/course` 链接
- `/course` 渲染导学 Markdown，并列出 K 线 / MA / EMA / RSI
- `/indicators`、`/indicators/rsi` 正文来自 Content
- `/combinations` `/trading-system` `/glossary` 空列表骨架

## 关键依赖版本

| 包 | 版本 |
| --- | --- |
| nuxt | 4.5.2 |
| @nuxt/content | 3.16.0 |
| vue | 3.5.42 |
| vue-router | 5.3.1 |
| @nuxt/eslint | 1.17.0 |
| eslint | 10.9.1 |
| typescript | 6.0.3 |
| vue-tsc | 3.3.11 |

SQLite：`content.experimental.sqliteConnector = 'native'`（Node >= 22.5.0，当前验证环境 Node v24.18.0）。未安装 `better-sqlite3`。

## Scripts

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `nuxt typecheck` |

首次 `npm install` 会执行 `postinstall` → `nuxt prepare`。`eslint.config.mjs` 依赖 `.nuxt/eslint.config.mjs`。

## 启动命令

```bash
npm install
npm run dev
```

默认：http://localhost:3000

## 给 UI Agent 的接口说明

不要把教程正文写进 Vue。查询走 composable，展示走 component。

### 数据查询

```ts
const { fetchLessons, groupLessonsByPart, getLessonPath } = useCourse()

await fetchLessons()                          // 全部，按 part → order
await fetchLessons({ category: 'indicators' })
await fetchLessons({ part: 1 })

const { fetchBySlug, slugFromRoute } = useLesson()
await fetchBySlug('rsi', 'indicators')
```

Collection 名：`lessons`（`queryCollection('lessons')`）。

课文路由：

| category | path |
| --- | --- |
| introduction | `/course` |
| indicators | `/indicators/{slug}` |
| combinations | `/combinations/{slug}` |
| trading-system | `/trading-system/{slug}` |
| glossary | `/glossary` |

### 可复用骨架组件

| 组件 | 用途 |
| --- | --- |
| `SiteNav` | 全局导航 |
| `LessonList` | 课文列表（title / description / 链接） |
| `LessonContent` | frontmatter 标题 + `ContentRenderer` |
| `LessonIndexPage` | 分类列表页 |
| `LessonDetailPage` | `[...slug]` 详情页 |

`components/ui/` 为空，视觉组件放这里。

### 类型

`types/content.ts`：`LessonCategory` `LessonLevel` `LessonStatus` `LessonSummary` 等。  
Collection 完整类型：`Collections['lessons']`（`@nuxt/content`）。

### Front Matter 字段

必填：`title` `description` `part` `category` `level` `order` `slug`  
可选：`indicator` `learning` `visual` `status`

`part`：`0` 导论，`1` 指标，`2` 组合，`3` 交易系统。

## 已知问题

1. 页面无样式，标题可能与 Markdown H1 重复。交给 UI Agent。
2. 组合 / 交易系统 / 术语表尚无课文，显示空状态。
3. ~~查询不过滤 `status`~~ 编排器已补：`fetchLessons` / `fetchBySlug` 默认 `publishedOnly`；`resolvePublishedPath` 供上一篇/下一篇。`learning.next` 指向未发布 slug 时返回 `null`。
4. 课文内链到未发布篇目（如 Volume）由 Content 正文维护；导航层不得再生成 404 链接。
5. `public/images/` 由 Visual Agent 提供；骨架未做图床或图表组件。
6. 构建时 Nitro 有上游 `H3Error` unused import 警告，不影响通过。
7. `npm install` 对 `glob@10.5.0` 有弃用警告。
8. 未使用 Nuxt 4 默认 `app/` 目录，而是 `srcDir: '.'`，避免和其他 Agent 的 `pages/` `components/` 边界错位。

## 下一步建议

- UI Agent：在骨架上做响应式、阅读层级、上下章导航；可继续使用 `useCourse` / `useLesson`
- Content Agent：补阶段 2 / 3 与其余指标课文
- Visual Agent：图表接入 `visual.cover` / `visual.charts`
- QA Agent：链接、空页、Content 渲染与内容约束检查
