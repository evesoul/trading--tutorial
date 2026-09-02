<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  to: string
  action: string
  asTitle?: boolean
}>(), {
  asTitle: false,
})
</script>

<template>
  <section class="empty-state panel">
    <h1 v-if="asTitle">
      {{ title }}
    </h1>
    <h2 v-else>
      {{ title }}
    </h2>
    <p class="lede">
      {{ description }}
    </p>
    <p class="btn-row">
      <UiButtonLink :to="to">
        {{ action }}
      </UiButtonLink>
    </p>
  </section>
</template>
