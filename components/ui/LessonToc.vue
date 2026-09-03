<script setup lang="ts">
import type { LessonHeading } from './lessonHeadings'

defineProps<{
  items: LessonHeading[]
}>()
</script>

<template>
  <nav
    v-if="items.length >= 3"
    class="lesson-toc"
    aria-label="本篇目录"
  >
    <p class="lesson-toc__label">本篇</p>
    <ol>
      <li
        v-for="item in items"
        :key="item.id"
      >
        <a :href="`#${item.id}`">{{ item.text }}</a>
      </li>
    </ol>
  </nav>
</template>
