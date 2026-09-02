# Code QA Checklist

Sprint 001/002 终审（2026-09-02）已核。

## TypeScript
- [x] 无 any
- [x] 类型明确
- [x] 无明显类型错误

## Vue
- [x] script setup
- [x] Props 类型正确
- [x] Emits 类型正确
- [x] 无重复逻辑

## Nuxt
- [x] Content 查询正确
- [x] 路由正常
- [x] SSR 正常
- [ ] 无明显 hydration 问题

Hydration 未在 Cursor 浏览器 MCP 中点完交互确认；SSR HTML 与 Chrome CDP 首屏一致。不据此 FAIL Code。

## UI
- [x] Desktop
- [ ] Tablet
- [x] Mobile
- [ ] 键盘操作
- [x] focus 状态

Desktop 1280 初审通过。Mobile 390 复测：CDP 鼠标点开/关菜单，面板高 776px，全屏滑出。Tablet 与键盘未做独立点选。`:focus-visible` 样式已写。

## Build
- [x] lint
- [x] typecheck
- [x] build

## Links
- [x] 内部链接
- [x] 章节导航
- [x] 图片路径
- [x] Content slug
