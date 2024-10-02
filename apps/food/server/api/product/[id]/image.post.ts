import { createId } from '@paralleldrive/cuid2'
import sharp from 'sharp'

const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp']
const IMAGE_SIZES = [120, 300, 600, 800]

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const files = await readMultipartFormData(event)
    const file = files?.[0]
    if (!files?.length || !file) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing file',
      })
    }

    const metadata = await sharp(file.data.buffer).metadata()

    if (!metadata?.format || !ACCEPTED_IMAGE_TYPES.includes(metadata?.format) || !metadata?.width || !metadata?.height) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type',
      })
    }

    if (metadata.width > 8000 || metadata.height > 8000) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Image has too big dimensions',
      })
    }

    if (metadata.width < 120 || metadata.height < 120) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Image has too small dimensions',
      })
    }

    const mediaId = createId()

    for (const size of IMAGE_SIZES) {
      await sharp(file.data.buffer)
        .resize({ width: size, height: size })
        .toFormat('jpg', { quality: 75 })
        .toBuffer()
        .then((data) => {
          useStorage('fileSystem').setItemRaw(`${mediaId}/${size}.jpg`, data)
        })

      await sharp(file.data.buffer)
        .resize({ width: size, height: size })
        .toFormat('webp', { quality: 75 })
        .toBuffer()
        .then((data) => {
          useStorage('fileSystem').setItemRaw(`${mediaId}/${size}.webp`, data)
        })
    }

    await prisma.media.create({
      data: {
        id: mediaId,
      },
    })

    await prisma.product.update({
      where: { id },
      data: {
        mediaId,
      },
    })

    return { ok: true }
  } catch (error) {
    throw errorResolver(error)
  }
})
