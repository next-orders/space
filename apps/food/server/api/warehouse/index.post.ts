import { createId } from '@paralleldrive/cuid2'
import { warehouseCreateSchema } from '~~/server/core/services/warehouse'

export default defineEventHandler(async (event) => {
  try {
    const { channelId } = useRuntimeConfig()
    const body = await readBody(event)

    const data = warehouseCreateSchema.parse(body)

    const warehouse = await prisma.warehouse.create({
      data: {
        id: createId(),
        name: data.name,
        address: data.address,
        channelId,
      },
    })

    return {
      ok: true,
      result: warehouse,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
