# 信息架构

本站信息架构服务一件事：零基础用户能找到「现在该读哪一篇」，并且每读完一篇知道下一篇是什么。

导航按学习阶段组织，不按交易终端模块（盘口、下单、信号）组织。

## 站点定位（影响每一个页面）

- **是：** U 本位永续合约交易教育
- **不是：** 行情终端、信号源、荐股/喊单、跟单、自动交易、回测即开户

全站页眉或页脚需可到达风险说明。首页与 `/course` 必须在首屏附近用白话重申上述边界。

## 主导航

桌面端主导航（从左到右，与学习顺序一致）：

| 标签 | 路由 | 职责（导航层） |
|---|---|---|
| 首页 | `/` | 落地、定位、风险、开始学习 |
| 怎么学 | `/course` | 三阶段地图、推荐起点、导学 |
| 指标 | `/indicators` | 阶段 1 目录 |
| 组合 | `/combinations` | 阶段 2 目录 |
| 交易系统 | `/trading-system` | 阶段 3 目录 |
| 威科夫 | `/wyckoff` | 阶段 4 目录（选修） |
| 术语 | `/glossary` | 查词，不占主路径 |

移动端：同一组链接收入菜单。当前分区在菜单中高亮。

页脚补充（不进主导航）：

- 风险说明（锚点：`/#risk` 或 `/course#risk`，两处文案保持同一意思）
- 本站说明（教育用途、非投资建议）

不在 Sprint 001 / 002 做：搜索、登录、进度条账号、语言切换、交易所外链下单。

## 页面职责

### `/` 首页

**用户来这里做什么：** 判断「这是不是我该用的站」，并点进学习。

必须完成：

1. 一句话说清：面向零基础的永续合约**教程**
2. 展示四阶段（指标 → 组合 → 交易系统 → 威科夫与量价），每阶段一句目标
3. 风险说明（杠杆、爆仓、历史≠未来）
4. 明确「不提供信号 / 荐股 / 自动交易」
5. 主 CTA：开始学习 → `/course`
6. 次 CTA：从 K 线开始 → `/indicators/kline`（文章未发布时改为 `/indicators` 或导学）

不承担：完整课程目录、术语全书、图表实验室。

### `/course` 怎么学

**用户来这里做什么：** 看懂路径，选一篇开始读。

必须完成：

1. 渲染 `content/00-introduction/` 导学（或等价查询），而不是在 Vue 里写死长文
2. 四阶段地图，链到 `/indicators`、`/combinations`、`/trading-system`、`/wyckoff`
3. **推荐起点**固定为导学 → 交易所屏幕 → K 线，避免指标目录变成选课超市
4. 阶段 1 目录：主路径置顶；KDJ 标对照层；合约层含清算瀑布
5. 风险锚点 `#risk`

不承担：单篇正文排版（那是文章页）。

### `/indicators` 指标目录

**用户来这里做什么：** 在阶段 1 里定位一篇。

必须完成：

1. 按 `part: 1` + `order` 列出指标文
2. 每张卡片：标题、一句话 description、level、先修
3. 主路径（K 线 → 趋势线 → 摆动结构 → MA → EMA → RSI → Volume → ATR → 布林带）视觉上优先；KDJ 标对照层
4. 未发布（无文件或 `status: draft` 且未开放）显示「编写中」，可点进则进草稿策略由 Nuxt 定；产品建议 MVP 只公开 `published`

不承担：组合或系统目录。

### `/indicators/[...slug]` 指标文章

**用户来这里做什么：** 学完一个指标，知道它看什么、不看什么、下一篇是谁。

必须完成：

1. 正文来自 `content/01-indicators/{slug}/`
2. 课程壳：当前阶段目录、本篇在路径中的位置
3. 先修链接、上一篇 / 下一篇（按学习路径，不是按文件名）
4. 术语首次出现可链到 `/glossary#{term}`
5. 文末「下一步」与 `learning.next` 一致

不承担：实盘下单、实时推送买卖点。

### `/combinations` 与 `/combinations/[...slug]`

职责同指标目录 / 文章，数据源换为 `part: 2`。  
阶段 2 七篇已发布。不新开振荡器配对。空状态仅用于未发布 slug。

组合文必须在页头提示：组合用于对照观察，不构成交易信号。

### `/trading-system` 与 `/trading-system/[...slug]`

