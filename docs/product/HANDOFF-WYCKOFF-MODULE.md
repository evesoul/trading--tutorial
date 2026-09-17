# HANDOFF — 阶段 4 威科夫与量价模块

## 完成内容

把 `/Users/boom/localspace/trading-up/docs` 十四篇（第 0–12 章 + 附录）合并进本站，重开 **阶段 4：威科夫与量价**。

- 路由：`/wyckoff`、`/wyckoff/{slug}`
- 课序：十三篇，见 `docs/product/learning-path.md`
- 第 0 章与已有屏幕 / 仓位课重叠处改为链回，不重开第二套公式
- 形态、Spring / SOS / UTAD / SOW 写成观察工具，不是买卖指令
- 阶段 3 `case-study` 的 `learning.next` 保持空，避免旧课测试把选修模块写成必经下一篇
- 主导航增加「威科夫」；首页与怎么学改为四阶段地图

## 修改文件（摘要）

| 区域 | 路径 |
|---|---|
| Product | `docs/product/learning-path.md`、`information-architecture.md`、`page-map.md`、`user-journey.md`、本 HANDOFF |
| Knowledge | `docs/knowledge/wyckoff.md`、`glossary.md`、`README.md` |
| Strategy | `docs/strategy/wyckoff.md`、`README.md` |
| Content | `content/04-wyckoff/**`、`content/00-introduction/index.md`、`content/glossary/wyckoff-terms.md` |
| Visual | `public/images/wyckoff/*.png`（56 张）、`docs/visual/wyckoff-charts.md`、`docs/visual/README.md` |
| Nuxt / UI | `types/content.ts`、`content.config.ts`、`composables/useCourse.ts`、`components/ui/courseMeta.ts`、`LessonIndexPage.vue`、`LessonDetailPage.vue`、`LessonRail.vue`、`CourseJump.vue`、`pages/wyckoff/**`、`pages/index.vue`、`pages/course/index.vue` |
| QA | `tests/check-wyckoff-module.mjs`、`tests/check-task-047-ui.mjs`（首页标题改为四条） |
| 规范 | `AGENTS.md`、`docs/architecture/*`、`docs/CHANGELOG.md` |

生成课文脚本：`scripts/write-wyckoff-lessons.py`（已跑过，课文以 `content/04-wyckoff/` 为准）。

## 测试结果

- `node tests/check-wyckoff-module.mjs` 通过
- `node tests/check-task-047-ui.mjs` 通过
- `node tests/check-task-050-glossary.mjs` 通过
- `npm run lint` 通过
- `npm run typecheck` 通过
- `npm run build` 通过（Content 处理 65 个文件，含 `/wyckoff` 路由）
- 浏览器：首页四阶段卡与导航「威科夫」；`/wyckoff` 十三篇分组目录；`/wyckoff/wyckoff-on-perps` 正文、真实行情图、下一篇；`/wyckoff/accumulation-spring` 侧栏 2/13；未知 slug 空状态回目录；`/course` 威科夫十三步；`/glossary` 威科夫用语组；`/indicators` 原目录未坏

## 已知问题

- 阶段 4 图是静态标注 PNG，未接入 `vis-101–130` 交互冻结窗
- 出图流水线仍留在 `trading-up/scripts/`，本站未并入
- 旧 Sprint 测试仍可能写「三阶段」字样；用户可见页已改四阶段
- 课文里的费率百分数、杠杆区间是作业纸示例，不是颁布标准

## 下一步

- QA 走一遍 `/wyckoff` 十三篇链接与图
- 若要把阶段 4 收进主路径而不是选修，再改 `case-study` 的 `learning.next` 并更新 `tests/check-task-039-content.mjs`
- Visual 若要可悬停读图，另开任务把关键窗做成 `::real-chart`
