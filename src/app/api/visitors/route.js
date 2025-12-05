import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    // 1. Get current count
    const currentRes = await fetch(`${url}/rest/v1/visitor_counter?id=eq.1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });

    const rows = await currentRes.json();
    const currentCount = rows[0]?.count ?? 0;

    // 2. Increment count
    const newCount = currentCount + 1;

    await fetch(`${url}/rest/v1/visitor_counter?id=eq.1`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: newCount }),
    });

    return NextResponse.json({ visitors: newCount });
  } catch (err) {
    console.error("Visitor counter error:", err);
    return NextResponse.json({ visitors: 0 });
  }
}
