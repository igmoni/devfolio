export function normalizeEditor(name) {
  if (!name) return "Cursor";
  const n = name.toLowerCase();
  if (n.includes("cursor")) return "Cursor";
  if (n.includes("visual studio") || n.includes("vs code")) return "VS Code";
  return name;
}

export function formatMinutes(seconds = 0) {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  return hrs > 0 ? `${hrs}h ${mins % 60}m` : `${mins} mins`;
}

export function formatWithSeconds(totalSeconds = 0) {
  const secs = Math.max(0, Math.floor(totalSeconds)); // 🔒 force integer

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  return `${h}h ${m}m ${s}s`;
}

export function parseWakaTime(data) {
  const todayDay = data.todaySummary?.data?.[0];
  const todaySeconds = todayDay?.grand_total?.total_seconds || 0;

  const hb = data.heartbeats?.data || [];
  const lastHB = hb.length > 0 ? hb[hb.length - 1] : null;

  const editor = normalizeEditor(lastHB?.editor);

  // 🔑 SOURCE OF TRUTH: HEARTBEAT
  const currentProject = lastHB?.project || null;
  const currentFile = lastHB?.entity ? lastHB.entity.split("/").pop() : null;

  // Online
  if (todaySeconds > 0) {
    return {
      status: "online",
      editor,
      project: currentProject || null,
      file: currentFile || null,
      totalSeconds: todaySeconds, // 🔑 REQUIRED
    };
  }

  // 🔴 OFFLINE
  const yDay = data.yesterdaySummary?.data?.[0];
  const ySeconds = yDay?.grand_total?.total_seconds || 0;

  return {
    status: "offline",
    editor,
    yesterdayTime: formatWithSeconds(ySeconds),
  };
}
