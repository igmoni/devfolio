"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { formatDuration, parseWakaTime } from "@/lib/wakatimeStats";

const STORAGE_KEY = "wakatime-cache";

export default function WakaTimeText() {
  const [data, setData] = useState(null);
  const [displaySeconds, setDisplaySeconds] = useState(0);

  const baseSecondsRef = useRef(0);
  const baseTimeRef = useRef(0);
  const tickRef = useRef(null);

  // 🔹 Load cached data immediately
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed);

      if (parsed.status === "online") {
        baseSecondsRef.current = parsed.totalSeconds;
        baseTimeRef.current = Date.now();
        setDisplaySeconds(parsed.totalSeconds);
      }
    }
  }, []);

  // 🔹 Fetch API data (every 2 min)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/wakatime");
      const json = await res.json();
      const parsed = parseWakaTime(json);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      setData(parsed);

      if (parsed.status === "online") {
        baseSecondsRef.current = parsed.totalSeconds;
        baseTimeRef.current = Date.now();
        setDisplaySeconds(parsed.totalSeconds);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 ONE ticking interval only
  useEffect(() => {
    if (!data || data.status !== "online") return;

    clearInterval(tickRef.current);

    tickRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - baseTimeRef.current) / 1000);
      setDisplaySeconds(baseSecondsRef.current + elapsed);
    }, 1000);

    return () => clearInterval(tickRef.current);
  }, [data?.status]);

  if (!data) return null;

  // 🟢 ONLINE
  if (data.status === "online") {
    return (
      <div className="text-primary space-y-1 text-sm dark:text-white">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Currently coding in</span>

          <div className="bg-muted-foreground/10 rounded-full">
            <Image
              src="/assets/cursor.png"
              alt="Cursor"
              width={20}
              height={20}
              className="inline-block rounded-full"
            />
          </div>

          <span className="font-medium">{data.editor}</span>
          <span>for</span>

          <span className="font-medium">{formatDuration(displaySeconds)}</span>
        </div>

        {/* LINE 2 */}
        {data.project && data.file ? (
          <div className="text-muted-foreground text-sm">
            Working on{" "}
            <span className="text-primary font-medium dark:text-white">
              {data.project}
              <span className="font-normal"> & editing file:</span> {data.file}
            </span>
          </div>
        ) : (
          <div className="text-primary text-sm dark:text-white">
            Thinking &amp; coding. &nbsp; &amp; editing file{" "}
            <span className="text-accent font-medium">Coding</span>
          </div>
        )}
      </div>
    );
  }

  // 🔴 OFFLINE
  return (
    <span className="text-sm text-neutral-500 dark:text-neutral-400">
      <span className="text-primary flex gap-1 font-semibold dark:text-white">
        Offline in{" "}
        <Image
          src="/assets/cursor.png"
          alt="Cursor"
          width={18}
          height={18}
          className="rounded-full"
        />
        Cursor
      </span>{" "}
      Yesterday worked{" "}
      <span className="text-primary font-semibold dark:text-white">
        {" "}
        {data.yesterdayTime}
      </span>
    </span>
  );
}
