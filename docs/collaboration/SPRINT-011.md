# Sprint 011 — 机制与成交

Status: todo

## 目标
补上交易所屏幕、订单与成交、清算瀑布读图、成本对照 R。

读者应能走通：

```text
/course → /course/perp-screen → kline
…
cvd → liquidation-cascade → trend-momentum
direction → order-types → entry-rules
position-sizing → cost-vs-r → risk-management
```

## Owner

| Task | Owner | 状态 |
|---|---|---|
| TASK-036 | Content + Visual | todo |
| TASK-038 | Nuxt / UI | `/course/[...slug]` 必须已合并 |

## 依赖
Sprint 010 知识 / 策略底座；TASK-032 中的 `perp-screen`、`order-types`、`liquidation-cascade` 定义。

## 明确不做
- 下单面板、开户教程、抄瀑布
- 阶段 3 其余新课（留给 012）
- 推送远程
