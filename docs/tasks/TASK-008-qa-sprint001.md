# Agent Task

## Task ID
TASK-008

## Title
Sprint 001/002 质量终审

## Owner
QA Agent

## Goal
按 `docs/prompts/qa-agent.md` 审代码、内容、视觉、链接。三项均 PASS 才能 APPROVE。

## Scope
- `tests/`（如需补检查脚本）
- `docs/qa/`（结果与清单勾选）
- 只读审阅其余目录；发现必须修的小问题可提 ISSUE，不要大改他人文档/正文，除非是明显断链或违禁词

## Out of Scope
- 新功能、新课、新视觉风格
- git commit
- 把未通过项偷偷改成通过

## Input
- `docs/qa/content-checklist.md`
- `docs/qa/code-checklist.md`
- `docs/prompts/qa-agent.md`
- 各任务 HANDOFF：TASK-001～007
- 预览服务可能已在 `http://127.0.0.1:3000`（`npm run preview`）

## 必查

### 代码
- `npm run lint` `typecheck` `build`
- 无 `any`；课文不写死在 Vue

### 内容
- 导学 + K 线 / MA / EMA / RSI：术语、正反案例、局限、风险
- 无：一定 / 必然 / 100%准确 / 稳赚 / 必赚 / 无风险 / 保证盈利
- 金叉 / 超买 / 背离不是开仓指令
- Knowledge 与 Content 术语一致（MA=SMA、强平、Timeframe vs Period）

### 视觉
- 示意图 alt/图题含「示意图」
- 未插入 vis-101–107 假行情
- Desktop + Mobile：首页风险块、导航菜单、文章示意图宽度、侧栏

### 链接
- `/` → `/course` → kline → ma → ema → rsi 可走完
- 全站导航 HTML **没有** `href="/indicators/volume"`
- `/combinations` 空状态回 `/indicators`；系统/术语回 `/course`
- 图片路径存在

## Output
- `docs/qa/QA-RESULT-SPRINT-001.md`（QA RESULT 四段：Code / Content / Visual + Recommendation）
- 勾选 `docs/qa/*-checklist.md` 已核项
- `docs/tasks/TASK-008-qa-sprint001.md` Status → review

## Acceptance Criteria
- [x] 三阶段检查都有书面结论
- [x] 只有三项 PASS 才写 APPROVE
- [x] 问题按严重程度列出，并写明 Owner
- [x] 浏览器若不可用，写明用了何种替代验证，Visual 不得假装 PASS

书面结论：`docs/qa/QA-RESULT-SPRINT-001.md`  
初审：Code PASS / Content PASS / Visual FAIL → REQUEST CHANGES  
复测（2026-09-02）：CDP 鼠标点 Mobile 390 菜单开/关，面板高 776px，high 级重叠已解；RSI「怎么学」链与课文 H1 `display: none` 已核。三项 PASS → APPROVE。

## Status
completed
