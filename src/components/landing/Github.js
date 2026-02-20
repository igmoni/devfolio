"use client";

import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import dynamic from "next/dynamic";

import { githubConfig } from "@/config/Github";
import ArrowUpRight from "@/svgs/ArrowUpRight";
import GithubIcon from "@/svgs/Github";

import Container from "../common/Container";
import { Button } from "../ui/button";
import { instrumentSerif } from "./Hero";
import WakaTimeText from "./WakaTimeText";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false }
);

/* ---------- helpers ---------- */

const filterLastYear = (contributions) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return contributions.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= oneYearAgo;
  });
};

/* ---------- component ---------- */

const Github = () => {
  const { theme } = useTheme();

  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  /* track screen width */
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  /* responsive block size */
  const getBlockSize = () => {
    if (screenWidth < 480) return 8; // small phones
    if (screenWidth < 768) return 10; // large phones
    return 13; // tablet & desktop
  };

  /* fetch github data */
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setHasError(false);

        const res = await fetch(
          `${githubConfig.apiUrl}/${githubConfig.username}.json`
        );
        const data = await res.json();

        if (!Array.isArray(data?.contributions)) {
          setHasError(true);
          return;
        }

        const flattened = data.contributions.flat();

        const levelMap = {
          NONE: 0,
          FIRST_QUARTILE: 1,
          SECOND_QUARTILE: 2,
          THIRD_QUARTILE: 3,
          FOURTH_QUARTILE: 4,
        };

        const valid = flattened
          .filter(
            (item) =>
              item &&
              typeof item === "object" &&
              "date" in item &&
              "contributionCount" in item &&
              "contributionLevel" in item
          )
          .map((item) => ({
            date: String(item.date),
            count: Number(item.contributionCount || 0),
            level: levelMap[item.contributionLevel] ?? 0,
          }));

        if (!valid.length) {
          setHasError(true);
          return;
        }

        setTotalContributions(valid.reduce((sum, item) => sum + item.count, 0));

        setContributions(filterLastYear(valid));
      } catch (err) {
        console.error("Failed to fetch Github contributions:", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container className="mt-20 px-5">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-foreground flex items-center justify-between text-2xl font-bold">
            <p>
              <span className={`${instrumentSerif.className} text-3xl italic`}>
                Github
              </span>{" "}
              Activity
            </p>
            <Link
              href={githubConfig.githubLink}
              target="_blank"
              className="group relative inline-flex items-center gap-1 text-[12px] font-medium md:text-lg"
            >
              <span className="relative">
                View Profile
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 bg-current transition-all duration-200 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="size-3 transform transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-150 md:size-4" />
            </Link>
          </h2>
          <p className="text-muted-foreground text-sm">
            <b>{githubConfig.username}</b>'s {githubConfig.subtitle}
          </p>

          {!isLoading && !hasError && totalContributions > 0 && (
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <p className="text-primary mt-1 text-sm font-medium dark:text-white">
                Total:{" "}
                <span className="font-black">
                  {totalContributions.toLocaleString()}
                </span>{" "}
                contributions
              </p>
              <WakaTimeText />
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
              <p className="text-muted-foreground text-sm">
                {githubConfig.loadingState.desc}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && (hasError || contributions.length === 0) && (
          <div className="text-muted-foreground border-border rounded-xl border-2 border-dashed p-8 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <GithubIcon className="h-8 w-8" />
            </div>
            <p className="mb-2 font-medium">{githubConfig.errorState.title}</p>
            <p className="mb-4 text-sm">{githubConfig.errorState.desc}</p>
            <Button variant="outline" asChild>
              <Link
                href={`https://github.com/${githubConfig.username}`}
                className="inline-flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                {githubConfig.errorState.buttontext}
              </Link>
            </Button>
          </div>
        )}

        {/* Calendar */}
        {!isLoading && !hasError && contributions.length > 0 && (
          <div className="relative overflow-hidden">
            <div className="bg-background/50 relative rounded-lg border border-dashed border-black/20 p-6 backdrop-blur-sm dark:border-white/10">
              <div className="w-full overflow-x-auto">
                <ActivityCalendar
                  data={contributions}
                  blockSize={getBlockSize()}
                  blockMargin={3}
                  fontSize={githubConfig.fontSize}
                  colorScheme={theme === "dark" ? "dark" : "light"}
                  maxLevel={githubConfig.maxLevel}
                  hideTotalCount
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  theme={githubConfig.theme}
                  labels={{
                    months: githubConfig.months,
                    weekdays: githubConfig.weekDays,
                    totalCount: githubConfig.totalCountLabel,
                  }}
                  style={{
                    color: "rgb(139,148,158)",
                    margin: "0 auto",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Github;
