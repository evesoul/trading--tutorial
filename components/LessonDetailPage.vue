<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import type { LessonCategory } from '../types/content'
import type { LessonNeighbor } from './ui/courseMeta'
import { levelLabel, nextReason, plannedLessonTitle } from './ui/courseMeta'

const props = defineProps<{
  category: LessonCategory
}>()

const emptyBack: Record<LessonCategory, { to: string, action: string, title: string, description: string }> = {
  introduction: {
    to: '/course',
    action: '回到怎么学',
    title: '没有这篇导学',
    description: '这篇还没发布，或不在公开目录里。',
  },
  indicators: {
    to: '/indicators',
    action: '回到指标目录',
    title: '这篇指标课还没发布',
    description: '未发布的课不会做成可点链接。先读已开放的主路径，或回到目录。',
  },
  combinations: {
    to: '/indicators',
    action: '先从指标学起',
    title: '这篇组合课还没发布',
    description: '组合课依赖已学指标。现在没有正文，先回去看图。',
  },
  'trading-system': {
    to: '/course',
    action: '回到怎么学',
    title: '这篇系统课还没发布',
    description: '系统课是第三阶段。先建立看图能力，再回来。',
  },
  glossary: {
    to: '/course',
    action: '回到怎么学',
    title: '没有这条术语',
    description: '术语表还在建设。先回到怎么学继续读课。',
  },
}

const route = useRoute()
const { fetchBySlug, slugFromRoute } = useLesson()
const { fetchLessons, resolvePublishedPath, getLessonPath } = useCourse()
const slug = computed(() => slugFromRoute(route.params.slug))

interface LessonShell {
  lesson: Collections['lessons']
  siblings: Collections['lessons'][]
  prev: LessonNeighbor | null
  next: LessonNeighbor[]
  prerequisites: LessonNeighbor[]
}

async function toNeighbor(itemSlug: string, titleHint?: string): Promise<LessonNeighbor> {
  const path = await resolvePublishedPath(itemSlug)
  return {
    slug: itemSlug,
    title: titleHint ?? plannedLessonTitle(itemSlug),
    path,
    reason: nextReason(itemSlug),
  }
}

const { data: shell } = await useAsyncData(
  () => `lesson-shell-${props.category}-${slug.value}`,
  async (): Promise<LessonShell | null> => {
    const lesson = await fetchBySlug(slug.value, props.category)
    if (!lesson) {
      return null
    }

    const siblings = await fetchLessons({ category: props.category })
    const titleBySlug = new Map(siblings.map(item => [item.slug, item.title]))

    const prerequisiteSlugs = lesson.learning?.prerequisites ?? []
    const nextSlugs = lesson.learning?.next ?? []

    const prerequisites = await Promise.all(
      prerequisiteSlugs.map(itemSlug => toNeighbor(itemSlug, titleBySlug.get(itemSlug))),
    )
    const next = await Promise.all(
      nextSlugs.map(itemSlug => toNeighbor(itemSlug, titleBySlug.get(itemSlug))),
    )

    let prev: LessonNeighbor | null = null
    for (let index = prerequisites.length - 1; index >= 0; index -= 1) {
      const candidate = prerequisites[index]
      if (candidate?.path) {
        prev = candidate
        break
      }
    }

    if (!prev) {
      const currentIndex = siblings.findIndex(item => item.slug === lesson.slug)
      const previous = currentIndex > 0 ? siblings[currentIndex - 1] : undefined
      if (previous) {
        prev = {
          slug: previous.slug,
          title: previous.title,
          path: getLessonPath(previous.category, previous.slug),
          reason: '',
        }
      }
    }

    return {
      lesson,
      siblings,
      prev,
      next,
      prerequisites,
    }
  },
  { watch: [slug] },
)

const fallback = computed(() => emptyBack[props.category])

useSeoMeta({
  title: () => shell.value?.lesson.title ?? fallback.value.title,
  description: () => shell.value?.lesson.description ?? fallback.value.description,
})
</script>

<template>
  <UiEmptyState
    v-if="!shell"
    :title="fallback.title"
    :description="fallback.description"
    :to="fallback.to"
    :action="fallback.action"
    as-title
  />
  <article v-else class="page article-layout">
    <div>
      <header class="article-header">
        <p class="chip-row">
          <UiStageBadge :part="shell.lesson.part" />
          <span class="level-chip">{{ levelLabel(shell.lesson.level) }}</span>
        </p>
        <h1>{{ shell.lesson.title }}</h1>
        <p class="lede">
          {{ shell.lesson.description }}
        </p>
        <UiPrerequisiteList :items="shell.prerequisites" />
      </header>

      <LessonContent :lesson="shell.lesson" :show-header="false" />

      <UiRiskCallout compact class="section-gap" />

      <UiLessonPager :prev="shell.prev" :next="shell.next" />

      <p class="back-course">
        <UiButtonLink to="/course" variant="ghost">
          回课程
        </UiButtonLink>
      </p>
    </div>

    <aside class="lesson-rail" aria-label="本阶段已发布课文">
      <h2>{{ shell.lesson.part === 1 ? '指标主路径' : '本阶段课文' }}</h2>
      <ol>
        <li
          v-for="item in shell.siblings"
          :key="item.id"
        >
          <NuxtLink
            :to="getLessonPath(item.category, item.slug)"
            :aria-current="item.slug === shell.lesson.slug ? 'page' : undefined"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ol>
    </aside>
  </article>
</template>
