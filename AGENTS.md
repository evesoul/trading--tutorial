# U本位永续合约交易教程 — Cursor Multi-Agent 工程规范

## 1. 项目定位
这是一个面向零基础用户的 U 本位永续合约交易教育网站。

核心目标：
1. 帮助小白理解常用交易指标
2. 帮助用户理解多个指标如何组合
3. 帮助用户建立自己的交易系统
4. 帮助用户理解风险管理、仓位管理和回测
5. 通过图表、案例和交互降低学习门槛

本项目是交易教育网站，不是交易信号、荐股、喊单或自动交易系统。

## 2. 核心课程结构

### 第一部分：常用指标
主路径：K线 → 趋势线与支撑阻力 → 摆动结构与假突破 → MA → EMA → RSI → Volume → ATR → Bollinger Bands  
主路径续：MACD  
对照层：KDJ（不扩写，不新开第四个振荡器）  
合约数据层：Open Interest → Funding Rate → Long/Short Ratio → CVD → 清算瀑布怎么读图

发布课序以 `docs/product/learning-path.md` 为准。

### 第二部分：指标组合
- 趋势 + 动量
- 趋势 + 成交量
- 价格 + OI
- OI + Volume
- Funding + OI
- RSI + MACD（示范两把尺问同一问题，不新开 KDJ+RSI）
- EMA + Volume（主题内案例，不是一级路由）
- 多指标共振

### 第三部分：建立自己的交易系统
- 交易理念
- 市场环境
- 多周期
- 趋势识别 / 方向判断
- 订单与成交
- 入场规则
- 出场规则
- 止损
- 止盈
- 仓位管理
- 成本对照 R
- 风险管理
- 账户热度与相关
- 交易频率
- 执行偏差
- 交易日志
- 回测
- 数据统计
- 系统优化
- 完整交易系统案例

阶段 0 导学含「怎么学」与「交易所屏幕上有什么」。

### 第四部分：威科夫与量价（选修模块）
- 威科夫怎么用在永续
- 吸筹与 Spring
- 拉升：SOS 与 BUEC
- 派发：UTAD 与 LPSY
- 下跌：SOW
- 关键事件变形
- 努力与结果
- 多周期怎么对阶段
- 完整读图流程
- 永续特有过滤器
- 综合案例复盘
- 把阶段写成系统
- 检查清单与自评

发布课序以 `docs/product/learning-path.md` 为准。阶段 4 是选修读图模块，不替代阶段 3，也不构成交易信号。

## 3. 技术栈
- Nuxt
- Vue
- TypeScript
- Nuxt Content

原则：
- TypeScript strict
- Composition API
- `<script setup>`
- 内容与 UI 解耦
- 数据与展示解耦
- 组件可复用
- 优先使用 Nuxt Content 管理教程内容

## 4. Agent 分工
- Product Agent：产品架构、学习路径、页面信息架构
- Knowledge Agent：交易知识库、指标定义、术语统一
- Content Agent：Markdown 教程、案例、学习提示
- Strategy Agent：指标组合、交易逻辑、交易系统、风险管理、回测
- Visual Agent：K线图、指标图、示意图、流程图
- Nuxt Agent：Nuxt / Nuxt Content / 页面 / 路由 / Content 查询
- UI Agent：UI / UX / 响应式 / 组件
- QA Agent：代码与内容审核

## 5. Agent 边界
| Agent | 主要目录 |
|---|---|
| Product | `docs/product/` |
| Knowledge | `docs/knowledge/` |
| Content | `content/` |
| Strategy | `docs/strategy/` |
| Visual | `public/images/`、`docs/visual/` |
| Nuxt | `pages/`、`components/`、`composables/`、`server/` |
| UI | `components/ui/` |
| QA | `tests/`、`docs/qa/` |

未经任务授权，不修改其他 Agent 的核心目录。

## 6. 内容原则
教程必须：
- 面向零基础用户
- 使用通俗语言
- 首次出现专业术语时解释
- 一个概念解决一个问题
- 使用实际图表辅助理解
- 使用正反案例
- 解释指标局限性
- 解释市场环境差异

禁止：
- 一定
- 必然
- 100%准确
- 稳赚
- 必赚
- 无风险
- 保证盈利

## 7. 图表原则
所有图表必须有明确教学目的。
真实行情图必须记录 symbol、timeframe、source、period。
示意图必须明确标记为示意图。
禁止用虚构数据证明盈利能力。

## 8. Git 原则
一个任务一个逻辑 commit。

示例：
- `feat(content): add RSI tutorial`
- `feat(ui): add article navigation`
- `feat(chart): add RSI chart component`
- `fix(content): correct RSI terminology`
- `docs(knowledge): update OI definition`

## 9. 完成标准
一个任务只有同时满足以下条件才算完成：
- 功能完成
- 内容完成
- 类型检查通过
- lint 通过
- build 通过
- 内容检查通过
- 没有明显 UI 问题
- 没有 broken links
- 任务状态已更新
