---
id: TASK-035
title: 摆动结构与 ATR 课文 + 主路径接线
status: completed
---

# TASK-035 摆动结构与 ATR 课文 + 主路径接线

Sprint 010 读者应能走通：K 线 → 趋势线 → 摆动结构 → MA → … → Volume → ATR → 布林带。

## Owner
Content Agent

## 范围
`content/`（导学接线、阶段 1 主路径相关篇）

## 必须新建
- `content/01-indicators/market-structure/index.md`
- `content/01-indicators/atr/index.md`

## 必须修订接线与钩子
- `00-introduction/index.md`（地图；下一篇可仍提示屏幕未发布）
- `kline`、`trendlines`、`ma`、`ema`、`rsi`、`volume`、`bollinger-bands`、`macd`、`kdj` 的 front matter `order` / `prerequisites` / `next`
- `kdj` 标明对照层，不扩写正文

Front Matter 以 [learning-path.md](../product/learning-path.md) 为准。纲要见总纲第 3.2、3.3、第 4 节。

## 不在范围
- `perp-screen`、`order-types`、阶段 3 新课（011 / 012）
- 伪造行情图

## 依赖
TASK-032、TASK-033、TASK-034（示意图未交付时先写正文，图位用 vis-022 / vis-023）

## 验收
- [x] 两篇结构完整，有正反案例与局限性
- [x] 主路径 next / 先修无死链（未发布不链 404）
- [x] 无违禁措辞

HANDOFF：`content/HANDOFF-TASK-035.md`
