<script setup lang="ts">
import type { ChartPayload, DrawMode } from '../../types/chart'
import {
  formatChartPeriod,
  isRealChartId,
  REAL_CHART_SNAPSHOTS,
} from '../../types/chart'
import { mountTeachingChart, type TeachingChartHandle } from './mountTeachingChart'

const props = defineProps<{
  id: string
}>()

const validId = computed(() => isRealChartId(props.id) ? props.id : null)
const snapshot = computed(() => validId.value ? REAL_CHART_SNAPSHOTS[validId.value] : '')

const { data, error, pending } = await useAsyncData(
  () => `teaching-chart-${props.id}`,
  async () => {
    if (!validId.value) {
      return null
    }
    return await $fetch<ChartPayload>(`/api/charts/${validId.value}`)
  },
  { watch: [validId] },
)

const host = ref<HTMLElement | null>(null)
const readout = ref('悬停看读数 · 滚轮缩放 · 拖动平移。冻结历史窗，不是直播行情。')
const handle = ref<TeachingChartHandle | null>(null)
const drawMode = ref<DrawMode>('idle')
const teachingVisible = ref(true)
let observer: ResizeObserver | null = null

const canDraw = computed(() => Boolean(data.value?.drawTools))

function setDrawMode(mode: DrawMode) {
  drawMode.value = drawMode.value === mode ? 'idle' : mode
  handle.value?.setDrawMode(drawMode.value)
}

function clearPractice() {
  handle.value?.clearPractice()
}

function toggleTeaching() {
  teachingVisible.value = !teachingVisible.value
  handle.value?.setTeachingVisible(teachingVisible.value)
}

function teardown() {
  handle.value?.destroy()
  handle.value = null
}

function setup() {
  if (!import.meta.client || !host.value || !data.value) {
    return
  }
  teardown()
  handle.value = mountTeachingChart(host.value, data.value, (text) => {
    readout.value = text
  })
  handle.value.setDrawMode(drawMode.value)
  handle.value.setTeachingVisible(teachingVisible.value)
}

watch([host, data], () => {
  setup()
}, { flush: 'post' })

onMounted(setup)

onBeforeUnmount(() => {
  observer?.disconnect()
  teardown()
})

watch(host, (element) => {
  observer?.disconnect()
  observer = null
  if (!element || typeof ResizeObserver === 'undefined') {
    return
  }
  observer = new ResizeObserver((entries) => {
    const width = entries[0]?.contentRect.width
    if (width) {
      handle.value?.resize(width)
    }
  })
  observer.observe(element)
})

const periodText = computed(() => data.value ? formatChartPeriod(data.value.period) : '')
const altText = computed(() => {
  if (!data.value) {
    return '真实行情教学窗静态快照'
  }
  return `${data.value.title}。${data.value.symbol} · ${data.value.timeframe} · ${data.value.source} · ${periodText.value}。${data.value.teachingQuestion}`
})
</script>

<template>
  <p v-if="!validId" class="teaching-chart__error">
    未知教学窗。
  </p>
  <figure
    v-else-if="error"
    class="teaching-chart"
    :data-chart-id="id"
  >
    <p class="teaching-chart__error">
      交互窗暂时读不到数据。下面先显示冻结快照。
    </p>
    <img
      v-if="snapshot"
      class="teaching-chart__fallback"
      :src="snapshot"
      alt="真实行情教学窗静态快照"
    >
  </figure>
  <figure
    v-else
    class="teaching-chart"
    :data-chart-id="id"
  >
    <figcaption class="teaching-chart__head">
      <div class="teaching-chart__title-row">
        <strong>{{ data?.title ?? '真实行情教学窗' }}</strong>
        <span class="teaching-chart__badge">真实行情</span>
      </div>
      <p v-if="data" class="teaching-chart__meta">
        {{ data.symbol }} · {{ data.timeframe }} · {{ data.source }} · {{ periodText }}
      </p>
    </figcaption>

    <p class="teaching-chart__readout" aria-live="polite">
      {{ pending && !data ? '正在载入冻结窗口…' : readout }}
    </p>

    <ClientOnly>
      <div
        ref="host"
        class="teaching-chart__canvas"
        role="img"
        :aria-label="altText"
      />
      <template #fallback>
        <img
          v-if="snapshot"
          class="teaching-chart__fallback"
          :src="snapshot"
          :alt="altText"
        >
      </template>
    </ClientOnly>

    <div v-if="canDraw" class="teaching-chart__tools">
      <p class="teaching-chart__tools-hint">
        练习划线：点一下画水平位，点两点画趋势线。清除只去掉你画的线。这是读图练习，不是交易终端。
      </p>
      <div class="teaching-chart__tool-row">
        <button
          type="button"
          class="teaching-chart__tool"
          :aria-pressed="drawMode === 'level'"
          @click="setDrawMode('level')"
        >
          练习：水平位
        </button>
        <button
          type="button"
          class="teaching-chart__tool"
          :aria-pressed="drawMode === 'trendline'"
          @click="setDrawMode('trendline')"
        >
          练习：趋势线
        </button>
        <button
          type="button"
          class="teaching-chart__tool"
          @click="clearPractice"
        >
          清除我的练习线
        </button>
        <button
          type="button"
          class="teaching-chart__tool"
          :aria-pressed="teachingVisible"
          @click="toggleTeaching"
        >
          {{ teachingVisible ? '隐藏教学线' : '显示教学线' }}
        </button>
      </div>
    </div>

    <p v-if="data" class="teaching-chart__question">
      {{ data.teachingQuestion }}
    </p>
    <p v-if="data" class="teaching-chart__foot">
      真实行情 · {{ data.symbol }} · {{ data.timeframe }} · {{ data.source }} · {{ periodText }} · 不构成交易建议
    </p>
    <p v-if="data?.volumeUnit || data?.oiUnit || data?.fundingUnit" class="teaching-chart__units">
      <span v-if="data.volumeUnit">成交量：{{ data.volumeUnit }}</span>
      <span v-if="data.oiUnit">持仓量：{{ data.oiUnit }}</span>
      <span v-if="data.fundingUnit">费率：{{ data.fundingUnit }}</span>
    </p>
  </figure>
</template>
