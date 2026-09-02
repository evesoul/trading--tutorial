<script setup lang="ts">
withDefaults(defineProps<{
  to: string
  variant?: 'primary' | 'ghost'
}>(), {
  variant: 'primary',
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="btn"
    :class="variant === 'ghost' ? 'btn--ghost' : 'btn--primary'"
  >
    <slot />
  </NuxtLink>
</template>
