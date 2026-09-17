<script setup lang="ts">
import { COMBINATION_PATH_SLUGS, CONTRACT_PATH_SLUGS, MAIN_PATH_SLUGS, STAGE0_PATH_SLUGS, SYSTEM_PATH_SLUGS, WYCKOFF_PATH_SLUGS, nextReason, plannedLessonTitle } from '../../components/ui/courseMeta'
import type { LessonNeighbor } from '../../components/ui/courseMeta'

const { fetchLessons, resolvePublishedPath } = useCourse()

const { data: lessons } = await useAsyncData('course-lessons', () => fetchLessons())

const introduction = computed(() =>
  lessons.value?.find(item => item.slug === 'introduction') ?? null,
)

const { data: pathBundle } = await useAsyncData('course-paths', async () => {
  const published = await fetchLessons()
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
    stage0Path: await toSteps(STAGE0_PATH_SLUGS),
    mainPath: await toSteps(MAIN_PATH_SLUGS),
    contractPath: await toSteps(CONTRACT_PATH_SLUGS),
    combinationPath: await toSteps(COMBINATION_PATH_SLUGS),
    systemPath: await toSteps(SYSTEM_PATH_SLUGS),
    wyckoffPath: await toSteps(WYCKOFF_PATH_SLUGS),
  }
})

const stage0Path = computed(() => pathBundle.value?.stage0Path ?? [])
const mainPath = computed(() => pathBundle.value?.mainPath ?? [])
const contractPath = computed(() => pathBundle.value?.contractPath ?? [])
const combinationPath = computed(() => pathBundle.value?.combinationPath ?? [])
const systemPath = computed(() => pathBundle.value?.systemPath ?? [])
const wyckoffPath = computed(() => pathBundle.value?.wyckoffPath ?? [])

const screenStep = computed(() =>
  stage0Path.value.find(step => step.slug === 'perp-screen') ?? null,
)

const startPath = computed(() =>
  screenStep.value?.path
    ?? mainPath.value.find(step => step.path)?.path
    ?? '/indicators',
)

const startLabel = computed(() =>
  screenStep.value?.path ? '从交易所屏幕开始' : '从 K 线开始',
)

useSeoMeta({
  title: '怎么学',
  description: '先认识本站边界、风险和交易所屏幕，再按主路径从 K 线读到布林带（含摆动结构和 ATR），然后进入合约数据层、指标组合七步、交易系统二十步，最后进入威科夫与量价。未发布的课只标编写中。',
})
</script>

<template>
  <section class="page page--narrow stack">
    <header>
      <p><UiStageBadge :part="0" /></p>
      <h1>怎么学</h1>
      <p class="lede">
        第一次来：先读下面的导学，再看交易所屏幕，然后从 K 线开始。不要在一长串标题里随便点。
      </p>
      <UiCourseJump />
    </header>

    <LessonContent
      v-if="introduction"
      :lesson="introduction"
      :show-header="false"
    />

    <UiRiskCallout id="risk" />

    <section class="path-band" aria-labelledby="map-heading">
      <h2 id="map-heading">四阶段地图</h2>
      <p class="lede">
        阶段 2 用来对照多个指标，不构成交易信号。阶段 3 把观察写成可检查的规则。阶段 4 用威科夫四阶段和量价读永续图。案例是教学作业纸，不是跟单策略。
      </p>
      <UiStageMap />
    </section>

    <section class="path-band" aria-labelledby="stage0-heading">
      <h2 id="stage0-heading">阶段 0 导学</h2>
      <p class="lede">
        阶段 0 两步：怎么学这门课 → 交易所屏幕上有什么。先认路和屏幕字段，再进入 K 线。已发布的可以点进去；未发布只标编写中，不会链到空地址。
      </p>
      <UiPathSteps
        :steps="stage0Path"
        label="导学"
      />
      <p class="btn-row">
        <UiButtonLink :to="startPath">
          {{ startLabel }}
        </UiButtonLink>
        <UiButtonLink to="/indicators" variant="ghost">
          浏览全部指标
        </UiButtonLink>
      </p>
    </section>

    <section class="path-band" aria-labelledby="path-heading">
      <h2 id="path-heading">推荐主路径</h2>
      <p class="lede">
        主路径九篇：K 线 → 趋势线与支撑阻力 → 摆动结构与假突破 → MA → EMA → RSI → 成交量 → ATR → 布林带。MACD 是主路径续；KDJ 是对照层，不在这九步里。已发布的可以点进去；未发布只标编写中，不会链到空地址。
      </p>
      <UiPathSteps :steps="mainPath" />
    </section>

    <section class="path-band" aria-labelledby="contract-path-heading">
      <h2 id="contract-path-heading">合约数据层</h2>
      <p class="lede">
        主路径里先有成交量，再进入合约特有的五步：仓（持仓量）→ 费率（资金费率）→ 结构（多空比）→ 主动净额（累计成交量差）→ 清算瀑布。已发布的可以点进去；未发布只标编写中，不会链到空地址。
      </p>
      <UiPathSteps
        :steps="contractPath"
        label="合约数据层"
      />
    </section>

    <section class="path-band" aria-labelledby="combination-path-heading">
      <h2 id="combination-path-heading">指标组合</h2>
      <p class="lede">
        阶段 2 七步：趋势 + 动量 → 趋势 + 成交量 → RSI + MACD → 价格 + 持仓量 → 持仓量 + 成交量 → 资金费率 + 持仓量 → 多指标共振。组合用来对照，不构成交易信号。已发布的可以点进去；未发布只标编写中，不会链到空地址。
      </p>
      <UiPathSteps
        :steps="combinationPath"
        label="指标组合"
      />
    </section>

    <section class="path-band" aria-labelledby="system-path-heading">
      <h2 id="system-path-heading">交易系统</h2>
      <p class="lede">
        阶段 3 二十步：什么是交易系统 → 市场环境 → 多周期 → 方向判断 → 订单与成交 → 入场规则 → 出场规则 → 止损 → 止盈 → 仓位管理 → 成本对照 R → 风险管理 → 账户热度与相关 → 交易频率 → 执行偏差 → 交易日志 → 回测 → 数据统计 → 系统优化 → 完整交易系统案例。把观察写成可检查的规则，不是跟单策略。案例是教学作业纸。已发布的可以点进去；未发布只标编写中，不会链到空地址。不必一天读完。
      </p>
      <UiPathSteps
        :steps="systemPath"
        label="交易系统"
        compact
      />
    </section>

    <section class="path-band" aria-labelledby="wyckoff-path-heading">
      <h2 id="wyckoff-path-heading">威科夫与量价</h2>
      <p class="lede">
        阶段 4 十三步：威科夫怎么用在永续 → 吸筹与 Spring → 拉升 → 派发 → 下跌 → 事件变形 → 努力与结果 → 多周期怎么对阶段 → 完整读图流程 → 永续特有过滤器 → 综合案例 → 把阶段写成系统 → 检查清单。建议先读完阶段 1 的看图课和阶段 3 的多周期、仓位、订单。形态是观察工具，不是买卖指令。
      </p>
      <UiPathSteps
        :steps="wyckoffPath"
        label="威科夫与量价"
        compact
      />
    </section>
  </section>
</template>
