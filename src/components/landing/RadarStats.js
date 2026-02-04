"use client";

import { useEffect, useRef, useState } from "react";
import { Radar } from "react-chartjs-2";
import { useInView } from "framer-motion";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

// ---- CONFIG ----
const labels = ["Bench", "Squat", "Leg Press", "Shoulder", "Deadlift"];

const rawValues = [45, 50, 80, 35, 80];
const maxValues = [100, 100, 150, 85, 150];

const normalizedValues = rawValues.map(
  (v, i) => (v / maxValues[i]) * 100
);

export default function RadarStats() {
  const [isDark, setIsDark] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // ✅ Watch theme changes (unchanged)
  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        data: normalizedValues,
        backgroundColor: isDark
          ? "rgba(56,189,248,0.35)"
          : "rgba(56,189,248,0.25)",
        borderColor: "#38bdf8",
        pointBackgroundColor: "#38bdf8",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (ctx) {
            const i = ctx.dataIndex;
            return rawValues[i] + " / " + maxValues[i] + " kg";
          },
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: {
          color: isDark
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.1)",
        },
        angleLines: {
          color: isDark
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.1)",
        },
        pointLabels: {
          color: isDark ? "#e5e7eb" : "#6b7280",
          font: { size: 12 },
        },
      },
    },
    animation: {
      duration: 500,
      easing: "easeOutQuart",
    },
  };

  return (
    <div ref={ref} className="flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Radar animates ONLY when in view */}
        {isInView && (
          <Radar
            key={isDark ? "dark" : "light"}
            data={data}
            options={options}
          />
        )}
      </div>
    </div>
  );
}
