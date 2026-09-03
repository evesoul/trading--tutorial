<script setup lang="ts">
defineProps<{
  groups: Array<{
    slug: string
    title: string
  }>
}>()
</script>

<template>
  <nav
    class="glossary-jump"
    aria-label="术语分组"
  >
    <p class="glossary-jump__hint">
      先选一组，再点词。查完回到课文。
    </p>
    <ol>
      <li
        v-for="group in groups"
        :key="group.slug"
      >
        <a :href="`#${group.slug}`">{{ group.title }}</a>
      </li>
    </ol>
  </nav>
</template>
