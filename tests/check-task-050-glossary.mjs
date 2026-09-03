import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { extractHeadings, headingSlug, shortTermLabel } from '../components/ui/lessonHeadings.ts'
import { getLessonPath } from '../composables/useCourse.ts'

const root = join(import.meta.dirname, '..')
let failed = 0

function fail(message) {
  failed += 1
  console.error(`FAIL ${message}`)
}

function ok(message) {
  console.log(`ok  ${message}`)
}

if (getLessonPath('glossary', 'margin-leverage') !== '/glossary#margin-leverage') {
  fail(`glossary 路径不对：${getLessonPath('glossary', 'margin-leverage')}`)
}
else {
  ok('glossary 路径带分组锚点')
}

const headings = extractHeadings({
  type: 'root',
  children: [
    { type: 'heading', depth: 1, children: [{ type: 'text', value: '市场与合约' }] },
    { type: 'heading', depth: 3, props: { id: '现货spot' }, children: [{ type: 'text', value: '现货（Spot）' }] },
    { type: 'heading', depth: 3, children: [{ type: 'text', value: '强平（Liquidation）' }] },
    { type: 'heading', depth: 2, children: [{ type: 'text', value: '不应出现' }] },
  ],
}, { depth: 3 })

if (headings.map(item => item.id).join(',') !== '现货spot,强平liquidation') {
  fail(`h3 抽出不对：${JSON.stringify(headings)}`)
}
else {
  ok('只抽出 h3，并生成词条锚点')
}

if (shortTermLabel('保证金（Margin）') !== '保证金' || headingSlug('现货（Spot）') !== '现货spot') {
  fail('词条短名或 slug 不对')
}
else {
  ok('词条短名与 slug 可用')
}

const page = await readFile(join(root, 'pages/glossary.vue'), 'utf8')
const jump = await readFile(join(root, 'components/ui/GlossaryJump.vue'), 'utf8')

if (page.includes('<LessonList') || !page.includes('glossary-group') || !page.includes('UiGlossaryJump')) {
  fail('术语页仍用课卡列表，或缺少分组结构')
}
else {
  ok('术语页用分组跳转，不再列课卡')
}

if (!jump.includes('#${group.slug}') && !jump.includes('`#${group.slug}`')) {
  fail('分组跳转未指向 slug 锚点')
}
else {
  ok('分组跳转指向 slug 锚点')
}

if (failed) {
  console.error(`\n${failed} failed`)
  process.exit(1)
}

console.log('\nTASK-050 glossary checks passed')
