# Multi-Agent Workflow

## 1. 创建任务
Product / Architect 创建 TASK-XXX。

## 2. Agent 接任务
必须读取：
- AGENTS.md
- .cursor/rules/*
- docs/tasks/TODO.md
- 相关 docs/knowledge/*

## 3. 创建 Worktree
```bash
git worktree add ../trading-course-agent-content -b agent/content
```

## 4. 开发
只修改任务范围内文件。

## 5. 自检
```bash
npm run lint
npm run typecheck
npm run build
```

## 6. Commit
```bash
git add .
git commit -m "feat(content): add RSI tutorial"
```

## 7. Review
QA Agent 检查代码、内容和视觉。

## 8. Merge
通过 Review 后合并 main。

## 9. 更新任务
in-progress → review → completed
