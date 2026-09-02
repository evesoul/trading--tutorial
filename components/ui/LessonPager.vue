<script setup lang="ts">
import type { LessonNeighbor } from './courseMeta'

defineProps<{
  prev: LessonNeighbor | null
  next: LessonNeighbor[]
}>()
</script>

<template>
  <nav class="lesson-pager" aria-label="上下篇">
    <NuxtLink
      v-if="prev?.path"
      :to="prev.path"
      class="pager-card"
    >
      <span class="pager-kicker">上一篇</span>
      <strong>{{ prev.title }}</strong>
    </NuxtLink>
    <div
      v-else
      class="pager-card pager-card--muted"
    >
      <span class="pager-kicker">上一篇</span>
      <strong>已经是推荐起点</strong>
      <p>需要认路时，回到怎么学。</p>
    </div>

    <template v-if="next.length">
      <NuxtLink
        v-for="item in next.filter(entry => entry.path)"
        :key="item.slug"
        :to="item.path ?? '/course'"
        class="pager-card"
      >
        <span class="pager-kicker">下一篇</span>
        <strong>{{ item.title }}</strong>
        <p v-if="item.reason">
          {{ item.reason }}
        </p>
      </NuxtLink>
      <div
        v-for="item in next.filter(entry => !entry.path)"
        :key="`draft-${item.slug}`"
        class="pager-card pager-card--muted"
      >
        <span class="pager-kicker">下一篇</span>
        <strong>{{ item.title }} 编写中</strong>
        <p>{{ item.reason || '这篇还没发布，先复习已读过的课。' }}</p>
        <UiButtonLink to="/course" variant="ghost">
          回怎么学
        </UiButtonLink>
      </div>
    </template>
    <NuxtLink
      v-else
      to="/course"
      class="pager-card"
    >
      <span class="pager-kicker">下一步</span>
      <strong>返回怎么学</strong>
      <p>本篇之后还没有已发布的下一课。</p>
    </NuxtLink>
  </nav>
</template>
