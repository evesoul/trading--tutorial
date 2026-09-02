# QA Agent HANDOFF — Sprint 006 / TASK-024

Owner: QA Agent  
Status: completed  
终审日期：2026-09-03

## 完成内容

Sprint 006 终审完成。Code / Content / Visual 三项 PASS，建议 APPROVE。详情见 `docs/qa/QA-RESULT-SPRINT-006.md`。

共振文末可点 `/trading-system/what-is-a-trading-system`。`position-sizing` 正文与页脚无 `href="/trading-system/risk-management"`；Front Matter next 仅 slug，`resolvePublishedPath` 为 null，LessonPager 只显示编写中。

## 修改文件

- `docs/qa/QA-RESULT-SPRINT-006.md`
- `docs/qa/HANDOFF-SPRINT-006.md`（本文件）
- `docs/qa/content-checklist.md`
- `docs/qa/code-checklist.md`
- `docs/tasks/TASK-024-qa-sprint006.md`
- `tests/check-sprint006-links.mjs`
- `tests/check-sprint006-visual.mjs`

未做 git commit / push。

## 测试结果

- `npm run lint` 通过
- `npm run typecheck` 通过
- `npm run build` 通过（34 个 content 文件；HANDOFF 已 exclude）
- `node tests/check-sprint006-links.mjs` 通过
- `node tests/check-sprint006-visual.mjs` 通过（Chrome CDP）

## 已知问题

无 high。low：Nitro `H3Error` unused import 警告。info：真实行情图未采集。

## 下一步

按 QA RESULT 建议合入。阶段 3 后七篇发布前不要链 `/trading-system/{未发布 slug}`。
