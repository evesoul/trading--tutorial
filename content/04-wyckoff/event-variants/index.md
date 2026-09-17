---
title: 关键事件变形
description: 缺收盘、缺回测或缺大周期时降级。不要把每根长针都命名为 Spring 或 UTAD。
part: 4
category: wyckoff
level: intermediate
order: 6
slug: event-variants
status: published
learning:
  prerequisites:
    - accumulation-spring
    - markup-sos
    - distribution-utad
    - markdown-sow
  next:
    - effort-result
visual:
  cover: /images/wyckoff/06-01-compressed-spring.png
  charts:
    - 06-01-compressed-spring.png
    - 06-02-failed-spring.png
    - 06-03-weekend-wick.png
---
# 关键事件变形

教材里的 Spring、UTAD、SOS 是标准件。永续里它们会被插针、资金费、周末流动性和山寨联动扭成残次品。本篇只训练：**变形后还升不升级，观察仓怎么降。**

## 学习目标

- 用「结构位置 + 收盘 + 量」判断标准件还是变形件
- 对压缩弹簧、延长弹簧、周末长针、多次 UT 给出降级记法
- 山寨事件先对照 BTC

## 概念

标准事件 = 三者齐全。变形事件 = 缺一，或被永续噪声放大。

应对总则：缺收盘确认 → 降级为预警；缺缩量回测 → 仓位系数下降；缺大周期结构 → 当噪音；可以用「等下一根」换确认。

## 原理

弹簧只有一次「假破资格」。第二次收盘在外，事件改名为 SOW。周末低流动性影线的权重低于活跃时段的 4H 收盘。

## 怎么看

![BTCUSDT 永续 · 4H · 2023-10。下沿只被浅刺，更像 ST。](/images/wyckoff/06-01-compressed-spring.png)

**行情来源：** BTCUSDT 永续 · 4H · 2023-10。下沿只被浅刺，更像 ST。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

![BTCUSDT 永续 · 4H · 2024-03-05。最低 59,112，收盘仍在结构外。](/images/wyckoff/06-02-failed-spring.png)

**行情来源：** BTCUSDT 永续 · 4H · 2024-03-05。最低 59,112，收盘仍在结构外。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

![BTCUSDT 永续 · 1H · 2024-08-04 周日已先出现长针。](/images/wyckoff/06-03-weekend-wick.png)

**行情来源：** BTCUSDT 永续 · 1H · 2024-08-04 周日已先出现长针。 数据来自币安 USDT-M 永续公开 K 线，教学标注不是交易所官方图层。

BTC 已 SOS、山寨未突破：等山寨自己的 BUEC，或只观察 BTC。BTC 仍在吸筹、山寨先突破：山寨突破降权。BTC 已 SOW、山寨瀑布：不抄山寨。

## 怎么使用

| 变形 | 升级条件 | 练习记法 |
| --- | --- | --- |
| 压缩弹簧 | 必须有 Test 缩量 | 不当激进弹簧 |
| 延长弹簧 | 第二次收盘在外 | 多观察作废，改看破位 |
| 周末长针 | 下一活跃时段 4H 确认 | 不新开事件观察 |
| 多次 UT | 出现 LPSY 或破 Ice | 不要每次 UT 都开空观察 |
| 清算大阴 | OI 急降 + 下一根收回 | 不当 SOW 追空 |

变形只改「能不能升级、观察仓多大」，不改「用结构投等距」。不要因为针很长就把目标设得很远。

## 案例

### 题

周六 1H 刺破 4H 下沿，量刚过均量，标记价几乎没破，两小时收回。按弹簧开多观察吗？

**先自己答，再看解析。**

<details>
<summary>解析（不是标准交易指令）</summary>

不升级。周末 + 量不足 + 标记价未确认 = 降级插针。记录位置，等活跃时段 4H 是否给出缩量 Test。

</details>

## 常见错误

1. 把所有长针都命名为 Spring / UTAD。先问：有没有区间？收盘回来没有？
2. 一个事件在 15m、1H、4H 同时数三次。
3. 命名争论超过一分钟还硬做。命名不清 = 空仓。

## 局限性

「微型弹簧」容易被滥用。宁可少命名。

## 总结

缺确认就降级。延长弹簧按破位处理。

## 下一步

事件告诉你在哪，量价问有没有人认真做：[努力与结果](/wyckoff/effort-result)。
