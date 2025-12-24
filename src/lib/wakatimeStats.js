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


export function parseWakaTime(data) {
  const todayDay = data.todaySummary?.data?.[0];
  const todaySeconds = todayDay?.grand_total?.total_seconds || 0;

  const hb = data.heartbeats?.data || [];
  const lastHB = hb.length > 0 ? hb[hb.length - 1] : null;

  const editor = normalizeEditor(lastHB?.editor);

  const currentProject = lastHB?.project || null;
  const currentFile = lastHB?.entity
    ? lastHB.entity.split("/").pop()
    : null;

  // 🟢 ONLINE
  if (todaySeconds > 0) {
    return {
      status: "online",
      editor,
      project: currentProject,
      file: currentFile,
      totalSeconds: todaySeconds, // number only
    };
  }

  // 🔴 OFFLINE (fallback to yesterday)
  const yDay = data.yesterdaySummary?.data?.[0];
  const ySeconds = yDay?.grand_total?.total_seconds || 0;

  return {
    status: "offline",
    editor,
    totalSeconds: ySeconds, // still number
  };
}

