---
title: 吸筹与 Spring
description: 下跌之后先认区间、测试次数和量能收缩。弹簧是刺破下沿后收回，不是连续新低。
part: 4
category: wyckoff
level: intermediate
order: 2
slug: accumulation-spring
status: published
learning:
  prerequisites:
    - wyckoff-on-perps
    - market-structure
  next:
    - markup-sos
visual:
  cover: /images/wyckoff/02-01-accumulation.png
  charts:
    - 02-01-accumulation.png
    - 02-02-spring-compare.png
    - 02-04-spring-test.png
---
# 吸筹与 Spring

吸筹是「下跌之后，卖压被接住，筹码从急于离场的人转到愿意持有的人」。在永续里它经常短、尖、脏。你要认的是 **区间 + 测试次数 + 量能收缩**，不是某个神话底。

## 学习目标

- 标出 SC、AR、ST、Creek 和下沿
- 区分合格 Spring 和收盘跌破
- 说明为什么更稳的观察点常在 Test，而不是弹簧最低点当根
- 说出山寨深针时必须按更宽止损重算仓位

## 概念

吸筹区间（Trading Range，TR）的最低骨架：

1. 下跌减速或高潮（PS / SC）
2. 自动反弹（AR）画出上沿 Creek
3. 二次测试（ST）回到 SC 区域，量应更小
4. 横向吸收
5. Spring：刺破下沿后迅速收回
6. Test of Spring：回测弹簧低点，缩量
7. 之后才谈 SOS

**Spring 一句话：** 价格短暂跌破区间下沿，把止损和新建空单一起打出，然后收回到区间内。它是假破，不是真破后继续破。

## 原理

没有区间就没有弹簧。下跌中段的一次反弹，只是回撤。见 [摆动结构](/indicators/market-structure)。ST 若再出等量新低，吸筹作废，当下跌延续。

## 怎么看

![BTCUSDT 永续 · 4H · 2022-11-08 至 2023-01-16。FTX 后约 15.4k–18.2k 吸筹骨架。](/images/wyckoff/02-01-accumulation.png)

**行情来源：** BTCUSDT 永续 · 4H · 2022-11-08 至 2023-01-16。FTX 后约 15.4k–18.2k 吸筹骨架。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

先切日线确认前面有一段明确下跌，再切 4H 标 SC 低点和 AR 高点。数下沿被触及几次，量是不是一次比一次小。

![左：刺破后收回。右：连续低收，是下跌不是弹簧。](/images/wyckoff/02-02-spring-compare.png)

**行情来源：** 左：刺破后收回。右：连续低收，是下跌不是弹簧。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

弹簧当根可以放量。下一根必须收回，其后回测必须缩量。若刺破后连续数根 4H 都收在下方，这是 SOW 候选，不是 Spring。

![BTCUSDT 永续 · 4H · 2022-11 下旬至 12 月。回踩不再破 SC，量小于高潮。](/images/wyckoff/02-04-spring-test.png)

**行情来源：** BTCUSDT 永续 · 4H · 2022-11 下旬至 12 月。回踩不再破 SC，量小于高潮。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

Test 才是更干净的观察点：回踩不再破弹簧低点，量小于高潮。不要在弹簧最低点当根去摸。

## 怎么使用

练习观察可以分三档，越靠后越稳：4H 收盘回到下沿上方；缩量 Test；等到 SOS 后的 BUEC。新手默认第三档。

止损练习写在弹簧低点外，条件单优先标记价。山寨弹簧可以深得多，S 变大则 N 变小，见 [仓位管理](/trading-system/position-sizing)。不能沿用 BTC 的窄止损去抄山寨针。

目标练习先看区间中轴和 Creek，再谈等距投射。数字是作业纸，不是承诺。

## 案例

### 题

4H 从高位跌出天量长下影（SC），反弹画出 AR，回踩缩量（ST），随后一根刺破下沿但收盘收回，下一根再缩量回踩。如何命名？

**先自己答，再看解析。**

<details>
<summary>解析（不是标准交易指令）</summary>

吸筹末段候选：合格 Spring + 正在 Test。入场观察点在缩量止跌，而不是针尖。止损按弹簧外重算，S 大则名义仓位小。

</details>

连续三根收在下沿下方且持续放量：当破位下跌，不当「破得越深深簧越大」。

## 常见错误

1. 没有 AR 和缩量 ST 就喊弹簧。
2. 15m 收回对抗 4H 收盘破位。
3. 多空双杀后的中轴真空当成好入场。
4. 资金费极负时盲目抄底。费率只作加减仓，先看结构。

## 局限性

FTX 后的区间是教学骨架，不是「以后底部都会长这样」。深针时标记价也可能破，弹簧资格还在，但仓位必须按真实 S 算。

## 总结

先有下跌后的 TR，再谈 Spring。收回 + 缩量 Test，才升级。

## 下一步

离开区间：[拉升：SOS 与 BUEC](/wyckoff/markup-sos)。
