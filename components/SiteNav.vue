<script setup lang="ts">
import { NAV_ITEMS, isNavActive } from './ui/courseMeta'

const route = useRoute()
const open = ref(false)

watch(() => route.fullPath, () => {
  open.value = false
})

watch(open, (isOpen) => {
  if (import.meta.client) {
    document.body.classList.toggle('nav-open', isOpen)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.classList.remove('nav-open')
  }
})

function toggleNav() {
  open.value = !open.value
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__bar">
      <NuxtLink to="/" class="site-wordmark">
        <span class="site-wordmark__name">U 本位永续合约教程</span>
        <span class="site-wordmark__tag">教育站 · 不是信号站</span>
      </NuxtLink>
      <button
        type="button"
        class="site-nav__toggle"
        :aria-expanded="open"
        aria-controls="site-menu"
        @click="toggleNav"
      >
        {{ open ? '关闭菜单' : '菜单' }}
      </button>
      <nav
        id="site-menu"
        class="site-nav__panel"
        :class="{ 'is-open': open }"
        aria-label="站点导航"
      >
        <ul class="site-nav__list">
          <li v-for="item in NAV_ITEMS" :key="item.to">
            <NuxtLink
              :to="item.to"
              :class="{ 'is-active': isNavActive(route.path, item) }"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
