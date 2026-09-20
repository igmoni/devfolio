import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
    //   "https://github-contributions-api.deno.dev/igmoni.json",
    "https://github-contributions.vercel.app/api/v1/igmoni",
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub contributions proxy error:", error);

    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}