# Agent Task

## Task ID
TASK-018

## Title
阶段 2 组合示意图

## Owner
Visual Agent

## Goal
为组合课补四张教学示意图。禁止伪造真实行情。不要重画 vis-001–012，课文可继续引用它们讲单指标。

## Scope
- `docs/visual/`
- `public/images/concept/`

## Out of Scope
- 改 `content/`
- 采集 vis-101–107 或 combination/ 实盘图
- git commit / push

## Output
- `docs/visual/specs/vis-013-trend-momentum.md` + `public/images/concept/vis-013-trend-momentum.svg`
- `docs/visual/specs/vis-014-trend-volume.md` + `public/images/concept/vis-014-trend-volume.svg`
- `docs/visual/specs/vis-015-oi-volume.md` + `public/images/concept/vis-015-oi-volume.svg`
- `docs/visual/specs/vis-016-multi-indicator.md` + `public/images/concept/vis-016-multi-indicator.svg`
- 更新 `docs/visual/README.md` 索引
- `docs/visual/HANDOFF-SPRINT-005.md`

每张图：id / title / type=schematic / purpose / teaching_question / 示意图徽章 / 页脚「教学抽象 · 非真实行情 · 不构成交易建议」。

## 教学点
- vis-013：同一抽象走势上，均线仍向上、动量已回落。对照「同向更清楚」和「反向先等待」。不是金叉开多。
- vis-014：两格对照——价动且量跟上 / 价动且量没跟上。价和量是两个问题，不是开仓指令。
- vis-015：同一段上并排放量柱与 OI 曲线。放量加仓、放量减仓、放量但 OI 平坦。流量 ≠ 存量。
- vis-016：问题槽表（方向 / 力度 / 量或仓）。三个槽对齐 ≠ 更可靠。禁止收益柱比较「指标数量 vs 赚钱」。

`rsi-macd` / `price-oi` / `funding-oi` 可复用 vis-003/004、vis-006、vis-007，本任务不出第四象限假行情、不出费率反向喊单图。

## Acceptance Criteria
- [x] 四张 SVG 图内有「示意图」与「非真实行情」
- [x] vis-016 写明不是指标越多越准确
- [x] spec 字段齐全，README 可检索
- [x] 未重画 vis-001–012，无虚假盈利图

## Status
completed
