<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import type { LessonCategory } from '../../types/content'
import { catalogGroups } from './courseMeta'

const props = defineProps<{
  category: LessonCategory
  currentSlug: string
  siblings: Collections['lessons'][]
}>()

const { getLessonPath } = useCourse()
const open = ref(true)

onMounted(() => {
  if (import.meta.client) {
    open.value = window.matchMedia('(min-width: 960px)').matches
  }
})

function onToggle(event: Event) {
  const target = event.currentTarget
  if (target instanceof HTMLDetailsElement) {
    open.value = target.open
  }
}

const groups = computed(() => {
  const meta = catalogGroups(props.category)
  const bySlug = new Map(props.siblings.map(item => [item.slug, item]))

  if (!meta) {
    return [{
      key: 'all',
      heading: '本阶段课文',
      items: props.siblings,
    }]
  }

  const grouped = meta.map(group => ({
    key: group.key,
    heading: group.heading,
    items: group.slugs.flatMap((slug) => {
      const item = bySlug.get(slug)
      return item ? [item] : []
    }),
  })).filter(group => group.items.length)

  const used = new Set(meta.flatMap(group => [...group.slugs]))
  const leftover = props.siblings.filter(item => !used.has(item.slug))
  if (leftover.length) {
    grouped.push({
      key: 'other',
      heading: '其他',
      items: leftover,
    })
  }

  return grouped
})

const position = computed(() => {
  const index = props.siblings.findIndex(item => item.slug === props.currentSlug)
  return {
    current: index >= 0 ? index + 1 : 0,
    total: props.siblings.length,
  }
})

const railTitle = computed(() => {
  if (props.category === 'indicators') {
    return '指标目录'
  }
  if (props.category === 'combinations') {
    return '组合目录'
  }
  if (props.category === 'trading-system') {
    return '系统目录'
  }
  if (props.category === 'wyckoff') {
    return '威科夫目录'
  }
  return '本阶段课文'
})
</script>

<template>
  <aside class="lesson-rail" aria-label="本阶段已发布课文">
    <details
      class="lesson-rail__fold"
      :open="open"
      @toggle="onToggle"
    >
      <summary class="lesson-rail__summary">
        <span>{{ railTitle }}</span>
        <span v-if="position.total" class="lesson-rail__count">
          {{ position.current }}/{{ position.total }}
        </span>
      </summary>

      <p class="lesson-rail__progress">
        {{ railTitle }}
        <span v-if="position.total">第 {{ position.current }} / {{ position.total }} 篇</span>
      </p>

      <section
        v-for="group in groups"
        :key="group.key"
        class="lesson-rail__group"
      >
        <h2>{{ group.heading }}</h2>
        <ol>
          <li
            v-for="item in group.items"
            :key="item.id"
          >
            <NuxtLink
              :to="getLessonPath(item.category, item.slug)"
              :class="{ 'is-current': item.slug === currentSlug }"
              :aria-current="item.slug === currentSlug ? 'page' : undefined"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ol>
      </section>
    </details>
  </aside>
</template>
