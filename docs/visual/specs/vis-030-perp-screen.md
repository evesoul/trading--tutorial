---
id: vis-030
title: 交易所屏幕字段
type: schematic
purpose: 用一张抽象屏幕标出权益、标记价、预估强平、资金费倒计时与风险限额。先读这些数字，再读 K 线。不画买卖按钮，不伪装成某家交易所截图。
teaching_question: 用户看完应理解：钱包余额、未实现盈亏、权益不是同一个数；强平看标记价；杠杆是展示；资金费倒计时不是反转闹钟。
symbol: not-applicable
timeframe: not-applicable
source: teaching-schematic
period: not-applicable
annotations:
  - label: 权益
    meaning: 余额与未实现盈亏等项合计后的净值，不是已经到手的钱
  - label: 标记价
    meaning: 算未实现盈亏和预估强平；强平流程看它
  - label: 预估强平
    meaning: 估算值，会随仓位、档位、资金费变化，不是保证触发的止损
  - label: 资金费倒计时
    meaning: 下一笔结算时点；不是行情闹钟
  - label: 风险限额
    meaning: 名义做大后维持保证金率可能升高，强平线靠近
status: delivered
asset: /images/concept/vis-030-perp-screen.svg
---

# vis-030 交易所屏幕字段

## 教学说明

与 `docs/knowledge/perp-screen.md` 对齐。正例阅读顺序必须出现在图内：先标记价与预估强平，再余额 / 浮动 / 权益，再资金费，最后才是 K 线。

禁止画可点击的买卖按钮、推荐杠杆、某家交易所商标。字段用本库规范名，允许括号注明「界面上可能写成某某」。

## Content / UI 引用

```md
![交易所屏幕字段示意图](/images/concept/vis-030-perp-screen.svg)
```

## 局限

示意图是教学几何，不是某所真实界面。各所名称、标记价公式、维持保证金并不相同。预估强平是估算值。本图不教开户。
