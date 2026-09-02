<script setup lang="ts">
import type { LessonCategory } from '../types/content'
import { UPCOMING_INDICATOR_TITLES, categoryPart } from './ui/courseMeta'

const emptyCopy: Record<LessonCategory, {
  title: string
  description: string
  to: string
  action: string
}> = {
  introduction: {
    title: '导学还没写好',
    description: '先回到怎么学，看三阶段地图和已经开放的起点。',
    to: '/course',
    action: '回到怎么学',
  },
  indicators: {
    title: '第一批教程准备中',
    description: '指标课还没有已发布的正文。先看怎么学，了解路径和风险。',
    to: '/course',
    action: '回到怎么学',
  },
  combinations: {
    title: '组合课尚未开放',
    description: '组合用来对照已经学过的指标，不构成交易信号。现在还没有正文，建议先学看图。',
    to: '/indicators',
    action: '先从指标学起',
  },
  'trading-system': {
    title: '交易系统课尚未开放',
    description: '系统课是第三阶段：先有看图能力，再练习设计自己的规则。案例不是荐股或跟单对象。',
    to: '/course',
    action: '回到怎么学',
  },
  glossary: {
    title: '术语表建设中',
    description: '词条正文还在整理。课文里第一次出现的术语会先解释。查完后回到怎么学继续读。',
    to: '/course',
    action: '回到怎么学',
  },
}

const leads: Record<LessonCategory, string> = {
  introduction: '先认路，再进入指标。',
  indicators: '阶段 1：先搞清楚每个指标在回答什么问题。推荐按 K 线 → MA → EMA → RSI 读。',
  combinations: '阶段 2：对照多个指标。正文尚未开放，先把看图课读完。',
  'trading-system': '阶段 3：把观察写成可重复的规则。正文尚未开放。',
  glossary: '查一个词，然后回到课文。术语页不占主路径。',
}

const props = defineProps<{
  category: LessonCategory
  heading: string
}>()

const { fetchLessons } = useCourse()
const { data: lessons } = await useAsyncData(
  `lessons-${props.category}`,
  () => fetchLessons({ category: props.category }),
)

const empty = computed(() => emptyCopy[props.category])
</script>

<template>
  <section class="page page--narrow stack">
    <header>
      <p><UiStageBadge :part="categoryPart(category)" /></p>
      <h1>{{ heading }}</h1>
      <p class="lede">
        {{ leads[category] }}
      </p>
    </header>

    <LessonList v-if="(lessons ?? []).length" :lessons="lessons ?? []" />

    <UiEmptyState
      v-else
      :title="empty.title"
      :description="empty.description"
      :to="empty.to"
      :action="empty.action"
    />

    <aside
      v-if="category === 'indicators'"
      class="panel"
    >
      <h2>后续指标（编写中）</h2>
      <p class="lede">
        这些课还没有发布，目录里只显示名称，不会链到空页面。
      </p>
      <ul class="upcoming-list">
        <li
          v-for="title in UPCOMING_INDICATOR_TITLES"
          :key="title"
        >
          <span class="writing-chip">{{ title }} 编写中</span>
        </li>
      </ul>
    </aside>
  </section>
</template>
