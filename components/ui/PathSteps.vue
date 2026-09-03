<script setup lang="ts">
import type { LessonNeighbor } from './courseMeta'

withDefaults(defineProps<{
  steps: LessonNeighbor[]
  label?: string
  compact?: boolean
}>(), {
  label: '主路径',
  compact: false,
})
</script>

<template>
  <ol
    class="path-steps"
    :class="{ 'path-steps--compact': compact }"
  >
    <li v-for="(step, index) in steps" :key="step.slug">
      <NuxtLink
        v-if="step.path"
        :to="step.path"
        class="path-steps__item"
      >
        <span class="path-steps__num" aria-hidden="true">{{ index + 1 }}</span>
        <span class="path-steps__copy">
          <span class="path-steps__kicker">{{ label }} {{ index + 1 }}</span>
          <strong>{{ step.title }}</strong>
          <p>{{ step.reason }}</p>
        </span>
      </NuxtLink>
      <div
        v-else
        class="path-steps__item is-static"
      >
        <span class="path-steps__num" aria-hidden="true">{{ index + 1 }}</span>
        <span class="path-steps__copy">
          <span class="path-steps__kicker">{{ label }} {{ index + 1 }}</span>
          <strong>{{ step.title }} 编写中</strong>
          <p>这篇还没发布，先回到怎么学继续已开放的课。</p>
        </span>
      </div>
    </li>
  </ol>
</template>
