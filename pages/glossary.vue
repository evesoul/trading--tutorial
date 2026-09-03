<script setup lang="ts">
import { extractHeadings, shortTermLabel } from '../components/ui/lessonHeadings'

const { fetchLessons } = useCourse()
const { data: lessons } = await useAsyncData('glossary-lessons', () =>
  fetchLessons({ category: 'glossary' }),
)

const groups = computed(() =>
  (lessons.value ?? []).map(lesson => ({
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    lesson,
    terms: extractHeadings(lesson.body, { depth: 3 }).map(item => ({
      id: item.id,
      label: shortTermLabel(item.text),
    })),
  })),
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
      <p class="btn-row">
        <UiButtonLink
          to="/course"
          variant="ghost"
        >
          回到怎么学
        </UiButtonLink>
      </p>
    </header>

    <UiGlossaryJump
      v-if="groups.length"
      :groups="groups"
    />

    <UiEmptyState
      v-if="!groups.length"
      title="术语表建设中"
      description="词条正文还在整理。课文里第一次出现的术语会先解释。先回到怎么学，按主路径读。"
      to="/course"
      action="回到怎么学"
    />

    <section
      v-for="group in groups"
      :id="group.slug"
      :key="group.slug"
      class="glossary-group"
    >
      <h2>{{ group.title }}</h2>
      <p class="lede">
        {{ group.description }}
      </p>
      <nav
        v-if="group.terms.length"
        class="glossary-terms"
        :aria-label="`${group.title}词条`"
      >
        <ol>
          <li
            v-for="term in group.terms"
            :key="term.id"
          >
            <a :href="`#${term.id}`">{{ term.label }}</a>
          </li>
        </ol>
      </nav>
      <article class="lesson-prose glossary-prose">
        <ContentRenderer :value="group.lesson" />
      </article>
    </section>
  </section>
</template>
