import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly client = new S3Client({
    region: this.config.getOrThrow<string>('AWS_S3_REGION'),
    endpoint: this.config.get<string>('CUSTOM_S3_ENDPOINT'),
    credentials: {
      accessKeyId: this.config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
    },
  });

  private readonly bucketName;

  constructor(private readonly config: ConfigService) {
    this.bucketName = this.config.getOrThrow<string>('AWS_S3_BUCKET_NAME');
  }

  async upload(fileName: string, file: Buffer) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file,
      })
    );
  }

  async get(fileName: string) {
    try {
      const file = await this.client.send(
        new GetObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
        })
      );

      if (file.Body) {
        return file.Body.transformToByteArray();
      }
    } catch (err) {
      return null;
    }

    return null;
  }
}
