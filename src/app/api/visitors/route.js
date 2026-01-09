import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import crypto from "crypto";

const redis = Redis.fromEnv();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path") || "/";

    // Read cookie
    let visitorId = req.cookies.get("visitor_id")?.value;
    let isNewVisitor = false;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      isNewVisitor = true;
    }

    const visitorKey = `visitor:${path}:${visitorId}`;
    const countKey = `visits:${path}`;

    let visitors;

    const alreadyVisited = await redis.get(visitorKey);

    if (!alreadyVisited) {
      await redis.set(visitorKey, 1);
      visitors = await redis.incr(countKey);
    } else {
      visitors = (await redis.get(countKey)) ?? 0;
    }

    const res = NextResponse.json({ visitors });

    // Set cookie ONLY if new
    if (isNewVisitor) {
      res.cookies.set("visitor_id", visitorId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return res;
  } catch (err) {
    return NextResponse.json({ visitors: 0 }, { status: 500 });
  }
}
