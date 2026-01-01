"use client";

import { useEffect, useRef, useState } from "react";
import { parseWakaTime, formatDuration } from "@/lib/wakatimeStats";
import Image from "next/image";

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
      <div className="text-sm text-primary dark:text-white space-y-1">
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

  <span className="font-medium">
    {formatDuration(displaySeconds)}
  </span>
</div>


        {/* LINE 2 */}
        {data.project && data.file ? (
          <div className=" text-muted-foreground  text-sm">
            Working on{" "}
            <span className="font-medium text-primary dark:text-white">
              {data.project}<span className="font-normal"> & editing file:</span> {data.file}
            </span>
          </div>
        ) : (
          <div className="text-primary dark:text-white text-sm">
            Thinking &amp; coding. &nbsp; &amp; editing file{" "}
            <span className="font-medium text-accent">Coding</span>
          </div>
        )}
      </div>
    );
  }

  // 🔴 OFFLINE
  return (
    <span className="text-sm text-neutral-500 dark:text-neutral-400">
      Yesterday worked {data.yesterdayTime}
    </span>
  );
}
