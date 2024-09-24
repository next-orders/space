import { productVariantUpdateSchema } from '~~/server/core/services/product'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const data = productVariantUpdateSchema.parse(body)

    const variant = await prisma.productVariant.update({
      where: { id },
      data: {
        name: data.name,
        weightValue: data.weightValue,
        weightUnit: data.weightUnit,
        gross: data.gross,
        net: data.net,
        calories: data.calories,
        fat: data.fat,
        protein: data.protein,
        carbohydrate: data.carbohydrate,
      },
    })

    return {
      ok: true,
      result: variant,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
