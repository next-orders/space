import { z } from 'zod';
import { Media } from '../types/objects';

export const UploadMediaRequestSchema = z.object({
  alt: z.string(),
  file: z.any(),
});

export type UploadMediaRequest = z.infer<typeof UploadMediaRequestSchema>;
export type UploadMediaResponse = {
  ok: boolean;
  result: Media;
};
