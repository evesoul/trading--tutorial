<script setup lang="ts">
const route = useRoute()
const { slugFromRoute } = useLesson()
const slug = computed(() => slugFromRoute(route.params.slug))

watch(slug, async (value) => {
  if (!value || value === 'introduction') {
    await navigateTo('/course', { replace: true })
  }
}, { immediate: true })
</script>

<template>
  <LessonDetailPage
    v-if="slug && slug !== 'introduction'"
    category="introduction"
  />
</template>
