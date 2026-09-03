# Sprint 008 — 真实行情窗 + 交互图

Status: completed

## 目标
采集 vis-101–107 的 Binance USDT-M 实盘窗口，做成可悬停、缩放的教学图。不是交易终端，不提供下单。

## 原则
- 每张图写清 symbol / timeframe / source / period
- 冻结教学窗，历史不能代表未来
- 徽章写「真实行情」，不要写成示意图
- 禁止买卖按钮、信号、权益曲线证明盈利

## 明确不做
- 推送远程
- 组合课实盘窗（vis-108+）
- 交互图当交易终端

## 交付
- Vision 归档冻结 JSON + SVG 快照
- `::real-chart` 教学窗（十字光标 / 缩放 / 页脚四字段）
- 七篇指标课已挂窗
- HANDOFF：`docs/visual/HANDOFF-SPRINT-008.md`、`content/HANDOFF-SPRINT-008.md`
