# HANDOFF — TASK-049 安静编辑风

## 完成内容

把奶油纸 + 青绿胶囊壳换成近白、灰阶、文字导航的阅读壳。课卡、阶段卡、侧栏去掉框和阴影，改成行。风险改左边线。教学图画布改白底，细线仍在。

不改课序、slug、课文。

## 修改文件

- `assets/css/main.css`
- `nuxt.config.ts`（Inter）
- `components/ui/StageMap.vue`、`components/ui/mountTeachingChart.ts`
- `tests/check-task-049-quiet-ui.mjs`
- `docs/tasks/TASK-049-antfu-quiet.md`、`docs/tasks/TODO.md`、`docs/CHANGELOG.md`

## 测试结果

- `node tests/check-task-047-ui.mjs`
- `node tests/check-task-048-reading.mjs`
- `node tests/check-task-049-quiet-ui.mjs`
- `npm run lint`、`npm run typecheck`

浏览器：首页、`/course`、`/indicators`、`/indicators/kline`。

## 已知问题

1. 图表系列色未改（绿涨红跌、RSI 青绿等），只改了画布底。
2. Inter 走 Google Fonts；国内访问慢时会落到系统黑体。
3. Nitro 上游 `H3Error` unused import 警告仍在，不挡。

## 下一步

合入前由人审。若再打磨，优先核对移动端菜单和长目录行距，不要把卡片加回来。
