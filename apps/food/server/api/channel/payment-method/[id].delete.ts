export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    await prisma.paymentMethod.delete({ where: { id } })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
