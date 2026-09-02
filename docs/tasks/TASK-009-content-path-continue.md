# Agent Task

## Task ID
TASK-009

## Title
主路径续：Volume / MACD / KDJ / 布林带 + 术语表

## Owner
Content Agent

## Goal
按 `docs/product/learning-path.md` 写出阶段 1 主路径续四篇，并把知识库术语表转成 `/glossary` 可读内容。修订 RSI 文末，使 Volume 发布后可链过去。

## Scope
- `content/01-indicators/volume/`
- `content/01-indicators/macd/`
- `content/01-indicators/kdj/`
- `content/01-indicators/bollinger-bands/`（目录名跟 slug，不要用旧的 `bollinger/`）
- `content/glossary/`
- `content/01-indicators/rsi/index.md`（只改下一步链接，不重写全篇）
- `content/HANDOFF.md` 或 `content/HANDOFF-SPRINT-003.md`

## Out of Scope
- OI / Funding / LSR / CVD 正文
- 阶段 2 / 3
- 改 `docs/knowledge/`
- 伪造真实行情图
- git commit / push

## Input
- `docs/prompts/content-agent.md`、`.cursor/rules/content.mdc`、`.cursor/rules/trading.mdc`
- `docs/product/learning-path.md`
- `docs/knowledge/indicators/volume.md` `macd.md` `kdj.md` `bollinger-bands.md`
- `docs/knowledge/glossary.md`
- 图：`/images/concept/vis-005-volume.svg`、`vis-003-macd-cross.svg`；KDJ / 布林带若尚无 SVG 则只用文字，或等 vis-009 / vis-010
- 现有 RSI：`learning.next: volume`

## Output Front Matter

| 路径 | slug | order | prereq | next | status |
|---|---|---|---|---|---|
| volume/index.md | volume | 5 | kline | macd | published |
| macd/index.md | macd | 6 | ema | kdj | published |
| kdj/index.md | kdj | 7 | rsi | bollinger-bands | published |
| bollinger-bands/index.md | bollinger-bands | 8 | ma | open-interest | published |
| glossary | 见下 | — | — | — | published |

术语表：把 `docs/knowledge/glossary.md` 转成零基础可读的 `content/glossary/`（一篇总表或一词一条均可）。`category: glossary`，`part` 按 content-model。Nuxt `/glossary` 会列出 `category: glossary`。

RSI：文末改为可点 `[Volume](/indicators/volume)`；front matter `next` 仍为 `volume`。

每篇结构：学习目标 → 概念 → 原理 → 怎么看 → 怎么使用 → 正反案例 → 常见错误 → 局限性 → 总结 → 下一步。

布林带 next 是 `open-interest`（未发布）：文末写「OI 编写中，可先回 [/course](/course)」，不要链 404。

## Acceptance Criteria
- [x] 四篇 + 术语已发布，Front Matter 完整
- [x] 无违禁措辞；金叉/超买/开口收口不是开仓指令
- [x] 示意图标明「示意图」；不插 vis-101–107 假图
- [x] RSI → Volume 可点；布林带不链未发布 OI
- [x] 术语跟 Knowledge（MA=SMA、KDJ 称 K 值、强平）
- [x] HANDOFF

## Status
completed
