import { hasSub } from '@razomy/array';

export function isCacheHasSubArray(master: string[], sub: string | string[]): boolean {
  if (Array.isArray(sub)) {
    return hasSub(master, sub);
  }

  return master.includes(sub);
}
