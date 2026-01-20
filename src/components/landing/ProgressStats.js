const stats = [
  { label: "Bench", value: 35, max: 100, unit: "kg" },
  { label: "Squat", value: 45, max: 100, unit: "kg" },
  { label: "Leg Press", value: 65, max: 150, unit: "kg" },
  { label: "Shoulder", value: 25, max: 80, unit: "kg" },
  { label: "Deadlift", value: 80, max: 150, unit: "kg" },
];

export default function ProgressStats() {
  return (
    <div className="space-y-5">
      {stats.map((s) => {
        const percent = (s.value / s.max) * 100;

        return (
          <div key={s.label}>
            <div className="mb-1 flex justify-between font-mono text-sm">
              <span className="text-zinc-800 dark:text-zinc-200">
                {s.label}
              </span>
              <span className="text-sky-500">
                {s.value} / {s.max} {s.unit}
              </span>
            </div>

            <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-sky-500 transition-all"
                style={{ width: percent + "%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
