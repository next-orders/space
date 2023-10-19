export async function GET() {
  const currentVersion = {
    website: "0.1.0",
  };

  return Response.json({ ok: true, version: currentVersion });
}
