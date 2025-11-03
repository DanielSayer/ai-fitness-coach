export function metersToKm(meters: number, decimals = 2): number {
  return Math.round((meters / 1000) * 10 ** decimals) / 10 ** decimals;
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.floor(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function pacePerKm(
  durationSeconds: number,
  distanceMeters: number,
): string {
  const km = distanceMeters / 1000;
  if (km <= 0) return "-";
  const secPerKm = durationSeconds / km;
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}

export function formatDateLocal(dateStr: string): string {
  // dateStr like "2025-10-29 17:25:37"
  const dt = new Date(dateStr.replace(" ", "T"));
  return dt.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
