# HANDOFF — TASK-047 教程阅读壳

## 完成内容

保留纸感教育站外观，收紧阅读路径：

- 首页：主 CTA 提到标题旁；风险与「不是信号站」桌面并排
- 课文：面包屑；侧栏按目录分组并显示第 n / N 篇；移动端折叠，开关与原生 details 同步
- 正文：标题锚点继承墨色，不再整页发蓝；图表跟栏宽
- 目录：连续编号；怎么学二十步更紧凑

未改课序、slug、课文 Markdown。不是交易终端。

## 修改文件

- `assets/css/main.css`
- `pages/index.vue`、`pages/course/index.vue`
- `components/LessonDetailPage.vue`、`LessonIndexPage.vue`、`LessonList.vue`
- `components/ui/LessonCrumb.vue`、`LessonRail.vue`（新）
- `components/ui/PathSteps.vue`、`StageMap.vue`、`SiteFooter.vue`、`courseMeta.ts`
- `tests/check-task-047-ui.mjs`
- `docs/tasks/TASK-047-ui-reading-polish.md`、`docs/tasks/TODO.md`、`docs/CHANGELOG.md`

## 测试结果

- `node tests/check-task-047-ui.mjs` 通过
- `npm run lint`、`npm run typecheck` 见本轮终端
- 浏览器：首页、`/course`、`/indicators`、`/indicators/kline`；桌面与 390

## 已知问题

1. 课文侧栏在 20 篇系统课上仍然长，靠分组与内部滚动，没有做成页内目录。
2. Nuxt Content 标题仍是锚点，只改了颜色，没有去掉链接。
3. Nitro 上游 `H3Error` unused import 警告仍在，不挡。

## 下一步

合入前由人审再 commit。不需要再改课序。若继续打磨，优先课文页内目录，而不是换皮肤。
