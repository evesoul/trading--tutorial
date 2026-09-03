---
id: TASK-049
title: 安静编辑风换肤
status: completed
---

# TASK-049 安静编辑风换肤

对照 [antfu.me](https://antfu.me/) 的阅读气质，给教程换一套更安静的壳。不改课序、slug、课文 Markdown。

## Owner
UI Agent

## 从 antfu.me 借什么

- 近白底、灰阶层次、内容先于装饰
- 导航是字，当前项加粗，不要胶囊
- 列表像博客行：标题 + 浅灰说明，不要卡片和阴影
- 步骤号做成低对比数字
- 链接默认安静，hover 用淡黄下划线
- 页头薄、页脚小

## 不抄什么

- 不抄 logo、手绘、个人博客信息架构
- 本轮不做 dark mode
- 中文用 Inter + 系统黑体，不单靠 Inter

## 教程必须留下

- 风险提示仍可见（改成左边线，不丢掉）
- 教学图仍有细框，和正文分开
- 面包屑、本篇目录、侧栏、进度条仍在
- 历史测试依赖的 class 名不改

## 验收

- [x] lint / typecheck
- [x] `node tests/check-task-047-ui.mjs`
- [x] `node tests/check-task-048-reading.mjs`
- [x] `node tests/check-task-049-quiet-ui.mjs`
- [x] 浏览器核对首页、`/course`、`/indicators`、`/indicators/kline`
