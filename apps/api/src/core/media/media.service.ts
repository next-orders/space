import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createId } from '@paralleldrive/cuid2';
import sharp from 'sharp';
import type { Media } from '@next-orders/api-sdk';
import { PrismaService } from '../../db/prisma.service';
import { S3Service } from '../../s3/s3.service';
import { UploadMediaDto } from './dto/upload-media.dto';
import { File } from './media.types';

@Injectable()
export class MediaService {
  private readonly apiUrl: string;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
  ) {
    this.apiUrl = this.config.getOrThrow<string>('API_URL');
  }

  async findAllMedia(): Promise<Media[] | null> {
    return this.prisma.media.findMany();
  }

  async getMediaFileFromBucket(fileName: string) {
    const file = await this.s3.get(fileName);
    if (!file) {
      return null;
    }

    return file;
  }

  async uploadMedia(file: File, dto: UploadMediaDto) {
    const isPossibleExtension = this.checkIfPossibleFileExtension(
      file?.mimetype,
    );

    if (!isPossibleExtension) {
      return new Error('File extension is not correct');
    }
    if (!file?.originalname) {
      return new Error('File name is not defined');
    }
    if (!file?.buffer) {
      return new Error('File buffer is not defined');
    }

    // Resize Image
    const resized = await this.resizeImage(file.buffer, 1800);
    if (!resized) {
      return new Error('Problem with file resize');
    }

    const id = createId();
    const fileName = id + '.jpg';
    const url = `${this.apiUrl}/media/static/${fileName}`;

    await this.s3.upload(fileName, resized);

    // Save to DB
    const newMedia = await this.prisma.media.create({
      data: {
        id,
        url,
        alt: dto.alt,
      },
    });

    return {
      ok: true,
      result: newMedia,
    };
  }

  checkIfPossibleFileExtension(mimetype: string): boolean {
    switch (mimetype) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
      case 'image/webp':
      case 'image/avif':
        return true;
      default:
        return false;
    }
  }

  async resizeImage(image: Buffer, maxWidth: number): Promise<Buffer | null> {
    const { format, width = 0 } = await sharp(image).metadata();
    if (!format) {
      return null;
    }

    if (width < maxWidth) maxWidth = width;

    return sharp(image)
      .resize({
        width: maxWidth,
      })
      .flatten({ background: '#fff' })
      .jpeg({
        quality: 90,
        mozjpeg: true,
      })
      .toBuffer();
  }
}
