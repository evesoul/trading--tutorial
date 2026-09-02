<script setup lang="ts">
import type { Collections } from '@nuxt/content'

withDefaults(defineProps<{
  lesson: Collections['lessons'] | null
  showHeader?: boolean
}>(), {
  showHeader: true,
})
</script>

<template>
  <article v-if="lesson" class="lesson-prose">
    <header v-if="showHeader" class="article-header">
      <h1>{{ lesson.title }}</h1>
      <p class="lede">
        {{ lesson.description }}
      </p>
    </header>
    <ContentRenderer :value="lesson" />
  </article>
  <p v-else>
    未找到对应课文。
  </p>
</template>
