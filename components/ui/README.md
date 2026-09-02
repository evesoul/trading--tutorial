# UI 组件

教学站视觉组件。不要做成交易终端。

| 组件 | 用途 |
|---|---|
| `RiskCallout` | 首页、怎么学、文章页底的风险块 |
| `StageBadge` | 阶段徽章：导学 / 指标 / 组合 / 交易系统 |
| `StageMap` | 三阶段各一句 |
| `PathSteps` | 推荐主路径 / 合约数据层 / 指标组合 / 交易系统；未发布只显示「编写中」 |
| `LessonPager` | 上一篇 / 下一篇，未发布用 `resolvePublishedPath` |
| `PrerequisiteList` | 先修芯片 |
| `EmptyState` | 组合 / 系统 / 术语空状态 |
| `ButtonLink` | 主按钮、次要按钮 |
| `SiteFooter` | 页脚风险与教育用途说明 |
| `courseMeta.ts` | 导航、阶段、主路径、合约数据层、组合与系统 slug、未发布标题 |

查询仍走 `useCourse` / `useLesson`。导航层不得手写未发布课文的 URL。
