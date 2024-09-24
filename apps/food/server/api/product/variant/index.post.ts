import { createId } from '@paralleldrive/cuid2'
import { productVariantCreateSchema } from '~~/server/core/services/product'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = productVariantCreateSchema.parse(body)

    const variant = await prisma.productVariant.create({
      data: {
        id: createId(),
        productId: data.productId,
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
