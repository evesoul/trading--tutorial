<script setup lang="ts">
import { partLabel } from './courseMeta'

const props = defineProps<{
  part: number
}>()
</script>

<template>
  <span class="stage-badge">
    {{ partLabel(props.part) }}
  </span>
</template>
