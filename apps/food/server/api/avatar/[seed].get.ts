import { openPeeps } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { addBackground, chooseClothingColor, choosePartsByGender, getPossibleAccessories, getPossibleFaces, getPossibleSkinColors } from '~~/server/core/services/avatar'

export default defineCachedEventHandler(async (event) => {
  try {
    const seed = getRouterParam(event, 'seed')
    const query = getQuery(event)

    setHeader(event, 'Content-Type', 'image/svg+xml')

    const gender = query.gender?.toString() ?? ''
    const clothing = query.clothing?.toString() ?? ''
    const sizeNumber = query.size ? Number(query.size) : 150
    const emotionNumber = query.emotion ? Number(query.emotion) : null

    const options: Partial<Options> = {
      seed,
      size: sizeNumber,
      scale: 80,
      translateX: -5,
      accessoriesProbability: 20,
      maskProbability: 0,
      face: getPossibleFaces(emotionNumber),
      accessories: getPossibleAccessories(),
      skinColor: getPossibleSkinColors(),
      clothingColor: chooseClothingColor(clothing),
      ...choosePartsByGender(gender),
    }

    const svg = createAvatar(openPeeps, options).toString()

    return addBackground(svg)
  } catch (error) {
    throw errorResolver(error)
  }
}, {
  maxAge: 60 * 60 * 24 * 30,
})
