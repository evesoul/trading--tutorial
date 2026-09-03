<script setup lang="ts">
import type { LessonCategory } from '../types/content'
import { catalogGroups, categoryPart, plannedLessonTitle } from './ui/courseMeta'

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
    description: '系统课是第三阶段：把观察写成可检查的规则，不是跟单策略。现在还没有正文，先回到怎么学。',
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
  indicators: '阶段 1：先搞清楚每个指标在回答什么问题。推荐先按 K 线 → 趋势线与支撑阻力 → 摆动结构与假突破 → MA → EMA → RSI → 成交量 → ATR → 布林带读。MACD 是主路径续。KDJ 是对照层，不进主路径。再进入合约数据层：持仓量 → 资金费率 → 多空比 → 累计成交量差 → 清算瀑布。',
  combinations: '阶段 2：用来对照多个指标，不构成交易信号。',
  'trading-system': '阶段 3：把观察写成可检查的规则，不是跟单策略。按二十步从理念走到案例；未发布只标编写中。',
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

const groups = computed(() => {
  const meta = catalogGroups(props.category)
  if (!meta) {
    return null
  }
  const published = lessons.value ?? []
  const bySlug = new Map(published.map(item => [item.slug, item]))
  const grouped = meta.map(group => ({
    key: group.key,
    heading: group.heading,
    note: group.note,
    published: group.slugs.flatMap((slug) => {
      const item = bySlug.get(slug)
      return item ? [item] : []
    }),
    unpublished: group.slugs
      .filter(slug => !bySlug.has(slug))
      .map(slug => ({
        slug,
        title: plannedLessonTitle(slug),
      })),
  }))
  const used = new Set(meta.flatMap(group => [...group.slugs]))
  const leftover = published.filter(item => !used.has(item.slug))
  if (leftover.length) {
    grouped.push({
      key: 'other',
      heading: '其他',
      note: undefined,
      published: leftover,
      unpublished: [],
    })
  }
  return grouped
})

const showEmpty = computed(() => {
  if (groups.value) {
    return groups.value.every(group => group.published.length === 0)
  }
  return (lessons.value ?? []).length === 0
})
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

    <template v-if="!showEmpty && groups">
      <section
        v-for="group in groups"
        :key="group.key"
        class="catalog-group stack"
        :aria-labelledby="`catalog-${group.key}`"
      >
        <h2 :id="`catalog-${group.key}`">
          {{ group.heading }}
        </h2>
        <p v-if="group.note" class="lede">
          {{ group.note }}
        </p>
        <LessonList
          v-if="group.published.length"
          :lessons="group.published"
        />
        <ul
          v-if="group.unpublished.length"
          class="lesson-list"
        >
          <li
            v-for="item in group.unpublished"
            :key="item.slug"
            class="lesson-list__item"
          >
            <div class="lesson-card is-static">
              <strong>{{ item.title }} 编写中</strong>
              <p>这篇还没发布，先读已开放的课。不会链到空地址。</p>
            </div>
          </li>
        </ul>
      </section>
    </template>

    <LessonList
      v-else-if="!showEmpty"
      :lessons="lessons ?? []"
    />

    <UiEmptyState
      v-else
      :title="empty.title"
      :description="empty.description"
      :to="empty.to"
      :action="empty.action"
    />
  </section>
</template>

<style scoped>
.catalog-group {
  margin: 0;
}

.catalog-group h2 {
  margin: 0;
}

.lesson-card.is-static {
  cursor: default;
  opacity: 0.92;
}

.lesson-card.is-static:hover {
  border-color: var(--line);
}
</style>
