/**
 * Formats bytes into a human-readable string (KB, MB)
 */
export function formatMemory(bytes: number): string {
  if (bytes === 0) return 'approx 0 MB (or cleaned by GC)';
  const kb = bytes / 1024;
  if (kb < 1024) return `about ${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  return `about ${mb.toFixed(2)} MB`;
}
