// ─── CONSTANTS ────────────────────────────────────────────────────────────────

export const EMERALD = "#34d399";
export const EMERALD_DIM = "#065f46";
export const RED = "#f87171";
export const ZINC_600 = "#52525b";
export const CHART_COLORS = ["#34d399", "#60a5fa", "#f472b6", "#fbbf24", "#a78bfa", "#fb923c"];
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function formatDuration(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
