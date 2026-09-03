import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ChartPayload } from '../../../types/chart'
import { isRealChartId } from '../../../types/chart'

export default defineEventHandler(async (event): Promise<ChartPayload> => {
  const id = getRouterParam(event, 'id')
  if (!id || !isRealChartId(id)) {
    throw createError({ statusCode: 404, statusMessage: '未知教学窗' })
  }

  const path = join(process.cwd(), 'public/data/charts', `${id}.json`)
  try {
    return JSON.parse(await readFile(path, 'utf8')) as ChartPayload
  }
  catch {
    throw createError({ statusCode: 404, statusMessage: '教学窗数据不存在' })
  }
})
