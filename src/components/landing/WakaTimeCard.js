"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { formatDuration, parseWakaTime } from "@/lib/wakatimeStats";

export default function WakaTimeCard() {
  const [data, setData] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // fetch wakatime
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/wakatime");
      const json = await res.json();
      const parsed = parseWakaTime(json);
      setData(parsed);
      setSeconds(parsed.status === "online" ? parsed.totalSeconds : 0);
    };

    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  // live timer
  useEffect(() => {
    if (!data || data.status !== "online") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [data?.status]);

  // click outside to close (mobile)
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="group shadow-acternity dark:shadow-acternity-white relative inline-block rounded-full"
    >
      {/* STATUS CIRCLE */}
      <button
        type="button"
        onClick={() => isMobile && setIsOpen((o) => !o)}
        className="dark:bg-muted flex size-7 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200 dark:border-neutral-700"
      >
        {data?.status === "online" ? (
          <img src="/assets/cursor.png" alt="Cursor" className="h-6 w-6" />
        ) : (
          <div className="size-3 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        )}
      </button>

      {/* CARD */}
      <div
        className={`shadow-acternity dark:shadow-acternity-white absolute top-13 -left-56 z-50 mx-auto min-w-[390px] rounded-md border border-neutral-200 bg-white px-3 py-2 transition-all duration-150 ease-out md:top-1/2 md:left-10 md:-translate-y-1/4 dark:border-neutral-800 dark:bg-neutral-900 ${
          isMobile
            ? isOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
            : "pointer-events-none scale-95 opacity-0 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
        } `}
      >
        {!data ? (
          <p className="text-md text-neutral-500">Loading…</p>
        ) : data.status === "online" ? (
          <div className="text-primary space-y-1 text-sm dark:text-white">
            <p className="flex items-center gap-1">
              <Image
                src="/assets/cursor.png"
                alt="Cursor"
                width={18}
                height={18}
              />
              Currently coding in
              <span className="font-medium">{data.editor}</span>
              for
              <span className="font-semibold">{formatDuration(seconds)}</span>
            </p>

            {data.project && data.file ? (
              <p className="text-sm font-medium text-neutral-500">
                Working on{" "}
                <span className="text-primary font-semibold dark:text-white">
                  {data.project} — {data.file}
                </span>
              </p>
            ) : (
              <p className="text-sm">Thinking & coding</p>
            )}
          </div>
        ) : (
          <div className="text-primary text-sm dark:text-white">
            <p className="flex items-center gap-1 font-semibold">
              Offline in
              <Image
                src="/assets/cursor.png"
                alt="Cursor"
                width={18}
                height={18}
              />
              Cursor
            </p>
            {data.yesterdayTime && (
              <p className="text-muted-foreground">
                Yesterday worked{" "}
                <span className="text-primary font-semibold dark:text-white">
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