职责同指标目录 / 文章，数据源换为 `part: 3`。  
阶段 3 已发布二十篇。未发布 slug 才显示编写中。

系统文必须在页头提示：规则用于练习设计自己的系统；案例不是荐股或跟单对象。

### `/wyckoff` 与 `/wyckoff/[...slug]`

职责同指标目录 / 文章，数据源换为 `part: 4`。  
阶段 4 十三篇已发布。形态、Spring、SOS、UTAD、SOW 都是观察工具，不是买卖指令。

威科夫文必须在页头或导语提示：本模块是选修读图练习，历史图不能代表未来结果。

### `/glossary` 术语

**用户来这里做什么：** 查一个词，然后回到课文。

必须完成：

1. 来自 `content/glossary/`（由 Knowledge 转写，不是 Vue 写死）
2. 词条锚点，供文章深链
3. 每个词 1–3 句白话 + 如有则「详见课文」链接

不承担：把术语页做成第二套教程。Sprint 001 / 002 有 Knowledge 词库即可先做一页骨架；词条正文可随 Content 补。

## Content 目录 → 页面映射

与 `docs/architecture/project.md` 的 Content 树对齐。

| 内容路径 | Front Matter | 页面 |
|---|---|---|
| `content/00-introduction/index.md` | `part: 0`，`category: introduction`，`slug: introduction` | `/course`（导学枢纽）。**不**增加 `/introduction`。 |
| `content/00-introduction/{slug}/index.md` | `part: 0`，`category: introduction`，slug ≠ `introduction` | `/course/{slug}`（如 `perp-screen`） |
| `content/01-indicators/index.md`（可选） | `category: indicators` | `/indicators` 的引言段落；没有则用页面标题 + 查询列表 |
| `content/01-indicators/{slug}/index.md` | `part: 1` | `/indicators/{slug}` |
| `content/02-combinations/index.md`（可选） | `category: combinations` | `/combinations` 引言 |
| `content/02-combinations/{slug}/index.md` | `part: 2` | `/combinations/{slug}` |
| `content/03-trading-system/index.md`（可选） | `category: trading-system` | `/trading-system` 引言 |
| `content/03-trading-system/{slug}/index.md` | `part: 3` | `/trading-system/{slug}` |
| `content/04-wyckoff/{slug}/index.md` | `part: 4` | `/wyckoff/{slug}` |
| `content/glossary/index.md` 或 `content/glossary/*.md` | `category: glossary` | `/glossary`（单页 + 锚点） |

slug 必须与文件目录名、Front Matter `slug`、URL 最后一段三者一致。规范见 [learning-path.md](./learning-path.md)。

首页不对应 `content/` 下的长文。首页短文案由页面模板维护，课程卡片通过 Content 查询拉取。

## 全站复用模块（产品要求，不规定组件名）

| 模块 | 出现位置 | 产品要求 |
|---|---|---|
| 风险条 / 风险段 | 首页、`/course`、文章页底 | 含杠杆、爆仓、历史≠未来；禁用违禁措辞 |
| 阶段徽章 | 目录卡、文章页头 | 指标 / 组合 / 交易系统 |
| 先修芯片 | 目录卡、文章页头 | 链到先修文；未发布先修显示纯文本 |
| 上一篇 / 下一篇 | 文章页底 | 按 `order` 与 `learning.next`，跨阶段时下一篇可指向阶段目录 |
| 课程侧栏 | 文章页 | 当前 `part` 的已发布列表，当前篇高亮 |
| 空状态 | 组合、系统、未发布指标 | 说明原因 + 回主路径，不放虚假完整度 |

## 对内容模型的修订建议（本任务不改 architecture 文件）

现有 `docs/architecture/content-model.md` 的 `part` 只有 1 / 2 / 3，但已发布导学使用 `part: 0`。

建议 Nuxt schema 与后续 architecture 修订：

```text
part:
  0 = 导学
  1 = 指标基础
  2 = 指标组合
  3 = 交易系统
  4 = 威科夫与量价
```

`category` 已包含 `introduction`。列表可用 `part: 0`。取枢纽正文必须再加 `slug === 'introduction'`，不能只按 category 取第一篇。

Sprint 009 起使用 `/course/[...slug]` 承载 `perp-screen` 等非枢纽导学。一级导航不增加条目。
