<script setup lang="ts">
const { fetchLessons } = useCourse()
const { data: lessons } = await useAsyncData('home-published', () => fetchLessons())

const publishedCount = computed(() =>
  (lessons.value ?? []).filter(item => item.category !== 'glossary').length,
)

useSeoMeta({
  title: 'U 本位永续合约交易教程（教育）',
  description: '面向零基础的永续合约教程站。先认识风险，再按指标 → 组合 → 交易系统 → 威科夫与量价学习。不是信号、荐股或自动交易。',
})
</script>

<template>
  <section class="page page--narrow stack">
    <header class="home-hero">
      <p class="stage-badge">教育站</p>
      <h1>U 本位永续合约交易教程</h1>
      <p class="lede">
        面向零基础读者的教程站。帮你看懂常用指标、指标怎么组合，以及怎样思考自己的交易系统。适合听说过合约、但还没系统学过看图的人。
      </p>
      <p v-if="publishedCount" class="home-hero__meta">
        已开放 {{ publishedCount }} 篇。从怎么学按顺序读即可。
      </p>
      <p class="btn-row">
        <UiButtonLink to="/course">
          开始学习
        </UiButtonLink>
        <UiButtonLink to="/indicators" variant="ghost">
          已有一点基础？看指标目录
        </UiButtonLink>
      </p>
    </header>

    <section aria-labelledby="stages-heading">
      <h2 id="stages-heading">四条学习阶段</h2>
      <UiStageMap />
    </section>

    <div class="home-trust">
      <UiRiskCallout id="risk" />

      <section class="panel" aria-labelledby="boundary-heading">
        <h2 id="boundary-heading">这不是信号站</h2>
        <p>本站只做教育，不代替你做交易决定。</p>
        <ul class="boundary-list">
          <li>不提供买卖信号</li>
          <li>不荐股、不喊单</li>
          <li>不做自动交易，也不是行情终端</li>
        </ul>
      </section>
    </div>
  </section>
</template>
