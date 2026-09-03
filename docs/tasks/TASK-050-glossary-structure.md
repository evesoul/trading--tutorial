---
id: TASK-050
title: 术语页改成可跳转的查词页
status: completed
---

# TASK-050 术语页改成可跳转的查词页

`/glossary` 原先先列六张课卡（都链回本页），再把六组正文整篇叠一遍。用户来这里是查一个词，不是再上一遍课。

## Owner
UI Agent / Nuxt Agent

## 必须

- 页头能跳到六组
- 每组有 `id=slug`，路径是 `/glossary#{slug}`
- 每组下列出本组词条，点到对应 h3
- 不再把术语组当成课文目录卡
- 不改词条 Markdown、不改课序

## 验收

- [x] lint / typecheck
- [x] `node tests/check-task-048-reading.mjs`
- [x] `node tests/check-task-050-glossary.mjs`
- [x] 浏览器核对 `/glossary` 与 `#margin-leverage`
