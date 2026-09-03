<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <UiTeachingChart :id="id" />
</template>
