<script setup lang="ts">
import type { LessonCategory } from '../types/content'
import { levelLabel } from './ui/courseMeta'

const props = withDefaults(defineProps<{
  lessons: Array<{
    id: string
    title: string
    description: string
    category: LessonCategory
    slug: string
    level?: string
  }>
  start?: number
}>(), {
  start: 1,
})

const { getLessonPath } = useCourse()
</script>

<template>
  <ul v-if="props.lessons.length" class="lesson-list">
    <li
      v-for="(lesson, index) in props.lessons"
      :key="lesson.id"
      class="lesson-list__item"
    >
      <NuxtLink
        :to="getLessonPath(lesson.category, lesson.slug)"
        class="lesson-card"
      >
        <span class="lesson-card__index" aria-hidden="true">
          {{ String(start + index).padStart(2, '0') }}
        </span>
        <span class="lesson-card__body">
          <strong>{{ lesson.title }}</strong>
          <p>{{ lesson.description }}</p>
          <span v-if="lesson.level" class="level-chip">{{ levelLabel(lesson.level) }}</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
