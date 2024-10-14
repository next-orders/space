import { createId } from '@paralleldrive/cuid2'
import { addressCreateSchema } from '~~/server/core/services/checkout'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = addressCreateSchema.parse(body)

    const address = await prisma.address.create({
      data: {
        id: createId(),
        street: data.street,
        flat: data.flat,
        doorphone: data.doorphone,
        entrance: data.entrance,
        floor: data.floor,
        note: data.note,
      },
    })

    return {
      ok: true,
      result: address,
    }
  } catch (error) {
    throw errorResolver(error)
  }
})
