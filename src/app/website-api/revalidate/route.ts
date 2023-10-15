import { RevalidateAll } from "@/server/actions";

export async function GET() {
  await RevalidateAll();

  return Response.json({ revalidated: true, now: Date.now() });
}
