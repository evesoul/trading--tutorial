# 项目架构

## 目标
构建一个面向零基础用户的 U 本位永续合约交易教程平台。

## 技术栈
- Nuxt
- Vue
- TypeScript
- Nuxt Content

## 架构
Nuxt Application
├── Pages
├── Components
├── Composables
├── Nuxt Content
├── Static Assets
└── Utilities

## Content
content/
├── 00-introduction/
├── 01-indicators/
├── 02-combinations/
├── 03-trading-system/
├── 04-wyckoff/
└── glossary/

## 学习关系
基础概念 → 单个指标 → 指标组合 → 交易逻辑 → 交易系统 → 回测 → 复盘

## 页面
 /
 /course
 /course/[...slug]
 /indicators
 /indicators/[...slug]
 /combinations
 /combinations/[...slug]
 /trading-system
 /trading-system/[...slug]
 /wyckoff
 /wyckoff/[...slug]
 /glossary
