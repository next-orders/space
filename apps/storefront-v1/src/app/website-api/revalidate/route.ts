import { revalidateTag } from 'next/cache';

export const revalidate = 0;

export async function GET() {
  revalidateTag('all');

  return Response.json({ revalidated: true, now: Date.now() });
}
