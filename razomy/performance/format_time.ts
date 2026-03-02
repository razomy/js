/**
 * Formats time into a human-readable string
 */
export function formatTime(ms: number): string {
  const sec = ms / 1000;
  if (sec < 60) return `about ${sec.toFixed(3)} sec.`;
  const min = sec / 60;
  if (min < 60) return `about ${min.toFixed(1)} min.`;
  return `about ${(min / 60).toFixed(1)} h.`;
}
