import { warehouseUpdateSchema } from '~~/server/core/services/warehouse'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = warehouseUpdateSchema.parse(body)

    const warehouse = await prisma.warehouse.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
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
