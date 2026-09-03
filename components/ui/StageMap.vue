<script setup lang="ts">
import { LEARNING_STAGES } from './courseMeta'
</script>

<template>
  <div class="stage-map">
    <NuxtLink
      v-for="stage in LEARNING_STAGES"
      :key="stage.part"
      :to="stage.to"
      class="stage-map__item"
    >
      <span class="stage-map__index">阶段 {{ stage.part }}</span>
      <strong>{{ stage.label }}</strong>
      <p>{{ stage.sentence }}</p>
    </NuxtLink>
  </div>
</template>
