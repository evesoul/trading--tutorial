# Code QA Checklist

Sprint 005 终审（2026-09-03）已核。

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

`content.config.ts` exclude `HANDOFF.md` 与 `HANDOFF-*.md`。build 解析 26 个 lessons。Hydration 未在 Cursor 浏览器 MCP 中点完；Chrome CDP 首屏与 SSR 一致。不据此 FAIL Code。

## UI
- [x] Desktop
- [ ] Tablet
- [x] Mobile
- [ ] 键盘操作
- [x] focus 状态

Desktop 1280：`/course` 十九步可点；vis-013 / 014 / 015 / 016 示意图宽 680。  
Mobile 390：CDP 鼠标点开/关菜单，面板高 798px，`z-index: 45`，页头无 `backdrop-filter`。Tablet 与键盘未做独立点选。

## Build
- [x] lint
- [x] typecheck
- [x] build

## Links
- [x] 内部链接
- [x] 章节导航
- [x] 图片路径
- [x] Content slug

`tests/check-sprint005-links.mjs` 与 `tests/check-sprint005-visual.mjs` 通过。CVD 可点 `/combinations/trend-momentum`。无 `href="/trading-system/what-is-a-trading-system"`。
