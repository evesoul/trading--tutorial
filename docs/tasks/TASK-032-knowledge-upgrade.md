---
id: TASK-032
title: 升级所需知识库
status: completed
---

# TASK-032 升级所需知识库

按 [curriculum-upgrade.md](../product/curriculum-upgrade.md) 第 7.1 节补定义。Content 未完成知识文件前不得开写对应新课。

## Owner
Knowledge Agent

## 范围
`docs/knowledge/`

## 必须新建
- `indicators/market-structure.md`
- `indicators/atr.md`
- `indicators/liquidation-cascade.md`
- `order-types.md`
- `perp-screen.md`

## 必须修订
- `glossary.md`
- `perpetual-futures.md`（风险限额、仓位档位、强平单进簿）
- `indicators/kline.md`、`trendlines.md`、`funding-rate.md`、`volume.md`、`cvd.md`、`bollinger-bands.md`
- `README.md` 索引

## 不在范围
- `content/`、示意图、策略规则正文
- 把观察写成买卖指令

## 验收
- [x] 每个新文件按知识库 10 问写全（屏幕字段、订单可用「是什么 / 解决什么 / 常见误读」结构）
- [x] 术语首次用规范中英对照
- [x] README 与 glossary 已挂上
- [x] 无违禁措辞

交接见 [../knowledge/HANDOFF.md](../knowledge/HANDOFF.md)。
