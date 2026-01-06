"use client";

import { useEffect, useState } from "react";
import {
  parseWakaTime,
  formatWithSeconds,
  formatDuration,
} from "@/lib/wakatimeStats";
import Image from "next/image";

export default function WakaTimeCard() {
  const [data, setData] = useState(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/wakatime");
      const json = await res.json();
      const parsed = parseWakaTime(json);
      setData(parsed);
      if (parsed.status === "online") {
        setSeconds(parsed.totalSeconds);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data || data.status !== "online") return;

    const t = setInterval(() => {
      setSeconds((s) => Math.floor(s + 1));
    }, 1000);

    return () => clearInterval(t);
  }, [data?.status]);

  return (
    <div className="relative group inline-block">
      {/* STATUS CIRCLE */}

      <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center bg-white dark:bg-neutral-900">
        {data?.status === "online" ? (
          <img src="/assets/cursor.png" alt="Cursor" className="w-6 h-6" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        )}
      </div>

      {/* HOVER CARD */}
      {/* HOVER TOOLTIP */}
      <div
        className="
    absolute left-12 top-1/2 -translate-y-1/4
    min-w-[390px] max-w-[420px] min-h-[68px]
    opacity-0 scale-95 pointer-events-none
    group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
    transition-all duration-150 ease-out
    rounded-md
    border border-neutral-200 dark:border-neutral-800
    bg-white dark:bg-neutral-900
    shadow-acternity dark:shadow-acternity-white
    px-3 py-2
    z-50
    
  "
      >
        {!data ? (
          <p className="text-md text-neutral-500">Loading…</p>
        ) : data.status === "online" ? (
          <div className="text-sm text-primary dark:text-white space-y-1">
            <p className="flex items-center gap-1">
              <Image
                src="/assets/cursor.png"
                alt="Cursor"
                width={18}
                height={18}
                className="rounded-full"
              />
              Currently coding in{" "}
              <span className="font-medium">{data.editor}</span> for{" "}
              <span className="font-semibold">{formatDuration(seconds)}</span>
            </p>

            {data.project && data.file ? (
              <p className="text-primary dark:text-neutral-400 text-sm">
                Working on{" "}
                <span className="font-semibold dark:text-white">
                  {data.project} <span className="font-normal"> & editing file: </span> {data.file.length < 15 ? data.file : "Coding" }
                </span>
              </p>
            ) : (
              <p className="text-primary dark:text-white text-sm">
                Thinking &amp; coding · editing file{" "}
                <span className="font-medium">Coding</span>
              </p>
            )}
          </div>
        ) : (
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <p>Offline</p>
            {data.yesterdayTime && (
              <p>
                Yesterday worked{" "}
                <span className="text-primary dark:text-white font-medium">
                  {data.yesterdayTime}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
