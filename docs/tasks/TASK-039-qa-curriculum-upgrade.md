---
id: TASK-039
title: 教程升级 QA 终审
status: completed
---

# TASK-039 教程升级 QA 终审

Sprint 013。在 010–012 课文与 038 壳都合并后做。

## Owner
QA Agent

## 范围
`tests/`、`docs/qa/`；只读审查 `content/`、`docs/`、页面

## 检查
- 学习路径、page-map、courseMeta、导学地图 slug 一致
- 9 篇新课结构、正反案例、局限性
- 第 4 节旧课修订已落地
- 无死链、无违禁措辞、无推荐杠杆、案例无成绩单
- KDJ 不在主路径；无 KDJ+RSI 新课
- 桌面 + 移动走通主路径与阶段 3 新篇
- lint / typecheck / build

## 不在范围
- 改产品课序（发现不一致则打回 Product / UI）
- 推送远程

## 验收
- [x] QA-RESULT 文件：APPROVE（`docs/qa/QA-RESULT-TASK-039.md`）
