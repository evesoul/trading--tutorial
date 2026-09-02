<script setup lang="ts">
const { fetchLessons } = useCourse()
const { data: lessons } = await useAsyncData('glossary-lessons', () =>
  fetchLessons({ category: 'glossary' }),
)

useSeoMeta({
  title: '术语表',
  description: '查一个词，然后回到课文。术语页不占主路径。',
})
</script>

<template>
  <section class="page page--narrow stack">
    <header>
      <h1>术语表</h1>
      <p class="lede">
        查完用浏览器返回，或回到怎么学继续读。词条不是第二套教程。
      </p>
    </header>

    <LessonList v-if="(lessons ?? []).length" :lessons="lessons ?? []" />

    <UiEmptyState
      v-else
      title="术语表建设中"
      description="词条正文还在整理。课文里第一次出现的术语会先解释。先回到怎么学，按主路径读。"
      to="/course"
      action="回到怎么学"
    />

    <LessonContent
      v-for="lesson in lessons ?? []"
      :key="lesson.id"
      :lesson="lesson"
    />
  </section>
</template>
