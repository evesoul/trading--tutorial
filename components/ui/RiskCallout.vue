<script setup lang="ts">
withDefaults(defineProps<{
  id?: string
  compact?: boolean
}>(), {
  id: undefined,
  compact: false,
})
</script>

<template>
  <section
    :id="id"
    class="risk-callout"
    :class="{ 'risk-callout--compact': compact }"
    aria-labelledby="risk-heading"
  >
    <h2 v-if="!compact" id="risk-heading">
      先看风险
    </h2>
    <h3 v-else id="risk-heading">
      风险提醒
    </h3>
    <ul>
      <li>永续合约有较高风险。杠杆会放大亏损，保证金可能亏完。</li>
      <li>高杠杆会更快触发强平（爆仓）。强平看标记价，不是 K 线上的最新价。</li>
      <li>本站图表和案例用来理解概念，历史情况不能代表未来结果，也不代表按图交易会赚钱。</li>
    </ul>
  </section>
</template>
