# HANDOFF — TASK-027

Owner: UI Agent  
Status: completed

## 完成内容

`/course` 去掉「后半（回测 / 案例）仍在编写」。十五步仍在，未发布仍走 `resolvePublishedPath`，只标编写中。没有改 `content/`、`SYSTEM_PATH_SLUGS` 或路由。

- 三阶段地图：不再写后半未完成；改为「阶段 3 把观察写成可检查的规则。案例是教学作业纸，不是跟单策略。」
- 「交易系统」导语：删掉后半仍在编写；保留十五步与「可检查的规则，不是跟单策略」；补「案例是教学作业纸。」；未发布只标编写中
- `LessonIndexPage` trading-system lead 本来就是「可检查的规则，不是跟单策略」，未改

## 修改文件

- `pages/course.vue`
- `docs/tasks/TASK-027-ui-system-complete.md`（Status → review）
- `docs/tasks/HANDOFF-TASK-027.md`（本文件）

未改：`content/`、`components/LessonIndexPage.vue`、`SYSTEM_PATH_SLUGS`、路由。未做 git commit / push。

## 测试结果

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |

## 已知问题

1. 导学或课文正文若仍写「后半仍在编写」，属 `content/`，本任务未改。
2. 未跑 `npm run build`。

## 下一步建议

- QA：核对 `/course` 不再写阶段 3 后半未写、十五步仍在、未发布无死链
