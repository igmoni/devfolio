export function normalizeEditor(name) {
  if (!name) return "Cursor";
  const n = name.toLowerCase();
  if (n.includes("cursor")) return "Cursor";
  if (n.includes("visual studio") || n.includes("vs code")) return "VS Code";
  return name;
}



export function formatDuration(totalSeconds = 0) {
  const secs = Math.max(0, Math.floor(totalSeconds));

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  if (h > 0) {
    return `${h} hr ${m} min ${s} sec`;
  }

  return `${m} min ${s} sec`;
}



export function parseWakaTime(apiData) {
  const heartbeats = apiData?.heartbeats?.data ?? [];
  const today = apiData?.todaySummary?.data?.[0];
  const yesterday = apiData?.yesterdaySummary?.data?.[0];

  // No heartbeats at all
  if (heartbeats.length === 0) {
    return {
      status: "offline",
      yesterdayTime: yesterday?.grand_total?.text ?? null,
    };
  }

  // Find latest heartbeat safely
  const latestHeartbeat = heartbeats.reduce((latest, hb) => {
    const latestTime =
      latest.time
        ? latest.time * 1000
        : new Date(latest.created_at).getTime();

    const hbTime =
      hb.time
        ? hb.time * 1000
        : new Date(hb.created_at).getTime();

    return hbTime > latestTime ? hb : latest;
  });

  const lastBeatTime =
    latestHeartbeat.time
      ? latestHeartbeat.time * 1000
      : new Date(latestHeartbeat.created_at).getTime();

  const now = Date.now();

  // 🔥 GRACE WINDOW (KEY FIX)
  const ONLINE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  const isOnline = now - lastBeatTime < ONLINE_THRESHOLD;

  if (!isOnline) {
    return {
      status: "offline",
      yesterdayTime: yesterday?.grand_total?.text ?? null,
    };
  }

  // Extract filename only
  const fullPath = latestHeartbeat.entity ?? "";
  const fileName = fullPath.split("/").pop() || "Coding";

  return {
    status: "online",
    editor: latestHeartbeat.editor ?? "Editor",
    project: latestHeartbeat.project ?? null,
    file: fileName,
    totalSeconds: today?.grand_total?.total_seconds ?? 0,
  };
}

