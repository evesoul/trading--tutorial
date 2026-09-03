---
id: TASK-040
title: 摆动结构与 ATR 真实行情窗
status: completed
---

# TASK-040 摆动结构与 ATR 真实行情窗

升级收口后的可选后补：把 vis-109 / vis-110 从 spec 采成冻结教学窗，并挂到对应课文。

## Owner

Visual 为主；Content 挂 `::real-chart`；Nuxt / UI 只扩现有教学窗（ATR 副图、摆动点标注）。

## 范围

- 优先复用 vis-101 / vis-108 冻结 K 线，不再另打接口
- vis-109：已收盘 HH/HL、回撤、影线到过未收盘离开
- vis-110：Wilder ATR(14) 宽窄变化 + 至少一根 TR 明显大于当时 ATR
- 课文 `market-structure`、`atr` 用 MDC 挂窗，不插假图
- 徽章写「真实行情」；四字段完整

## 不在范围

- 组合课实盘窗
- 交易终端 / 买卖按钮
- 颁布 ATR 倍数或开仓指令
- 推送远程

## 验收

- [x] vis-109 / vis-110 JSON + SVG，复用 vis-101
- [x] 课文已挂 `::real-chart`
- [x] TeachingChart 能标摆动点、画 ATR 副图
- [x] `node tests/check-task-040-real-charts.mjs`
