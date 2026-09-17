---
title: 下跌：SOW
description: 破位看收盘。恐慌量用来停止加空，不是立刻反手抄底。
part: 4
category: wyckoff
level: intermediate
order: 5
slug: markdown-sow
status: published
learning:
  prerequisites:
    - distribution-utad
  next:
    - event-variants
visual:
  cover: /images/wyckoff/05-01-sow.png
  charts:
    - 05-01-sow.png
    - 05-02-ice-retest.png
    - 05-03-panic.png
---
# 下跌：SOW

下跌是派发成功后的结果，不是「跌了所以看空」。永续里杀伤力常来自多头连环清算，所以 SOW 之后第一段可以又快又直。

## 学习目标

- 用收盘而不是影线确认 SOW
- 把破 Ice 后的缩量回踩当作下跌阶段的主观察
- 把恐慌抛售标成停止，而不是反转

## 概念

SOW：供给压过需求，离开派发区。Fall through the Ice：4H 收盘在 Ice 下。Dead cat：恐慌后的真空反弹，量不足以构成 SOS。

下跌中练习只允许三类动作：持有已经合格的空观察、反弹后减或再观察、空仓等新吸筹。禁止「跌多了所以反向」。

## 原理

破位时 OI 升偏新空；OI 暴降偏多头强平主导，后面可能有真空反弹。超卖可以叠着下跌走完一整段，见 [RSI](/indicators/rsi)。

## 怎么看

![BTCUSDT 永续 · 4H · 2024-04-13。放量跌破高位区间。](/images/wyckoff/05-01-sow.png)

**行情来源：** BTCUSDT 永续 · 4H · 2024-04-13。放量跌破高位区间。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

![BTCUSDT 永续 · 4H。破位后反抽，量缩、到不了中上沿。](/images/wyckoff/05-02-ice-retest.png)

**行情来源：** BTCUSDT 永续 · 4H。破位后反抽，量缩、到不了中上沿。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

这是下跌阶段与 BUEC 对称的观察点。回踩放量且收盘回到 Ice 上 = 破位失败。

![BTCUSDT 永续 · 4H · 2024-08-05。连续天量，最低 48,888。停止，不是反手。](/images/wyckoff/05-03-panic.png)

**行情来源：** BTCUSDT 永续 · 4H · 2024-08-05。连续天量，最低 48,888。停止，不是反手。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

恐慌特征：量创下跌新高，位移变小或突然长下影，标记价落后最新价。反应是减观察仓、标 SC 候选，等 AR + ST，回到吸筹流程。

## 怎么使用

主观察：破 Ice 后缩量回踩失败。次观察：下降通道上沿的无需求。禁止：恐慌当根追空；日线已出 SC+AR 还在 15m 追空。

4H 收盘回到 Ice 上：离场观察，不管有没有碰到止损价。山寨常比 BTC 跌得更深、停得更晚，仓位按更宽止损算。

## 案例

### 题

15m 放量涨 2%，日线和 4H 仍在 Ice 下方的下降通道。SOW 结束了吗？

**先自己答，再看解析。**

<details>
<summary>解析（不是标准交易指令）</summary>

没有。只有 4H 收盘回到 Ice 上并站稳，才是否定 SOW。15m 反弹是死猫或回踩胚胎。

</details>

## 常见错误

1. 用 RSI 超卖替代 SOW 结构。
2. 看清算热力图去抄。
3. BTC 止跌就去抄仍在瀑布的山寨。
4. 把死猫跳的放量阳线当吸筹完成。

## 局限性

等距投射在猎杀日经常先被真空反抽打断。OI 口径因交易所而异。

## 总结

收盘破 Ice 才升级 SOW。恐慌量先停止。

## 下一步

标准件会变形：[关键事件变形](/wyckoff/event-variants)。
