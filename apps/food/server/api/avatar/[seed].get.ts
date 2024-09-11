import { openPeeps } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { chooseClothingColor, choosePartsByGender, clearSvg, generateHSL, getPossibleAccessories, getPossibleFaces, getPossibleSkinColors } from '~~/server/utils/avatar'

export default defineCachedEventHandler(async (event) => {
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

  // Dynamic Background
  const [backgroundColor1, backgroundColor2] = generateHSL()

  const gradient = `
    <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="${backgroundColor1}" />
      <stop offset="1" stop-color="${backgroundColor2}"/>
    </linearGradient>
    <rect xmlns="http://www.w3.org/2000/svg" fill="url(#linear-gradient)" width="704" height="704" x="0" y="0"/>`

  const svgWithBackground = svg.replace(/<g transform/, `${gradient} $&`)

  return clearSvg(svgWithBackground)
}, {
  maxAge: 60 * 60 * 24 * 30,
})
