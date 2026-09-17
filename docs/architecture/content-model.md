# Content Model

每篇文章至少包含：
```yaml
title:
description:
part:
category:
level:
order:
slug:
```

可选：
```yaml
indicator:
  type:
  difficulty:

learning:
  prerequisites:
  next:

visual:
  cover:
  charts:

status:
```

part:
- 0 = 导学（`slug: introduction` 映射到 `/course`；其余 introduction slug 映射到 `/course/{slug}`。不新建 `/introduction`）
- 1 = 指标基础
- 2 = 指标组合
- 3 = 交易系统
- 4 = 威科夫与量价（`category: wyckoff`，映射到 `/wyckoff/{slug}`）

level:
- beginner
- intermediate
- advanced

category:
- introduction
- indicators
- combinations
- trading-system
- wyckoff
- glossary

status:
- draft
- review
- published
- archived
