<script setup lang="ts">
import type { LessonNeighbor } from './courseMeta'

withDefaults(defineProps<{
  steps: LessonNeighbor[]
  label?: string
}>(), {
  label: '主路径',
})
</script>

<template>
  <ol class="path-steps">
    <li v-for="(step, index) in steps" :key="step.slug">
      <NuxtLink
        v-if="step.path"
        :to="step.path"
        class="path-steps__item"
      >
        <span class="path-steps__kicker">{{ label }} {{ index + 1 }}</span>
        <strong>{{ step.title }}</strong>
        <p>{{ step.reason }}</p>
      </NuxtLink>
      <div
        v-else
        class="path-steps__item is-static"
      >
        <span class="path-steps__kicker">{{ label }} {{ index + 1 }}</span>
        <strong>{{ step.title }} 编写中</strong>
        <p>这篇还没发布，先回到怎么学继续已开放的课。</p>
      </div>
    </li>
  </ol>
</template>
