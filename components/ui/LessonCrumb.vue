<script setup lang="ts">
import type { LessonCategory } from '../../types/content'
import { categoryIndexPath, categoryPart, partLabel } from './courseMeta'

defineProps<{
  category: LessonCategory
  title: string
}>()
</script>

<template>
  <nav class="lesson-crumb" aria-label="当前位置">
    <ol>
      <li>
        <NuxtLink to="/course">
          怎么学
        </NuxtLink>
      </li>
      <li v-if="category !== 'introduction'">
        <NuxtLink :to="categoryIndexPath(category)">
          {{ partLabel(categoryPart(category)) }}
        </NuxtLink>
      </li>
      <li aria-current="page">
        {{ title }}
      </li>
    </ol>
  </nav>
</template>
