<script setup lang="ts">
import { CONTRACT_PATH_SLUGS, MAIN_PATH_SLUGS, nextReason, plannedLessonTitle } from '../components/ui/courseMeta'
import type { LessonNeighbor } from '../components/ui/courseMeta'

const { fetchLessons, resolvePublishedPath } = useCourse()

const { data: lessons } = await useAsyncData('course-lessons', () => fetchLessons())

const introduction = computed(() =>
  lessons.value?.find(item => item.category === 'introduction') ?? null,
)

const { data: pathBundle } = await useAsyncData('course-paths', async () => {
  const published = await fetchLessons({ category: 'indicators' })
  const titleBySlug = new Map(published.map(item => [item.slug, item.title]))

  async function toSteps(slugs: readonly string[]): Promise<LessonNeighbor[]> {
    const steps: LessonNeighbor[] = []
    for (const slug of slugs) {
      const path = await resolvePublishedPath(slug)
      steps.push({
        slug,
        title: titleBySlug.get(slug) ?? plannedLessonTitle(slug),
        path,
        reason: nextReason(slug),
      })
    }
    return steps
  }

  return {
    mainPath: await toSteps(MAIN_PATH_SLUGS),
    contractPath: await toSteps(CONTRACT_PATH_SLUGS),
  }
})

const mainPath = computed(() => pathBundle.value?.mainPath ?? [])
const contractPath = computed(() => pathBundle.value?.contractPath ?? [])

const startPath = computed(() =>
  mainPath.value.find(step => step.path)?.path ?? '/indicators',
)

useSeoMeta({
  title: '怎么学',
  description: '先认识本站边界和风险，再按主路径从 K 线读到布林带，然后进入合约数据层。未发布的课只标编写中。',
})
</script>

<template>
  <section class="page page--narrow stack">
    <header>
      <p><UiStageBadge :part="0" /></p>
      <h1>怎么学</h1>
      <p class="lede">
        第一次来：先读下面的导学，再从 K 线开始。不要在一长串标题里随便点。
      </p>
    </header>

    <LessonContent
      v-if="introduction"
      :lesson="introduction"
      :show-header="false"
    />

    <UiRiskCallout id="risk" />

    <section aria-labelledby="map-heading">
      <h2 id="map-heading">三阶段地图</h2>
      <p class="lede">
        阶段 2、阶段 3 的正文还没写。目录可以打开，空页会把你带回已开放的课。
      </p>
      <UiStageMap />
    </section>

    <section aria-labelledby="path-heading">
      <h2 id="path-heading">推荐主路径</h2>
      <p class="lede">
        主路径八篇：K 线 → MA → EMA → RSI → 成交量 → MACD → KDJ → 布林带。已发布的可以点进去；未发布只标编写中，不会链到空地址。
      </p>
      <UiPathSteps :steps="mainPath" />
      <p class="btn-row">
        <UiButtonLink :to="startPath">
          从 K 线开始
        </UiButtonLink>
        <UiButtonLink to="/indicators" variant="ghost">
          浏览全部指标
        </UiButtonLink>
      </p>
    </section>

    <section aria-labelledby="contract-path-heading">
      <h2 id="contract-path-heading">合约数据层</h2>
      <p class="lede">
        主路径里先有成交量，再进入合约特有的四步：仓（持仓量）→ 费率（资金费率）→ 结构（多空比）→ 主动净额（累计成交量差）。已发布的可以点进去；未发布只标编写中，不会链到空地址。
      </p>
      <UiPathSteps
        :steps="contractPath"
        label="合约数据层"
      />
    </section>
  </section>
</template>
