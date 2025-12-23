import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.WAKATIME_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing WAKATIME_API_KEY" },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${apiKey}:`).toString("base64");
    const headers = {
      Authorization: `Basic ${auth}`,
    };

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    const [todaySummary, heartbeats, yesterdaySummary] = await Promise.all([
      fetch(
        `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`,
        { headers }
      ).then((r) => r.json()),
      fetch(
        `https://wakatime.com/api/v1/users/current/heartbeats?date=${today}`,
        { headers }
      ).then((r) => r.json()),
      fetch(
        `https://wakatime.com/api/v1/users/current/summaries?start=${yesterday}&end=${yesterday}`,
        { headers }
      ).then((r) => r.json()),
    ]);

    return NextResponse.json({
      todaySummary,
      heartbeats,
      yesterdaySummary,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch WakaTime" },
      { status: 500 }
    );
  }
}
