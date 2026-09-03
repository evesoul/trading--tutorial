# QA HANDOFF — TASK-046 整体校对

Status: completed

## 结论

接线、数字、违禁词、配图路径、课序与路由均通过。建议保持现状，不必再叠冻结窗。

## 检查

- `tests/check-task-046-proofread.mjs`：30 张 vis-101–130 各挂一篇、闭合、复用 vis-101（108 起）、关键数字与课文一致
- TASK-039–045 脚本仍绿
- `BASE_URL=http://[::1]:3030` 链接检查通过
- lint / typecheck 通过

## 已修

`docs/product/HANDOFF.md` 仍写「组合课只开两窗」，已改成 vis-101–130。

## 已知问题（不挡）

- MA 课没有示意图、也没有 `visual.cover`。列表页目前不用 cover。不要用 EMA 示意图冒充 SMA。
- vis-128 与 vis-129 / vis-130 尺子起点不是同一根；课文已写明不要焊成一笔。
- vis-122 本窗费率没有极端样本。
- KDJ 对照层仍只用示意图，这是产品约束，不是漏图。
- 仓位 / 成本 / 热度 / 回测 / 统计 / 优化保持作业纸，不填成绩。
