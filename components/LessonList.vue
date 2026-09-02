<script setup lang="ts">
import type { LessonCategory } from '../types/content'
import { levelLabel } from './ui/courseMeta'

const props = defineProps<{
  lessons: Array<{
    id: string
    title: string
    description: string
    category: LessonCategory
    slug: string
    level?: string
  }>
}>()

const { getLessonPath } = useCourse()
</script>

<template>
  <ul v-if="props.lessons.length" class="lesson-list">
    <li
      v-for="lesson in props.lessons"
      :key="lesson.id"
      class="lesson-list__item"
    >
      <NuxtLink
        :to="getLessonPath(lesson.category, lesson.slug)"
        class="lesson-card"
      >
        <strong>{{ lesson.title }}</strong>
        <p>{{ lesson.description }}</p>
        <span v-if="lesson.level" class="level-chip">{{ levelLabel(lesson.level) }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
