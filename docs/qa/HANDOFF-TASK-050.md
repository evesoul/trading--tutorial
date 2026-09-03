# HANDOFF — TASK-050 术语页结构

## 完成内容

术语页改成查词页：六组跳转、每组词条目录、分组锚点 `/glossary#{slug}`。去掉六张空课卡和正文重复标题。词条仍来自 `content/glossary/`，不是 Vue 写死。

## 修改文件

- `pages/glossary.vue`
- `components/ui/GlossaryJump.vue`、`components/ui/lessonHeadings.ts`
- `composables/useCourse.ts`（`glossary` → `/glossary#{slug}`）
- `assets/css/main.css`
- `tests/check-task-050-glossary.mjs`
- `docs/tasks/TASK-050-glossary-structure.md`、`docs/tasks/TODO.md`、`docs/CHANGELOG.md`

## 测试结果

- `node tests/check-task-048-reading.mjs`
- `node tests/check-task-050-glossary.mjs`
- `npm run lint`、`npm run typecheck`

浏览器：`/glossary`、`#margin-leverage`、点词条到「强平」。

## 已知问题

1. 课文里仍有只链到 `/glossary`、不带词条锚点的写法，本轮不改 Content。
2. 词条锚点跟 Nuxt Content 生成的 h3 id；中英混写的 id 较长。
3. Nitro 上游 `H3Error` unused import 警告仍在，不挡。

## 下一步

合入前由人审。若再打磨，优先把课文里的 `/glossary` 改成带词条锚点，不要把术语页写成第二套教程。
