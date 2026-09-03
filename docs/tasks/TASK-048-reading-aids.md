---
id: TASK-048
title: 课文目录、阅读进度与怎么学跳转
status: completed
---

# TASK-048 课文目录、阅读进度与怎么学跳转

TASK-047 之后继续打磨找路，不改课序和正文。

## Owner
UI Agent

## 必须

- 课文页从正文抽出 h2，做成「本篇」跳转
- 长课文有阅读进度条
- 怎么学页能跳到课表各段
- 学习目标列表稍微抬成一块，方便扫
- 不改 slug、课文 Markdown

## 验收

- [x] lint / typecheck
- [x] `node tests/check-task-048-reading.mjs`
- [x] 浏览器核对 K 线课文与 `/course`
