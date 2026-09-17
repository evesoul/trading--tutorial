<script setup lang="ts">
const jumps = [
  { href: '#map-heading', label: '四阶段' },
  { href: '#stage0-heading', label: '导学' },
  { href: '#path-heading', label: '主路径' },
  { href: '#contract-path-heading', label: '合约层' },
  { href: '#combination-path-heading', label: '组合' },
  { href: '#system-path-heading', label: '系统' },
  { href: '#wyckoff-path-heading', label: '威科夫' },
] as const
</script>

<template>
  <nav class="course-jump" aria-label="本页跳转">
    <p class="course-jump__hint">
      第一次来先读导学。已经认路过，再跳到课表。
    </p>
    <ol>
      <li
        v-for="item in jumps"
        :key="item.href"
      >
        <a :href="item.href">{{ item.label }}</a>
      </li>
    </ol>
  </nav>
</template>
