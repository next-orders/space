import { createZodDto } from 'nestjs-zod';
import { UploadMediaRequestSchema } from '@next-orders/api-sdk';

export class UploadMediaDto extends createZodDto(UploadMediaRequestSchema) {}
