import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { MediaService } from '@/core/media/media.service';
import { Permissions, Public } from '@/core/auth/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadMediaDto } from '@/core/media/dto/upload-media.dto';
import { UploadMediaResponse } from '@next-orders/api-sdk';
import { File } from '@/core/media/media.types';

@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Permissions(['READ_MEDIA'])
  @Get('list')
  async findAllMedia() {
    const media = await this.service.findAllMedia();
    if (!media) {
      throw new HttpException('You have no Media', HttpStatus.NOT_FOUND);
    }

    return media;
  }

  @Permissions(['EDIT_MEDIA'])
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: File,
    @Body()
    dto: UploadMediaDto,
  ): Promise<UploadMediaResponse> {
    const uploaded = await this.service.uploadMedia(file, dto);
    if (uploaded instanceof Error) {
      throw new BadRequestException(uploaded?.message);
    }

    return uploaded;
  }

  @Public()
  @Get('static/:fileName')
  async getMediaFileFromBucket(
    @Param('fileName') fileName: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.service.getMediaFileFromBucket(fileName);
    if (!file) {
      throw new NotFoundException();
    }

    res.contentType('image/jpg');

    return new StreamableFile(file);
  }
}
