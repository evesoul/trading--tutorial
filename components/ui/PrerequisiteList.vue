<script setup lang="ts">
import type { LessonNeighbor } from './courseMeta'

defineProps<{
  items: LessonNeighbor[]
}>()
</script>

<template>
  <div v-if="items.length" class="prereq-row">
    <span class="level-chip">先修</span>
    <NuxtLink
      v-for="item in items.filter(entry => entry.path)"
      :key="item.slug"
      :to="item.path ?? '/course'"
      class="prereq-chip"
    >
      {{ item.title }}
    </NuxtLink>
    <span
      v-for="item in items.filter(entry => !entry.path)"
      :key="`draft-${item.slug}`"
      class="prereq-chip is-static"
    >
      {{ item.title }} 编写中
    </span>
  </div>
</template>
