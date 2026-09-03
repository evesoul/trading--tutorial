# HANDOFF — TASK-048 阅读辅助

## 完成内容

在 TASK-047 阅读壳上补找路，不改课序和正文：

- 课文从 h2 抽出「本篇」跳转；解析失败时用渲染后的标题兜底
- 页头下有一条阅读进度
- 怎么学页可跳到三阶段 / 导学 / 主路径 / 合约层 / 组合 / 系统
- 学习目标列表抬成一块，方便开篇扫一眼

## 修改文件

- `components/ui/lessonHeadings.ts`、`LessonToc.vue`、`CourseJump.vue`
- `components/LessonDetailPage.vue`
- `pages/course/index.vue`
- `assets/css/main.css`
- `tests/check-task-048-reading.mjs`
- `docs/tasks/TASK-048-reading-aids.md`、`docs/tasks/TODO.md`、`docs/CHANGELOG.md`

## 测试结果

- `node tests/check-task-048-reading.mjs` 见本轮终端
- `npm run lint`、`npm run typecheck` 见本轮终端
- 浏览器：`/indicators/kline`、`/course`

## 已知问题

1. 进度条只反映整篇滚动，不标当前小节。
2. 怎么学导学正文仍长；跳转只解决「找课表」，不缩短导学。
3. Nitro 上游 `H3Error` unused import 警告仍在，不挡。

## 下一步

合入前由人审。若再打磨，优先缩短怎么学导学的视觉节奏，而不是再加控件。
