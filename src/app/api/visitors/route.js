export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pathname = searchParams.get("path") || "/";

    const res = await fetch(
      `https://igmoni.goatcounter.com/counter?p=${encodeURIComponent(pathname)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json({ visitors: 0 });
    }

    const data = await res.json();
    return Response.json({ visitors: data.count || 0 });
  } catch {
    return Response.json({ visitors: 0 });
  }
}
