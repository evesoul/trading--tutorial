# U本位永续合约交易教程

面向零基础用户的 U 本位永续合约交易教育网站。

本项目用于学习指标、指标组合、交易系统和风险管理，不是交易信号、荐股、喊单或自动交易系统。

## 技术栈

- Nuxt
- Vue
- TypeScript（strict）
- Nuxt Content

教程正文来自 `content/`，不写死在 Vue 里。

## 要求

- Node.js >= 22.5.0（使用 Node 原生 SQLite）
- npm

## 本地启动

```bash
npm install
npm run dev
```

开发服务器默认：http://localhost:3000

## Scripts

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript 检查 |

## 路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页 |
| `/course` | 课程大纲 |
| `/indicators` | 指标列表 |
| `/indicators/[...slug]` | 指标课文 |
| `/combinations` | 组合列表 |
| `/combinations/[...slug]` | 组合课文 |
| `/trading-system` | 交易系统列表 |
| `/trading-system/[...slug]` | 交易系统课文 |
| `/glossary` | 术语表 |

## 内容查询

页面不直接查询 Content。请使用：

- `useCourse()`：按 `part` / `category` / `order` 查询课程
- `useLesson()`：按 `slug`（及可选 `category`）查询单篇课文
- `getLessonPath(category, slug)`：生成路由

## 目录约定

为对齐 `AGENTS.md` 的 Agent 边界，本仓库使用 `srcDir: '.'`：

- `pages/` `components/` `composables/` `server/` 由 Nuxt Agent 维护
- `components/ui/` 留给 UI Agent
- `content/` 留给 Content Agent，不要改写正文
